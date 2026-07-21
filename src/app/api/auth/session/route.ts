import { NextResponse } from 'next/server';
import { findUserByEmail, findUserById } from '@/lib/db';
import { CartSession } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, email, password, userId } = body; 

    const sessionId = Math.random().toString(36).substring(2, 15);

    let session: CartSession = {
      sessionId,
      status: 'GUEST',
      userId: null,
      items: [],
      totalAmount: 0,
      totalWeight: 0,
    };

    if (mode === 'LOGGED_IN') {
      let matchedUser = null;

      // Handle real login
      if (email && password) {
        const user = await findUserByEmail(email);
        if (user && user.password === password) {
          matchedUser = user;
        } else {
          return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
      } 
      // Handle legacy fallback if needed (e.g. from token or something)
      else if (userId) {
        matchedUser = await findUserById(userId);
      }

      if (matchedUser) {
        session = {
          ...session,
          status: 'LOGGED_IN',
          userId: matchedUser.id,
        };
        const safeUser = { ...matchedUser };
        delete safeUser.password;
        return NextResponse.json({ session, user: safeUser });
      } else {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    }

    return NextResponse.json({ session, user: null });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
