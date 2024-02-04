import './App.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Papa from 'papaparse';
import FillPDF from './components/pdfFiller';

function App() {

//#region Functions regarding parsing of CSV file
  const [formFile, setFormFile] = useState([]);
  const [csvData, setCsvData] = useState([]);
  // const [indexedData, setindexedData] = useState({
  //   Name:'',
  //   Rank:'',
  //   Date:''
  // })
  const onFileSubmit = (event) =>{
    event.preventDefault(); 
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target.result;
  
        Papa.parse(csvText, {
          header: false, // Do not treat the first row as headers
          dynamicTyping: true, // Attempt to convert numeric values to numbers
          complete: (result) => {  
            const data = result.data;
            if (data && data.length > 2) {
              setCsvData(data);
              data.slice(2).forEach((rowData) => {
                const indexedData = {
                  Name: rowData[0],
                  Rank: rowData[2],
                  Date: rowData[3],
                  Type: "C"
                };

                if (indexedData.Name != null){
                  FillPDF(indexedData);
                }
                
              });
            } else {
              console.error('CSV Data is empty or undefined.');
            }
          },
          error: (error) => {
            console.error('CSV Parsing Error:', error.message);
          },
        });
      };
  
      reader.readAsText(file);
    }
  };

//#endregion

//#region Functions regarding Individual Certificates
  const [individualData, setindividualData] = useState({
    Name:'',
    Rank:'',
    Date:'',
    Type:"I"
  })

  const handleIndividualChange = (event) =>{
    const {id, value} = event.target;
    setindividualData({
      ...individualData,
      [id]: value,
    });
  }

  const onIndividualSubmit = (event) => {
      event.preventDefault();
      CreatePDF(individualData);
  };
//#endregion

  const CreatePDF = (props) => {
    console.log(props);
    FillPDF(individualData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SMAC Certificates</h1>
      </header>
      
      <div className='App-body'>

        {/* <Form onSubmit={onFileSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><h3>Upload .CSV file</h3></Form.Label>
            <Form.Control id="students" type="file" value={formFile} onChange={setFormFile} accept='.csv'/>
            <Button className="mt-3" variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form> */}
        <h2>Upload .CSV File</h2>
        <input type="file" accept=".csv" onChange={onFileSubmit} />

        <Form className='mt-5' onSubmit={onIndividualSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><h3>Input Individual Name, Rank, and Date </h3></Form.Label>
            <Form.Control className='mt-2' type="text" id="Name"  placeholder='Name...' value={individualData.Name} onChange={handleIndividualChange} required></Form.Control>
            <Form.Select className='mt-2' label="Ranks" id="Rank"  value={individualData.Rank} onChange={handleIndividualChange}  required>
              <option>Select Ranks</option>
              <option value="White Sash">White</option>
              <option value="Yellow Sash">Yellow</option>
              <option value="Orange Sash">Orange</option>
              <option value="Purple Sash">Purple</option>
              <option value= "Blue Sash">Blue</option>
              <option value="Blue Sash w/ Stripe">Blue/St</option>
              <option value="Green Sash">Green</option>
              <option value="Green Sash w/ Stripe">Green w/ Stripe</option>
              <option value="Green Sash w/ 2 Stripe">Green w/ 2 Stripe</option>
              <option value="Brown Sash">Brown</option>
              <option value="Brown Sash w/ Stripe">Brown w/ Stripe</option>
              <option value="Brown Sash w/ 2 Stripe">Brown w/ 2 Stripe</option>
            </Form.Select>
            <Form.Control  className='mt-2' type="date" id="Date" value={individualData.Date} onChange={handleIndividualChange}  required/>
            <Button className="mt-3" variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default App;
