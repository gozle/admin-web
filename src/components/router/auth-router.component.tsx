import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RoutesPaths } from "@/lib/routes";
import { useAppSelector } from "@/hooks";

const BlogPostsView = React.lazy(() => import("@/views/blog-posts.view"));
const HomeView = React.lazy(() => import("@/views/home.view"));
const LanguagesView = React.lazy(() => import("@/views/languages.view"));
const ServicesView = React.lazy(() => import("@/views/services.view"));
const SiteCategoryView = React.lazy(() => import("@/views/site-category.view"));
const SitesView = React.lazy(() => import("@/views/site-categories.view"));
const UsersView = React.lazy(() => import("@/views/users.view"));
const FeedbacksView = React.lazy(() => import("@/views/feedbacks.view"));

const AuthRouter = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) return null;

  return (
    <Suspense>
      <Routes>
        <Route path={RoutesPaths.BLOG_POSTS} element={<BlogPostsView />} />
        <Route path={RoutesPaths.HOME} element={<HomeView />} />
        <Route path={RoutesPaths.LANGUAGES} element={<LanguagesView />} />
        <Route path={RoutesPaths.SERVICES} element={<ServicesView />} />
        <Route path={RoutesPaths.SITE_CATEGORIES} element={<SitesView />} />
        <Route
          path={RoutesPaths.SITE_CATEGORY}
          element={<SiteCategoryView />}
        />
        <Route path={RoutesPaths.USERS} element={<UsersView />} />
        <Route path={RoutesPaths.FEEDBACKS} element={<FeedbacksView />} />
        <Route
          path={RoutesPaths.ALL}
          element={<Navigate replace to={RoutesPaths.HOME} />}
        />
      </Routes>
    </Suspense>
  );
};

export default AuthRouter;
