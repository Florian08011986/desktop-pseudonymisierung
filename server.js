const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Load mapping and key
let mapping = {};
let masterKey = '';

try {
  const mappingPath = path.join(__dirname, 'mapping.json');
  const keyPath = path.join(__dirname, 'master.key');
  
  if (fs.existsSync(mappingPath)) {
    mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  }
  
  if (fs.existsSync(keyPath)) {
    masterKey = fs.readFileSync(keyPath, 'utf8').trim();
  }
} catch (err) {
  console.error('Error loading files:', err);
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/pseudonymize', (req, res) => {
  try {
    const { data, type } = req.body;
    
    if (!data || !type) {
      return res.status(400).json({ error: 'Missing data or type' });
    }
    
    const pseudonymized = pseudonymizeData(data, type);
    
    // Store mapping
    if (!mapping[data]) {
      mapping[data] = pseudonymized;
      fs.writeFileSync(path.join(__dirname, 'mapping.json'), JSON.stringify(mapping, null, 2));
    }
    
    res.json({ original: data, pseudonymized: pseudonymized });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/depseudonymize', (req, res) => {
  try {
    const { pseudonymized } = req.body;
    
    if (!pseudonymized) {
      return res.status(400).json({ error: 'Missing pseudonymized data' });
    }
    
    // Find original in mapping
    const original = Object.keys(mapping).find(key => mapping[key] === pseudonymized);
    
    if (!original) {
      return res.status(404).json({ error: 'No mapping found' });
    }
    
    res.json({ original: original, pseudonymized: pseudonymized });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper function
function pseudonymizeData(data, type) {
  const hash = crypto.createHash('sha256');
  hash.update(data + masterKey);
  return hash.digest('hex').substring(0, 16);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
