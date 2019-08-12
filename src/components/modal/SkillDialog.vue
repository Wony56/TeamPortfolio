<template>
  <v-dialog v-model="$store.state.modal.skillDialog" max-width="500">
    <v-card>
      <v-card-title style="background-color:#ff6f61; color:#fff" class="headline">SKILL</v-card-title>

      <v-card-text>
        <article class="skillrow">
          <ul>
            <li class="html">
              <em>HTML/HTML5</em>
              <div>
                <span class="animated fadeInLeft" :style="[member.skill.html]"></span>
              </div>
            </li>
            <li class="css">
              <em>CSS/CSS3</em>
              <div>
                <span class="animated fadeInLeft" :style="[member.skill.css]"></span>
              </div>
            </li>
            <li class="php">
              <em>JAVA</em>
              <div>
                <span class="animated fadeInLeft" :style="[member.skill.java]"></span>
              </div>
            </li>
            <li class="mysql">
              <em>PYTHON</em>
              <div>
                <span class="animated fadeInLeft" :style="[member.skill.python]"></span>
              </div>
            </li>
          </ul>
        </article>
        <article class="skillrow">
          <ul>
            <li class="jquery">
              <em>SERVER</em>
              <div>
                <span class="animated fadeInLeft" :style="[member.skill.server]"></span>
              </div>
            </li>
            <li class="javascript">
              <em>DB</em>
              <div>
                <span class="animated fadeInLeft" :style="[member.skill.db]"></span>
              </div>
            </li>
            <li class="seo">
              <em>VUE</em>
              <div>
                <span class="animated fadeInLeft" :style="[member.skill.vue]"></span>
              </div>
            </li>
            <li class="unix">
              <em>GIT</em>
              <div>
                <span class="animated fadeInLeft" :style="[member.skill.git]"></span>
              </div>
            </li>
          </ul>
        </article>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn flat style="background-color:#ff6f61; color:#fff" @click="closeSkillDialog">CLOSE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: ["member"],
  methods: mapMutations(["closeSkillDialog"])
};
</script>