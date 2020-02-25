<template>
    <footer class="yqzc-footer">
        <ul>
            <li v-for="item in letters" :key="item">{{item}}</li>
        </ul>
    </footer>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TestHeader extends Vue {
    private letters: string[] = this.getLetters()

    /**获取26个英文字母大写的 */
    getLetters() {
        let results: any[] = []
        for(var i = 0; i < 26; i++){
            results.push(String.fromCharCode(65+i))
        }
        return results
    }
}
</script>
