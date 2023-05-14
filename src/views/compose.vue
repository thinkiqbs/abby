<template>
  <div class="col-md-9">
   
    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">Compose New Message</h3>
      </div>
      <div class="box-body">
        <div class="form-group">
          <input v-model="recipientEmail" class="form-control" placeholder="To:" />
        </div>
        <div class="form-group">
          <input v-model="subject" class="form-control" placeholder="Subject:" />
        </div>
        <div class="form-group">
          <form @submit.prevent="sendMessage" class="chat-form">
            <div class="form-group">
              <label for="message" class="form-label">Message:</label>
              <textarea
                id="message"
                v-model="messageText"
                class="form-textarea"
                rows="10"
              ></textarea>
            </div>
            <div class="box-footer">
              <div class="pull-right">
                <button class="btn btn-default">
                  <i class="bi bi-pencil"></i> Draft
                </button>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-envelope"></i> Send
                </button>
              </div>
              <button class="btn btn-default">
                <i class="bi bi-trash"></i> Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../axios';
import { ref ,onMounted} from 'vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'composeView',
  setup() {
    const loggedInUser = ref({}); // replace with your own logic
    const messages = ref([]);
    const activeMessage = ref(null);
    const replyActive = ref(false);
    const replyText = ref('');
    const messageText = ref('');
    const recipientEmail = ref('');

    const getUserInfo = () => {
      axios.get('/api/accounts/users/me/').then((response) => {
        loggedInUser.value = response.data;
        console.log("emailuser", loggedInUser.value.email);
      });
    };

    const getMessages = async () => {
      try {
        const response = await axios.get('/private_messages/chat_messages/');
        messages.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const sendMessage = () => {
      const newMessage = {
        sender_id: loggedInUser.value.email,
        receiver_id: recipientEmail.value,
        message: messageText.value,
        conversation_id: uuidv4(), // add UUID
        participants: [],
      };

      axios
        .post('/private_messages/chat_messages/create/', newMessage)
        .then(() => {
          // Handle success or update the messages list
          getMessages();
          messageText.value = '';
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
    };

    const activateReply = (message) => {
      replyActive.value = true;
      activeMessage.value = message;
    };

    const alertUser = (userId) => {
      alert(`Clicked on user with ID: ${userId}`);
    };

    onMounted(() => {
      getUserInfo();
      getMessages();
    });

    return {
      loggedInUser,
      messages,
      activeMessage,
      replyActive,
      replyText,
      messageText,
      getMessages,
      sendMessage,
      activateReply,
      alertUser,
      recipientEmail,
      getUserInfo,
    };
  },
};
</script>



<style></style>
