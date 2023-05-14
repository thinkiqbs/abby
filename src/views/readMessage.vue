<template>
  <div class="col-md-9">

    <!-- {{message}} -->

    <div class="box box-primary">
      <div class="box-header with-border">
        <h3 class="box-title">Read Mail</h3>
        <div class="box-tools pull-right">
          <a href="https://www.free-css.com/free-css-templates" class="btn btn-box-tool" data-toggle="tooltip" title="" data-original-title="Previous"><i class="fa fa-chevron-left"></i></a>
          <a href="https://www.free-css.com/free-css-templates" class="btn btn-box-tool" data-toggle="tooltip" title="" data-original-title="Next"><i class="fa fa-chevron-right"></i></a>
        </div>
      </div>
      <div class="box-body no-padding">
        <div class="mailbox-read-info">
          <!-- <h3>{{ message.subject }}</h3> -->
          <h5>From: {{ message.sender_id }} <span class="mailbox-read-time pull-right"> {{
                        formatDate(message.timestamp, "DD/MM/YYYY hh:mm:ss")
                      }}</span></h5>
        </div>
        <div class="mailbox-controls with-border text-center">
          <div class="btn-group">
            <button class="btn btn-default btn-sm" data-toggle="tooltip" title="" data-original-title="Delete"><i class="fa fa-trash-o"></i></button>
            <button class="btn btn-default btn-sm" data-toggle="tooltip" title="" data-original-title="Reply"><i class="fa fa-reply"></i></button>
            <button class="btn btn-default btn-sm" data-toggle="tooltip" title="" data-original-title="Forward"><i class="fa fa-share"></i></button>
          </div>
          <button class="btn btn-default btn-sm" data-toggle="tooltip" title="" data-original-title="Print"><i class="fa fa-print"></i></button>
        </div>
        <div class="mailbox-read-message">
          <p>{{ message.message }}</p>
        </div>
      </div>
      <div class="box-footer">
        <div class="pull-right">
          <button class="btn btn-default"><i class="bi bi-reply"></i> Reply</button>
          <button class="btn btn-default"><i class="bi bi-share"></i> Forward</button>
        </div>
        <button class="btn btn-default"><i class="bi bi-trash"></i> Delete</button>
        <button class="btn btn-default"><i class="bi bi-printer"></i> Print</button>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';

export default {
  props: {
    selectedMessage: Object,
  },
  setup(props) {
    const message = ref({});

    const readMessage = () => {
      message.value = props.selectedMessage;
    };

    onMounted(() => {
      readMessage();
    });

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

    return {
      message,
      readMessage,
      formatDate
    };
  }
};
</script>
<style>

</style>
