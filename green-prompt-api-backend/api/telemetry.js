import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ======================================
// Save Global Metrics (Race Condition Safe)
// ======================================
app.post('/api/v1/save-metrics', async (req, res) => {
  try {
    const { water_saved_ml } = req.body;

    if (
      typeof water_saved_ml !== 'number' ||
      water_saved_ml <= 0
    ) {
      return res.status(400).json({
        error: 'Invalid water_saved_ml value.'
      });
    }

    const water_in_liters = water_saved_ml / 1000;

    // Atomic increment inside PostgreSQL
    const { data, error } = await supabase.rpc(
      'increment_water_saved',
      {
        liters_to_add: water_in_liters
      }
    );

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json({
      status: 'success',
      total_water_saved_liters: data
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});

// ======================================
// Get Global Score
// ======================================
app.get('/api/v1/global-score', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('amux_global_impact')
      .select('total_water_saved_liters')
      .eq('id', 1)
      .single();

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json({
      total: data.total_water_saved_liters
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
});

// ======================================
// Keep Alive
// ======================================
app.get('/api/v1/keep-alive', async (req, res) => {
  try {
    const { error } = await supabase
      .from('amux_global_impact')
      .select('id')
      .eq('id', 1)
      .single();

    if (error) {
      return res.status(500).json({
        status: 'error',
        error: error.message
      });
    }

    return res.status(200).json({
      status: 'alive'
    });

  } catch (err) {
    return res.status(500).json({
      status: 'error',
      error: err.message
    });
  }
});

export default app;