import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="grid justify-center items-center flex-grow">
      <form method="post" action="/api/restaurants/random">
        <button className="bg-red-600 text-white p-4 rounded-md text-lg active:scale-75 touch-manipulation shadow-xl shadow-red-300 transition-transform">
          Tell me where to eat!
        </button>
      </form>
    </div>
  )
}

export default Home
