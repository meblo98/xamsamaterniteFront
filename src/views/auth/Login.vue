
<template>
   <section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="/src/assets/images/logo.png" class="img-fluid" alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>

          <!-- Email input -->
          <div data-mdb-input-init class="form-outline mb-4">
            <label class="form-label" for="form3Example3">Email ou Téléphone</label>

            <input type="text" id="form3Example3" class="form-control form-control-lg"
              placeholder="Entrer votre email ou votre téléphone" />
          </div>

          <!-- Password input -->
          <div data-mdb-input-init class="form-outline mb-3">
            <label class="form-label" for="form3Example4">Mot de passe</label>

            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Entrer votre mot de passe" />
          </div>


          <div class="text-center text-lg-start mt-4 pt-2">
            <router-link  to="/dashboard-admin" >
              <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;background-color: #522DD1;">Se connecter</button>
            </router-link>
          </div>

        </form>
      </div>
    </div>
  </div>

</section>

</template>

<script>
export default {

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

