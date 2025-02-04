import { useMediaQuery } from "react-responsive";

export function useDeviceType() {
  const isMobile = useMediaQuery({ maxWidth: 1028 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return { isMobile, isTablet, isDesktop };
}
