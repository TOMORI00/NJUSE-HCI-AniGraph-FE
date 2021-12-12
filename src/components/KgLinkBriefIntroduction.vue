<template>
  <div>{{ link.source.name_cn }} --> {{ link.target.name_cn }}</div>
</template>

<script>
export default {
  name: "KgLinkBriefIntroduction",
  props:{
    link:Object,
  }
};
</script>

<style scoped>

</style>