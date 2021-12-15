<template>
  <div>
    <div style="margin-left: 8px; margin-bottom: 5px">
      <svg class="icon" height="16" @click="handleScaleUp"
           version="1.1" viewBox="0 0 1024 1024" width="16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M512 512V170.666667h42.666667v341.333333h341.333333v42.666667h-341.333333v341.333333h-42.666667v-341.333333H170.666667v-42.666667h341.333333z"
          fill="#707070"></path>
      </svg>
    </div>
    <div style="display: inline-block;height: 200px;">
      <a-slider v-model="scale"
                :default-value="30"
                :marks="marks"
                :tipFormatter="tipFormatter"
                tooltipPlacement="right"
                vertical/>
    </div>
    <div style="margin-left: 8px; margin-top: 15px">
      <svg class="icon" height="16" version="1.1" @click="handleScaleDown"
           viewBox="0 0 1024 1024" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 512h768v46.933333H128z" fill="#707070"></path>
      </svg>
    </div>
    <div id="kg-scale-display-reset-button" @click="handleReset">
      <svg class="icon" height="20" version="1.1"
           viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M640 921.6V981.333333l-85.333333-85.333333-42.666667-42.666667h21.333333c174.933333 0 320-145.066667 320-320 0-145.066667-93.866667-264.533333-226.133333-307.2L571.733333 170.666667c183.466667 21.333333 324.266667 174.933333 324.266667 358.4 0 174.933333-123.733333 320-290.133333 354.133333l34.133333 38.4zM426.666667 145.066667V85.333333l85.333333 85.333334 42.666667 42.666666h-21.333334C358.4 213.333333 213.333333 354.133333 213.333333 533.333333c0 140.8 93.866667 264.533333 221.866667 302.933334l55.466667 55.466666c-179.2-21.333333-320-170.666667-320-358.4C170.666667 358.4 294.4 213.333333 460.8 179.2l-34.133333-34.133333z"
          fill="#707070"></path>
      </svg>
    </div>
  </div>
</template>

<script>
import { Slider as ASlider, } from "ant-design-vue";

export default {
  name: "KgScaleDisplay",
  data() {
    return {
      current: 1,
      scale: 50,
      marks: {
        0: "",
        50: "",
        100: "",
      },
    };
  },
  components: {
    ASlider,
  },
  watch: {
    scale() {
      if (this.scale >= 50) {
        this.current = ((this.scale - 50) / 50 * 7 + 1);
      } else {
        this.current = (1 / ((50 - this.scale) / 50 * 7 + 1));
      }
      this.emitScaleChangeEvent(this.current);
    }
  },
  methods: {
    tipFormatter() {
      return this.current.toFixed(2);
    },

    setScale(k) {
      if (k >= 1) {
        this.scale = (k - 1) / 7 * 50 + 50;
      } else {
        this.scale = 50 - (1 / k - 1) / 7 * 50;
      }
    },

    emitScaleChangeEvent(scale) {
      this.$emit("scale-change", scale);
    },

    handleReset() {

    },

    handleScaleUp() {

    },

    handleScaleDown() {

    },
  },
};
</script>

<style scoped>
svg {
  cursor: pointer;
}

#kg-scale-display-reset-button {
  position: absolute;
  width: 32px;
  height: 32px;
  background: #fb7299;
  bottom: -40px;
  background: rgba(240, 240, 240, 0.7);
  box-shadow: 0 10px 10px rgba(220, 220, 220, 0.7);
  border-radius: 10px;
  padding-top: 7px;
  padding-left: 5px;
}
</style>