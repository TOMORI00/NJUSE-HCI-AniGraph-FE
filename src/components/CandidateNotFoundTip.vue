<template>
  <div>
    <div id="candidate-not-found-tip-title">
      <img id="candidate-not-found-tip-title-img" alt="" src="../assets/logo.png">
      <div id="candidate-not-found-tip-title-1">我们没有找到你想要的结果</div>
    </div>
    <div id="candidate-not-found-tip-title-2">——也许可以尝试点别的</div>
    <div id="candidate-not-found-tip-title-button" @click="toSearchPage">
      <svg id="candidate-not-found-tip-title-button-icon" height="32" version="1.1"
           viewBox="0 0 1024 1024" width="32" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M643.84 164.885333a22.122667 22.122667 0 0 0-0.362667-30.72 20.522667 20.522667 0 0 0-29.674666 0.362667L256 512.810667l357.802667 378.304c8.042667 8.533333 21.290667 8.746667 29.674666 0.341333 8.32-8.32 8.533333-22.016 0.384-30.72L316.330667 512.832l327.530666-347.946667z"
            fill="#ffffff"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "CandidateNotFoundTip",
  methods: {
    toSearchPage() {
      this.$router.push("/search");
      location.reload();
    },
  }
};
</script>

<style scoped>
#candidate-not-found-tip-title {
  display: flex;
}

#candidate-not-found-tip-title-img {
  height: 50px;
  width: 50px;
}

#candidate-not-found-tip-title-1 {
  font-size: 35px;
  margin-left: 10px;
}

#candidate-not-found-tip-title-2 {
  margin: 5px 0 0 100px;
  font-size: 25px;
}

#candidate-not-found-tip-title-button {
  margin: 10vh 0 0 215px;
  background: #fb7299;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  animation: roll 1s;
}

@keyframes roll {
  0% {
    transform:translateY(0%) translateX(-100%) rotate(180deg);
  }

  100% {
    transform: translateY(0) translateX(0) rotate(360deg);
  }
}

#candidate-not-found-tip-title-button:hover {
  cursor: pointer;
  background: #e8658b;
}

#candidate-not-found-tip-title-button-icon {
  margin-top: 9px;
  margin-left: 9px;
}
</style>