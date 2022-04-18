import type { NextApiRequest, NextApiResponse } from 'next'
import * as Foursquare from '@/services/foursquare'
import * as Supabase from '@/services/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const latitude = 59.33232356380489
  const longitude = 18.066694994461937
  const category = '13065'

  const places = await Foursquare.searchPlaces({ category, latitude, longitude })
  const randomIdx = Math.floor(Math.random() * places.length)
  const place = places[randomIdx]

  const supabasePlace = await Supabase.getPlace(place.fsq_id)
  if (!supabasePlace) await Supabase.createPlace(place.fsq_id)

  return res.redirect(302, `/restaurants/${place.fsq_id}`)
}
