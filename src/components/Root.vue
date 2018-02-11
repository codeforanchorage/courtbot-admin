<template>
  <div id="root">
    <div id="components">
        <div id="summary">
            <h1>Status</h1>
            <casestats class="component"></casestats>
            <requeststats class="component"></requeststats>
            <runnerdates class="component"></runnerdates>
        </div>
        <div id="charts">
            <h2>Total SMS hits by date</h2>
            <actionsbyday class="chartComponent"></actionsbyday>

            <h2>SMS Hits and Notifications <span id="notificationLink">[ <router-link :to="{name: 'Notification-List'}"> recent notifictions</router-link> ] </span></h2>
            <h5>Stats for past
                <span v-on:click="daysback=1"  v-bind:class="{ active: daysback==1}"> Day </span> |
                <span v-on:click="daysback=7" v-bind:class="{ active: daysback==7}"> Week</span> |
                <span v-on:click="daysback=30" v-bind:class="{ active: daysback==30}"> Month </span>
            </h5>

            <div id="counts">
                <actioncounts :daysback="daysback" apiPath="action_counts" title="Incoming requests by type"></actioncounts>
                <actioncounts :daysback="daysback" apiPath="notification_counts" title="Notifications Sent"></actioncounts>
            </div>
            <div id="errors">
                <unusableinput :daysback="daysback"></unusableinput>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import requeststats from '@/components/globalStats/requestCounts'
import casestats from '@/components/globalStats/caseCounts'
import actionsbyday from '@/components/globalStats/actionsByDay'
import runnerdates from '@/components/globalStats/runnerDates'
import unusableinput from '@/components/globalStats/unusableInput'
import actioncounts from '@/components/barCharts/actionCounts'

export default {
    name: 'root',
    data () {
        return {
            daysback: 7
        }
    },
    components: {
        requeststats: requeststats,
        casestats:casestats,
        actioncounts: actioncounts,
        actionsbyday: actionsbyday,
        unusableinput:unusableinput,
        runnerdates
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#root {
    box-sizing: border-box;
    margin: 0px 20px 20px 20px;
}
.chartComponent{
    margin-bottom: 2em;
}
#components{
    display:flex;
    width:100%;
}
#summary {
    margin-right: 1em;
    margin-left: 1em;
}
#summary h1{
    font-size: 1.5em;
    font-weight: normal;
    margin-top: 0;
}

#counts {
    display:flex;
    width:100%;
    box-sizing: border-box;
    flex-wrap: wrap;
    margin-bottom: 2em;
}
#charts {
    flex-grow: 1;
    flex-direction: column;
    margin-left:2em;
    overflow: hidden; /* needed for chart to resize properly */
}
#notificationLink {
    font-size: .6875em;
}
.component {
    margin: .5em 1em 0em 0;
    padding-bottom: 1em;
    width: 9em;
    font-size:1em;
    line-height: 150%;
}

h1, h5 {
    font-weight: normal;
    margin-top: 0px;
}
h2 {
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 0;
}
.active {
    font-weight: bold
}
ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
  color: steelblue;
}
a:hover {
  color: grey;
}

@media (max-width: 800px){
    #summary{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        border-top: 1px solid lightgrey;
        border-bottom: 1px solid lightgrey;
        margin: 0px 0px 20px 0px

    }
    #summary h1 {
        display: none;
    }
    #components{
        flex-direction: column;
    }
    .component {
        border-top:none;
    }
    #charts {
        padding:0;
        margin:0;
    }
}
</style>
