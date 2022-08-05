import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { ProductCard } from './ProductCard'
import { ProductGrid } from './ProductGrid'
import { client } from "../../libs/client"

export const BlogList = ({blog}) => (
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
      {blog.map((blog) => (
        <ProductCard />
      ))}
    </ProductGrid>
  </Box>
)
