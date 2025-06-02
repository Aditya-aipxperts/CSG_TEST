import { useState } from 'react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

interface StrategyResponse {
  content: string;
  calendar: Array<{
    title: string;
    week: string;
    day: string;
    raw_data: {
      // Platform: string;
      // Type: string;
      CTA: string;
      Pillar: string;
      Hashtags: string;
    };
  }>;
}

interface PostResponse {
  title: string;
  content: string;
}

interface GeneratedPost extends PostResponse {
  dayNumber: number;
}

export const useStrategy = () => {
  const [strategy, setStrategy] = useState<StrategyResponse | null>(null);
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStrategy = async (formData: any) => {
    console.log('Generating strategy with form data:', formData);
    setIsLoading(true);
    try {
      console.log('Generating strategy with data:', formData);
      
      // Mock response for demo - replace with actual API call
      const mockResponse: StrategyResponse = {
        content: "# 28-Day Content Strategy\n\nThis is your personalized content strategy...",
        calendar: Array.from({ length: 28 }, (_, i) => {
          const weekNum = Math.floor(i / 7) + 1;
          const dayNum = (i % 7) + 1;
          const platforms = formData.platforms;
          // const platform = platforms[i % platforms.length];
          
          return {
            title: `${formData.niche} Insight #${i + 1}`,
            week: `Week ${weekNum}`,
            day: `Day ${dayNum}`,
            raw_data: {
              // Platform: platform,
              // Type: platform === 'Twitter' ? 'Thread' : platform === 'Instagram' ? 'Reel' : 'Post',
              CTA: 'Engage with audience',
              Pillar: 'Education',
              Hashtags: `#${formData.niche.toLowerCase()} #content #strategy`
            }
          };
        })
      };

      setStrategy(mockResponse);
      setPosts([]); // Reset posts when new strategy is generated
      
      toast({
        title: "Strategy Generated!",
        description: "Your 28-day content strategy is ready.",
      });
    } catch (error) {
      console.error('Error generating strategy:', error);
      toast({
        title: "Error",
        description: "Failed to generate strategy. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generatePost = async (dayNumber: number) => {
    setIsGenerating(true);
    try {
      console.log('Generating post for day:', dayNumber);
      
      // Mock response for demo - replace with actual API call
      const mockPost: PostResponse = {
        title: `Day ${dayNumber} Content`,
        content: `This is the generated content for day ${dayNumber}. 

🔥 Key insights for today:
• Strategic point 1
• Strategic point 2  
• Strategic point 3

What are your thoughts? Drop a comment below! 👇

#content #strategy #growth`
      };

      const newPost: GeneratedPost = {
        ...mockPost,
        dayNumber
      };

      setPosts(prev => [...prev.filter(p => p.dayNumber !== dayNumber), newPost]);
      
      toast({
        title: "Post Generated!",
        description: `Content for day ${dayNumber} is ready.`,
      });
    } catch (error) {
      console.error('Error generating post:', error);
      toast({
        title: "Error",
        description: "Failed to generate post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const editPost = async (originalPost: string, instructions: string) => {
    try {
      console.log('Editing post with instructions:', instructions);
      
      // Mock response for demo - replace with actual API call
      toast({
        title: "Post Updated!",
        description: "Your post has been edited successfully.",
      });
    } catch (error) {
      console.error('Error editing post:', error);
      toast({
        title: "Error",
        description: "Failed to edit post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    strategy,
    posts,
    isLoading,
    isGenerating,
    generateStrategy,
    generatePost,
    editPost
  };
};
