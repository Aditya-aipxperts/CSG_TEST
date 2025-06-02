
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Edit, CheckCircle, Sparkles, Calendar, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useStrategy } from '@/hooks/useStrategy';
import { PostEditor } from '@/components/PostEditor';
import { ScheduleModal } from '@/components/ScheduleModal';
import { AutoPostToggle } from '@/components/AutoPostToggle';

export const ContentCalendar = () => {
  const { strategy, posts, generatePost, isGenerating } = useStrategy();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  if (!strategy) {
    return (
      <Card className="bg-white/95 shadow-xl rounded-3xl overflow-hidden border-0 ring-1 ring-purple-200">
        <CardHeader className="text-center py-24 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-100 to-blue-200 rounded-2xl flex items-center justify-center">
            <CalendarDays className="w-12 h-12 text-purple-500" />
          </div>
          <CardTitle className="text-2xl text-slate-700 mb-4">
            Generate a strategy to see your content calendar
          </CardTitle>
          <CardDescription className="text-lg text-slate-600">
            Your personalized 28-day content plan will appear here once generated
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

  const getPostForDay = (week: string, day: string) => {
    return strategy.calendar.find(item => item.week === week && item.day === day);
  };

  const getGeneratedPost = (dayNumber: number) => {
    return posts.find(post => post.dayNumber === dayNumber);
  };

  const getDayNumber = (weekIndex: number, dayIndex: number) => {
    return weekIndex * 7 + dayIndex + 1;
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Twitter':
        return <Twitter className="w-3 h-3 mr-1 text-blue-500" />;
      case 'LinkedIn':
        return <Linkedin className="w-3 h-3 mr-1 text-indigo-600" />;
      case 'Instagram':
        return <Instagram className="w-3 h-3 mr-1 text-pink-500" />;
      default:
        return null;
    }
  };

  const getPlatformColors = (platform: string) => {
    switch (platform) {
      case 'Twitter':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'LinkedIn':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Instagram':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-white/95 shadow-xl rounded-3xl overflow-hidden border-0 ring-1 ring-purple-200">
        <CardHeader className="p-8 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-slate-800">
                  Content Calendar
                </CardTitle>
                <CardDescription className="text-slate-600 text-lg mt-1">
                  Your 28-day content strategy overview
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-6 flex-wrap gap-4">
              <AutoPostToggle />
              <Button 
                onClick={() => setShowScheduleModal(true)}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Calendar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="space-y-12">
            {weeks.map((week, weekIndex) => (
              <div key={week} className="space-y-6">
                <h3 className="text-xl font-bold text-slate-700 border-b-2 border-gradient-to-r from-purple-200 to-blue-200 pb-3">
                  {week}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {days.map((day, dayIndex) => {
                    const calendarItem = getPostForDay(week, day);
                    const dayNumber = getDayNumber(weekIndex, dayIndex);
                    const generatedPost = getGeneratedPost(dayNumber);
                    
                    return (
                      <Card 
                        key={day} 
                        className={`border transition-all duration-300 hover:shadow-md rounded-2xl overflow-hidden ${
                          calendarItem 
                            ? 'bg-white border-purple-200 hover:border-purple-400' 
                            : 'bg-gradient-to-br from-gray-50 to-purple-50 border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <CardContent className="p-5">
                          <div className="text-sm font-semibold text-slate-500 mb-3">
                            {day}
                          </div>
                          
                          {calendarItem ? (
                            <div className="space-y-4">
                              <div>
                                <div className="font-semibold text-slate-800 text-sm mb-2 line-clamp-2">
                                  {calendarItem.title}
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-xs font-medium flex items-center
                                      `}
                                      //  ${getPlatformColors(calendarItem.raw_data.Platform)}
                                  >
                                    {/* {getPlatformIcon(calendarItem.raw_data.Platform)}
                                    {calendarItem.raw_data.Platform} */}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                                    {/* {calendarItem.raw_data.Type} */}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                {generatedPost ? (
                                  <div className="space-y-3">
                                    <div className="flex items-center text-emerald-600 text-xs font-medium">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Generated
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setSelectedPost({ ...generatedPost, calendarItem })}
                                      className="w-full text-xs rounded-lg border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-slate-700 transition-colors"
                                    >
                                      <Edit className="w-3 h-3 mr-1" />
                                      Edit Post
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    size="sm"
                                    onClick={() => generatePost(dayNumber)}
                                    disabled={isGenerating}
                                    className="w-full text-xs bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
                                  >
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Generate Post
                                  </Button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400 italic text-center py-6">
                              No content planned
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedPost && (
        <PostEditor
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {showScheduleModal && (
        <ScheduleModal
          posts={posts}
          calendar={strategy.calendar}
          onClose={() => setShowScheduleModal(false)}
        />
      )}
    </div>
  );
};
