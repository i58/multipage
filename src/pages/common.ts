import inject from '@/config/inject'

export default {
    register(Vue: any) {
        Vue.use(inject)
    }
}