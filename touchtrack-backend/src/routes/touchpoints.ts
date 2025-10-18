import { Router, Request, Response } from 'express';
import { query } from '../db/connection';
import { CreateTouchpointRequest, ApiResponse } from '../types';

const router = Router();

// GET /api/touchpoints - Get all touchpoints (with optional filters)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { account_id, type, channel, limit = 50 } = req.query;

    let queryText = `
      SELECT 
        t.*,
        a.company_name
      FROM touchpoints t
      JOIN accounts a ON t.account_id = a.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    // Add filters if provided
    if (account_id) {
      queryText += ` AND t.account_id = $${paramIndex}`;
      params.push(account_id);
      paramIndex++;
    }

    if (type) {
      queryText += ` AND t.touchpoint_type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }

    if (channel) {
      queryText += ` AND t.channel = $${paramIndex}`;
      params.push(channel);
      paramIndex++;
    }

    queryText += ` ORDER BY t.created_at DESC LIMIT $${paramIndex}`;
    params.push(parseInt(limit as string));

    const result = await query(queryText, params);

    const response: ApiResponse<any[]> = {
      success: true,
      data: result.rows
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching touchpoints:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch touchpoints'
    });
  }
});

// POST /api/touchpoints - Create new touchpoint
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      account_id,
      touchpoint_type,
      channel,
      page_url,
      description
    }: CreateTouchpointRequest = req.body;

    // Validation
    if (!account_id) {
      return res.status(400).json({
        success: false,
        error: 'account_id is required'
      });
    }

    if (!touchpoint_type) {
      return res.status(400).json({
        success: false,
        error: 'touchpoint_type is required'
      });
    }

    if (!channel) {
      return res.status(400).json({
        success: false,
        error: 'channel is required'
      });
    }

    // Validate touchpoint_type
    const validTypes = ['email_open', 'website_visit', 'demo_request', 'content_download', 'webinar_attended'];
    if (!validTypes.includes(touchpoint_type)) {
      return res.status(400).json({
        success: false,
        error: `Invalid touchpoint_type. Must be one of: ${validTypes.join(', ')}`
      });
    }

    // Validate channel
    const validChannels = ['email', 'linkedin', 'google_ads', 'organic', 'direct'];
    if (!validChannels.includes(channel)) {
      return res.status(400).json({
        success: false,
        error: `Invalid channel. Must be one of: ${validChannels.join(', ')}`
      });
    }

    // Check if account exists
    const accountCheck = await query(
      'SELECT id FROM accounts WHERE id = $1',
      [account_id]
    );

    if (accountCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }

    // Insert touchpoint
    const result = await query(
      `INSERT INTO touchpoints (account_id, touchpoint_type, channel, page_url, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [account_id, touchpoint_type, channel, page_url || null, description || null]
    );

    const response: ApiResponse<any> = {
      success: true,
      data: result.rows[0]
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating touchpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create touchpoint'
    });
  }
});

export default router;