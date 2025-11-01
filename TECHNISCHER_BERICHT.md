# Technischer Bericht: Desktop-Pseudonymisierung

## Zusammenfassung

Dieses Projekt ist eine Webanwendung zur Pseudonymisierung von Daten. Sie bietet eine sichere Möglichkeit, sensible Informationen zu anonymisieren und dabei ein Mapping-System zur späteren Dereferenzierung beizubehalten.

## Architektur

### Backend

- **Framework**: Express.js (Node.js)
- **Port**: 3000 (konfigurierbar via PORT-Umgebungsvariable)
- **Authentifizierung**: Nicht implementiert (für Produktivumgebungen empfohlen)

### Frontend

- **Struktur**: Single Page Application (SPA)
- **Technologien**: HTML5, CSS3, JavaScript (Vanilla)
- **Location**: `/public`

## Sicherheitsaspekte

### Pseudonymisierungsalgorithmus

```javascript
const hash = crypto.createHash('sha256');
hash.update(data + masterKey);
return hash.digest('hex').substring(0, 16);
```

- Verwendet SHA-256 Hashing
- Kombiniert Eingabedaten mit Master-Key
- Produziert 16-stellige hexadezimale Strings

### Master Key Management

- Master Key wird in `master.key` gespeichert
- WARNUNG: In Produktivumgebungen sollte dies in verschlüsselten Secrets oder Vaults gespeichert werden
- Niemals mit sensiblen Daten im Repository committen

## API-Endpoints

### POST /api/pseudonymize

Pseudonymisiert Daten und speichert das Mapping.

**Request:**
```json
{
  "data": "example@email.com",
  "type": "email"
}
```

**Response:**
```json
{
  "original": "example@email.com",
  "pseudonymized": "a1b2c3d4e5f6g7h8"
}
```

### POST /api/depseudonymize

Reverst die Pseudonymisierung anhand des gespeicherten Mappings.

**Request:**
```json
{
  "pseudonymized": "a1b2c3d4e5f6g7h8"
}
```

**Response:**
```json
{
  "original": "example@email.com",
  "pseudonymized": "a1b2c3d4e5f6g7h8"
}
```

## Datenverwaltung

### mapping.json

Speichert das Mapping zwischen Original- und Pseudonym-Daten.

Format:
```json
{
  "original_data": "pseudonymized_value",
  ...
}
```

## Installation und Betrieb

```bash
# Abhängigkeiten installieren
npm install

# Development Mode
npm run dev

# Production Mode
npm start
```

## Empfohlene Verbesserungen für Produktivumgebungen

1. **Authentifizierung**: Implementieren Sie JWT oder OAuth2
2. **Verschlüsselung**: Nutzen Sie TLS/HTTPS
3. **Secrets Management**: Verwenden Sie AWS Secrets Manager oder HashiCorp Vault
4. **Datenbank**: Ersetzen Sie JSON-Dateien durch eine sichere Datenbank
5. **Audit Logging**: Implementieren Sie umfassendes Logging
6. **Rate Limiting**: Schützen Sie die API vor Missbrauch
7. **Validierung**: Verstärken Sie die Input-Validierung

## Versionsinformation

- Version: 1.0.0
- Node.js: >= 14.0.0
- Status: Beta
