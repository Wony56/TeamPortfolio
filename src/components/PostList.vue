<template>
  <v-data-table  :headers="headers" :items="desserts">
    <template class="row" slot="items" slot-scope="props">
      <tr @click="viewpost(props.item)">
      <td style="background-color:#ff6f61; color:#fff" class="text-xs-left">{{ props.item.author }}</td>
      <td class="text-xs-right post-title">{{ props.item.title }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
      </tr>
    </template>
    <template text-xs-left
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
        width: "150",
        sortable: false
      },
      { text: "글제목", align: "right", value: "title", sortable: false },
      { text: "작성일", align:"right", value: "date", sortable: false }
    ],
    desserts: []
  }),
  created() {
    this.initialize();
  },
  methods: {
    viewpost(a){
      this.$router.push(`/postview/${a.id}`)
    },
    async initialize() {
      let posts = await firebaseService.getPosts();

      posts.forEach(post => {
        let row = {
          author: post.author,
          title: post.title,
          date: post.created_at,
          id:post.id
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
