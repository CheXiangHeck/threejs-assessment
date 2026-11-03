/**
 * Processess spreadsheet data.
 *
 * This is specifically used to process data that extracted data from **loadSheetData()**
 *
 * @param {String[][]} data The data extracted from google sheet.
 */

export const sheetDataFormatter = (data) => {
  if (data.length == 0) {
    throw new Error("Formatter failed: no data.");
  }

  //Get the header of the table.
  var headers = data[0].map((header) =>
    header
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ""),
  );

  const nameIndex = headers.indexOf("name");
  const interestIndex = headers.indexOf("interest");
  const countryIndex = headers.indexOf("country");
  const ageIndex = headers.indexOf("age");
  const netWorthIndex = headers.indexOf("networth");
  const imageIndex = headers.indexOf("photo");

  //Remove the first row because it is header and not consider as data.
  const records = data.slice(1).map((row) => {
    const netWorth = Number(
      String(row[netWorthIndex] ?? "").replace(/[,$]/g, ""),
    );

    var selectedColorIndex =
      netWorth < 100000
        ? 0
        : netWorth > 200000
          ? COLOR_SCALE.length - 1
          : netWorth >= 100000 && netWorth <= 200000
            ? 1
            : 0;

    console.log(COLOR_BORDER[selectedColorIndex]);
          
    return {
      name: row[nameIndex],
      interest: row[interestIndex],
      country: row[countryIndex],
      age: row[ageIndex],
      backgroundColor: COLOR_SCALE[selectedColorIndex],
      boxShadow: COLOR_BORDER[selectedColorIndex],
      image: row[imageIndex],
    };
  });

  return records;
};

const COLOR_SCALE = [
  "#320805",
  "#302F0A",
  "#061C0B"
]

const COLOR_BORDER =[
  "#9B2925",
  "#78691E",
  "#2F5F32",
]

// const COLOR_SCALE = [
//   "#EF3022", // < 100000
//   "#F04C34", // >= 100000
//   "#F26132",
//   "#F47F30",
//   "#F68F32",
//   "#F99D31",
//   "#FDBA36",
//   "#FDCA35",
//   "#FFD93B",
//   "#EEE937",
//   "#D5DF31",
//   "#B0CE34",
//   "#7CB643",
//   "#5DAB46", // <= 200000
//   "#3A9F48", // > 200000
// ];

// const COLOR_SCALE_DARK = [
//   "#300906",
//   "#300F0A",
//   "#31130A",
//   "#311909",
//   "#311D0A",
//   "#321F09",
//   "#33250A",
//   "#33290A",
//   "#332C0B",
//   "#302F0B",
//   "#2B2D09",
//   "#23290A",
//   "#19240D",
//   "#12220E",
//   "#0B200E",
// ];

// const getSuitableColorIndex = (netWorth) => {
//   var numberOfColor = COLOR_SCALE.length - 2;

//   var LOW_THRESHOLD = 100000;

//   var colorRange = 200000 - LOW_THRESHOLD;

//   var colorNetDiff = colorRange / numberOfColor;

//   return Math.floor((netWorth - LOW_THRESHOLD) / colorNetDiff) + 1;
// };

// const hexToRgb = (hex) => {
//   const n = parseInt(hex.slice(1), 16);
//   return `${n >> 16}, ${(n >> 8) & 255}, ${n & 255}`;
// };
