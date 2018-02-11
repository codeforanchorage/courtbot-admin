<!--
    Small status component to show state of the hearings table in the DB
-->
<template>
  <div id="stats">
    <h1>Hearings</h1>
    <ul>
        <li>Records: {{cases.count}}
        <li>Imported: {{cases.date | moment('MMM DD, YYYY')}}</li>
    </ul>
  </div>
</template>

<script>

const apiURL = 'hearing_counts'

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
            .then(r => this.cases = r.data[0])
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
        color: grey;
        margin:0px;
        text-transform: uppercase;

    }
</style>
