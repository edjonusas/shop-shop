<template>
  <div class="block mt-5">
    <div>
      <div class="center mb-5">
        <h5>Create new user</h5>
      </div>
      <h6>Email address</h6>
      <input type="email" v-model="user.email" />
      <h6>Password</h6>
      <input type="password" v-model="user.passwordOne" />
      <h6>Repeat Password</h6>
      <input type="password" v-model="user.passwordTwo" />
    </div>
    <span>By creating an account, you agree to our <nuxt-link to="/policies/gdpr-policy">Privacy policy</nuxt-link> &
      <nuxt-link to="/policies/terms-conditions">Terms and Conditions</nuxt-link>.
</span>
    <div class="buttons">
      <div v-if="err" class="error">{{ message }}</div>
      <div class="center">
        <button @click="register">Register</button>
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
      user: {
        email: "",
        passwordOne: "",
        passwordTwo: ""
      },
      repeatPass: "",
      err: false,
      message: ""
    };
  },
  methods: {
    register() {
      let mailRegex = /^\S+@\S+\.\S+$/;
      let isEmailLegit = mailRegex.test(this.user.email);
      if (isEmailLegit && this.user.email.length > 0) {
        this.$store.dispatch("register", this.user).then(res => {
          if (res.success) {
            this.$router.push("/auth");
          } else {
            console.log(res.message);
            this.message = res.message;
            console.log(this.message);
            this.err = true;
          }
        });
      } else {
        this.err = true;
        console.log(this.err);
      }
    }
  }
};
</script>

<style scoped lang="sass">
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
  padding-left: 20px

div > input:last-child
  margin-bottom: 15px

h6
  font-weight: 400

h5
  font-weight: 700

span > a
  color: black
  text-decoration: underline


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

.error
  color: red
  margin-bottom: 20px

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
