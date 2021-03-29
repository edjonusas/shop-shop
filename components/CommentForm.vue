<template>
  <form @submit.prevent="onSubmit">
    <h2>Leave a reply</h2>
    <textarea
      class="comment"
      name="text"
      placeholder="Your comment"
      cols="30"
      rows="10"
      v-model="text"
    ></textarea>
    <input class="comment" type="text" placeholder="Full Name" v-model="name" />

    <button class="myButton" type="submit">Post Comment</button>
  </form>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: "",
      text: ""
    };
  },
  methods: {
    async onSubmit() {
      const formData = {
        name: this.name,
        text: this.text,
        postId: this.postId
      };
      try {
        const newComment = await this.$store.dispatch("addComment", formData);
        this.$emit("created", newComment);
      } catch (e) {}
    }
  }
};
</script>

<style lang="scss">
@import "./assets/sass/main.scss";

.myButton {
  padding: 10px;
  border: none;
  background: $mainColor;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 20px;
}
.comment {
  resize: none;
  border: none;
  width: 100%;
  padding: 10px;
  background: #eaeaea;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
