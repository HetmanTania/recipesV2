<template>
    <header class="header">
        <div class="header_wrapper">
            <router-link to="/" class="logo svg">
                <img src="../../assets/svg/logo.svg" width="44" alt="logo"/>
            </router-link>
            <nav class="nav">
                <ul class="nav_list">
                    <li class="nav_list-item"><router-link to="/categories">Categories</router-link></li>
                    <li class="nav_list-item"><router-link to="/search">Search</router-link></li>
                </ul>
            </nav>
            <div class="auth-menu">
                <div class="header_wrapper-auth-theme">
                    <div  @click="editProfileOpenClose.open" class="auth">
                        <img :src="userAvatar" width="44" alt="avatar" class="auth_avatar avatar"/>
                        <div class="auth_login">{{ userName }}</div>
                    </div>
                    <div v-if="isOpenEditProfil" class="editProfile">
                        <div @click="openDialogEditProfile" class="edit">
                            <p>Edit Profile</p>
                            <div class="svg icon-edit"></div>
                        </div>
                        <button  @click="openDialogLogout" class="btn-curly btn-curly-green-hoverBlack"> logout </button>
                    </div>
                    <div v-if="isOpenEditProfil" @click="editProfileOpenClose.close" class="bg-Profile"></div>
                </div>
                <div class="menu">
                    <div @click="menuOpenColose.open" class="icon-menu svg"></div>
                    <div :class="[{ isOpen: isOpenMenu }, 'menu-block']">
                        <div class="logo-close">
                            <div class="logo svg">
                                <img src="../../assets/svg/logo.svg" width="44" alt="logo" />
                            </div>
                            <div @click="menuOpenColose.close" class="icon-close svg"></div>
                        </div>
                        <div class="munu-ul">
                            <ul class="list-ul">
                                <li><router-link to="/">Home</router-link></li>
                                <li><router-link to="/categories">Categories</router-link></li>
                                <li><router-link to="/search">Search</router-link> </li>
                            </ul>
                        </div>
                        <div class="bg-img leaves-1"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <EditProfileDialog @closeDialog="closeDialogEditProfil" :isOpenDialog="isOpenDialogEditProfil"></EditProfileDialog>
    <LogoutDialog @closeDialog="closeDialogLogout" :isOpenDialog="isOpenDialogLogout"></LogoutDialog>
</template>

<script>

import EditProfileDialog from '../Dialog/EditProfileDialog/EditProfileDialog.vue';
import LogoutDialog from '../Dialog/LogoutDialog/LogoutDialog.vue';
import useOpenClose from '../../composable/useOpenClose.js';

import { useStore } from 'vuex';
import { computed, ref } from 'vue';

export default {

    setup() {
        const store = useStore();

        let menuOpenColose = useOpenClose();
        let editProfileOpenClose = useOpenClose();
        let logoutOpenClose = useOpenClose();

        let isOpenDialogEditProfil = ref(false);
        let isOpenDialogLogout = ref(false);

        const openDialogEditProfile = () => {
            isOpenDialogEditProfil.value = true;
            editProfileOpenClose.close();
        }

        const openDialogLogout = () => {
            isOpenDialogLogout.value = true;
            editProfileOpenClose.close();
        }

        const closeDialogEditProfil = () => {
            isOpenDialogEditProfil.value = false;
        }

        const closeDialogLogout = () => {
            isOpenDialogLogout.value = false;
        }

        const isOpenEditProfil = computed(() => {
            return editProfileOpenClose.isOpen.value;
        })

        const isOpenMenu = computed(() => {
            return menuOpenColose.isOpen.value;
        });

        const userName = computed(() => {
            return store.getters.getUserName;
        });

        const userAvatar = computed(() => {
            if( store.getters.getUserAvatarPhotoURL?.length) {
                return store.getters.getUserAvatarPhotoURL;
            }
            
            return require('../../assets/svg/avatar.svg');
        });

        return {

            userName,
            userAvatar,

            menuOpenColose,
            isOpenMenu,

            editProfileOpenClose,
            isOpenEditProfil,

            closeDialogEditProfil,
            openDialogEditProfile,
            isOpenDialogEditProfil,

            closeDialogLogout,
            logoutOpenClose,
            openDialogLogout,
            isOpenDialogLogout
        }
    },
    components: { EditProfileDialog, LogoutDialog }
}
</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './theHeader.scss';</style>