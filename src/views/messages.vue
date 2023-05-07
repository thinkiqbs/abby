<template>
  <div>
    <h1>Messages</h1>
    <!-- create two columns  -->
    <div class="row">
      <div class="col-4">
        <ul class="list-group">
          <li
            class="list-group-item card"
            v-for="recipient in messages"
            :key="recipient.id"
            @click="alertUser(recipient.sender_id)"
          >
            <div class="sender-info">
              <!-- add an avatar -->
              <div class="avatar col-4">
                <img
                  src="https://api.dicebear.com/6.x/lorelei/svg"
                  alt="Avatar"
                  class="avatar"
                  style="width: 100px; height: 100px"
                />
              </div>
              <div class="username col-md-6">
                {{ recipient.sender_id }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col">
        <div
          v-for="message in filteredMessages"
          :key="message.id"
          class="message-container col"
        >
          <div class="sender-info">{{ message.receiver_id }}:</div>
          <div class="message">{{ message.message }}</div>
          <button @click="activateReply(message)">Reply</button>
          <div v-if="replyActive && message === activeMessage">
            <textarea
              v-model="replyText"
              class="form-textarea"
              placeholder="Type your reply..."
            ></textarea>
            <button @click="sendReply">Send</button>
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="chat-form">
          <div class="form-group">
            <label for="message" class="form-label">Message:</label>
            <textarea
              id="message"
              v-model="messageText"
              class="form-textarea"
            ></textarea>
          </div>
          <button type="submit" class="form-btn">Send</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-md-1">
        <a
          href="#"
          class="btn btn-primary btn-block margin-bottom"
          @click="showCompose"
          >Compose</a
        >
        <div class="box box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">Folders</h3>
          </div>
          <div class="box-body no-padding">
            <ul class="nav nav-pills nav-stacked">
              <li class="active">
                <a href="#" @click="whatToShow"
                  ><i class="bi bi-inbox-fill"></i> Inbox
                  <span class="label label-primary pull-right">12</span></a
                >
              </li>
              <li>
                <a href="https://www.free-css.com/free-css-templates"
                  ><i class="bi bi-send-fill"></i> Sent</a
                >
              </li>

              <li>
                <a href="https://www.free-css.com/free-css-templates"
                  ><i class="bi bi-trash-fill"></i> Trash</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-9" v-if="viewDepthKey === 0">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Inbox</h3>
            <div class="box-tools pull-right">
              <div class="has-feedback">
                <input
                  type="text"
                  class="form-control input-sm"
                  placeholder="Search Mail"
                />
                <span
                  class="glyphicon glyphicon-search form-control-feedback"
                ></span>
              </div>
            </div>
          </div>
          <div class="box-body no-padding">
            <div class="mailbox-controls">
              <button class="btn btn-default btn-sm checkbox-toggle">
                <i class="bi bi-square-fill"></i>
              </button>
              <div class="btn-group">
                <button class="btn btn-default btn-sm">
                  <i class="bi bi-trash-fill"></i>
                </button>
                <button class="btn btn-default btn-sm">
                  <i class="bi bi-reply-fill"></i>
                </button>
                <button class="btn btn-default btn-sm">
                  <i class="bi bi-share-fill"></i>
                </button>
              </div>
              <button class="btn btn-default btn-sm">
                <i class="bi bi-refresh-fill"></i>
              </button>
              <div class="pull-right">
                1-50/200
                <div class="btn-group">
                  <button class="btn btn-default btn-sm">
                    <i class="fa fa-chevron-left"></i>
                  </button>
                  <button class="btn btn-default btn-sm">
                    <i class="fa fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="table-responsive mailbox-messages">
              <table
                class="table table-hover table-striped"
                v-for="recipient in messages"
                :key="recipient.id"
              >
                <tbody>
                  <tr @click="readMessage">
                    <td>
                      <div
                        class="icheckbox_flat-blue"
                        aria-checked="false"
                        aria-disabled="false"
                        style="position: relative"
                      >
                        <input
                          type="checkbox"
                          style="position: absolute; opacity: 0"
                        /><ins
                          class="iCheck-helper"
                          style="
                            position: absolute;
                            top: 0%;
                            left: 0%;
                            display: block;
                            width: 100%;
                            height: 100%;
                            margin: 0px;
                            padding: 0px;
                            background: rgb(255, 255, 255);
                            border: 0px;
                            opacity: 0;
                          "
                        ></ins>
                      </div>
                    </td>
                    <td class="mailbox-star">
                      <a href="https://www.free-css.com/free-css-templates"
                        ><i class="fa fa-star text-yellow"></i
                      ></a>
                    </td>
                    <td class="mailbox-name">
                      <a href="read-mail.php">{{ recipient.sender_id }}</a>
                    </td>
                    <td class="mailbox-subject">
                      <b>sent</b> - {{ recipient.message }}
                    </td>
                    <td class="mailbox-attachment"></td>
                    <td class="mailbox-date">5 mins ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="box-footer no-padding">
            <div class="mailbox-controls">
              <button class="btn btn-default btn-sm checkbox-toggle">
                <i class="fa fa-square-o"></i>
              </button>
              <div class="btn-group">
                <button class="btn btn-default btn-sm">
                  <i class="fa fa-trash-o"></i>
                </button>
                <button class="btn btn-default btn-sm">
                  <i class="fa fa-reply"></i>
                </button>
                <button class="btn btn-default btn-sm">
                  <i class="fa fa-share"></i>
                </button>
              </div>
              <button class="btn btn-default btn-sm">
                <i class="fa fa-refresh"></i>
              </button>
              <div class="pull-right">
                1-50/200
                <div class="btn-group">
                  <button class="btn btn-default btn-sm">
                    <i class="fa fa-chevron-left"></i>
                  </button>
                  <button class="btn btn-default btn-sm">
                    <i class="fa fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- add v-if directive -->
      <div class="col" v-if="viewDepthKey === 1">
        <composeView />
      </div>
      <div class="col" v-if="viewDepthKey === 2">
        <readMessage />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import axios from "../axios";
import composeView from "@/views/compose";
import readMessage from "@/views/readMessage";

export default {
  name: "MessagesWindow",
  components: {
    composeView,
    readMessage,
  },
  setup() {
    const messages = ref([]);
    const message = ref({ sender_id: "", receiver_id: "", message: "" });
    const selectedSenderId = ref("");
    const messageText = ref("");
    const replyActive = ref(false);
    const activeMessage = ref(null);
    const replyText = ref("");
    const loggedInUser = ref({});
    const viewDepthKey = ref(0);

    const getUserInfo = () => {
      axios.get("/api/accounts/users/me/").then((response) => {
        loggedInUser.value = response.data;
        console.log(loggedInUser.value);
      });
    };

    const whatToShow = () => {
      viewDepthKey.value = 0;
      console.log(viewDepthKey);
    };

    const showCompose = () => {
      viewDepthKey.value = 1;
      console.log(viewDepthKey);
    };

    const readMessage = () => {
      viewDepthKey.value = 2;
      console.log(viewDepthKey);
    };

    const getMessages = () => {
      axios.get("/private_messages/messagesChat/").then((response) => {
        const allMessages = response.data;
        const uniqueSenderIds = [
          ...new Set(allMessages.map((message) => message.sender_id)),
        ];
        messages.value = uniqueSenderIds.map((senderId) => {
          return allMessages.find((message) => message.sender_id === senderId);
        });
      });
    };

    const sendMessage = () => {
      const newMessage = {
        sender_id: selectedSenderId.value,
        receiver_id: "", // You may set the receiver_id here as needed
        message: messageText.value,
      };

      axios.post("/private_messages/send/", newMessage).then(() => {
        // Handle success or update the messages list
        getMessages();
        messageText.value = "";
      });
    };

    const alertUser = (senderId) => {
      selectedSenderId.value = senderId;
      filteredMessages.value = messages.value.filter(
        (message) =>
          message.sender_id === senderId &&
          message.receiver_id !== loggedInUser.value.email
      );
    };

    onMounted(() => {
      getUserInfo();
      getMessages();
    });

    const filteredMessages = ref([]);

    // Watch for changes in messages and selectedSenderId to update filteredMessages
    watch([messages, selectedSenderId], () => {
      filteredMessages.value = messages.value.filter(
        (message) => message.sender_id === selectedSenderId.value
      );
    });

    const activateReply = (message) => {
      replyActive.value = true;
      activeMessage.value = message;
      replyText.value = `Replying to ${message.receiver_id}: `;
    };

    const sendReply = () => {
      const replyMessage = {
        sender_id: loggedInUser.value.email,
        receiver_id: activeMessage.value.sender_id,
        message: replyText.value,
        conversation_id: activeMessage.value.conversation_id,
        participants: activeMessage.value.participants,
      };

      axios
        .post("/private_messages/chat_messages/create/", replyMessage)
        .then(() => {
          // Handle success or update the messages list
          getMessages();
          replyActive.value = false;
          activeMessage.value = null;
          replyText.value = "";
        });
    };

    return {
      messages,
      message,
      sendMessage,
      alertUser,
      selectedSenderId,
      filteredMessages,
      messageText,
      replyActive,
      activeMessage,
      replyText,
      activateReply,
      sendReply,
      whatToShow,
      showCompose,
      viewDepthKey,
      readMessage,
    };
  },
};
</script>


<style>
/* Add your custom styles here */
</style>

