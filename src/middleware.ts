import { defineMiddleware, sequence } from "astro:middleware";
import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

export const localeReq = defineMiddleware((context, next) => {
  if (context.url.pathname === "/") {
    return context.redirect(
      `/${context.preferredLocale || "en"}/`
    );
  }

  return next();
});

const isProtectedRoute = createRouteMatcher([
  /* '/de/calculator(.*)', */
]);

export const clerkReq = clerkMiddleware((auth, context) => {
  if (!auth().userId && isProtectedRoute(context.request)) {
    return auth().redirectToSignIn();
  }
});

export const onRequest = sequence(localeReq, clerkReq);