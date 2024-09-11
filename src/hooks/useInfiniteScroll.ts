import { useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (
  loadMoreItems: () => void,
  hasMoreItems: boolean,
  options: IntersectionObserverInit
) => {
  const { root = null, rootMargin = "0px", threshold = 1.0 } = options;
  const observerRef = useRef(null);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMoreItems) {
        loadMoreItems();
      }
    },
    [loadMoreItems, hasMoreItems]
  );

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(observerCallback, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerCallback, root, rootMargin, threshold]);

  return observerRef;
};

export default useInfiniteScroll;
