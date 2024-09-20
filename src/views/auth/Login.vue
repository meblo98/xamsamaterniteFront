
<template>
   <section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="/src/assets/images/logo.png" class="img-fluid" alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form  @submit.prevent="submitLogin">
          <p v-if="error">{{ error }}</p>
          <!-- Email input -->
          <div data-mdb-input-init class="form-outline mb-4">
            <label class="form-label" for="form3Example3">Email ou Téléphone</label>

            <input type="text" v-model="login" required id="login" class="form-control form-control-lg"
              placeholder="Entrer votre email ou votre téléphone" />
          </div>

          <!-- Password input -->
          <div data-mdb-input-init class="form-outline mb-3">
            <label class="form-label" for="form3Example4">Mot de passe</label>

            <input type="password" id="password" class="form-control form-control-lg"
              placeholder="Entrer votre mot de passe" v-model="password" required />
          </div>


          <div class="text-center text-lg-start mt-4 pt-2">
            
              <button  type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;background-color: #522DD1;">Se connecter</button>
           
          </div>
          
        </form>
      </div>
    </div>
  </div>

</section>

</template>

<script>
import api from '/src/services/api'; // Le service API qui fera la requête à Laravel

export default {
  data() {
    return {
      login: '',
      password: '',
      error: null
    };

  },
  
  methods: {
    
    async submitLogin() {
      try {
        const response = await api.login({
          login: this.login,
          password: this.password
        });

        // Extraire les données de la réponse
        const { token, user } = response.data;

        // Sauvegarder le token JWT dans le localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.roles[0]); // Sauvegarder le rôle de l'utilisateur

        // Redirection en fonction du rôle de l'utilisateur
        if (user.roles.includes('admin')) {
          this.$router.push('/dashboard-admin');
        } else if (user.roles.includes('sage-femme')) {
          this.$router.push('/dashboard-sage-femme');
        } else if (user.roles.includes('patiente')) {
          this.$router.push('/dashboard-patiente');
        } else if (user.roles.includes('badiene-gox')) {
          this.$router.push('/dashboard-badiene-gox');
        }
      } catch (error) {
        this.error = 'Identifiants incorrects. Veuillez réessayer.';
      }
    }


}

};
</script>


<style lang="css">

.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
.h-custom {
height: calc(100% - 73px);
}
@media (max-width: 450px) {
.h-custom {
height: 100%;
}
}

</style>

