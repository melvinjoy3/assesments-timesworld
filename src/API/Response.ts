export const getCountries = async () => {
  const response = await fetch(
    "https://restcountries.com/v2/all?fields=name,region,flag"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  const data = await response.json();
  return data;
};
