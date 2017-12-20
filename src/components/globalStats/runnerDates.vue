<template>
  <div id="runner_stats">
    <h1>Runners</h1>
    <ul>
        <li v-for="runner in runners" v-bind:key="runner.runner">{{runner.runner | _tail}}:
        {{runner.date | moment('MMM DD, YYYY')}} </li>
    </ul>
  </div>
</template>

<script>
import config from '@/config.js'

const apiURL = config.API_URL + 'runner_last_run'

export default {
    name: 'runner_dates',
    data () {
        return {
            runners:[],
        }
    },
    methods: {
        getCounts: function(){
            this.$http.get(apiURL)
            .then(r => r.json())
            .then(r => this.runners = r)
            .catch(e => console.log("error: ", e))
        }
    },
    created: function(){
        this.getCounts()
    },
    filters:{
        _tail: function(str){
            if (!str) return ''
            str = str.toString()
            let tail = str.replace(/.+_/, '')
            return tail.charAt(0).toUpperCase() + tail.slice(1);
        }
    }
}
</script>

<style scoped>
    ul {
        padding: 0px;
        margin:0px;
    }
    li {
        list-style-type: none;
        font-size: .75em;
        line-height: 150%;
    }
    h1 {
        font-size: 1em;
        margin:0px;
        text-transform: uppercase;
    }
</style>
