<template>
  <v-card flat row wrap>
    <v-container grid-list-xs fluid flat>
      <v-layout row wrap flat>
        <v-flex v-for="(image, i) in images" :key="i" xs4 sm3 md2 lg2 xl2 d-flex flat>
          <v-card flat tile class="d-flex">
            <v-img :src="image" :lazy-src="image" aspect-ratio="1" class="grey lighten-2">
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import FirebaseService from "../../services/FirebaseService";

export default {
  data() {
    return {
      images: []
    };
  },
  created() {
    FirebaseService.getPortfolios().then(portfolios => {

      console.log(portfolios);
      
      for(let i = 0; i < portfolios.length && i < 30; i++) {

        if(portfolios[i].img === undefined || portfolios[i].img.length == 0)
          continue;
        
        this.images.push(portfolios[i].img[0]);
      }
    });
  }
};
</script>
