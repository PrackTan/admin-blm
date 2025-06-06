import { useState } from "react";

import { useEffect } from "react";

interface Review {
  _id: string;
  comment: string;
  rating: number;
  reply: string;
  sku: string;
}

const usePagedReviews = (page: number, limit: number) => {
  const [state, setState] = useState<{
    reviews: Review[];
    totalPages: number;
    loading: boolean;
    error?: string;
  }>({ reviews: [], totalPages: 1, loading: true });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));

    fetch(
      `http://localhost:8080/api/v1/reviews?current=${page}&pageSize=${limit}`
    )
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        setState({
          reviews: json.result,
          totalPages: json.meta.totalPages,
          loading: false,
        });
      })
      .catch(
        (err) =>
          !cancelled &&
          setState({
            reviews: [],
            totalPages: 1,
            loading: false,
            error: err.message,
          })
      );

    return () => {
      cancelled = true;
    };
  }, [page, limit]);

  return state;
};
export default usePagedReviews;
