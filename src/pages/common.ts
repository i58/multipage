import inject from '@/config/inject'
import '../assets/index.less'

export default {
    register(Vue: any) {
        Vue.use(inject)
    }
}