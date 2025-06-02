
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Twitter } from 'lucide-react';

export const AutoPostToggle = () => {
  const [autoPostEnabled, setAutoPostEnabled] = useState(false);

  return (
    <div className="flex items-center space-x-4 bg-gradient-to-r from-purple-50 to-blue-50 backdrop-blur-sm rounded-xl p-4 border border-purple-200 hover:border-purple-300 shadow-sm transition-all duration-200">
      <div className="flex items-center space-x-3">
        <Switch
          id="auto-post"
          checked={autoPostEnabled}
          onCheckedChange={setAutoPostEnabled}
          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-600"
        />
        <Label htmlFor="auto-post" className="text-sm font-semibold text-slate-700 flex items-center">
          <Twitter className="w-4 h-4 mr-2 text-purple-500" />
          Auto-Post to Twitter
        </Label>
      </div>
      <Badge 
        variant={autoPostEnabled ? "default" : "secondary"}
        className={`font-medium ${
          autoPostEnabled 
            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-500/20" 
            : "bg-slate-200 text-slate-600"
        }`}
      >
        {autoPostEnabled ? "Enabled" : "Disabled"}
      </Badge>
    </div>
  );
};
