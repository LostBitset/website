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

const color = TAG_COLORS.get(props.tagName);

const tags = defineModel<Map<string, boolean>>();

let enabledClassName: Ref<'enabled' | 'disabled'> | Ref<'ignored'>;
if (props.showEnabled) {
    enabledClassName = watchEnabled(props.tagName, tags, 'read').className;
} else {
    enabledClassName = ref('ignored');
}
</script>

<style scoped>
span.outer {
    display: flex;
    justify-content: center;
}

span.inner {
    background-color: v-bind("color");
    padding: 5px;
    border-radius: 20px;
    font-size: 12pt;
    font-family: monospace;
    text-transform: uppercase;
}

span.enabled {
    filter: brightness(80%);
}

span.disabled {
    filter: brightness(50%);
    text-decoration: line-through;
}
</style>
