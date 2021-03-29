<template>
  <div class="container">
    <ul
      class="breadcrumbs"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <nuxt-link
          to="/"
          itemid="/"
          itemtype="https://schema.org/Thing"
          itemscope
          itemprop="item"
        >
          <span itemprop="name">Home</span> </nuxt-link
        ><span class="breadcrumbs-arrow">&gt;</span>
        <meta itemprop="position" content="1" />
      </li>
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <nuxt-link
          to="/posts"
          itemid="/posts"
          itemtype="https://schema.org/Thing"
          itemscope
          itemprop="item"
        >
          <span itemprop="name">Posts</span></nuxt-link
        >
        <meta itemprop="position" content="2" />
      </li>
    </ul>
    <div class="posts-block">
      <PostCards class="posts" :posts="posts" />
      <RecentPosts class="recentPosts" :recentPosts="latestNews" />
    </div>
    <div v-if="pageCount > 1" class="pagination">
      <button
        class="pagBtn active"
        @click="goTo(parseInt($route.query.page) - 1)"
        v-if="this.$route.query.page > 1 && this.$route.query.page <= pageCount"
      >
        Prev
      </button>
      <button @click="goTo(1)" class="pagBtn" v-if="currentPage > 1">
        1
      </button>
      <span v-if="currentPage === pageCount && pageCount - 1 > 1">...</span>
      <button class="pagBtn active">{{ currentPage }}</button>
      <span v-if="currentPage === 1 && pageCount - currentPage > 1">...</span>
      <button
        @click="goTo(pageCount)"
        class="pagBtn"
        v-if="pageCount > currentPage"
      >
        {{ pageCount }}
      </button>
      <button
        class="pagBtn active"
        @click="goTo(parseInt($route.query.page) + 1)"
        v-if="!$route.query.page || $route.query.page < pageCount"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    currentPage: 1
  }),
  async asyncData({ $axios, query, store }) {
    let page;
    query.page ? (page = query.page) : (page = 1);
    const { posts, pageCount } = await store.dispatch("getPosts", page);
    return { posts, pageCount };
  },
  computed: {
    latestNews() {
      return this.$store.getters.getLatestNews;
    }
  },
  methods: {
    async goTo(page) {
      page ? page : (page = 2);
      this.currentPage = page;
      const { posts } = await this.$store.dispatch("getPosts", page);
      this.posts = posts;
      this.$router.push("/posts?page=" + page);
    }
  },
  created() {
    this.$route.query.page
      ? (this.currentPage = this.$route.query.page)
      : (this.currentPage = 1);
  },
  watch: {
    $route(val) {
      if (!val.fullPath.includes("page")) {
        this.$nuxt.refresh();
        this.currentPage = 1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./assets/sass/main.scss";

.active {
  background: $mainColor;
  color: #fff;
}
.pagBtn {
  border: none;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  color: none;
}
.pagBtn:focus {
  outline: none;
}
.pagBtn:active {
  transform: scale(0.98);
}
.pagination {
  margin-top: 20px;
}
</style>
