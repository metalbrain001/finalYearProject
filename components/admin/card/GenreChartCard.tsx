// // src/client/components/dashboard/DashboardChartCard.tsx
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface DashboardChartCardProps {
  title: string;
  chartType: "bar" | "line" | "area" | "pie";
  data: ChartData;
  options?: Record<string, any>;
}

const DashboardChartCard: React.FC<DashboardChartCardProps> = ({
  title,
  chartType,
  data,
  options,
}) => {
  const chartData = data.labels.map((label, idx) => {
    const entry: any = { label };
    data.datasets.forEach((dataset) => {
      entry[dataset.label] = dataset.data[idx];
    });
    return entry;
  });

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.datasets.map((dataset, index) => (
                <Bar
                  key={index}
                  dataKey={dataset.label}
                  fill={dataset.backgroundColor}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.datasets.map((dataset, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={dataset.label}
                  stroke={dataset.borderColor}
                  strokeWidth={dataset.borderWidth}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                {data.datasets.map((dataset, index) => (
                  <linearGradient
                    key={index}
                    id={`color${dataset.label}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={dataset.backgroundColor}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={dataset.backgroundColor}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              {data.datasets.map((dataset, index) => (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={dataset.label}
                  stroke={dataset.borderColor}
                  fill={`url(#color${dataset.label})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return <div className="text-red-500">Chart type not supported</div>;
    }
  };

  return (
    <Card className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default DashboardChartCard;
