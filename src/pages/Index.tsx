import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FileUpload from '@/components/FileUpload';
import DetectionResults from '@/components/DetectionResults';

// Mock data for demo purposes
const mockResults = [
  {
    id: '1',
    fileName: 'suspicious_video.mp4',
    fileType: 'Video File',
    confidence: 23,
    status: 'fake' as const,
    threats: ['Face Swap Detected', 'Temporal Inconsistencies', 'Compression Artifacts'],
    analysis: {
      facialConsistency: 12,
      temporalCoherence: 34,
      compressionArtifacts: 89,
    },
    processingTime: 12.4,
    timestamp: new Date(),
  },
  {
    id: '2',
    fileName: 'profile_image.jpg',
    fileType: 'Image File',
    confidence: 94,
    status: 'authentic' as const,
    threats: [],
    analysis: {
      facialConsistency: 97,
      compressionArtifacts: 8,
    },
    processingTime: 3.2,
    timestamp: new Date(),
  },
  {
    id: '3',
    fileName: 'news_article.pdf',
    fileType: 'Document',
    confidence: 67,
    status: 'suspicious' as const,
    threats: ['AI-Generated Content Patterns', 'Unusual Linguistic Structure'],
    analysis: {
      linguisticPatterns: 73,
    },
    processingTime: 8.7,
    timestamp: new Date(),
  },
];

const Index: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
    if (files.length > 0 && !showResults) {
      // Auto-start demo processing when files are selected
      startProcessing();
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 6000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Detection Interface */}
      <section id="detection" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-trust bg-clip-text text-transparent">
                Advanced AI Detection
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upload your content and let our cutting-edge AI analyze it for deepfakes, 
              manipulation, and authenticity in real-time.
            </p>
          </div>

          {/* File Upload Section */}
          <div className="mb-12">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          {/* Results Section */}
          {(isProcessing || showResults) && (
            <div className="animate-fadeInUp">
              <DetectionResults 
                results={showResults ? mockResults : []}
                isProcessing={isProcessing}
              />
            </div>
          )}
        </div>
      </section>

      {/* Enterprise Features Section */}
      <section id="features" className="py-32 px-6 bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              ENTERPRISE PLATFORM
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Built for Scale
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Deploy enterprise-grade AI detection across your organization with 
              comprehensive APIs, advanced analytics, and complete compliance coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {[
              {
                category: 'Detection & Analysis',
                features: [
                  'Advanced deepfake detection algorithms',
                  'Multi-modal content analysis (image, video, audio, text)',
                  'Real-time processing with sub-second response times',
                  'Confidence scoring with detailed breakdown',
                  'Batch processing capabilities for large datasets'
                ]
              },
              {
                category: 'Enterprise Integration',
                features: [
                  'RESTful APIs and comprehensive SDKs',
                  'Webhook notifications for automated workflows',
                  'Single Sign-On (SSO) integration',
                  'Custom model training and fine-tuning',
                  'White-label deployment options'
                ]
              },
              {
                category: 'Security & Compliance',
                features: [
                  'SOC 2 Type II and ISO 27001 certified',
                  'GDPR and CCPA compliant data handling',
                  'End-to-end encryption for all data transfers',
                  'On-premises deployment available',
                  'Comprehensive audit logs and reporting'
                ]
              },
              {
                category: 'Analytics & Reporting',
                features: [
                  'Advanced dashboard with custom metrics',
                  'Detailed forensic analysis reports',
                  'Historical trend analysis and insights',
                  'Automated alert systems and notifications',
                  'Executive-level summary reporting'
                ]
              }
            ].map((category, index) => (
              <div key={index} className="glass-card hover:scale-[1.02] transition-spring">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-gradient-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Performance metrics */}
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-semibold mb-8 text-foreground">Platform Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { metric: '99.7%', label: 'Detection Accuracy', description: 'Verified across multiple datasets' },
                { metric: '<200ms', label: 'API Response Time', description: 'Average processing latency' },
                { metric: '99.99%', label: 'Uptime SLA', description: 'Enterprise reliability guarantee' },
                { metric: '50M+', label: 'Files Analyzed', description: 'Cumulative detection volume' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-trust bg-clip-text text-transparent mb-2">
                    {stat.metric}
                  </div>
                  <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border bg-secondary/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company */}
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-trust bg-clip-text text-transparent mb-4">
                TruScan
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Enterprise-grade AI detection platform securing digital trust across industries worldwide.
              </p>
              <div className="flex space-x-4">
                {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 glass rounded-full flex items-center justify-center hover:scale-110 transition-spring"
                  >
                    <span className="text-xs font-medium">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-3 text-muted-foreground">
                {['Detection API', 'Enterprise Dashboard', 'Batch Processing', 'Custom Models'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-foreground transition-smooth">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
              <ul className="space-y-3 text-muted-foreground">
                {['Media Verification', 'Content Moderation', 'Compliance', 'Forensic Analysis'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-foreground transition-smooth">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-3 text-muted-foreground">
                {['Documentation', 'API Reference', 'Enterprise Support', 'Status Page'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-foreground transition-smooth">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 TruScan Technologies. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              {['Privacy Policy', 'Terms of Service', 'Security'].map((item) => (
                <a key={item} href="#" className="hover:text-foreground transition-smooth">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
