/**
 * Export helpers for client-side downloads
 */

export function exportToCSV(data: any[], columns: any[], filename: string) {
  // Filter out select and action columns
  const activeCols = columns.filter(c => c.id !== 'select' && c.id !== 'actions')
  
  const headers = activeCols.map(c => {
    if (typeof c.header === 'string') return c.header
    
return c.accessorKey || c.id || ''
  }).join(',')

  const rows = data.map(row => {
    return activeCols.map(c => {
      const key = c.accessorKey || c.id
      const val = row[key]
      const strVal = val !== undefined ? String(val) : ''
      
      // Escape quotes
      return `"${strVal.replace(/"/g, '""')}"`
    }).join(',')
  }).join('\n')

  const csvContent = `\uFEFF${headers}\n${rows}` // Include BOM for proper UTF-8 handling in Excel
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportToExcel(data: any[], columns: any[], filename: string) {
  // Filter out select and action columns
  const activeCols = columns.filter(c => c.id !== 'select' && c.id !== 'actions')

  const headers = activeCols.map(c => {
    if (typeof c.header === 'string') return c.header
    
return c.accessorKey || c.id || ''
  }).join('</th><th>')

  const rows = data.map(row => {
    return '<tr><td>' + activeCols.map(c => {
      const key = c.accessorKey || c.id
      const val = row[key]

      
return val !== undefined ? String(val) : ''
    }).join('</td><td>') + '</td></tr>'
  }).join('')

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-error-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Sheet1</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <meta charset="utf-8">
    </head>
    <body>
      <table>
        <thead>
          <tr><th>${headers}</th></tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </body>
    </html>
  `

  const blob = new Blob([html], { type: 'application/vnd.ms-excel' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = url
  a.download = `${filename}.xls`
  a.click()
  URL.revokeObjectURL(url)
}
