<template>
    <div class="notification">
        <div id="link">
            <router-link class="phone"  :to="{name: 'Phone-Search', params:{phoneHash:notification.phone} }">&#9742;</router-link>
            {{notification.created_at | moment("dddd, MMMM Do YYYY")}}
        </div>
        <div>
            ID: <router-link class="caselink" :to="{name: 'Citation-Search', params:{citationNumber:notification.case_id} }">
                    {{notification.case_id}}
                </router-link>
            <p class="eventdate" v-if="notification.event_date">for {{notification.event_date | moment("dddd, MMMM Do YYYY")}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'notification',
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
</style>
