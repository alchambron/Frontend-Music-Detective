export default async function useFetch(url, settings) {
  const response = await fetch(url, settings);
  const data = await response.json();
  return data;
}
