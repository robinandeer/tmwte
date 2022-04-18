import invariant from 'tiny-invariant'

const BASE_URL = 'https://api.foursquare.com/v3'
const FSQ_API_KEY = process.env.FSQ_API_KEY
invariant(FSQ_API_KEY, 'Foursquare API key is missing')

export type Place = {
  fsq_id: string
  categories: Array<{
    id: number
    name: string
    icon: { prefix: string; suffix: string }
  }>
  geocodes: {
    main: {
      latitude: number
      longitude: number
    }
    roof: {
      latitude: number
      longitude: number
    }
  }
  location: {
    address: string
    country: string
    formatted_address: string
    locality: string
    postcode: string
    region: string
  }
  name: string
  related_places: {
    children: Array<{ fsq_id: string; name: string }>
  }
}

export const getPlace = async (id: string): Promise<Place | null> => {
  const response = await fetch(`${BASE_URL}/places/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: FSQ_API_KEY,
    },
  })

  if (response.ok) {
    return await response.json()
  }

  return null
}

type SearchParams = {
  category: string
  latitude: number
  longitude: number
}

export const searchPlaces = async ({
  category,
  latitude,
  longitude,
}: SearchParams): Promise<Array<Place>> => {
  const searchParams = new URLSearchParams({
    categories: category,
    ll: `${latitude},${longitude}`,
    limit: '50',
    radius: '500',
  })

  const url = `${BASE_URL}/places/search?${searchParams.toString()}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: FSQ_API_KEY,
    },
  })

  const data = await response.json()

  return data.results
}
