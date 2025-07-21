import React from 'react';
import { Shield, Zap, Eye, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TruScanLogo from './TruScanLogo';

const HeroSection: React.FC = () => {
  const stats = [
    { icon: CheckCircle, value: '99.2%', label: 'Accuracy Rate' },
    { icon: TrendingUp, value: '2.1M+', label: 'Scans Performed' },
    { icon: Users, value: '50K+', label: 'Trusted Users' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Deepfake Detection',
      description: 'Advanced AI algorithms detect facial inconsistencies and manipulation artifacts'
    },
    {
      icon: Eye,
      title: 'Content Analysis',
      description: 'Comprehensive analysis of images, videos, audio, and text content'
    },
    {
      icon: Zap,
      title: 'Real-time Results',
      description: 'Get instant detection results with detailed confidence scoring'
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-primary/10" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full hero-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <TruScanLogo size="xl" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
              <span className="bg-gradient-to-r from-foreground via-primary to-trust bg-clip-text text-transparent">
                Detect AI Content
              </span>
              <br />
              <span className="bg-gradient-to-r from-trust via-primary to-warning bg-clip-text text-transparent">
                With Confidence
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              Advanced AI-powered platform that detects deepfakes, fake news, and manipulated content 
              with industry-leading accuracy. Protect yourself from misinformation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <Button variant="hero" size="xl" className="group">
                <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Scanning Now
              </Button>
              <Button variant="glass" size="xl">
                <Eye className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
            {stats.map((stat, index) => (
              <div key={index} className="glass-card text-center hover:scale-105 transition-spring">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeInUp" style={{animationDelay: '0.8s'}}>
            {features.map((feature, index) => (
              <div key={index} className="glass-card hover:scale-105 transition-spring group">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-smooth">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;