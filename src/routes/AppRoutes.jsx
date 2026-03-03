import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Loader from "../components/common/Loader";
import NotFound from "../pages/common/NotFound";

const Login = lazy(() => import("../pages/auth/Login"));
const OTPVerification = lazy(() => import("../pages/auth/OTPVerification"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const QuotationList = lazy(() => import("../pages/eservices/QuotationList"));
const PolicyList = lazy(() => import("../pages/eservices/PolicyList"));
const Reports = lazy(() => import("../pages/reports/Reports"));
const RateMaster = lazy(() => import("../pages/masters/RateMaster"));
const PolicyLogin = lazy(() => import("../pages/eservices/PolicyLogin"));
const MarineInsurence = lazy(() => import("../pages/marine-insurence/MarineInsurance"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTPVerification />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/eservices/quotations" element={<QuotationList />} />
            <Route path="/eservices/policies" element={<PolicyList />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/masters/rate-master" element={<RateMaster />} />
            <Route
              path="/eservices/policy-login/:type"
              element={<PolicyLogin />}
            />

                        <Route
              path="/MaineQuotation"
              element={<MarineInsurence />}
            />
          </Route>
          

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
