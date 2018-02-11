<!--
    Small status component showing unusable user input from last daysback days
-->
<template>
  <div id="runner_stats">
    <h1>Unusable User Input</h1>
    <ul>
        <li v-for="count in counts" v-bind:key="count.body">
        {{count.body}} ( {{count.count}} )</li>
    </ul>
  </div>
</template>

<script>
import config from '@/config.js'

const apiURL = config.API_URL + 'unusable_input'

export default {
    name: 'unusable_input',
    data () {
        return {
            counts:[],
        }
    },
    props: {
        daysback: {
            type: Number,
            default: 14
        }
    },
     watch: {
        daysback: function(){
           this.getCounts()
        }
    },
    methods: {
        getCounts: function(){
            this.$http.get(apiURL, {params: {daysback: this.daysback}})
            .then(r => this.counts = r.data)
            .catch(e => console.log("error: ", e))
        }
    },
    created: function(){
        this.getCounts()
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
        font-size: .875em;
        line-height: 150%;
    }
    h1 {
        font-size: 1em;
        margin:0px;
        text-transform: uppercase;
    }
</style>
