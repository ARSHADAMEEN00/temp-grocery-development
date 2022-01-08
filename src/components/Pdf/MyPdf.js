import React from "react"
import "jspdf-autotable"
import jsPDF from "jspdf"

const generatePDF = (pdfData) => {
  console.log(pdfData);
  // initialize jsPDF
  const doc = new jsPDF()

  // const fileNameStr = pdfData?.quotationitem ? "Quataion" : "Report"

  doc.text("<h1>INDTECH</h1>", 14, 15)

  doc.text('This is the first title.', 20, 20)

  doc.addFont('helvetica', 'normal')
  doc.text(20, 60, 'This is the second title.')
  doc.text(20, 100, 'This is the thrid title.')

  doc.save(`indtech.pdf`)
}

export default generatePDF


  // define the columns we want and their titles
  // const tableColumn = ["Id", "Title", "Issue", "Status", "Closed on"]
  // define an empty array of rows
  // const tableRows = ["Id", "Title", "Issue", "Status", "Closed on"]

  // for each report pass all its data into an array
  // pdfData.forEach(report => {
  //   const reportData = [
  //     report.id,
  //     report.title,
  //     report.request,
  //     report.status,
  //     // called date-fns to format the date on the report
  //     format(new Date(report.updated_at), "yyyy-MM-dd"),
  //   ]
  //   // push each tickcet's info into a row
  //   tableRows.push(reportData)
  // })
  // startY is basically margin-top
  // doc.autoTable(tableColumn, tableRows, { startY: 20 })
  // we use a date string to generate our filename.
  // const dateStr = "report"
  // report title. and margin-top + margin-left
  // doc.text("title of the pdf", 14, 15)
  // we define the name of our PDF file.
  // doc.save(`indtech${dateStr}.pdf`)