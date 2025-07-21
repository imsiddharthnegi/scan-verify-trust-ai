import React, { useState } from 'react';
import { Menu, X, Shield, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TruScanLogo from './TruScanLogo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Platform', href: '#detection' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Enterprise', href: '#enterprise' },
    { label: 'Resources', href: '#resources' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <TruScanLogo size="sm" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground/80">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              <Shield className="w-4 h-4" />
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass border-b border-white/10 animate-fadeInUp">
            <div className="container mx-auto px-6 py-6">
              <nav className="space-y-4 mb-6">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-foreground/80 hover:text-foreground transition-smooth py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              
              <div className="space-y-3 pt-6 border-t border-white/10">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
                <Button variant="hero" className="w-full justify-start">
                  <Shield className="w-4 h-4" />
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;