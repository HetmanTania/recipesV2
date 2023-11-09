<template>
    <header class="header">
        <div class="header_wrapper">
            <router-link to="/home'" class="logo svg">
                <img src="../../assets/svg/logo.svg" />
            </router-link>
            <nav class="nav">
                <ul class="nav_list">
                    <li class="nav_list-item"><router-link to="/categories">Categories</router-link></li>
                    <li class="nav_list-item"><router-link to="/search">Search</router-link></li>
                    <li class="nav_list-item">Favorites</li>
                    <li class="nav_list-item">Shopping list</li>
                </ul>
            </nav>
            <div class="auth-menu">
                <div class="header_wrapper-auth-theme">
                    <div class="auth" @click="editProfileOpenClose.open">
                        <img :src="userAvatar" class="auth_avatar avatar"/>
                        <div class="auth_login">{{ userName }}</div>
                    </div>
                    <div v-if="isOpenEditProfil" class="editProfile">
                        <div @click="openDialogEditProfile" class="edit">
                            <p>Edit Profile</p>
                            <div class="svg icon-edit"></div>
                        </div>
                        <button class="btn-curly btn-curly-green-hoverBlack" @click="openDialogLogout"> logout </button>
                    </div>
                    <div v-if="isOpenEditProfil" @click="editProfileOpenClose.close" class="bg-Profile"></div>
                </div>
                <div class="menu">
                    <div @click="menuOpenColose.open" class="icon-menu svg"></div>
                    <div :class="[{ isOpen: isOpenMenu }, 'menu-block']">
                        <div class="logo-close">
                            <div class="logo svg">
                                <img src="../../assets/svg/logo.svg" />
                            </div>
                            <div @click="menuOpenColose.close" class="icon-close svg"></div>
                        </div>
                        <div class="munu-ul">
                            <ul class="list-ul">
                                <li>Home</li>
                                <li>Categories</li>
                                <li>Favorites</li>
                                <li>Search</li>
                                <li class="searh">
                                    <div class="icon-searh svg"></div> Categories
                                </li>
                            </ul>
                        </div>
                        <div class="bg-img leaves-1"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <EditProfileDialog  @closeDialog="closeDialogEditProfil" :isOpenDialog="isOpenDialogEditProfil"></EditProfileDialog>
    <LogoutDialog @closeDialog="closeDialogLogout" :isOpenDialog="isOpenDialogLogout"></LogoutDialog>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onUpdated, ref } from 'vue';
import useOpenClose from '../../composable/useOpenClose';
import EditProfileDialog from '../Dialog/EditProfileDialog/EditProfileDialog.vue';
import LogoutDialog from '../Dialog/LogoutDialog/LogoutDialog.vue';
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
            console.log('userName', store.getters.getUserName);
            return store.getters.getUserName;
        });

        const userAvatar = computed(() => {
            if( store.getters.getUserAvatarPhotoURL?.length) {
                return  store.getters.getUserAvatarPhotoURL;
            }
            
            return require('../../assets/svg/avatar.svg');
        });

        onUpdated(() => {
            console.log('update');
            console.log('userName', userName);
        })


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