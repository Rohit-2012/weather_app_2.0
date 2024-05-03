import { useSelector } from "react-redux"
import { getWeatherData } from "../features/weatherSlice"

const DateAndTime = () => {
  const weather = useSelector(getWeatherData)
  const { dateToday } = weather
  return (
    <section className="mt-2 text-center sm:text-left">
      {dateToday ? <p className="text-sm sm:text-xl font-extralight">{dateToday}</p> : <p className="text-sm sm:text-xl font-extralight">{new Date(Date.now()).toDateString()}</p>}
    </section>
  )
}

export default DateAndTime
