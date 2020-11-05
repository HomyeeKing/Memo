import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import Child from '@/components/children'
export default defineComponent({
    name:"About",
    components:{Child},
    setup(){
        return ()=>(
           <Child text="hihi"></Child>
            )

        }
})