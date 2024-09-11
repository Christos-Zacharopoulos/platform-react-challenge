import { useState, useEffect, useCallback } from "react";
import { Image } from "../api/images/types";
import api from "../api";

const useImages = () => {
  const [state, setState] = useState<{
    data: Image[];
    error: boolean;
    loading: boolean;
  }>({
    data: [],
    error: false,
    loading: false,
  });

  const fetchImages = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true, error: false }));
    try {
      const response = await api.images.batch.get();

      setState((prevState) => ({
        ...prevState,
        data: [...prevState.data, ...response.data],
        loading: false,
      }));
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: true,
        loading: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
    fetchImages,
  };
};

export default useImages;
