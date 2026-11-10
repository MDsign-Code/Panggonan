export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount).replace(/\s+/g, ' ');
};

export const formatShortTime = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return dateStr;
  }
};

export const getElapsedMinutes = (dateStr: string): number => {
  try {
    const past = new Date(dateStr).getTime();
    const now = Date.now();
    return Math.max(0, Math.floor((now - past) / (1000 * 60)));
  } catch {
    return 0;
  }
};
