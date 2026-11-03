export const getSheets = async (spreadSheetId) => {
  try {
    const googleSheetAPIKey = import.meta.env.GS_API_KEY;

    const spreadSheetInfo = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}$key=${googleSheetAPIKey}`,
    );

    if (!spreadSheetInfo.ok) {
      alert(
        "Please make sure the spreadsheet is shared and changed to everyone with link.",
      );
      return;
    }

    return (await spreadSheetInfo.text()).sheets.properties ?? [];
  } catch (error) {
    throw new Error(`Error: Failed to connect google sheet api.`);
  }
};
