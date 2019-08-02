<template>
  <v-snackbar
    v-model="$store.state.notification.logoutBar"
    :color="'#ff6f61'"
    :top="true"
    :bottom="false"
    :timeout="3000"
  >
    <v-icon color="white" class="mr-3">notifications</v-icon>
    <div class="snack">로그아웃되었습니다!</div>
  </v-snackbar>
</template>
