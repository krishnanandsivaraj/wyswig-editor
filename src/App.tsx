
import './App.css';
import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { saveAs } from 'file-saver';
import { pdfExporter } from 'quill-to-pdf';

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';


function App() {
  const editorRef = useRef(null);

  const [value, setValue] = useState('');
  // var Size = ReactQuill.Quill.import('attributors/style/size');
  // Size.whitelist = ['5px','6px', '7px', '8px','9px','10px', '16px', '14px','18px'];
  // ReactQuill.Quill.register(Size, true);
  var AlignClass = ReactQuill.Quill.import('attributors/class/align');
  AlignClass.whiteList = ['left', 'right', 'center'];
  ReactQuill.Quill.register(AlignClass, true);

  async function showModal() {
    // @ts-ignore
    const delta = editorRef.current?.editor?.getContents();
    console.log(delta);
    let cfg = {
      inlineStyles: true,
      size: {
        'small': 'font-size: 0.75em',
        'large': 'font-size: 1.5em',
        'huge': 'font-size: 2.5em',
        'normal': 'font-size: 1em',
     },
   };
    var converter = new QuillDeltaToHtmlConverter(delta.ops, cfg);
    var html = converter.convert(); 
    console.log(html);
    //let pdf = new jsPDF('p', 'pt', 'a4');
  //   pdf.html(html, {
  //     callback: function () {
  //          pdf.save('web.pdf');
  //         //window.open(pdf.output('bloburl')); // use this to debug
  //     },
  //     margin: 20,
  //     autoPaging: 'text',
  //     width: 550, // <- here
  //     windowWidth: 1200 // <- here
  // });

  //const doc = new jsPDF();  
         
          
          //html to pdf format
          var htmll = htmlToPdfmake(html);
          const pdfmake=pdfMake;
          console.log(htmll)
          const documentDefinition = { content: htmll };
          pdfmake.vfs = pdfFonts.pdfMake.vfs;
          pdfmake.createPdf(documentDefinition).download();
    // const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
    // saveAs(pdfAsBlob, "pdf-export.pdf"); 
    
  };

  return (
    <div className="App">
      <ReactQuill 
      theme="snow" 
      value={value} 
      onChange={setValue} 
      modules={{
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ header: [1, 2, 3, 4, 5, 6] }],
          [{size: []}],
          ["link"]
        ]
      }}
      ref={editorRef}/>

      <Button type="primary" size={'large'} onClick={showModal}>
            Save
        </Button>
      <br/>
    </div>

  );
}

export default App;
