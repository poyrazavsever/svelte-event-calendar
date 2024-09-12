// src/store/events.ts
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Etkinlik türü tanımı
interface Event {
  id: string;
  title: string;
  date: string;
}

const eventsCollection = collection(db, 'events');

export const addEvent = async (title: string, date: string) => {
  try {
    await addDoc(eventsCollection, { title, date });
    console.log('Event added successfully');
  } catch (e) {
    console.error('Error adding event: ', e);
  }
};

export const getEvents = async (): Promise<Event[]> => {
  try {
    const querySnapshot = await getDocs(eventsCollection);
    const events: Event[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
    return events;
  } catch (e) {
    console.error('Error getting events: ', e);
    return [];
  }
};
