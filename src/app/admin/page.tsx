export default function Dashboard() {
  return (
    <section className="w-full h-auto p-4  ">
      <div className="w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Panel administrativo</h1>
        <p className="text-muted-foreground mb-8 text-center">Bienvenido, aquí verás un resumen de la actividad del sitio.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta de publicaciones */}
          <div className=" rounded-xl shadow p-6 flex flex-col items-center border border-neutral-800">
            <span className="text-blue-500 text-4xl mb-2"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 6V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2m-6-4h11m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <h2 className="text-lg font-semibold mb-1">Publicaciones</h2>
            <p className="text-2xl font-bold mb-1">--</p>
            <span className="text-xs text-gray-500">Total de publicaciones</span>
          </div>
          {/* Tarjeta de usuarios */}
          <div className=" rounded-xl shadow p-6 flex flex-col items-center border border-neutral-800">
            <span className="text-green-500 text-4xl mb-2"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM21 19.5a7.5 7.5 0 0 0-15 0v.25A2.25 2.25 0 0 0 8.25 22h7.5A2.25 2.25 0 0 0 18 19.75v-.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <h2 className="text-lg font-semibold mb-1">Usuarios</h2>
            <p className="text-2xl font-bold mb-1">--</p>
            <span className="text-xs text-gray-500">Total de usuarios</span>
          </div>
          {/* Tarjeta de actividad */}
          <div className=" rounded-xl shadow p-6 flex flex-col items-center border border-neutral-800">
            <span className="text-yellow-500 text-4xl mb-2"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            <h2 className="text-lg font-semibold mb-1">Actividad</h2>
            <p className="text-2xl font-bold mb-1">--</p>
            <span className="text-xs text-gray-500">Última actualización</span>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center">
          <div className="w-full max-w-xl p-6 border-2 border-dashed border-neutral-800 rounded-lg  flex flex-col items-center">
            <span className="text-3xl mb-2">✨</span>
            <h3 className="text-lg font-semibold mb-1">¡Próximamente!</h3>
            <p className="text-sm text-gray-500 text-center">Aquí verás estadísticas y gráficos interactivos del sitio.</p>
          </div>
        </div>
      </div>
    </section>
  )
}