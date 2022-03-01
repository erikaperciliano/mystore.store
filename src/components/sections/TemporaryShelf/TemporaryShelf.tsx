import React, { useEffect } from 'react'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import ProductShelfSkeleton from 'src/components/skeletons/ProductShelfSkeleton'

import ProductCard from '../../product/ProductCard'

import './temporary-shelf.scss'

interface ProductShelfProps {
  products: ProductSummary_ProductFragment[]
}

function TemporaryShelf({ products }: ProductShelfProps) {
  return (
    <>
      <h1 className="title-section / grid-content">Shelf Temporary</h1>
      <ProductShelfSkeleton loading={products.length === 0}>
        <ul data-product-shelf className="grid-content">
          {products.map((product, idx) => (
            <li key={`${product.id}`}>
              <ProductCard product={product} index={idx + 1} />
            </li>
          ))}
        </ul>
      </ProductShelfSkeleton>
    </>
  )
}

export default TemporaryShelf
