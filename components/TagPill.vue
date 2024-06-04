<template>
    <span class="outer">
        <span class="inner">{{ tagName }}</span>
    </span>
</template>

<script setup lang="ts">
const { tagName } = defineProps<{
    tagName: string,
}>();
</script>

<style scoped>
span.outer {
    display: flex;
    justify-content: center;
}

span.inner {
    background-color: grey;
    padding: 5px;
    border-radius: 5px;
    font-size: 14pt;
    font-family: monospace;
    text-transform: uppercase;
}
</style>
