<template>
    <main class="registrationAuth">
      <div class="registrationAuth__form">
          <form class="form form-grey" action="">
              <h1 class="registrationAuth__title title title-small title-white">Sing In</h1>
              <input-text :error="emailError.error" v-model.lazy="state.email" clases="registrationAuth__input input" placeholder="Email" icon="email"></input-text>
              <input-password :error="passwordError.error" v-model="state.password" clases="registrationAuth__input input" placeholder="Password" icon="lock"></input-password>
              <div v-if="globalError.error.isError" class="error-text">{{ globalError.error.text }}</div>
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
import { reactive, computed } from 'vue' 

import userError from '../../composable/useError.js';
import { ERRORS_APP } from '../../utils/constants.js';
import { isFirebaseError, isNotEmptyString } from '../../utils/validators.js';

import InputText from '../../components/InputText/InputText.vue';
import InputPassword from '../../components/InputPassword/InputPassword.vue';

export default {
 setup() {
  const router = useRouter();
  const store = useStore();

  const state = reactive( {
      email: '',
      password: '',
  });

  const emailError = userError();
  const passwordError = userError();
  const globalError = userError();

  const { password: passwordErrors, email: emailErrors, global: globalErrors, defaultError} = ERRORS_APP;

  const submit = async () => {
    if (!isDataNotEmpty.value) {
      setErrorsIfDataIncorect();
      return;
    }

    const formData = {
      email: state.email,
      password: state.password
    }
    
    emailError.resetError();
    passwordError.resetError();
    globalError.resetError();

    try {
      await store.dispatch('login', formData);
      router.push('/');
    }
    catch (error) {
      firebaseErrorsHendler(error);
    }
  }

  const firebaseErrorsHendler = (error) => {
    if (isFirebaseError(error.name)) {
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
    if(!isPasswordNotEmpty.value) {
        passwordError.setError(passwordErrors['empty-password']);
      }
      if(!isEmailNotEmpty.value) {
        emailError.setError(emailErrors['empty-email']);
      }
  }

  const isPasswordNotEmpty = computed(() => {
    return isNotEmptyString(state.password);
  });

  const isEmailNotEmpty = computed(() => {
    return isNotEmptyString(state.email);
  });

  const isDataNotEmpty = computed(() => {
    return isEmailNotEmpty.value && isPasswordNotEmpty.value;
  });

  return {
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
  @import '../Registration/registration.scss';
</style>