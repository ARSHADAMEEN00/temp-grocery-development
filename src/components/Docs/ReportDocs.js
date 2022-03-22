import React from 'react'
import { Document, Packer, Paragrap } from "docx";

function ReportDocs() {
    const saveDocumentToFile = (doc, fileName) => {
        const packer = new Packer();

        packer.toBlob(doc).then(blob => {
            const docblob = blob.slice(0, blob.size, mimeType);
            saveAs(docblob, fileName);
        });
    }
    return (
        <div
            style={{ marginTop: "10rem", cursor: "pointer" }}
            onClick={saveDocumentToFile}
        >ReportDocs</div>
    )
}

export default ReportDocs