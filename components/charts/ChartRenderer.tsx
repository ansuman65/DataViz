'use client';

import React from 'react';
import { ChartConfig, DataPoint } from '../../lib/types';
import LineChart from './LineChart';
import BarChart from './BarChart';
import ScatterPlot from './ScatterPlot';
import Heatmap from './Heatmap';

interface Props {
  config: ChartConfig;
  data: DataPoint[];
}

export default function ChartRenderer({ config, data }: Props) {
  switch (config.type) {
    case 'line':
      return <LineChart data={data} color={config.color} />;
    case 'bar':
      return <BarChart data={data} color={config.color} />;
    case 'scatter':
      return <ScatterPlot data={data} color={config.color} />;
    case 'heatmap':
      return <Heatmap data={data} color={config.color} />;
    default:
      return null;
  }
}
