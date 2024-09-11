<script>
  import { auth } from "../firebase";
  let email = "";
  let password = "";
  let error = "";

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Kullanıcı başarılı bir şekilde giriş yaptı.
    } catch (e) {
      error = e.message;
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // Kullanıcı başarılı bir şekilde kaydoldu.
    } catch (e) {
      error = e.message;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="email" placeholder="Email" bind:value={email} required />
  <input
    type="password"
    placeholder="Password"
    bind:value={password}
    required
  />
  <button type="submit">Giriş Yap</button>
  <button type="button" on:click={handleSignUp}>Kaydol</button>
  {#if error}
    <p>{error}</p>
  {/if}
</form>
