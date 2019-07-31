<template>

  <div id="app">
    <FilePond
           name="test"
           ref="pond"
           label-idle="이곳에 파일을 넣어주세요."
           allow-multiple="true"
           :server="myServer"
           :files="myFiles"
           v-on:init="handleFilePondInit"
      />
  </div>
</template>

<script>
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

      myFiles: [],
       // fake server to simulate loading a 'local' server file and processing a file
       myServer: {
         process: (fieldName, file, metadata, load) => {
           //this.fetchImages(file);
           console.log(file);
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

    handleFilePondInit: function() {
        console.log('FilePond has initialized');

        console.log(this.$store.state.images.images);

        console.log(this.$store.state.images.imgurLinks);
        // FilePond instance methods are available on `this.$refs.pond`
    }
  },
  components: {
    FilePond
  },
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
