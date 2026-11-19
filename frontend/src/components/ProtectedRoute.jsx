"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/services/api";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
        if (!token && !userStr) {
          if (isMounted) {
            setIsAuthorized(false);
            setIsLoading(false);
          }
          router.replace("/login");
          return;
        }

        // 2. Pre-check role from storage
        if (userStr && allowedRoles.length > 0) {
          try {
            const parsedUser = JSON.parse(userStr);
            if (parsedUser?.role && !allowedRoles.includes(parsedUser.role)) {
              if (isMounted) {
                setIsAuthorized(false);
                setIsLoading(false);
              }
              router.replace("/login");
              return;
            }
          } catch {}
        }

        // 3. Verify session authenticity with backend
        const response = await authAPI.getMe();

        if (!isMounted) return;

        if (response && response.success && response.user) {
          const user = response.user;
          localStorage.setItem("user", JSON.stringify(user));

          // Check server-verified role permissions
          if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            console.error("Access denied: insufficient permissions");
            setIsAuthorized(false);
            router.replace("/login");
            return;
          }

          setIsAuthorized(true);
        } else {
          // Token is invalid or expired
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setIsAuthorized(false);
          router.replace("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (isMounted) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setIsAuthorized(false);
          router.replace("/login");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
