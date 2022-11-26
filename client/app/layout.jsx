import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageLayout from "../components/layouts/PageLayout";
import { AuthProvider } from "../store/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthProvider>
          <PageLayout>{children}</PageLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
