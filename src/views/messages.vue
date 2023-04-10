<template>
    <div class="chat">
      <div class="sidebar">
        <ul>
          <li v-for="(sender, index) in senders" :key="index" @click="selectSender(sender)">
            {{ sender.name }}
          </li>
        </ul>
      </div>
      <div class="messages" v-if="selectedSender">
        <div v-for="(message, index) in selectedSender.messages" :key="index" :class="['message', message.sender === currentUser ? 'sent' : 'received']">
          <div class="message-header">
            {{ message.sender === currentUser ? 'You' : message.sender }} - {{ formatDate(message.timestamp) }}
          </div>
          <div class="message-body">
            {{ message.text }}
          </div>
        </div>
        <div class="reply">
          <input v-model="replyText" type="text" placeholder="Type a message..." />
          <button @click="submitReply">Send</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MessagesPage',
    data() {
      return {
        currentUser: 'John',
        senders: [
          {
            name: 'John',
            messages: [
              {
                id: 1,
                sender: 'John',
                recipient: 'Jane',
                text: 'Hi there',
                timestamp: '2023-04-08T08:30:00.000Z',
              },
              {
                id: 2,
                sender: 'Jane',
                recipient: 'John',
                text: 'Hey',
                timestamp: '2023-04-09T10:00:00.000Z',
              },
              // more messages...
            ],
          },
          {
            name: 'Jane',
            messages: [
              {
                id: 3,
                sender: 'Jane',
                recipient: 'John',
                text: 'How are you?',
                timestamp: '2023-04-10T11:00:00.000Z',
              },
              // more messages...
            ],
          },
          // more senders...
        ],
        selectedSender: null,
        replyText: '',
      };
    },
    methods: {
      selectSender(sender) {
        this.selectedSender = sender;
      },
      formatDate(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      },
      submitReply() {
        if (this.replyText.trim() === '') {
          return;
        }
        const message = {
          id: this.selectedSender.messages.length + 1,
          sender: this.currentUser,
          recipient: this.selectedSender.name,
          text: this.replyText.trim(),
          timestamp: new Date().toISOString(),
        };
        this.selectedSender.messages.push(message);
        this.replyText = '';
      },
    },
  };
  </script>
  
  <style>
  .chat {
    display: flex;
    height: 80vh;
    width: 80vw;
  }
  
  .sidebar {
    flex: 1;
    background-color: #f1f1f1;
    overflow: auto;
  }
  
  .messages {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
  }
  
  .message {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  
  .sent {
    align-self: flex-end;
    background-color: #dcf8c6;
    border-radius: 5px 5px 0 5px;
    padding: 10px;
    max-width: 70%;
  }
  
  .received {
    align-self: flex-start;
    background-color: #fff;
    border-radius: 5px 5px 5px 0;
    padding: 10px;
    max-width: 70%;
  }
  
  .message-header {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .reply {
    display: flex;
    margin-top: 20px;
  }
  
  .reply input {
    flex: 1;
    border: none;
    border-radius: 20px;
    padding: 10px;
    margin-right: 10px;
  }
  
  .reply button {
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
  </style>
  