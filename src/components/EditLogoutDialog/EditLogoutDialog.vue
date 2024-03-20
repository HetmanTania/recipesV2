<template>
    <div v-if="isOpen" @click.stop="closeEditLogoutDialog"  class="bg-Profile"></div>
    <div class="editProfile">
        <div class="edit">
            <p  @click.stop="openEditProfileDialog">Edit Profile</p>
            <div class="svg icon-edit"></div>
        </div>
        <button @click.prevent.stop @click="openLogoutDialog" class="btn-curly btn-curly-green-hoverBlack"> logout </button>
    </div>
    <EditProfileDialog @click.prevent.stop @closeDialog="closeEditProfileDialog"  :isOpenDialog="editProfileOpenClose.isOpen.value" ></EditProfileDialog>
    <LogoutDialog @closeDialog="closeLogoutDialog" :isOpenDialog="logoutOpenClose.isOpen.value"></LogoutDialog> 
</template>

<script>
import LogoutDialog from '../Dialog/LogoutDialog/LogoutDialog.vue';
import EditProfileDialog from '../Dialog/EditProfileDialog/EditProfileDialog.vue';
import useOpenClose from '../../composable/useOpenClose';

import { isBool } from '@/utils/validators';
import { watch } from 'vue';
import { gsap } from "gsap";

export default {
    props: {
       isOpen: {
        default: false,
        type: Boolean,
        validator: isBool
       }
    },
    emits: ["close"],
    setup(props, context) { 

        const editProfileOpenClose = useOpenClose();
        const logoutOpenClose = useOpenClose();

        const closeEditLogoutDialog = () => {
            context.emit('close');
            
        }

        watch(() => props.isOpen, (newValue) => {
            if(newValue) {
                animationOpen();
            } else {
                animationClose();
            }
        });

        const openEditProfileDialog = () => {
            editProfileOpenClose.open();
            closeEditLogoutDialog();
        }
        const closeEditProfileDialog = () => {
            editProfileOpenClose.close();
        }
     
        const openLogoutDialog = () => {
            logoutOpenClose.open();
            closeEditLogoutDialog();
        }

        const closeLogoutDialog = () => {
            logoutOpenClose.close();
        }

        const animationOpen = () => {
            const tl = gsap.timeline();
            tl.to('.editProfile', {
                autoAlpha: 1,
                duration: 0.2,
               
            });
            tl.to('.editProfile', {
                y: -40,
                duration: 0.2,
            });
        }

        const animationClose = (y, alpha) => {
            const tl = gsap.timeline();
            tl.to('.editProfile', {
                y: y,
                duration: 0.2,
            });
            tl.to('.editProfile', {
                autoAlpha: alpha,
                duration: 0.2,
               
            });
        }

        return {
            editProfileOpenClose,
            closeEditLogoutDialog,

            closeEditProfileDialog,
            openEditProfileDialog,

            closeLogoutDialog,
            openLogoutDialog,
            logoutOpenClose,
            
        }
    },
    components: { EditProfileDialog, LogoutDialog }
}
</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './editLogoutDialog.scss';
</style>