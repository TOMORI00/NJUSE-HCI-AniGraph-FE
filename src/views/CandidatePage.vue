<template>
  <div id="search-page-body" v-title data-title="AniGraph | 搜索候选">
    <GlobalHeader :current-page="currentPage" id="candidate-page-header"></GlobalHeader>
    <div id="candidate-page-main">
      <div v-for="(item, i) in searchCandidateContent" id="candidate-page-list" :key="i"
           class="candidate-page-list-content">
        <img class="candidate-page-list-content-img" @click="toGraph(item.id)"
             :src="getImageSrc(item.image_grid)" alt="Error..." >
        <div class="candidate-page-list-content-description">
          <div class="candidate-page-list-content-title">
            <div
                class="candidate-page-list-content-title-name-cn"
                @click="toGraph(item.id)">{{ item.name_cn }}</div>
            <div class="candidate-page-list-content-title-name">{{ item.name }}</div>
          </div>
          <div
              class="candidate-page-list-content-summary"
              style="white-space: pre-line; font-size: small">
            {{ decodeURIComponent(String(item.summary).replace(/%/g, "%25")) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";
import {searchEntityByNameAPI} from "@/api";

export default {
  name: "CandidatePage",
  components: {GlobalHeader},
  data() {
    return {
      currentPage: "CandidatePage",
      searchCandidateContent: [],

      nullImageSrc: "https://mjh1.oss-cn-hangzhou.aliyuncs.com/hci/null.svg", //todo 上服务器
    };
  },
  computed: {
  },
  mounted() {
    searchEntityByNameAPI(decodeURIComponent(String(this.$route.query.q)))
      .then((res) => {
        this.searchCandidateContent = res.data.content;
      });
  },
  methods: {
    toGraph(id) {
      this.$router.push({path: "/graph", query: {entityId: id}});
    },

    getImageSrc(image) {
      return image !== null ? image.replace("http", "https") : this.nullImageSrc;
    },
  },
};
</script>

<style scoped>
#candidate-page-header {
  position: sticky;
  top: 0;
  z-index: 999;
}

#candidate-page-main {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5vh;
}

.candidate-page-list-content {
  width: 50vw;
  margin-bottom: 35px;
  display: flex;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 5px;

}

.candidate-page-list-content-img {
  width: 120px;
  height: 120px;
  margin-right: 10px;
}

.candidate-page-list-content-img:hover {
  cursor: pointer;
}

.candidate-page-list-content-title {
  display: flex;
  align-content: center;
}

.candidate-page-list-content-title-name-cn {
  font-size: large;
  color: #fb7299;
  font-weight: bold;
  margin-right: 10px;
  flex-shrink: 0.3;
}

.candidate-page-list-content-title-name {
  padding-top: 3px;
  color: rgba(128, 128, 128);
}

.candidate-page-list-content-title-name-cn:hover {
  cursor: pointer;
  text-decoration: underline;
}

.candidate-page-list-content-summary {
  margin-top: 5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>