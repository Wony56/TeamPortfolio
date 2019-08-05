<template>
  <v-snackbar
    v-model="$store.state.notification.loginErrorBar"
    :color="'red darken-1'"
    :top="true"
    :timeout="1500"
  >
    <v-icon color="white" class="mr-3">error_outline</v-icon>
    <div class="snack">{{errorMessage}}</div>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    errorMessage: state => state.notification.errorMessage
  })
};
</script>

