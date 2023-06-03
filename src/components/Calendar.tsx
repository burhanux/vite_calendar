
import useCalendar from "../hooks/useCalendar";
import { DAYS } from "../utils/consts";

const Calendar = () => {
    const { calendarCollection, selectedDate, setSelectedDate, setCalendarPreviousMonth, setCalendarNextMonth } = useCalendar("");
    if (!calendarCollection || !calendarCollection.length) return <></>
    if (!selectedDate || !selectedDate.date) return <></>
    return (<div className="relative">
        {/* <div className="w-96 h-96 lg:w-96 lg:h-auto bg-white rounded shadow-lg z-50 relative flex flex-col gap-2"> */}
        <div className="w-96 h-auto lg:w-96 bg-white rounded shadow-lg z-50 relative flex flex-col gap-2">
            {/* Header */}
            <div className="w-full h-1/6 shadow-lg">
                {/* Selected Date */}
                <div className="flex h-full min-h-[64px] px-4 items-center justify-between">
                    <div className="flex gap-2 font-bold text-xl">
                        <div>{selectedDate.date.toLocaleString('default', { weekday: 'long' })}</div>
                        <div>{selectedDate.date.toLocaleString('default', { day: 'numeric' })}</div>
                    </div>
                    {/* Month Year */}
                    <div className="flex gap-2 text-sm">
                        <div className={`cursor-pointer`} onClick={setCalendarPreviousMonth} >&#10094;</div>
                        <div className="flex gap-2 min-w-[120px] justify-center">
                            <div>{calendarCollection[1][0].date.toLocaleString('default', { month: 'long' })}</div>
                            <div>{calendarCollection[1][0].date.toLocaleString('default', { year: 'numeric' })}</div>
                        </div>
                        <div className={`cursor-pointer`} onClick={setCalendarNextMonth}>&#10095;</div>
                    </div>
                </div>
            </div>
            {/* Dates */}
            <div className="w-full mt-2 flex justify-evenly text-xs text-zinc-400">{DAYS.map(day => <div className="w-12 flex justify-center">{day}</div>)}</div>
            {calendarCollection && calendarCollection.length && <DisplayCalendar
                calendarCollection={calendarCollection}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setCalendarPreviousMonth={setCalendarPreviousMonth}
                setCalendarNextMonth={setCalendarNextMonth}
            />
            }
        </div>
        <div className="w-80 h-80 lg:w-96 lg:h-auto bg-white rounded shadow-lg z-40 absolute top-2 scale-98"></div>
        <div className="w-80 h-80 lg:w-96 lg:h-auto bg-white rounded shadow-lg z-30 absolute top-4 scale-96"></div>
    </div>)
}

export default Calendar;

const DisplayCalendar = (props: any) => {
    const { calendarCollection, selectedDate, setSelectedDate, setCalendarPreviousMonth, setCalendarNextMonth } = props;
    const display = () => {
        let filled = 0;
        const dates = calendarCollection[1].map((obj: { date: Date }, index: number) => {
            const style = selectedDate.date.getDate() === obj.date.getDate() ? { display: "flex", justifyContent: "center", alignItems: "center", width: "20px", height: "20px", border: "none", borderRadius: "50%", backgroundColor: "#1c4ed8", color: "white", fontWeight: "bold" } : { color: "black" }
            if (index === 0) {
                const arr = [];
                for (let k = 0; k < DAYS.length; k++) {
                    filled++;
                    const day = DAYS[k]
                    if (day === obj.date.toLocaleString('default', { weekday: 'short' }).toUpperCase()) {
                        arr.push(<div onClick={() => setSelectedDate(obj)} key={Math.random()} className="w-full h-14 p-1 flex justify-center border border-b-0 border-l-0 border-r-0 ">
                            <div className="text-[10px]" style={style}>{obj.date.getDate()}</div>
                        </div>)
                        break;
                    }
                    const prevMonthLength = calendarCollection[0].length
                    arr.push(<div key={Math.random()} className="w-full h-14 p-1 flex justify-center border border-b-0 border-l-0 border-r-0 ">
                        <div className="text-[10px] opacity-30" style={style}>{calendarCollection[0][prevMonthLength - 1 - (k)].date.getDate()}</div>
                    </div>)

                }
                return arr;
            }
            filled++
            return (<div onClick={() => setSelectedDate(obj)} key={Math.random()} className="w-full h-14 p-1 flex justify-center border border-b-0 border-l-0 border-r-0 ">
                <div className="text-[10px]" style={style}>{obj.date.getDate()}</div>
            </div>)
        })
        console.log("DEBUG filled", filled)

        if (calendarCollection[2] && 35 - filled !== 0) {
            calendarCollection[2].forEach((obj: { date: Date }, index: number) => {
                if ((filled) >= 35) return
                const style = selectedDate.date.getDate() === obj.date.getDate() ? { display: "flex", justifyContent: "center", alignItems: "center", width: "20px", height: "20px", border: "none", borderRadius: "50%", backgroundColor: "#1c4ed8", color: "white", fontWeight: "bold" } : { color: "black" }
                ++filled
                dates.push(<div key={Math.random()} className="w-full h-14 p-1 flex justify-center border border-b-0 border-l-0 border-r-0 ">
                    <div className="text-[10px] opacity-30" style={style}>{obj.date.getDate()}</div>
                </div>)
                return;
            })
        }
        console.log("DEBUG LOOP DATES", dates)
        return dates;
    }

    return (
        <div className="w-full grid grid-cols-7 text-sm text-zinc-400 ">{calendarCollection && calendarCollection.length && display()}</div>
    )
}