import React, { useEffect, useState } from 'react';

const Calendar = (props) => {
  const [FirstDay, setFirstDay] = useState(0);
  const [TodayDate, setTodayDate] = useState(0);
  useEffect(() => {
    const today = new Date();
    setTodayDate(today.getDate());
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const dayOfWeek = firstDay.getDay();
    setFirstDay(dayOfWeek);
  }, [])

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Function to get days of a month
  const getDaysArray = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  };

  const currentDate = new Date();
  const [CurrentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [DaysArray, setDaysArray] = useState(getDaysArray(currentDate.getFullYear(), currentDate.getMonth()));


  // Handle next month
  const next = () => {
    const nextMonth = CurrentMonth + 1;
    const newYear = nextMonth > 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    const newMonth = nextMonth > 11 ? 0 : nextMonth;
    const firstDay = new Date(newYear, newMonth, 1);
    const dayOfWeek = firstDay.getDay();

    setFirstDay(dayOfWeek);
    setCurrentMonth(newMonth);
    setDaysArray(getDaysArray(newYear, newMonth));
    const todaydate = new Date();
    if (newMonth!==todaydate.getMonth()) {
      setTodayDate(0);
    }
    else{
      setTodayDate(todaydate.getDate())
    }
  };

  // Handle previous month
  const prev = () => {
    const prevMonth = CurrentMonth - 1;
    const newYear = prevMonth < 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    const newMonth = prevMonth < 0 ? 11 : prevMonth;
    const firstDay = new Date(newYear, newMonth, 1);
    const dayOfWeek = firstDay.getDay();

    setFirstDay(dayOfWeek);
    setCurrentMonth(newMonth);
    setDaysArray(getDaysArray(newYear, newMonth));
    const todaydate = new Date();
    if (newMonth!==todaydate.getMonth()) {
      setTodayDate(0);
    }
    else{
      setTodayDate(todaydate.getDate())
    }
  };

  return (
    <div className='pt-20 w-2/5 flex items-center justify-center border border-l-0 border-t-0 border-b-0 border-gray-800 flex-col space-y-10'>
      <div className="flex justify-between w-full px-10">
        <button onClick={prev} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <p className='text-white' id='monthname'>{months[CurrentMonth]}</p>
        <button onClick={next} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className="days flex text-gray-100 justify-between w-full px-14">
        {
          days.map((item, index) => {
            return <p key={index}>{item}</p>
          })
        }
      </div>
      <div className='text-gray-50 w-fit grid grid-cols-7 gap-x-4 gap-y-[30.5px] grid-rows-7 h-full'>
        {DaysArray.map((day) => {
          const adjustedDay = FirstDay === 0 ? 7 : FirstDay; // Adjust Sunday to 7
          return (
            <button
              className="hover:bg-gray-800 w-16 h-16 rounded-md text-lg focus:bg-gray-100 focus:text-gray-900"
              key={day}
              style={{gridColumnStart:day===1?adjustedDay:"auto", border:TodayDate!==0 && day===TodayDate?"1px solid #f3f4f6":"", background:TodayDate!==0 && day===TodayDate?"#1f2937":""}}
              onClick={()=>{
                props.setDate(day);
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
