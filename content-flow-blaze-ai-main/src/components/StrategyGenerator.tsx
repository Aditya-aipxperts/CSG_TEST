
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useStrategy } from '@/hooks/useStrategy';
import { Loader2, Sparkles, Twitter, Linkedin, Instagram } from 'lucide-react';
import axios from 'axios';


export const StrategyGenerator = () => {
  const [formData, setFormData] = useState({
    prompt: '',
    platforms: [] as string[],
    niche: '',
    tone: '',
    inspiration: ''
  });

  const { generateStrategy, isLoading } = useStrategy();

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.platforms.length === 0) {
      alert('Please select at least one platform');
      return;
    }
    // let data = await generateStrategy(formData);
    const APP_URL = import.meta.env.VITE_FAST_API_URL;

    axios.post(APP_URL+'/generate-strategy', formData)
      .then(response => { 
        console.log('Strategy generated:', response.data);
        alert('Strategy generated successfully!');
        generateStrategy(response.data);
      }
      )
      .catch(error => {
        console.error('Error generating strategy:', error);
        alert('Failed to generate strategy. Please try again.');
      }
    );
  };

  return (
    <Card className="bg-white/95 shadow-xl rounded-3xl overflow-hidden border-0 ring-1 ring-purple-200">
      <CardHeader className="pb-8 pt-8 px-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-slate-800">
            Generate Content Strategy
          </CardTitle>
        </div>
        <CardDescription className="text-slate-600 text-lg">
          Create a personalized 28-day content strategy powered by AI
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="relative">
                <Label htmlFor="prompt" className="text-base font-semibold text-slate-700 mb-2 block">
                  Strategy Prompt
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe your content goals, target audience, and key messages..."
                  value={formData.prompt}
                  onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                  className="min-h-[180px] resize-none bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 text-slate-800 placeholder:text-slate-500 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <Label className="text-base font-semibold text-slate-700 mb-4 block">
                  Platforms
                </Label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 hover:border-blue-400 transition-colors">
                    <Checkbox
                      id="Twitter"
                      checked={formData.platforms.includes('Twitter')}
                      onCheckedChange={(checked) => 
                        handlePlatformChange('Twitter', checked as boolean)
                      }
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600 data-[state=checked]:border-blue-400"
                    />
                    <Label htmlFor="Twitter" className="text-slate-700 font-medium cursor-pointer flex items-center">
                      <Twitter className="w-5 h-5 mr-3 text-blue-500" />
                      Twitter
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 hover:border-indigo-400 transition-colors">
                    <Checkbox
                      id="LinkedIn"
                      checked={formData.platforms.includes('LinkedIn')}
                      onCheckedChange={(checked) => 
                        handlePlatformChange('LinkedIn', checked as boolean)
                      }
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-500 data-[state=checked]:to-indigo-600 data-[state=checked]:border-indigo-400"
                    />
                    <Label htmlFor="LinkedIn" className="text-slate-700 font-medium cursor-pointer flex items-center">
                      <Linkedin className="w-5 h-5 mr-3 text-indigo-600" />
                      LinkedIn
                    </Label>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 hover:border-pink-400 transition-colors">
                    <Checkbox
                      id="Instagram"
                      checked={formData.platforms.includes('Instagram')}
                      onCheckedChange={(checked) => 
                        handlePlatformChange('Instagram', checked as boolean)
                      }
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-pink-500 data-[state=checked]:to-purple-600 data-[state=checked]:border-pink-400"
                    />
                    <Label htmlFor="Instagram" className="text-slate-700 font-medium cursor-pointer flex items-center">
                      <Instagram className="w-5 h-5 mr-3 text-pink-500" />
                      Instagram
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <Label htmlFor="niche" className="text-base font-semibold text-slate-700 mb-2 block">
                  Niche/Industry
                </Label>
                <Input
                  id="niche"
                  placeholder="e.g., SaaS, Marketing, Finance"
                  value={formData.niche}
                  onChange={(e) => setFormData(prev => ({ ...prev, niche: e.target.value }))}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-slate-800 placeholder:text-slate-500 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-12 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <Label htmlFor="tone" className="text-base font-semibold text-slate-700 mb-2 block">
                  Tone of Voice
                </Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                  <SelectTrigger className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-slate-800 rounded-2xl h-12 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-purple-200 rounded-xl shadow-lg">
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="inspiration" className="text-base font-semibold text-slate-700 mb-2 block">
                  Inspiration Sources
                </Label>
                <Input
                  id="inspiration"
                  placeholder="Brands, competitors, or content creators you admire"
                  value={formData.inspiration}
                  onChange={(e) => setFormData(prev => ({ ...prev, inspiration: e.target.value }))}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-slate-800 placeholder:text-slate-500 rounded-2xl h-12 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-12 py-6 rounded-2xl font-semibold text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Generating Strategy...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3" />
                  Generate Strategy
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
