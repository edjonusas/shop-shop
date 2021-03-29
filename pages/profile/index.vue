<template>
<div>
    <Orders :userOrders="orderData"/>
</div>
    
    
</template>
<script>
import Orders from '~/components/Orders.vue';
export default {
    name: "index",
    components:{
        Orders
    },
    computed:{
        orderData(){
        return this.$store.getters.getUserOrders
        }
    },
    fetch({store}) {
        return store.dispatch('getUserOrders')
    },
    }
</script>