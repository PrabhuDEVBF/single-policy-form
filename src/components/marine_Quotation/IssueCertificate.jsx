import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPrint, FaPlus,FaSearch,FaTimes   } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/img/logo/logo-orient.png";
import Swal from "sweetalert2";
import IssueCertificateForm from "../IssueCertificate/IssueCertificateForm"
import Header from "../layout/Header"
const IssueCertificate = () => {

  const { policyNo } = useParams();
  const navigate = useNavigate();

const policy = {
  policyNo: policyNo,
  companyName: "شركة القطر الوطنية القابضة",

  // Premium Details
  minimumPremium: "10000.00",
  depositAmount: "10000.00",
  availablePremium: "5123.00",

  // Dates
  startDate: "13-02-2026",
  expiryDate: "12-02-2028",

  // Shipment
  modeOfShipment: "SEA",
  fromPort: "Bombai",
  fromCountry: "India",
  toPort: "Fujairah",
  toCountry: "UAE",

  //  Customer Details (NEW)
  clientName: "ABC Trading LLC",
  clientId: "CUST-10234",
  clientEmail: "abc@trading.com",
  clientMobile: "+971987654321",
  clientCountry: "UAE",
  clientAddress: "Dubai Industrial Area, UAE"
};

  const [certificateList, setCertificateList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [loading, setLoading] = useState(false);

// pagination 
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;


// BALANCE CALCULATION
const totalUsed = certificateList.reduce(
  (sum, item) => sum + item.premium,
  0
);

const balance = Number(policy.availablePremium) - totalUsed;

  useEffect(() => {

    const data = [
      {
        id: 1,
        certificateNo: "CERT-103",
        date: "10-03-2026",
        shipment: "Air",
        material:"Battery",
        premium: 100
      },
      {
        id: 2,
        certificateNo: "CERT-101",
        date: "05-03-2026",
        shipment: "Sea",
        material:"aluminium",
        premium: 200
      }
    ];

    setCertificateList(data);

  }, []);

const filteredCertificates = certificateList.filter((item) =>
  item.certificateNo
    ?.toLowerCase()
    .includes(appliedSearch.toLowerCase())
);
const handleSearch = () => {
  setLoading(true);
  setTimeout(() => {
    setAppliedSearch(searchText);
    setCurrentPage(1); 
    setLoading(false);
  }, 500);
};
const handleClear = () => {
  setSearchText("");
  setAppliedSearch("");
  setCurrentPage(1); 
};
const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;

const currentData = filteredCertificates.slice(indexOfFirst, indexOfLast);
const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result);
  });
};

const handleDownloadPDF = async (item) => {

  const doc = new jsPDF();

  const logoBase64 = await getBase64FromUrl(logo);

  //  BORDER
  doc.setDrawColor(0);
  doc.rect(5, 5, 200, 287);

  //  WATERMARK (light center logo)
doc.saveGraphicsState();
doc.setGState(new doc.GState({ opacity: 0.05 }));
doc.addImage(logoBase64, "PNG", 60, 100, 90, 90);
doc.restoreGraphicsState();

  //  LOGO
  doc.addImage(logoBase64, "PNG", 12, 10, 35, 18);

  //  TITLE
  doc.setFontSize(18);
  doc.setFont(undefined, "bold");
  doc.text("ISSUE CERTIFICATE", 105, 20, { align: "center" });

  //  COMPANY NAME
  // doc.setFontSize(11);
  // doc.setFont(undefined, "normal");
  // doc.text(policy.companyName, 105, 28, { align: "center" });

  //  LINE
  doc.setLineWidth(0.5);
  doc.line(10, 32, 200, 32);

  //  POLICY DETAILS (LEFT / RIGHT)
  doc.setFontSize(10);

  doc.text(`Policy No: ${policy.policyNo}`, 12, 45);
  doc.text(`Start Date: ${policy.startDate}`, 140, 45);

  doc.text(`Expiry Date: ${policy.expiryDate}`, 12, 55);
  doc.text(`Mode: ${policy.modeOfShipment}`, 140, 55);

  doc.text(`From: ${policy.fromPort}, ${policy.fromCountry}`, 12, 65);
  doc.text(`To: ${policy.toPort}, ${policy.toCountry}`, 140, 65);

  // 🔹 TABLE
  autoTable(doc, {
    startY: 80,
    head: [["Field", "Details"]],
    body: [
      ["Certificate No", item.certificateNo],
      ["Date", item.date],
      ["Shipment", item.shipment],
      ["Material", item.material],
      ["Premium", item.premium.toLocaleString()],
    ],
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [0, 102, 153],
      textColor: 255,
      halign: "center",
    },
  });

  const finalY = doc.lastAutoTable.finalY + 25;

  // 🔹 FOOTER
  doc.setFontSize(9);
  doc.text(
    "This is a system generated certificate. No signature required.",
    105,
    280,
    { align: "center" }
  );

  // 🔹 SAVE
  doc.save(`${item.certificateNo}.pdf`);
};

  return (
        <div className="d-flex flex-column vh-100 bg-light">
      <Header />
<div className="compact-ui">
    <div className="d-flex flex-column vh-100 bg-light">

    {!showForm && (
      <div className="container-fluid p-4">

        <div className="card shadow-sm border-0">

          {/* Header */}
          <div className="card-header bg-primary bg-opacity-10 d-flex align-items-center">

            <button
              className="btn btn-sm btn-outline-primary me-3"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
            </button>

            <h5 className="mb-0 fw-semibold text-primary">
              Policy Details
            </h5>

          </div>

          <div className="card-body">

<div className="card shadow-sm border-0 mb-4">
  <div className="card-body">

    <div className="row">

      {/* Client Section */}
      <div className="col-md-4 border-end">

        <h6 className="fw-bold text-primary mb-2"><i className="fas fa-user"></i> Client Details</h6>
        <small className="text-muted d-block mb-3">
          Customer information
        </small>

        <div className="row mb-2">
          <div className="col-6 text-muted">Client Name</div>
          <div className="col-6 fw-semibold">{policy.clientName}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">Client ID</div>
          <div className="col-6 fw-semibold">{policy.clientId}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">Email</div>
          <div className="col-6 fw-semibold">{policy.clientEmail}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">Mobile</div>
          <div className="col-6 fw-semibold">{policy.clientMobile}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">Country</div>
          <div className="col-6 fw-semibold">{policy.clientCountry}</div>
        </div>

      </div>

      {/* Policy Section */}
      <div className="col-md-4 border-end">

        <h6 className="fw-bold text-primary mb-2"><i className="fas fa-file-alt"></i> Policy Details</h6>
        <small className="text-muted d-block mb-3">
          Policy and premium information
        </small>

        <div className="row mb-2">
          <div className="col-6 text-muted">Policy No</div>
          <div className="col-6 fw-semibold">{policy.policyNo}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">Company</div>
          <div className="col-6 fw-semibold">{policy.companyName}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">Deposited</div>
          <div className="col-6 fw-semibold">
            ₹ {Number(policy.minimumPremium).toLocaleString()}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">Available</div>
          <div className="col-6 fw-semibold text-success">
            ₹ {Number(policy.availablePremium).toLocaleString()}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">Start</div>
          <div className="col-6 fw-semibold">{policy.startDate}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">Expiry</div>
          <div className="col-6 fw-semibold">{policy.expiryDate}</div>
        </div>

      </div>

      {/* Shipment Section */}
      <div className="col-md-4">

        <h6 className="fw-bold text-primary mb-2"><i className="fas fa-ship"></i> Shipment Details</h6>
        <small className="text-muted d-block mb-3">
          Shipment / voyage information
        </small>

        <div className="row mb-2">
          <div className="col-6 text-muted">Mode</div>
          <div className="col-6 fw-semibold">{policy.modeOfShipment}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">From Country</div>
          <div className="col-6 fw-semibold">{policy.fromCountry}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">To Country</div>
          <div className="col-6 fw-semibold">{policy.toCountry}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">From Port</div>
          <div className="col-6 fw-semibold">{policy.fromPort}</div>
        </div>

        <div className="row mb-2">
          <div className="col-6 text-muted">To Port</div>
          <div className="col-6 fw-semibold">{policy.toPort}</div>
        </div>

      </div>

    </div>

  </div>
</div>


{/* Certificate List */}
<div className="card shadow-sm border-0 mt-4">

  <div className="card-header bg-primary bg-opacity-10 d-flex justify-content-between align-items-center">

    <h5 className="mb-0 fw-semibold text-primary">
      Issue Certificate List
    </h5>

    <div className="d-flex gap-2">

      {/*  Add Button */}
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setShowForm(true)}
      >
        <FaPlus className="me-1" />
        New Issue Certificate
      </button>

    </div>

  </div>
{/*  Search Panel */}
<div className="card mb-3 border-0 shadow-sm">
  <div className="card-body py-3">

    <div className="row align-items-end g-3">

      {/* Certificate No */}
      <div className="col-md-3">
        <label className="form-label fw-semibold">
          Certificate No
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Certificate No"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="col-md-3 d-flex gap-2">

        {/*  Search */}
        <button className="btn btn-primary"
        onClick={handleSearch}
        >
          <FaSearch />
        </button>

        {/*  Clear */}
        <button
          className="btn btn-outline-secondary"
          onClick={handleClear}
        >
          <FaTimes />
        </button>

      </div>

    </div>

  </div>
</div>
  <div className="card-body p-1">
    <div className="table-responsive">

      <table className="table table-sm table-striped table-bordered align-middle">

        <thead className="policy-table-header">
          <tr>
            <th>#</th>
            <th>Certificate No</th>
            <th>Date</th>
            <th>Shipment</th>
            <th>Material</th>
            <th>Premium</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

<tbody>

  {loading ? (
    <tr>
      <td colSpan="7" className="text-center py-4">
        <div className="spinner-border text-primary" />
      </td>
    </tr>
  ) : currentData.length > 0 ? (
    currentData.map((item, index) => (
      <tr key={item.id}>
        <td>{indexOfFirst + index + 1}</td>
        <td>{item.certificateNo}</td>
        <td>{item.date}</td>
        <td>{item.shipment}</td>
        <td>{item.material}</td>
        <td>{Number(item.premium).toLocaleString()}</td>

        <td className="text-center">
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => handleDownloadPDF(item)}
          >
            <FaPrint className="me-1" />
            Print
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center text-muted py-3">
        No certificates found
      </td>
    </tr>
  )}

</tbody>
      </table>

    </div>
    <div className="d-flex justify-content-end align-items-center mt-2 gap-2">

    <button
      className="btn btn-sm btn-outline-secondary"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
    >
      Prev
    </button>

<span className="badge bg-primary px-3 py-2">
  {currentPage}
</span>

    <button
      className="btn btn-sm btn-outline-secondary"
      disabled={indexOfLast >= filteredCertificates.length}
      onClick={() => setCurrentPage((prev) => prev + 1)}
    >
      Next
    </button>

  </div>
  </div>

</div>

          </div>

        </div>

      </div>
 )}
      {/* New Certificate Form */}
{showForm && (
  <IssueCertificateForm
    policy={policy}
    balance={balance}
    onClose={() => setShowForm(false)}
    onSave={(data) => {

  const totalPremium = data.RiskAdds.reduce(
    (sum, r) => sum + r.mrgTotalMRPremium,
    0
  );

  if (totalPremium > balance) {
    Swal.fire("Error", "Deposit exceeded", "error");
    return;
  }

  const newCert = {
    id: Date.now(),
    certificateNo: "CERT-" + Date.now(),
    date: new Date().toLocaleDateString(),
    shipment: policy.modeOfShipment,
    // material: data.RiskAdds[0]?.fmaterialcatagory || "N/A",
    material: data.RiskAdds
  .map(r => r.fmaterialcatagory)
  .filter(Boolean)
  .join(", "),
    premium: totalPremium
  };

  setCertificateList((prev) => [...prev, newCert]);
  setShowForm(false);
}}
  />
)}

    </div>
    </div>
      </div>
  );
};

export default IssueCertificate;