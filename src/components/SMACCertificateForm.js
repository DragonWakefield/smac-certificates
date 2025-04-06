import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FillPDF from './pdfFiller';
import Papa from 'papaparse';

function SMACCertificateForm() {
    const [individualData, setIndividualData] = useState({
        Name: '',
        Rank: '',
        Date: '',
        Type: 'I'
    });

    const bulkEntriesRef = useRef([]); // Temp in-memory storage

    const handleIndividualChange = (event) => {
        const { id, value } = event.target;
        setIndividualData({
            ...individualData,
            [id]: value,
        });
    };

    const onIndividualSubmit = (event) => {
        event.preventDefault();
        FillPDF(individualData, `${individualData.Name}-certificate.pdf`);
    };

    const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            complete: async (results) => {
                const data = results.data;

                // Map and filter as described
                const dataEntries = data.slice(2).map(rowData => ({
                    Name: rowData[0],
                    Rank: rowData[2],
                    Date: rowData[3],
                    Type: 'C'
                })).filter(entry => entry.Name != null && entry.Name.trim() !== '');

                    bulkEntriesRef.current = dataEntries;

                    // Fill all entries in one go and generate single PDF
                    await FillPDF(bulkEntriesRef.current, 'All-Certificates.pdf');

                    // Clear after download
                    bulkEntriesRef.current = [];
            },
            error: (err) => {
                console.error('Error parsing CSV:', err);
            }
        });
    };

    return (
        <>
            <Form className='mt-5' onSubmit={onIndividualSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label><h3>Input Individual Name, Rank, and Date</h3></Form.Label>
                    <Form.Control className='mt-2' type="text" id="Name"  placeholder='Name...' value={individualData.Name} onChange={handleIndividualChange} required />
                    <Form.Select className='mt-2' label="Ranks" id="Rank"  value={individualData.Rank} onChange={handleIndividualChange}  required>
                        <option>Select Ranks</option>
                        <option value="Yellow Sash">Yellow</option>
                        <option value="Yellow Sash with Stripe">Yellow with Stripe</option>
                        <option value="Blue Sash">Blue</option>
                        <option value="Blue Sash with Stripe">Blue with Stripe</option>
                        <option value="Blue Sash with 2 Stripes">Blue with 2 Stripes</option>
                        <option value="Green Sash">Green</option>
                        <option value="Green Sash with Stripe">Green with Stripe</option>
                        <option value="Green Sash with 2 Stripes">Green with 2 Stripes</option>
                        <option value="Brown Sash">Brown</option>
                        <option value="Brown Sash with Stripe">Brown with Stripe</option>
                        <option value="Brown Sash with 2 Stripes">Brown with 2 Stripes</option>
                    </Form.Select>
                    <Form.Control className='mt-2' type="date" id="Date" value={individualData.Date} onChange={handleIndividualChange} required />
                    <Button className="mt-3" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>

            <Form.Group className='mt-4'>
                <Form.Label><h3>Upload CSV for Bulk Certificates</h3></Form.Label>
                <Form.Control type="file" accept=".csv" onChange={handleCSVUpload} />
            </Form.Group>
        </>
    );
}

export default SMACCertificateForm;
