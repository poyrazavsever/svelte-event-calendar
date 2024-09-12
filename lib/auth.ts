import bcrypt from 'bcrypt';

const saltRounds = 10; // Salt oluşturma zorluğu

// Şifreyi hashle
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

// Hashlenmiş şifreyi doğrula
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
