import { useEffect, useState } from "react"
import Calendar from "../components/Calendar"
import AllEvents from "../components/AllEvents";
function App() {
  useEffect(() => {
    if (!localStorage.getItem("AllEvents")) {
      localStorage.setItem("AllEvents",JSON.stringify([]));
    }
  }, [])
  
  const [date, setDate] = useState(new Date().getDate());
  return (
    <div className="flex bg-gray-950 justify-between">
      <Calendar
      setDate={setDate}
      />
      <AllEvents
      date={date}
      />
    </div>
  )
}

export default App
