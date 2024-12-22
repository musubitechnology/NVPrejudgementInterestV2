export const formatForSpreadsheet = (
  principal: number,
  interest: number,
  total: number,
  breakdownPeriods: any[]
): string => {
  const header = ['Period Start', 'Period End', 'Days', 'Rate (%)', 'Interest ($)'].join('\t');
  
  const summary = [
    `Principal Amount:\t$${principal.toFixed(2)}`,
    `Total Interest:\t$${interest.toFixed(2)}`,
    `Total Amount:\t$${total.toFixed(2)}`,
    ''
  ].join('\n');

  const breakdown = breakdownPeriods.map(period => {
    return [
      new Date(period.startDate).toLocaleDateString(),
      new Date(period.endDate).toLocaleDateString(),
      period.daysInPeriod,
      period.rate,
      period.interestForPeriod.toFixed(2)
    ].join('\t');
  }).join('\n');

  return `${summary}${header}\n${breakdown}`;
};