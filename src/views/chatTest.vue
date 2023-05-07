<template>
  <div class="chat-container">
    <h1 class="chat-header">Chat</h1>
    <div class="container text-center">
      <div class="row align-items-start">
        <div class="col linkedin-style">
          <ul class="list-group">
            <li
              class="list-group-item card"
              v-for="recipient in uniqueRecipients"
              :key="recipient"
              @click="alertUser(recipient)"
            >
              {{ recipient }}
            </li>
          </ul>
        </div>

        <div class="col">
          <div
            v-for="message in messages"
            :key="message.id"
            class="message-container col"
          >
            <div class="sender-info">{{ message.sender_id }}:</div>
            <div class="message">{{ message.message }}</div>
          </div>
          <form @submit.prevent="sendMessage" class="chat-form">
            <div class="form-group">
              <label for="sender_id" class="form-label">Sender:</label>
              <input
                type="text"
                id="sender_id"
                v-model="message.sender_id"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="receiver_id" class="form-label">Recipient:</label>
              <input
                type="text"
                id="receiver_id"
                v-model="message.receiver_id"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label for="message" class="form-label">Message:</label>
              <textarea
                id="message"
                v-model="message.message"
                class="form-textarea"
              ></textarea>
            </div>
            <button type="submit" class="form-btn">Send</button>
          </form>
        </div>
      </div>
      <div class="col">One of three columns</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "../axios";
import { v4 as uuidv4 } from "uuid";

export default {
  setup() {
    const currentUser = ref(null);
    const messages = ref([]);

    const message = ref({
      conversation_id: uuidv4(),
      sender_id: "",
      receiver_id: "",
      participants: {},
      message: "",
      timestamp: "",
    });

    const alertUser = async (recipient) => {
      // alert("message " + recipient);
      const response = await axios.get("/private_messages/messagesChat/"+"?receiver_id=" + recipient);
      messages.value = response.data
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/accounts/users/me/");
        currentUser.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    async function getMessages() {
      const response = await axios.get("/private_messages/messagesChat/");

      messages.value = response.data//.filter(
       // (message) => message.sender_id === currentUser.value.email
      //);
    }

    async function sendMessage() {
      const payload = {
        conversation_id: message.value.conversation_id,
        sender_id: currentUser.value.email,
        receiver_id: message.value.receiver_id,
        participants: message.value.participants,
        message: message.value.message,
        timestamp: message.value.timestamp,
      };
      const response = await axios.post(
        "/private_messages/messagesChatCreate/",
        payload
      );
      message.value.message = "";
      console.log(response);
      getMessages();
    }

    const uniqueRecipients = computed(() => {
      const recipientIds = messages.value.map((message) => message.receiver_id);
      console.log(recipientIds);
      return [...new Set(recipientIds)];
    });

    onMounted(async () => {
      await fetchCurrentUser();
      await getMessages();
    });

    getMessages();

    return {
      messages,
      message,
      sendMessage,
      fetchCurrentUser,
      uniqueRecipients,
      alertUser,
    };
  },
};
</script>
