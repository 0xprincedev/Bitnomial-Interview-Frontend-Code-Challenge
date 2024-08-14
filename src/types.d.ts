export interface Order {
  side: 'bid' | 'ask'
  price: number
  quantity: number
}
