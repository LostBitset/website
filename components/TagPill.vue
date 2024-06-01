<template>
    <span class="outer">
        <span :class="[enabledClassName, 'inner']">{{ props.tagName }}</span>
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    tagName: string,
    showEnabled?: boolean,
}>();

const tags = defineModel<Map<string, boolean>>();

let enabledClassName = watchEnabled(props.tagName, tags, 'read').className;
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

span.disabled {
    text-decoration: line-through;
}
</style>
