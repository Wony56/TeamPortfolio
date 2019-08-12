<template>
  <div>
    <div class="basic">
      <div class="banner">
        <h2 class="word">122: Want to do</h2>
      </div>
    </div>
  </div>
</template>

<script>
const wordFx = require('./wordFx.js');
const aanime = require('./anime.min.js');
const charming = require('./charming.min.js');

export default {
  name: "ImgBanner",
  props: {
    imgSrc: {
      type: String,
    },
  },
};

const effects = [
  // Effect 8
  {
    options: {
      shapeColors: ['#35c394','#76eafe','#f54665','#4718f5','#f5aa18'],
      shapesOnTop: true
    },
    hide: {
      lettersAnimationOpts: {
        duration: 300,
        delay: (t,i)  => (t.parentNode.children.length-i-1)*30,
        easing: 'easeOutExpo',
        opacity: 0,
        translateY: (t,i) => i%2 === 0 ? '80%' : '-80%',
        rotate: (t,i) => i%2 === 0 ? -25 : 25
      },
      shapesAnimationOpts: {
        duration: 50,
        easing: 'easeOutExpo',
        translateX: t => t.dataset.tx,
        translateY: t => t.dataset.ty,
        scale: 0,
        rotate: 0,
        opacity: {
          value: 0,
          duration: 50,
          easing: 'linear'
        }
      }
    },
    show: {
      lettersAnimationOpts: {
        duration: 400,
        delay: (t,i)  => (t.parentNode.children.length-i-1)*80,
        easing: 'easeOutElastic',
        opacity: {
          value: [0,1],
          duration: 100,
          easing: 'linear'
        },
        translateY: (t,i) => i%2 === 0 ? ['-80%', '0%'] : ['80%', '0%'],
        rotate: [90,0]
      },
      shapesAnimationOpts: {
        duration: () => anime.ran$refs(1000,3000),
        delay: (t,i) => i*20,
        easing: 'easeOutElastic',
        translateX: t => {
          const tx = anime.ran$refs(-250,250);
          t.dataset.tx = tx;
          return [0,tx];
        },
        translateY: t => {
          const ty = anime.ran$refs(-250,250);
          t.dataset.ty = ty;
          return [0,ty];
        },
        scale: t => {
          const s = ran$refsBetween(0.1,0.6);
          t.dataset.s = s;
          return [s,s];
        },
        rotate: () => anime.ran$refs(-90,90),
        opacity: {
          value: 0.6,
          duration: 1000,
          easing: 'linear'
        }
      }
    }
  },
];

class Slideshow {
					constructor(el) {
						this.$refs = {};
						// this.$refs.el = el;
						// this.$refs.slides = el.querySelector('.content');
						// this.$refs.words = document.getElementById('word');
						this.$refs.words = [ "122:", " Want", " to", " do"];
						this.words = [];


						console.log(this.$refs.words);
						console.log(el);

						this.$refs.words.forEach((word, pos) => {
							this.words.push(new Word(word, effects[pos].options));
						});

						this.isAnimating = true;
						this.words[0].show(effects[0].show).then(() => this.isAnimating = false);
					}
  			}

const slideshow = new Slideshow(document.querySelector('.banner'));
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat+Alternates:700|Volkhov:700|Hammersmith+One|Arbutus+Slab|Poppins:800|Questrial|Bungee+Outline|Josefin+Sans:700');

/* Color schemes */
.basic {
	--color-text: #ff6f61;
}

/* Icons */
.banner {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	min-height: 100vh;
}

/* Word + SVG styles */
.word {
	position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 0 0.25em 0;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    grid-area: title;
    font-size: 10vw;
	font-weight: 400;
	white-space: pre;
}

.word_style {
	font-family: 'Josefin Sans', sans-serif;
	font-weight: 700;
	/* text-transform: lowercase; */
	letter-spacing: -0.05em;
	color: #ff6f61;
}

.shapes {
	position: fixed;
	top: 0;
	left: 0;
}

@media screen and (max-width: 40em) {
	.word {
		font-size: 2em;
	}
}

</style>
