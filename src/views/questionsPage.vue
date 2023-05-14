<template>
  <div class="forum-container">
    <h2>{{ question.question_text }}</h2>
    <p>
      <span
        >Posted by: <a href="mailto:">{{ question.user }}</a></span
      >
      <span class="px-2"
        >on {{ new Date(question.created_at).toLocaleString() }}</span
      >
      <span class="px-5">
        <button
          type="button"
          class="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever=":question.question_text "
        >
          Message {{ question.user }}
        </button>
      </span>
    </p>
    <div class="user-card">
      <button type="button" class="show-answer-button" @click="toggleAnswer">
        {{ showAnswer ? "Hide Answer" : "Show Answer" }}
      </button>
      <button type="button" class="show-answer-button" @click="toggleAddAnswer">
        {{ showAddAnswer ? "Hide Answer" : "Answer" }}
      </button>
    </div>
    <div v-if="showAddAnswer" class="answer-form">
      <div class="s-notice s-notice__info p24 w70 lg:w100">
        <h2 class="fs-title fw-normal mb8">Writing a good answer</h2>
        <p class="fs-body2 mb0">
          You’re ready to
          <a href="#">ask</a> a
          <a href="#">Mathematics question</a>
          and this form will help guide you through the process.
        </p>

        <h5 class="fw-bold mb8">Steps</h5>
        <ul class="mb0">
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>
            Add “tags” which help surface your question to members of the
            community.
          </li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <h4>Your Answer</h4>
      <textarea class="form-control" v-model="newAnswerText"></textarea>
      <button type="button" @click="addAnswer">Submit Answer</button>
    </div>

    <div v-if="showAnswer" class="mt-5">
      <h4>Other Answers:</h4>
      <div
        class="card mt-2"
        v-for="answer in question.answers"
        :key="answer.id"
      >
        <div class="row justify-content-center">
          <div class="card custom-card">
            <div class="card-header">
              Posted by: {{ answer.user }} on
              {{ new Date(answer.created_at).toLocaleString() }}
            </div>
            <div class="card-body">{{ answer.answer_text }}</div>
            <div class="card-footer">
              <button class="btn btn-primary float-right">
                Private Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  </div>

  <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >Recipient:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  v-model="question.user"
                />
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label"
                  >Message:</label
                >
                <textarea
                  class="form-control"
                  id="message-text"
                  v-model="messageText"
                ></textarea>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click="saveMessage"
              >
                Send Message
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Send message</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Button trigger modal -->

</template>
  

<script>
import axios from "../axios";
import { v4 as uuidv4 } from "uuid";
import { reactive, toRefs, onMounted } from "vue";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      recipientName: "",
    };
  },
  setup(props) {
    const questionRef = toRefs(props.question);
    const state = reactive({
      question: {},
      newAnswerText: "",
      showAnswer: true,
      showAddAnswer: true,
      questionId: "",
      messageText: "",
    });

    onMounted(async () => {
      // Get the path (e.g. "/path/to/page.html")
      const path = window.location.pathname;

      // Split the path into an array of segments
      const segments = path.split("/");

      // Output the segments to the console
      console.log(segments[2]);

      state.questionId = Number(segments[2]);

      await fetchQuestion();

      if (state.showAnswer && !state.question.answers) {
        axios
          .get(`/forum/questions/${state.questionId}/answer/`)
          .then((response) => {
            state.question.answers = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });

    async function fetchQuestion() {
      await axios
        .get(`/forum/questions/${state.questionId}/?expand=answers`)
        .then((response) => {
          state.question = response.data;
          state.newAnswerText = "";
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function toggleAnswer() {
      state.showAnswer = !state.showAnswer;

      if (state.showAnswer && !state.question.answers) {
        axios
          .get(`/forum/questions/${state.questionId}/answer/`)
          .then((response) => {
            state.question.answers = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    function toggleAddAnswer() {
      state.showAddAnswer = !state.showAddAnswer;
    }

    function addAnswer() {
      axios
        .post(`/forum/questions/${state.questionId}/answer/`, {
          question: state.question,
          answer_text: state.newAnswerText,
        })
        .then((response) => {
          state.question.answers.push(response.data);
          state.newAnswerText = "";
          state.showAddAnswer = false;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const saveMessage = async () => {
      const senderResponse = await axios.get("/api/accounts/users/me/");
      const sender = senderResponse.data;
      const recipient = await axios.get(
        `private_messages/users/?email=${state.question.user}`
      );
      const recipient_id = recipient.data;

      console.log("recipient object", recipient_id);

      const data = {
        conversation_id: uuidv4(),
        sender_id: sender.email,
        receiver_id: recipient_id.email,
        participants: {},
        message: state.messageText,
        timestamp: "",
      };

      // const data = {
      //   sender_id: sender,
      //   recipient: recipient_id,
      //   // recipient_id: recipient.id,
      //   message_text: state.messageText,
      //   created_at:new Date(),

      // };
      axios
        .post("/private_messages/chat_messages/create/", data)
        .then((response) => {
          console.log(response);
          // Do something with the response, such as update a message list
        })
        .catch((error) => {
          console.error(error);
          // Handle the error
        });
    };

    return {
      ...toRefs(state),
      fetchQuestion,
      toggleAnswer,
      toggleAddAnswer,
      addAnswer,
      saveMessage,
      questionRef,
    };
  },
  methods: {
    async recipientNameAssign(state) {
      this.recipientName = state.question;
    },
  },
};
</script>

  