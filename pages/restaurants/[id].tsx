import type { GetServerSideProps, NextPage } from 'next'
import invariant from 'tiny-invariant'
import * as RestaurantApi from '@/services/restaurant-api'
import Link from 'next/link'

type Props = RestaurantApi.Restaurant

const Restaurant: NextPage<Props> = ({ name }) => {
  return (
    <div className="space-y-10 p-4">
      <main className="text-center">
        <p className="text-gray-600">You&apos;re going to:</p>
        <h1 className="text-2xl">{name}</h1>
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

  const restaurant = RestaurantApi.get(id)

  if (restaurant === undefined) return { notFound: true }

  return {
    props: restaurant,
  }
}

export default Restaurant
