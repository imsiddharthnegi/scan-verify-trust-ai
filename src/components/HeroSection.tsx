import React from 'react';
import { Shield, Eye, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TruScanLogo from './TruScanLogo';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-primary/20" />
      
      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-primary rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-trust to-primary rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '2s'}} />
      </div>

      {/* Floating particles - more subtle */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full hero-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fadeInUp">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Secure Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-trust to-warning bg-clip-text text-transparent">
                Digital Trust
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              Enterprise-grade AI detection platform that identifies deepfakes, manipulated media, 
              and synthetic content with unmatched precision. Built for organizations that demand certainty.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            <Button variant="hero" size="xl" className="group min-w-64">
              <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Start Free Analysis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="glass" size="xl" className="group min-w-64">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Platform Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
            <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider font-medium">
              Trusted by Leading Organizations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              {['Government', 'Media', 'Financial', 'Legal', 'Education'].map((sector) => (
                <div key={sector} className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-smooth">
                  {sector}
                </div>
              ))}
            </div>
          </div>

          {/* Value proposition cards */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInUp" style={{animationDelay: '0.8s'}}>
            {[
              {
                title: 'Enterprise Security',
                description: 'Bank-level encryption and compliance with international security standards'
              },
              {
                title: 'Real-Time Analysis',
                description: 'Instant detection results with comprehensive confidence scoring and reporting'
              },
              {
                title: 'Scalable Integration',
                description: 'RESTful APIs and SDKs for seamless integration into existing workflows'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card hover:scale-105 transition-spring group text-left">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:shadow-glow transition-smooth">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;