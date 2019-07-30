<template>
  <!-- <div v-if="!showLoading" class="dropper">
    <input
    multiple accept="image/*"
    type="file"
    @change="uploadImages($event.target.files)">
    <span>Drag files here!</span>
  </div>
  <div v-else class="centered">
    <Spinner/>
    <div class="wait">Please Wait</div>
  </div> -->

  <div id="app">

    <file-pond
           name="test"
           ref="pond"
           label-idle="이곳에 파일을 넣어주세요."
           allow-multiple="true"
           v-bind:server="myServer"
           v-bind:files="myFiles"
           v-on:init="handleFilePondInit"/>

  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { mapActions } from 'vuex'

// Create component
const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
        FilePondPluginImagePreview
)

export default {
  name: "app",
  data () {
    return {
       // fake server to simulate loading a 'local' server file and processing a file
       myServer: {
         process: (fieldName, file, metadata, load) => {
           this.uploadImages(file); // images.js 에 있는 upLoadImages method
           setTimeout(() => {
             load(Date.now())
           }, 1500);
         }
       }
     };
  },
  methods: {
    ...mapActions(["uploadImages"]),
    // async attempUpload() {
    //   this.imgUrl = this.$store.state.imgurLink
    //   if (this.imgUrl) {
    //     try {
    //       await FirebaseService.postImage(this.title, this.imgUrl);
    //       alert("이미지 업로드 완료!");
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   } else {
    //     alert("이미지를 올려주세요.");
    //   }
    // }
    handleFilePondInit: function() {
        console.log('FilePond has initialized');

        // FilePond instance methods are available on `this.$refs.pond`
    },
  },
  components: {
    FilePond
  },
  // computed: mapGetters(["showLoading"]),
  // methods: mapActions(["uploadImages"])
};
</script>

<style scoped>
*{
font-family: 'Nanum Gothic', sans-serif;
}
.dropper {
  height: 30vh;
  border: 2px dashed black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.dropper:hover {
  background-color: #eee;
  cursor: pointer;
}

.centered {
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wait {
  display: block;
  margin: 10px;
}

input {
  width: 100%;
  height: 30vh;
  position: absolute;
  opacity: 0;
}
</style>
