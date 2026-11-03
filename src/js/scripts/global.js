const guard = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/google-sign-in/authorized.php`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Authorization check failed");
    }

    const data = await response.json();

    if (!data.authenticated) {
      window.location.replace("/sign-in/index.html");
    }
  } catch (error) {
    console.error("Authorization error:", error);
    window.location.replace("/sign-in/index.html");
  }
};

const isSignInPage = window.location.pathname.startsWith("/sign-in/");

if (!isSignInPage) {
  guard();
}