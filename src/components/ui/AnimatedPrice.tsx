import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedPriceProps {
  value: number;
  currency?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedPrice: React.FC<AnimatedPriceProps> = ({ 
  value, 
  currency = '$', 
  decimals = 2,
  className 
}) => {
  const elRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (!elRef.current) return;

    const target = { val: prevValue.current };
    
    gsap.to(target, {
      val: value,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        if (elRef.current) {
          elRef.current.innerText = `${currency}${target.val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}`;
        }
      }
    });

    // Pulse effect
    if (value !== prevValue.current) {
      gsap.fromTo(elRef.current, 
        { scale: 1.1, color: value > prevValue.current ? '#10b981' : '#ef4444' },
        { scale: 1, color: 'inherit', duration: 1, ease: "power2.out" }
      );
    }

    prevValue.current = value;
  }, [value, currency, decimals]);

  return (
    <span ref={elRef} className={className}>
      {currency}{value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
};
