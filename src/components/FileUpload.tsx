import React, { useState, useCallback } from 'react';
import { Upload, FileText, Image, Video, Music, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  maxFiles = 5,
  acceptedTypes = ['image/*', 'video/*', 'audio/*', 'text/*', '.pdf']
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    if (file.type.startsWith('audio/')) return Music;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.slice(0, maxFiles - selectedFiles.length);
    setSelectedFiles(prev => [...prev, ...validFiles]);
    onFileSelect([...selectedFiles, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFileSelect(newFiles);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-smooth
          ${dragActive 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-muted hover:border-primary/50 hover:bg-primary/5'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
            <Upload className="w-8 h-8 text-white" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Drop files to scan</h3>
            <p className="text-muted-foreground mb-4">
              Drag & drop your files here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports images, videos, audio files, and documents (Max {maxFiles} files)
            </p>
          </div>

          <Button variant="glass" size="lg">
            Choose Files
          </Button>
        </div>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-8 space-y-4">
          <h4 className="text-lg font-semibold">Selected Files ({selectedFiles.length})</h4>
          <div className="grid gap-4">
            {selectedFiles.map((file, index) => {
              const FileIcon = getFileIcon(file);
              return (
                <div key={index} className="glass-card flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <FileIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="hover:bg-danger/10 hover:text-danger"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button variant="scan" size="xl" className="min-w-48">
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Start Detection Scan
            </Button>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-8 glass-card p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
          <div>
            <h5 className="font-medium text-foreground mb-2">Detection Capabilities</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Images:</strong> Deepfake faces, manipulated photos, AI-generated content</li>
              <li>• <strong>Videos:</strong> Face swaps, synthetic media, temporal inconsistencies</li>
              <li>• <strong>Audio:</strong> Voice cloning, synthetic speech patterns</li>
              <li>• <strong>Text:</strong> AI-generated articles, fake news detection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;