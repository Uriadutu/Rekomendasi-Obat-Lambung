export function parseAndFormatDateString(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = parsedDate.getDate().toString().padStart(2, "0");
  
    return `${day}-${month}-${year}`;
  }

  export function capitalizeWords(text) {
    return text
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  