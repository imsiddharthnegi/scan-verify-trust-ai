import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Download, 
  Eye, 
  Clock,
  Target,
  Zap,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DetectionResult {
  id: string;
  fileName: string;
  fileType: string;
  confidence: number;
  status: 'authentic' | 'suspicious' | 'fake';
  threats: string[];
  analysis: {
    facialConsistency?: number;
    temporalCoherence?: number;
    compressionArtifacts?: number;
    linguisticPatterns?: number;
  };
  processingTime: number;
  timestamp: Date;
}

interface DetectionResultsProps {
  results: DetectionResult[];
  isProcessing?: boolean;
}

const DetectionResults: React.FC<DetectionResultsProps> = ({ results, isProcessing = false }) => {
  const [selectedResult, setSelectedResult] = useState<DetectionResult | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isProcessing && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + Math.random() * 15, 100));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, progress]);

  const getStatusConfig = (status: DetectionResult['status']) => {
    switch (status) {
      case 'authentic':
        return {
          icon: CheckCircle,
          color: 'text-trust',
          bgColor: 'bg-trust/10',
          borderColor: 'border-trust',
          label: 'Authentic Content'
        };
      case 'suspicious':
        return {
          icon: AlertTriangle,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning',
          label: 'Suspicious Content'
        };
      case 'fake':
        return {
          icon: XCircle,
          color: 'text-danger',
          bgColor: 'bg-danger/10',
          borderColor: 'border-danger',
          label: 'Fake/Manipulated'
        };
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-trust';
    if (confidence >= 70) return 'text-warning';
    return 'text-danger';
  };

  if (isProcessing) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Analyzing Content</h3>
            <p className="text-muted-foreground">Our AI is examining your files for manipulation...</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Processing Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Facial Analysis', 'Compression Check', 'Pattern Detection'].map((step, index) => (
              <div key={step} className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30">
                <div className={`w-2 h-2 rounded-full ${progress > (index + 1) * 33 ? 'bg-trust' : 'bg-muted'}`} />
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="glass-card p-12 text-center">
          <Eye className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Results Yet</h3>
          <p className="text-muted-foreground">Upload files to see detection results here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Results Overview */}
      <div className="glass-card p-6">
        <h3 className="text-2xl font-semibold mb-6">Detection Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {['authentic', 'suspicious', 'fake'].map((status) => {
            const count = results.filter(r => r.status === status).length;
            const config = getStatusConfig(status as DetectionResult['status']);
            return (
              <div key={status} className={`p-4 rounded-xl border ${config.borderColor} ${config.bgColor}`}>
                <div className="flex items-center gap-3">
                  <config.icon className={`w-5 h-5 ${config.color}`} />
                  <div>
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm opacity-80">{config.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Results */}
      <div className="space-y-4">
        {results.map((result) => {
          const statusConfig = getStatusConfig(result.status);
          return (
            <div key={result.id} className="glass-card p-6 hover:scale-[1.02] transition-spring">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${statusConfig.bgColor} ${statusConfig.borderColor} border flex items-center justify-center`}>
                    <statusConfig.icon className={`w-6 h-6 ${statusConfig.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{result.fileName}</h4>
                    <p className="text-muted-foreground">{result.fileType}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getConfidenceColor(result.confidence)}`}>
                    {result.confidence}%
                  </div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
              </div>

              {/* Analysis Metrics */}
              {result.analysis && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {Object.entries(result.analysis).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-semibold">{value}%</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Threats */}
              {result.threats.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium mb-2">Detected Issues:</h5>
                  <div className="flex flex-wrap gap-2">
                    {result.threats.map((threat, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-danger/10 text-danger border border-danger/20 rounded-full text-sm"
                      >
                        {threat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {result.processingTime}s
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {result.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                    Report
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {results.length} file{results.length !== 1 ? 's' : ''} analyzed
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="sm">
              <FileText className="w-4 h-4" />
              Export All Reports
            </Button>
            <Button variant="hero" size="sm">
              <Zap className="w-4 h-4" />
              Scan More Files
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionResults;