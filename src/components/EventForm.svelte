<script>
    import { firestore } from '../firebase';
    let title = '';
    let date = '';
    let description = '';
    let error = '';
  
    async function handleSubmit(event) {
      event.preventDefault();
      try {
        await firestore.collection('events').add({
          title,
          date,
          description,
        });
        title = '';
        date = '';
        description = '';
      } catch (e) {
        error = e.message;
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Title" bind:value={title} required />
    <input type="date" bind:value={date} required />
    <textarea placeholder="Description" bind:value={description} required></textarea>
    <button type="submit">Etkinlik Ekle</button>
    {#if error}
      <p>{error}</p>
    {/if}
  </form>
  