<template>
  <v-snackbar
    v-model="$store.state.notification.loginBar"
    :color="'#ff6f61'"
    :top="true"
    :bottom="false"
    :timeout="3000"
  >
    <v-icon color="white" class="mr-3">notifications</v-icon>
    <div class="snack">{{user.displayName}}님, 환영합니다!</div>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    user: state => state.user.user
  })
};
</script>

