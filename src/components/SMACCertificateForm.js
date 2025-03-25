import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FillPDF from './pdfFiller';

function SMACCertificateForm() {
    const [individualData, setIndividualData] = useState({
        Name: '',
        Rank: '',
        Date: '',
        Type: 'I'
    });

    const handleIndividualChange = (event) => {
        const { id, value } = event.target;
        setIndividualData({
            ...individualData,
            [id]: value,
        });
    };

    const onIndividualSubmit = (event) => {
        event.preventDefault();
        FillPDF(individualData, individualData.Name + '-certificate.pdf');
    };

    return (
        <Form className='mt-5' onSubmit={onIndividualSubmit}>
            <Form.Group className="mb-3">
                <Form.Label><h3>Input Individual Name, Rank, and Date</h3></Form.Label>
                <Form.Control className='mt-2' type="text" id="Name"  placeholder='Name...' value={individualData.Name} onChange={handleIndividualChange} required></Form.Control>
                <Form.Control  className='mt-2' type="text" id="Rank" placeholder='Rank...' value={individualData.Rank} onChange={handleIndividualChange} required></Form.Control>
                <Form.Control  className='mt-2' type="date" id="Date" value={individualData.Date} onChange={handleIndividualChange} required/>
                <Button className="mt-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
}

export default SMACCertificateForm;
