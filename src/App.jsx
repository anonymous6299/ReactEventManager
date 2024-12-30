import { useState } from "react"
import Calendar from "../components/Calendar"
import AllEvents from "../components/AllEvents";
function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div className="flex bg-gray-950 justify-between">
      <Calendar
      />
      <AllEvents/>
    </div>
  )
}

export default App
