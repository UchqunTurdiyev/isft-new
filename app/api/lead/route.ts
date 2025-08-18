import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, phone, program, source } = body ?? {}

    if (!fullName || !phone) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }

    const url = process.env.AMO_WEBHOOK_URL
    if (!url) {
      console.warn('AMO_WEBHOOK_URL is not set')
      return NextResponse.json({ ok: true, message: 'Dev mode: no AMO forwarding' })
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, phone, program, source, ts: Date.now() }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('AmoCRM error:', res.status, text)
      return NextResponse.json({ ok: false, error: 'AmoCRM error' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }
}
