<template>
  <div id="stats_line">
    <div id="chart_time"></div>
  </div>
</template>

<script>
import config from '@/config.js'
import * as d3 from 'd3'

const apiURL = config.API_URL + 'actions_by_day'

export default {
    name: 'action_by_day',
    data () {
        return {
            action_counts:[],
        }
    },
    props: {
        daysback: {
            type: Number,
            default: 7
        }
    },
    methods: {
        getCounts: function(){
            this.$http.get(apiURL, {params: {q: this.daysback}})
            .then(r => r.json())
            .then(r => {
                this.action_counts = r
                chart(r)
                })
            .catch(e => console.log("error: ", e))
        }
    },
    created: function(){
    },
    mounted: function(){
        chartInit()
        this.getCounts()

    },
    watch: {
        daysback: function(){
        this.getCounts()
        }
    }
}
let  div_width, margin, width, height, y, x, svg, x_axis, x_axis_group, y_axis, y_axis_group, t, z
const fontSize = 12;
const action_keys = ['schedule_unmatched', 'schedule_reminder', 'delete_request', 'found_case', 'already_subscribed', 'unmatched_case', 'unusable_input']

function chartInit(){
    div_width = 1100;
    height = 300;
    margin = { top: 20, right: 60, bottom: 20, left:  20 }
    width = div_width - margin.left - margin.right,
    height =  300 - margin.top - margin.bottom

    x = d3.scaleTime()
    x.range([0, width])
    x_axis = d3.axisBottom(x)
    x_axis.tickFormat(d3.timeFormat('%m-%d'))

    y = d3.scaleLinear()
    .range([height, 0])

    y_axis = d3.axisLeft(y)
    z = d3.scaleOrdinal(d3.schemeCategory20);

  // Make chart legend
    let element = d3.select("#chart_time").append("ul")
    .attr("class", "legend").selectAll('.legend_item').data(action_keys).enter()
    .append("li").attr('class', 'legend_item')
    element.append("div").style('width', '1em').style('height', '1em').style('display', 'inline-block')
    .style('background-color', d => z(d))

    element.append('span').text(d => d.replace('_', ' '))

    svg = d3.select("#chart_time").append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," +   margin.top + ")");

    x_axis_group =  svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0, ${height})`);

    y_axis_group =  svg.append("g")
        .attr("class", "axis axis--y")

    t = d3.transition()
      .duration(750);


}

function chart(data){

    data.forEach(item => {
        item.date = new Date(item.day)
        item.total = item.actions.reduce((acc, curr) => acc + curr.count, 0)
        item.actions.forEach(a => item[a.type] = a.count )
        action_keys.forEach(key => { if(!item[key]) item[key] = 0 })
    })

    x.domain(d3.extent(data.map(i => i.date)))
    .ticks(data.length)

    x_axis_group
    .transition(t)
    .call(x_axis);

    y.domain([0, d3.max(data, i => i.total)])

    y_axis_group
        .transition(t)
        .call(y_axis)

    var stack = d3.stack()
        .keys(action_keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone)

    var series = stack(data)
    console.log("series", series)


    var count_line = d3.line()
        .curve(d3.curveBasis)
        .x(d => x(d.date))
        .y(d => y(d.total))

    var area_line = d3.area()
       .curve(d3.curveBasis)
        .x(d => x(d.data.date))
        .y0(d => {
            let d0 = isNaN(d[0]) ? 0 : d[0]
            return y(d0)
        })
        .y1(d => {
            let d1 = isNaN(d[1]) ? 0 : d[1]
            return y(d1)
        })

    svg.selectAll(".line").data(stack(data)).enter().append("path")
    .attr("class", "line")
    .attr("d", d => area_line(d))
    .attr("fill", d => z(d.key))
    .attr("fill-opacity", 0.5)
    .attr('stroke', 'white')
    .attr('stroke-width', 0.5)

    }
</script>
<style>
    ul.legend {
        padding: 0;
        margin: 0px;
        width: 50%;

    }
    ul.legend li{
        display: inline-block;
        margin-left: 1em;
        text-transform: capitalize;
        font-size: .75em;
        padding: 0px;
    }
    ul.legend li div {
        margin-right: .5em;
    }
</style>
<style scoped>
    #chart_time{
       /* width: 400px;*/
    }
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
        margin:0px;
        text-transform: uppercase;
    }
    .line {
        fill: none;
        stroke: steelblue;
        stroke-width: 2px;
    }
</style>
