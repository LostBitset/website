import type { ModelRef } from "vue";

export function toggleTagEnabled(
    tag: string,
    just_tags: [Ref<Map<string, boolean>>],
) {
    const [tags] = just_tags;
    tags.value!.set(tag, !tags.value!.get(tag));
}

export const TAG_COLORS = new Map([
    ['research', 'orange'],
    ['dev', 'blue'],
    ['physics', 'pink'],
    ['comp sci', 'teal'],
]);

export const ENABLED_BY_DEFAULT = true;
