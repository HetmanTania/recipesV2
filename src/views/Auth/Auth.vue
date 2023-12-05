<template>
    <main class="registrationAuth">
      <div class="registrationAuth__form">
          <form class="form form-grey" action="">
              <h1 class="registrationAuth__title title title-small title-white">Sing In</h1>
              <input-text v-model.lazy="state.email" :isError="isEmailCorrect" clases="registrationAuth__input input" placeholder="Email" icon="email"></input-text>
              <input-password v-model="state.password" :isError="isPasswordCorrect" clases="registrationAuth__input input" placeholder="Password" icon="lock"></input-password>
              <button @click.prevent="submit" type="submit" class="registrationAuth__submit btn btn-green">Sing In</button>
          </form>
        <router-link to="registration" class="registrationAuth__refSingIn">Registration</router-link>
      </div>
      <div class="registrationAuth__svg"></div>
    </main>
    <footer class="registrationAuth__rectangle"></footer>
  </template>
  
<script>

import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { computed, reactive } from 'vue'
import InputText from '../../components/InputText/InputText.vue';
import InputPassword from '../../components/InputPassword/InputPassword.vue';

export default {
 setup() {
  const router = useRouter();
  const store = useStore();
  const state = reactive( {
      email: '',
      password: '',
      error: {
        errorParword: false,
        errorEmail: false,
      }
  });

  const submit = async () => {
    if(isDataCorrent.value) {
      const formData = {
        email: state.email,
        password: state.password
      }
      try {
        await store.dispatch('login', formData);
        router.push('/');
      } catch (e) {
        console.log(e);
      }
    }
    else if(!state.email.length) { 
      state.error.errorEmail = true;
    }
    else if(!state.password.length) {
      state.error.errorParword = true;
    }
  }

  const isPasswordCorrect = computed(() => {
    return state.error.errorParword;
  });

  const isEmailCorrect = computed(() => {
    return state.error.errorEmail;
  });

  const isDataCorrent = computed(() => {
    return state.email.length && state.password.length;
  });

  return {
    state,
    submit,
    isEmailCorrect,
    isPasswordCorrect
  }
},
components: { InputText, InputPassword },
  
}
</script>
  
<style lang="scss">
  @import '../../style/var.scss';
  @import '../../style/mixin.scss';
  @import '../Registration/registration.scss';
</style>