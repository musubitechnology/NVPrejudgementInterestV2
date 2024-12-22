import React from 'react';
import { InterestPeriod } from '../utils/interestRates';

interface BreakdownPeriod extends InterestPeriod {
  daysInPeriod: number;
  interestForPeriod: number;
}

interface Props {
  breakdownPeriods: BreakdownPeriod[];
}

export default function InterestBreakdown({ breakdownPeriods }: Props) {
  if (breakdownPeriods.length === 0) return null;

  return (
    <div className="mt-6 overflow-x-auto">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Interest Calculation Breakdown</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Days</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Rate</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Interest</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {breakdownPeriods.map((period, index) => (
            <tr key={index} className="text-sm">
              <td className="px-4 py-2 text-gray-600">
                {new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-right text-gray-600">
                {period.daysInPeriod}
              </td>
              <td className="px-4 py-2 text-right text-gray-600">
                {period.rate}%
              </td>
              <td className="px-4 py-2 text-right text-gray-600">
                ${period.interestForPeriod.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}