<template>
  <v-dialog v-model="$store.state.modal.deleteDialog" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">삭제하시겠습니까?</v-card-title>

      <v-card-text>삭제를 원하시면 아래의 동의 버튼을 눌러주세요.</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" flat @click="closeDeleteDialog">거부</v-btn>

        <v-btn color="red darken-1" flat @click="confirmDelete">동의</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import firebaseService from "../../services/FirebaseService";

export default {
  computed: mapState({
    type: state => state.document.type,
    document: state => state.document.document,
    postTables: state => state.admin.postTables,
    portfolioTables: state => state.admin.portfolioTables
  }),
  methods: {
    ...mapMutations([
      "countPost",
      "countPortfolio",
      "closeDeleteDialog",
      "resetDocument"
    ]),
    async confirmDelete() {
      if (this.type === "post") {
        await firebaseService.deletePost(this.document.id);

        const index = this.postTables.indexOf(this.document);
        this.postTables.splice(index, 1);
        this.countPost();
      } else if (this.type === "portfolio") {
        await firebaseService.deletePortfolio(this.document.id);

        const index = this.portfolioTables.indexOf(this.document);
        this.portfolioTables.splice(index, 1);
        this.countPortfolio();
      }

      this.resetDocument();
      this.closeDeleteDialog();
    }
  }
};
</script>
