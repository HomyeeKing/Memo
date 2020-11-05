import { defineComponent, toRaw, toRefs } from 'vue'
import {Button} from 'ant-design-vue'
const child = defineComponent({
    name:"child",
    props:{
        text:{
            type:String,
            required:true
        }
    },
    setup(props){
        const {text} = toRefs(props)
        return ()=> (
        <Button>{text.value}</Button>
        )
    }
})

export default child