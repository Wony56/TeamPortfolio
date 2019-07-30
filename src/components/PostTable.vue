<template>
  <v-data-table :headers="headers" :items="desserts">
    <template class="row" slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.author }}</td>
      <td class="text-xs-right post-title">{{ props.item.title }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
    </template>
    <template
      slot="pageText"
      slot-scope="{ pageStart, pageStop }"
    >From {{ pageStart }} to {{ pageStop }}</template>
  </v-data-table>
</template>

<script>
import firebaseService from "../services/FirebaseService";

export default {
  data: () => ({
    max25chars: v => v.length <= 25 || "Input too long!",
    pagination: {},
    dialog: false,
    headers: [
      {
        text: "작성자",
        align: "left",
        value: "name",
        sortable: false
      },
      { text: "글제목", value: "title", sortable: false },
      { text: "작성일", value: "date", sortable: false }
    ],
    desserts: []
  }),
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let posts = await firebaseService.getPosts();

      posts.forEach(post => {
        let row = {
          author: post.author,
          title: post.title,
          date: post.created_at
        };

        this.desserts.push(row);
      });
    }
  }
};
</script>

<style>
.post-title {
  text-overflow: clip;
}
</style>