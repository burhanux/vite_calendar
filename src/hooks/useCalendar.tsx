import { useEffect, useState } from "react"

const useCalendar = (props: any) => {
    const [calendarCollection, setCalendarCollection] = useState<any>([])
    const [selectedDate, setSelectedDate] = useState<any>({ date: new Date() })

    useEffect(() => {
        const pizza = [-1, 0, 1];
        const _calendarCollection = pizza.map(pie => {
            const date = new Date();
            // Set it to one month ago
            date.setMonth(date.getMonth() + pie);
            // Zero the time component
            date.setHours(0, 0, 0, 0);
            return generateMonth(date);
        }); // Date[[{},{}],[],[]]
        setCalendarCollection(_calendarCollection);
    }, [])


    const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

    const getStartOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1)

    const generateMonth = (date: Date) => {
        const dates = []
        const startOfMonth = getStartOfMonth(date);
        const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
        for (let i = 0; i < daysInMonth; i++) {
            const day = new Date(startOfMonth);
            day.setDate(day.getDate() + (i));
            dates.push({ date: day });
        }
        return dates;
    }

    const setCalendarPreviousMonth = () => {
        const current = calendarCollection[1];
        const pizza = [-1, 0, 1];
        const _calendarCollection = pizza.map(pie => {
            const date = current[0].date;
            // Set it to one month ago
            date.setMonth(date.getMonth() + pie);
            // Zero the time component
            date.setHours(0, 0, 0, 0);
            return generateMonth(date);
        }); // Date[[{},{}],[],[]]
        setCalendarCollection(_calendarCollection);
    }

    const setCalendarNextMonth = () => {
        const current = calendarCollection[1];
        const pizza = [0, 1, 2];
        const _calendarCollection = pizza.map(pie => {
            const date = current[0].date;
            // Set it to one month ago
            date.setMonth(date.getMonth() + pie);
            // Zero the time component
            date.setHours(0, 0, 0, 0);
            return generateMonth(date);
        }); // Date[[{},{}],[],[]]
        setCalendarCollection(_calendarCollection);
    }

    return { calendarCollection, selectedDate, setSelectedDate, setCalendarPreviousMonth, setCalendarNextMonth };
}

export default useCalendar;