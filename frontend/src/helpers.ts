export const convertDateTime = (dateTime: string) => {
    const dateObj = new Date(dateTime);
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
    const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}`;
    
    return formattedDateTime;
};