<template>
  <v-snackbar
    v-model="$store.state.notification.signupBar"
    :color="'#ff6f61'"
    :top="true"
    :bottom="false"
    :timeout="2000"
  >
    <v-icon color="white" class="mr-3">thumb_up</v-icon>
    <div class="snack">{{user.displayName}}님, 회원이 되신 것을 축하드립니다!</div>
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

