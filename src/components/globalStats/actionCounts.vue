<template>
  <div id="stats">
    <div id ="title">
    <h1>SMS hits by action</h1>
    <span v-on:click ="daysback = 7">past seven days</span> <span v-on:click ="daysback = 1">One day</span>
    </div>
    <div id="chart"></div>
  </div>
</template>

<script>
import config from '@/config.js'
import * as d3 from 'd3'

const apiURL = config.API_URL + 'action_counts'

export default {
    name: 'action_counts',
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
let barHeight, div_width, margin, width, height, y, x, svg, y_axis, axis_group
const fontSize = 12;
function chartInit(){
    div_width = 600;
    barHeight = 30;
    margin = { top: 20, right: 60, bottom: 20, left:  110 }
    width = div_width - margin.left - margin.right,
    height =  barHeight * 10 - margin.top - margin.bottom

    y = d3.scaleBand()
    .padding(0.1)

    y.range([0, height])
    y_axis = d3.axisLeft(y)
    svg = d3.select("#chart").append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    axis_group =  svg.append("g")
        .attr("class", "axis axis--y")
}

function chart(data){
    const t = d3.transition()
      .duration(750);

    let x = d3.scaleLinear()
        .domain([0, d3.max(data, d => parseInt(d.count))])
        .range([0, width - 150]);

    y.domain(data.map(d => d.action))

    axis_group
    .transition(t)
    .call(y_axis);

    var bars = svg.selectAll(".bar")
        .data(data, d => d.action)

    bars.exit().remove()

    var group = bars.enter().append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(0, ${y(d.action)} )`)

    group.append("rect")
        .attr('class', "bar_rect")
        .transition(t)
        .attr('width', d => x(parseInt(d.count)))
        .attr('height',y.bandwidth())
        .attr('fill', 'steelblue')

    group.append('text')
        .attr('class', "bar_text")
        .attr('alignment-baseline', 'middle')
        .attr('dy', y.bandwidth()/2)
        .attr('font-size', fontSize)
        .text(d => d.count)
        .transition(t)
        .attr('x', d => x(d.count) + 5)

    bars.transition(t)
        .attr("transform", d => `translate(0, ${y(d.action)})`)

    bars.select('.bar_rect').transition(t)
        .attr('height',y.bandwidth())
        .attr('width', d => x(parseInt(d.count)))

    bars.select('.bar_text').transition(t)
        .attr('x', d => x(d.count) + 5)
        .attr('dy', y.bandwidth()/2)
        .text(d => d.count)


    }
</script>

<style scoped>
    #chart{
        width: 400px;
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
</style>
