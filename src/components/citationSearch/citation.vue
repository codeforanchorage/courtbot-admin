<!--
    Displays citation object passed in as 'record' prop.
-->
<template>
    <div id="citation">
        <div id="record" :record="record" v-for="record in records" v-bind:key="record.id">
            <h4>{{record.defendant}}</h4>
            <h5 v-if="record.type">{{record.type}}</h5>
            {{record.date | moment("dddd, MMMM Do YYYY")}} | {{record.date | moment("h:mm A")}}<br>
            {{record.room}}
            <div class="citationDetail" v-for="citation in record.citations" v-bind:key='citation.id'>
                {{citation.violation}} | {{citation.description}}
            </div>
        </div>
        <div class="no_records" v-if="records.length < 1">
                No records were found for identifier: {{citationNumber}}.<br />
                This search only searches the current CSV data which changes daily. Notifications and
                requests may still be associated with this identifier.
        </div>

     </div>
</template>

<script>
const apiURL =  'case'

export default {
    name: 'citation',
    props: ['citationNumber'],
     data () {
        return {
            records:{},
        }
    },
    methods: {
        findCitation: function(id){
            this.$http.get(apiURL,  {params: {case_id: this.citationNumber}})
            .then(r => this.records = r.data)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #citation {
        display: flex;
    }
    h5{
        font-weight: normal;
        text-transform: uppercase;
        margin-bottom: .25em;
        margin-top:.25em;
    }
    #record, #requests {
        padding: 1em 2em 2em 1em;
    }
    #citation>div{
        margin: 0px 2em 0px 0px;
    }
    h4 {
       font-size: 1em;
       margin-bottom: 0;
    }
    .citationDetail {
       font-size: .75em
    }
    div.no_records {
        margin-top:20px;
        padding: 5px;
        border-radius: 6px;
        padding: 25px;
        width: 80%;
    }
    @media screen and (max-width: 800px){
       #record, #requests {
        padding: 0;
        padding-bottom: .5em;
    }
    }

</style>
