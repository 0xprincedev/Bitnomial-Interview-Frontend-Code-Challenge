import { useForm } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'
import { priceRange, referencePrice } from '@/constant'
import { Order } from '@/types'

interface OrderFormProps {
  onSubmit: React.Dispatch<Order>
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Order>({
    defaultValues: { side: 'bid', price: referencePrice, quantity: 1 },
  })

  useHotkeys('ctrl+b', () => setValue('side', 'bid'))
  useHotkeys('ctrl+a', () => setValue('side', 'ask'))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-fit space-y-4'>
      <div className='input-form'>
        <label htmlFor='side'>Side</label>
        <select id='side' {...register('side')}>
          <option value='bid'>Bid</option>
          <option value='ask'>Ask</option>
        </select>
      </div>
      <div>
        <div className='input-form'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            id='price'
            {...register('price', {
              validate: (value) =>
                +value >= referencePrice - priceRange &&
                +value <= referencePrice + priceRange,
            })}
          />
        </div>
        {errors.price && (
          <p className='pl-[88px] pt-0.5 text-[10px] text-red-500'>
            The price must be between {referencePrice - priceRange} and{' '}
            {referencePrice + priceRange}
          </p>
        )}
      </div>
      <div>
        <div className='input-form'>
          <label htmlFor='quantity'>Quantity</label>
          <input
            type='number'
            id='quantity'
            {...register('quantity', { validate: (value) => +value >= 1 })}
          />
        </div>
        {errors.quantity && (
          <p className='pl-[88px] pt-0.5 text-[10px] text-red-500'>
            The quantity must be at least 1
          </p>
        )}
      </div>
      <button
        type='submit'
        className='w-full rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-400 active:bg-blue-500'
      >
        Submit Order
      </button>
    </form>
  )
}

export default OrderForm
