import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFetchingStore = defineStore('fetching', () => {
  const page = ref(0)
  const loader = ref(false)

  function changePage(direction: number) {
    page.value = Math.max(0, page.value + direction)
  }

  const fetchingApi = async () => {
    loader.value = true
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?page=${page.value}&size=20&api_key=xO15lhanHARD6LlOCuvcLDbWgKt0cmXLr3nTaoKR`
      )
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`)
      }
      const data = await response.json()
      return data.near_earth_objects
    } catch (error) {
      console.error('Error fetching data:', error)
      return []
    } finally {
      loader.value = false
    }
  }

  return { page, loader, changePage, fetchingApi }
})
