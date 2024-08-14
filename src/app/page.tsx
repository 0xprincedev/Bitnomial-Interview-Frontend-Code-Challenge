'use client'

import PriceLadder from '@/components/PriceLadder'

export default function Home() {
  return (
    <>
      <div className='container relative z-10 space-y-4 py-5'>
        <h1 className='text-center text-2xl font-bold'>Price Ladder</h1>
        <PriceLadder />
      </div>
      <div
        className='pointer-events-none fixed left-1/2 top-1/2 z-10 h-[90vh] w-[1200px] -translate-x-1/2 -translate-y-1/2'
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(246, 2, 89, 0.32) 0%, rgba(246, 2, 89, 0) 100%)',
        }}
      />
    </>
  )
}
