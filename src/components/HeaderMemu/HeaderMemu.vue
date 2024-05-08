<template>
    <div class="menu">
       <div @click="openMenu" class="icon-menu svg"></div>
       <div class="menu-block">
           <div class="logo-close">
               <div class="logo svg">
                   <img src="../../assets/svg/logo.svg" width="44" alt="logo" />
               </div>
               <div @click="closeMenu" class="icon-close svg"></div>
           </div>
           <div class="menu-ul">
               <ul class="list-ul">
                   <li><router-link to="/">Home</router-link></li>
                   <li><router-link to="/categories">Categories</router-link></li>
                   <li><router-link to="/search">Search</router-link> </li>
                 <li><router-link to="/shoppingList">Shopping list</router-link> </li>
               </ul>
           </div>
           <div class="bg-img leaves-1"></div>
       </div>
   </div>
</template>

<script>
import { gsap } from "gsap";
import { ANIMATION_EASY, DURATION_08, DURATION_03, DURATION_04 } from '@/utils/animationConstants';


export default {
    setup() {
        const openMenu = () => {
          animateOpen();
        };
        const closeMenu = () => {
          animateClose();
        }

        const animateOpen = () => {
            const tl = gsap.timeline();
            tl.to('.menu-block', {
                autoAlpha: 1,
                top: 0,
                ease: ANIMATION_EASY,
                duration: DURATION_08
            });
            tl.to('.list-ul li a', {
                opacity: 1,
                y: -71,
                rotate: 0,
                ease: "power2.in",
                duration: DURATION_03
            })
        }

        const animateClose = () => {
            const tl = gsap.timeline();
            tl.to('.list-ul li a', {
                opacity: 1,
                y: 66,
                rotate: 16,
                ease: "power2.in",
                duration: DURATION_03
            })
            tl.to('.menu-block', {
                delay: .6,
                autoAlpha: 1,
                top: '-101vh',
                ease: ANIMATION_EASY,
                duration: DURATION_04
            });
            
        }

        return {
            openMenu,
            closeMenu,

            
        }
    }
}

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './headerMemu.scss';
</style>