<template>
    <span :class="className" @click="toggle" @dblclick.prevent>{{ props.text }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
    tag: string,
    text: string,
}>();

const tags = defineModel<Map<string, boolean>>();

let enabled = ref(true);
let className = computed(() => enabled.value ? 'enabled' : 'disabled');

function toggle() { enabled.value = !enabled.value; }

effect(() => tags.value!.set(props.tag, enabled.value));
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
}
</style>
