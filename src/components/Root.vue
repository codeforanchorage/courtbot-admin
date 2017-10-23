<template>
  <div class="hello">
    <h1>Summary</h1>
    <div id="components">
        <div id="summary">
            <casestats class="component"></casestats>
            <reminderstats class="component"></reminderstats>
        </div>
        <actioncounts class="chart_component"></actioncounts>
    </div>
  </div>
</template>

<script>
/* queuedCounts & reminderCounts could probably be merged into a single shared component */
import queuedstats from '@/components/globalStats/queuedCounts'
import reminderstats from '@/components/globalStats/reminderCounts'
import casestats from '@/components/globalStats/caseCounts'
import actioncounts from '@/components/globalStats/actionCounts'

export default {
    name: 'root',
    data () {
        return {
        msg: 'Alaska Courtbot'
        }
    },
    components: {
        reminderstats: reminderstats,
        casestats:casestats,
        queuedstats:queuedstats,
        actioncounts: actioncounts
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#components {
    display:flex;
}
.chart_component {
    margin-left:2em;
    padding: 1.5em;
}
.component {
    margin: 1em 1em 0em 0;
    padding: 1em;
    border-top: 2px solid steelblue;
    max-width: 10em;
    font-size:1.25em;
}
h1, h2 {
  font-weight: normal;
  margin-top: 0px;
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
</style>
