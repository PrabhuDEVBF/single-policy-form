import React, { useState } from "react";
import Header from "../../components/layout/Header";
import { FaSearch, FaEye, FaTimes, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {GetOpenCoverPolicies} from "../../services/api"
const PolicyList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [policies, setPolicies] = useState([]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = policies.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(policies.length / rowsPerPage);

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    policyNumber: "",
    nationalId: "",
    customerName: "",
    clientId: ""
  });

  //const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSearch = () => {

    if (
      !filters.policyNumber &&
      !filters.nationalId &&
      !filters.customerName &&
      !filters.clientId
    ) return;

    setLoading(true);
    setSearched(true);
    setCurrentPage(1);
    setTimeout(() => {

      const result = [
        {
          policyNo: "PM-20260212-000001",
          clientId: "001",
          nationalId: "7001847451",
          fullName: "Doha Trading Company",

          depositAmount: 120000,
          availableDeposit: 20000,

          expiry: "12-02-2028",

          materials: [
            { materialName: "Steel" },
            { materialName: "Cement" }
          ]
        },
        {
          policyNo: "PM-20260212-000002",
          clientId: "001",
          nationalId: "7001847451",
          fullName: "Doha Trading Company",

          depositAmount: 95000,
          availableDeposit: 15000,

          expiry: "05-03-2028",

          materials: [
            { materialName: "Machinery" }
          ]
        },
        {
          policyNo: "PM-20260212-000003",
          clientId: "001",
          nationalId: "7001847451",
          fullName: "Doha Trading Company",

          depositAmount: 110000,
          availableDeposit: 10000,

          expiry: "20-05-2028",

          materials: [
            { materialName: "Electronics" },
            { materialName: "Furniture" }
          ]
        },
        {
          policyNo: "PM-20260212-000004",
          clientId: "002",
          nationalId: "7001847452",
          fullName: "Al Noor Construction",

          depositAmount: 175000,
          availableDeposit: 25000,

          expiry: "18-04-2027",

          materials: [
            { materialName: "Steel" },
            { materialName: "Concrete" }
          ]
        },
        {
          policyNo: "PM-20260212-000005",
          clientId: "002",
          nationalId: "7001847452",
          fullName: "Al Noor Construction",

          depositAmount: 86000,
          availableDeposit: 10000,

          expiry: "22-01-2028",

          materials: [
            { materialName: "Pipes" }
          ]
        },
        {
          policyNo: "PM-20260212-000006",
          clientId: "002",
          nationalId: "7001847452",
          fullName: "Al Noor Construction",

          depositAmount: 91000,
          availableDeposit: 5000,

          expiry: "15-06-2028",

          materials: [
            { materialName: "Cables" }
          ]
        },
        {
          policyNo: "PM-20260212-000007",
          clientId: "003",
          nationalId: "7001847453",
          fullName: "Qatar Industrial Group",

          depositAmount: 400000,
          availableDeposit: 400000,

          expiry: "12-02-2028",

          materials: [
            { materialName: "Heavy Machinery" }
          ]
        },
        {
          policyNo: "PM-20260212-000008",
          clientId: "003",
          nationalId: "7001847453",
          fullName: "Qatar Industrial Group",

          depositAmount: 220000,
          availableDeposit: 50000,

          expiry: "10-07-2027",

          materials: [
            { materialName: "Spare Parts" }
          ]
        },
        {
          policyNo: "PM-20260212-000009",
          clientId: "003",
          nationalId: "7001847453",
          fullName: "Qatar Industrial Group",

          depositAmount: 300000,
          availableDeposit: 75000,

          expiry: "09-09-2028",

          materials: [
            { materialName: "Industrial Tools" }
          ]
        },
        {
          policyNo: "PM-20260212-000010",
          clientId: "004",
          nationalId: "7001847454",
          fullName: "Gulf Marine Services",

          depositAmount: 150000,
          availableDeposit: 20000,

          expiry: "30-12-2027",

          materials: [
            { materialName: "Marine Equipment" }
          ]
        }
      ];

      const filtered = result.filter((item) => {
        return (
          (!filters.policyNumber || item.policyNo.includes(filters.policyNumber)) &&
          (!filters.nationalId || item.nationalId.includes(filters.nationalId)) &&
          (!filters.customerName || item.fullName.toLowerCase().includes(filters.customerName.toLowerCase())) &&
          (!filters.clientId || item.clientId.includes(filters.clientId))
        );
      });

      setPolicies(filtered);
      setLoading(false);

    }, 1000);
  };

  const clearSearch = () => {

    setFilters({
      policyNumber: "",
      nationalId: "",
      customerName: "",
      clientId: ""
    });

    setPolicies([]);
    setSearched(false);

  };

  return (

    <div className="d-flex flex-column vh-100 bg-light">

      <Header />
<div className="compact-ui">
      <div className="container-fluid p-4">

        <div className="card shadow-sm border-0">

          <div className="card-header bg-primary bg-opacity-10 d-flex align-items-center justify-content-between">

            <div className="d-flex align-items-center">

              <button
                className="btn btn-sm btn-outline-primary me-3"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft />
              </button>

              <div
                className="me-2 bg-primary rounded"
                style={{ width: "4px", height: "24px" }}
              ></div>

              <h5 className="mb-0 fw-semibold text-primary">
                Policy List
              </h5>

            </div>

          </div>

          <div className="card-body">

            {/* SEARCH */}

            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className="nav-link active fw-semibold"
                  data-bs-toggle="tab"
                  data-bs-target="#policySearchTab"
                >
                  Policy Search
                </button>
              </li>
            </ul>

            <div className="row g-3 mb-4">

              <div className="col-md-2">

                <label className="form-label fw-semibold">
                  Client ID
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="clientId"
                  value={filters.clientId}
                  onChange={handleChange}
                  placeholder="Enter Client ID"
                />

              </div>
              <div className="col-md-2">

                <label className="form-label fw-semibold">
                  Customer Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="customerName"
                  value={filters.customerName}
                  onChange={handleChange}
                  placeholder="Enter Customer Name"
                />

              </div>
              <div className="col-md-2">

                <label className="form-label fw-semibold">
                  National ID / CR
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="nationalId"
                  value={filters.nationalId}
                  onChange={handleChange}
                  placeholder="Enter National ID"
                />

              </div>
              <div className="col-md-2">

                <label className="form-label fw-semibold">
                  Policy Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="policyNumber"
                  value={filters.policyNumber}
                  onChange={handleChange}
                  placeholder="Enter Policy Number"
                />

              </div>




              <div className="col-md-3 d-flex align-items-end gap-2">

                <button
                  className="btn btn-primary px-4"
                  onClick={handleSearch}
                >
                  <FaSearch />
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={clearSearch}
                >
                  <FaTimes />
                </button>

              </div>

            </div>


            {/* LOADING */}

            {loading && (
              <div className="text-center p-4">
                <div className="spinner-border text-primary" />
              </div>
            )}


            {/* RESULT TABLE */}

            {!loading && policies.length > 0 && (

              <div className="table-responsive">

                <table className="table table-sm table-striped table-bordered align-middle">

                  <thead className="policy-table-header">

                    <tr>
                      <th>S.No</th>
                      <th>Policy No</th>
                      <th>Deposit Amount</th>
                      <th>Available Deposit</th>
                      <th>Materials</th>
                      <th>Expiry</th>
                      <th className="text-center">Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {currentRows.map((p, i) => (
                      <tr key={i}>

                        <td>{indexOfFirstRow + i + 1}</td>

                        <td className="fw-semibold text-primary">
                          {p.policyNo}
                        </td>

                        {/* Deposit */}
                        <td className="fw-semibold">
                          {p.depositAmount?.toLocaleString()}
                        </td>

                        {/* Available */}
                        <td className="text-danger fw-semibold">
                          {p.availableDeposit?.toLocaleString()}
                        </td>

                        {/* Materials */}
                        <td>
                          {p.materials && p.materials.length > 0
                            ? p.materials.map(m => m.materialName).join(", ")
                            : <span className="text-muted">N/A</span>
                          }
                        </td>

                        <td>{p.expiry}</td>

                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              navigate(`/policy-details/${p.policyNo}`, { state: p })
                            }
                          >
                            <FaEye />
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

                {/* Pagination same as yours */}

                <div className="d-flex justify-content-end mt-3">
                  <nav>
                    <ul className="pagination pagination-sm mb-0">

                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          Prev
                        </button>
                      </li>

                      {[...Array(totalPages)].map((_, i) => (
                        <li
                          key={i}
                          className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>

                    </ul>
                  </nav>
                </div>

              </div>

            )}

            {/* NO RESULT */}

            {!loading && searched && policies.length === 0 && (

              <div className="text-center text-muted p-3">

                No Policy Found <br></br>
                <i className="fas fa-inbox fa-2x mb-2"></i>
              </div>

            )}

          </div>

        </div>

      </div>
</div>
    </div>

  );
};

export default PolicyList;