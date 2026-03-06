// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import './Card.css';
// import logo from '../../Assets/jivitlogo.png'
// import front from '../../Assets/card/update.png';
// import back from '../../Assets/card/back.png';
// import JMS from '../../Assets/card/image (2).png'
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { Base_url } from '../../config/Config';

// function Card() {
//     const [data, setData] = useState({});
//     const [family, setFamily] = useState([]);
//     const printRef = useRef();
//     let params = useParams();

//     useEffect(() => {
//         async function getData() {
//             const token = localStorage.getItem('token');
//             try {
//                 let url = `${Base_url}/api/benificiaries/${params.id}`;
//                 //   let url = `http//localhost/api/benificiaries/${params.id}`;${process.env.REACT_APP_API_KEY}


//                 let response = await fetch(url, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 let emp = await response.json();
//                 setData(emp);
//                 setFamily(emp.benificiaryCardDependents)
//                 console.log(emp);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }

//         getData();
//     }, [params.id]);

//     const handlePrint = () => {
//         const MAX_WIDTH = 200;
//         const MAX_HEIGHT = 200;

//         html2canvas(printRef.current, { scale: 2 }).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF();

//             const imgWidth = canvas.width;
//             const imgHeight = canvas.height;

//             let scale = Math.min(MAX_WIDTH / imgWidth, MAX_HEIGHT / imgHeight);
//             let newWidth = imgWidth * scale;
//             let newHeight = imgHeight * scale;

//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = pdf.internal.pageSize.getHeight();

//             const xPos = (pdfWidth - newWidth) / 2;
//             const yPos = (pdfHeight - newHeight) / 2;


//             pdf.addImage(imgData, 'PNG', 5, -10, 200, newHeight);
//             pdf.save(`${data.fullName}.pdf`);
//         });
//     };


//     const dob = new Date(data.dateOfBirth);
//     const doi = new Date(data.cardIssueDate);
//     const dor = new Date(data.dateOfRetirement);
//     const formattedDate = dob.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//     });
//     const formatedoi = doi.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//     });
//     const formatedor = dor.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//     });
//     return (
//         <>

//     <div className="mobile-warning">
//         <p>Please open this project on a laptop or desktop for card.</p>
//     </div>

//             <div className="card" ref={printRef}>
//                 {/* Front Side */}
//                 <div className="card-side card-front">

//                     <div className="card-info">
//                          <div className="info-left">
//     <table className="card-table">
//       <tbody>
//         <tr>
//           <td><b>Card No:</b></td>
//           <td style={{ color: "red", fontWeight: "bold", fontSize: "10px" }}>
//             {data.cardNo}
//           </td>
//         </tr>

//         <tr>
//           <td><b>Emp. Name:</b></td>
//           <td>{data.fullName}</td>
//         </tr>

//         <tr>
//           <td><b>DOB:</b></td>
//           <td>{formattedDate}</td>
//         </tr>

//         <tr>
//           <td><b>Dept. Name:</b></td>
//           <td>{data.departmentName}</td>
//         </tr>

//         <tr>
//           <td><b>Location:</b></td>
//           <td>{data.departmentLocation}</td>
//         </tr>

//         <tr>
//           <td><b>Designation:</b></td>
//           <td>{data.designation}</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>

//                         <div className="info-right">
//                             <div className="card-header">
//                                 <img
//                                     src={logo} // Replace with logo URL
//                                     alt="Jivit Healthcare"
//                                     className="card-logo"
//                                 />

//                             </div>

//                              <table className="card-table2">
//       <tbody>
//         <tr>
//           <td><b>Gender:</b></td>
//           <td>{data.gender || "Male"}</td>
//         </tr>

//         <tr>
//           <td><b>DOI:</b></td>
//           <td>{formatedoi}</td>
//         </tr>

//         <tr>
//           <td><b>DOR:</b></td>
//           <td>{formatedor}</td>
//         </tr>
//       </tbody>
//     </table>
//                         </div>
//                     </div>
//                     <div className="card-footer">
//                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "70px", justifyContent: "center", color: "white", fontSize: "8px", paddingRight: "5px" }}> <div style={{ fontSize: "11px", borderBottom: "1px solid white", margin: "2px" }}>Help Line:</div> <div>9322006819, 9307633246,</div> 9021184557, 9665450899</div>
//                         <p style={{
//                             color: "white",
//                             fontSize: "8px",
//                         marginTop: "38px",padding: "5px",textAlign:"center"}}>
//                         ADDRESS: SHOP NO. 20, 1ST FLOOR,SACHI PLAZA NEAR B.J. MARKET,POLICE CHOWKI,JALGAON-425001
//                     </p>
//                 </div>
//             </div>

//             {/* Back Side */}
//             <div className="card-side card-back">
//                 <div className="instructions">
//                     <h3 style={
//                         {
//                             backgroundColor: "#1587CE",
//                             color: "white",
//                             fontSize: "15px",
//                             textAlign:"center",
//                         }
//                     }>Instructions</h3>
//                     <ol>
//                         <li>Schemes shall be cashless only for Jivit Healthcare cardholders.</li>
//                         <li>
//                             This card is valid only for 27 acute and 5 major diseases as
//                             defined by the Maharashtra Government.
//                         </li>
//                         <li>
//                             This card is valid only in network hospitals of Jivit Healthcare
//                             Pvt. Ltd.
//                         </li>
//                         <li>
//                             OPD treatment is not covered under the scheme, and this card is
//                             non-transferable.
//                         </li>
//                     </ol>
//                 </div>
//                 <div className="dependents">
//                     <h3 style={
//                         {
//                             backgroundColor: "#1587CE",
//                             color: "white",
//                             fontSize: "15px",
//                             textAlign: "center",

//                         }
//                     }>Dependents</h3>
//                     <table classna>
//                         <thead>
//                             <tr >
//                                 <th >Sr.No</th>
//                                 <th>Name</th>
//                                 <th>Gender</th>
//                                 <th>Age</th>
//                                 <th>Relation</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 family.map((e, i) => (
//                                     <tr key={i}>
//                                         <td>{i + 1}</td>
//                                         <td>{e.name}</td>
//                                         <td>{e.gender}</td>
//                                         <td>{e.age}</td>
//                                         <td>{e.relation}</td>
//                                     </tr>
//                                 ))
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="footerp">
//                     <p>Visit us at - www.jivithealthcare.com</p>
//                 </div>
//             </div>
//         </div >
//             <button className="print-btn" onClick={handlePrint}>
//                 Print Card
//             </button>
//         </>
//     );
// }

// export default Card;










// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import './Card.css';
// import logo from '../../Assets/jivitlogo.png'
// import front from '../../Assets/card/update.png';
// import back from '../../Assets/card/back.png';
// import JMS from '../../Assets/card/image (2).png'
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// import { Base_url } from '../../config/Config';

// function Card() {
//     const [data, setData] = useState({});
//     const [family, setFamily] = useState([]);
//     const printRef = useRef();
//     let params = useParams();

//     useEffect(() => {
//         async function getData() {
//             const token = localStorage.getItem('token');
//             try {
//                 let url = `${Base_url}/api/benificiaries/${params.id}`;
//                 //   let url = `http//localhost/api/benificiaries/${params.id}`;${process.env.REACT_APP_API_KEY}


//                 let response = await fetch(url, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 let emp = await response.json();
//                 setData(emp);
//                 setFamily(emp.benificiaryCardDependents)
//                 console.log(emp);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }

//         getData();
//     }, [params.id]);

// //   const handlePrint = () => {
// //     html2canvas(printRef.current, {
// //         scale: 2,
// //         useCORS: true,
// //         backgroundColor: '#ffffff',
// //         logging: false,
// //         allowTaint: true,
// //         removeContainer: true,
// //         ignoreElements: (element) => element.classList.contains('no-print'),

// //         onclone: (document, element) => {
// //             // Clean only images and footer
// //             element.querySelectorAll('img').forEach(img => {
// //                 img.style.border = 'none';
// //                 img.style.outline = 'none';
// //                 img.style.boxShadow = 'none';
// //             });

// //             const footer = element.querySelector('.card-footer');
// //             if (footer) {
// //                 footer.style.border = '1px solid #eaeff3';
// //                 footer.style.outline = 'none';
// //                 footer.style.boxShadow = 'none';
// //             }
// //              const infoLeft = element.querySelector('.info-left');
// //     if (infoLeft) {
// //         infoLeft.style.position = 'relative';  // required for z-index to work
// //         infoLeft.style.zIndex = '10';
// //     }
// //     const address = element.querySelector('.address');
// //     if (address) {
// //         address.style.marginTop = "15px";
       
// //     }
// //             // Keep table borders
// //             element.querySelectorAll('.dependents th, .dependents td').forEach(cell => {
// //                 cell.style.border = '1px solid #000000';
// //             });
// //         }
// //     }).then((canvas) => {
// //         const imgData = canvas.toDataURL('image/png', 1.0);

// //         const pdf = new jsPDF({
// //             orientation: 'landscape',
// //             unit: 'mm',
// //             format: [297, 140]
// //         });

// //         const pdfWidth = pdf.internal.pageSize.getWidth();
// //         const pdfHeight = pdf.internal.pageSize.getHeight();

// //         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
// //         pdf.save(`${data.fullName || 'Jivit_Card'}.pdf`);
// //     });
// // };






// const handlePrint = async () => {
//     const element = printRef.current;

//     const canvas = await html2canvas(element, {
//         scale: 2, // VERY IMPORTANT (no scaling)
//         useCORS: true,
//         backgroundColor: "#ffffff",
//         logging: false
//     });

//     const imgData = canvas.toDataURL("image/png");

//     // Use PIXEL unit instead of mm
//     const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",     // 👈 VERY IMPORTANT
//         format: [820, 380]  // 👈 EXACT same as card size
//     });

//     pdf.addImage(imgData, "PNG", 0, 0, 820, 380);
//     pdf.save(`${data.fullName || "Jivit_Card"}.pdf`);
// };
//     const dob = new Date(data.dateOfBirth);
//     const doi = new Date(data.cardIssueDate);
//     const dor = new Date(data.dateOfRetirement);
//     const formattedDate = dob.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//     });
//     const formatedoi = doi.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//     });
//     const formatedor = dor.toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//     });
//     return (
//         <>

//             <div className="mobile-warning">
//                 <p>Please open this project on a laptop or desktop for card.</p>
//             </div>

//             <div className="card" ref={printRef}>
//                 {/* Front Side */}
//                 <div className="card-side card-front">

//                     <div className="card-info">
//                         <div className="info-left">
//                             <p><b>CARD NO</b>  <span className="card-no">:<span  style={{color:"red",fontWeight:"bold",fontSize:"14px"}}>{data.cardNo}</span></span></p>
//                             <p><b>EMP NAME</b> <span  >:<span>{data.fullName}</span></span></p>
//                             <p><b>DOB</b>  <span>:<span>{formattedDate}</span></span></p>
//                             <p><b>DEPT NAME</b>  <span>:<span>{data.departmentName}</span></span></p>
//                             <p><b>LOCATION</b> <span>:<span>{data.departmentLocation}</span></span></p>
//                             <p style={{zIndex:10}}><b>DESIGNATION</b> <span>:<span>{data.designation}</span></span></p>
//                         </div>
//                         <div className="info-right">
//                             <div className="card-header">
//                                 <img src={logo} alt="Jivit Healthcare" className="card-logo" />
//                             </div>
//                             <p><b >GENDER</b> <span>:<span>{data.gender || "Male"}</span></span></p>
//                             <p><b>DOI</b> <span>:<span>{formatedoi}</span></span></p>
//                             <p><b>DOR</b> <span>:<span>{formatedor}</span></span></p>
//                         </div>
//                     </div>

//                     <div className="card-footer">
//                         <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "75px", justifyContent: "center", color: "white", fontSize: "8px", paddingRight: "5px" }}> <div style={{ fontSize: "14px", borderBottom: "1px solid white", margin: "2px",fontFamily:"sans-serif" }}>Help Line:</div> <div style={{fontSize:"11px",fontFamily:"sans-serif"}}>9322006810, 9307633246,</div> <div style={{fontSize:"11px",fontFamily:"sans-serif"}}>9021184557, 9665450999</div></div>
//                          <p className='address' style={{
//                             color: "white",
//                             fontSize: "7.2px",
//                         marginTop:"20px",padding: "5px",textAlign:"center",zIndex:1}}>
//                         ADDRESS: SHOP NO. 20, 1ST FLOOR,SACHI PLAZA NEAR B.J. MARKET,POLICE CHOWKI,JALGAON-425001
//                     </p>
//                     </div>
//                 </div>

//                 {/* Back Side */}
//                 <div className="card-side card-back">
//                     <div className="instructions">
//                         <h3 style={
//                             {
//                                 backgroundColor: "#1587CE",
//                                 color:"whitesmoke",
//                                 fontSize: "13px",
//                                 textAlign: "center",
//                                 padding:"4px 0px",
//                                 fontFamily:"sans-serif"
//                             }
//                         }>Instructions</h3>
//                         <ol>
//                             <li>Schemes shall be cashless only for Jivit Healthcare cardholders.</li>
//                             <li>
//                                 This card is valid only for 27 acute and 5 major diseases as
//                                 defined by the Maharashtra Government.
//                             </li>
//                             <li>
//                                 This card is valid only in network hospitals of Jivit Healthcare
//                                 Pvt. Ltd.
//                             </li>
//                             <li>
//                                 OPD treatment is not covered under the scheme, and this card is
//                                 non-transferable.
//                             </li>
//                         </ol>
//                     </div>
//                     <div className="dependents">
//                         <h3 style={
//                             {
//                                 backgroundColor: "#1587CE",
//                                 color:"whitesmoke",
//                                 fontSize: "13px",
//                                 textAlign: "center",
//                                 padding:"4px 0px",
//                                 fontFamily:"sans-serif",
                               

//                             }
//                         }>Dependents</h3>
//                         <table classna>
//                             <thead>
//                                 <tr >
//                                     <th >Sr.No</th>
//                                     <th>Name</th>
//                                     <th>Gender</th>
//                                     <th>Age</th>
//                                     <th>Relation</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     family.map((e, i) => (
//                                         <tr key={i}>
//                                             <td>{i + 1}</td>
//                                             <td>{e.name}</td>
//                                             <td>{e.gender}</td>
//                                             <td>{e.age}</td>
//                                             <td>{e.relation}</td>
//                                         </tr>
//                                     ))
//                                 }
//                             </tbody>
//                         </table>
//                     </div>
//                     <div className="footerp">
//                         <p>Visit us at - www.jivithealthcare.in</p>
//                     </div>
//                 </div>
//             </div >
//             <button className="print-btn" onClick={handlePrint}>
//                 Print Card
//             </button>
//         </>
//     );
// }

// export default Card;





import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Card.css";
import logo from "../../Assets/jivitlogo.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Base_url } from "../../config/Config";

function Card() {
  const [data, setData] = useState({});
  const [family, setFamily] = useState([]);
  const printRef = useRef();
  const params = useParams();

  useEffect(() => {
    async function getData() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${Base_url}/api/benificiaries/${params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const emp = await response.json();
        setData(emp);
        setFamily(emp.benificiaryCardDependents || []);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, [params.id]);

const handlePrint = async () => {
     const cardFooter = printRef.current.querySelector(".card-footer");
      if (cardFooter) {
    cardFooter.style.border = "none";
  }
  const canvas = await html2canvas(printRef.current, {
    scale: 4,
    useCORS: true,
    backgroundColor: null,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [600, 220],
  });
  
  pdf.addImage(imgData, "PNG", 0, 0, 600, 220);
  pdf.save(`${data.fullName || "Jivit_Card"}.pdf`);
  if (cardFooter) {
    cardFooter.style.border = "none";
  }
};

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

  return (
    <>
      <div className="card" ref={printRef}>
        {/* FRONT */}
        <div className="card-front">
          <div className="card-info">
            <div className="info-left">
              <p><b>CARD NO </b> <span> :<span  style={{color:"red",fontWeight:"bold",fontSize:"11px"}}>{data.cardNo}</span> </span></p>
              <p><b>EMP NAME </b> <span>:<span style={{fontSize:"9px", fontWeight:"600"}} > {data.fullName}</span> </span></p>
              <p><b>DOB </b> <span>:<span>{formatDate(data.dateOfBirth)}</span> </span></p>
              <p><b>DEPT </b> <span>:<span> {data.departmentName}</span> </span></p>
              <p><b>LOCATION </b> <span>:<span>{data.departmentLocation}</span> </span></p>
              <p><b>DESIGNATION </b> <span>:<span> {data.designation}</span> </span></p>
            </div>

            <div className="info-right" style={{marginRight: "-35px"}}>
              <img src={logo} alt="Logo" className="card-logo" />
              <div style={{marginTop: "10px",marginLeft:"-10px"}}>
              <p><b>GENDER  </b> <span>: <span> {data.gender}</span></span></p>
              <p><b>DOI </b> <span> :<span> {formatDate(data.cardIssueDate)}</span></span></p>
              <p><b>DOR </b> <span>: <span>{formatDate(data.dateOfRetirement)}</span></span></p>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="helpline">
              <div style={{textAlign:"end"}}>Help Line:</div>
              <div style={{fontSize:"8px",textAlign:"end",fontWeight:"bolder"}}>9322006810, 9307633246</div>
              <div style={{fontSize:"8px",textAlign:"end",fontWeight:"bolder"}}>9021184557, 9665450999</div>
            </div>

            <p className="address">
              ADDR.: SHOP NO. 20, 1ST FLOOR, SACHI PLAZA,
              NEAR B.J. MARKET, 
              JALGAON-425001
            </p>
          </div>
        </div>

        {/* BACK */}
        <div className="card-back">
          <div className="instructions">
            <h3>INSTRUCTION</h3>
            <ol>
                             <li>Schemes shall be cashless only for Jivit Healthcare cardholders.</li>
                             <li>
                                 This card is valid only for 27 acute and 5 major diseases as
                                 defined by the Maharashtra Government.
                             </li>
                             <li>
                                 This card is valid only in network hospitals of Jivit Healthcare
                                 Pvt. Ltd.
                             </li>
                             <li>
                                 OPD treatment is not covered under the scheme, and this card is
                                 non-transferable.
                             </li>
                         </ol>
          </div>

          <div className="dependents">
            <h3>DEPENDENTS</h3>
            <table>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Relation</th>
                </tr>
              </thead>
              <tbody>
                {family.map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.name}</td>
                    <td>{e.gender}</td>
                    <td>{e.age}</td>
                    <td>{e.relation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="footerp">
            Visit us at - www.jivithealthcare.in
          </div>
        </div>
      </div>

      <button className="print-btn" onClick={handlePrint}>
        Print Card
      </button>
    </>
  );
}

export default Card;