import { useState, useEffect, useCallback } from "react";
import { Image, ImagePerBreed } from "../api/images/types";
import api from "../api";

const useImage = (id?: Image["id"]) => {
  const [state, setState] = useState<{
    data: ImagePerBreed | null;
    error: boolean;
    loading: boolean;
  }>({
    data: null,
    error: false,
    loading: false,
  });

  const fetchImage = useCallback(async (id: Image["id"]) => {
    setState((prevState) => ({ ...prevState, loading: true, error: false }));
    try {
      const response = await api.images.single.get(id);

      setState((prevState) => ({
        ...prevState,
        data: response.data,
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
    if (id) {
      fetchImage(id);
    }
  }, [id]);

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
  };
};

export default useImage;
