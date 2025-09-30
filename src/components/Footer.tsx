import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-surface">
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
      <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} AlgoVisuals</div>
      <nav className="flex flex-wrap items-center gap-4 text-sm">
        <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
        <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
        <Link to="/refunds" className="text-muted-foreground hover:text-foreground">Cancellation & Refunds</Link>
        <Link to="/shipping" className="text-muted-foreground hover:text-foreground">Shipping</Link>
        <Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
