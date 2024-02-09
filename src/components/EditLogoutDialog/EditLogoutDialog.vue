<template>
    <div v-if="isOpen" class="editProfile">
        <div class="edit">
            <p @click="openEditProfilDialog">Edit Profile</p>
            <div class="svg icon-edit"></div>
        </div>
        <button @click="openLogoutDialog" class="btn-curly btn-curly-green-hoverBlack"> logout </button>
    </div>
    <div v-if="isOpen" @click.stop="closeEditLogoutDialog" class="bg-Profile"></div>
    <EditProfileDialog @closeDialog="closeEditProfilDialog" :isOpenDialog="editProfileOpenClose.isOpen.value"></EditProfileDialog>
    <LogoutDialog @closeDialog="closeLogoutDialog" :isOpenDialog="logoutOpenClose.isOpen.value"></LogoutDialog>
</template>

<script>
import LogoutDialog from '../Dialog/LogoutDialog/LogoutDialog.vue';
import EditProfileDialog from '../Dialog/EditProfileDialog/EditProfileDialog.vue';
import useOpenClose from '../../composable/useOpenClose';
import { isBool } from '../../utils/validators';

export default {
    props: {
       isOpen: {
        default: false,
        type: Boolean,
        validator: isBool
       }
    },
    emits: ["close"],
    setup(_, context) {

        const editProfileOpenClose = useOpenClose();
        const logoutOpenClose = useOpenClose();

        const closeEditLogoutDialog = () => {
            context.emit('close');
        }

        const openEditProfilDialog = () => {
            editProfileOpenClose.open();
        }
        const closeEditProfilDialog = () => {
            editProfileOpenClose.close();
            closeEditLogoutDialog();
        }
     
        const openLogoutDialog = () => {
            logoutOpenClose.open();
        }
        const closeLogoutDialog = () => {
            logoutOpenClose.close();
        }
       

        return {
            editProfileOpenClose,
            closeEditLogoutDialog,

            closeEditProfilDialog,
            openEditProfilDialog,

            closeLogoutDialog,
            openLogoutDialog,
            logoutOpenClose,
            
        }
    },
    components: { EditProfileDialog, LogoutDialog }
}
</script>