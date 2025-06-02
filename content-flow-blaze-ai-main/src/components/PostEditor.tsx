
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Save, Send, Twitter, Linkedin } from 'lucide-react';
import { useStrategy } from '@/hooks/useStrategy';
import { useAutoPost } from '@/hooks/useAutoPost';

interface PostEditorProps {
  post: any;
  onClose: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ post, onClose }) => {
  const [editInstructions, setEditInstructions] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { editPost } = useStrategy();
  const { autoPostToTwitter, isPosting } = useAutoPost();

  const handleEdit = async () => {
    if (!editInstructions.trim()) return;
    
    setIsEditing(true);
    await editPost(post.content, editInstructions);
    setEditInstructions('');
    setIsEditing(false);
  };

  const handleAutoPost = async () => {
    await autoPostToTwitter(post.title, post.content);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-white border-0 shadow-2xl rounded-3xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pt-6 px-8 border-b border-slate-100">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Edit Post
            </CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge 
                variant="secondary" 
                className={`text-xs flex items-center ${
                  post.calendarItem?.raw_data.Platform === 'Twitter' 
                    ? 'bg-blue-100 text-blue-700 border-blue-200' 
                    : 'bg-indigo-100 text-indigo-700 border-indigo-200'
                }`}
              >
                {post.calendarItem?.raw_data.Platform === 'Twitter' ? (
                  <Twitter className="w-3 h-3 mr-1" />
                ) : (
                  <Linkedin className="w-3 h-3 mr-1" />
                )}
                {post.calendarItem?.raw_data.Platform}
              </Badge>
              <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                {post.calendarItem?.raw_data.Type}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div>
            <Label htmlFor="title" className="text-sm font-semibold text-slate-700 mb-2 block">
              Title
            </Label>
            <Input
              id="title"
              value={post.title}
              className="bg-slate-50 border-slate-200 text-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-sm font-semibold text-slate-700 mb-2 block">
              Content
            </Label>
            <Textarea
              id="content"
              value={post.content}
              className="min-h-[300px] resize-none bg-slate-50 border-slate-200 text-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          <div className="border-t border-slate-200 pt-6 space-y-4">
            <Label htmlFor="instructions" className="text-sm font-semibold text-slate-700 mb-2 block">
              Edit Instructions
            </Label>
            <Textarea
              id="instructions"
              placeholder="e.g., Make it shorter, add more emojis, change the tone to be more casual..."
              value={editInstructions}
              onChange={(e) => setEditInstructions(e.target.value)}
              className="min-h-[100px] resize-none bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Button
                onClick={handleEdit}
                disabled={!editInstructions.trim() || isEditing}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-200"
              >
                {isEditing ? 'Editing...' : 'Apply Edits'}
              </Button>

              {post.calendarItem?.raw_data.Platform === 'Twitter' && (
                <Button
                  onClick={handleAutoPost}
                  disabled={isPosting}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 flex items-center"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  {isPosting ? 'Posting...' : 'Auto-Post to Twitter'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
