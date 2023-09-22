import { ref, onMounted } from 'vue'
export const useTest = () => {
  const addr = ref('shenZhen')
  const res = ref('')
  onMounted(() => {
    // setTimeout(() => {
    //   console.log('i am ' + name.value)
    // }, 2000)
    res.value = 'i am ' + addr.value
  })
  return res
}
