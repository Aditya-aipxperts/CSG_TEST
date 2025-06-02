
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Calendar } from 'lucide-react';
import { useScheduling } from '@/hooks/useScheduling';

interface ScheduleModalProps {
  posts: any[];
  calendar: any[];
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ posts, calendar, onClose }) => {
  const [startDate, setStartDate] = useState('');
  const { scheduleCalendar, isScheduling } = useScheduling();

  const handleSchedule = async () => {
    if (!startDate) {
      alert('Please select a start date');
      return;
    }

    const scheduledPosts = posts.map(post => {
      const calendarItem = calendar.find(item => {
        const dayNumber = getDayNumberFromWeekDay(item.week, item.day);
        return dayNumber === post.dayNumber;
      });
      
      return {
        title: post.title,
        content: post.content,
        week: calendarItem?.week || '',
        day: calendarItem?.day || '',
        raw_data: calendarItem?.raw_data || {}
      };
    });

    await scheduleCalendar(scheduledPosts, startDate);
    onClose();
  };

  const getDayNumberFromWeekDay = (week: string, day: string) => {
    const weekNum = parseInt(week.split(' ')[1]) - 1;
    const dayNum = parseInt(day.split(' ')[1]) - 1;
    return weekNum * 7 + dayNum + 1;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
      <Card className="w-full max-w-md bg-white border-0 shadow-2xl rounded-3xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6 px-8 border-b border-slate-100">
          <CardTitle className="text-xl font-bold text-slate-800">
            Schedule Calendar
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="text-sm text-slate-600 leading-relaxed">
            Schedule your generated posts to start from a specific date. 
            Posts will be scheduled according to your 28-day calendar.
          </div>

          <div>
            <Label htmlFor="startDate" className="text-sm font-semibold text-slate-700 mb-2 block">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-slate-50 border-slate-200 text-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-12"
              required
            />
          </div>

          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
            <div className="text-sm font-semibold text-blue-700 mb-2">
              Posts to Schedule: {posts.length}
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">
              Your posts will be distributed across the 28-day timeline starting from the selected date.
            </div>
          </div>

          <div className="flex space-x-4 pt-2">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-colors rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSchedule}
              disabled={!startDate || isScheduling}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 rounded-xl"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {isScheduling ? 'Scheduling...' : 'Schedule'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
