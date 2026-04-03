import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-header text-header-secondary mt-12">
    <div className="container py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-sm font-bold text-header-foreground mb-3">Get to Know Us</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about" className="hover:text-header-foreground transition-colors">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-header-foreground transition-colors">Careers</Link></li>
            <li><Link to="/press" className="hover:text-header-foreground transition-colors">Press Releases</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-header-foreground mb-3">Let Us Help You</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/account" className="hover:text-header-foreground transition-colors">Your Account</Link></li>
            <li><Link to="/orders" className="hover:text-header-foreground transition-colors">Your Orders</Link></li>
            <li><Link to="/help" className="hover:text-header-foreground transition-colors">Help</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-header-foreground mb-3">Shop With Us</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products" className="hover:text-header-foreground transition-colors">All Products</Link></li>
            <li><Link to="/products?category=Electronics" className="hover:text-header-foreground transition-colors">Electronics</Link></li>
            <li><Link to="/products?category=Fashion" className="hover:text-header-foreground transition-colors">Fashion</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-header-foreground mb-3">Connect</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-header-foreground transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-header-foreground transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-header-foreground transition-colors">Instagram</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-header-foreground/10 py-4">
      <div className="container text-center text-xs">
        <Link to="/" className="text-lg font-bold text-header-foreground">Shop<span className="text-primary">Hub</span></Link>
        <p className="mt-2">© 2024 ShopHub. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
