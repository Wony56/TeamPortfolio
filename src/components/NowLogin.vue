<template>
  <v-data-table
    :items="desserts"
    class="elevation-1"
    hide-actions
    hide-headers
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.nowon }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            nowon: '접속중'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            nowon: '접속중'
          },
          {
            value: false,
            name: 'Eclair',
            nowon: '접속중'
          },
          {
            value: false,
            name: 'Cupcake',
            nowon: '접속중'
          },
          {
            value: false,
            name: 'Gingerbread',
            nowon: '접속중'
          },
          {
            value: false,
            name: 'Jelly bean',
            nowon: '접속중'
          },
          {
            value: false,
            name: 'Lollipop',
            nowon: '접속중'
          }
        ]
      }
    }
  }
</script>