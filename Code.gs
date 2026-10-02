// GANTI DENGAN ID MILIK ANDA
const SHEET_ID = '1YzwCjQ9IhQgHQrhS1DsWp9QdrWOfXCDMBfUFM9-MI-8';
const FOLDER_ID = '1HDN0a1ZIsiySwahp7UH9LII2jTUx4Wnb';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Arsip Digital MPDM')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function simpanArsip(dataForm) {
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    var folder = DriveApp.getFolderById(FOLDER_ID);
    
    var fileUrl = "-";
    var fileName = "-";
    
    // Jika ada file yang diunggah
    if (dataForm.fileData && dataForm.fileName) {
      var blob = Utilities.newBlob(Utilities.base64Decode(dataForm.fileData), dataForm.mimeType, dataForm.fileName);
      var file = folder.createFile(blob);
      fileUrl = file.getUrl();
      fileName = file.getName();
    }
    
    // Simpan ke Google Sheets
    sheet.appendRow([
      new Date(),
      dataForm.nomorSurat,
      dataForm.tanggalSurat,
      dataForm.jenisSurat,
      dataForm.perihal,
      dataForm.asalTujuan,
      fileName,
      fileUrl
    ]);
    
    return { success: true, message: 'Arsip berhasil disimpan!' };
  } catch (error) {
    return { success: false, message: 'Gagal menyimpan: ' + error.toString() };
  }
}