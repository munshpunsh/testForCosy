export default function daysInMonths (year,month) {
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    return daysInMonth;
}
