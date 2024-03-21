<template>
    <BaseDialog @click.prevent.stop :isOpenDialog="isOpen" @close="closeDialog">
        <template v-slot:content>
            <div class="content">
               <h3 class="sub-title">Are you sure you want to log out?</h3>
               <form action="" class="form-hidden">
                    <button @click.prevent="logout" type="submit" class="btn btn-green">Log out  </button>
                    <button @click="closeDialog" type="submit" class="btn">Cancel</button>
                </form>
            </div>
        </template>
    </BaseDialog>
</template>

<script>

import BaseDialog from '../BaseDialog.vue';

import { isBool } from '@/utils/validators';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    props: {
        isOpen: {
            default: false,
            type: Boolean,
            validator: isBool
        }
    },
    setup(_, context) {
        const router = useRouter();
        const store = useStore();

        const closeDialog = () => {
            context.emit('close');
        }

        const logout = async () => {
            await store.dispatch('logout');
            router.push('/welcome');
        }

        return {
            closeDialog,
            logout,
        }
    },
    components: { BaseDialog }
}
</script>

<style lang="scss" scoped>
@import '../../../style/var.scss';
@import '../../../style/mixin.scss';
@import '../LogoutDialog/logoutDialog.scss';
</style>