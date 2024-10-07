import { PDFDocument } from 'pdf-lib';
import download from 'downloadjs';

// Function to create a single PDF page
const createCertificatePage = async (props, templateBytes) => {
    
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();
    form.getTextField("Name").setText(props.Name);
    form.getTextField("Rank").setText(props.Rank);
    form.getTextField("Date").setText(props.Date);

 
    return pdfDoc;
};

// Main function to handle the creation of certificates
const FillPDF = async (dataEntries, filename) => {
    // Fetch the template only once and reuse its bytes
    const templateBytes = await fetch("./templates/cert.pdf").then(res => res.arrayBuffer());
    const finalPdfDoc = await PDFDocument.create();

    if (!Array.isArray(dataEntries)) {
        dataEntries = [dataEntries];  // Convert to array for uniform processing
    }
    // Process each entry
    for (let entry of dataEntries) {
        console.log("Processing entry:", entry);
        const singlePagePdf = await createCertificatePage(entry, templateBytes);
        let [importedPage] = await finalPdfDoc.copyPages(singlePagePdf, [0]);
        finalPdfDoc.addPage(importedPage);
        importedPage = null;
    }

    const pdfBytes = await finalPdfDoc.save();
    download(pdfBytes, filename);
};

export default FillPDF;
