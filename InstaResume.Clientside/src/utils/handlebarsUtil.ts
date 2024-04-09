export const convertRtfToHtml = (rtf: string) => {
  // Convert RTF to HTML here (e.g., using a library or custom logic)
  return rtf.replace(/\\b/g, "<b>").replace(/\\i/g, "<i>"); // Example conversion
};

export const convertToMonthYear = (date: string) => {
  if (date === undefined) return;
  const dateObject = new Date(date);
  return `${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
};
