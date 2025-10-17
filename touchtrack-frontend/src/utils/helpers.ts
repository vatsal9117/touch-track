import type { TouchpointType, Channel } from '../types';

// Format date to relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return past.toLocaleDateString();
};

// Format date to readable string
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Get color for touchpoint type
export const getTouchpointColor = (type: TouchpointType): string => {
  const colors: Record<TouchpointType, string> = {
    email_open: 'bg-blue-100 text-blue-800',
    website_visit: 'bg-green-100 text-green-800',
    demo_request: 'bg-purple-100 text-purple-800',
    content_download: 'bg-yellow-100 text-yellow-800',
    webinar_attended: 'bg-pink-100 text-pink-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

// Get color for channel
export const getChannelColor = (channel: Channel): string => {
  const colors: Record<Channel, string> = {
    email: 'bg-blue-500',
    linkedin: 'bg-blue-700',
    google_ads: 'bg-red-500',
    organic: 'bg-green-500',
    direct: 'bg-gray-500',
  };
  return colors[channel] || 'bg-gray-400';
};

// Format touchpoint type for display
export const formatTouchpointType = (type: TouchpointType): string => {
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Format channel for display
export const formatChannel = (channel: Channel): string => {
  if (channel === 'google_ads') return 'Google Ads';
  return channel.charAt(0).toUpperCase() + channel.slice(1);
};