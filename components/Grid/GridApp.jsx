import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { ProductCard } from './ProductCard'
import { blogs } from './_blogdata'
import { ProductGrid } from './ProductGrid'

export const GridApp = () => (
  <Box
    maxW="7xl"
    mx="auto"
    px={{
      base: '4',
      md: '8',
      lg: '12',
    }}
    py={{
      base: '6',
      md: '8',
      lg: '12',
    }}
  >
    <ProductGrid>
      {blogs.map((blog) => (
        <ProductCard key={blog.id} product={blog} />
      ))}
    </ProductGrid>
  </Box>
)
