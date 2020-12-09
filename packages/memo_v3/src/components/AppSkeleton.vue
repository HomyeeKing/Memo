<template>
    <div>
        <nav class="nav">
            <a-icon type="cloud-upload" />
        </nav>
        <main>
            <slot name="main"></slot>
        </main>
        <footer class="footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Icon } from 'ant-design-vue';
export default defineComponent({
    name: 'AppSkeleton',

    components: { AIcon: Icon },
});
</script>

<style scoped lang="scss">
.nav,
.footer {
    width: 100%;
    height: $top-nav-height;
    background-color: $primary;
}
.footer {
    position: fixed;
    bottom: 0;
}
</style>