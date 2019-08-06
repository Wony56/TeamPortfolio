<template>
  <v-data-table :headers="headers" :items="desserts">
    <template class="row" slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.author }}</td>
      <td class="text-xs-right post-title">{{ props.item.title }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
      <td class="text-xs-right">
        <v-btn flat icon color="red" @click="deletePost(props.item)">
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </td>
    </template>
    <template slot="pageText" slot-scope="{ pageStart, pageStop }">
      From {{ pageStart }} to {{ pageStop }}
      <DeleteDialog />
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import firebaseService from "../../services/FirebaseService";
import DeleteDialog from "../modal/DeleteDialog.vue";

export default {
  data: () => ({
    max25chars: v => v.length <= 25 || "Input too long!",
    pagination: {},
    headers: [
      {
        text: "작성자",
        align: "left",
        value: "name"
      },
      { text: "글제목", align: "right", value: "title" },
      { text: "작성일", align: "right", value: "date" },
      { text: "삭제", align: "center", sortable: false }
    ],
    desserts: []
  }),
  components: {
    DeleteDialog
  },
  computed: mapState({
    deleteAllowed: state => state.modal.deleteAllowed
  }),
  created() {
    this.initialize();
  },
  methods: {
    ...mapMutations(["openDeleteDialog"]),
    async initialize() {
      let posts = await firebaseService.getPosts();

      posts.forEach(post => {
        let row = {
          id: post.id,
          author: post.author,
          title: post.title,
          date: post.created_at
        };

        this.desserts.push(row);
      });
    },
    deletePost(item) {
      const index = this.desserts.indexOf(item);
      this.desserts.splice(index, 1);

      firebaseService.deletePost(item.id);
    }
  }
};
</script>

<style>
.post-title {
  text-overflow: clip;
}
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>