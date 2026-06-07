import { useState, useEffect, useRef } from 'react'
import { Upload, LogOut, CheckCircle, AlertCircle, Loader, ImagePlus } from 'lucide-react'

type Tag = 'Solar' | 'Battery' | 'Security' | 'Smart'

interface CloudImage {
  publicId: string
  url: string
  location: string
  tag: string
  spec?: string
  createdAt: string
}

const TAG_COLOR: Record<Tag, string> = {
  Solar:    '#F59E0B',
  Battery:  '#0EA5E9',
  Security: '#10B981',
  Smart:    '#8B5CF6',
}

const CLOUD_NAME   = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME   as string | undefined
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined
const ADMIN_PW     = import.meta.env.VITE_ADMIN_PASSWORD           as string | undefined

async function uploadToCloudinary(
  file: File,
  meta: { location: string; tag: string; spec: string },
  onProgress?: (pct: number) => void
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET ?? '')
    formData.append('tags', 'leitech-gallery')
    const ctx = `location=${meta.location}|service_tag=${meta.tag}${meta.spec ? `|spec=${meta.spec}` : ''}`
    formData.append('context', ctx)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`)
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(`Upload failed (${xhr.status})`))
      }
    }
    xhr.onerror = () => reject(new Error('Network error during upload'))
    xhr.send(formData)
  })
}

async function fetchCloudImages(): Promise<CloudImage[]> {
  if (!CLOUD_NAME) return []
  const res = await fetch(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/leitech-gallery.json`)
  const data = await res.json()
  const mapped: CloudImage[] = (data.resources ?? []).map((r: {
    public_id: string; secure_url: string; created_at: string;
    context?: { custom?: Record<string, string> }
  }) => {
    const ctx = r.context?.custom ?? {}
    return { publicId: r.public_id, url: r.secure_url, location: ctx.location ?? 'Unknown', tag: ctx.service_tag ?? 'Solar', spec: ctx.spec, createdAt: r.created_at }
  })
  return mapped.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed]     = useState(() => localStorage.getItem('leitech_admin_auth') === '1')
  const [pwInput, setPwInput]   = useState('')
  const [pwError, setPwError]   = useState('')

  // upload form
  const [file, setFile]         = useState<File | null>(null)
  const [preview, setPreview]   = useState<string | null>(null)
  const [location, setLocation] = useState('')
  const [tag, setTag]           = useState<Tag>('Solar')
  const [spec, setSpec]         = useState('')
  const [isDragging, setIsDrag] = useState(false)
  const [progress, setProgress] = useState(0)

  type Status = 'idle' | 'uploading' | 'success' | 'error'
  const [status, setStatus]     = useState<Status>('idle')
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // previously uploaded
  const [cloudImages, setCloudImages] = useState<CloudImage[]>([])
  const [loadingImages, setLoadingImages] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (authed) {
      setLoadingImages(true)
      fetchCloudImages()
        .then(setCloudImages)
        .catch(() => {})
        .finally(() => setLoadingImages(false))
    }
  }, [authed])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!ADMIN_PW) { setPwError('VITE_ADMIN_PASSWORD not configured.'); return }
    if (pwInput === ADMIN_PW) {
      localStorage.setItem('leitech_admin_auth', '1')
      setAuthed(true)
    } else {
      setPwError('Incorrect password. Try again.')
      setPwInput('')
    }
  }

  function logout() {
    localStorage.removeItem('leitech_admin_auth')
    setAuthed(false)
    setPwInput('')
    setPwError('')
  }

  function processFile(f: File) {
    if (!f.type.startsWith('image/')) return
    setFile(f)
    setStatus('idle')
    setUploadedUrl('')
    const reader = new FileReader()
    reader.onload = ev => setPreview(ev.target?.result as string)
    reader.readAsDataURL(f)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) processFile(f)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDrag(false)
    const f = e.dataTransfer.files[0]
    if (f) processFile(f)
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !location.trim()) return
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setStatus('error')
      setErrorMsg('Cloudinary env vars not configured. Check VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.')
      return
    }
    setStatus('uploading')
    setProgress(0)
    setErrorMsg('')
    try {
      const result = await uploadToCloudinary(file, { location: location.trim(), tag, spec: spec.trim() }, setProgress)
      setUploadedUrl(result.secure_url)
      setStatus('success')
      setFile(null)
      setPreview(null)
      setLocation('')
      setSpec('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      // refresh list
      fetchCloudImages().then(setCloudImages).catch(() => {})
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Upload failed.')
    }
  }

  const canUpload = !!file && !!location.trim() && status !== 'uploading'

  // ── Password gate ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <>
        <style>{`
          .admin-pw-page { min-height: 100vh; background: #050D1A; display: flex; align-items: center; justify-content: center; padding: 1.5rem; font-family: 'Plus Jakarta Sans', sans-serif; }
          .admin-pw-card { background: #0C1A2E; border: 1px solid rgba(14,165,233,0.15); border-radius: 16px; padding: 2.5rem 2rem; width: 100%; max-width: 380px; }
          .admin-pw-logo { width: 52px; height: 52px; margin: 0 auto 1.5rem; display: block; }
          .admin-pw-title { font-size: 1.1rem; font-weight: 700; color: #F1F5F9; text-align: center; margin-bottom: 0.35rem; }
          .admin-pw-sub { font-size: 0.75rem; color: #94A3B8; text-align: center; margin-bottom: 2rem; }
          .admin-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(14,165,233,0.15); border-radius: 8px; padding: 0.7rem 1rem; color: #F1F5F9; font-size: 0.85rem; box-sizing: border-box; transition: border-color 0.2s; }
          .admin-input:focus { outline: none; border-color: rgba(245,158,11,0.5); }
          .admin-pw-err { color: #EF4444; font-size: 0.75rem; margin-top: 0.5rem; }
          .admin-btn-primary { width: 100%; margin-top: 1.2rem; padding: 0.75rem; background: linear-gradient(135deg,#F59E0B,#D97706); border: none; border-radius: 8px; color: #050D1A; font-weight: 700; font-size: 0.85rem; cursor: pointer; letter-spacing: 0.04em; }
          .admin-btn-primary:hover { opacity: 0.9; }
        `}</style>
        <div className="admin-pw-page">
          <div className="admin-pw-card">
            <img src="/favicon.svg" alt="Leitech" className="admin-pw-logo" />
            <div className="admin-pw-title">Admin Access</div>
            <div className="admin-pw-sub">Leitech Systems Solution — Gallery Management</div>
            <form onSubmit={handleLogin}>
              <input
                className="admin-input"
                type="password"
                placeholder="Enter admin password"
                value={pwInput}
                onChange={e => { setPwInput(e.target.value); setPwError('') }}
                autoFocus
              />
              {pwError && <div className="admin-pw-err">{pwError}</div>}
              <button className="admin-btn-primary" type="submit">Enter</button>
            </form>
          </div>
        </div>
      </>
    )
  }

  // ── Upload panel ───────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .adm { min-height: 100vh; background: #050D1A; font-family: 'Plus Jakarta Sans', sans-serif; color: #F1F5F9; }
        .adm-header { background: #0C1A2E; border-bottom: 1px solid rgba(14,165,233,0.12); padding: 0.9rem 2rem; display: flex; align-items: center; gap: 1rem; }
        .adm-header-logo { width: 36px; height: 36px; }
        .adm-header-title { font-size: 0.9rem; font-weight: 700; color: #F59E0B; letter-spacing: 0.04em; flex: 1; }
        .adm-logout { background: transparent; border: 1px solid rgba(245,158,11,0.3); color: #94A3B8; border-radius: 6px; padding: 0.4rem 0.85rem; font-size: 0.72rem; cursor: pointer; display: flex; align-items: center; gap: 0.35rem; transition: color 0.2s, border-color 0.2s; }
        .adm-logout:hover { color: #F59E0B; border-color: rgba(245,158,11,0.6); }
        .adm-body { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }
        .adm-section { background: #0C1A2E; border: 1px solid rgba(14,165,233,0.12); border-radius: 14px; padding: 1.8rem; margin-bottom: 2rem; }
        .adm-section-title { font-size: 0.78rem; font-weight: 700; color: #F59E0B; text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 1.4rem; display: flex; align-items: center; gap: 0.5rem; }
        .adm-dropzone { border: 2px dashed rgba(14,165,233,0.2); border-radius: 10px; padding: 2rem 1rem; text-align: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .adm-dropzone.drag { border-color: #F59E0B; background: rgba(245,158,11,0.04); }
        .adm-dropzone:hover { border-color: rgba(14,165,233,0.4); }
        .adm-dropzone-icon { color: #475569; margin-bottom: 0.6rem; }
        .adm-dropzone-text { font-size: 0.8rem; color: #94A3B8; }
        .adm-dropzone-sub { font-size: 0.68rem; color: #475569; margin-top: 0.25rem; }
        .adm-preview { width: 100%; max-height: 220px; object-fit: cover; border-radius: 8px; margin-top: 1rem; border: 1px solid rgba(14,165,233,0.1); }
        .adm-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.2rem; }
        @media (max-width: 540px) { .adm-form-grid { grid-template-columns: 1fr; } }
        .adm-field { display: flex; flex-direction: column; gap: 0.35rem; }
        .adm-field-full { grid-column: 1 / -1; }
        .adm-label { font-size: 0.68rem; font-weight: 600; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.1em; }
        .adm-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(14,165,233,0.15); border-radius: 7px; padding: 0.6rem 0.85rem; color: #F1F5F9; font-size: 0.82rem; font-family: inherit; transition: border-color 0.2s; }
        .adm-input:focus { outline: none; border-color: rgba(245,158,11,0.5); }
        .adm-input::placeholder { color: #475569; }
        .adm-submit { width: 100%; margin-top: 1.4rem; padding: 0.8rem; background: linear-gradient(135deg,#F59E0B,#D97706); border: none; border-radius: 8px; color: #050D1A; font-weight: 700; font-size: 0.85rem; letter-spacing: 0.04em; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: opacity 0.2s; }
        .adm-submit:disabled { opacity: 0.35; cursor: not-allowed; }
        .adm-submit:not(:disabled):hover { opacity: 0.9; }
        .adm-progress { height: 4px; background: rgba(14,165,233,0.1); border-radius: 2px; margin-top: 0.75rem; overflow: hidden; }
        .adm-progress-bar { height: 100%; background: linear-gradient(90deg,#F59E0B,#0EA5E9); border-radius: 2px; transition: width 0.3s; }
        .adm-status { margin-top: 1rem; padding: 0.8rem 1rem; border-radius: 8px; font-size: 0.78rem; display: flex; align-items: flex-start; gap: 0.5rem; }
        .adm-status.success { background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #34D399; }
        .adm-status.error   { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); color: #F87171; }
        .adm-status a { color: inherit; word-break: break-all; }
        .adm-thumb-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.85rem; }
        @media (max-width: 540px) { .adm-thumb-grid { grid-template-columns: repeat(2,1fr); } }
        .adm-thumb { border-radius: 8px; overflow: hidden; background: rgba(255,255,255,0.04); border: 1px solid rgba(14,165,233,0.1); }
        .adm-thumb img { width: 100%; height: 130px; object-fit: cover; display: block; }
        .adm-thumb-info { padding: 0.5rem 0.6rem; }
        .adm-thumb-loc { font-size: 0.72rem; font-weight: 600; color: #E2E8F0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .adm-thumb-tag { display: inline-block; margin-top: 0.25rem; padding: 0.15rem 0.5rem; border-radius: 12px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
        .adm-empty { color: #475569; font-size: 0.78rem; text-align: center; padding: 2rem; }
        @keyframes admSpin { to { transform: rotate(360deg); } }
        .adm-spin { animation: admSpin 0.9s linear infinite; }
      `}</style>

      <div className="adm">
        {/* Header */}
        <div className="adm-header">
          <img src="/favicon.svg" alt="Leitech" className="adm-header-logo" />
          <span className="adm-header-title">Leitech Image Admin</span>
          <button className="adm-logout" onClick={logout}>
            <LogOut size={12} /> Logout
          </button>
        </div>

        <div className="adm-body">
          {/* Upload form */}
          <div className="adm-section">
            <div className="adm-section-title"><ImagePlus size={14} /> Upload New Image</div>

            {/* Drop zone */}
            <div
              className={`adm-dropzone${isDragging ? ' drag' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setIsDrag(true) }}
              onDragLeave={() => setIsDrag(false)}
              onDrop={handleDrop}
            >
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              {preview ? (
                <img src={preview} className="adm-preview" alt="Preview" />
              ) : (
                <>
                  <div className="adm-dropzone-icon"><Upload size={28} /></div>
                  <div className="adm-dropzone-text">Click to browse or drag & drop an image</div>
                  <div className="adm-dropzone-sub">JPEG, PNG, WebP — any size</div>
                </>
              )}
            </div>

            {/* Metadata form */}
            <form onSubmit={handleUpload}>
              <div className="adm-form-grid">
                <div className="adm-field">
                  <label className="adm-label">Location *</label>
                  <input className="adm-input" placeholder="e.g. Cape Coast" value={location} onChange={e => setLocation(e.target.value)} required />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Service Tag *</label>
                  <select className="adm-input" value={tag} onChange={e => setTag(e.target.value as Tag)}>
                    <option value="Solar">Solar</option>
                    <option value="Battery">Battery</option>
                    <option value="Security">Security</option>
                    <option value="Smart">Smart</option>
                  </select>
                </div>
                <div className="adm-field adm-field-full">
                  <label className="adm-label">Specification (optional)</label>
                  <input className="adm-input" placeholder="e.g. 12kW Solar + 45kWh Storage" value={spec} onChange={e => setSpec(e.target.value)} />
                </div>
              </div>

              <button className="adm-submit" type="submit" disabled={!canUpload}>
                {status === 'uploading'
                  ? <><Loader size={14} className="adm-spin" /> Uploading…</>
                  : <><Upload size={14} /> Upload to Gallery</>}
              </button>

              {status === 'uploading' && (
                <div className="adm-progress">
                  <div className="adm-progress-bar" style={{ width: `${progress}%` }} />
                </div>
              )}

              {status === 'success' && (
                <div className="adm-status success">
                  <CheckCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>Image uploaded successfully! It now appears in the gallery.<br /><a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a></span>
                </div>
              )}

              {status === 'error' && (
                <div className="adm-status error">
                  <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </form>
          </div>

          {/* Previously uploaded images */}
          <div className="adm-section">
            <div className="adm-section-title"><Upload size={14} /> Previously Uploaded ({cloudImages.length})</div>
            {loadingImages ? (
              <div className="adm-empty"><Loader size={18} className="adm-spin" style={{ display: 'inline-block' }} /></div>
            ) : cloudImages.length === 0 ? (
              <div className="adm-empty">No images uploaded yet. Upload your first project photo above.</div>
            ) : (
              <div className="adm-thumb-grid">
                {cloudImages.map(img => (
                  <div key={img.publicId} className="adm-thumb">
                    <img src={img.url} alt={img.location} loading="lazy" />
                    <div className="adm-thumb-info">
                      <div className="adm-thumb-loc">{img.location}</div>
                      <span
                        className="adm-thumb-tag"
                        style={{
                          background: TAG_COLOR[img.tag as Tag] ? `${TAG_COLOR[img.tag as Tag]}22` : 'rgba(255,255,255,0.1)',
                          color: TAG_COLOR[img.tag as Tag] ?? '#94A3B8',
                        }}
                      >
                        {img.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Setup reminder */}
          {(!CLOUD_NAME || !UPLOAD_PRESET) && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '1rem 1.2rem', fontSize: '0.78rem', color: '#F87171', lineHeight: 1.6 }}>
              <strong>⚠️ Cloudinary not configured.</strong> Add these to your <code>.env.local</code> file and Vercel environment variables:<br />
              <code style={{ display: 'block', marginTop: '0.5rem', color: '#94A3B8' }}>
                VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name<br />
                VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset<br />
                VITE_ADMIN_PASSWORD=your_password
              </code>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
