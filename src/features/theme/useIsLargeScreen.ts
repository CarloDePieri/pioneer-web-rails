import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

/**
 * A simple hook that detect screen dimensions.
 */
export default function useIsLargeScreen(): boolean {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up("sm"))
}
