import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { TimelineData } from '../types';
import { accountsApi } from '../api/client';
import TouchpointCard from '../components/TouchpointCard';
import { ArrowLeft, Building2, Calendar } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function AccountTimeline() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<TimelineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadTimeline(parseInt(id));
    }
  }, [id]);

  const loadTimeline = async (accountId: number) => {
    try {
      setLoading(true);
      const timelineData = await accountsApi.getTimeline(accountId);
      setData(timelineData);
      setError(null);
    } catch (err) {
      setError('Failed to load timeline');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading timeline...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Accounts
        </button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error || 'Timeline not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Accounts
      </button>

      {/* Account Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Building2 className="w-8 h-8 text-blue-600 mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {data.account.company_name}
              </h1>
              {data.account.industry && (
                <p className="text-gray-600 mt-1">{data.account.industry}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              Created {formatDate(data.account.created_at)}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {data.touchpoints.length} touchpoint{data.touchpoints.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Buyer Journey Timeline</h2>
        
        {data.touchpoints.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No touchpoints recorded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.touchpoints.map((touchpoint) => (
              <TouchpointCard key={touchpoint.id} touchpoint={touchpoint} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}