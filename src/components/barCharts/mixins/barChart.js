import {max as d3max} from 'd3-array'
import {transition} from 'd3-transition'
import {select} from 'd3-selection'
import {axisLeft} from 'd3-axis'
import {scaleBand, scaleLinear} from 'd3-scale'
/**
 * This is meant to be uses as a mixin for other components
 */
export default  {
    mounted: function(){
        this.chartInit()
        this.getCounts()
    },
    watch: {
        counts: function(){
            this.chartDraw(this.counts)
        },
        daysback: function(){
           this.getCounts()
        }
    },
    methods: {
        getCounts: function(){
            this.$http.get(this.apiURL, {params: {daysback: this.daysback}})
            .then(r => {
                this.counts = r.data
            })
            .catch(e => console.log("error: ", e))
        },
        chartInit: function(){
            this.size.width = this.size.width - this.margin.left - this.margin.right
            this.size.height =  this.size.height - this.margin.top - this.margin.bottom

            this.svg = select(this.$el).select('svg')
            .attr("width", this.size.width + this.margin.left + this.margin.right)
            .attr("height", this.size.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left} , ${this.margin.top})`);
            this.scale.y = scaleBand().padding(0.1)
            .range([0, this.size.height])

            this.axis.y = axisLeft(this.scale.y)
            .tickFormat(d => d.replace('_', ' '))

            var STYLE_MODULE_NAME = this.$el.attributes[0].name;

            this.axis_group.y = this.svg.append("g")
            .attr("class", "axis axis--y")
            .attr(STYLE_MODULE_NAME, '')
        },
        chartDraw: function(data){
            const t = transition()
            .duration(750);

            this.scale.x = scaleLinear()
            .domain([0, d3max(data, d => parseInt(d.count))])
            .range([0, this.size.width]);

            this.scale.y.domain(data.map(d => d.type))
            this.axis_group.y
            .transition(t)
            .attr('style', 'text-transform: capitalize; font-size: 12px') // styling here becuase Edge has problems with css/svg
            .call(this.axis.y);

            let bars = this.svg.selectAll(".bar")
            .data(data, d => d.type)

            bars.exit().remove()

            let group = bars.enter().append("g")
            .attr("class", "bar")
            .attr("transform", d => `translate(0, ${this.scale.y(d.type)} )`)

            group.append("rect")
            .attr('class', "bar_rect")
            .transition(t)
            .attr('width', d => this.scale.x(parseInt(d.count)))
            .attr('height',this.scale.y.bandwidth())
            .attr('fill', 'steelblue')

            // make it possible for vue's scoped css to find this element
            var STYLE_MODULE_NAME = this.$el.attributes[0].name;

            group.append('text')
            .attr('class', "bar_text")
            .attr('style', 'fill:white; font-size:12px')
            .attr(STYLE_MODULE_NAME, '')
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'end')
            .attr('dy', this.scale.y.bandwidth()/2)
            .text(d => d.count)
            .transition(t)
            .attr('x', d => this.scale.x(d.count) - 5)

            bars.transition(t)
            .attr("transform", d => `translate(0, ${this.scale.y(d.type)})`)

            bars.select('.bar_rect').transition(t)
            .attr('height', this.scale.y.bandwidth())
            .attr('width', d => this.scale.x(parseInt(d.count)))

            bars.select('.bar_text').transition(t)
            .attr('x', d => this.scale.x(d.count) - 5)
            .attr('dy', this.scale.y.bandwidth()/2)
            .text(d => d.count)
        }
    }
}
