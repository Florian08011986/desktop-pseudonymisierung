// Pseudonymize Form Handler
const pseudonymizeForm = document.getElementById('pseudonymizeForm');
const depseudonymizeForm = document.getElementById('depseudonymizeForm');

pseudonymizeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = document.getElementById('dataInput').value;
  const type = document.getElementById('typeInput').value;
  const resultDiv = document.getElementById('pseudonymResult');

  resultDiv.innerHTML = '<p>Processing...</p>';
  resultDiv.className = 'result loading';

  try {
    const response = await fetch('/api/pseudonymize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data, type })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    resultDiv.innerHTML = `
      <strong>Pseudonymisiert erfolgreich!</strong><br>
      Original: <code>${result.original}</code><br>
      Pseudonym: <code>${result.pseudonymized}</code>
    `;
    resultDiv.className = 'result success';

    // Clear input
    document.getElementById('dataInput').value = '';
  } catch (error) {
    resultDiv.innerHTML = `<strong>Fehler:</strong> ${error.message}`;
    resultDiv.className = 'result error';
  }
});

// Depseudonymize Form Handler
depseudonymizeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pseudonymized = document.getElementById('pseudonymInput').value;
  const resultDiv = document.getElementById('depseudonymResult');

  resultDiv.innerHTML = '<p>Processing...</p>';
  resultDiv.className = 'result loading';

  try {
    const response = await fetch('/api/depseudonymize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pseudonymized })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    resultDiv.innerHTML = `
      <strong>Erfolgreich zurückkonvertiert!</strong><br>
      Original: <code>${result.original}</code><br>
      Pseudonym: <code>${result.pseudonymized}</code>
    `;
    resultDiv.className = 'result success';

    // Clear input
    document.getElementById('pseudonymInput').value = '';
  } catch (error) {
    resultDiv.innerHTML = `<strong>Fehler:</strong> ${error.message}`;
    resultDiv.className = 'result error';
  }
});

// Optional: Log app ready
console.log('Desktop Pseudonymization App Ready');
