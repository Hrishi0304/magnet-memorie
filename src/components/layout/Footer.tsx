import { Link } from "react-router-dom";

const InstagramIcon = ({ size = 17 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = ({ size = 17 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);


const shopLinks = [
  { to: "/shop/square-magnets", label: "Square Magnets" },
  { to: "/shop/acrylic-magnets", label: "Acrylic Magnets" },
  { to: "/shop/chocolates", label: "Chocolates" },
  { to: "/bulk-orders", label: "Bulk Orders" },
];

const infoLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/shipping", label: "Shipping Info" },
];

const instagramAccounts = [
  {
    handle: "@magnetmemorie",
    label: "Magnet Memorie",
    url: "https://www.instagram.com/magnetmemorie/",
  },
  {
    handle: "@chocomemorie",
    label: "Chocolate Memorie",
    url: "https://www.instagram.com/chocomemorie/",
  },
];

const youtubeChannels = [
  {
    handle: "@magnetmemorie",
    label: "Magnet Memorie",
    url: "https://youtube.com/@magnetmemorie?si=4zVOZoEbFad9-CX7",
  },
  {
    handle: "@chocomemorie",
    label: "Chocolate Memorie",
    url: "https://youtube.com/@chocomemorie?si=IJmRKTlQQcM9febC",
  },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-deep-onyx text-white mt-auto">
      {/* Main footer grid */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 - Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block font-bold text-[22px] text-white tracking-tight mb-3">
              Magnet Memorie
            </Link>
            <p className="font-body-md text-body-md text-white/60 leading-relaxed mb-6 max-w-xs">
              Premium personalised photo magnets, handcrafted in India. Turn your memories into something you can touch.
            </p>
            {/* Tagline pill */}
            <span className="inline-block font-label-sm text-label-sm text-memory-gold border border-memory-gold/40 px-3 py-1 rounded-full uppercase tracking-widest">
              Forever In Your Mind
            </span>
          </div>

          {/* Col 2 - Shop */}
          <div>
            <p className="font-label-md text-label-md text-white uppercase tracking-wider mb-5">Shop</p>
            <ul className="flex flex-col gap-3">
              {shopLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body-md text-body-md text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Info */}
          <div>
            <p className="font-label-md text-label-md text-white uppercase tracking-wider mb-5">Info</p>
            <ul className="flex flex-col gap-3">
              {infoLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body-md text-body-md text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Follow */}
          <div>
            <p className="font-label-md text-label-md text-white uppercase tracking-wider mb-5">Follow Us</p>
            
            {/* Instagram Section */}
            <div className="mb-6">
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-3">Instagram</p>
              <div className="flex flex-col gap-3">
                {instagramAccounts.map(({ handle, label, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#f09433] group-hover:via-[#e6683c] group-hover:to-[#bc1888] transition-all duration-300 flex-shrink-0">
                      <InstagramIcon size={17} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-white group-hover:text-white/90 transition-colors leading-tight">
                        {label}
                      </span>
                      <span className="font-label-sm text-[12px] text-white/50 group-hover:text-white/70 transition-colors">
                        {handle}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* YouTube Section */}
            <div>
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-3">YouTube</p>
              <div className="flex flex-col gap-3">
                {youtubeChannels.map(({ handle, label, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#FF0000] transition-all duration-300 flex-shrink-0">
                      <YoutubeIcon size={17} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-white group-hover:text-white/90 transition-colors leading-tight">
                        {label}
                      </span>
                      <span className="font-label-sm text-[12px] text-white/50 group-hover:text-white/70 transition-colors">
                        {handle}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-label-sm text-label-sm text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} Magnet Memorie. All rights reserved.
          </p>
          <p className="font-label-sm text-label-sm text-white/30">
            Made with ♥ in India
          </p>
        </div>
      </div>
    </footer>
  );
};
