<!--
    Queries API and displays requests associated with a particular phone number passed in.
-->
<template>
    <div id="requests">
        <h3>{{requests.length}} {{requests.length === 1 ? 'Request' : 'Requests'}} Scheduled</h3>
        <request :request="request" :showphone=false :showcase=true v-for="request in requests" v-bind:key="request.phone"></request>
    </div>
</template>

<script>
import request from './request.vue'
import config from '@/config.js'

const apiURL = config.API_URL + 'requests_by_phone'

export default {
    name: 'request_by_phone_search',
    data () {
        return {
            requests:[],
        }
    },
    props: ['phonehash'],
    components:{
        'request': request
    },
    methods: {
        findRequests: function(id){
            this.$http.get(apiURL,  {params: {phone: this.phonehash}})
            .then(r => r.json())
            .then(r => this.requests = r)
            .catch(e => console.log("error: ", e))
        }
    },
    watch: {
        'phonehash': function(){
            this.findRequests(this.phonehash)
        }
    },
    beforeMount: function(){
        this.findRequests(this.phonehash)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
