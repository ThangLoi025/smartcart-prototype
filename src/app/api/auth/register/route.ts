import { NextResponse } from 'next/server';
import { findUserByEmail, saveUser } from '@/lib/db';
import { User } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    const newUser: User = {
      id: `user_${crypto.randomUUID().substring(0, 8)}`,
      name,
      email,
      password, // In a real app, you MUST hash the password (e.g., using bcrypt)
      phone: '', // Default or optional
      membershipLevel: 'ĐỒNG',
      status: 'ACTIVE',
      points: 0,
      vouchers: []
    };

    await saveUser(newUser);

    // Don't send password back
    const userToReturn = { ...newUser };
    delete userToReturn.password;

    return NextResponse.json({ user: userToReturn }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
