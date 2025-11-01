# Desktop-Pseudonymisierung

Ein Node.js-basiertes System zur Pseudonymisierung von Daten mit Web-Frontend.

## Projektstruktur

```
desktop-pseudonymisierung/
├── package.json              # Node.js Abhängigkeiten
├── server.js                 # Backend-Server
├── mapping.json              # Pseudonymisierungs-Mapping
├── master.key                # Verschlüsselungsschlüssel
├── README.md                 # Dokumentation
├── TECHNISCHER_BERICHT.md    # Technische Spezifikation
└── public/                   # Frontend (statische Dateien)
    ├── index.html
    ├── style.css
    └── script.js
```

## Installation

```bash
npm install
```

## Starten des Servers

```bash
node server.js
```

## Features

- Daten-Pseudonymisierung
- Web-basiertes Frontend
- Sichere Schlüsselverwaltung
- JSON-basierte Konfiguration

## Lizenz

MIT
