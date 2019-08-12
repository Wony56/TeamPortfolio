<template>
  <v-dialog v-model="$store.state.modal.gitDialog" max-width="800">
    <v-card-title style="background-color:#ff6f61; color:#fff">GIT</v-card-title>
    <v-card v-for="(member, index) in members" :key="index">
      <v-card-title class="headline">{{member.name_with_namespace}}</v-card-title>
      <v-card-text>{{member.created_at}}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          style="background-color:#ff6f61; color:#fff"
          flat
          text
          @click="showRepoPage(member.web_url)"
        >OPEN</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["members"]
};
</script>