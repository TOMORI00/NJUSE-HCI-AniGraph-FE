<template>
  <div>{{ node.name_cn }} / {{ node.name }}</div>
</template>

<script>
export default {
  name: "KgNodeBriefIntroduction",
  props: {
    node: Object,
  }
};
</script>

<style scoped>

</style>