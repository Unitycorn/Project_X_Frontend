# Test And Refactor Roadmap

## Ziel

Diese Roadmap priorisiert die naechsten Schritte so, dass zuerst funktionale Risiken reduziert werden, dann die Testbarkeit verbessert wird und danach eine erste stabile Test-Suite aufgebaut werden kann.

Die Reihenfolge ist bewusst nicht:

1. alles refactoren
2. danach testen

Sondern:

1. kritische Bugs und testrelevante Strukturthemen beheben
2. kleine stabile Architektur-Basis schaffen
3. frueh eine erste Test-Suite aufsetzen

## Empfohlene Arbeitspakete

### 1. P0 komplett abschliessen

Zuerst alle funktionalen Probleme beheben, die sonst spaeter Tests instabil oder unzuverlaessig machen.

Umfang:

- Auth-, Register- und Upload-Flows reparieren
- Routing-Pfade vereinheitlichen
- Fetch-Fehlerbehandlung konsistent auf `res.ok` umstellen

Ziel:

- Registrierung funktioniert zuverlaessig
- Upload navigiert stabil auf `/video/:id`
- Fehler aus dem Backend werden sichtbar behandelt
- Navigation funktioniert auch aus verschachtelten Routen korrekt

Betroffene Dateien wahrscheinlich:

- `src/components/Register.jsx`
- `src/pages/Upload.jsx`
- `src/components/Login.jsx`
- `src/components/Header.jsx`
- `src/components/video/VideoComments.jsx`
- `src/Utilities.js`

### 2. Lint-Baseline auf gruen bringen

Direkt danach die aktuelle Fehlerbasis bereinigen.

Umfang:

- ungenutzte Variablen entfernen
- `console.log`-Reste loeschen
- Hook-Abhaengigkeiten sauber pruefen

Ziel:

- `npm run lint` laeuft ohne Errors

Nutzen:

Eine gruene Baseline macht spaetere Test- und Refactor-Arbeit deutlich kontrollierbarer.

### 3. API-Logik aus UI-Komponenten herausziehen

Danach die Request-Logik zentralisieren, damit sie separat testbar und wiederverwendbar wird.

Umfang:

- `src/api/` oder `src/services/` einfuehren
- Auth-, Video-, Channel- und Upload-Requests aus Komponenten auslagern
- einheitliche Fehlerobjekte etablieren

Empfohlene Zielstruktur:

```text
src/
  api/
    auth.js
    videos.js
    channels.js
```

Ziel:

- Komponenten enthalten moeglichst keine direkten `fetch`-Aufrufe mehr
- Netzwerklogik ist isoliert testbar

### 4. `UserContext` verschlanken

Wenn die API-Logik ausgelagert ist, sollte der Context nur noch State und Provider-Verhalten kapseln.

Umfang:

- `login`-Netzwerklogik aus dem Context herausziehen
- optional `localStorage`-Helper kapseln
- Hook/Context-Struktur sauber trennen

Empfohlene Zielstruktur:

```text
src/
  context/
    UserContext.jsx
  hooks/
    useAuth.js
```

Ziel:

- `UserContext` bleibt schlank
- Auth-Verhalten wird einfacher testbar

### 5. Utilities bereinigen und Duplikate entfernen

Vor dem Test-Setup noch die offensichtlichen Duplikate entfernen, damit Tests nicht doppelte Logik absichern muessen.

Umfang:

- Zeitformatierungslogik zentralisieren
- `Home.jsx` und `Recommendations.jsx` auf dieselben Utilities umstellen
- `randomizer` auf klare, moeglichst nicht-mutierende Semantik pruefen

Empfohlene Zielstruktur:

```text
src/
  utils/
    date.js
    array.js
```

Ziel:

- eine Quelle fuer Zeitberechnung
- weniger inkonsistentes Verhalten zwischen Screens

### 6. Test-Infrastruktur einfuehren

Erst jetzt die eigentliche Test-Basis aufsetzen.

Umfang:

- `Vitest`
- `@testing-library/react`
- `@testing-library/user-event`
- `jsdom`
- gemeinsames `setupTests`

Zusatz:

- `renderWithProviders` bereitstellen
- `fetch`-Mocking standardisieren
- `localStorage` pro Test sauber zuruecksetzen
- Routen testbar machen, idealerweise durch Trennung von `AppRoutes` und `BrowserRouter`

Ziel:

- schneller Start fuer weitere Tests
- stabile Testausfuehrung ohne viel Duplikat-Setup

### 7. Erste Test-Baseline fuer kritische Flows bauen

Danach nur die wichtigsten Dinge absichern, nicht sofort das ganze Projekt.

Empfohlene erste Tests:

- `UserContext`
  - Initialisierung aus `localStorage`
  - `login`
  - `logOut`
  - Fehlerfall
- `AuthRequired`
  - Redirect wenn nicht eingeloggt
  - Rendern des geschuetzten Inhalts wenn eingeloggt
- `Login`
  - Formularinteraktion
  - Loading-State
  - Fehleranzeige
  - Navigation nach Erfolg
- `Upload`
  - erfolgreicher Submit
  - Fehlerfall
  - Redirect auf `/video/:id`
- `VideoPage`
  - Loading
  - Erfolg
  - Fehler
- `ChannelLayout`
  - Loading
  - Erfolg
  - Fehler

Ziel:

- frueher Regression-Schutz fuer die wichtigsten Nutzerpfade

### 8. Unit-Tests fuer Utilities und Services ergaenzen

Wenn die Baseline steht, die guenstigen Tests nachziehen.

Empfohlene Tests:

- Zeit-Utilities
- `randomizer`
- API-Service-Funktionen
- Fehler-Mapping der Services

Ziel:

- schneller, stabiler Testbestand mit hoher Aussagekraft

### 9. Danach groessere Component-Refactors angehen

Erst wenn die kritischen Flows abgesichert sind, sollten groessere UI-Zerlegungen folgen.

Umfang:

- `VideoComments` aufteilen
- weitere Misch-Komponenten in kleinere Einheiten zerlegen
- Naming-Konventionen nachziehen

Ziel:

- bessere Wartbarkeit ohne ungesicherte Grossumbauten

### 10. E2E-Tests als letzte Stufe einfuehren

Zum Schluss die wichtigsten End-to-End-Wege absichern.

Empfohlene Bereiche:

- Login
- Protected Route `/upload`
- Upload
- Video-Detailseite
- Channel-Seite

Werkzeug:

- `Playwright`

Hinweis:

Falls kein stabiles Backend fuer CI existiert, sollten die API-Wege per Mocking oder sauber aktiviertem `MirageJS` kontrolliert werden.

## Empfohlene Reihenfolge in kurz

1. P0 komplett
2. Lint bereinigen
3. API-Logik auslagern
4. `UserContext` verschlanken
5. Utilities zentralisieren
6. Test-Infrastruktur aufsetzen
7. Erste kritische Integrationstests schreiben
8. Utility- und Service-Tests ergaenzen
9. groessere UI-Refactors nachziehen
10. E2E-Tests einfuehren

## Praktische Empfehlung

Wenn du das in Etappen umsetzen willst, sind diese drei Meilensteine sinnvoll:

### Meilenstein 1

- P0 abschliessen
- Lint auf gruen

### Meilenstein 2

- API- und Context-Bereinigung
- Utilities zentralisieren

### Meilenstein 3

- Test-Setup
- erste `8-12` Tests fuer die kritischen Flows

Damit bekommst du frueh Stabilitaet, ohne die Tests zu lange nach hinten zu verschieben.
