// Sanity client configuration and data fetching utilities
// Currently using mock data for static export compatibility
// To enable live Sanity data: remove 'output: export' from next.config.mjs
// and uncomment the fetch logic in getProducts() and getCategories()

import { error } from "console"

const SANITY_PROJECT_ID = "9utgjin4"
const SANITY_DATASET = "production"
const SANITY_API_VERSION = "2026-01-11"

export interface Category {
  _id: string
  name_es: string
  name_en: string
  description_es?: string
  description_en?: string
}

export interface Product {
  _id: string
  name_es: string
  name_en: string
  description_es?: string
  description_en?: string
  allergens?: Array<{
    _id: string
    name_es: string
    name_en: string
  }>
  category: {
    _id: string
    name_es: string
    name_en: string
    description_es?: string
    description_en?: string
  }
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

export interface GalleryImage {
  _id: string
  title: string
  image: {
    asset: {
      url: string
    }
  }
  alt?: string
}


export async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
    _id,
    name_es,
    name_en,
    description_es,
    description_en,
    allergens[]->{
      _id,
      name_es,
      name_en
    },
    category->{
      _id,
      name_es,
      name_en,
      description_es,
      description_en
    },
    image{
      asset->{
        url
      },
      alt
    }
  }`
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`
  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to fetch products")
  const data = await response.json()
  console.log("Fetched products from Sanity:", data)
  return data.result || []
}


export async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "category"]|order(orderRank asc){
    _id,
    name_es,
    name_en,
    description_es,
    description_en
  }`
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`
  const response = await fetch(url)
  if (!response.ok) {
    console.error("Failed to fetch categories", response.statusText)
    return []
  }
  const data = await response.json()
  console.log("Fetched categories from Sanity:", data)
  return data.result || []
}


export async function getGalleryImages(): Promise<GalleryImage[]> {
  const query = `*[_type == "galleryImage"]{
    _id,
    title,
    alt,
    image{
      asset->{
        url
      }
    }
  }`
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`
  const response = await fetch(url)
  if (!response.ok) {
    console.error("Failed to fetch gallery images", error)
    return []
  }
  const data = await response.json()
  return data.result || []
}
