<template>
    <div class="menu">
       <div @click="openMenu" class="icon-menu svg"></div>
       <div :class="getClass">
           <div class="logo-close">
               <div class="logo svg">
                   <img src="../../assets/svg/logo.svg" width="44" alt="logo" />
               </div>
               <div @click="closeMenu" class="icon-close svg"></div>
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
</template>

<script>
import useOpenClose from '../../composable/useOpenClose';
import { computed } from 'vue';
export default {
    setup() {
        const menuOpenClose = useOpenClose();
        const openMenu = () => {
            menuOpenClose.open();
        };
        const closeMenu = () => {
            menuOpenClose.close();
        }

        const getClass = computed(() => {
            return `${menuOpenClose.isOpen.value ? 'isOpen' : ''} menu-block`
        });

        return {
            openMenu,
            closeMenu,

            getClass,
        }
    }
}

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './headerMemu.scss';
</style>