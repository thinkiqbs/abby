<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <p class="mt-3 mb-3" style="float: right">
          <button>Today</button>
          <button>This Week</button>
          <button>This Month</button>
          <button>This Year</button>
          <button>Top Questions</button>
        </p>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="form-group">
          <label for="new-question">Ask a Maths question:</label>
          <textarea
            type="text"
            class="form-control"
            id="new-question"
            v-model="newQuestion"
            placeholder="Enter your question"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary"
          @click="addQuestion"
          style="float: right"
        >
          Ask
        </button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <ul class="list-unstyled">
          <li
            v-for="(question, index) in questions"
            :key="index"
            class="card my-4"
          >
            <h4>{{ question.title }}</h4>
            <p>{{ question.description }}</p>
            <p>
              <button
              type="button"
              class="btn btn-primary"
              @click="toggleAnswer(index)"
            >
              {{ question.showAnswer ? "Hide Answer" : "Show Answer" }}
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="toggleAnswer(index)"
            >
              Answer
            </button>

            </p>
            <div class="form-group mt-4">
              <label for="new-answer-{{ index }}">Your Answer:</label>
              <input
                type="text"
                class="form-control"
                :id="'new-answer-' + index"
                v-model="newAnswer[index]"
                placeholder="Enter your answer"
              />
            </div>
            
            <div v-if="question.showAnswer" class="my-4">
              <h4>Other Answers:</h4>
              <p>{{ question.answer }}</p>
            </div>
            
            <button
              type="button"
              class="btn btn-primary btn-md-block mt-4"
              @click="addAnswer(index)"
            >
              Answer
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumPage",
  data() {
    return {
      newQuestion: "",
      newAnswer: [],
      questions: [
        {
          title: "What is Vue3?",
          description:
            "I heard about Vue3, but I am not sure what it is. Can someone explain?",
          answer:
            "Vue3 is the latest version of the Vue.js framework. It comes with a lot of new features and performance improvements. You can learn more about it on the official Vue.js website.",
          showAnswer: false,
        },
        {
          title: "How do I create a Vue3 component?",
          description:
            "I want to create a Vue3 component, but I am not sure how to do it. Can someone help?",
          answer:
            "To create a Vue3 component, you can use the Vue.component() method. You can learn more about it in the Vue.js documentation.",
          showAnswer: false,
        },
      ],
    };
  },
  methods: {
    addQuestion() {
      const newQuestionObject = {
        title: this.newQuestion,
        description: "",
        answer: "",
        showAnswer: false,
      };
      this.questions.push(newQuestionObject);
      this.newQuestion = "";
      this.newAnswer.push("");
    },
    toggleAnswer(index) {
      this.questions[index].showAnswer = !this.questions[index].showAnswer;
    },
    addAnswer(index) {
      const newAnswer = this.newAnswer[index];
      if (newAnswer.trim() !== "") {
        this.questions[index].answer = newAnswer;
        this.questions[index].showAnswer = true;
        this.newAnswer[index] = "";
      }
    },
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
</style>

