<template>
    <div id="citation">
        <div id="record">
          <h4>{{record.defendant}}</h4>
            <h5 v-if="record.type"> {{record.type}}</h5>
            {{record.date | moment("dddd, MMMM Do YYYY")}} | {{record.date | moment("h:mm A")}}<br>
            {{record.room}}
            <div class="citationDetail" v-for="citation in record.citations" v-bind:key='citation.id'>
                {{citation.violation}} | {{citation.description}}
            </div>
        </div>
     </div>
</template>

<script>

export default {
    name: 'citation',
    props:{
        record: {
            type: Object
        }
    },
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
    @media screen and (max-width: 800px){
       #record, #requests {
        padding: 0;
        padding-bottom: .5em;
    }
    }

</style>
