// app/dashboard/page.tsx
'use client';

import React from 'react';
import DataProvider from '../../components/providers/DataProvider';
import DashboardShell from '../../components/ui/DashboardShell';

export default function DashboardPage() {
  return (
    <DataProvider>
      <DashboardShell />
    </DataProvider>
  );
}
