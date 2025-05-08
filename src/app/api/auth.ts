import { cookies } from 'next/headers';

export async function getEmail() {
  const cookieStore = cookies();
  return (await cookieStore).get('userEmail');
}