import { PDFDocument } from "pdf-lib";
import download from "downloadjs";

const FillPDF = async(props) => {

    let certificateBytes = await fetch("./templates/cert.pdf").then(res => res.arrayBuffer());
    let dCertificateDoc = await PDFDocument.load(certificateBytes);

    // let fontBytes = await fetch("./calibri-bold.ttf").then(res => res.arrayBuffer());
    // const calibriFont = await dCertificateDoc.embedFont(fontBytes);
    // dCertificateDoc.setFont(calibriFont);

    let dCertificate = await dCertificateDoc.getForm();

    dCertificate.getTextField("Name").setText(props.Name, {font:"Calibri"});
    dCertificate.getTextField("Rank").setText(props.Rank);
    dCertificate.getTextField("Date").setText(props.Date);

    let filename = props.Name + "-certificate.pdf";
    const pdfbytes = await dCertificateDoc.save();
    if (props.Type === "I"){
        download(pdfbytes, filename);    
    }
    else if (props.Type === "C"){
        download(pdfbytes, filename);    

    }
    

}
export default FillPDF;