import json from '@/data/restaurants.json'

export type Restaurant = typeof json.restaurants[number]

export const get = (id: string) => {
  return json.restaurants.find((restaurant) => restaurant.id === id)
}

export const getRandom = () => {
  const random = Math.floor(Math.random() * json.restaurants.length)
  return json.restaurants[random]
}
