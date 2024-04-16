const express = require("express");
const router = express.Router();
const pool = require("../db");


// Function to get the settings state from the database
async function getSettingsState(label) {
  try {
    const result = await pool.query('SELECT * FROM settings WHERE label = $1', [label]);
    return result.rows[0] || null;
  } catch (err) {
    console.error('Error retrieving settings:', err);
    throw err;
  }
}

// Function to set/update the settings state in the database
async function setSettingsState(label, newState) {
  try {
    await pool.query(
      'INSERT INTO settings (label, is_enabled) VALUES ($1, $2) ON CONFLICT (label) DO UPDATE SET is_enabled = $2',
      [label, newState.isEnabled]
    );
  } catch (err) {
    console.error('Error updating settings:', err);
    throw err;
  }
}

// GET endpoint to retrieve a specific setting state by label
router.get('/:label', async (req, res) => {
  const label = req.params.label;
  try {
    const setting = await getSettingsState(label);
    if (setting) {
      res.json(setting);
    } else {
      res.status(404).json({ message: "Setting not found" });
    }
  } catch (err) {
    console.error('Error in GET /api/settings/:label', err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST endpoint to update a specific setting state by label
router.post('/:label', async (req, res) => {
  const label = req.params.label;
  const { isEnabled } = req.body;
  if (typeof isEnabled !== 'boolean') {
    res.status(400).json({ message: "Invalid value for isEnabled. Must be boolean." });
    return;
  }
  const newState = { isEnabled };
  try {
    await setSettingsState(label, newState);
    res.json({ message: "Setting updated successfully", setting: newState });
  } catch (err) {
    console.error('Error in POST /api/settings/:label', err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;