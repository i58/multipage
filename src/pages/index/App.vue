<template>
    <div id="app">
        <test-header title="首页"/>
            
        <test-footer />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { isFunction } from '@/libs/utils'

@Component
export default class App extends Vue {
    private name: string = isFunction(null) ? '' : 'gggggg'
}
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
