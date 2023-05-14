@<template>
  <div class="container">
    <!-- {{ sentMessages }} -->

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
            style="text-align: left"
            v-for="recipient in sentMessages"
            :key="recipient.id"
          >
            <tbody>
              <tr @click="readMessage">
                <td>
                  <div
                    class="icheckbox_flat-blue"
                    aria-checked="false"
                    aria-disabled="false"
                    style="position: relative; text-align: left"
                  >
                    <input
                      type="checkbox"
                      style="position: absolute; opacity: 0"
                    />
                  </div>
                </td>
                <td class="mailbox-star">
                  <a href="#"
                    ><i class="fa fa-star text-yellow"></i
                  ></a>
                </td>
                <td class="mailbox-name text-left">
                  <a href="#">{{ recipient.receiver_id }}</a>
                </td>
                <td class="mailbox-subject text-left">
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
</template>

<script>
import { computed, ref, onMounted } from "vue";
import axios from "../axios";

export default {
  name: "sentMessages",
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const loggedInUser = ref({});

    const getUserInfo = () => {
      axios.get("/api/accounts/users/me/").then((response) => {
        loggedInUser.value = response.data;
        console.log(loggedInUser.value);
      });
    };

    const sentMessages = computed(() => {
      return props.messages.filter((message) => {
        return message.sender_id === loggedInUser.value.email;
      });
    });

    onMounted(() => {
      getUserInfo();
    });

    return {
      sentMessages,
      getUserInfo,
    };
  },
};
</script>



<style>
</style>