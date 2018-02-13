<!--
    Locates a case in the hearings table if it exists. Then loads any requests associated with that case.
    This is the component called from the main search input in the site's header.
-->
<template>
    <div class="citation_search">
        <h3>Query: {{citationNumber}}</h3>
        <div id="listing">
            <div id="case_record">
                <citation :citationNumber="citationNumber"></citation>
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

export default {
    name: 'citation_search',
    props: ['citationNumber'],
    components:{
        'citation': citation,
        'request_list': request_list
    },
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

