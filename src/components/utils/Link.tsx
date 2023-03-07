import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export const Link = (props: MuiLinkProps & RouterLinkProps) => {
  return <MuiLink component={RouterLink} {...props} sx={{textDecoration: "none", color: "#a6afc3"}} />;
};
