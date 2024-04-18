import React from "react";
import { RoutesPaths } from "./routes";
import HomeIcon from "@mui/icons-material/Home";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import LanguageIcon from "@mui/icons-material/Language";
import HttpIcon from "@mui/icons-material/Http";
import FeedbackIcon from "@mui/icons-material/Feedback";
import FeedIcon from "@mui/icons-material/Feed";

export type MenuItem = { name: string; icon: JSX.Element; route: string };

export const menuItems: MenuItem[] = [
  { name: "Home", icon: <HomeIcon />, route: RoutesPaths.HOME },
  { name: "Languages", icon: <LanguageIcon />, route: RoutesPaths.LANGUAGES },
  { name: "Services", icon: <ShopTwoIcon />, route: RoutesPaths.SERVICES },
  { name: "Sites", icon: <HttpIcon />, route: RoutesPaths.SITE_CATEGORIES },
  { name: "Feedbacks", icon: <FeedbackIcon />, route: RoutesPaths.FEEDBACKS },
  { name: "Blog Posts", icon: <FeedIcon />, route: RoutesPaths.BLOG_POSTS },
];
