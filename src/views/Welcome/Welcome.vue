<template>
  <main class="welcome">
    <div class="welcome__wrapper">
      <div class="welcome__logo logo svg">
        <img src="../../assets/svg/logo.svg" width="44" alt="logo"/>
      </div>
      <h1 class="welcome__title title title-white">Welcome to the app!</h1>
      <div class="welcome__sub-title sub-title sub-title-white">This app offers more than just a collection of recipes - it is designed to be your very own digital cookbook. You can easily save and retrieve your own recipes at any time.</div>
      <div class="register-singIn">
        <div class="register-singIn__btns">
          <router-link to="registration">
            <button class="register-singIn__btn btn-green btn-curly btn-curly-green">Registration</button>
          </router-link>
          <router-link to="signIn">
            <button class="register-singIn__btn btn-curly btn-curly-transparent">Sign in</button>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './welcome.scss';
</style>