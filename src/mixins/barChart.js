import * as d3 from 'd3'

export default  {
    mounted: function(){
        // these functions come from barChart mixin
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
            this.$http.get(this.apiURL, {params: {q: this.daysback}})
            .then(r => r.json())
            .then(r => {
                this.counts = r
            })
            .catch(e => console.log("error: ", e))
        },
        chartInit: function(){
            this.size.width = this.size.width - this.margin.left - this.margin.right
            this.size.height =  this.size.height - this.margin.top - this.margin.bottom

            this.svg = d3.select(this.$el).select('svg')
            .attr("width", this.size.width + this.margin.left + this.margin.right)
            .attr("height", this.size.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left} , ${this.margin.top})`);
            console.log(this.size)
            this.scale.y = d3.scaleBand().padding(0.1)
            .range([0, this.size.height])

            this.axis.y = d3.axisLeft(this.scale.y)

            var STYLE_MODULE_NAME = this.$el.attributes[0].name;

            this.axis_group.y = this.svg.append("g")
            .attr("class", "axis axis--y")
            .attr(STYLE_MODULE_NAME, '')
        },
        chartDraw: function(data){
            const t = d3.transition()
            .duration(750);

            this.scale.x = d3.scaleLinear()
            .domain([0, d3.max(data, d => parseInt(d.count))])
            .range([0, this.size.width]);

            this.scale.y.domain(data.map(d => d.type))

            this.axis_group.y
            .transition(t)
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
