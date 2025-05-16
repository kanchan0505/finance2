"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { styled, alpha } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider";
import { ThemeContext } from "../context/ThemeProvider"; // Adjust the path as needed
const drawerWidth = 280;
const collapsedWidth = 80;

// In Sidebar.jsx

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  minHeight: 72,
  justifyContent: "space-between",
  backgroundColor: "var(--card-bg)",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "var(--background)",
    cursor: "pointer",
  },
}));

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? drawerWidth : collapsedWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : collapsedWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    overflowX: "hidden",
    backgroundColor: "var(--card-bg)",
    borderRight: "none",
    color: "var(--foreground)",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.05)",
    zIndex: 1200,
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  margin: theme.spacing(0.5, 1),
  padding: theme.spacing(1, 2),
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: alpha(primaryColor, 0.05), // Use dynamic primary color
  },
  "&.Mui-selected": {
    backgroundColor: alpha(primaryColor, 0.1), // Use dynamic primary color
    "&:hover": {
      backgroundColor: alpha(primaryColor, 0.15),
    },
  },
  "& .MuiListItemIcon-root": {
    color: "var(--text-secondary)",
    minWidth: 40,
    fontSize: "1.2rem",
  },
  "&.Mui-selected .MuiListItemIcon-root": {
    color: primaryColor, // Use dynamic primary color
  },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
    fontSize: "0.95rem",
    color: "#374151", // Dark gray for text
  },
}));

const menuItems = [
  {
    text: "dashboard",
    icon: <DashboardIcon sx={{ fontSize: 20 }} />,
    path: "/",
  },
  { text: "goals", icon: <FlagIcon sx={{ fontSize: 20 }} />, path: "/goals" },
  {
    text: "transactions",
    icon: <SwapHorizIcon sx={{ fontSize: 20 }} />,
    path: "/transactions",
  },
  {
    text: "chatbot",
    icon: <ChatIcon sx={{ fontSize: 20 }} />,
    path: "/chatbot",
  },
];

export default function Sidebar({
  open,
  onToggle,
  isManualMode,
  onModeToggle,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { colorScheme, colorSchemes } = useContext(ThemeContext);
  const primaryColor = colorSchemes[colorScheme].primary; // Defined here
  const { t } = useContext(LanguageContext); // Access t function
  const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: 8,
    margin: theme.spacing(0.5, 1),
    padding: theme.spacing(1, 2),
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: alpha(primaryColor, 0.05),
    },
    "&.Mui-selected": {
      backgroundColor: alpha(primaryColor, 0.1),
      "&:hover": {
        backgroundColor: alpha(primaryColor, 0.15),
      },
    },
    "& .MuiListItemIcon-root": {
      color: "var(--text-secondary)",
      minWidth: 40,
      fontSize: "1.2rem",
    },
    "&.Mui-selected .MuiListItemIcon-root": {
      color: primaryColor,
    },
  }));

  // Move ModeButton inside the Sidebar function
  const ModeButton = styled(IconButton)(({ theme, active }) => ({
    width: 28,
    height: 28,
    backgroundColor: active ? alpha(primaryColor, 0.1) : "transparent", // Now primaryColor is in scope
    border: `1px solid ${
      active ? alpha(primaryColor, 0.3) : "rgba(0, 0, 0, 0.1)"
    }`,
    borderRadius: "50%",
    padding: 0,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: active
        ? alpha(primaryColor, 0.2)
        : "rgba(0, 0, 0, 0.05)",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "16px",
      color: active ? primaryColor : "var(--text-secondary)",
    },
  }));

  const handleHeaderClick = () => {
    if (isManualMode) {
      console.log("Toggling sidebar via header click, current state:", open);
      if (onToggle) {
        onToggle(!open);
      }
    }
  };

  const handleModeToggle = () => {
    if (onModeToggle) {
      onModeToggle(!isManualMode);
    }
  };

  const handleMouseEnter = () => {
    if (!isManualMode && !open) {
      onToggle(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isManualMode && open) {
      onToggle(false);
    }
  };

  const handleLogout = () => {
    alert("Logged out!");
    router.push("/login");
  };

  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DrawerHeader className="drawer-header" onClick={handleHeaderClick}>
        {open && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "8px",
                backgroundColor: primaryColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 700,
                  color: "#ffffff",
                  fontSize: "1.2rem",
                }}
              >
                A
              </Typography>
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "var(--foreground)",
              }}
            >
              Aivestor
            </Typography>
          </Box>
        )}
        <Tooltip
          title={
            isManualMode ? "Switch to Automatic Mode" : "Switch to Manual Mode"
          }
        >
          <ModeButton
            onClick={(e) => {
              e.stopPropagation();
              handleModeToggle();
            }}
            active={isManualMode}
            aria-label={
              isManualMode
                ? "Switch to automatic mode"
                : "Switch to manual mode"
            }
          >
            {isManualMode ? <LockIcon /> : <LockOpenIcon />}
          </ModeButton>
        </Tooltip>
      </DrawerHeader>
      <Divider className="divider-border" sx={{ mb: 1 }} />
      <List sx={{ pt: 1, pb: 1 }}>
        {menuItems.map((item) => (
          <Tooltip
            key={item.text}
            title={t(item.text)} // Translate tooltip
            placement="right"
            disableInteractive
          >
            <StyledListItemButton
              selected={pathname === item.path}
              onClick={() => router.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <StyledListItemText primary={t(item.text)} />}{" "}
              {/* Translate menu item */}
            </StyledListItemButton>
          </Tooltip>
        ))}
      </List>

      {open && (
        <Box sx={{ mt: "auto", p: 2 }}>
          <Divider className="divider-border" sx={{ mb: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: alpha(primaryColor, 0.1),
                fontSize: "1rem",
                color: "var(--foreground)",
              }}
            >
              U
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 500,
                  color: "var(--foreground)",
                }}
              >
                User Name
              </Typography>
              <Typography
                variant="caption"
                className="text-secondary-muted"
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                user@example.com
              </Typography>
            </Box>
            <Tooltip title={t("logout")}>
              {" "}
              {/* Translate logout tooltip */}
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: "var(--foreground)",
                  "&:hover": {
                    color: primaryColor,
                  },
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </StyledDrawer>
  );
}
