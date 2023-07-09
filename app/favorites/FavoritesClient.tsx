"use client"

import { SafeListing, SafeUser } from "../types"

interface FavoritesClientProps {
    listings:SafeListing[];
    currentUser?: SafeUser | null;
}
const FavoritesClient = ({}:FavoritesClientProps) => {
  return (
    <div>FavoritesClient</div>
  )
}

export default FavoritesClient