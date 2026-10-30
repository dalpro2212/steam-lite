export const Footer = () => (
  <footer className="border-t border-slate-800 bg-slate-950 mt-10">
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
      <p>
        © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">SteamLite</span> · Proyecto integrador
      </p>
      <p>Hecho con React + Vite + Tailwind · Compras simuladas, no se realiza ningún cobro real</p>
    </div>
  </footer>
)
