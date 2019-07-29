<template>
  <v-data-table :headers="headers" :items="desserts">
    <template class="row" slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.uid }}</td>
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.email }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
      <td class="text-xs-right">{{props.item.tier.toUpperCase()}}</td>
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
      { text: "UID", align: "center", value: "uid", sortable: false },
      { text: "이름", align: "center", value: "name", sortable: false },
      { text: "email", align: "center", value: "email", sortable: false },
      { text: "가입일", align: "center", value: "date", sortable: false },
      { text: "등급", align: "center", value: "tier", sortable: false }
    ],
    desserts: []
  }),
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let users = await firebaseService.getUsers();

      console.log(users);

      users.forEach(user => {
        let row = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          date: user.created_at,
          tier: user.tier
        };

        this.desserts.push(row);
      });
    }
  }
};
</script>