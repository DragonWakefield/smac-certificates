import './App.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Papa from 'papaparse';
import FillPDF from './components/pdfFiller';
import FillWushuPDF from './components/WushuJudgesFiller';
import SMACCertificateForm from './components/SMACCertificateForm';
import WushuJudgesCertificateForm from './components/WushuJudgesCertificateForm';

function App() {
  const [mode, setMode] = useState('SMAC');

  const toggleMode = () => {
    setMode(mode === 'SMAC' ? 'Wushu Judges' : 'SMAC');
  };

  return (
    <div className="App">
      <title>{mode} Certificates</title>
      <header className="App-header">
        <h1>{mode} Certificates</h1>
        <Button variant="secondary" onClick={toggleMode} className="mt-2">
          Switch to {mode === 'SMAC' ? 'Wushu Judges' : 'SMAC'} Mode
        </Button>
      </header>

      <div className='App-body'>
        {mode === 'SMAC' ? (
          <SMACCertificateForm />
        ) : (
          <WushuJudgesCertificateForm />
        )}
      </div>
    </div>
  );
}

export default App;