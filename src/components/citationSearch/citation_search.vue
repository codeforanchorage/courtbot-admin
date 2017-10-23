<template>
    <div class="citation_search">
        <h3>Query: {{citationNumber}}</h3>
        <div id="listing">
            <div id="case_record">
                <citation :record="record" v-for="record in records" v-bind:key="record.id"></citation>
                <div class="error" v-if="records.length < 1">
                    No records were found for identifier: {{citationNumber}}.<br />
                    This search only searches the current CSV data which changes daily. Notifications and
                    requests may still be associated with this identifier.
                </div>
            </div>
            <div id="request_list">
                <request_list :citationNumber="citationNumber"></request_list>
            </div>
        </div>
    </div>
</template>

<script>

import citation from './citation.vue'
import request_list from './request_list.vue'
import config from '@/config.js'

const apiURL = config.API_URL + 'case'

export default {
    name: 'citation_search',
    data () {
        return {
            records:'',
        }
    },
    props: ['citationNumber'],
    components:{
        'citation': citation,
        'request_list': request_list
    },
    methods: {
        findCitation: function(id){
            this.search_error = ""
            this.$http.get(apiURL,  {params: {q: this.citationNumber}})
            .then(r => r.json())
            .then(r => this.records = r)
            .catch(e => console.log("error: ", e))
        }
    },
    watch: {
        'citationNumber': function(){
            this.findCitation(this.citationNumber)
        }
    },
    beforeMount: function(){
        this.findCitation(this.citationNumber)
    }
}

</script>

<style scoped>
    #listing {
            display: flex;
    }
    #case_record, #request_list {
        padding: 1em 2em 2em 1em;
        border-top: 2px solid #eee;
        border-bottom: 2px solid #eee;
    }
    #case_record{
        flex-basis: 30%;
    }
    div.citation_search {
        width: 100%;
    }
    div.error {
        margin-top:20px;
        padding: 5px;
        border-radius: 6px;
        padding: 25px;
        width: 80%;
    }
</style>

