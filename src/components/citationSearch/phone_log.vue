<template>
    <div id="log">
        <h3>{{logs.length}} Texts from this user</h3>
        <table v-if="logs.length > 0">
            <thead>
                <tr>
                    <th v-for="header in logColumns" v-bind:key="header">{{header}}</th>
                </tr>
            </thead>
            <tr v-for="log in logs" v-bind:key="log.time">
                <td>{{log.time | moment('MMM DD, YYYY h:MMA')}} </td><td>{{log.action}}</td><td>{{log.body}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import config from '@/config.js'
const apiURL = config.API_URL + 'phonelog'
export default  {
    name: 'phonelog',
    data () {
        return {
            logs:[],
            logColumns: ['Date', 'Action', 'Input']
        }
    },
    props: ['phonehash'],
    methods: {
        getLog: function(){
            this.$http.get(apiURL,  {params: {phone: this.phonehash}})
            .then(r => r.json())
            .then(r => this.logs = r)
            .catch(e => console.log("error: ", e))
        }
    },
    beforeMount: function(){
        this.getLog(this.phonehash)
    }
}
</script>

<style>
    table{
        border-top: 4px solid #aaa;
        border-bottom: 4px solid #aaa;
    }
    th {
        text-align: left;
        padding:.5em;
        font-size: .875em;
    }
    td {
        font-size: .875em;
        padding: .5em;
    }
    tr:nth-child(even) {
        background: #ccdced
    }
</style>