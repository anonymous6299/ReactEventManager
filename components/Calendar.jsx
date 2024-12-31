import { useEffect, useState } from 'react';

const Calendar = (props) => {
  // State for finding first day of the current month, today's date, and the current year
  const [FirstDay, setFirstDay] = useState(0);
  const [TodayDate, setTodayDate] = useState(0);
  const [CurrentYear, setCurrentYear] = useState(0);

  useEffect(() => {
    // Setting initial values during 1st render
    const today = new Date();
    setTodayDate(today.getDate());
    setCurrentYear(today.getFullYear());
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const dayOfWeek = firstDay.getDay();
    setFirstDay(dayOfWeek);
  }, []);

  // Months and days for display
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // calculates the days of a given month
  const getDaysArray = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  };

  // Initial setup for the current date
  const currentDate = new Date();
  const [CurrentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [DaysArray, setDaysArray] = useState(getDaysArray(currentDate.getFullYear(), currentDate.getMonth()));

  // Navigates to the next month
  const next = () => {
    const nextMonth = CurrentMonth + 1;
    const newYear = nextMonth > 11 ? CurrentYear + 1 : CurrentYear; // boundary condition
    const newMonth = nextMonth > 11 ? 0 : nextMonth; //  change if exceeds 11, array is of 11 size
    const firstDay = new Date(newYear, newMonth, 1);
    const dayOfWeek = firstDay.getDay(); // get day of first day

    // Update state
    setFirstDay(dayOfWeek);
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setDaysArray(getDaysArray(newYear, newMonth));

    // change the date flag for display
    const todaydate = new Date();
    if (newMonth !== todaydate.getMonth()) {
      setTodayDate(0);
    } else {
      setTodayDate(todaydate.getDate());
    }
  };

  // Navigates to the previous month
  const prev = () => {
    const prevMonth = CurrentMonth - 1;
    const newYear = prevMonth < 0 ? CurrentYear - 1 : CurrentYear; // boundary condition 
    const newMonth = prevMonth < 0 ? 11 : prevMonth; //  change if recedes 0
    const firstDay = new Date(newYear, newMonth, 1);
    const dayOfWeek = firstDay.getDay(); // get day of first day

    // Update state
    setFirstDay(dayOfWeek);
    setCurrentYear(newYear);
    setCurrentMonth(newMonth);
    setDaysArray(getDaysArray(newYear, newMonth));

    // change the date flag for display
    const todaydate = new Date();
    if (newMonth !== todaydate.getMonth()) {
      setTodayDate(0);
    } else {
      setTodayDate(todaydate.getDate());
    }
  };

  return (
    <div className='pt-20 w-2/5 flex items-center justify-center border border-l-0 border-t-0 border-b-0 border-gray-800 flex-col space-y-10'>
      {/* navigation */}
      <div className="flex justify-between w-full px-10">
        <button onClick={prev} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="flex space-x-2">
          <p className='text-white' id='monthname'>{months[CurrentMonth]}</p>
          <div className="text-white">{CurrentYear}</div>
        </div>
        <button onClick={next} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* days */}
      <div className="days flex text-gray-100 justify-between w-full px-14">
        {days.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
      <hr className='border border-gray-800 w-[33rem]' />

      {/* dates, done by grid utility class */}
      <div className='text-gray-50 w-fit grid grid-cols-7 gap-x-4 gap-y-4 grid-rows-7 h-full'>
        {DaysArray.map((day) => {
          const adjustedDay = FirstDay === 0 ? 7 : FirstDay; // Adjust Sunday to column 7
          return (
            <button
              className={`hover:bg-gray-800 w-16 h-16 rounded-md text-lg focus:bg-gray-100 ${day !== TodayDate ? "focus:text-gray-900" : ""}`}
              key={day}
              style={{
                gridColumnStart: day === 1 ? adjustedDay : "auto",
                border: TodayDate !== 0 && day === TodayDate ? "1px solid #f3f4f6" : "",
                background: TodayDate !== 0 && day === TodayDate ? "#1f2937" : ""
              }}
              onClick={() => {
                props.setDate(day); // for updating date to add in event
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
