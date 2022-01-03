import React from "react"
import "jspdf-autotable"
import jsPDF from "jspdf"

const generatePDF = tickets => {
  // initialize jsPDF
  const doc = new jsPDF()

  // define the columns we want and their titles
  const tableColumn = ["Id", "Title", "Issue", "Status", "Closed on"]
  // define an empty array of rows
  const tableRows = ["Id", "Title", "Issue", "Status", "Closed on"]

  // for each ticket pass all its data into an array
  tickets.forEach(ticket => {
    const ticketData = [
      ticket.id,
      ticket.title,
      ticket.request,
      ticket.status,
      // called date-fns to format the date on the ticket
      format(new Date(ticket.updated_at), "yyyy-MM-dd"),
    ]
    // push each tickcet's info into a row
    tableRows.push(ticketData)
  })

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 })
  // we use a date string to generate our filename.
  const dateStr = "report"
  // ticket title. and margin-top + margin-left
  doc.text("title of the pdf", 14, 15)
  // we define the name of our PDF file.
  doc.save(`indtech${dateStr}.pdf`)
}

export default generatePDF
