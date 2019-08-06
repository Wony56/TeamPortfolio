<template>
  <v-snackbar
    v-model="$store.state.notification.tierBar"
    :color="'light-green accent-4'"
    :top="true"
    :timeout="1000"
  >
    <v-icon color="white" class="mr-3">done</v-icon>
    <div class="snack">등급 변경완료!</div>
  </v-snackbar>
</template>
