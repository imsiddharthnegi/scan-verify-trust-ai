import React, { useState } from 'react';
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

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-trust to-primary bg-clip-text text-transparent">
                Why Choose TruScan?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Industry-leading technology that sets the standard for AI content detection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '99.2% Accuracy',
                description: 'State-of-the-art algorithms trained on millions of samples',
                icon: '🎯'
              },
              {
                title: 'Real-Time Analysis',
                description: 'Get results in seconds, not minutes or hours',
                icon: '⚡'
              },
              {
                title: 'Multi-Format Support',
                description: 'Images, videos, audio files, and text documents',
                icon: '📄'
              },
              {
                title: 'Advanced Heatmaps',
                description: 'Visual highlighting of suspicious regions',
                icon: '🗺️'
              },
              {
                title: 'Detailed Reports',
                description: 'Comprehensive analysis with exportable documentation',
                icon: '📊'
              },
              {
                title: 'Privacy First',
                description: 'Your content is processed securely and never stored',
                icon: '🔒'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card hover:scale-105 transition-spring">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-trust bg-clip-text text-transparent">
                TruScan
              </div>
            </div>
            <p className="text-muted-foreground">
              Protecting truth in the age of artificial intelligence.
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 TruScan. Built with cutting-edge AI detection technology.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
