<script>
    import Calendar from 'svelte-calendar/components/calendar/Calendar.svelte';
    import { onMount } from 'svelte';
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
  
  <Calendar>
    {#each events as event (event.id)}
      <div>
        {event.date}: {event.title}
      </div>
    {/each}
  </Calendar>
  