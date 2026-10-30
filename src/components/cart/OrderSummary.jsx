import { formatPrice } from '../../utils/formatPrice'

export const OrderSummary = ({ games, total }) => (
  <aside className="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <h2 className="text-lg font-bold text-white mb-4">Resumen del pedido</h2>
    <ul className="space-y-2 text-sm mb-4">
      {games.map((g) => (
        <li key={g.id} className="flex justify-between gap-2 text-slate-300">
          <span className="truncate">{g.title}</span>
          <span>{formatPrice(g.price)}</span>
        </li>
      ))}
    </ul>
    <div className="border-t border-slate-800 pt-3 flex justify-between text-sm text-slate-400">
      <span>Subtotal ({games.length} {games.length === 1 ? 'juego' : 'juegos'})</span>
      <span>${total.toFixed(2)}</span>
    </div>
    <div className="flex justify-between text-xl font-extrabold text-white mt-2">
      <span>Total</span>
      <span className="text-cyan-400">${total.toFixed(2)}</span>
    </div>
  </aside>
)
