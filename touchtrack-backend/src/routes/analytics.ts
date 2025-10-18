import { Router, Request, Response } from 'express';
import { query } from '../db/connection';
import { AnalyticsSummary, ApiResponse } from '../types';

const router = Router();

// GET /api/analytics - Get summary analytics
router.get('/', async (req: Request, res: Response) => {
  try {
    // Get total accounts
    const accountsResult = await query('SELECT COUNT(*) as count FROM accounts');
    const totalAccounts = parseInt(accountsResult.rows[0].count);

    // Get total touchpoints
    const touchpointsResult = await query('SELECT COUNT(*) as count FROM touchpoints');
    const totalTouchpoints = parseInt(touchpointsResult.rows[0].count);

    // Get touchpoints by type
    const byTypeResult = await query(`
      SELECT 
        touchpoint_type as type, 
        COUNT(*) as count 
      FROM touchpoints 
      GROUP BY touchpoint_type 
      ORDER BY count DESC
    `);

    const touchpointsByType = byTypeResult.rows.map(row => ({
      type: row.type,
      count: parseInt(row.count)
    }));

    // Get touchpoints by channel
    const byChannelResult = await query(`
      SELECT 
        channel, 
        COUNT(*) as count 
      FROM touchpoints 
      GROUP BY channel 
      ORDER BY count DESC
    `);

    const touchpointsByChannel = byChannelResult.rows.map(row => ({
      channel: row.channel,
      count: parseInt(row.count)
    }));

    // Calculate average touchpoints per account
    const avgTouchpoints = totalAccounts > 0 
      ? parseFloat((totalTouchpoints / totalAccounts).toFixed(2))
      : 0;

    const analytics: AnalyticsSummary = {
      total_accounts: totalAccounts,
      total_touchpoints: totalTouchpoints,
      touchpoints_by_type: touchpointsByType,
      touchpoints_by_channel: touchpointsByChannel,
      avg_touchpoints_per_account: avgTouchpoints
    };

    const response: ApiResponse<AnalyticsSummary> = {
      success: true,
      data: analytics
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics'
    });
  }
});

// GET /api/analytics/recent - Get recent touchpoint activity
router.get('/recent', async (req: Request, res: Response) => {
  try {
    const { days = 7 } = req.query;

    const result = await query(`
      SELECT 
        DATE(t.created_at) as date,
        COUNT(*) as count
      FROM touchpoints t
      WHERE t.created_at >= NOW() - INTERVAL '${parseInt(days as string)} days'
      GROUP BY DATE(t.created_at)
      ORDER BY date DESC
    `);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recent activity'
    });
  }
});

export default router;