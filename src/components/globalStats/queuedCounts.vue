<template>
  <div id="stats">
    <h1>{{counts.all}} Queued</h1>
    <ul>
        <li>{{counts.sent}} Sent </li>
        <li>{{counts.scheduled}} Scheduled </li>
    </ul>
  </div>
</template>

<script>
const apiURL = 'http://localhost:5000/api/queued_counts'

export default {
    name: 'queued_counts',
    data () {
        return {
            counts:{},
        }
    },
    methods: {
        getCounts: function(){
            this.$http.get(apiURL)
            .then(r => r.json())
            .then(r => {
                this.counts = r
            })
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
}
 h1 {
     font-size: 1em;
     margin:0px;
     text-transform: uppercase;

 }
</style>
