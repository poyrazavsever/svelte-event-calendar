<script>
    import { firestore } from '../firebase';
    let events = [];
  
    async function loadEvents() {
      const snapshot = await firestore.collection('events').get();
      events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  
    onMount(() => {
      loadEvents();
    });
  </script>
  
  <ul>
    {#each events as event}
      <li>
        <h3>{event.title}</h3>
        <p>{event.date}</p>
        <p>{event.description}</p>
      </li>
    {/each}
  </ul>
  