<template>
    <div>
        <h1> Incoming requests by type</h1>
        <svg></svg>
    </div>
</template>

<script>
import config from '@/config.js'
import barChart from '@/mixins/barChart.js'

export default {
    name: 'action_counts',
    data () {
        return {
            counts:[],
            margin: { top: 0, right: 20, bottom: 0, left:  150 },
            axis:{},
            scale:{},
            svg:{},
            axis_group: {},
            size: {height: 300, width: 500},
            apiURL: config.API_URL + 'action_counts'
        }
    },
    mixins: [barChart],
    props: {
        daysback: {
            type: Number,
            default: 7
        },

    },
}
</script>

<style scoped>
    g.axis{
        font-size: 12px;
    }
    .bar_text {
        font-size: 12px;
        fill: white;
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
        margin-top:0px;
        margin-bottom: 1em;
        text-transform: uppercase;
    }
</style>
