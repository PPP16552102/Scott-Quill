import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  formatter?: (value: number) => string;
  className?: string;
}

const AnimatedCounter = ({
  from,
  to,
  duration = 2,
  delay = 0,
  formatter = (value) => Math.round(value).toString(),
  className,
}: AnimatedCounterProps) => {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [count, setCount] = useState(0);
  const isInView = useInView(spanRef, { once: true, amount: 0.5 });
  const [hasAnimatd, setHasAnimatd] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimatd) return;

    let startTimeStamp: number | null = null;

    const step = (timeStamp: number) => {
      if (!startTimeStamp) startTimeStamp = timeStamp;

      const process = Math.min(
        ((timeStamp - startTimeStamp) / duration) * 1000,
        1
      );

      const currentCount = from + process * (to - from);

      setCount(() => currentCount);

      if (process < 1) {
        window.requestAnimationFrame(step);
      } else {
        setHasAnimatd(() => true);
      }
    };

    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [from, to, duration, delay, isInView, hasAnimatd]);

  return (
    <span ref={spanRef} className={className}>
      {formatter(count)}
    </span>
  );
};

export default AnimatedCounter;
