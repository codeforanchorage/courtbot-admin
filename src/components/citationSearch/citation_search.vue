<!--
    Locates a case in the hearings table if it exists. Then loads any requests associated with that case.
    This is the component called from the main search input in the site's header.
-->
<template>
    <div class="citation_search">
        <h3>Query: {{citationNumber}}</h3>
        <div id="listing">
            <div id="case_record">
                <citation :record="record" v-for="record in records" v-bind:key="record.id"></citation>
                <div class="no_records" v-if="records.length < 1">
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
import request_list from './request_list_by_citation.vue'
import config from '@/config.js'

const apiURL = config.API_URL + 'case'

export default {
    name: 'citation_search',
    data () {
        return {
            records:{},
        }
    },
    props: ['citationNumber'],
    components:{
        'citation': citation,
        'request_list': request_list
    },
    methods: {
        findCitation: function(id){
            this.$http.get(apiURL,  {params: {case_id: this.citationNumber}})
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
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }
     #case_record, #request_list {
        padding-left: 2em ;
        padding-right: 1em ;
    }
    #case_record{
        flex-basis: 30%;
    }
    div.no_records {
        margin-top:20px;
        padding: 5px;
        border-radius: 6px;
        padding: 25px;
        width: 80%;
    }
    @media screen and (max-width: 800px){
         #listing{
             box-sizing: border-box;
             flex-direction: column;
         }
         #phoneLog table{
             width: 100%;
         }
        #case_record, #request_list {
            padding-left: .2em;
            padding-right: .2em;
            padding-top: 0;
            padding-bottom: 0;
            font-size: .9em;
        }
    }

</style>

