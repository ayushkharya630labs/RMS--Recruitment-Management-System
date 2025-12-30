import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import JobCreate from "./pages/JobCreation/JobCreate";
import JobList from "./pages/JobCreation/JobList";
import JobParsedSummary from "./pages/JobCreation/JobParsedSummary";
// CV Analysis
import CvUpload from "./pages/CvAnalysis/CvUpload";
import CvParsedResult from "./pages/CvAnalysis/CvParsedResult";
import CandidateList from "./pages/CandidateDatabase/CandidateList";
import Branding from "./pages/CandidateSubmission/Branding";
import ExcelConsolidation from "./pages/CandidateSubmission/ExcelConsolidation";
import EmailDraft from "./pages/CandidateSubmission/EmailDraft";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
            <Route path="/jobs/create" element={<JobCreate  />} />
            <Route path="/jobs/list" element={<JobList  />} />
            <Route path="/jobs/parsed-summary" element={<JobParsedSummary />} />
              <Route path="cv-analysis/upload" element={<CvUpload />} />
          <Route path="cv-analysis/parsed" element={<CvParsedResult />} />
          <Route path="/candidates" element={<CandidateList />} />
          <Route path="/submission/branding" element={<Branding />} />
<Route path="/submission/excel" element={<ExcelConsolidation />} />
<Route path="/submission/email" element={<EmailDraft />} />


        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
