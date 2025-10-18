import { Router, Request, Response } from 'express';
import { query } from '../db/connection';
import { 
  CreateAccountRequest, 
  AccountWithStats, 
  ApiResponse 
} from '../types';

const router = Router();

// GET /api/accounts - List all accounts with stats
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT 
        a.id,
        a.company_name,
        a.industry,
        a.created_at,
        COUNT(t.id) as touchpoint_count,
        MAX(t.created_at) as last_touchpoint
      FROM accounts a
      LEFT JOIN touchpoints t ON a.id = t.account_id
      GROUP BY a.id, a.company_name, a.industry, a.created_at
      ORDER BY a.created_at DESC
    `);

    const accounts: AccountWithStats[] = result.rows.map(row => ({
      id: row.id,
      company_name: row.company_name,
      industry: row.industry,
      created_at: row.created_at,
      touchpoint_count: parseInt(row.touchpoint_count),
      last_touchpoint: row.last_touchpoint
    }));

    const response: ApiResponse<AccountWithStats[]> = {
      success: true,
      data: accounts
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch accounts'
    });
  }
});

// GET /api/accounts/:id - Get single account details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM accounts WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }

    const response: ApiResponse<any> = {
      success: true,
      data: result.rows[0]
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch account'
    });
  }
});

// POST /api/accounts - Create new account
router.post('/', async (req: Request, res: Response) => {
  try {
    const { company_name, industry }: CreateAccountRequest = req.body;

    // Validation
    if (!company_name || company_name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Company name is required'
      });
    }

    const result = await query(
      'INSERT INTO accounts (company_name, industry) VALUES ($1, $2) RETURNING *',
      [company_name.trim(), industry || null]
    );

    const response: ApiResponse<any> = {
      success: true,
      data: result.rows[0]
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create account'
    });
  }
});

// GET /api/accounts/:id/timeline - Get account's touchpoint timeline
router.get('/:id/timeline', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // First check if account exists
    const accountResult = await query(
      'SELECT * FROM accounts WHERE id = $1',
      [id]
    );

    if (accountResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Account not found'
      });
    }

    // Get all touchpoints for this account
    const touchpointsResult = await query(
      `SELECT * FROM touchpoints 
       WHERE account_id = $1 
       ORDER BY created_at DESC`,
      [id]
    );

    const response: ApiResponse<any> = {
      success: true,
      data: {
        account: accountResult.rows[0],
        touchpoints: touchpointsResult.rows
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch timeline'
    });
  }
});

export default router;