<template>
  <div>
    <GlobalHeader></GlobalHeader>
    <div id="error-page-body">
      <div id="error-page-main">
        <div id="error-page-tip">
          <img id="error-page-tip-img" alt="" src="../assets/logo.png">
          <div id="error-page-tip-1">抱歉，网络出错了 :（</div>
        </div>
        <div id="error-page-tip-2">——请检查网络连接或稍后再来</div>
<!--        <div id="error-page-tip-button" @click="toSearchPage">-->
<!--          <svg id="error-page-tip-button-icon" height="32" version="1.1"-->
<!--               viewBox="0 0 1024 1024" width="32" xmlns="http://www.w3.org/2000/svg">-->
<!--            <path-->
<!--                d="M643.84 164.885333a22.122667 22.122667 0 0 0-0.362667-30.72 20.522667 20.522667 0 0 0-29.674666 0.362667L256 512.810667l357.802667 378.304c8.042667 8.533333 21.290667 8.746667 29.674666 0.341333 8.32-8.32 8.533333-22.016 0.384-30.72L316.330667 512.832l327.530666-347.946667z"-->
<!--                fill="#ffffff"></path>-->
<!--          </svg>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";

export default {
  name: "ErrorPage",
  components: { GlobalHeader },
  methods: {
    toSearchPage() {
      this.$router.push("/search");
      location.reload();
    },
  }
};
</script>

<style scoped>
#error-page-body {
  display: flex;
  align-content: center;
  justify-content: center;
}

#error-page-main {
  margin-top: 30vh;
}

#error-page-tip {
  display: flex;
}

#error-page-tip-img {
  height: 50px;
  width: 50px;
}

#error-page-tip-1 {
  font-size: 35px;
  margin-left: 10px;
}

#error-page-tip-2 {
  margin: 5px 0 0 80px;
  font-size: 20px;
}

#error-page-tip-button {
  margin: 10vh 0 0 175px;
  background: #fb7299;
  border-radius: 50%;
  height: 50px;
  width: 50px;
}

#error-page-tip-button:hover {
  cursor: pointer;
  background: #e8658b;
}

#error-page-tip-button-icon {
  margin-top: 9px;
  margin-left: 9px;
}
</style>