<template>
  <main class="registrationAuth">
    <div class="registrationAuth__form">
        <form class="form form-grey" action="">
            <h1 class="registrationAuth__title title title-small title-white">Registration</h1>
            <input-text v-model.lazy="state.name" :error="nameError.error"  clases="registrationAuth__input input" placeholder="Name" icon="user"></input-text>
            <input-text v-model.lazy="state.email" :error="emailError.error" clases="registrationAuth__input input" placeholder="Email" icon="email"></input-text>
            <input-password v-model.lazy="state.password" :error="passwordError.error" clases="registrationAuth__input input" placeholder="Password" icon="lock"></input-password>
            <div v-if="globalError.error.isError" class="error-text">{{ globalError.error.text }}</div>
            <button @click.prevent="submit" type="submit" class="registrationAuth__submit btn btn-green">Registration</button>
          </form>
      <router-link to="signIn" class="registrationAuth__refSingIn">Sign in</router-link>
    </div>
    <div class="registrationAuth__svg"></div>
  </main>
  <footer class="registrationAuth__rectangle"></footer>
</template>

<script>

import InputText from '../../components/InputText/InputText.vue'
import InputPassword from '../../components/InputPassword/InputPassword.vue';

import { ERRORS_APP } from '../../utils/constants';
import userError from '../../composable/useError.js';
import { cheackUserName, cheackEmail, cheackPassword, isFirebaseError } from '../../utils/validators.js';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, reactive } from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive( {
      name: '',
      email: '',
      password: '',
    });

    
    const { password: passwordErrors, email: emailErrors, global: globalErrors,
      userInput: userInputErrors, defaultError} = ERRORS_APP;

    const nameError = userError();
    const emailError = userError();
    const passwordError = userError();
    const globalError = userError();

    const submit = async () => {
      if(!isDataCorrent.value) {
        setErrorsIfDataIncorect();
        return;
      }
      
      emailError.resetError();
      passwordError.resetError();
      nameError.resetError();
      globalError.resetError();
      
      const formData = {
        name: state.name,
        email: state.email,
        password: state.password
      }

      try {
        await store.dispatch('register', formData);
        router.push('/');
      }
      catch(error) {
        firebaseErrorsHendler(error);
      }
    };
    
    const firebaseErrorsHendler = (error) => {
      if(isFirebaseError(error.name)) {
        if (emailErrors[error.code]) {
          emailError.setError(emailErrors[error.code]);
        }
        else if (passwordErrors[error.code]) {
          passwordError.setError(passwordErrors[error.code]);
        }
        else if(globalErrors[error.code]){
          globalError.setError(globalErrors[error.code]);
        }
        else {
          globalError.setError(defaultError['default']);
        }
      }
    }

    const setErrorsIfDataIncorect = () => {
      if(!cheackUserName(state.name)) {
        nameError.setError(userInputErrors['invalid-name']);
      }
      if(!cheackEmail(state.email)) {
        emailError.setError(userInputErrors['invalid-email']);
      }
      if(!cheackPassword(state.name)) {
        passwordError.setError(userInputErrors['invalid-password']);
      }
    };

    const isDataCorrent = computed(() => {
      return cheackUserName(state.name) && cheackEmail(state.email) && cheackPassword(state.password);
    });
    
    return {
      nameError,
      emailError,
      passwordError,
      globalError,

      state,
      submit,
    }
  },
  components: { InputText, InputPassword },
}
</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './registration.scss';
</style>