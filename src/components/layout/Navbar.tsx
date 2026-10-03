import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

const navLinks = [
  { to: "/shop/square-magnets", label: "Square Magnets" },
  { to: "/shop/acrylic-magnets", label: "Acrylic Magnets" },
  { to: "/shop/chocolates", label: "Chocolates" },
  { to: "/bulk-orders", label: "Bulk Orders" },
];

export const Navbar = () => {
  const itemCount = useCartStore((state) => state.itemCount());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "font-label-md text-label-md uppercase tracking-widest scale-95 active:scale-90 transition-all duration-200",
      isActive
        ? "text-secondary border-b-2 border-secondary pb-0.5"
        : "text-on-surface-variant hover:text-secondary",
    ].join(" ");

  return (
    <header className="bg-white dark:bg-deep-onyx text-primary dark:text-on-primary font-headline-md text-headline-md sticky top-0 w-full z-50 shadow-sm transition-transform duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">

        {/* Left - Hamburger + Logo + Desktop Nav */}
        <div className="flex items-center gap-2 md:gap-6">
          <button
            className="md:hidden flex items-center justify-center p-2 text-on-surface-variant hover:text-secondary transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="font-bold tracking-tight">Magnet Memorie</Link>
          <nav className="hidden md:flex space-x-6 items-center ml-6">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className={navLinkClass}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right - Cart only */}
        <div className="flex items-center">
          <Link
            aria-label="Cart"
            to="/cart"
            className="p-2 text-on-surface-variant hover:text-secondary transition-colors duration-200 scale-95 active:scale-90 relative"
          >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-magnet-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-deep-onyx flex flex-col p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="font-bold tracking-tight text-[24px]" onClick={() => setIsMobileMenuOpen(false)}>
              Magnet Memorie
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-on-surface-variant hover:text-secondary"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "text-headline-md font-headline-md transition-colors duration-200",
                    isActive ? "text-secondary" : "text-primary dark:text-on-primary",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
