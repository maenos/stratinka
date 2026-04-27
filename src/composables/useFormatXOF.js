export function useFormatXOF() {
  const formatXOF = (amount) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      maximumFractionDigits: 0,
    }).format(Number(amount || 0))

  return { formatXOF }
}
