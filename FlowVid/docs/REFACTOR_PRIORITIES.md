# Refactor Priorities

Diese Liste priorisiert die wichtigsten Refactor-Maßnahmen für `FlowVid` nach Risiko, Wartbarkeit und Umsetzungseffekt.

## P0 - Funktionale Korrektheit und akute Bugs

### 1. Auth-, Register- und Upload-Flows reparieren
Priorität: Sehr hoch

Warum:
- Der Register-Flow verwendet stale bzw. falsche Werte für den anschließenden Login.
- Der Upload-Flow navigiert auf Basis von React-State, der direkt nach `setState` noch nicht aktualisiert ist.
- Fehlerfälle aus dem Backend werden nicht sauber erkannt oder angezeigt.

Was zu tun ist:
- In `Register.jsx` keine Zwischenablage über separaten Component-State mehr verwenden, sondern direkt mit `values.email` und `values.password` weiterarbeiten.
- In `Upload.jsx` die Navigation direkt mit der Response-ID ausführen, statt zuerst `videoId` zu setzen und danach denselben State synchron auszulesen.
- Form-Submit-Handler so umbauen, dass Erfolgs- und Fehlerpfade eindeutig sind.
- Nutzerfreundliche Fehlermeldungen für fehlgeschlagene Requests einbauen.

Akzeptanzkriterien:
- Registrierung legt Account an und meldet den Nutzer direkt korrekt an.
- Upload leitet nach erfolgreichem Submit zuverlässig auf `/video/:id` weiter.
- Fehlgeschlagene Requests werden sichtbar behandelt.

### 2. Routing-Pfade vereinheitlichen
Priorität: Sehr hoch

Warum:
- Mehrere `Link`-Ziele sind relativ definiert, obwohl sie global gemeint sind.
- Das ist auf verschachtelten Routen fehleranfällig und erzeugt inkonsistente Navigation.

Was zu tun ist:
- Alle globalen Ziele auf absolute Pfade umstellen, z. B. `/login`, `/upload`, `/channel/:id`.
- Besonders prüfen: `Header.jsx`, `VideoComments.jsx` und andere Links innerhalb verschachtelter Views.
- Optional: kleine Routing-Konstanten einführen, damit Pfade nicht mehrfach als String verteilt sind.

Akzeptanzkriterien:
- Navigation funktioniert identisch von Startseite, Video-Seite und Channel-Unterseiten.
- Keine versehentlich verschachtelten URLs mehr.

### 3. Fetch-Fehlerbehandlung korrigieren
Priorität: Sehr hoch

Warum:
- Es wird teils `res.error` geprüft, was bei `fetch` nicht existiert.
- Dadurch können Serverfehler stillschweigend als Erfolg behandelt werden.

Was zu tun ist:
- Alle Request-Stellen auf `res.ok` umstellen.
- Eine einheitliche Fehlerstruktur definieren, z. B. `{ message, status, statusText }`.
- JSON-Parsing nur nach erfolgreichem oder bewusst behandeltem Response-Status ausführen.
- Netzwerk- und Parsingfehler separat behandeln.

Akzeptanzkriterien:
- Fehlerhafte Responses werden zuverlässig erkannt.
- Komponenten bekommen konsistente Fehlerobjekte.

## P1 - Separation of Concerns und Wartbarkeit

### 4. API-Zugriffe aus Komponenten herausziehen
Priorität: Hoch

Warum:
- Request-Logik ist aktuell in `UserContext`, `Upload`, `Register` und `VideoComments` verteilt.
- UI-Komponenten tragen dadurch zu viel Verantwortung.

Was zu tun ist:
- Einen zentralen Ordner wie `src/api/` oder `src/services/` einführen.
- Dort Funktionen für `login`, `register`, `uploadVideo`, `loadVideo`, `loadChannel`, `addComment`, `deleteComment` bündeln.
- Komponenten sollen nur noch Daten an Service-Funktionen übergeben und deren Ergebnis rendern.

Empfohlene Struktur:
- `src/api/auth.js`
- `src/api/videos.js`
- `src/api/channels.js`
- `src/api/comments.js`

Akzeptanzkriterien:
- Komponenten enthalten keine direkten `fetch`-Aufrufe mehr.
- API-Logik ist zentral testbar und konsistent.

### 5. `UserContext` verschlanken
Priorität: Hoch

Warum:
- Der Context kümmert sich gleichzeitig um State, Persistenz und Netzwerklogik.
- Zusätzlich verletzt die Datei die Fast-Refresh-Regel des ESLint-Setups.

Was zu tun ist:
- Context, Hook und Auth-Service trennen.
- `UserContext.jsx` nur für Provider und Context-Wert nutzen.
- `useAuth` in eigene Datei auslagern oder die Exporte so strukturieren, dass Fast Refresh sauber bleibt.
- Optional: `localStorage`-Zugriffe in kleine Helper kapseln.

Akzeptanzkriterien:
- `UserContext` enthält primär Provider-Logik.
- Lint-Fehler zu `react-refresh/only-export-components` verschwinden.

### 6. Große UI-Komponenten zerlegen
Priorität: Hoch

Warum:
- Besonders `VideoComments` vereint Rendering, Formular, Request-Handling, Delete-Modal und Ownership-Checks.
- Solche Komponenten werden schnell schwer testbar und fehleranfällig.

Was zu tun ist:
- `VideoComments` aufteilen in z. B.:
  - `CommentForm`
  - `CommentList`
  - `CommentItem`
  - `DeleteCommentModal`
- Ownership- und Permissions-Checks nicht inline überall wiederholen.
- Optimistische UI nur beibehalten, wenn Fehler-Rollback sauber implementiert ist.

Akzeptanzkriterien:
- Einzelne Komponenten haben klar abgegrenzte Verantwortung.
- Kommentar-Handling ist leichter nachvollziehbar und erweiterbar.

## P2 - Konventionen, Konsistenz und Codequalität

### 7. Utilities zentralisieren und Duplikate entfernen
Priorität: Mittel

Warum:
- Zeitformatierungslogik ist mehrfach dupliziert.
- Bereits jetzt sind Varianten leicht unterschiedlich.

Was zu tun ist:
- `getTimeDifference` und `convertMilliseconds` nur noch an einer Stelle pflegen.
- `Home.jsx` und `Recommendations.jsx` auf die zentrale Utility umstellen.
- Prüfen, ob `randomizer` rein funktional bleiben soll oder durch eine nicht-mutierende Variante ersetzt wird.

Akzeptanzkriterien:
- Keine duplizierten Utility-Funktionen mehr.
- Gleiches Input-Verhalten an allen Stellen.

### 8. Naming- und File-Konventionen festziehen
Priorität: Mittel

Warum:
- PascalCase wird teils für Nicht-Komponenten genutzt.
- Schreibweisen sind nicht konsistent.
- Einige Datenfelder aus JSON erschweren die Verarbeitung.

Was zu tun ist:
- Konvention definieren:
  - Komponenten in PascalCase
  - Hooks mit `use...`
  - Utility- und Service-Funktionen in camelCase
- `LoadVideo` und `LoadChannel` in `loadVideo` und `loadChannel` umbenennen.
- `Recomendations` in `Recommendations` korrigieren.
- Problematische Feldnamen wie `date-uploaded` möglichst beim Mappen in frontend-freundliche Struktur überführen.

Akzeptanzkriterien:
- Namen sind nach Rolle eindeutig lesbar.
- Sonderbehandlung von API-/JSON-Feldern im UI wird reduziert.

### 9. Lint sauber ziehen und Baseline etablieren
Priorität: Mittel

Warum:
- `npm run lint` schlägt aktuell fehl.
- Solange die Baseline rot ist, verlieren neue Verstöße an Sichtbarkeit.

Was zu tun ist:
- Ungenutzte Variablen entfernen.
- Debug-Logs aus Produktionscode entfernen.
- Hook-Abhängigkeiten prüfen und sauber lösen.
- Danach Lint als verpflichtende Qualitätsgrenze behandeln.

Akzeptanzkriterien:
- `npm run lint` läuft ohne Errors.
- Warning-Level ist bewusst und klein gehalten.

## P3 - UI- und Strukturverbesserungen

### 10. Styling-Strategie vereinheitlichen
Priorität: Mittel bis niedrig

Warum:
- Tailwind und globale CSS-Regeln werden parallel genutzt, aber ohne klare Grenze.
- Das erschwert Wiederverwendung und Vorhersagbarkeit.

Was zu tun ist:
- Entscheiden, welche Rolle Tailwind im Projekt haben soll:
  - Utility-first für Komponenten
  - globale CSS nur für Layout- oder Theme-Basics
- Globale Regeln in `index.css` reduzieren.
- Breiten wie `100vw` kritisch prüfen, um horizontales Overflow zu vermeiden.
- Wiederkehrende UI-Muster wie Buttons, Cards und Layout-Container konsolidieren.

Akzeptanzkriterien:
- Styling folgt einer nachvollziehbaren Strategie.
- Weniger globale Seiteneffekte durch globale CSS-Regeln.

### 11. Accessibility und Semantik verbessern
Priorität: Mittel bis niedrig

Warum:
- Mehrere Bilder haben kein `alt`.
- Einzelne Interaktionen und Texte sind semantisch schwach oder unpräzise.
- Die Beschreibung im Video wird derzeit praktisch unbrauchbar abgeschnitten.

Was zu tun ist:
- Fehlende `alt`-Texte ergänzen.
- Buttons, Links und Formularfelder semantisch prüfen.
- `VideoInfo` so anpassen, dass Vorschau und Expand-Verhalten sinnvoll sind.
- Fehler- und Ladezustände konsistent mit `aria-live` und verständlichen Texten darstellen.

Akzeptanzkriterien:
- Wichtige Medien und Interaktionen sind semantisch sauber.
- UI bleibt auch ohne visuelle Annahmen verständlich.

## Empfohlene Umsetzungsreihenfolge

1. P0 komplett abschließen.
2. Lint-Fehler parallel mitziehen, sobald betroffene Dateien ohnehin angefasst werden.
3. API-Zugriffe zentralisieren und `UserContext` vereinfachen.
4. `VideoComments` und ähnliche Misch-Komponenten aufspalten.
5. Utilities, Naming und Styling-Konventionen bereinigen.

## Sinnvolle Zielstruktur

```text
src/
  api/
    auth.js
    videos.js
    channels.js
    comments.js
  components/
  context/
    UserContext.jsx
  hooks/
    useAuth.js
    useVideo.js
    useChannel.js
  utils/
    date.js
    array.js
```

## Quick Wins

- Relative Links auf absolute Pfade umstellen.
- `res.error` überall durch `res.ok`-basierte Behandlung ersetzen.
- Register- und Upload-Submit-Flows korrigieren.
- Doppelte Zeit-Utilities entfernen.
- `console.log`-Reste löschen.
- Lint auf grün bringen.
