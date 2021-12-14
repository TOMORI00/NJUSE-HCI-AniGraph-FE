<template>
  <div>KG Legend 知识图谱图例</div>
</template>

<script>
export default {
  name: "KgLegend",
  data() {
    return {
      subject: true,
      character: true,
      actor: true,
      staff: true,
      series: true,
      link: true,
    };
  },
  methods: {
    emitLegendChangeEvent() {
      this.$emit("legend-change", {
        subject: this.subject,
        character: this.character,
        actor: this.actor,
        staff: this.staff,
        series: this.series,
        link: this.link,
      });
    },
  },
};
</script>

<style scoped>

</style>