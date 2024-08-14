import { useEffect, useMemo, useRef, useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import { Icon } from '@iconify/react/dist/iconify.js'
import { twMerge } from 'tailwind-merge'
import { priceRange, referencePrice } from '@/constant'
import { Order } from '@/types'
import OrderForm from './OrderForm'

const PriceLadder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [showAllLevels, setShowAllLevels] = useState<boolean>(true)
  const listRef = useRef<List>(null)
  const midpointPrice = useMemo(() => {
    const bidOrders = orders.filter((order) => order.side === 'bid')
    const askOrders = orders.filter((order) => order.side === 'ask')

    const lowestBid = bidOrders.length
      ? Math.min(...bidOrders.map((order) => order.price))
      : undefined
    const highestAsk = askOrders.length
      ? Math.max(...askOrders.map((order) => order.price))
      : undefined
    const midpointPrice =
      !lowestBid || !highestAsk
        ? referencePrice
        : Math.floor((lowestBid + highestAsk) / 2) || referencePrice

    return midpointPrice
  }, [orders])

  const addOrder = (order: Order) => {
    setOrders((prev) => [
      ...prev,
      { side: order.side, price: +order.price, quantity: +order.quantity },
    ])
  }

  const filteredPrices = useMemo(() => {
    const allPrices = [...Array(priceRange * 2 + 1)].map(
      (_, index) => referencePrice + priceRange - index,
    )
    return showAllLevels
      ? allPrices
      : allPrices.filter(
          (price) =>
            orders.some((order) => order.price === price) ||
            price === midpointPrice,
        )
  }, [showAllLevels, orders, midpointPrice])

  useEffect(() => {
    if (listRef.current) {
      const midpointIndex = filteredPrices.indexOf(midpointPrice)
      if (midpointIndex >= 0) {
        listRef.current.scrollToItem(midpointIndex, 'center')
      }
    }
  }, [filteredPrices, midpointPrice])

  const renderPriceLevel: React.FC<{ index: number; style: any }> = ({
    index,
    style,
  }) => {
    const price = filteredPrices[index]
    const bidVolume = orders
      .filter((order) => order.side === 'bid' && order.price === price)
      .reduce((acc, cur) => acc + cur.quantity, 0)
    const askVolume = orders
      .filter((order) => order.side === 'ask' && order.price === price)
      .reduce((acc, cur) => acc + cur.quantity, 0)

    return (
      <div
        style={style}
        className={twMerge(
          'price-level grid grid-cols-12 border-b border-gray-500/50',
          price === midpointPrice ? 'z-10 border-y border-yellow-500' : '',
        )}
        key={price}
      >
        <div
          className={twMerge(
            'flex items-end justify-start bg-green-700 px-1',
            price === midpointPrice ? 'h-[31px]' : 'h-8',
          )}
        >
          {bidVolume > 0 ? bidVolume : ''}
        </div>
        <div
          className={twMerge(
            'col-span-10 h-8 text-center leading-8 tracking-[10px]',
            price === midpointPrice ? 'text-yellow-500' : 'text-gray-400',
          )}
        >
          {price}
        </div>
        <div
          className={twMerge(
            'flex items-start justify-end bg-red-700 px-1',
            price === midpointPrice ? 'h-[31px]' : 'h-8',
          )}
        >
          {askVolume > 0 ? askVolume : ''}
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <button
        className='ml-auto flex items-center gap-1'
        onClick={() => setShowAllLevels((prev) => !prev)}
      >
        <div className='size-5 bg-white'>
          {!showAllLevels && (
            <Icon
              icon='material-symbols:check'
              className='text-xl text-black'
            />
          )}
        </div>
        <span>Hide Empty Levels</span>
      </button>
      <div className='border border-white'>
        <List
          ref={listRef}
          height={540}
          itemCount={filteredPrices.length}
          itemSize={33}
          width={'100%'}
        >
          {renderPriceLevel}
        </List>
      </div>
      <OrderForm onSubmit={addOrder} />
    </div>
  )
}

export default PriceLadder
