<template>
    <div id="phoneReport">
        Phone Report for {{phoneHash}}
        <div id="listing">
            <div id="phoneLog">
                <phonelog :phonehash="phoneHash"></phonelog>
            </div>
            <div id="request_list">
                <h3>{{requests.length}} {{requests.length == 1 ? 'Request' : 'Requests'}} Scheduled</h3>
                <request :request="request" v-bind:showphone=false v-bind:showcase=true v-for="request in requests" v-bind:key="request.phone"></request>
            </div>
        </div>
    </div>
</template>


<script>

import request from './request.vue'
import phonelog from './phone_log.vue'
import config from '@/config.js'

const apiURL = config.API_URL + 'requests_by_phone'

export default  {
    name: "phone_search",
    props: ['phoneHash'],
    data() {
        return {
            requests:[]
        }
    },
    components:{
        'request': request,
        'phonelog': phonelog
    },
    methods: {
        findRequests: function(id){
            this.search_error = ""
            this.$http.get(apiURL, {params: {q: this.phoneHash}})
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

<style>
    #listing{
        display: flex;
    }
    #phoneLog, #request_list {
        padding: 1em 2em 2em 1em;
        border-top: 2px solid #eee;
        border-bottom: 2px solid #eee;
    }
</style>

