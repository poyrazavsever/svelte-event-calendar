<!-- src/routes/events.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { addEvent, getEvents } from '../store/events';
  
    interface Event {
      id: string;
      title: string;
      date: string;
    }
  
    let events: Event[] = [];
    let newEventTitle = '';
    let newEventDate = '';
  
    const loadEvents = async () => {
      events = await getEvents();
    };
  
    const addNewEvent = async () => {
      await addEvent(newEventTitle, newEventDate);
      newEventTitle = '';
      newEventDate = '';
      loadEvents();
    };
  
    onMount(() => {
      loadEvents();
    });
  </script>
  
  <div>
    <h1>Events</h1>
    <ul>
      {#each events as event}
        <li>{event.title} - {event.date}</li>
      {/each}
    </ul>
  
    <input type="text" bind:value={newEventTitle} placeholder="Event Title" />
    <input type="date" bind:value={newEventDate} />
    <button on:click={addNewEvent}>Add Event</button>
  </div>
  