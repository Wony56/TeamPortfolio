<template>
  <v-dialog v-model="$store.state.modal.deleteDialog" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">삭제하시겠습니까?</v-card-title>

      <v-card-text>삭제를 원하시면 아래의 동의 버튼을 눌러주세요.</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" flat @click="closeDialog(false)">거부</v-btn>

        <v-btn color="red darken-1" flat @click="closeDialog(true)">동의</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["closeDeleteDialog"]),
    closeDialog(allowed) {
      this.$store.commit("closeDeleteDialog", { allowed: allowed });
    }
  }
};
</script>
