import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Transport', value: 30, color: '#6366F1' },
  { name: 'Hotel', value: 60, color: '#22C55E' },
  { name: 'Other', value: 10, color: '#F97316' },
];

export const ExpenseChart: React.FC = () => {
  return (
    <div className="h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={70}
            dataKey="value"
            label={false}
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend 
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => {
              return <span className="text-sm text-gray-700">{value}</span>;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center gap-6 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};