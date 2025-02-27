import { useMemo } from "react";
import { DollarSign } from "lucide-react"; // Example icon, replace based on actual setup

// ✅ Function to determine currency from country code
const getCurrencyByCountry = (countryCode: string): string => {
  const currencyMap: { [key: string]: string } = {
    US: "USD",
    GB: "GBP",
    FR: "EUR",
    DE: "EUR",
    IN: "INR",
    CN: "CNY",
    JP: "JPY",
    KR: "KRW",
    CA: "CAD",
    AU: "AUD",
    BR: "BRL",
    MX: "MXN",
    RU: "RUB",
    SA: "SAR",
  };
  return currencyMap[countryCode] || "USD"; // Default to USD if country is unknown
};

const BudgetDisplay = ({
  budget,
  productionCountries,
}: {
  budget?: number;
  productionCountries?: { iso_3166_1: string }[];
}) => {
  // ✅ Get the first production country for currency
  const currencyCode = useMemo(() => {
    return productionCountries?.length
      ? getCurrencyByCountry(productionCountries[0].iso_3166_1)
      : "USD"; // Default to USD
  }, [productionCountries]);

  // ✅ Format budget dynamically based on currency
  const formattedBudget = useMemo(() => {
    if (!budget) return null;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(budget);
  }, [budget, currencyCode]);

  return (
    <>
      {formattedBudget ? (
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-lg font-poppins">
            Budget: {formattedBudget} ({currencyCode})
          </span>
        </div>
      ) : (
        <span className="text-gray-500 italic">Budget not available</span>
      )}
    </>
  );
};

export default BudgetDisplay;
