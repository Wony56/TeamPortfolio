<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
  >
    <template slot="items" slot-scope="props">
      <td>
        <v-edit-dialog
          :return-value.sync="props.item.name"
          lazy
        > {{ props.item.name }}
          <v-text-field
            slot="input"
            v-model="props.item.name"
            :rules="[max25chars]"
            label="Edit"
            single-line
            counter
          ></v-text-field>
        </v-edit-dialog>
      </td>
      <td class="text-xs-right">{{ props.item.content }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
 <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      <td class="text-xs-right">
        <v-edit-dialog
          :return-value.sync="props.item.iron"
          large
          lazy
          persistent
        >
          <div>{{ props.item.iron }}</div>
          <div slot="input" class="mt-3 title">Update Iron</div>
          <v-text-field
            slot="input"
            v-model="props.item.iron"
            :rules="[max25chars]"
            label="Edit"
            single-line
            counter
            autofocus
          ></v-text-field>
        </v-edit-dialog>
      </td>
    </template>
    <template slot="pageText" slot-scope="{ pageStart, pageStop }">
      From {{ pageStart }} to {{ pageStop }}
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
        max25chars: (v) => v.length <= 25 || 'Input too long!',
      pagination: {},
      dialog: false,
      headers: [
        {
          text: '작성자',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '글내용', value: 'content' },
        { text: '작성일', value: 'date' },
        { text: '수정', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        content: 0,
        date: 0
      },
      defaultItem: {
        name: '',
        content: 0,
        date: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            content: 159,
            date: 6.0
          },
          {
            name: 'Ice cream sandwich',
            content: 237,
            date: 9.0
          },
          {
            name: 'Eclair',
            content: 262,
            date: 16.0
          },
          {
            name: 'Cupcake',
            content: 305,
            date: 3.7
          },
          {
            name: 'Gingerbread',
            content: 356,
            date: 16.0
          },
          {
            name: 'Jelly bean',
            content: 375,
            date: 0.0
          },
          {
            name: 'Lollipop',
            content: 392,
            date: 0.2
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
<style>
*
{
  font-family: 'Nanum Gothic', sans-serif;
}
</style>