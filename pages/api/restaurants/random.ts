import type { NextApiRequest, NextApiResponse } from 'next'
import * as RestaurantApi from '@/services/restaurant-api'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const restaurant = RestaurantApi.getRandom()
  res.redirect(302, `/restaurants/${restaurant.id}`)
}
