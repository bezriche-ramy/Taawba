import { useEffect, useRef } from 'react';

const useScrollReveal = (direction = 'up', delay = 0, threshold = 0.1) => {
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
      if (delay) {
        currentElement.style.transitionDelay = `${delay}s`;
      }
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [direction, delay, threshold]);

  return elementRef;
};

export default useScrollReveal;
