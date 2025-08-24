import { useState, useCallback, useEffect } from "react";
import { dummyColors, simulateApiDelay } from "@/data/dummyProductData";

const useGetAllColors = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllColors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Since there's no direct endpoint for all colors, we'll use fallback colors
      // You can replace this with actual API call when the endpoint is available
      
      // For now, using hardcoded colors as the API doesn't have a bulk colors endpoint
      await simulateApiDelay(500);
      setColors(dummyColors);
      
      return { status: 200, data: { content: dummyColors } };
    } catch (err) {
      console.error("Error fetching colors:", err);
      setError(err);
      
      // Fallback to hardcoded colors if anything fails
      setColors(dummyColors);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllColors();
  }, [fetchAllColors]);

  return { colors, loading, error, refetch: fetchAllColors };
};

export default useGetAllColors;
