import { useForm } from 'react-hook-form'
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
  } = useForm<Order>({
    defaultValues: { side: 'bid', price: referencePrice, quantity: 1 },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto w-fit space-y-4'>
      <div className='input-form'>
        <label>Side</label>
        <select {...register('side')}>
          <option value='bid'>Bid</option>
          <option value='ask'>Ask</option>
        </select>
      </div>
      <div>
        <div className='input-form'>
          <label>Price</label>
          <input
            type='number'
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
          <label>Quantity</label>
          <input
            type='number'
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
