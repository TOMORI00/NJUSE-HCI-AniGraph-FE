<template>
  <div>
    <div style="display: inline-block;height: 300px;margin-left: 70px">
      <a-slider v-model="current" :default-value="30" :tipFormatter="tipFormatter" tooltipPlacement="right" vertical/>
    </div>
  </div>
</template>

<script>
import { Slider as ASlider, } from "ant-design-vue";

export default {
  name: "KgScaleDisplay",
  data() {
    return {
      scale: 1,
      current: 50,
    };
  },
  components: {
    ASlider,
  },
  watch: {
    scale() {
      this.emitScaleChangeEvent();
    }
  },
  methods: {
    tipFormatter() {
      if (this.current >= 50) {
        this.scale = (this.current - 50) / 50 * 7 + 1;
        this.emitScaleChangeEvent();
        return this.scale;
      } else {
        this.scale = 1 / ((50 - this.current) / 50 * 7 + 1);
        this.emitScaleChangeEvent();
        return this.scale;
      }
    },

    setScale(scale) {
      this.scale = scale;
    },

    emitScaleChangeEvent() {
      console.log(this.scale);
      this.$emit("scale-change", this.scale);
    },
  },
};
</script>

<style scoped>

</style>