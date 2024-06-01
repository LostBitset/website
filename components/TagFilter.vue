<template>
    <span :class="className" @click="toggle" @dblclick.prevent>
        {{ props.text }}
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    tag: string,
    text: string,
}>();

const tags = defineModel<Map<string, boolean>>();

let {
    className, enabled,
} = watchEnabled(props.tag, tags, 'write');

function toggle() { enabled.value = !enabled.value; }
</script>

<style scoped>
span.enabled {
    color: lime;
}

span.disabled {
    color: red;
}

span {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    display: table-cell;
}
</style>
