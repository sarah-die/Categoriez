import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Outlet,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";
import { Link } from "../components/utils/Link";

type Page = { label: string; href: string };

const pages: Page[] = [
  { label: "Rule Book", href: "/ruleBook" },
  { label: "New Game", href: "/inGame" },
  { label: "Categoriez", href: "/categoriez" },
  { label: "About", href: "/about" },
];

export default function RootAppBar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (href: string) => () => {
    setAnchorElNav(null);
    navigate(href);
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <AppBar sx={{ backgroundColor: "primary.light" }}>
        {/*sm is necessary to override the default media query padding of MUI*/}
        <Container maxWidth={false} sx={{ px: { md: 9 } }}>
          <Toolbar disableGutters>
            <Link to="/">
              <Typography
                variant="h4"
                noWrap
                component="a"
                sx={{
                  display: { xs: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                CATEGORIEZ
              </Typography>
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={handleCloseNavMenu(page.href)}
                  >
                    <Typography textAlign="center" variant={"h6"}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              id={"AppBar ButtonGroup"}
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.label}
                  sx={{ my: 2, color: "inherit", display: "block" }}
                  size={"large"}
                  component={RouterLink}
                  to={page.href}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          flex: 1,
          pt: 10,
          backgroundColor: "background.paper",
          overflowX: "none",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
