import type { ModelRef } from "vue";

export function watchEnabled(
    tag: string,
    tags: ModelRef<Map<string, boolean> | undefined, string>,
    direction: 'read' | 'write',
) {
    let enabled = ref(ENABLED_BY_DEFAULT);
    let className = computed(() => enabled.value ? 'enabled' : 'disabled');
    if (direction == 'read') {
        effect(() => enabled.value = tags.value!.get(tag)!);
    } else {
        effect(() => tags.value!.set(tag, enabled.value));
    }
    return {
        className,
        enabled,
    };
}

export const TAG_COLORS = new Map([
    ['research', 'orange'],
    ['software', 'blue'],
    ['physics', 'pink'],
    ['cs', 'yellow'],
]);

export const ENABLED_BY_DEFAULT = true;
