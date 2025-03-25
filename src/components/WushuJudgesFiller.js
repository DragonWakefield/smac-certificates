import { PDFDocument } from 'pdf-lib';
import download from 'downloadjs';

// Function to create a single PDF page
const createCertificatePage = async (props, templateBytes) => {
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    form.getTextField("name").setText(props.Name);
    form.getTextField("serialNum").setText(props.Serial);

    
    if (props.Image) {
        const imageBytes = await props.Image.arrayBuffer();
        const imageType = props.Image.type.includes('png')
            ? await pdfDoc.embedPng(imageBytes)
            : await pdfDoc.embedJpg(imageBytes);

        const imageField = form.getButton("image");
        imageField.setImage(imageType);

        // if (imageField) {
        //     const acroField = imageField.acroField;
        //     const rect = acroField.getRect();  // Extracts position and size

        //     const page = pdfDoc.getPage(0);
        //     page.drawImage(imageType, {
        //         x: rect.x,
        //         y: rect.y - rect.height,  // Adjust to align within the field
        //         width: rect.width,
        //         height: rect.height
        //     });
        // } else {
        //     console.warn("Image field not found in PDF. Drawing image at fallback position.");
        //     const page = pdfDoc.getPage(0);
        //     page.drawImage(imageType, { x: 350, y: 450, width: 100, height: 100 });
        // }
    }

    form.flatten();
    return pdfDoc;
};

// Main function to handle the creation of certificates
const FillWushuPDF = async (dataEntries, filename) => {
    const templateBytes = await fetch("./templates/wushujudge5.pdf").then(res => res.arrayBuffer());
    const finalPdfDoc = await PDFDocument.create();

    if (!Array.isArray(dataEntries)) {
        dataEntries = [dataEntries];
    }

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

export default FillWushuPDF;
