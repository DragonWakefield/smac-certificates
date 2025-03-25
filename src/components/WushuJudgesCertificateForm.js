import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FillWushuPDF from './WushuJudgesFiller';

function WushuJudgesCertificateForm() {
    const [individualData, setIndividualData] = useState({
        Name: '',
        Serial: '',
        Image: null,
        Type: 'I'
    });

    const handleIndividualChange = (event) => {
        const { id, value, files } = event.target;
        setIndividualData({
            ...individualData,
            [id]: files ? files[0] : value,
        });
    };

    const onIndividualSubmit = (event) => {
        event.preventDefault();
        FillWushuPDF(individualData, individualData.Name + '-certificate.pdf');
    };

    return (
        <Form className='mt-5' onSubmit={onIndividualSubmit}>
            <Form.Group className="mb-3">
                <Form.Label><h3>Input Individual Name, Serial Number, and Image</h3></Form.Label>
                <Form.Control className='mt-2' type="text" id="Name" placeholder='Name...' value={individualData.Name} onChange={handleIndividualChange} required></Form.Control>
                <Form.Control className='mt-2' type="text" id="Serial" placeholder='Serial Number...' value={individualData.Serial} onChange={handleIndividualChange} required></Form.Control>
                <Form.Control className='mt-2' type="file" id="Image" accept="image/*" onChange={handleIndividualChange} required></Form.Control>
                <Button className="mt-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
    );
}

export default WushuJudgesCertificateForm;
