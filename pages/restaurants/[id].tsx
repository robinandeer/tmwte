import type { GetServerSideProps, NextPage } from 'next'
import invariant from 'tiny-invariant'
import * as Foursquare from '@/services/foursquare'
import * as Supabase from '@/services/supabase'
import Link from 'next/link'

type Props = Foursquare.Place & Supabase.Place

const Restaurant: NextPage<Props> = ({ fsq_id, name, categories, likes, dislikes }) => {
  return (
    <div className="space-y-10">
      <main>
        <div className="text-center p-4 border-b">
          <p className="text-gray-600 uppercase text-sm">You&apos;re going to:</p>
          <h1 className="text-2xl">{name}</h1>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <p className="text-sm text-gray-600">{category.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-b p-4 grid grid-flow-col">
          <form method="post" action={`/api/restaurants/${fsq_id}/dislike`}>
            <div className="flex flex-col items-center space-y-1">
              <button>👎</button>
              <p className="text-gray-600 text-sm">{dislikes}</p>
            </div>
          </form>

          <form method="post" action={`/api/restaurants/${fsq_id}/like`}>
            <div className="flex flex-col items-center space-y-1">
              <button>👍</button>
              <p className="text-gray-600 text-sm">{likes}</p>
            </div>
          </form>
        </div>
      </main>

      <footer className="grid justify-center">
        <Link href="/">
          <a className="bg-yellow-500 p-2 rounded-md">Try again</a>
        </Link>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query
  invariant(typeof id === 'string', 'id is required')

  const [fsqPlace, supabasePlace] = await Promise.all([
    Foursquare.getPlace(id),
    Supabase.getPlace(id),
  ])

  if (fsqPlace && supabasePlace) return { props: { ...fsqPlace, ...supabasePlace } }

  return { notFound: true }
}

export default Restaurant
