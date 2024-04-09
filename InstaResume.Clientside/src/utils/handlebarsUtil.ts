export const convertRtfToHtml = (rtf: string) => {
  // Convert RTF to HTML here (e.g., using a library or custom logic)
  return rtf.replace(/\\b/g, "<b>").replace(/\\i/g, "<i>"); // Example conversion
};

export const convertToMonthYear = (date: string) => {
  const [year, month] = date.split("-");
  return `${month}/${year}`;
};
