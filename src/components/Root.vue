<template>
  <div class="root">
    <div id="components">
        <div id="summary">
            <casestats class="component"></casestats>
            <reminderstats class="component"></reminderstats>
            <runnerdates class="component"></runnerdates>
        </div>
        <div id="charts">
            <h2>Total SMS hits by date</h2>
            <actionsbyday></actionsbyday>
            <h2>SMS Hits and Notifications</h2>

            <h5>Stats for past
                <span v-on:click="daysback=1"  v-bind:class="{ active: daysback==1}"> Day </span> |
                <span v-on:click="daysback=7" v-bind:class="{ active: daysback==7}"> Week</span> |
                <span v-on:click="daysback=30" v-bind:class="{ active: daysback==30}"> Month </span>
            </h5>

            <div id="counts">
                <actioncounts :daysback="daysback" class="chart_component"></actioncounts>
                <notificationcounts :daysback="daysback" class="chart_component"></notificationcounts>
            </div>
            <div id="errors">
                <unusableinput :daysback="daysback"></unusableinput>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import reminderstats from '@/components/globalStats/reminderCounts'
import casestats from '@/components/globalStats/caseCounts'
import actioncounts from '@/components/globalStats/actionCounts'
import notificationcounts from '@/components/globalStats/notificationCounts'
import actionsbyday from '@/components/globalStats/actionsByDay'
import runnerdates from '@/components/globalStats/runnerDates'
import unusableinput from '@/components/globalStats/unusableInput'

export default {
    name: 'root',
    data () {
        return {
            msg: 'Alaska Courtbot',
            daysback: 7
        }
    },
    components: {
        reminderstats: reminderstats,
        casestats:casestats,
        actioncounts: actioncounts,
        actionsbyday: actionsbyday,
        notificationcounts:notificationcounts,
        unusableinput:unusableinput,
        runnerdates
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#components{
    display:flex;
    width:100%;
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
.chart_component {
    padding-top: .5em;
}
.component {
    margin: 1em 1em 0em 0;
    padding: 1em;
    border-top: 2px solid steelblue;
    max-width: 10em;
    font-size:1.25em;
}
h1, h5 {
  font-weight: normal;
  margin-top: 0px;
}
h2 {
font-weight: normal;
  margin-top: 1em;
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
  color: #42b983;
}
@media (max-width: 800px){
    #summary{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
         border-top: 1px solid steelblue;
        border-bottom: 1px solid steelblue;
        font-size:85%;
    }
    #components{
        flex-direction: column;
    }
    .component {
        border-top:none;
    }
}
</style>
