<template>
  <v-snackbar
    v-model="$store.state.notification.lockBar"
    :color="'blue-grey darken-3'"
    :top="true"
    :timeout="1000"
  >
    <v-icon color="white" class="mr-3">lock</v-icon>
    <div class="snack">접근권한이 없습니다.</div>
  </v-snackbar>
</template>
