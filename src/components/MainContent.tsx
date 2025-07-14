import React, { useEffect, useState, useRef } from 'react';
import ContentCard from './ContentCard';
import { Download, MapPin, Clock, Phone, Mail, FileText, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MainContentProps {
  activeTab: string;
}

const vimeoVideos = [
  'https://player.vimeo.com/video/1095495803?h=55eac0fa5a&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
  'https://player.vimeo.com/video/1100958844?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
  'https://player.vimeo.com/video/1100963408?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
  'https://player.vimeo.com/video/1100966211?badge=0&autopause=0&player_id=0&app_id=58479',
  'https://player.vimeo.com/video/1100967428?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479'
];

const sampleContent = {
  'Chapter-1 Real Numbers': [
    {
      id: 1,
      type: 'video' as const,
      src: vimeoVideos[0],
      title: 'Introduction to Real Numbers',
      description: 'Real numbers are fundamental in mathematics. They include all rational and irrational numbers, forming the complete number system we use in advanced mathematics. In this comprehensive lesson, we will explore the properties of real numbers, their classification, and various operations that can be performed on them. Understanding real numbers is crucial for success in algebra, calculus, and other advanced mathematical topics.',
      category: 'Chapter-1 Real Numbers',
      date: '2024-01-15'
    },
    {
      id: 2,
      type: 'image' as const,
      src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
      title: 'Number Line Representation',
      description: 'Visual representation of real numbers on a number line helps students understand the concept better. The number line extends infinitely in both directions, representing all possible real numbers. Every real number corresponds to exactly one point on the number line, and every point on the number line corresponds to exactly one real number.',
      category: 'Chapter-1 Real Numbers',
      date: '2024-01-16'
    },
    {
      id: 3,
      type: 'video' as const,
      src: vimeoVideos[1],
      title: 'Rational and Irrational Numbers',
      description: 'Learn the difference between rational and irrational numbers with detailed examples and proofs. Rational numbers can be expressed as fractions, while irrational numbers cannot be expressed as simple fractions. This distinction is fundamental in understanding the structure of real numbers.',
      category: 'Chapter-1 Real Numbers',
      date: '2024-01-17'
    },
    {
      id: 4,
      type: 'video' as const,
      src: vimeoVideos[2],
      title: 'Properties of Real Numbers',
      description: 'Explore the fundamental properties of real numbers including commutative, associative, and distributive properties. These properties form the foundation for algebraic manipulations and are essential for solving complex mathematical problems.',
      category: 'Chapter-1 Real Numbers',
      date: '2024-01-18'
    },
    {
      id: 5,
      type: 'video' as const,
      src: vimeoVideos[3],
      title: 'Real Number Operations',
      description: 'Master the four basic operations with real numbers: addition, subtraction, multiplication, and division. Learn how to apply these operations effectively and understand their properties in the context of real number system.',
      category: 'Chapter-1 Real Numbers',
      date: '2024-01-19'
    }
  ]
};

// Generate content for all chapters
const generateChapterContent = (chapterName: string) => {
  const baseDescriptions = [
    `Introduction to ${chapterName.split(' ').slice(1).join(' ')} - fundamental concepts and principles`,
    `Advanced techniques and problem-solving strategies in ${chapterName.split(' ').slice(1).join(' ')}`,
    `Real-world applications and practical examples of ${chapterName.split(' ').slice(1).join(' ')}`,
    `Common mistakes and how to avoid them in ${chapterName.split(' ').slice(1).join(' ')}`,
    `Practice problems and solutions for ${chapterName.split(' ').slice(1).join(' ')}`
  ];

  return vimeoVideos.map((video, index) => ({
    id: index + 1,
    type: index === 1 ? 'image' as const : 'video' as const,
    src: index === 1 ? 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop' : video,
    title: `${chapterName.split(' ').slice(1).join(' ')} - Lesson ${index + 1}`,
    description: baseDescriptions[index] + '. This comprehensive lesson covers all essential topics with detailed explanations, examples, and practice problems to ensure complete understanding of the subject matter.',
    category: chapterName,
    date: `2024-01-${15 + index}`
  }));
};

const downloadFiles = [
  { name: 'Mathematics Formula Sheet', type: 'PDF', size: '2.5 MB', url: '#' },
  { name: 'Practice Question Bank', type: 'PDF', size: '5.2 MB', url: '#' },
  { name: 'Solution Manual', type: 'PDF', size: '8.1 MB', url: '#' },
  { name: 'Study Notes - Complete', type: 'DOCX', size: '3.7 MB', url: '#' },
  { name: 'Previous Year Papers', type: 'PDF', size: '4.9 MB', url: '#' }
];

const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = parseInt(entry.target.getAttribute('data-id') || '0');
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, id]));
          } else {
            setVisibleItems(prev => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const getContent = () => {
    if (activeTab === 'Downloads') {
      return (
        <div className="container mx-auto px-4 space-y-6">
          <h2 className="text-2xl font-bold text-gradient mb-6 text-center">Downloads</h2>
          <div className="grid gap-4">
            {downloadFiles.map((file, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{file.name}</h3>
                        <p className="text-sm text-muted-foreground">{file.type} • {file.size}</p>
                      </div>
                    </div>
                    <Button className="gradient-primary text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'Contact') {
      return (
        <div className="container mx-auto px-4 space-y-8">
          <h2 className="text-2xl font-bold text-gradient mb-6 text-center">Contact Information</h2>
          
          {/* Institution Details */}
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gradient mb-4">Algot Academy</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-muted-foreground">
                      123 Education Street, Knowledge District<br />
                      Learning City, State - 500001<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">College Timings</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday: 9:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">+91 9494719306</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">info@algotacademy.edu</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional Information */}
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gradient mb-4">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Admission Enquiry</h4>
                  <p className="text-muted-foreground">For admission related queries, contact our admission office during working hours.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Technical Support</h4>
                  <p className="text-muted-foreground">For platform issues or technical support, reach out to our IT department.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Chapter content
    const chapterContent = sampleContent[activeTab as keyof typeof sampleContent] || generateChapterContent(activeTab);
    
    return (
      <div className="space-y-0">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gradient mb-6 text-center">{activeTab}</h2>
        </div>
        {chapterContent.map((item, index) => (
          <div
            key={item.id}
            data-id={item.id}
            ref={(el) => {
              if (el && observerRef.current) {
                observerRef.current.observe(el);
              }
            }}
          >
            <ContentCard
              type={item.type}
              src={item.src}
              title={item.title}
              description={item.description}
              category={item.category}
              date={item.date}
              isVisible={visibleItems.has(item.id)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="pt-32 pb-8">
      {getContent()}
    </main>
  );
};

export default MainContent;