import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { Home } from "../pages/Home";
import { SquareMagnets } from "../pages/SquareMagnets";
import { AcrylicMagnets } from "../pages/AcrylicMagnets";
import { ComingSoon } from "../pages/ComingSoon";
import { BulkOrders } from "../pages/BulkOrders";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  // In a real app, this would come from a global auth state (e.g., Zustand)
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop/square-magnets" element={<SquareMagnets />} />
            <Route path="/shop/acrylic-magnets" element={<AcrylicMagnets />} />
            <Route path="/shop/chocolates" element={<ComingSoon />} />
            <Route path="/bulk-orders" element={<BulkOrders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* Restricted Public Routes (e.g. Login, Register - cannot visit if logged in) */}
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} restricted />}>
            {/* <Route path="/login" element={<Login />} /> */}
          </Route>

          {/* Private Routes (e.g. Profile, Checkout) */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            {/* <Route path="/checkout" element={<Checkout />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
