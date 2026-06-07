import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'http'

const SYSTEM = `You are LeitechSupport, the AI assistant for Leitech Systems Solution — a professional solar, security, smart home, and communications company in Ghana.

COMPANY:
- Location: 79 Fertilizer Road, Teshie Nungua Estate, Accra, Ghana
- Phone: +233 508 096 108 (WhatsApp) | +233 247 291 199 | Liberia: +231 887 919 130
- Email: leitech_systems@outlook.com
- Experience: 5+ years, 70+ completed projects, 100% client satisfaction

SERVICES:
- Solar installation: residential (3–15 kW), commercial (15–100 kW+), farm/remote
- Battery storage: LiFePO4 (21 kWh, 30 kWh, 45 kWh), 5,000+ cycles, 10+ year lifespan
- CCTV & surveillance: 1080p–4K, IR night vision, IP66, NVR/DVR, mobile app remote viewing
- Electric fencing, alarm systems, access control, biometric, intercom
- Smart home automation: lighting, appliances, energy monitoring, climate, single-app control
- VHF/UHF/HF communications for farms, government, military, enterprises

SOLAR DETAILS:
- Panel warranty: 25 years | Battery: 5–10 yr | Inverter: 5 yr | Workmanship: 1 yr
- Grid-tied, hybrid, or fully off-grid options
- Typical result: 80–100% electricity bill reduction, 3–5 yr payback, 25+ yr system life

PROCESS: Free site visit → load assessment → system design → quote (within 48 hrs) → installation → handover → 24/7 support

PAYMENT: Cash, installments, milestone payments. MTN MoMo, bank transfer, cash accepted.

INSTRUCTIONS:
- Be warm, friendly, and concise — this is a chat widget, not a report
- Use markdown-style bold (**text**) for key points
- For quotes or site-specific questions, invite them to book a free site visit or call +233 508 096 108
- If asked about anything unrelated to Leitech's services, politely redirect
- Never invent specific prices for a project — always say a site assessment is needed for accuracy
- Responses should be under 200 words unless the topic genuinely requires more`

// Dev-only plugin: intercepts /api/chat so `npm run dev` works without `vercel dev`
function localApiPlugin(apiKey: string) {
  return {
    name: 'local-api-chat',
    configureServer(server: { middlewares: { use: (path: string, fn: (req: IncomingMessage, res: ServerResponse) => void) => void } }) {
      server.middlewares.use('/api/chat', (req: IncomingMessage, res: ServerResponse) => {
        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', async () => {
          try {
            const { messages } = JSON.parse(body)
            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ reply: "GEMINI_API_KEY is not set in .env.local — please add it and restart the dev server." }))
              return
            }
            const msgs = (messages as { role: string; content: string }[]).slice(-10)
            const contents = msgs.map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }],
            }))
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
              {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                  system_instruction: { parts: [{ text: SYSTEM }] },
                  contents,
                  generationConfig: { maxOutputTokens: 400 },
                }),
              }
            )
            const data = await response.json() as {
              candidates?: { content: { parts: { text: string }[] } }[]
              error?: { message: string }
            }
            if (!response.ok || data.error) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ reply: "Sorry, I'm having trouble right now. Call us at +233 508 096 108!" }))
              return
            }
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ reply }))
          } catch {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ reply: "Sorry, I'm having trouble right now. Call us at +233 508 096 108!" }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), localApiPlugin(env.GEMINI_API_KEY ?? '')],
  }
})
