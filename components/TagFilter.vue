<template>
    <span :class="className" @click="toggle" @dblclick.prevent>{{ props.text }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
    tag: string,
    text: string,
}>();

let tags: Ref<Map<string, boolean>> = inject('enabled-tags')!;

let className = computed(() => tags.value.get(props.tag) ? 'enabled' : 'disabled');

function toggle() {
    tags.value.set(props.tag, !tags.value.get(props.tag));
}
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
