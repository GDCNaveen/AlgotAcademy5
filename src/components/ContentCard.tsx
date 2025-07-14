import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

interface ContentCardProps {
  type: 'video' | 'image';
  src: string;
  title: string;
  description: string;
  category: string;
  date: string;
  isVisible: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({
  type,
  src,
  title,
  description,
  category,
  date,
  isVisible
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = description.length > 150 ? description.substring(0, 150) + '...' : description;

  return (
    <div className="w-full mb-6">
      {/* Video or Image - Full Width */}
      <div className="content-wrapper">
        {type === 'video' ? (
          <VideoPlayer src={src} title={title} isVisible={isVisible} />
        ) : (
          <div className="w-full">
            <img 
              src={src} 
              alt={title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gradient mb-2 text-center">
          {title}
        </h3>
        
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gradient bg-primary/10 px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="text-xs text-muted-foreground">
            {date}
          </span>
        </div>
        
        {/* Description */}
        <div className="text-sm text-foreground text-justify leading-relaxed">
          <p>
            {isExpanded ? description : shortDescription}
          </p>
          
          {description.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:underline mt-2 font-medium"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;