import * as XLSX from 'xlsx';

const exportAssets = () => {
  const data = []; // Initialize an array to hold the table data

  // Populate data with table rows
  const tableRows = document.querySelectorAll('table tbody tr');
  tableRows.forEach((row) => {
    const rowData = [];
    row.querySelectorAll('td').forEach((cell) => {
      rowData.push(cell.textContent);
    });
    data.push(rowData);
  });

  // Create a workbook and add a worksheet
  const ws = XLSX.utils.aoa_to_sheet([['ID', 'Asset Name', 'Asset Category', 'Invoice No', 'Gem Portal No', 'Supplier Name', 'Amount', 'Floor No', 'Issued To', 'Update', 'Delete', 'QR Code'], ...data]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Asset Data');

  // Generate a blob containing the XLSX file
  const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });

  // Create a download link and trigger the download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'assets.xlsx';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

export default exportAssets;