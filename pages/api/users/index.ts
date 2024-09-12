import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/couchdb';
import { User } from '@/types/user';
import { hashPassword } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Kullanıcıları listele
    try {
      const users = await db.list({ include_docs: true });
      res.status(200).json(users.rows.map(row => row.doc));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else if (req.method === 'POST') {
    // Yeni kullanıcı ekle
    const user: User = req.body;
    try {
      // Şifreyi hashle
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;

      const response = await db.insert(user);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else if (req.method === 'PUT') {
    // Kullanıcıyı güncelle
    const user: User = req.body;
    if (!user._id || !user._rev) {
      res.status(400).json({ error: 'User ID and revision are required' });
      return;
    }
    try {
      // Şifre varsa hashle
      if (user.password) {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
      }

      const response = await db.insert(user);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  } else if (req.method === 'DELETE') {
    // Kullanıcıyı sil
    const { id, rev } = req.query;
    if (typeof id !== 'string' || typeof rev !== 'string') {
      res.status(400).json({ error: 'User ID and revision are required' });
      return;
    }
    try {
      await db.destroy(id, rev);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
