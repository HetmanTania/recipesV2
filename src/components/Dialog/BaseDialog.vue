<template>
    <div v-if="isOpen" class="bg-dialog" @click.stop="close"></div>
        <div class="wapper-dialog" v-if="isOpen">
        <div class="dialog">
            <div @click="close" class="icon-close svg"></div>
            <slot name="header"></slot>
            <slot name="content"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
    
</template>

<script>
import useOpenClose from '../../composable/useOpenClose.js';

import { computed, watch } from 'vue';

export default {
    props: {
        isOpenDialog: {
            type: Boolean
        },
    },
    emits: ["closeDialog"],
    setup(props, context) {
        let dialogOpenColose = useOpenClose();
        
        const close = () => {
            dialogOpenColose.close()
            context.emit('closeDialog');
        }

        const isOpen = computed(() => {
            return dialogOpenColose.isOpen.value;
        });

        const isOpenDialogFromParent = computed(() => {
            return props.isOpenDialog
        });

        watch(isOpenDialogFromParent, (newValue) => {
            if(newValue) {
                dialogOpenColose.open();
                document.body.style.overflow = 'hidden';
            }
            else {
                dialogOpenColose.close();
                document.body.style.overflow = 'auto';
            }
        });

        return {
            dialogOpenColose,

            close,
            
            isOpen,
        }
    }
}

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import '../Dialog/dialog.scss';
</style>
