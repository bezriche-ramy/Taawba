import { useEffect, useRef } from 'react';

const useScrollReveal = (direction = 'left', threshold = 0.1) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      },
      {
        threshold: threshold
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      currentElement.classList.add(`reveal-${direction}`);
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [direction, threshold]);

  return elementRef;
};

export default useScrollReveal;
