import { convexAuthNextjsMiddleware, createRouteMatcher, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(['/auth']);
 
export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
    const isAuthenticated = await convexAuth.isAuthenticated();
    if (!isPublicPage(request) && !isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }
    if (isPublicPage(request) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/");
    }
    // TODO: redirect user away if they are authenticated and trying to access the signin page
  });
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};