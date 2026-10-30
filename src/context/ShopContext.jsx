/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import gamesData from '../data/games.json'

const ShopContext = createContext(null)

const CART_KEY = 'steamlite_cart'
const LIBRARY_KEY = 'steamlite_library'

// Lee un arreglo de ids desde localStorage de forma segura
const readStorage = (key) => {
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const ShopProvider = ({ children }) => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState(() => readStorage(CART_KEY)) // ids de juegos
  const [library, setLibrary] = useState(() => readStorage(LIBRARY_KEY)) // ids adquiridos

  // Carga inicial del catálogo (simula una petición al servidor)
  useEffect(() => {
    const timer = setTimeout(() => {
      setGames(gamesData)
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library))
  }, [library])

  const isOwned = useCallback((id) => library.includes(id), [library])
  const isInCart = useCallback((id) => cart.includes(id), [cart])

  const addToCart = (id) => {
    if (library.includes(id)) return
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const removeFromCart = (id) => setCart((prev) => prev.filter((g) => g !== id))

  // Juegos gratuitos: pasan directo a la biblioteca
  const claimFreeGame = (id) => {
    setLibrary((prev) => (prev.includes(id) ? prev : [...prev, id]))
    setCart((prev) => prev.filter((g) => g !== id))
  }

  // Simula una compra exitosa: el carrito pasa a la biblioteca
  const purchaseCart = () => {
    const bought = cart
      .map((id) => games.find((g) => g.id === id))
      .filter(Boolean)
    setLibrary((prev) => [...new Set([...prev, ...cart])])
    setCart([])
    return bought
  }

  const cartGames = useMemo(
    () => cart.map((id) => games.find((g) => g.id === id)).filter(Boolean),
    [cart, games],
  )
  const libraryGames = useMemo(
    () => library.map((id) => games.find((g) => g.id === id)).filter(Boolean),
    [library, games],
  )
  const cartTotal = useMemo(
    () => cartGames.reduce((sum, g) => sum + g.price, 0),
    [cartGames],
  )

  const value = {
    games,
    loading,
    cart,
    cartGames,
    cartTotal,
    library,
    libraryGames,
    isOwned,
    isInCart,
    addToCart,
    removeFromCart,
    claimFreeGame,
    purchaseCart,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShop = () => {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop debe usarse dentro de <ShopProvider>')
  return ctx
}
