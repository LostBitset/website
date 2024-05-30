<template>
    <div class="header">
      <h1 class="hello">Hi, I'm <FlipBoard desiredText="LANDON" />!</h1>
      <h3>I'm a <TagFilter v-model="tags" tag="research" text="researcher"/> and <TagFilter v-model="tags" tag="software" text="developer"/>, currently studying <TagFilter v-model="tags" tag="physics" text="Physics"/> and <TagFilter v-model="tags" tag="cs" text="Comp Sci"/>.</h3>
    </div>
    <div class="projects">
      <ul>
        <li v-for="proj in projects" v-bind:key="proj.name">{{ proj.name }}</li>
      </ul>
    </div>
</template>

<script setup lang="ts">
let allProjects = readonly(ref([
  {
    name: 'Jets Group Research',
    imageUrl: '/favicon.ico',
    desc: 'loreum ipsum dolor sit amet',
    tags: ['research', 'physics'],
  },
  {
    name: 'This Website :)',
    imageUrl: '/favicon.ico',
    desc: 'loreum ipsum dolor sit amet',
    tags: ['software', 'cs'],
  },
  {
    name: 'AI Malware Detection',
    imageUrl: '/favicon.ico',
    desc: 'loreum ipsum dolor sit amet',
    tags: ['research', 'software', 'cs'],
  },
]));
let allTags = ['research', 'software', 'physics', 'cs'];
let tags = ref(new Map(allTags.map(
  tag => [tag, true]
)));
let projects = computed(() => allProjects.value.filter(
  x => tagsMatch(x.tags, tags.value)
));

function tagsMatch(my: readonly string[], enabled: Map<string, boolean>): boolean {
  for (const [x, alt] of [
    ['software', 'research'],
    ['research', 'software'],
    ['cs', 'physics'],
    ['physics', 'cs'],
  ]) {
    if (enabled.get(x) && !enabled.get(alt) && !my.includes(x)) {
      return false;
    }
  }
  return true;
}
</script>

<style scoped>
.header {
  --font-size: 60pt;
}

.header h1 {
  font-size: var(--font-size);
}

.header h3 {
  font-size: 25pt;
}

.header * {
  text-align: center;
}

.projects {
  display: flex;
  place-content: center;
}
</style>
