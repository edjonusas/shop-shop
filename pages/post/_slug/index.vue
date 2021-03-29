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
          <span itemprop="name">Posts</span> </nuxt-link
        ><span class="breadcrumbs-arrow">&gt;</span>
        <meta itemprop="position" content="2" />
      </li>
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <span itemprop="name">{{ post.title }}</span>
        <meta itemprop="position" content="3" />
      </li>
    </ul>
    <nuxt-link to="/"> </nuxt-link>
    <div class="posts-block">
      <div class="posts">
        <div
          class="post-image"
          :style="{
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: `url(${post.image})`
          }"
        ></div>
        <small>{{ post.createdAt | dateFilter("datetime") }}</small>
        <h1>{{ post.title }}</h1>
        <p>{{ post.description }}</p>
        <div v-html="post.content"></div>
        <hr class="spacing" />

        <div class="comments" v-if="post.comments.length">
          <h2>Comments ({{ post.comments.length }})</h2>
          <comment
            v-for="comment in post.comments"
            :key="comment._id"
            :comment="comment"
          />
        </div>
        <div class="text-center" v-else>No comments</div>
        <hr class="spacing" />
        <comment-form
          v-if="canAddComment"
          @created="createCommentHandler"
          :postId="post._id"
        />
      </div>
      <div class="recentPosts">
        <recent-posts class="recentPosts" :recentPosts="latestNews" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const res = await store.dispatch("singlePost", params.slug);
    await store.dispatch("addView", res.post);
    return {
      post: { ...res.post, views: res.post.views }
    };
  },
  data() {
    return {
      canAddComment: true
    };
  },
  computed: {
    latestNews() {
      return this.$store.getters.getLatestNews;
    }
  },
  methods: {
    createCommentHandler(comment) {
      this.post.comments.unshift(comment);
      this.canAddComment = false;
    }
  }
};
</script>
<style lang="scss">
@import "./assets/sass/main.scss";

.posts-block {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
.spacing {
  margin: 40px 0;
}
.posts {
  flex: 8;
  margin-right: 40px;
}
.post-image {
  height: 400px;
  margin-bottom: 10px;
}
.recentPosts {
  flex: 2;
}
.breadcrumbs {
  display: flex;
  margin: 0;
  margin-bottom: 0px;
  margin-bottom: 12px;
  padding: 0;
  list-style: none;
}
.breadcrumbs li a {
  color: #000000;
  margin-right: 10px;
}
.breadcrumbs li a:hover {
  color: $mainColor;
}
.breadcrumbs-arrow {
  margin-right: 10px;
}
@media (max-width: 800px) {
  .recentPosts {
    display: none;
  }
  .posts {
    margin-right: 0;
  }
}
</style>
