<template>
  <div class="messaging container" id="top">
    <div class="mesgs" id="messages">
      <button>Load more...</button>
      <div class="msg_history scroll">
        <div
          class="incoming_msg"
          v-for="(item, index) in messages"
          :key="index"
          v-if="item.author === 'Admin'"
        >
          <div class="incoming_msg_img">
            <img
              src="https://ptetutorials.com/images/user-profile.png"
              alt="sunil"
            />
          </div>
          <div class="received_msg">
            <div class="received_withd_msg">
              <p>{{ item.message }}</p>
              <span class="time_date"> {{ item.time }} | {{ item.data }}</span>
            </div>
          </div>
        </div>
        <div class="outgoing_msg" v-else>
          <div class="sent_msg">
            <p>{{ item.message }}</p>
            <span class="time_date">{{ item.time }} | {{ item.data }}</span>
          </div>
        </div>
      </div>
      <div class="type_msg">
        <div class="input_msg_write">
          <input type="text" class="write_msg" placeholder="Type a message" />
          <button class="msg_send_btn" type="button">
            <fa icon="paper-plane" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      messages: [
        {
          author: "Petras",
          data: "June 9",
          time: "11.01 AM",
          message: "Hello, how are you? I would like to buy a chair."
        },
        {
          author: "Admin",
          data: "June 9",
          time: "11.02 AM",
          message:
            "Good evening, Sir. What kind of chair would you like to buy?"
        },
        {
          author: "Petras",
          data: "June 9",
          time: "11.03 AM",
          message: "Black, confortable chair for my office"
        },
        {
          author: "Admin",
          data: "June 9",
          time: "11.04 AM",
          message: "Perfect. I will send you some examples. Jus a second."
        },
        {
          author: "Admin",
          data: "June 9",
          time: "11.02 AM",
          message:
            "Good evening, Sir. What kind of chair would you like to buy?"
        },
        {
          author: "Petras",
          data: "June 9",
          time: "11.03 AM",
          message: "Black, confortable chair for my office"
        },
        {
          author: "Admin",
          data: "June 9",
          time: "11.04 AM",
          message: "Perfect. I will send you some examples. Jus a second."
        }
      ]
    };
  },
  methods: {
    scrollToEnd() {
      let container = document.querySelector(".scroll");
      let scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    }
  },
  mounted() {
    this.scrollToEnd();
  }
};
</script>

<style scoped lang="scss">
@import "assets/sass/main.scss";

.msg_history {
  overflow: scroll;
}

.mesgs > button {
  display: block;
  margin: 0 auto;
  border: none;
  font-family: $mainFont;
  background-color: white;
  cursor: pointer;
  outline: none;
  color: #646464;
}

.messaging {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: $mainFont;
}

.mesgs {
  padding: 30px 25px 30px 25px;
  width: 70%;
  margin-top: 20px;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}

.incoming_msg_img img {
  width: 100%;
}

.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}

.received_withd_msg p {
  background: #f2f2f2 none repeat scroll 0 0;
  border-radius: 0 15px 15px 15px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}

.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}

.received_withd_msg {
  width: 57%;
}

.sent_msg p {
  background: #0465ac;
  border-radius: 12px 15px 15px 0;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}

.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}

.sent_msg {
  float: right;
  width: 46%;
}

.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
  outline: none;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
  margin-top: 15px;
}

.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}

.messaging {
  padding: 0 0 50px 0;
}

.msg_history {
  height: 516px;
  overflow-y: auto;
}

@media screen and (max-width: 767px) {
  .messaging {
    padding: 0;
  }
  .mesgs {
    padding: 10px;
    width: 90%;
  }
  .incoming_msg_img {
    width: 10%;
  }

  .received_withd_msg,
  .received_msg {
    width: 80%;
    margin: 0;
  }

  .sent_msg {
    width: 66%;
  }
}
</style>
