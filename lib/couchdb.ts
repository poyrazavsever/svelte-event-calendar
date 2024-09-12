import nano from 'nano';

// CouchDB bağlantı bilgileri
const couchUrl = 'http://localhost:5984'; // CouchDB URL
const dbName = 'event-calendar'; // Oluşturduğun veritabanının adı

// Nano ile CouchDB bağlantısı oluştur
const nanoInstance = nano(couchUrl);

// Veritabanı bağlantısını al
const db = nanoInstance.db.use(dbName);

export default db;
