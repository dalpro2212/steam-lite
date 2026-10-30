import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, ShoppingCart } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { CartItem } from '../components/cart/CartItem'
import { OrderSummary } from '../components/cart/OrderSummary'
import { CheckoutForm } from '../components/cart/CheckoutForm'

const CartCheckout = () => {
  const { cartGames, cartTotal, removeFromCart, purchaseCart, loading } = useShop()
  const [purchased, setPurchased] = useState([])
  const navigate = useNavigate()

  const handleSuccess = () => setPurchased(purchaseCart())

  if (loading) return <p className="text-center text-slate-400 py-20">Cargando carrito...</p>

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-white mb-6 flex items-center gap-3">
        <ShoppingCart className="text-cyan-400" /> Tu carrito
      </h1>

      {cartGames.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-400 mb-4">Tu carrito está vacío.</p>
          <Link to="/" className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400">
            Explorar la tienda
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ul className="space-y-3">
              {cartGames.map((game) => (
                <CartItem key={game.id} game={game} onRemove={removeFromCart} />
              ))}
            </ul>
            <CheckoutForm total={cartTotal} onSuccess={handleSuccess} />
          </div>
          <div className="lg:sticky lg:top-24 h-fit">
            <OrderSummary games={cartGames} total={cartTotal} />
          </div>
        </div>
      )}

      {/* Modal de compra exitosa */}
      {purchased.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-8 max-w-md w-full text-center">
            <CheckCircle2 size={56} className="text-emerald-400 mx-auto mb-3" />
            <h2 className="text-2xl font-extrabold text-white mb-2">¡Compra exitosa!</h2>
            <p className="text-slate-400 mb-3">Ya puedes jugar a:</p>
            <ul className="text-cyan-400 font-semibold mb-6 space-y-1">
              {purchased.map((g) => (
                <li key={g.id}>{g.title}</li>
              ))}
            </ul>
            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate('/library')} className="px-5 py-2 rounded-lg bg-emerald-500 text-black font-bold hover:bg-emerald-400">
                Ir a mi biblioteca
              </button>
              <button onClick={() => navigate('/')} className="px-5 py-2 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-600">
                Seguir explorando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartCheckout
