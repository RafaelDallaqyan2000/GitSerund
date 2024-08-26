import React from "react";
import jsPDF from "jspdf";
import "./pdfExample.css";

function PdfExample() {
  const generatePDF = () => {
    var doc = new jsPDF("p", "pt");
    // doc.setFont("Roboto-Regular");
    doc.setFont("Mardoto");

    // const myFont = font;
    // doc.addFileToVFS("Mardoto-Regular-normal.ttf", myFont);
    // doc.addFont("Mardoto-Regular-normal.ttf", "Mardoto-Regular", "normal");
    // var doc = new jsPDF("p", "pt", "letter");
    // doc.setFont("PTSans");
    // doc.setFontSize(10);
    doc.text("не надо", 50, 100);
    doc.text("կիսամյակ", 10, 50);
    doc.text("normal", 10, 80);
    // const myFont = "../fonts/Mardoto-Light.ttf"; // load the *.ttf font file as binary string
    // const myFont = require("../fonts/Mardoto-Regular.bin")
    // add the font to jsPDF
    // doc.addFileToVFS("Mardoto-Regular-normal", font);
    // doc.addFont("Mardoto-Regular-normal", "MyFont", "normal");
    // doc.setFont("MyFont");
    // const html =
    //   "<html style=\"font-family: 'Mardoto-Regular';\">կիսամյակ</html>";
    // doc.fromHTML(html, 200, 25);
    // doc.fromHTML("aaa", 200, 50);
    // doc.fromHTML("Դեկ", 200, 80);

    // doc.setFont("PTSans");
    var someText = document.querySelector("#someText");
    doc.setFillColor("#3A4E8A");
    var width = doc.internal.pageSize.getWidth();
    doc.rect(0, 0, width, 74, "F");
    doc.text("Հայերեն ՞ $ % * ^", 15, 15);
    doc.text("Հայերեն ՞ $ % * ^", 15, 15);
    doc.text("Հայերեն ՞ $ % * ^", 15, 15);
    doc.text("Հայերեն ՞ $ % * ^", 15, 15);
    doc.text("Հայերեն ՞ $ % * ^", 15, 15);
    doc.addPage();

    doc.text("Հայերեն ՞ $ % * ^", 15, 1500);

    // doc.setPage(2);
    // doc.fromHTML("19 Դեկ 2020թ", 15, 25);
    // doc.fromHTML("кирилица", 200, 15);
    // doc.fromHTML("1-ին կիսամյակ", 200, 25);

    // doc.text(20, 20, "This is the first title.");

    // doc.addFont("helvetica", "normal");
    // doc.text(20, 60, "This is the second title.");
    // doc.text(20, 100, "This is the thrid title.");

    doc.save("demo.pdf");
  };

  const name = "Մարգարիտա Բեգլարյան";

  return (
    <div>
      <div>
        <div className="someText">
          <p id="someText">Մարգարիտա Բեգլարյան</p>
        </div>
        <button onClick={() => generatePDF()} type="primary">
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default PdfExample;
