<script>
    import { auth } from '../firebase';
    import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
    let email = '';
    let password = '';
    let error = '';
    let isSignUp = false; // Kayıt ve giriş arasında geçiş
  
    async function handleSubmit(event) {
      event.preventDefault();
      try {
        if (isSignUp) {
          await createUserWithEmailAndPassword(auth, email, password);
          // Başarı durumunda yönlendirme veya başka işlemler yapılabilir
        } else {
          await signInWithEmailAndPassword(auth, email, password);
          // Başarı durumunda yönlendirme veya başka işlemler yapılabilir
        }
      } catch (e) {
        error = e.message;
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit}>
    <input type="email" placeholder="Email" bind:value={email} required />
    <input type="password" placeholder="Password" bind:value={password} required />
    <button type="submit">{isSignUp ? 'Kaydol' : 'Giriş Yap'}</button>
    <p>{error}</p>
    <button type="button" on:click={() => isSignUp = !isSignUp}>
      {isSignUp ? 'Giriş Yap' : 'Kaydol'}
    </button>
  </form>
  