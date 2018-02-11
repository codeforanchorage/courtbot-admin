<!--
    Small status component to how many cases are currently being watched
-->
<template>
    <div id="stats">
        <h1>Requests</h1>
        <ul>
            <li>Watching
            <li>{{counts.case_count}} case IDs from</li>
            <li>{{counts.phone_count}} phone numbers </li>
        </ul>
    </div>
</template>

<script>
import config from '@/config.js'

const apiURL = config.API_URL + 'request_counts'

export default {
    name: 'reminder_counts',
    data () {
        return {
            counts:{},
        }
    },
    methods: {
        getCounts: function(){
            this.$http.get(apiURL)
            .then(r => this.counts = r.data)
            .catch(e => console.log("error: ", e))
        }
    },
    created: function(){
        this.getCounts()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
        color: grey;
        margin:0px;
        text-transform: uppercase;
    }
</style>
