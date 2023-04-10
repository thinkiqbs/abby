<template>
  <div class="forum-container">
    <div class="row">

      
      <div class="col-md-12 mt-5 mb-5">
        <p class="button-group categories" style="float: right">
          <button class="px-2">Today</button>
          <button class="px-1">This Week</button>
          <button class="px-1">This Month</button>
          <button class="px-1">This Year</button>
          <button class="px-1">Top Questions</button>
        </p>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="form-group header">
          <label for="new-question">Ask a Maths question:</label>
          <textarea
            type="text"
            class="form-control"
            id="question_text"
            v-model="questionData.question_text"
            placeholder="Enter your question"
          />
        </div>
        <button
          type="button"
          class="ask-button"
          @click="postQuestion"
          style="float: right"
        >
          Ask
        </button>
      </div>
    </div>

    <div>
      <div class="col-md-12">
        <ul class="list-unstyled">
          <router-link
            v-for="(question, index) in questions"
            :key="index"
            :to="'/questions/' + question.id"
            :id="question.id"
          >
            <div class="card mt-5 my-4">
              <h4 class="question">{{ question.question_text }}</h4>

              <p>
                <span
                  >Created by: <a href="mailto">{{ question.user }}</a></span
                >
                <span
                  >on {{ new Date(question.created_at).toLocaleString() }}</span
                >
              </p>
              <p>
                <button
                  type="button"
                  class="show-answer-button"
                  @click="toggleAnswer(index)"
                >
                  {{ question.showAnswer ? "Hide Answer" : "Show Answer" }}
                </button>
                <button
                  type="button"
                  class="show-answer-button"
                  @click="toggleAddAnswer(index)"
                >
                  {{
                    showAddAnswer && showAnswerIndex === index
                      ? "Hide Answer"
                      : "Answer"
                  }}
                </button>
              </p>
              <div
                v-if="showAddAnswer && showAnswerIndex === index"
                class="answer-form"
              >
                <textarea
                  class="form-control"
                  v-model="newAnswerText"
                ></textarea>
                <button type="button" @click="addAnswer(index)">
                  Submit Answer
                </button>
              </div>

              <div v-if="question.showAnswer" class="my-4">
                <h4>Other Answers:</h4>

                <p v-for="answer in question.answers" :key="answer.id">
                  {{ answer.answer_text }}
                  <span>Posted by: {{ answer.user }}</span>
                  <span
                    >on {{ new Date(answer.created_at).toLocaleString() }}</span
                  >
                </p>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import { reactive, onMounted } from "vue";
// import apiClient from "../apiClient";

export default {
  name: "ForumPage",
  data() {
    return {
      newQuestion: "",
      showAddAnswer: false,
      showAnswerIndex: null,
    };
  },

  setup() {
    const questionData = reactive({
      question_text: "",
    });

    const postQuestion = () => {
      axios
        .post("/forum/questions/create/", questionData)
        .then((response) => {
          console.log(response.data);
          // reload window with router
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    };

    let questions = reactive([]);

    const newAnswer = reactive([]);
    const getQuestions = () => {
      axios
        .get("/forum/questions/?expand=answers")
        .then((response) => {
          const sortedQuestions = response.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          questions.splice(0, questions.length, ...sortedQuestions);
          newAnswer.splice(
            0,
            newAnswer.length,
            ...sortedQuestions.map(() => "")
          );
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const toggleAnswer = (index) => {
      questions[index].showAnswer = !questions[index].showAnswer;

      if (questions[index].showAnswer) {
        axios
          .get(`/forum/questions/${questions[index].id}/answer/`)
          .then((response) => {
            questions[index].answers = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    const addAnswer = (index) => {
      const data = {
        question: {
          id: questions[index].id,
          question_text: questions[index].question_text,
        },
        answer_text: newAnswer[index],
      };

      axios
        .post(`/forum/questions/${questions[index].id}/answer/`, data)
        .then((response) => {
          const answer = response.data;
          const serializedAnswer = {
            id: answer.id,
            user: answer.user,
            question: answer.question.question_text,
            answer_text: answer.answer_text,
            created_at: answer.created_at,
          };
          questions[index].answer = serializedAnswer;
          newAnswer[index] = "";
        })
        .catch((error) => {
          console.error(error);
        });
    };

    onMounted(getQuestions);

    return {
      questionData,
      postQuestion,
      questions,
      newAnswer,
      toggleAnswer,
      addAnswer,
    };
  },
  methods: {
    toggleAddAnswer(index) {
      if (this.showAnswerIndex === index) {
        this.showAddAnswer = !this.showAddAnswer;
      } else {
        this.showAddAnswer = true;
        this.showAnswerIndex = index;
      }
    },
    // ...
  },
};
</script>

<style>
/* Bootstrap CSS styles */
.container {
  max-width: 800px;
  margin: auto;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-primary:focus,
.btn-primary.focus {
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}

.btn-primary.disabled,
.btn-primary:disabled {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:not(:disabled):not(.disabled):active,
.btn-primary:not(:disabled):not(.disabled).active,
.show > .btn-primary.dropdown-toggle {
  background-color: #0062cc;
  border-color: #005cbf;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.p {
  font-size: 20px;
  margin-top: 5px;
}

.button-group button {
  margin-right: 10px; /* Adjust this value to control the spacing between buttons */

  border: orange;
}
</style>



