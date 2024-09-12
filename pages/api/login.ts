import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/couchdb';
import { verifyPassword } from '../../lib/auth';
import { User } from '../../types/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Kullanıcıyı email ile bul
      const users = await db.view('user', 'by_email', { key: email, include_docs: true });
      const user = users.rows[0]?.doc as User; // Tipi User olarak belirle

      if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      // Şifreyi doğrula
      const isMatch = await verifyPassword(password, user.password);

      if (isMatch) {
        // Başarılı giriş, kullanıcı bilgilerini ve/veya token'ı yanıt olarak dönebilirsin
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to authenticate user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
