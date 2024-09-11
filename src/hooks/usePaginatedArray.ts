import { useState } from "react";

const usePaginatedArray = <T>(itemsPerPage = 20) => {
  const [initialArray, setInitialArray] = useState<T[]>([]);
  const [visibleItems, setVisibleItems] = useState<T[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreItems = () => {
    const nextPage = currentPage + 1;
    const nextItems = initialArray.slice(0, nextPage * itemsPerPage);
    setVisibleItems(nextItems);
    setCurrentPage(nextPage);
  };

  const initArray = (data: T[]) => {
    setInitialArray(data);
    setVisibleItems(data.slice(0, itemsPerPage));
  };

  return {
    setInitialArray: initArray,
    visibleItems,
    loadMoreItems,
    hasMoreItems: visibleItems.length < initialArray.length,
  };
};

export default usePaginatedArray;
