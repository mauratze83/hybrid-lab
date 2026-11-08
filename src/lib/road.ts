// Inhalte der Startseite, die nicht aus den Artikeln kommen.
// Zeitstrahl „Road to 70.3“: status 'done' = erledigt, 'goal' = Hauptziel, sonst offen.
// `now` = Position des „Jetzt“-Markers zwischen zwei Stationen (0 = erste, 1 = zweite …).
export const ROAD = {
  now: { after: 0, label: 'Jetzt: Winteraufbau' },
  stops: [
    { date: '25.10.2026', title: 'Rhein City Run', detail: 'Halbmarathon · 1:42:01', badge: 'Erledigt', status: 'done' },
    { date: 'Jan – Mär 2027', title: 'Winterlaufserie Duisburg', detail: '10 km · 15 km · Halbmarathon', badge: 'Als Nächstes', status: '' },
    { date: 'April 2027', title: 'Düsseldorf Marathon', detail: 'Ziel: 3:30', badge: 'Hauptziel 1', status: '' },
    { date: '06.06.2027', title: 'ENNI Triathlon Moers', detail: 'Generalprobe', badge: 'Test', status: '' },
    { date: 'Ende Aug 2027', title: 'IRONMAN 70.3 Duisburg', detail: 'Ziel: ankommen', badge: 'Hauptziel 2', status: 'goal' },
  ],
} as const;

// „Im Einsatz, nicht im Regal“: nur Ausrüstung, die ich selbst nutze, mit Link zum Erfahrungsbericht.
export const GEAR = [
  { role: 'Tempo', name: 'ASICS Megablast', slug: 'asics-megablast-superblast-3-schuhrotation' },
  { role: 'Alles andere', name: 'ASICS Superblast 3', slug: 'asics-megablast-superblast-3-schuhrotation' },
  { role: 'Rennrad', name: 'Rose Xlite Four', slug: 'rad-setup-rose-xlite-van-rysel-d100-rouvy' },
  { role: 'Rolle', name: 'Van Rysel D100 + ROUVY', slug: 'rad-setup-rose-xlite-van-rysel-d100-rouvy' },
  { role: 'Laufband', name: 'Sportstech sPad1000', slug: 'sportstech-spad1000-laufband' },
] as const;
