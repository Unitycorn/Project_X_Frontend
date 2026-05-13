# Test Suite Plan

## Aufwandseinschaetzung

Der Aufwand ist ueberschaubar, aber nicht ganz "Tests installieren und los".

- `0,5-1 Tag`: Basis-Setup, damit Tests sauber laufen
- `2-4 Tage`: brauchbare Unit- und Integration-Tests fuer die kritischen Flows
- `5-8 Tage`: zusaetzlich E2E-Tests fuer Login, Protected Route, Upload und Video-/Channel-Seiten

Der Hauptgrund fuer den initialen Aufwand ist, dass Routing, Fetching und `localStorage` im aktuellen Stand recht direkt in die Komponenten gekoppelt sind. Das ist testbar, braucht aber ein kleines, stabiles Test-Fundament.

Betroffene Kernstellen:

- `src/App.jsx`
- `src/context/UserContext.jsx`
- `src/components/Login.jsx`
- `src/pages/Upload.jsx`
- `src/pages/channel/ChannelLayout.jsx`

## Prioritaet 1

Zuerst die Basis schaffen.

1. `Vitest` + `@testing-library/react` + `@testing-library/user-event` + `jsdom` einrichten.
2. Gemeinsames Test-Setup anlegen:
   `renderWithProviders`, Router-Wrapper, Mocking von `fetch`, Reset von `localStorage`.
3. Kleine Struktur-Anpassung fuer Testbarkeit:
   `AppRoutes` von `BrowserRouter` trennen, damit Routen mit `MemoryRouter` testbar sind.
4. Lint-Baseline bereinigen oder Test-Lint separat halten.

Aktueller Hinweis:

`npm run lint` schlaegt derzeit fehl, unter anderem wegen ungenutzter Variablen in:

- `src/Utilities.js`
- `src/pages/Home.jsx`
- `src/components/Recommendations.jsx`

## Prioritaet 2

Danach die Tests mit dem hoechsten Nutzen.

1. `UserContext` testen:
   Initialisierung aus `localStorage`, `login`, `logOut`, Fehlerfall.
2. `AuthRequired` testen:
   nicht eingeloggt => Redirect zu `/login`, eingeloggt => `Outlet`.
3. `Login` testen:
   Formular, Loading-State, Fehleranzeige, Navigation nach Erfolg.
4. `Upload` testen:
   Formularsendung mit `FormData`, Fehlerfall, Redirect nach erfolgreichem Upload.
5. `VideoPage` und `ChannelLayout` testen:
   Loading, erfolgreicher Fetch, Fehleranzeige.

Damit waere fast der gesamte geschaeftskritische Kern der App abgedeckt.

## Prioritaet 3

Danach guenstige, stabile Unit-Tests.

1. `src/Utilities.js`:
   `convertMilliseconds`, `getTimeDifference`, `LoadVideo`, `LoadChannel`, `randomizer`.
2. Reine Anzeige-Komponenten mit etwas Logik.
3. Home-Seite nur selektiv testen; dort ist der Nutzen geringer, solange noch viel Mock-Daten und Randomisierung enthalten sind.

## Prioritaet 4

Erst danach E2E.

1. `Playwright` einfuehren.
2. Happy Paths abdecken:
   Login, geschuetzte Route `/upload`, Upload erfolgreich, Video-Seite laedt, Channel-Seite laedt.
3. Wenn kein stabiles Backend im CI verfuegbar ist:
   `MirageJS` sauber aktivieren oder API-Aufrufe auf Netzwerkebene mocken.

## Pragmatistische Empfehlung

Nicht mit einer "vollen Test Suite" starten.

Sinnvoller waere eine Baseline aus `Vitest + React Testing Library` und etwa `8-12` Tests fuer:

- Auth
- Login
- Upload
- `VideoPage`
- `ChannelLayout`

Das ist voraussichtlich in `2-3 Tagen` realistisch und bringt sofort echten Schutz gegen Regressionen.
