export interface ProductType {
    id: string
    name: string
    category: string
    stock: number
    price: number
    unit: string
    color: string
  }
  
  export const initialProducts: ProductType[] = [
    {
      id: '1',
      name: 'Organic Apples',
      category: 'Fruits',
      stock: 45,
      price: 1.99,
      unit: 'lb',
      color: '#e74c3c'
    },
    {
      id: '2',
      name: 'Fresh Carrots',
      category: 'Vegetables',
      stock: 30,
      price: 1.49,
      unit: 'bunch',
      color: '#e67e22'
    },
    {
      id: '3',
      name: 'Local Honey',
      category: 'Specialty',
      stock: 15,
      price: 8.99,
      unit: 'jar',
      color: '#f1c40f'
    },
    {
      id: '4',
      name: 'Organic Kale',
      category: 'Vegetables',
      stock: 25,
      price: 2.99,
      unit: 'bunch',
      color: '#2ecc71'
    },
    {
      id: '5',
      name: 'Fresh Eggs',
      category: 'Dairy',
      stock: 40,
      price: 5.99,
      unit: 'dozen',
      color: '#f5f5dc'
    },
    {
      id: '6',
      name: 'Artisan Bread',
      category: 'Bakery',
      stock: 20,
      price: 4.99,
      unit: 'loaf',
      color: '#d35400'
    },
    {
      id: '7',
      name: 'Tomatoes',
      category: 'Vegetables',
      stock: 35,
      price: 2.49,
      unit: 'lb',
      color: '#c0392b'
    },
    {
      id: '8',
      name: 'Blueberries',
      category: 'Fruits',
      stock: 18,
      price: 4.99,
      unit: 'pint',
      color: '#3498db'
    },
    {
      id: '9',
      name: 'Goat Cheese',
      category: 'Dairy',
      stock: 12,
      price: 6.99,
      unit: 'oz',
      color: '#ecf0f1'
    },
    {
      id: '10',
      name: 'Maple Syrup',
      category: 'Specialty',
      stock: 8,
      price: 12.99,
      unit: 'bottle',
      color: '#95a5a6'
    }
  ]
  