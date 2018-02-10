<!--
    Outputs information about a single notification. Used in notification_list.
-->

<template>
    <li class="notification">
        <div>{{notification.type}}</div>
        <div><router-link class="phone"  :to="{name: 'Phone-Search', params:{phoneHash:notification.phone} }">&#9742;</router-link></div>
        <div>
            <router-link class="caselink" :to="{name: 'Citation-Search', params:{citationNumber:notification.case_id} }">
                    {{notification.case_id}}
            </router-link>
        </div>
        <div class="eventdate" v-if="notification.event_date">Hearing date: {{notification.event_date | moment("dddd, MMMM Do YYYY")}}</div>
        <div class="error" v-if="notification.error">Error: {{notification.error}}</div>

    </li>
</template>

<script>
export default {
    name: 'notification_list_item',
    props:{
        notification: {
            type: Object
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   h3 {
       font-size: 1em;
   }
   .notification {
        border: 1px solid #ddd;
        padding: 1em;
        margin-bottom: .25em;
   }
   p.eventdate{
       margin:0px;
   }
   li {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
   }
   li div{
        padding-right: 7px;
        border-right: 1px solid #ddd;
        margin-right: 7px;
   }
   li div:last-child { border-right: none; }

   .error {
       color: firebrick;
   }
</style>
