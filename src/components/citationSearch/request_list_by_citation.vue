<!--
    Queries API and displays requests associated with a particular citation/case ID passed in.
-->
<template>
    <div id="requests">
        <h3>{{requests.length}} {{requests.length === 1 ? 'Request' : 'Requests'}} Scheduled</h3>
        <request :request="request" :showphone=true :showcase=false v-for="request in requests" v-bind:key="request.phone"></request>
    </div>
</template>

<script>
import request from './request.vue'
import config from '@/config.js'

const apiURL = config.API_URL + 'requests'

export default {
    name: 'request_search',
    data () {
        return {
            requests:[],
            search_error: ''
        }
    },
    props: ['citationNumber', 'phone'],
    components:{
        'request': request
    },
    methods: {
        findRequests: function(id){
            this.search_error = ""
            this.$http.get(apiURL,  {params: {case_id: this.citationNumber}})
            .then(r => r.json())
            .then(r => this.requests = r)
            .catch(e => console.log("error: ", e))
        }
    },
    watch: {
        'citationNumber': function(){
            this.findRequests(this.citationNumber)
        }
    },
    beforeMount: function(){
        this.findRequests(this.citationNumber)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
