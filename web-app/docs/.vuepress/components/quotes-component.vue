<template>
<div>  
    <hr/>
    <p class="quotes-title">Favourite Quotes</p>
    <transition name="slide-fade" mode="out-in">
        <div class="pointer"
            @click="incrementQuoteIndex"
            title="next quote"
            :key="quoteIndex"
            >
            <p class="quotes-text"><i>{{ quotes[quoteIndex].text }}</i>
            <br/>- {{quotes[quoteIndex].source}} </p>

        </div>
    </transition>
</div>
</template>

<script>
export default {
    data() {
        return {
            quoteIndex:0,
            quotes: [ 
                {
                    text: "When you come to a fork in the road, take it",
                    source: "Y.Berra"
                },
                {
                    text:"It never gets easier, you just go faster",
                    source:"G.LeMond"
                },
                {
                    text:"Founders build roads, not cars",
                    source:"P.Collison"
                },
                {
                    text:"Think before you speak, read before you think",
                    source:"F.Lebowitz"
                },
                {
                    text:"If you're gonna' be dumb, you gotta be tough",
                    source:"R.Wade"
                },
            ],
        }
    },
    methods: {
        incrementQuoteIndex() {
            if ( this.quoteIndex >= this.quotes.length-1 ){
                this.quoteIndex = 0
            } else {
                this.quoteIndex +=1
            }
        }
    },
    mounted() {
        this.quoteIndex = Math.floor(Math.random() * (this.quotes.length-1) )
    }
}
</script>

<style lang="css" scoped>

.quotes-title{
    margin:0px ;
    font-weight: 600;
}
.quotes-text{
    margin-top: 8px;
}

.pointer {
  cursor: pointer;
}

/*css transition https://stackoverflow.com/questions/42537359/how-do-i-add-css-animations-when-updating-a-value-with-vue-js */

.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>