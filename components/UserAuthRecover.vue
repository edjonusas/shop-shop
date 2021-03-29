<template>
  <div class="block mt-5">
    <div class="center">
      <h5 class="mb-5">Recover</h5>
    </div>
    <div class="input">
      <h6>Email address</h6>
      <input type="email" v-model="email"/>
    </div>
    <div class="buttons">
      <div v-if="err">Empty input field</div>
    <div class="center">
      <button @click="recoverPass">Recover</button>
      <nuxt-link to="/auth">
        <button>Back</button>
      </nuxt-link>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      email: "",
      err: false
    };
  },
  methods: {
    recoverPass() {
      let mailRegex = /^\S+@\S+\.\S+$/;
      let isEmailLegit = mailRegex.test(this.email);

      if ((isEmailLegit && this.email.length > 0)) {
        this.$store.dispatch("recoverPassword", {email: this.email}).then(res => {
          if(res.success) {
            return this.$router.push("/");
          } else {
            console.log(res)
            this.err = true;
          }
        });
      } else {
        this.err = true;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import "assets/sass/main"

.block
  font-family: $mainFont
  display: block
  margin-left: auto
  margin-right: auto
  width: 700px

input
  width: 700px
  height: 45px
  background-color: #f2f2f2
  padding: 0
  border: none

h6
  font-weight: 400
  margin-top: 15px

h5
  font-weight: 700

button
  height: 43px
  width: 80px
  margin-right: 10px
  margin-bottom: 20px
  background-color: black
  color: white
  font-weight: 500
  padding: 0
  border: none

.buttons
  margin-top: 25px

@media (max-width: $BpPhone)
  .block
    width: 200px
    text-align: center

  input
    width: 200px

  .buttons
    display: flex
    flex-wrap: wrap

@media (max-width: $BpTablet) and (min-width: $BpPhone)
  .block

    width: 350px



  input
    width: 350px

  .center
    display: flex
    justify-content: center

</style>
