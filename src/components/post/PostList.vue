<template>
  <v-data-table  :headers="headers" :items="desserts">
    <template class="row" slot="items" slot-scope="props">
      <tr @click="viewpost(props.item)">
      <td style="background-color:#ff6f61; color:#fff" class="text-xs-left"><span id="post-author-view">{{ props.item.author.name }}</span></td>
      <td class="text-xs-right post-title"><span id="post-title-view">{{ props.item.title }}</span></td>
      <td class="text-xs-right"><span id="post-date-view">{{ props.item.date }}</span></td>
      </tr>
    </template>
    <template text-xs-left
      slot="pageText"
      slot-scope="{ pageStart, pageStop }"
    >From {{ pageStart }} to {{ pageStop }}</template>
        
  </v-data-table>

</template>

<script>
import FirebaseService from "@/services/FirebaseService";

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
      let posts = await FirebaseService.getPosts();

      posts.forEach(post => {
        let row = {
          author: post.author,
          title: post.title,
          date: post.created_at,
          id:post.id
        };

        this.desserts.push(row);
      });
    },
    async getPosts() {
      let tempPosts = await FirebaseService.getPosts();
      let index = 0;
      this.totalPage = parseInt(tempPosts["length"] / 6);

      for (let page = 0; page < this.totalPage; page++) {
        let pagePost = [];

        for (let count = 0; count < 6; count++)
          pagePost.push(tempPosts[index++]);
        this.posts.push(pagePost);
      }
    }
  }
};
</script>

<style>
.post-title {
  text-overflow: clip;
}

#post-title-view {

  font-size: 1.5em;
}

#post-author-view {

  font-size: 1.5em;
  font-weight: bold;
}

#post-date-view {

  font-size: 1em;
}
</style>
