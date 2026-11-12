"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/lib/scroll";

function ScrollUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: 0 });
      return;
    }
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      disabled={!isVisible}
      className={`
        fixed bottom-8 right-8 z-50
        squircle rounded-4xl
        bg-neutral-200 text-neutral-400
        cursor-pointer p-2 shadow-md
        border border-neutral-300
        sm:p-4
        transition-all duration-300 ease-out
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M11.7496 19.5C12.1638 19.5 12.4996 19.1642 12.4996 18.75V5.95215C12.6116 6.04035 12.7316 6.13918 12.857 6.25C13.457 6.78014 14.1331 7.50078 14.776 8.24121C15.4156 8.9779 16.0089 9.7173 16.443 10.2734C16.6597 10.5511 16.8367 10.783 16.9586 10.9443C17.0194 11.0248 17.0664 11.0882 17.0982 11.1309C17.114 11.152 17.1264 11.168 17.1344 11.1787C17.1383 11.1841 17.1413 11.1888 17.1432 11.1914L17.1451 11.1943C17.3907 11.5277 17.8605 11.599 18.1939 11.3535C18.5273 11.1079 18.5985 10.6391 18.3531 10.3057L18.3522 10.3037L18.3492 10.2998C18.3469 10.2967 18.3437 10.2918 18.3395 10.2861C18.3307 10.2743 18.318 10.2567 18.3014 10.2344C18.2677 10.1892 18.2178 10.1234 18.1549 10.04C18.029 9.87332 17.8477 9.63523 17.6256 9.35059C17.1817 8.78187 16.5712 8.02072 15.9088 7.25781C15.2496 6.49859 14.5242 5.71966 13.8512 5.125C13.5155 4.82843 13.1744 4.56185 12.8482 4.36523C12.5428 4.18113 12.1559 4.00008 11.7496 4C11.3433 4 10.9565 4.18114 10.651 4.36523C10.3249 4.56183 9.98371 4.82843 9.64805 5.125C8.97506 5.71964 8.24965 6.49857 7.59043 7.25781C6.92792 8.02087 6.3175 8.78279 5.87363 9.35156C5.65161 9.63608 5.47024 9.87335 5.34434 10.04C5.2814 10.1234 5.2315 10.1892 5.19785 10.2344C5.18123 10.2567 5.16857 10.2743 5.15977 10.2861C5.15559 10.2918 5.15232 10.2967 5.15 10.2998L5.14707 10.3037L5.1461 10.3047C4.90054 10.6382 4.97178 11.1079 5.30528 11.3535C5.63879 11.5989 6.10755 11.5278 6.35313 11.1943L6.35606 11.1914C6.35794 11.1889 6.36105 11.1848 6.36485 11.1797C6.37283 11.1689 6.38512 11.1521 6.40098 11.1309C6.43279 11.0882 6.47985 11.0248 6.54063 10.9443C6.66251 10.783 6.83957 10.5511 7.05625 10.2734C7.49029 9.71728 8.08364 8.97788 8.72324 8.24121C9.36598 7.50096 10.0414 6.78008 10.6412 6.25C10.767 6.13885 10.8871 6.03956 10.9996 5.95117V18.75C10.9996 19.1642 11.3355 19.4999 11.7496 19.5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

export default ScrollUp;
