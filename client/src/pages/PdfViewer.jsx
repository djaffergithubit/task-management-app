import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfViewer(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return props.pdfFile ? 
      (<div className=" bg-white max-w-[600px] mx-auto w-full">
           <p>
        Page {pageNumber} of {numPages}
      </p>
      <div className="">
        <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return (
                <Page
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              );
            })}
        </Document>
      </div>
   
    </div>)
    :
    (<div>
      <h1>Loading...</h1>
      </div>)
    }
export default PdfViewer;