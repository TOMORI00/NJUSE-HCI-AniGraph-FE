<template>
  <div >
    <div class="legend" style="display: flex" @click="handleClick(1)">
      <div
        style="width: 20px; height: 20px; border: 1px solid #fff; border-radius: 50%; margin-right: 10px; margin-bottom: 5px;"
        :style="{background: subject?'#ff7875':'rgba(240, 240, 240, 0.7)'}"/>
      <div>动漫</div>
    </div>

    <div class="legend" style="display: flex" @click="handleClick(2)">
      <div
        style="width: 20px; border: 1px solid #fff; height: 20px; border-radius: 50%; margin-right: 10px; margin-bottom: 5px;"
        :style="{background: character?'#40a9ff':'rgba(240, 240, 240, 0.7)'}"/>
      <div>角色</div>
    </div>
    <div class="legend" style="display: flex" @click="handleClick(3)">
      <div
        style="width: 20px; height: 20px; border: 1px solid #fff; border-radius: 50%; margin-right: 10px; margin-bottom: 5px;"
        :style="{background: actor?'rgb(112, 212, 69)':'rgba(240, 240, 240, 0.7)'}"/>
      <div>声优</div>
    </div>
    <div class="legend" style="display: flex" @click="handleClick(4)">
      <div
        style="width: 20px; height: 20px; border: 1px solid #fff; border-radius: 50%; margin-right: 10px; margin-bottom: 5px;"
        :style="{background: staff?'#ffa940':'rgba(240, 240, 240, 0.7)'}"/>
      <div>制作人</div>
    </div>
    <div class="legend" @click="handleClick(5)" style="display: flex;margin-bottom: 5px">
      <div style="margin-top: 10px; opacity: 0.6; width: 20px; height: 0; border: 1px dashed; margin-right: 10px; margin-bottom: 5px;"
           :style="{'border-color': series?'#ff7875':'rgba(240, 240, 240, 0.7)'}"/>
      <div>系列作品</div>
    </div>
    <div class="legend" @click="handleClick(6)" style="display: flex">
      <div style="margin-top: 10px; opacity: 0.6; width: 20px; height: 0; border: 1px solid; margin-right: 10px;"
           :style="{'border-color': link?'#999999':'rgba(240, 240, 240, 0.7)'}"/>
      <div>其他关系</div>
    </div>
  </div>
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
    handleClick(type) {
      switch (type) {
        case 1:
          this.subject = !this.subject;
          break;
        case 2:
          this.character = !this.character;
          break;
        case 3:
          this.actor = !this.actor;
          break;
        case 4:
          this.staff = !this.staff;
          break;
        case 5:
          this.series = !this.series;
          break;
        case 6:
          this.link = !this.link;
          break;
      }
      this.emitLegendChangeEvent();
    },
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
.legend {
  cursor: pointer;
  user-select: none;
}
</style>