import { interestRates } from '../data/interestRates';

export interface InterestPeriod {
  startDate: string;
  endDate: string;
  rate: number;
}

export interface CalculationResult {
  totalInterest: number;
  breakdownPeriods: {
    startDate: string;
    endDate: string;
    rate: number;
    daysInPeriod: number;
    interestForPeriod: number;
  }[];
}

export const calculateInterest = (
  principal: number,
  startDate: Date,
  endDate: Date
): CalculationResult => {
  let totalInterest = 0;
  const periods = getApplicablePeriods(startDate, endDate);
  const breakdownPeriods = [];

  for (const period of periods) {
    const periodStart = new Date(Math.max(startDate.getTime(), new Date(period.startDate).getTime()));
    const periodEnd = new Date(Math.min(endDate.getTime(), new Date(period.endDate).getTime()));
    const daysInPeriod = (periodEnd.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24);
    const yearFraction = daysInPeriod / 365;
    const interestForPeriod = principal * (period.rate / 100) * yearFraction;
    
    totalInterest += interestForPeriod;
    breakdownPeriods.push({
      ...period,
      daysInPeriod: Math.round(daysInPeriod),
      interestForPeriod
    });
  }

  return {
    totalInterest,
    breakdownPeriods
  };
};

const getApplicablePeriods = (startDate: Date, endDate: Date): InterestPeriod[] => {
  return interestRates.filter(period => {
    const periodStart = new Date(period.startDate);
    const periodEnd = new Date(period.endDate);
    return periodStart <= endDate && periodEnd >= startDate;
  });
};