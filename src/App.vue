<template>
    <div id="app">
        <router-view v-if="isShow"></router-view>
    </div>
</template>

<script>


export default {
    name: 'app',
    provide () {
        return {
            reload: this.reload
        }
    },
    data () {
        return {
            isShow: true
        }
    },
    methods: {
        reload () {
            this.isShow= false
            this.$nextTick(function () {
            this.isShow= true
            })
        }
    }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
    text-decoration: none;
    list-style: none;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

body {

    user-select: none;
}
</style>
