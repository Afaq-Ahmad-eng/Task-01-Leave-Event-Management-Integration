const UTCDate = (date) => {
    const [year, month, day] = date.split("/");
    const y = Number(year.trim());
    const m = Number(month.trim()) - 1; // months are 0-indexed
    const d = Number(day.trim());
    const utcDate = new Date(
        Date.UTC(y,m,d),
        );
    return utcDate;
};
export default UTCDate;