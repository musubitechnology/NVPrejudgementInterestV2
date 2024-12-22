import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, ExternalLink } from 'lucide-react';
import { calculateInterest } from '../utils/interestRates';
import { formatForSpreadsheet } from '../utils/clipboard';
import { formatCurrency, unformatCurrency } from '../utils/numberFormat';
import InterestBreakdown from './InterestBreakdown';
import CopyToClipboard from './CopyToClipboard';

export default function Calculator() {
  const [principal, setPrincipal] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [interest, setInterest] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [breakdownPeriods, setBreakdownPeriods] = useState<any[]>([]);

  useEffect(() => {
    if (principal && startDate && endDate) {
      const principalAmount = parseFloat(unformatCurrency(principal));
      const result = calculateInterest(
        principalAmount,
        new Date(startDate),
        new Date(endDate)
      );
      setInterest(result.totalInterest);
      setTotal(principalAmount + result.totalInterest);
      setBreakdownPeriods(result.breakdownPeriods);
    }
  }, [principal, startDate, endDate]);

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setPrincipal(formatted);
  };

  const handleCopy = async () => {
    const formattedData = formatForSpreadsheet(
      parseFloat(unformatCurrency(principal) || '0'),
      interest,
      total,
      breakdownPeriods
    );
    await navigator.clipboard.writeText(formattedData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <CalculatorIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          Nevada Prejudgment Interest Calculator
        </h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Principal Amount ($)
          </label>
          <input
            type="text"
            value={principal}
            onChange={handlePrincipalChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Principal Amount:</span>
              <span className="font-semibold">
                ${principal || '0.00'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Interest Amount:</span>
              <span className="font-semibold text-blue-600">
                ${interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">Total Amount:</span>
                <span className="text-lg font-bold text-green-600">
                  ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <InterestBreakdown breakdownPeriods={breakdownPeriods} />

          <div className="mt-4 flex justify-center">
            <CopyToClipboard onCopy={handleCopy} />
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">About This Calculator</h3>
          <p className="text-sm text-blue-600">
            This calculator computes prejudgment interest according to Nevada Revised Statutes (NRS) § 17.130 (2023). 
            The interest rate is based on the prime rate at the largest bank in Nevada on January 1 or July 1 
            immediately preceding the date of judgment, plus 2%.
          </p>
        </div>

        <div className="mt-4 text-center">
          <a 
            href="https://www.washoecourts.com/TopRequests/InterestRates" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            See prime rates here <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}