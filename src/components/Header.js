import Image from "next/image";
import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { useRouter } from "next/router";
import { SiGitbook } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { RiBookOpenFill } from "react-icons/ri";
import { blue, grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { borderColor, cardColor } from "@/constants/colors";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Button,
  Grid,
  Box,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const currentPath = router.pathname;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const buttons = [
    {
      text: "Home",
      path: "/",
      icon: <MdDashboard size={18} />
    },
    {
      text: "Technical Paper",
      path: "/docs",
      icon: <RiBookOpenFill size={18} />
    },
    {
      text: "Gitbook",
      external: true,
      href: "https://flexdefi.gitbook.io/flex",
      icon: <SiGitbook size={16} />
    },
  ];

  return (
    <>
      {/* TOP BAR */}
      <Grid
        container
        px={3}
        py={0}
        top={0}
        width="100%"
        position="absolute"
        alignItems="center"
        justifyContent="space-between"
        sx={{ borderBottom: 1, borderColor }}
      >
        <Image
          src="/assets/flextransparentlogo.png"
          alt="logo"
          height={45}
          width={45}
          style={{ filter: 'grayscale(100%)' }}
        />

        {/* DESKTOP CTA */}
        {!isMobile && (
          <Button
            href="https://app.flexdefi.io"
            sx={{
              px: 1.5,
              height: 37,
              fontSize: 14,
              fontWeight: 900,
              color: grey[50],
              borderRadius: 1,
              textTransform: 'none',
              background: blue[400],
              ':hover': { background: blue[600] }
            }}
          >
            Launch dApp
          </Button>
        )}

        {/* MOBILE MENU ICON */}
        {isMobile && (
          <Button onClick={() => setMobileOpen(true)} sx={{ color: grey[50] }}>
            <MenuRoundedIcon />
          </Button>
        )}
      </Grid>

      {/* DESKTOP NAV */}
      {!isMobile && (
        <Grid
          container
          width="100%"
          alignItems="center"
          sx={{
            mt: 0.7,
            gap: 2,
            position: 'absolute',
            pl: { lg: 15, md: 10 },
          }}
        >
          {buttons.map((button, id) => {
            const isActive = currentPath === button.path;
            return (
              <Button
                key={id}
                disableRipple
                onClick={() =>
                  button.external
                    ? window.open(button.href, "_blank")
                    : router.push(button.path)
                }
                sx={{
                  fontSize: 14,
                  textTransform: 'none',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  background: 'transparent',
                  fontWeight: isActive ? 600 : 400,
                  borderBottom: isActive ? 3 : 0,
                  color: isActive ? grey[50] : grey[200],
                  borderColor: isActive ? blue[400] : 'transparent',
                  ':hover': {
                    background: cardColor,
                    borderBottom: 2,
                    borderColor: blue[400]
                  }
                }}
              >
                {button.text}
              </Button>
            );
          })}
        </Grid>
      )}

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: cardColor,
            color: grey[50],
          },
        }}
      >
        {/* DRAWER HEADER */}
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          px={2}
          py={1.5}
          sx={{ borderBottom: `1px solid ${borderColor}` }}
        >
          <Image
            src="/assets/flextransparentlogo.png"
            alt="logo"
            height={35}
            width={35}
            style={{ filter: 'grayscale(100%)' }}
          />
          <Button onClick={() => setMobileOpen(false)}>
            <CloseRoundedIcon sx={{ color: grey[50] }} />
          </Button>
        </Grid>

        {/* DRAWER MENU */}
        <List>
          {buttons.map((button, id) => (
            <ListItemButton
              key={id}
              onClick={() => {
                setMobileOpen(false);
                button.external
                  ? window.open(button.href, "_blank")
                  : router.push(button.path);
              }}
            >
              <ListItemIcon sx={{ color: grey[50], minWidth: 36 }}>
                {button.icon}
              </ListItemIcon>
              <ListItemText
                primary={button.text}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* DRAWER CTA */}
        <Box px={2} mt="auto" pb={2}>
          <Button
            fullWidth
            href="https://app.flexdefi.io"
            sx={{
              height: 42,
              fontWeight: 900,
              color: grey[50],
              background: blue[400],
              textTransform: 'none',
              ':hover': { background: blue[600] }
            }}
          >
            Launch dApp
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
