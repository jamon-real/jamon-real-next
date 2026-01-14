import { error } from "console"


const SANITY_PROJECT_ID = "9utgjin4"
const SANITY_DATASET = "production"
const SANITY_API_VERSION = "2026-01-11"

async function fetchFromSanity<T = any>(query: string): Promise<T[]> {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`
  const response = await fetch(url, { next: { revalidate: 3600 } })
  if (!response.ok) {
    console.error("Failed to fetch from Sanity", response.statusText)
    return []
  }
  const data = await response.json()
  return data.result || []
}

export interface Category {
  _id: string
  name: string
  description?: string
}

export interface Product {
  _id: string
  name: string
  description?: string
  allergens?: Array<{
    _id: string
    name: string
    name_en: string
  }>
  category: {
    _id: string
    name: string
    description?: string
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
    name,
    description,
    allergens[]->{
      _id,
      name,
    },
    category->{
      _id,
      name,
      description,
    },
    image{
      asset->{
        url
      },
      alt
    }
  }`
  return fetchFromSanity<Product>(query)
}


export async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "category"]|order(orderRank asc){
    _id,
    name,
    description
  }`
  return fetchFromSanity<Category>(query)
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
  return fetchFromSanity<GalleryImage>(query)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const query = `*[_type == "product" && featured == true]{
    _id,
    name,
    description,
    allergens[]->{
      _id,
      name
    },
    category->{
      _id,
      name
    },
    image{
      asset->{
        url
      },
      alt
    },
    featured
  }`
  return fetchFromSanity<Product>(query)
}