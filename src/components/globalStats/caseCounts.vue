<template>
  <div id="stats">
    <h1>Hearings</h1>
    <ul>
        <li>Number in last import: {{cases.count}}
        <li>Imported on: {{cases.date | moment('MMM DD, YYYY')}}</li>
    </ul>
  </div>
</template>

<script>
import config from '@/config.js'

const apiURL = config.API_URL + 'hearing_counts'

export default {
    name: 'case_counts',
    data () {
        return {
            cases:{},
        }
    },
    methods: {
        getCounts: function(){
            this.$http.get(apiURL)
            .then(r => r.json())
            .then(r => this.cases = r[0])
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
        font-size: .75em;
        line-height: 150%;
    }
    h1 {
        font-size: 1em;
        margin:0px;
        text-transform: uppercase;

    }
</style>
