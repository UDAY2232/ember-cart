import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Info, Briefcase, FileText, User, Package, HelpCircle, ShoppingBag, Monitor, Shirt, Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

const footerSections = [
  {
    title: "Get to Know Us",
    links: [
      { to: "/about", label: "About Us", icon: Info },
      { to: "/careers", label: "Careers", icon: Briefcase },
      { to: "/press", label: "Press Releases", icon: FileText },
    ],
  },
  {
    title: "Let Us Help You",
    links: [
      { to: "/account", label: "Your Account", icon: User },
      { to: "/orders", label: "Your Orders", icon: Package },
      { to: "/help", label: "Help", icon: HelpCircle },
    ],
  },
  {
    title: "Shop With Us",
    links: [
      { to: "/products", label: "All Products", icon: ShoppingBag },
      { to: "/products?category=Electronics", label: "Electronics", icon: Monitor },
      { to: "/products?category=Fashion", label: "Fashion", icon: Shirt },
    ],
  },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => (
  <footer className="bg-header text-header-secondary mt-12">
    <div className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-bold text-header-foreground mb-4">{section.title}</h4>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-xs group hover:text-header-foreground transition-colors"
                  >
                    <link.icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-header-foreground group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Follow Us */}
        <div>
          <h4 className="text-sm font-bold text-header-foreground mb-4">Follow Us</h4>
          <div className="flex gap-2 mb-6">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg bg-header-foreground/5 hover:bg-header-foreground/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 opacity-60" /> support@shophub.com</div>
            <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 opacity-60" /> 1-800-SHOPHUB</div>
            <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 opacity-60" /> San Francisco, CA</div>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-header-foreground/10 py-5">
      <div className="container text-center text-xs">
        <Link to="/" className="text-lg font-bold text-header-foreground">
          Shop<span className="text-primary">Hub</span>
        </Link>
        <p className="mt-2 text-header-secondary/70">© 2024 ShopHub. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </div>
  </footer>
);

export default Footer;
