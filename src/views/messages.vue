<template>
  <div class="container mt-5">
    <h1>Messages</h1>
    <!-- create two columns  -->

    <div class="row">
      <div class="col-md-1">
        <a href="#" class="ask-button" @click="showCompose">Compose</a>
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
                <a href="#" @click="sentMessages"
                  ><i class="bi bi-send-fill"></i> Sent</a
                >
              </li>

              <li>
                <a href="#"><i class="bi bi-trash-fill"></i> Trash</a>
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
              <table class="table table-hover table-striped">
                <tbody class="text-left" style="align-content: left">
                  <tr>
                    <th></th>
                    <th></th>
                    <th>from</th>
                    <th>subject</th>
                    <th>date</th>
                  </tr>
                  <tr
                    v-for="recipient in allMessagessent"
                    :key="recipient.id"
                    @click="selectMessage(recipient)"
                  >
                    <td>{{ recipient.sender_id }}</td>
                    <td>{{ recipient.message }}</td>
                    <td>
                      {{
                        formatDate(recipient.timestamp, "DD/MM/YYYY hh:mm:ss")
                      }}
                    </td>
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
        <readMessage v-if="selectedMessage" :selectedMessage="selectedMessage" />
      </div>
      <div class="col" style="justify-content: left" v-if="viewDepthKey === 3">
        <sentMessages :messages="messages" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import axios from "../axios";
import composeView from "@/views/compose";
import readMessage from "@/views/readMessage";
import sentMessages from "@/views/sentMessages";

export default {
  name: "MessagesWindow",
  components: {
    composeView,
    readMessage,
    sentMessages,
  },
  setup() {
    const messages = ref([]);
    const allMessagessent = ref([{}]);
    const message = ref({ sender_id: "", receiver_id: "", message: "" });
    const selectedSenderId = ref("");
    const messageText = ref("");
    const replyActive = ref(false);
    const activeMessage = ref(null);
    const replyText = ref("");
    const loggedInUser = ref({});
    const viewDepthKey = ref(0);
    const selectedMessage = ref(null);

    const getUserInfo = () => {
      axios.get("/api/accounts/users/me/").then((response) => {
        loggedInUser.value = response.data;
        console.log(loggedInUser.value);
      });
    };

    const whatToShow = () => {
      viewDepthKey.value = 0;
      getMessages();
      console.log(viewDepthKey);
    };

    const showCompose = () => {
      viewDepthKey.value = 1;
      console.log(viewDepthKey);
    };

    const selectMessage = (message) => {
      // Set selectedMessage to the clicked message
      viewDepthKey.value = 2;

      selectedMessage.value = message;
      console.log(selectedMessage.value);
    };

    const sentMessages = () => {
      viewDepthKey.value = 3;
      console.log(viewDepthKey);
    };

    // const getAllMessages = () => {
    //    axios.get("/private_messages/messagesChat/").then((response) => {
    //     allMessagessent.value = response.data;
    //     console.log(allMessagessent.value);
    // });
    // };

    const getMessages = () => {
      axios.get("/private_messages/messagesChat/").then((response) => {
        const allMessages = response.data;
        // const uniqueSenderIds = [
        //   ...new Set(allMessages.map((message) => message.sender_id)),
        // ];
        messages.value = allMessages;
      });
    };

    const messsagesSentToMe = () => {
      axios.get("/private_messages/messagesChat/").then((response) => {
        const allMessages = response.data;

        allMessagessent.value = allMessages.filter((message) => {
          return message.receiver_id == loggedInUser.value.email;
        });

        console.log("sent to me", allMessagessent.value);
        console.log("user", loggedInUser.value);
      });
    };

    function formatDate(dateString, format) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const formattedDate = format
        .replace("YYYY", year)
        .replace("MM", month)
        .replace("DD", day)
        .replace("hh", hours)
        .replace("mm", minutes)
        .replace("ss", seconds);
      return formattedDate;
    }

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
      // getAllMessages();
      messsagesSentToMe();
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
      sentMessages,
      allMessagessent,
      messsagesSentToMe,
      formatDate,
      selectedMessage,
      selectMessage,
    };
  },
};
</script>


<style>
/* Add your custom styles here */
</style>

