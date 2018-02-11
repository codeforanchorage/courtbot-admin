<!--
    Component that displays phonelog and request list for passed in (encrypted) phone.
-->
<template>
    <div id="phoneReport">
        Phone Report for {{phoneHash}}
        <div id="listing">
            <div id="phoneLog">
                <phonelog :phonehash="phoneHash"></phonelog>
            </div>
            <div id="request_list">
                <request_list :phonehash="phoneHash"></request_list>
            </div>
        </div>
    </div>
</template>


<script>
import phonelog from './phone_log.vue'
import request_list from './request_list_by_phone.vue'
import config from '@/config.js'

const apiURL = config.API_URL + 'requests_by_phone'

export default  {
    name: "phone_search",
    props: ['phoneHash'],
    data() {
        return {
            requests:[]
        }
    },
    components:{
        'phonelog': phonelog,
        'request_list': request_list
    }
}
</script>

<style>
    #listing{
        display: flex;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding-top: 1em;
        padding-bottom: 1em;
    }
    #phoneLog, #request_list {
        padding-left: 2em ;
        padding-right: 1em ;
    }
    @media screen and (max-width: 800px){
         #listing{
             box-sizing: border-box;
             flex-direction: column-reverse
         }
         #phoneLog table{
             width: 100%;
         }
        #phoneLog, #request_list {
            padding: 1em .2em 1em .2em;
        }
    }
    @media screen and (max-width: 500px){
        #phoneLog td{
             padding: .4em;
             font-size: .75em;
         }

    }
</style>

