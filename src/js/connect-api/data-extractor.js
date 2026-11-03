const loadSheetData = async (url) => {
  const response = await fetch(url,{
    credentials: "include",
  });

  if (!response.ok) {
    alert(
      "Please make sure the spreadsheet is shared and changed to everyone with link.",
    );
    return [];
  }

  const json = await response.json();

  /**
   * Format of the CSV data:
   * {
   *  range: "The range of the data in the sheet",
   *  majorDimension: The dimension of the data (Rows)
   *  values: "The data in the table." string[][]
   * }
   */

  return json.values ?? [];
};

export { loadSheetData };
