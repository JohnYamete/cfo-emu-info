function doGet() {
  var out = HtmlService.createTemplateFromFile('index').evaluate();
  out.setTitle('CFOエミュ機体情報');
  return out;
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


/*** API ***/

function getAll(sheetNames) {
  if (typeof sheetNames === 'string') {
    return getSheetCellTable(sheetNames);
  } else if (Array.isArray(sheetNames)) {
    var res = {};
    var app = getSpreadsheetHandler();
    sheetNames.forEach(function (sheetName) {
      res[sheetName] = getSheetCellTable(sheetName, app);
    });
    return res;
  } else {
    throw new Error('Invalid arg type: sheetNames');
  }
}


/*** Utilities ***/

function getSpreadsheetHandler() {
  var file = DriveApp.getFilesByName('CFOエミュ機体情報').next();
  return SpreadsheetApp.open(file)
}

var halfNumStr = '0123456789';
var fullNumStr = '０１２３４５６７８９';

function getSheetCells(sheetName, app) {
  app = app || getSpreadsheetHandler();
  var sheet = app.getSheetByName(sheetName);
  return sheet.getDataRange().getValues()
      .map(function (row) {
        return row.map(function (cell) {
          if (typeof cell === 'string') {
            cell = cell.trim();
            for (var i = 0; i < 10; ++i) {
              cell = cell.replace(fullNumStr[i], halfNumStr[i]);
            }
          }
          return cell;
        });
      });
}

function getSheetCellTable(sheetName, app) {
  var cells = getSheetCells(sheetName, app);
  var res = [];
  var header = cells[0];
  cells.slice(1)
      .filter(function (row) { return row[0] || String(row[0]).trim().length; })
      .forEach(function (row) {
        var y = {};
        header.forEach(function (key, i) {
          y[key] = row[i];
        });
        res.push(y);
      });
  return res;
}
