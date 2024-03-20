<template>
    <BaseDialog @click.prevent.stop @close="close" :isOpenDialog="isOpenDialog">
        <template v-slot:content>
            <div class="content">
                <div class="editAvatar">
                    <img :src="state.pathUserAvatar" ref="avatar" width="133" alt="avatar" class="avatar"/>
                    <label for="file" class="btn-edit"></label>
                    <input @change="setUserAvatar" id="file" type="file" accept=".jpg, .jpeg, .png" />
                </div>
                <form action="" class="form-hidden">
                    <InputText v-model="state.userName" :isError="state.errorName" classes="editProfileDialog__input input input-gray" placeholder="User Name" icon="user-black"></InputText>
                    <button @click.prevent="updateUserProfile" type="submit" class="btn btn-green">Save changes</button>
                </form>
            </div>
        </template>
    </BaseDialog>
</template>

<script>
import BaseDialog from '../BaseDialog.vue';
import InputText from '../../InputText/InputText.vue';

import { isBool } from '@/utils/validators';
import { checkUserName } from '@/utils/validators';

import { useStore } from 'vuex';
import { reactive, ref } from 'vue';

export default { 
    props: {
        isOpenDialog: {
            default: false,
            type: Boolean,
            validator: isBool
        }
    },
    emits: ["closeDialog"],
    setup(_, context) {

        const store = useStore();
        const state = reactive({
            userName: '',
            pathUserAvatar: '',
            errorName: false,
            imgFile: undefined
        });

        const avatar = ref(null);
        state.userName = store.getters.getUserName;
        state.pathUserAvatar = store.getters.getUserAvatarPhotoURL ?
            store.getters.getUserAvatarPhotoURL : require('../../../assets/svg/avatar.svg');

        const checkName = () => {
            if(checkUserName(state.userName)) {
                state.errorName = false;
                return true;
            }
            else {
                state.errorName = true;
                return false;
            }

        }

        const setUserAvatar = (event) => {
            const file = event.target.files[0];
            if(file) {
               try {
                    const reader = new FileReader();
                    reader.addEventListener('load', function (e) {
                        state.pathUserAvatar = e.target.result;
                        state.imgFile = file;
                    });
                    reader.readAsDataURL(file);

               } catch (e) {
                    console.log(e);
               }

            }
        }

        const updateUserProfile = async () => {
            if (checkName() && state.userName !== store.getters.getUserName) {
                await store.dispatch('updateUserName', {userName: state.userName});
                close();
            }
            if(state.pathUserAvatar !== store.getters.getUserAvatarPhotoURL) {
                await store.dispatch('updateUserAvatar', {file: state.imgFile, pathServer: 'profile'});
                close();
            }
            
        }

        const close = () => {
            context.emit('closeDialog');
        }

        return {
            state,
            setUserAvatar,
            avatar,

            checkName,
            updateUserProfile,
            close
        }
    },
    components: { BaseDialog, InputText,}
}

</script>

<style lang="scss" scoped>
@import '../../../style/var.scss';
@import '../../../style/mixin.scss';
@import '../EditProfileDialog/editProfileDialog.scss';
</style>