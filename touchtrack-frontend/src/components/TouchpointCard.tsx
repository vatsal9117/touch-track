import type { Touchpoint } from '../types';
import { formatRelativeTime, getTouchpointColor, formatTouchpointType, formatChannel } from '../utils/helpers';

interface TouchpointCardProps {
  touchpoint: Touchpoint;
}

export default function TouchpointCard({ touchpoint }: TouchpointCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTouchpointColor(touchpoint.touchpoint_type)}`}>
              {formatTouchpointType(touchpoint.touchpoint_type)}
            </span>
            <span className="text-sm text-gray-500">
              via {formatChannel(touchpoint.channel)}
            </span>
          </div>
          
          {touchpoint.description && (
            <p className="text-gray-700 mb-2">{touchpoint.description}</p>
          )}
          
          {touchpoint.page_url && (
            <p className="text-sm text-gray-500 mb-2">
              Page: <span className="font-mono text-xs">{touchpoint.page_url}</span>
            </p>
          )}
        </div>
        
        <div className="text-right ml-4">
          <p className="text-sm text-gray-500">
            {formatRelativeTime(touchpoint.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}