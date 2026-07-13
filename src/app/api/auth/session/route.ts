import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mockData';
import { CartSession } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, mode } = body; // mode can be 'GUEST' or 'LOGGED_IN'

    const sessionId = Math.random().toString(36).substring(2, 15);

    let session: CartSession = {
      sessionId,
      status: 'GUEST',
      userId: null,
      items: [],
      totalAmount: 0,
      totalWeight: 0,
    };

    if (mode === 'LOGGED_IN' && userId && mockUsers[userId]) {
      session = {
        ...session,
        status: 'LOGGED_IN',
        userId,
      };
      return NextResponse.json({ session, user: mockUsers[userId] });
    }

    return NextResponse.json({ session, user: null });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
