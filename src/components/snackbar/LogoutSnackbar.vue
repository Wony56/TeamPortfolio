<template>
  <v-snackbar
    v-model="$store.state.notification.logoutBar"
    :color="'#ff6f61'"
    :top="true"
    :bottom="false"
    :timeout="2000"
  >
    <v-icon color="white" class="mr-3">exit_to_app</v-icon>
    <div class="snack">로그아웃되었습니다!</div>
  </v-snackbar>
</template>
