// Restaurant information
export interface RestaurantInfo {
  name: string
  address: string
  phone: string
  email: string
  mapEmbedUrl: string
}

export function getRestaurantInfo(): RestaurantInfo {
  const address = "C/ Pastor y Landero, 22, 41001 Sevilla"
  const encodedAddress = encodeURIComponent(address)

  return {
    name: "Mesón Jamón Real",
    address: address,
    phone: "+34954563998",
    email: "jamonreal@jamonreal.com",
    mapEmbedUrl: `https://www.google.com/maps/embed/v1/place?key=&q=${encodedAddress}`,
  }
}

// Opening hours data
export interface OpeningHours {
  isOpen: boolean
  weekdayText: string[]
  weekdayTextEn: string[]
}

export async function getOpeningHours(): Promise<OpeningHours> {
  const now = new Date()
  const day = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours()

  // Schedule: Closed Mondays, Open Tue-Sun 13:00-16:00 and 20:00-23:30
  let isOpen = false

  if (day !== 1) {
    isOpen = (hour >= 13 && hour < 16) || (hour >= 20 && hour < 24)
  }

  return {
    isOpen,
    weekdayText: [
      "Lunes: Cerrado",
      "Martes: 13:00–16:00, 20:00–23:30",
      "Miércoles: 13:00–16:00, 20:00–23:30",
      "Jueves: 13:00–16:00, 20:00–23:30",
      "Viernes: 13:00–16:00, 20:00–23:30",
      "Sábado: 13:00–16:00, 20:00–23:30",
      "Domingo: 13:00–16:00, 20:00–23:30",
    ],
    weekdayTextEn: [
      "Monday: Closed",
      "Tuesday: 1:00 PM–4:00 PM, 8:00 PM–11:30 PM",
      "Wednesday: 1:00 PM–4:00 PM, 8:00 PM–11:30 PM",
      "Thursday: 1:00 PM–4:00 PM, 8:00 PM–11:30 PM",
      "Friday: 1:00 PM–4:00 PM, 8:00 PM–11:30 PM",
      "Saturday: 1:00 PM–4:00 PM, 8:00 PM–11:30 PM",
      "Sunday: 1:00 PM–4:00 PM, 8:00 PM–11:30 PM",
    ],
  }
}
