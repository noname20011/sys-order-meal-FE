/**
 * GOOGLE APPS SCRIPT BACKEND (Code.gs)
 * Role: Senior Full-stack Developer deliverable.
 * 
 * Database: Google Sheet with 4 tabs: Menu, Districts, Customers, Orders.
 * Folder: A dedicated Google Drive folder for Payment Proofs.
 */

const SPREADSHEET_ID = "REPLACE_WITH_YOUR_SPREADSHEET_ID";
const FOLDER_ID = "REPLACE_WITH_YOUR_DRIVE_FOLDER_ID";

/**
 * GET Handler: getData()
 */
function doGet(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const action = e.parameter.action;
  
  if (action === "getData") {
    return ContentService.createTextOutput(JSON.stringify(getData(ss)))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Fetch all necessary data for initialization
 */
function getData(ss) {
  const menuSheet = ss.getSheetByName("Menu");
  const districtSheet = ss.getSheetByName("Districts");
  const customerSheet = ss.getSheetByName("Customers");
  
  const menu = menuSheet.getDataRange().getValues().slice(1).map(row => ({
    id: row[0], weekday: row[1], mealType: row[2], dishName: row[3], image: row[4], price: row[5]
  }));
  
  const districts = districtSheet.getDataRange().getValues().slice(1).map(row => ({
    name: row[0], fee: row[1]
  }));

  const customers = customerSheet.getDataRange().getValues().slice(1).map(row => ({
    phone: row[0], fullName: row[1], address: row[2], district: row[3]
  }));
  
  return { menu, districts, customers };
}

/**
 * POST Handler: doPost(e)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const orderSheet = ss.getSheetByName("Orders");
    const customerSheet = ss.getSheetByName("Customers");
    
    // 1. Process Order Details string
    const orderDetailsStr = formatOrderDetails(data.orderDetails);
    
    // 2. Handle Base64 Image to Drive
    let proofUrl = "No Proof Provided";
    if (data.paymentProof && data.paymentProof.includes("base64")) {
      proofUrl = saveBase64ImageToDrive(data.paymentProof, data.phone);
    }
    
    // 3. Save Order to Sheet
    const orderId = "DH" + Date.now();
    orderSheet.appendRow([
      orderId,
      new Date(),
      data.phone,
      data.fullName,
      data.address,
      data.district,
      data.note,
      orderDetailsStr,
      data.totalAmount,
      proofUrl,
      "Pending"
    ]);

    // 4. Update/Add to Customers tab if new
    updateCustomerDatabase(customerSheet, data);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true, orderId: orderId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveBase64ImageToDrive(base64String, phone) {
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const contentType = base64String.substring(5, base64String.indexOf(';'));
  const base64Data = base64String.substring(base64String.indexOf(',') + 1);
  const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, "Proof_" + phone + "_" + Date.now());
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function formatOrderDetails(detailsMap) {
  return Object.entries(detailsMap).map(([key, id]) => `${key}: dish_id_${id}`).join("\n");
}

function updateCustomerDatabase(sheet, data) {
  const values = sheet.getDataRange().getValues();
  const phoneIdx = values.findIndex(row => row[0].toString() === data.phone.toString());
  
  if (phoneIdx === -1) {
    sheet.appendRow([data.phone, data.fullName, data.address, data.district]);
  } else {
    // Update existing customer info
    sheet.getRange(phoneIdx + 1, 2, 1, 3).setValues([[data.fullName, data.address, data.district]]);
  }
}
