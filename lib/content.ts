import { access, readFile } from "node:fs/promises"
import path from "node:path"

export interface Category {
  _id: string
  name: string
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
  }
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
  featured?: boolean
}

export interface GalleryImage {
  _id: string
  title: string
  description?: string
  image: {
    asset: {
      url: string
    }
  }
  alt?: string
}

type CsvRecord = Record<string, string>

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function toBoolean(value: string | undefined): boolean {
  if (!value) return false

  const trimmed = value.trim()
  if (!trimmed) return false

  return trimmed.toUpperCase() === "TRUE"
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]

    if (char === '"') {
      const nextChar = line[i + 1]
      if (inQuotes && nextChar === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim())
      current = ""
      continue
    }

    current += char
  }

  cells.push(current.trim())
  return cells
}

async function parseCsvFromPublic(fileRelativePath: string): Promise<CsvRecord[]> {
  const filePath = path.join(process.cwd(), "public", fileRelativePath)

  try {
    const content = await readFile(filePath, "utf8")
    const lines = content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    if (lines.length <= 1) return []

    const headers = parseCsvLine(lines[0])

    return lines.slice(1).map((line) => {
      const values = parseCsvLine(line)
      const row: CsvRecord = {}

      headers.forEach((header, index) => {
        row[header] = (values[index] ?? "").trim()
      })

      return row
    })
  } catch (error) {
    console.error(`Failed to read CSV file: ${fileRelativePath}`, error)
    return []
  }
}

function imageUrlFromFile(imageFile: string): string {
  const cleanFileName = imageFile.replace(/^\/+/, "")
  if (!cleanFileName) return ""

  return `/img/${cleanFileName}`
}

async function imageFileExists(imageFile: string): Promise<boolean> {
  const cleanFileName = imageFile.replace(/^\/+/, "")
  if (!cleanFileName) return false

  const imagePath = cleanFileName.includes("/")
    ? path.join(process.cwd(), "public", cleanFileName)
    : path.join(process.cwd(), "public", "img", cleanFileName)

  try {
    await access(imagePath)
    return true
  } catch {
    return false
  }
}

function parseAllergens(allergensCell: string): Array<{ _id: string; name: string; name_en: string }> {
  if (!allergensCell) return []

  return allergensCell
    .split("+")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((name) => ({
      _id: `allergen-${slugify(name)}`,
      name,
      name_en: name,
    }))
}

export async function getProducts(): Promise<Product[]> {
  const rows = await parseCsvFromPublic("csv/menu - export.csv")
  const activeRows = rows.filter((row) => toBoolean(row.is_active))
  const products: Product[] = []

  for (const [index, row] of activeRows.entries()) {
    const categoryName = row.category || "Sin categoría"
    const categoryId = `category-${slugify(categoryName) || index}`
    const imageFile = row.image_file || ""
    const hasImage = await imageFileExists(imageFile)

    const product: Product = {
      _id: `product-${index + 1}`,
      name: row.name || "",
      description: row.description || undefined,
      allergens: parseAllergens(row.allergens || ""),
      category: {
        _id: categoryId,
        name: categoryName,
      },
      image: hasImage
        ? {
            asset: {
              url: imageUrlFromFile(imageFile),
            },
            alt: row.name || undefined,
          }
        : undefined,
      featured: toBoolean(row.is_featured),
    }

    if (product.name.length > 0) {
      products.push(product)
    }
  }

  return products
}

export async function getCategories(): Promise<Category[]> {
  const products = await getProducts()
  const seen = new Set<string>()
  const categories: Category[] = []

  for (const product of products) {
    if (seen.has(product.category._id)) continue
    seen.add(product.category._id)
    categories.push({
      _id: product.category._id,
      name: product.category.name,
    })
  }

  return categories
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((product) => product.featured)
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const rows = await parseCsvFromPublic("csv/gallery.csv")
  const activeRows = rows.filter((row) => toBoolean(row.is_active))
  const images: GalleryImage[] = []

  for (const [index, row] of activeRows.entries()) {
    const title = row.title || `Gallery image ${index + 1}`
    const imageFile = row.image_file || ""
    const hasImage = await imageFileExists(imageFile)

    images.push({
      _id: `gallery-${index + 1}`,
      title,
      description: row.description || undefined,
      image: {
        asset: {
          url: hasImage ? imageUrlFromFile(imageFile) : "/placeholder.svg",
        },
      },
      alt: title,
    })
  }

  return images
}
