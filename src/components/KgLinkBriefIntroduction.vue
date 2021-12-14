<template>
  <div id="kg-link-introduction-body">
    <div v-if="link.type!=='series'">
      <span style="color: #fb7299">{{ link.source.name_cn }}</span>
      是
      <span style="color: #fb7299">{{ link.target.name_cn }}</span>
      的
      <span style="color: #fb7299">{{ linkName }}</span>
    </div>
    <div v-else>
      同系列作品:
      <span style="color: #fb7299">{{ link.source.name_cn }}</span>
      和
      <span style="color: #fb7299">{{ link.target.name_cn }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "KgLinkBriefIntroduction",
  props: {
    link: Object,
  },
  computed: {
    linkName() {
      return this.link.name === "系列" ? "同系列作品" : this.link.name;
    }
  }
};
</script>

<style scoped>
#kg-link-introduction-body {
  white-space: pre-line;
}

span {
  padding-left: 5px;
  padding-right: 5px;
}
</style>