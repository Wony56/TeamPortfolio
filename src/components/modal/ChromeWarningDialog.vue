<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline" style="color:red; font-weight: 800;">Warning!</v-card-title>
      <v-card-text>
        해당 사이트는
        <u>크롬(Chrome)</u>에 최적화
        <br />되어 있습니다.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" flat @click="dialog = false">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    browserDialog: Boolean
  },
  date() {
    return {
      dialog: false
    };
  },
  created() {
    this.dialog = this.browserDialog;
  },
  methods: {
    confirm() {
      alert(this.dialog);
      this.$emit("confirm", this.dialog);
    }
  }
};
</script>
