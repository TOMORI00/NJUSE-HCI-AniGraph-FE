<template>
  <div class="nav">
    <div v-if="currentPage==='GraphPage'" style="cursor:pointer;padding:2px;height: 25px;width: 25px;margin-right: 25px" @click="$router.back()">
      <svg t="1639915169697" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="6975" width="21" height="21" fill="#fb7299">
        <path
          d="M261.31 467.211l99.327-108.188-55.43-60.327L138.92 479.722l-27.648 30.141 193.981 211.39 55.34-60.55-99.283-108.188H677.5V467.21h-416.19zM442.423 1024h391.791a75.42 75.42 0 0 0 55.608-25.021 89.533 89.533 0 0 0 22.84-60.55V85.526A82.276 82.276 0 0 0 834.036 0H442.246v85.304H794.68a37.576 37.576 0 0 1 27.781 12.243 44.522 44.522 0 0 1 11.665 30.052v768.757a41.227 41.227 0 0 1-39.446 42.34H442.424V1024z m0 0"
          p-id="6976" fill="#fb7299"></path>
      </svg>
    </div>
    <!--    <div @click="toHomePage" class="nav-button">Avatar</div>-->
    <!--    <div @click="toSearchPage" v-show="currentPage !== 'SearchPage'" class="nav-button">搜索</div>-->
    <!--    <div @click="toHomePage" class="nav-button">个人中心</div>-->
    <!--    <div></div>-->
    <!--    <div></div>-->
    <!--    <div @click="toArchive" class="nav-button">每日放送</div>-->
    <div v-if="currentPage==='GraphPage'" style="cursor:pointer;height: 25px;width: 25px" @click="$emit('show-modal')">

      <svg t="1639623240339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="2025" width="25" height="25">
        <path
          d="M463.99957 784.352211c0 26.509985 21.490445 48.00043 48.00043 48.00043s48.00043-21.490445 48.00043-48.00043c0-26.509985-21.490445-48.00043-48.00043-48.00043S463.99957 757.842226 463.99957 784.352211z"
          p-id="2026" fill="#fb7299"></path>
        <path
          d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128.287273c-211.584464 0-383.712727 172.128262-383.712727 383.712727 0 211.551781 172.128262 383.712727 383.712727 383.712727 211.551781 0 383.712727-172.159226 383.712727-383.712727C895.712727 300.415536 723.551781 128.287273 512 128.287273z"
          p-id="2027" fill="#fb7299"></path>
        <path
          d="M512 673.695256c-17.664722 0-32.00086-14.336138-32.00086-31.99914l0-54.112297c0-52.352533 39.999785-92.352318 75.32751-127.647359 25.887273-25.919957 52.67249-52.67249 52.67249-74.016718 0-53.343368-43.07206-96.735385-95.99914-96.735385-53.823303 0-95.99914 41.535923-95.99914 94.559333 0 17.664722-14.336138 31.99914-32.00086 31.99914s-32.00086-14.336138-32.00086-31.99914c0-87.423948 71.775299-158.559333 160.00086-158.559333s160.00086 72.095256 160.00086 160.735385c0 47.904099-36.32028 84.191695-71.424378 119.295794-27.839699 27.776052-56.575622 56.511974-56.575622 82.3356l0 54.112297C544.00086 659.328155 529.664722 673.695256 512 673.695256z"
          p-id="2028" fill="#fb7299"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlobalHeaderNavigator",
  props: ["currentPage"],
  methods: {
    toHomePage() {
      this.$router.push("/home");
    },
    toArchive() {
      this.$router.push("/archive");
    },
    toSearchPage() {
      this.$router.push("/search");
    },
  }
};
</script>

<style scoped>
.nav {
  width: 195px;
  display: flex;
  justify-content: space-around;
  padding-left: 95px;
  padding-right: 25px;
  font-weight: bolder;
  font-size: larger;
}

.nav-button:hover {
  cursor: pointer;
}
</style>