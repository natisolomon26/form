import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const sessionToken = crypto
      .createHmac('sha256', process.env.SESSION_SECRET!)
      .update(email)
      .digest('hex')

    const cookieStore = await cookies()

    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    { status: 401 }
  )
}