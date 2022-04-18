import { createClient } from '@supabase/supabase-js'
import invariant from 'tiny-invariant'

const PROJECT_URL = process.env.SUPABASE_PROJECT_URL
invariant(typeof PROJECT_URL === 'string', 'Supabase project URL is missing')

const API_KEY = process.env.SUPABASE_API_KEY
invariant(typeof API_KEY === 'string', 'Supabase API key is missing')

export type Place = {
  likes: number
  dislikes: number
}

const TABLE = {
  places: 'places',
}

const PROCEDURE = {
  incrementLike: 'increment_like',
  incrementDislike: 'increment_dislike',
}

const supabase = createClient(PROJECT_URL, API_KEY)

export const getPlace = async (placeId: string): Promise<Place> => {
  const { data, error } = await supabase
    .from(TABLE.places)
    .select('*')
    .match({ fsq_id: placeId })
    .maybeSingle()

  if (error) throw error

  console.log('Fetched place', data)
  return data
}

export const createPlace = async (placeId: string) => {
  const { data, error } = await supabase.from(TABLE.places).insert({ fsq_id: placeId })

  if (error) throw error

  console.log('Created place', data)
  return data
}

export const addLike = async (placeId: string) => {
  const { data, error } = await supabase.rpc(PROCEDURE.incrementLike, { fsq_id: placeId })

  if (error) throw error

  console.log('Added like', data)
  return data
}

export const addDislike = async (placeId: string) => {
  const { data, error } = await supabase.rpc(PROCEDURE.incrementDislike, { fsq_id: placeId })

  if (error) throw error

  console.log('Added dislike', data)
  return data
}
