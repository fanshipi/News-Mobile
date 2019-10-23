<template>
  <div>chat</div>
</template>

<script>
import io from 'socket.io-client';
export default {
    created(){
        const socket = io('http://ttapi.research.itcast.cn/app/',{
           token: this.$store.state.user.token
        })
        socket.on('connect',function(){
            console.log('success');
        })
        socket.emit("message",{
            msg:'hhhh',
            timestamp:Date.now()
        })
        socket.on('mesage',function(msg){
            console.log(msg);
        })
    }
}
</script>

<style>

</style>