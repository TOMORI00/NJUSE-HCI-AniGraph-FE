<template>
  <div id="kg-search-line-body">
    <div id="kg-search-line-switch" @click="handleSwitchClick">
      <svg v-if="!display" height="25" style="margin-top: 25px; margin-left: 10px" version="1.1"
           viewBox="0 0 1024 1024" width="32" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M729.6 931.2l-416-425.6 416-416c9.6-9.6 9.6-25.6 0-35.2-9.6-9.6-25.6-9.6-35.2 0l-432 435.2c-9.6 9.6-9.6 25.6 0 35.2l432 441.6c9.6 9.6 25.6 9.6 35.2 0C739.2 956.8 739.2 940.8 729.6 931.2z"
          fill="#333333" p-id="2069"></path>
      </svg>

      <svg v-if="display" height="25" style="margin-top: 25px; margin-left: 10px" version="1.1"
           viewBox="0 0 1024 1024" width="32" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"
          fill="#333333"></path>
      </svg>
      <!--      <div style="display: inline-block; position: relative; bottom: 8px; left: 2px; font-weight: bold">-->
      <!--        {{ switchTip }}-->
      <!--      </div>-->
    </div>
    <div id="kg-search-line-tip">搜索节点</div>
    <div
      style="width: 60%; outline: solid 1px gray; height: 0;margin-top: 1px;margin-bottom: 6px; margin-left: 20%; display: inline-block"></div>
    <div id="kg-search-line-main">
      <input id="kg-search-line-input">
      <div id="kg-search-line-result">
        <div id="kg-search-line-result-last" @click="emitPrevResultEvent">
          <svg height="16" version="1.1" viewBox="0 0 1024 1024" width="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M910.222222 796.444444c-17.066667 0-34.133333-5.688889-45.511111-17.066666L551.822222 409.6c-11.377778-5.688889-17.066667-11.377778-34.133333-11.377778-5.688889 0-22.755556 5.688889-28.444445 11.377778l-329.955555 364.088889c-22.755556 22.755556-56.888889 22.755556-79.644445 5.688889-22.755556-22.755556-22.755556-56.888889-5.688888-79.644445l329.955555-364.088889c28.444444-34.133333 73.955556-51.2 119.466667-51.2s85.333333 22.755556 119.466666 56.888889l312.888889 364.088889c22.755556 22.755556 17.066667 56.888889-5.688889 79.644445-11.377778 5.688889-28.444444 11.377778-39.822222 11.377777z"
              fill="#707070"></path>
          </svg>
        </div>
        <div id="kg-search-line-result-next" @click="emitNextResultEvent">
          <svg height="16" version="1.1" viewBox="0 0 1024 1024" width="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z"
              fill="#707070"></path>
          </svg>
        </div>
        <div id="kg-search-line-result-tip">第x个结果，共xx个</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KgSearchLine",
  data() {
    return {
      content: "",
      display: false,
      switchTip: "搜索",
    };
  },
  methods: {
    handleSwitchClick() {
      this.display = !this.display;
      if (this.display) {
        this.switchTip = "隐藏";
      } else {
        this.switchTip = "搜索";
      }
      this.$emit("display-switch", this.display);
    },

    emitSearchEvent() {
      this.$emit("search-acknowledge", this.content);
    },

    emitSearchCancelEvent(){
      this.$emit("search-cancel");
    },

    emitNextResultEvent() {
      this.$emit("next-result");
    },

    emitPrevResultEvent() {
      this.$emit("prev-result");
    },
  }
};
</script>

<style scoped>
#kg-search-line-switch {
  height: 70px;
  width: 50px;
  position: absolute;
  left: -50px;
  /*backdrop-filter: saturate(200%) blur(30px);*/
  background: rgba(240, 240, 240, 0.7);
  box-shadow: 0 10px 10px rgba(220, 220, 220, 0.7);
  border-radius: 30px 0 0 30px;
}

#kg-search-line-switch:hover {
  cursor: pointer;
}

#kg-search-line-tip {
  font-weight: bold;
  text-align: center;
}

#kg-search-line-main {
  display: flex;
  align-items: center;
}

#kg-search-line-input {
  outline: none;
  border: none;
  font-size: 16px;
}

#kg-search-line-result {
  display: flex;
  align-items: center;
}

#kg-search-line-result-last {
  padding-top: 5px;
  margin-left: 10px;
}

#kg-search-line-result-next {
  padding-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>