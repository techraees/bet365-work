function formatDateToCustomString(dateString: string): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const parts = dateString.split('-');
    const day = Number(parts[0]);
    const monthIndex = Number(parts[1]) - 1;
    const year = Number(parts[2]);

    const date = new Date(year, monthIndex, day);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthsOfYear[monthIndex];

    return `${dayOfWeek} ${day} ${month}`;
}
export default formatDateToCustomString;