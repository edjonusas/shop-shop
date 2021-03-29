<template>
  <div class="container">
    <div class="d-flex">
      <div class="form">
        <h2>Billing details</h2>
        <form action="">
          <div class="name">
            <div class="fname">
              <label for="fname">First name *</label>
              <input
                type="text"
                name="fname"
                id="fname"
                v-model="order.shipping.firstName"
                required
              />
              <div class="nameErr"></div>
            </div>
            <!-- {{ fname }} -->
            <div class="lname">
              <label for="lname">Last name *</label>
              <input
                type="text"
                name="lname"
                id="lname"
                v-model="order.shipping.secondName"
                required
              />
              <div class="lnameErr"></div>
            </div>
          </div>
          <div class="company">
            <label for="company_name">Company name</label>
            <input
              type="text"
              name="company_name"
              id="company_name"
              v-model="order.shipping.company"
            />
          </div>
          <div class="country">
            <label for="country">Country / Region *</label>
            <input
              type="text"
              name="country"
              id="country"
              v-model="order.shipping.country"
              required
            />
            <div class="countryErr"></div>
          </div>
          <div class="address">
            <label for="address">Address * </label>
            <input
              type="text"
              name="address"
              id="address"
              v-model="order.shipping.address"
              required
            />
            <div class="addressErr"></div>
          </div>
          <div class="zip">
            <label for="zip">Postal code / ZIP (optional)</label>
            <input
              type="number"
              name="zip"
              id="zip"
              v-model="order.shipping.zip"
            />
          </div>
          <div class="city">
            <label for="city">City * </label>
            <input
              type="text"
              name="city"
              id="city"
              v-model="order.shipping.city"
              required
            />
            <div class="cityErr"></div>
          </div>
          <div class="phone">
            <label for="phone">Phone number * </label>
            <input
              type="phone"
              name="phone"
              id="phone"
              v-model="order.shipping.phone"
              required
            />
            <div class="numberErr"></div>
          </div>
          <div class="email">
            <label for="email">Email address *</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="order.shipping.email"
              required
            />
            <div class="emailErr"></div>
          </div>
          <div class="block">
            <label for="notes">Order notes (optional)</label>
            <textarea
              name="notes"
              id="notes"
              v-model="order.shipping.notes"
            ></textarea>
          </div>
        </form>
      </div>
      <div class="side">
        <h2>Your order</h2>
        <div class="table">
          <div class="t-row">
            <div class="t-data">
              Product
            </div>
            <div class="t-data">
              Subtotal
            </div>
          </div>
          <div class="t-row">
            <div class="t-data">
              <div v-for="(item, index) in cartItems" :key="index">
                <span> {{ item.title }} x {{ item.amount }} </span>
              </div>
            </div>
            <div class="t-data">
              <div v-for="(item, index) in cartItems" :key="index">
                <span> {{ item.cost }} $ </span>
              </div>
            </div>
          </div>
          <div class="t-row ship">
            <div class="t-data">
              Free shipping
              <fa class="check" icon="check" />
            </div>
          </div>
          <div class="t-row ">
            <div class="t-data">
              TOTAL
            </div>
            <div class="t-data">{{ totalPrice }} $</div>
          </div>
          <div class="ppImg">
            <img src="../assets/images/paypal_button.PNG" alt="paypal_button" />
          </div>
          <div class="ppErr">
            <span>Please fill in all fields</span>
          </div>
          <div class="voh hidden" style="width: 100%">
            <PaypalCheckoutButton id="buttonas" :order="order" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaypalCheckoutButton from "~/components/PaypalCheckoutButton";
import order from "~/server/models/order";
export default {
  name: "checkout",
  components: {
    PaypalCheckoutButton
  },
  data() {
    return {
      order: {
        shipping: {
          firstName: "",
          secondName: "",
          company: "",
          country: "",
          address: "",
          zip: "",
          city: "",
          phone: "",
          email: "",
          notes: ""
        },
        products: [
          //ARRAY OF PRODUCTS USER WANNA BUY
        ],
        total: "" // total price for all products as STRING
      }
    };
  },
  created() {
    this.order.products.push(this.$store.getters.getCartItems);
    this.order.total = this.$store.getters.getTotalPrice;
  },
  computed: {
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    },
    loggedIn() {
      return this.$store.getters.getIsLoggedIn;
    }
  },
  updated() {
    console.log("UPDATED");
    this.validateForm();
  },
  methods: {
    validateForm() {
      let length = 100;
      let nameRegex = /^[a-zA-Z]+$/;
      let isNameLegit = nameRegex.test(this.order.shipping.fname);
      if (
        this.order.secondName != "" ||
        this.order.shipping.country != "" ||
        this.order.shipping.address != "" ||
        this.order.shipping.city != "" ||
        this.order.shipping.phone != "" ||
        (this.order.shipping.email != "" &&
          this.order.shipping.firstName == "") ||
        !isNameLegit ||
        this.order.shipping.firstName.lenght > lenght
      ) {
        document.querySelector(".nameErr").textContent =
          "Please enter your name";
        document.querySelector(".fname").classList.add("red");
      }
      if (
        this.order.shipping.firstName != "" &&
        isNameLegit &&
        this.order.shipping.firstName.length < length
      ) {
        document.querySelector(".nameErr").textContent = "";
        document.querySelector(".fname").classList.remove("red");
      }
      let isLnameLegit = nameRegex.test(this.order.shipping.secondName);
      if (
        this.order.shipping.country != "" ||
        this.order.shipping.address != "" ||
        this.order.shipping.city != "" ||
        this.order.shipping.phone != "" ||
        (this.order.shipping.email != "" &&
          this.order.shipping.secondName == "") ||
        !isLnameLegit ||
        this.order.shipping.firstName.length > length
      ) {
        document.querySelector(".lnameErr").textContent =
          "Please enter your last name";
        document.querySelector(".lname").classList.add("red");
      }
      if (
        this.order.shipping.secondName != "" &&
        isLnameLegit &&
        this.order.shipping.firstName.length < length
      ) {
        document.querySelector(".lnameErr").textContent = "";
        document.querySelector(".lname").classList.remove("red");
      }
      let countryRegex = /^[a-zA-Z]+$/;
      let isCountryLegit = countryRegex.test(this.order.shipping.country);
      if (
        this.order.shipping.address != "" ||
        this.order.shipping.city != "" ||
        this.order.shipping.phone != "" ||
        (this.order.shipping.email != "" &&
          this.order.shipping.country == "") ||
        !isCountryLegit
      ) {
        document.querySelector(".countryErr").textContent =
          "Please enter country";
        document.querySelector(".country").classList.add("red");
      }
      if (this.order.shipping.country != "" && isCountryLegit) {
        document.querySelector(".countryErr").textContent = "";
        document.querySelector(".country").classList.remove("red");
      }
      if (
        this.order.shipping.city != "" ||
        (this.order.shipping.phone != "" && this.order.shipping.address == "")
      ) {
        document.querySelector(".addressErr").textContent =
          "Please enter your address";
        document.querySelector(".address").classList.add("red");
      }
      if (this.order.shipping.address != "") {
        document.querySelector(".addressErr").textContent = "";
        document.querySelector(".address").classList.remove("red");
      }
      let cityRegex = /^[a-zA-Z]+$/;
      let isCityLegit = cityRegex.test(this.order.shipping.city);
      if (
        this.order.shipping.phone != "" ||
        (this.order.shipping.email != "" && this.order.shipping.city == "") ||
        !isCityLegit
      ) {
        document.querySelector(".cityErr").textContent =
          "Please enter your city";
        document.querySelector(".city").classList.add("red");
      }
      if (this.order.shipping.city != "" && isCityLegit) {
        document.querySelector(".cityErr").textContent = "";
        document.querySelector(".city").classList.remove("red");
      }
      let numRegex = /^\d+$/;
      let isPhoneLegit = numRegex.test(this.order.shipping.phone);
      if (
        (this.order.shipping.email != "" && this.order.shipping.phone == "") ||
        !isPhoneLegit
      ) {
        document.querySelector(".phone").classList.add("red");
      }
      if (this.order.shipping.phone != "" && isPhoneLegit) {
        document.querySelector(".numberErr").textContent = "";
        document.querySelector(".phone").classList.remove("red");
      }
      let mailRegex = /^\S+@\S+\.\S+$/;
      let isEmailLegit = mailRegex.test(this.order.shipping.email);
      if (this.order.shipping.email == "" || !isEmailLegit) {
        document.querySelector(".emailErr").textContent =
          "Email field is empty or incorrectly entered";
        document.querySelector(".email").classList.add("red");
      }
      if (this.order.shipping.email != "" && isEmailLegit) {
        document.querySelector(".emailErr").textContent = "";
        document.querySelector(".email").classList.remove("red");
      }
      if (
        this.order.shipping.firstName == "" ||
        isNameLegit ||
        this.order.shipping.secondName == "" ||
        isLnameLegit ||
        this.order.shipping.country == "" ||
        isCountryLegit ||
        this.order.shipping.address == "" ||
        this.order.shipping.city == "" ||
        isCityLegit ||
        this.order.shipping.phone == "" ||
        isPhoneLegit ||
        this.order.shipping.email == "" ||
        !isEmailLegit
      ) {
        document.querySelector(".ppErr").textContent =
          "Please fill in all fields";
        document.querySelector(".voh").classList.add("hidden");
      }
      if (
        this.order.shipping.firstName != "" &&
        this.order.shipping.secondName != "" &&
        this.order.shipping.country != "" &&
        this.order.shipping.address != "" &&
        this.order.shipping.city != "" &&
        this.order.shipping.phone != "" &&
        this.order.shipping.email != "" &&
        isEmailLegit
      ) {
        document.querySelector(".voh").classList.remove("hidden");
        document.querySelector(".ppImg").innerHTML = "";
        document.querySelector(".ppErr").textContent = "";
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/sass/main"
*
  font-family: $mainFont
  margin: 0 auto
.container
  width: 80%
  margin: 0 auto
.d-flex
  display: flex
.column
  flex-direction: column
.name
  display: flex
  flex-flow: row
  width: 100%
.fname
  margin: 0
  width: 50%
  margin-right: 5px
.lname
  margin: 0
  width: 50%
  margin-left: 5px
// .block
//   display: flex
//   flex-direction: column
h2
  margin-bottom: 30px
  margin-top: 50px
.form
  width: 65%
  margin-right: 10px
.side
  width: 35%
  margin-left: 10px
input
  background-color: #F9F9F9
  height: 50px
  width: 100%
  border: none
  padding-left: 20px

select
  background-color: #F9F9F9
  height: 50px
  width: 100%
  border: none
  padding-left: 20px


textarea
  background-color: #F9F9F9
  width: 100%
  height: 240px
  border: none
label
  margin-top: 20px
  margin-bottom: 10px
input::placeholder
  padding-left: 10px
select::placeholder
  padding-left: 10px
textarea::placeholder
  padding-top: 10px
  padding-left: 10px
.table
  display: flex
  flex-flow: column
  box-sizing: border-box
  font-size: 14px
.t-row
  display: flex
  justify-content: space-between
  margin: 20px
.t-data
  padding: 10px 20px
  border-bottom: 1px solid lightgrey
  width: 100%
.t-data span
  display: block
.t-row .t-data:last-child:not(:nth-child(1))
  text-align: right
.button button
  padding: 15px 20px
  color: white
  background-color: black
  border: none
.ship
  color: #1dc42b
  font-weight: 700
.check
  margin-left: 5px
  color: #1dc42b

.fname.red input
  border: 1px solid #fa849e

.lname.red input
  border: 1px solid #fa849e

.country.red input
  border: 1px solid #fa849e

.address.red input
  border: 1px solid #fa849e

.city.red input
  border: 1px solid #fa849e

.phone.red input
  border: 1px solid #fa849e

.email.red input
  border: 1px solid #fa849e

.hidden
  visibility: hidden

.redblob
  background-color: red
  padding: 100px
  z-index: 1000

.ppImg img
  width: 100%
  opacity: 0.6

.ppErr span
  color: red
  font-weight: 500

@media (max-width: 600px)
  h2
    text-align: center
  .d-flex
    flex-direction: column
  .form
    width: 100%
    margin-right: 10px
  .side
    width: 100%
    margin-left: 0
  .name
    display: flex
    flex-flow: column
    width: 100%
  .fname
    margin: 0
    width: 100%
    margin-right: 5px
  .lname
    margin: 0
    width: 100%
</style>
