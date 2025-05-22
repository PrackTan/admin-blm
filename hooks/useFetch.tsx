import { useEffect, useState } from "react";
interface UseFetchProps {
  endpoint: string;
  options: RequestInit;
}
const useFetch = ({ endpoint, options }: UseFetchProps) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(endpoint, options);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [data, endpoint, JSON.stringify(options)]);
  return { data, error, loading };
};

export default useFetch;
