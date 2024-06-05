<template>
    <span
        :class="{ centered: props.centered }"
        @click.stop="toggleTagEnabled(props.tagName, just_tags)"
    >
        <span :class="[enabledClass, 'inner']" @dblclick.prevent>{{ props.tagName }}</span>
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    tagName: string,
    centered: boolean,
}>();

const color = TAG_COLORS.get(props.tagName);

let tags: Ref<Map<string, boolean>> = inject('enabled-tags')!;
let just_tags: [typeof tags] = [tags];

let enabledClass = computed(() => tags.value.get(props.tagName) ? 'enabled' : 'disabled');
</script>

<style scoped>
.centered {
    display: flex;
    justify-content: center;
}

span.inner {
    background-color: v-bind("color");
    padding: 5px;
    border-radius: 20px;
    font-size: 12pt;
    font-family: monospace;
    font-weight: bold;
    text-transform: uppercase;
}

span.enabled, span.disabled:hover {
    filter: brightness(80%);
    text-decoration: none;
}

span.disabled, span.enabled:hover {
    filter: brightness(50%);
    text-decoration: line-through;
}
</style>
