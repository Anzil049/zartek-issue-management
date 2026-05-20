import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { IssueDetailPage } from '../pages/IssueDetailPage';
import { IssuesPage } from '../pages/IssuesPage';
import { NewIssuePage } from '../pages/NewIssuePage';

export const AppRoutes = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route index element={<Navigate to="/issues" replace />} />
      <Route path="/issues" element={<IssuesPage />} />
      <Route path="/issues/new" element={<NewIssuePage />} />
      <Route path="/issues/:id" element={<IssueDetailPage />} />
    </Route>
  </Routes>
);
