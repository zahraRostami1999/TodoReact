import { useMemo } from "react";
import { UAParser } from "ua-parser-js";

export function useBrowserInfo() {
  return useMemo(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    return result.browser.name || "Unknown";
  }, []);
}