<template>
  <main class="registrationAuth">
    <div class="registrationAuth__form">
        <form class="form form-grey" action="">
            <h1 class="registrationAuth__title title title-small title-white">Registration</h1>
            <input-text v-model.lazy="state.name" :isError="state.error.errorName" clases="registrationAuth__input input" placeholder="Name" icon="user"></input-text>
            <input-text v-model.lazy="state.email" :isError="state.error.errorEmail" clases="registrationAuth__input input" placeholder="Email" icon="email"></input-text>
            <input-password v-model.lazy="state.password" :isError="state.error.errorParword" clases="registrationAuth__input input" placeholder="Password" icon="lock"></input-password>
            <div v-if="state.error.errorReg.value" class="error-text">{{ state.error.errorReg.text }}</div>
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

import { cheackName, cheackEmail, cheackPassword } from '../../utils/utils';
import { ERRORS_APP } from '../../utils/constants';

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
      error: {
        errorName: false,
        errorParword: false,
        errorEmail: false,
        errorReg: {
          value: false,
          text : ''
        }
      }
    });


    const submit = async () => {
      cheackData();
      if(isDataCorrent.value) {
        try {
          const formData = {
            name: state.name,
            email: state.email,
            password: state.password
          }
          await store.dispatch('register', formData);
          router.push('/');
        }
        catch(e) {
          state.error.errorReg.value = true;
          state.error.errorReg.text =  ERRORS_APP[e.code];
        }
      }
    }

    const cheackData = () => {
      state.error.errorName = !cheackName(state.name);
      state.error.errorEmail = !cheackEmail(state.email);
      state.error.errorParword = !cheackPassword(state.password);
    }

    const isDataCorrent = computed(() => {
      return  cheackName(state.name) && cheackEmail(state.email) && cheackPassword(state.password);
    })

    return {
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