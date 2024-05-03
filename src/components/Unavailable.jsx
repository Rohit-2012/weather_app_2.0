

const Unavailable = ({message = 'Weather Data Unavailable'}) => {
  return (
    <div className="w-full h-[60vh] my-4 flex flex-col items-center justify-center">
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-300 text-xl sm:text-4xl font-black text-center">{message}</h1>
      <p className="text-lg font-extralight text-center mt-8">Search for city name to get weather</p>
    </div>
  )
}

export default Unavailable
