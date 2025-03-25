import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isBefore, isSameDay } from "date-fns";
import { RxCaretRight } from 'react-icons/rx';

const timeSlots = {
  Morning: ["07:00", "07:30", "08:00", "08:30"],
  Noon: ["09:00", "09:30", "10:00", "10:30"],
  Evening: ["11:00", "11:30"],
  Night: []
};

const MonthYearDropdown = () => {
  const generateMonths = () => {
    let months = [];
    let startDate = new Date(2025, 2);
    let endDate = new Date(2026, 2);
    while (startDate <= endDate) {
      months.push(format(startDate, "MMMM yyyy"));
      startDate.setMonth(startDate.getMonth() + 1);
    }
    return months;
  };

  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "MMMM yyyy"));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const months = generateMonths();
  const today = new Date();

  useEffect(() => {
    const randomPeriod = Object.keys(timeSlots).find(period => timeSlots[period].length > 0);
    if (randomPeriod) {
      const randomSlot = timeSlots[randomPeriod][Math.floor(Math.random() * timeSlots[randomPeriod].length)];
      setSelectedTimeSlot({ period: randomPeriod, time: randomSlot });
    }
  }, []);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
    const [monthName, year] = event.target.value.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    setSelectedDate(new Date(year, monthIndex, 1));
    setSelectedTimeSlot(null);
  };

  const handleDateClick = (day) => {
    if (!isBefore(day, today) || isSameDay(day, today)) {
      setSelectedDate(new Date(day));
      setSelectedTimeSlot(null);
    }
  };

  const renderCalendar = () => {
    const [monthName, year] = selectedMonth.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    const start = startOfMonth(new Date(year, monthIndex));
    const end = endOfMonth(start);
    const days = eachDayOfInterval({ start, end });
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const offset = getDay(start) === 0 ? 6 : getDay(start) - 1;

    return (
      <div className="grid grid-cols-7 gap-2 mt-4 text-center w-[28rem]">
        {weekDays.map((day) => (
          <div key={day} className="text-[16px] leading-[22px] text-textColor5 uppercase font-semibold">{day}</div>
        ))}
        {Array(offset).fill(null).map((_, index) => (
          <div key={`empty-${index}`}></div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`text-[24px] leading-[22px] flex items-center justify-center cursor-pointer h-[54px] w-[54px] rounded-full 
              ${isBefore(day, today) && !isSameDay(day, today) ? 'text-textColor7 cursor-not-allowed' :
              selectedDate && format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") ? 'bg-bg3 text-secondary2 hover:bg-secondary2 hover:text-white' :
                'hover:bg-secondary2 hover:text-white'}`}
            onClick={() => (!isBefore(day, today) || isSameDay(day, today)) && handleDateClick(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-full">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-6">
          <select
            className="p-2 border border-none w-[180px] text-[17px] font-medium text-textColor6"
            value={selectedMonth}
            onChange={handleChange}
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          {renderCalendar()}
        </div>
        {selectedDate && (
          <div className="col-span-6 pt-13.5">
            {Object.entries(timeSlots).map(([period, slots]) => (
              <div key={period} className="mb-2 flex items-center justify-start cursor-pointer gap-[30px]">
                <div className={`p-[14px] text-[16px] flex items-center justify-between w-[214px] border rounded-[12px] 
                  ${selectedTimeSlot?.period === period ? 'bg-secondary2 text-white' : ''}`}
                     onClick={() => setSelectedTimeSlot({ period, time: null })}
                >
                  {period} <RxCaretRight className="text-[30px]"/>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {slots.map((slot) => (
                    <div
                      key={slot}
                      className={`p-[14px] text-[16px] flex items-center justify-center w-[104px] border rounded-[12px] cursor-pointer 
                        ${selectedTimeSlot?.time === slot ? 'bg-secondary2 text-white' : ''}`}
                      onClick={() => setSelectedTimeSlot({ period, time: slot })}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingCalender = () => {
  return (
    <div className="mt-9">
      <h2 className="text-[24px] font-semibold text-textColor4">Select Timeslot</h2>
      <MonthYearDropdown />
    </div>
  );
};

export default BookingCalender;
