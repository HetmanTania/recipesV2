<template>
    <div ref="authMenu" @click="openEditLogoutDialog"  class="auth-menu">
        <div class="header_wrapper-auth-theme">
            <div  class="auth">
                <img :src="userAvatar" width="44" alt="avatar" class="auth_avatar avatar" />
                <div class="auth_login">{{ userName }}</div>
            </div>
            <EditLogoutDialog @close="closeEditLogoutDialog" :isOpen="editLogoutDialogOpenClose.isOpen.value"></EditLogoutDialog>
            <!-- @close="closeEditLogoutDialog" :isOpen="editLogoutDialogOpenClose.isOpen.value" -->
        </div>
    </div>
</template>

<script>

import EditLogoutDialog from '../EditLogoutDialog/EditLogoutDialog.vue';

import useOpenClose from '../../composable/useOpenClose';
import { computed, ref } from 'vue'
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();   
        const authMenu = ref(null);

        const editLogoutDialogOpenClose = useOpenClose();

        const userAvatar = computed(() => {
            if( store.getters.getUserAvatarPhotoURL?.length) {
                return store.getters.getUserAvatarPhotoURL;
            }
                    
            return require('../../assets/svg/avatar.svg');
        });

        const userName = computed(() => {
            return store.getters.getUserName;
        });

        const openEditLogoutDialog = (e) => {
            // if(e.target === authMenu.value) {
                editLogoutDialogOpenClose.open();
            // }
            console.log(e);
        }
        const closeEditLogoutDialog = () => {
            editLogoutDialogOpenClose.close();
        }

        return {
            userAvatar,
            userName,

            authMenu,

            editLogoutDialogOpenClose,
            openEditLogoutDialog,
            closeEditLogoutDialog,
        }
    } ,
    components: { EditLogoutDialog }
}

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import 'userProfile';
</style>