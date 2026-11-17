"use client";

import { useState } from "react";
import { authAPI } from "@/services/api";

export function useLogout() {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);

    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.setItem("logout_success", "true");
      } catch (error) {
        console.error("Failed to clear local session:", error);
      }

      let redirected = false;
      let redirectTimer;
      const redirectToLogin = () => {
        if (redirected) return;
        redirected = true;
        window.clearTimeout(redirectTimer);
        window.location.replace("/login?logout=success");
      };
      redirectTimer = window.setTimeout(redirectToLogin, 2000);

      authAPI.logout().then(
        redirectToLogin,
        (error) => {
          console.error("Logout request failed:", error);
          redirectToLogin();
        }
      );
    }
  };

  return { loggingOut, handleLogout };
}
