import * as Supabase from '@/services/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'
import invariant from 'tiny-invariant'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const placeId = req.query.placeId
  invariant(typeof placeId === 'string', 'Place ID is missing')

  const place = await Supabase.getPlace(placeId)
  if (!place) {
    await Supabase.createPlace(placeId)
  }

  await Supabase.addDislike(placeId)

  return res.redirect(302, `/restaurants/${placeId}`)
}
