<template>
  <div class="form-block">
    <h2>Leave Your Message</h2>
    <span class="span-text"
      >Feel free to contact with us by using the form below
    </span>
    <form @submit.prevent="submitFormData">
      <div class="first-row">
        <input
          v-model="contactFormInputsData.fullName"
          type="text"
          placeholder="Full Name"
        />
        <input
          v-model="contactFormInputsData.email"
          type="text"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          v-model="contactFormInputsData.subject"
          type="text"
          placeholder="Subject"
        />
      </div>
      <div>
        <textarea
          v-model="contactFormInputsData.message"
          placeholder="Message"
        ></textarea>
      </div>
      <div>
        <button class="send-button">Send Us</button>
      </div>
      <div class="message-block">
        <span v-if="message !== ''" class="message">{{ message }}</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactsForm",
  data() {
    return {
      contactFormInputsData: {
        fullName: "",
        email: "",
        subject: "",
        message: "",
      },
      message: "",
    };
  },
  methods: {
    submitFormData() {
      if (this.formFilled()) {
        console.log("data sended");
      } else {
        console.log("error");
      }
    },
    formFilled() {
      if (
        this.contactFormInputsData.fullName.length === 0 ||
        this.contactFormInputsData.email.length === 0 ||
        this.contactFormInputsData.subject.length === 0 ||
        this.contactFormInputsData.message.length === 0
      ) {
        this.message = "Please fill the form";
        return false;
      } else {
        this.message = "";
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/main";

h2 {
  font-size: 24px;
  font-weight: 300;
}

.span-text {
  display: block;
  font-size: 14px;
  color: #999999;
  margin-bottom: 40px;
}

form {
  display: block;

  .message-block {
    margin: 20px 10px;
  }

  .message {
    color: #dd2a2a;
  }
}

form div {
  display: flex;

  input,
  textarea {
    width: 100%;
    padding: 8px 10px;
    margin-bottom: 20px;
    border: 1px solid #d3d3d3;
    outline: none;
  }

  input:focus,
  textarea:focus {
    border: 1px solid #000000;
  }

  textarea {
    height: 300px;
  }
}

.send-button {
  border: none;
  border-radius: 30px;
  padding: 8px 45px;
  background-color: #bdefd7;
  font-weight: 700;
  font-size: 16px;
  color: #141414;
  outline: none;
}

form div:first-child {
  input {
    flex: 1;
  }

  input:first-child {
    margin-right: 30px;
  }
}
</style>
