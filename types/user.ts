export interface User {
    _id?: string;
    _rev?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Şifreyi basit bir metin olarak tutuyoruz. Gerçek uygulamalarda şifreler şifrelenmiş olarak saklanmalıdır.
  }
  