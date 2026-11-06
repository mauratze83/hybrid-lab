---
title: "„Düsseldorf 3:30“: Mein Marathon-Coach als App, gebaut mit Claude"
description: "Trainingsplan, Soll/Ist-Abgleich und Workouts direkt auf die Uhr: So funktioniert meine selbstgebaute Coach-App, und so baust du dir deine eigene."
date: 2026-11-05
category: Laufen
tags: [Marathon, Trainingsplan, KI, intervals.icu, Claude]
---

Für den Düsseldorf Marathon im April 2027 habe ich mir keinen Trainingsplan als PDF heruntergeladen. Ich habe mir mit der KI Claude eine eigene Coach-App gebaut, ohne selbst zu programmieren. Sie heißt **„Düsseldorf 3:30“**, nach meinem Ziel: Marathon in 3:30 Stunden. Kein Coach, der mir motivierende Sprachnachrichten schickt, sondern eine Web-App, die mir freundlich, aber gnadenlos anzeigt, welche Einheit ich nicht gelaufen bin.

In diesem Artikel zeige ich dir, was die App kann, wie sie technisch zusammenhängt und wie du dir deine eigene baust, für 5 km bis Marathon.

## Was die App kann

| Ansicht | Was sie zeigt |
|---|---|
| **Woche** | Die Einheiten der aktuellen Woche: Art, Distanz, Ablauf mit Pace- und Pulsbereichen, Soll/Ist-Status |
| **Gesamtplan** | Alle Wochen bis zum Rennen mit Phasen (Grundlage, Aufbau, Spezifisch, Taper) und Soll/Ist-Kilometern |
| **Paces & Puls** | Meine Trainingszonen, berechnet aus einer Referenzzeit und meinen Pulswerten |
| **Tipps** | Lauftechnik, Ernährung, Erholung und Rennstrategie |

Mein Plan läuft über 25 Wochen mit **drei Läufen pro Woche**: ein langer Lauf am Sonntag, eine Qualitätseinheit und ein lockerer Lauf. Zwischen zwei Läufen liegt immer mindestens ein Ruhetag. Urlaub und Zwischenrennen sind fest eingeplant.

Das Praktische: Nach meinem Halbmarathon beim Rhein City Run (1:42:01) habe ich nur die neue Referenzzeit eingetragen. Alle Paces und die Prognose für den Marathon haben sich automatisch neu berechnet.

## Wie das technisch zusammenhängt

Das Herzstück ist **[intervals.icu](https://intervals.icu)**. Die Trainingsplattform ist kostenlos und verbindet sich mit fast jeder Uhr.

1. **Die Uhr schickt meine Läufe** an intervals.icu.
2. **Die App gleicht ab:** Welcher Lauf passt zu welcher geplanten Einheit? Dabei zählen dieselbe Woche, eine ähnliche Distanz und der nächstliegende Tag.
3. **Geplante Workouts gehen zurück auf die Uhr:** Die Einheiten stehen als strukturierte Workouts im intervals.icu-Kalender, und die Uhr bekommt sie automatisch. Ich laufe mit einer Amazfit Balance 2, sie bekommt die Workouts über die Zepp-App.

Strava oder eine manuelle Eingabe funktionieren als Ersatz, wenn kein intervals.icu genutzt wird.

> **Stolperfalle bei Amazfit/Zepp:** In intervals.icu reicht „verbunden“ nicht. Unter Settings → Amazfit muss zusätzlich das Hochladen geplanter Workouts angehakt sein. Danach die Zepp-App einmal komplett neu starten. Die Workouts erscheinen dann in der intervals.icu-App auf der Uhr, nicht im normalen Trainingsmenü.

## Anleitung: So baust du dir deinen eigenen Coach

Du brauchst ein Claude-Konto, etwa eine Stunde Zeit und die Antworten auf ein paar Fragen zu deinem Training. Programmieren musst du nicht.

### Schritt 1: Drei Entscheidungen treffen

1. **Woher kommen deine Ist-Daten?** Am besten über intervals.icu. Alternativ über den Strava-Connector in Claude oder per manueller Eingabe, wenn du ohne Uhr läufst.
2. **Welche Uhr trägst du?** Davon hängt ab, ob Workouts automatisch auf die Uhr kommen und ob die Uhr Routen navigieren kann.
3. **Wie viel willst du trainieren?** Läufe pro Woche, feste oder flexible Tage, Tag für den langen Lauf, Urlaub und Zwischenrennen.

### Schritt 2: intervals.icu einrichten

1. Kostenloses Konto auf [intervals.icu](https://intervals.icu) anlegen.
2. Unter Settings → Connections deinen Uhr-Anbieter verbinden. Bei Amazfit geht das in der Zepp-App unter Drittanbieter-Konten.
3. Das Hochladen geplanter Workouts einschalten, wo es angeboten wird.
4. Prüfen: Nach dem nächsten Lauf muss er im intervals.icu-Kalender auftauchen.

### Schritt 3: Passt deine Uhr?

Stand Oktober 2026, ohne Gewähr. Funktionen ändern sich mit Updates.

| Marke | Läufe → intervals.icu | Workouts → Uhr |
|---|---|---|
| Garmin | ja | ja |
| COROS | ja | ja |
| Suunto | ja | ja |
| Amazfit / Zepp | ja | nur ausgewählte Modelle (z. B. Balance 2, T-Rex 3 Pro) |
| Huawei | ja | eingeschränkt |
| Polar | ja | nein, Workouts in Polar Flow anlegen |
| Apple Watch | über Brücken-App | über Brücken-App |

Läufst du nur mit einer Handy-App wie adidas Running? Dann kommen die Daten oft über einen Umweg zu intervals.icu, etwa über Strava, Apple Health oder Health Connect. Claude prüft das für deine App.

### Schritt 4: Den Master-Prompt nutzen

Öffne einen neuen Chat in Claude und kopiere diesen Prompt hinein. Claude fragt dich dann der Reihe nach alles Nötige ab und baut die App:

```text
Du bist mein Laufcoach und Web-Entwickler. Baue mir eine persönliche
Trainingsplan-App als Claude-Artefakt (eine einzelne HTML-Seite).
Geh in vier Phasen vor.

PHASE 1 – INTERVIEW (max. 4 Fragen auf einmal)
1. Zielrennen: Name, Datum, Distanz, Zielzeit oder „ankommen“.
2. Aktuelle Form: letzte Rennzeit oder Testlauf, km pro Woche,
   Läufe pro Woche, längster Lauf der letzten 4 Wochen.
3. Pulsdaten: Maximal- und Ruhepuls (sonst schätzen und kennzeichnen).
4. Wochenplanung: Läufe pro Woche, feste/flexible Tage,
   Ruhetag zwischen Läufen, Tag für den langen Lauf, Startdatum.
5. Unterbrechungen: Urlaube, Zwischenrennen.
6. Datenquelle: intervals.icu, Strava, beides oder manuell.
7. Uhr: Marke und genaues Modell.
8. Einschränkungen, die der Plan berücksichtigen soll
   (Hinweis: ersetzt keine ärztliche Beratung).
Fasse alles in einer Tabelle zusammen und lass es mich bestätigen.

PHASE 2 – PRÜFEN
Recherchiere für mein Uhrenmodell: Empfang geplanter Workouts von
intervals.icu, Routenformate, Navigation. Prüfe, welche Connectors
verfügbar sind, und mache je einen lesenden Testaufruf.

PHASE 3 – PLAN BERECHNEN
Phasen Grundlage → Aufbau → Spezifisch → Taper. Umfang steigt max.
ca. 10 % pro Woche, jede 3.–4. Woche Entlastung, ca. 80 % locker.
Jede Einheit mit Distanz und Ablauf in Schritten mit Pace- UND
Pulsbereich. Zonen aus der Referenzzeit (Riegel) und Herzfrequenz-
reserve (Karvonen). Zeig mir Zonen und Wochenübersicht vor dem Bau.

PHASE 4 – APP BAUEN
Ansichten: Woche (Soll/Ist je Einheit), Gesamtplan mit Soll/Ist-km,
Paces & Puls (änderbar, rechnet sofort neu), Tipps.
Datenquellen in der Reihenfolge intervals.icu → Strava → manuell.
Keine API-Keys in der Seite. Je Einheit: Workout-Datei (.fit) und
intervals.icu-Workout-Text; wenn möglich direkt in den Kalender
eintragen. Ruhiges, sportliches Design, gut lesbar am Handy.
Teste danach einen echten Datenabruf und sag mir, was funktioniert.
```

**Tipp:** Wenn du deine Antworten schon kennst, schreib sie direkt unter den Prompt. Dann geht es schneller.

### Schritt 5: Prüfen und anpassen

Die erste Version ist selten perfekt. Bleib im selben Chat und gib Feedback, zum Beispiel:

- „Ich war von [Datum] bis [Datum] krank. Passe die nächsten zwei Wochen an.“
- „Ich bin am [Datum] einen [Distanz] in [Zeit] gelaufen. Aktualisiere meine Zonen.“
- „Ab Woche [X] habe ich Zeit für vier Läufe pro Woche.“

## Grenzen

Der Plan folgt bewährten Trainingsprinzipien, ersetzt aber keinen Trainer und keine ärztliche Beratung. Bei Schmerzen gilt: pausieren und abklären lassen. Und eine App macht dich nicht schneller. Laufen musst du immer noch selbst.

## Fazit

Der Vorteil eines selbstgebauten Coaches ist nicht, dass die Trainingslehre neu wäre. Er passt sich an dein Leben an statt umgekehrt. Wenn du es ausprobierst: Schreib mir gern, wie dein Coach aussieht.
