import { NextRequest, NextResponse } from "next/server";

type RoutePattern = string | RegExp;

// Routes that require authentication
const privateRoutes: RoutePattern[] = [
  /^\/dashboard(\/.*)?$/, // Any route starting with /dashboard
];

// Routes that should redirect to dashboard if already authenticated
const restrictedIfAuthenticated: RoutePattern[] = [
  "/login",
  "/registration", 
  "/login/otp",
];

// Public routes that don't require authentication
const publicRoutes: RoutePattern[] = [
  "/",
  "/about",
];

// Helper function to check if a route matches any pattern
function matchesRoute(pathname: string, routes: RoutePattern[]): boolean {
  return routes.some(route =>
    typeof route === "string" ? route === pathname : route.test(pathname)
  );
}

// Helper function to verify token 
async function verifyToken(token: string): Promise<boolean> {
  try {
    if (!token || token.length < 10) return false;
    // const response = await fetch(`${process.env.API_URL}/auth/verify`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // return response.ok;
    
    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  
  console.log("Middleware - Path:", pathname, "Token exists:", !!accessToken);

  // Check if current route is public (allow access without authentication)
  const isPublicRoute = matchesRoute(pathname, publicRoutes);
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if current route is private (requires authentication)
  const isPrivateRoute = matchesRoute(pathname, privateRoutes);
  
  // Check if current route should be restricted for authenticated users
  const shouldRestrictIfAuthenticated = matchesRoute(pathname, restrictedIfAuthenticated);

  // Handle private routes
  if (isPrivateRoute) {
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token validity
    const isValidToken = await verifyToken(accessToken);
    if (!isValidToken) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("accessToken", "", { 
        path: "/", 
        maxAge: -1,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      });
      response.cookies.set("refreshToken", "", { 
        path: "/", 
        maxAge: -1,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      });
      return response;
    }
  }

  // Handle routes that should be restricted if user is already authenticated
  if (shouldRestrictIfAuthenticated && accessToken) {
    const isValidToken = await verifyToken(accessToken);
    if (isValidToken) {
      const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    } else {
      const response = NextResponse.next();
      response.cookies.set("accessToken", "", { 
        path: "/", 
        maxAge: -1,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      });
      response.cookies.set("refreshToken", "", { 
        path: "/", 
        maxAge: -1,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      });
      return response;
    }
  }

  const response = NextResponse.next();
  
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)",
  ],
};