<template>
    <div class="flip-board">
        <pre
            v-for="letter in letters" v-bind:key="letter.mask"
        >{{ letter.currentChar }}</pre>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    desiredText: string,
    initialText: string,
}>();

const flipAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 :()';
const letters = ref([...props.initialText].map((ch, i) => ({
    currentChar: ch,
    current: flipAlphabet.indexOf(ch),
    desired: flipAlphabet.indexOf(props.desiredText[i]),
    mask: 1 << i,
})));
let flipping = (1 << props.desiredText.length) - 1;
let interval: NodeJS.Timeout | undefined;

function flipOnce() {
    for (const letter of letters.value) if (flipping & letter.mask) {
        letter.current = (letter.current + 1) % flipAlphabet.length;
        letter.currentChar = flipAlphabet[letter.current];
        if (letter.current === letter.desired) flipping ^= letter.mask;
    }
    if ((interval !== undefined) && !flipping) {
        clearInterval(interval);
        interval = undefined;
    }
}

onMounted(() => {
    interval = setInterval(() => {
        flipOnce();
    }, 30);
});

onBeforeUnmount(() => {
    if (interval !== undefined) clearInterval(interval);
});
</script>

<style scoped>
.flip-board {
  display: inline-block;
  background-color: var(--board-color);
  height: fit-content;
  font-size: 0;
  border-radius: 5px;
  --internal-margin: 5px;
  --board-color: #2a2a2a;
}

.flip-board>pre {
  display: inline-block;
  margin: var(--internal-margin);
  font-size: var(--font-size);
  border-radius: 3px;
  box-shadow: inset 0 -3px 5px #424242, inset -3px 0 5px #525252;
}

.flip-board>pre::before {
  display: block;
  position: absolute;
  content: " ";
  text-decoration: 6px var(--board-color) underline;
  text-underline-offset: calc(-50% + var(--internal-margin) + 2.333px);
}
</style>