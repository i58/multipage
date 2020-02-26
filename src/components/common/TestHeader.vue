<template>
    <header  style="width: 100%;height: 60px;background: #f90;color: #fff;">
        {{title}}
    </header>
</template>
<script lang="ts">
import { Component, Prop,Vue } from 'vue-property-decorator'

@Component
export default class TestHeader extends Vue {
    @Prop({type: String, default() {return ''}}) private title!: string
}
</script>
