<template>
    <div id="chart_time" ref="chart_time"></div>
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
            action_keys: ['schedule_unmatched', 'schedule_reminder', 'delete_request', 'found_case', 'already_subscribed', 'unmatched_case', 'unusable_input'],
            size: {
                width:900,
                height: 300
                },
            margin:  { top: 20, right: 25, bottom: 20, left:  25 },
            scale:{},
            axis:{},
            axis_group:{},
            svg:{}
        }
    },
    props: {
        daysback: {
            type: Number,
            default: 14
        }
    },
    methods: {
        getCounts: function(){
            this.$http.get(apiURL, {params: {daysback: this.daysback}})
            .then(r => r.json())
            .then(r => {
                this.action_counts = r
                this.drawChart(this.action_counts)
                })
            .catch(e => console.log("error: ", e))
        },
        resize: function(){
            console.log("Resize called", this.size.width)
            let width = this.size.width - this.margin.left - this.margin.right
            let height =  this.size.height - this.margin.top - this.margin.bottom
            this.scale.x = d3.scaleTime().range([0, width])
            this.axis.x = d3.axisBottom(this.scale.x).tickFormat(d3.timeFormat('%m-%d'))
            const t = d3.transition().duration(750);


            d3.select('#chart_time').select('svg')
            .transition(t)
            .attr("width", width + this.margin.left + this.margin.right)
            this.drawChart(this.action_counts)
        },
        initChart: function(){
            let width = this.size.width - this.margin.left - this.margin.right
            let height =  this.size.height - this.margin.top - this.margin.bottom
            this.scale.x = d3.scaleTime().range([0, width])
            this.axis.x = d3.axisBottom(this.scale.x).tickFormat(d3.timeFormat('%m-%d'))

            this.scale.y = d3.scaleLinear().range([height, 0])
            this.axis.y = d3.axisLeft(this.scale.y)

            this.scale.z = d3.scaleOrdinal(d3.schemeCategory20);

            /* Make chart legend */
            let element = d3.select("#chart_time").append("ul")
                .attr("class", "legend").selectAll('.legend_item')
                .data(this.action_keys).enter()
                .append("li").attr('class', 'legend_item')

            element.append("div")
                .style('width', '1em')
                .style('height', '1em')
                .style('display', 'inline-block')
                .style('background-color', d => this.scale.z(d))

            element.append('span').text(d => d.replace('_', ' '))

            /* root element */
            this.svg = d3.select("#chart_time").append('svg')
                .attr("width", width + this.margin.left + this.margin.right)
                .attr("height", height + this.margin.top + this.margin.bottom)
                .append("g")
                .attr("transform", "translate(" + this.margin.left + "," +   this.margin.top + ")");

            this.axis_group.x =  this.svg.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", `translate(0, ${height})`);

            this.axis_group.y =  this.svg.append("g")
                .attr("class", "axis axis--y")
        },
        drawChart: function(data){
            const t = d3.transition()
                .duration(750);

            data.forEach(item => {
                item.date = new Date(item.day)
                item.total = item.actions.reduce((acc, curr) => acc + curr.count, 0)
                item.actions.forEach(a => item[a.type] = a.count )
                this.action_keys.forEach(key => { if(!item[key]) item[key] = 0 })
            })

            this.scale.x.domain(d3.extent(data.map(i => i.date)))
            .ticks(data.length)

            this.axis_group.x
            .transition(t)
            .call(this.axis.x);

            this.scale.y.domain([0, d3.max(data, i => i.total)])

            this.axis_group.y
            .transition(t)
            .call(this.axis.y)

            let stack = d3.stack()
            .keys(this.action_keys)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone)

            let area_line = d3.area()
            .curve(d3.curveBasis)
            .x(d => this.scale.x(d.data.date))
            .y0(d => this.scale.y(isNaN(d[0]) ? 0 : d[0]))
            .y1(d => this.scale.y( isNaN(d[1]) ? 0 : d[1]))

            let lines = this.svg.selectAll(".line").data(stack(data))
            lines.enter().append("path")
            .attr("class", "line")
            .attr("fill", d => this.scale.z(d.key))
            .attr("fill-opacity", 0.5)
            .attr('stroke', 'white')
            .attr('stroke-width', 0.5)
            .merge(lines)
            .transition(t)
            .attr("d", d => area_line(d))
        }
    },
    mounted: function(){
        this.size.width = this.$refs.chart_time.clientWidth
        this.initChart()
        this.getCounts()
        let debounceTimer;
        window.onresize = (e) => {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => {
              this.size.width = this.size.width = this.$refs.chart_time.clientWidth
                this.resize();
            }, 150)
        }
    },
    watch: {
        daysback: function(){
        this.getCounts()
        }
    }
}

</script>
<style>
    ul.legend {
        padding: 0;
        margin: 0px;
        max-width: 500px;

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
    #stats_line{
        position:relative;
        width:90%;
    }
    #chart_time{
        position:relative;
        width: 100%;
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
