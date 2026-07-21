import fs from 'fs/promises';
import path from 'path';
import { User } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure the data directory and file exist
async function ensureDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Failed to initialize local JSON DB:', error);
  }
}

export async function getUsers(): Promise<User[]> {
  await ensureDb();
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (error) {
    console.error('Failed to read users:', error);
    return [];
  }
}

export async function saveUser(user: User): Promise<void> {
  const users = await getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Failed to write user:', error);
  }
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(u => u.email === email);
}

export async function findUserById(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find(u => u.id === id);
}
