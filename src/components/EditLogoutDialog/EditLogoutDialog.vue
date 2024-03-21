<template>
  <div v-if="isOpen" @click.stop="closeEditLogoutDialog"  class="bg-Profile"></div>
  <div class="editProfile">
    <div @click.stop="openEditProfileDialog" class="edit">
      <p>Edit Profile</p>
      <div class="svg icon-edit"></div>
    </div>
    <button @click.stop="openLogoutDialog" class="btn-curly btn-curly-green-hoverBlack"> logout </button>
  </div>
  <LogoutDialog @close="closeLogoutDialog" :isOpen="logoutOpenClose.isOpen.value"></LogoutDialog>
  <EditProfileDialog @closeDialog="closeEditProfileDialog" :isOpenDialog="editProfileOpenClose.isOpen.value" ></EditProfileDialog>
</template>

<script setup>
import LogoutDialog from '../Dialog/LogoutDialog/LogoutDialog.vue';
import EditProfileDialog from "@/components/Dialog/EditProfileDialog/EditProfileDialog.vue";

import { isBool } from '@/utils/validators';
import useOpenClose from "@/composable/useOpenClose";
import { DURATION_02 } from '@/utils/animationConstants';

import { defineProps, defineEmits, watch } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean,
    validator: isBool,
  }
})

const emit = defineEmits({
  close,
});

const logoutOpenClose = useOpenClose();
const editProfileOpenClose = useOpenClose();

const tl = gsap.timeline();
const closeEditLogoutDialog = () => {
  emit('close');
}
const openLogoutDialog = () => {
  logoutOpenClose.open();
  closeEditLogoutDialog();
}
const closeLogoutDialog = () => {
  logoutOpenClose.close();
}

const openEditProfileDialog = () => {
  closeEditLogoutDialog();
  editProfileOpenClose.open();
}
const closeEditProfileDialog = () => {
  editProfileOpenClose.close()
}

const animateEditProfileAlpha = (alpha) => {
  tl.to('.editProfile', {
    autoAlpha: alpha,
    duration: DURATION_02,
  });
}
const animateEditProfileY = (y) => {
  tl.to('.editProfile', {
    y: y,
    duration: DURATION_02,
  });
}
const animationOpen = () => {
  animateEditProfileAlpha(1);
  animateEditProfileY('-40px');
}
const animationClose = () => {
  animateEditProfileY(0);
  animateEditProfileAlpha(0);
}

watch(() => props.isOpen, (newValue) => {
  if(newValue) animationOpen();
  else animationClose();
});

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './editLogoutDialog.scss';
</style>