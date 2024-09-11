<script>
	import { onMount } from 'svelte';
	import { auth } from './firebase';
	import AuthForm from './components/AuthForm.svelte';
	import EventList from './components/EventList.svelte';
	import EventForm from './components/EventForm.svelte';
	import Calendar from './components/Calendar.svelte';
  
	let user = null;
  
	onMount(() => {
	  const unsubscribe = auth.onAuthStateChanged(u => {
		user = u;
	  });
  
	  return () => unsubscribe();
	});
  </script>
  
  {#if user}
	<p>Hoşgeldiniz, {user.email}</p>
	<EventList />
	<EventForm />
	<Calendar />
  {:else}
	<AuthForm />
  {/if}
  