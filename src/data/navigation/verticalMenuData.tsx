// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Home',
    href: '/home',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'Vendor',
    icon: 'ri-store-2-line',
    children: [
      {
        label: 'Update Vendor',
        href: '/vendor/update'
      }
    ]
  },
  {
    label: 'Master Data',
    icon: 'ri-database-2-line',
    children: [
      {
        label: 'Countries',
        href: '/master/countries'
      },
      {
        label: 'Products',
        href: '/master/products'
      }
    ]
  },
  {
    label: 'About',
    href: '/about',
    icon: 'ri-information-line'
  }
]

export default verticalMenuData
