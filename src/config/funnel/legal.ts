export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export const LEGAL_INTRO = {
  eyebrow: "Rechtliches",
  notice: "Hinweis: Bitte fehlende Angaben ergänzen und die Texte vor Veröffentlichung rechtlich prüfen lassen.",
};

export const IMPRINT_SECTIONS: LegalSection[] = [
  { title: "Anbieter", paragraphs: ["WYLD Society GmbH", "Marktplatz 16 · 93167 Falkenstein · Deutschland"] },
  { title: "Vertretung", paragraphs: ["Vertreten durch: [Name der vertretungsberechtigten Person ergänzen]"] },
  { title: "Kontakt", paragraphs: ["E-Mail: info@wyldsociety.io", "Telefon: [Telefonnummer ergänzen]"] },
  { title: "Register", paragraphs: ["Registergericht: [Registergericht ergänzen]", "Registernummer: [Registernummer ergänzen]"] },
  { title: "USt-ID", paragraphs: ["Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr. ergänzen]"] },
  { title: "Verantwortlich i.S.d. § 18 MStV", paragraphs: ["[Name ergänzen]", "Marktplatz 16 · 93167 Falkenstein · Deutschland"] },
  { title: "Haftung", paragraphs: ["Wir sind für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Für externe Links übernehmen wir erst ab Kenntnis einer konkreten Rechtsverletzung Verantwortung."] },
  { title: "Urheberrecht", paragraphs: ["Die von uns erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Jede darüber hinausgehende Nutzung bedarf der vorherigen schriftlichen Zustimmung."] },
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  { title: "Verantwortlicher", paragraphs: ["WYLD Society GmbH · Marktplatz 16 · 93167 Falkenstein · Deutschland", "E-Mail: info@wyldsociety.io", "Vertreten durch: [Name ergänzen]"] },
  { title: "Hosting", paragraphs: ["Diese Website wird über Lovable Cloud bereitgestellt. Dabei werden technisch erforderliche Verbindungsdaten verarbeitet, um die Website sicher und zuverlässig auszuliefern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.", "Auftragsverarbeitung, Speicherorte und Löschfristen: [Vertragsangaben prüfen und ergänzen]"] },
  { title: "Erhebung beim Besuch", paragraphs: ["Beim Besuch können insbesondere IP-Adresse, Zeitpunkt, aufgerufene Seite, Referrer, Browser und Betriebssystem in Server-Protokollen verarbeitet werden. Die Verarbeitung dient Sicherheit, Fehleranalyse und technischer Bereitstellung.", "Speicherdauer der Protokolle: [Frist ergänzen]"] },
  { title: "Formulare & Lead-Daten", paragraphs: ["Wenn du ein Formular absendest, verarbeiten wir die dort angegebenen Daten, einschließlich Name, E-Mail-Adresse und gegebenenfalls Telefonnummer. Zweck ist die Bearbeitung deiner Anfrage, die Bereitstellung angeforderter Inhalte und – wenn entsprechend angegeben – ein Rückruf zur Website-Erstellung.", "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO oder Art. 6 Abs. 1 lit. f DSGVO. Eine Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden."] },
  { title: "E-Mail-Marketing via Brevo", paragraphs: ["Nach entsprechender Anmeldung versenden wir E-Mails über Brevo. Dafür werden insbesondere E-Mail-Adresse, Name, Einwilligungsnachweis sowie Zustell- und Interaktionsdaten verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.", "Vollständige Anbieteranschrift, Auftragsverarbeitung und internationale Übermittlungen: [prüfen und ergänzen]"] },
  { title: "CRM via Close", paragraphs: ["Zur strukturierten Bearbeitung von Anfragen nutzen wir Close. Dort können Kontakt-, Kommunikations- und Funnel-Daten gespeichert werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b oder lit. f DSGVO.", "Anbieteranschrift, Standardvertragsklauseln und Löschfristen: [prüfen und ergänzen]"] },
  { title: "Meta Pixel + Conversions API", paragraphs: ["Meta Pixel und Conversions API werden ausschließlich nach deiner Einwilligung eingesetzt. Sie dienen der Reichweitenmessung, Zuordnung von Anfragen und Optimierung von Werbung. Dabei können Browser-, Geräte-, Nutzungs- und Ereignisdaten an Meta übermittelt werden.", "Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Du kannst deine Einwilligung jederzeit widerrufen. Pixel-ID, Anbieterangaben und Consent-Management-Prozess: [ergänzen]"] },
  { title: "Calendly", paragraphs: ["Für Terminbuchungen nutzen wir Calendly. Bei einer Buchung werden deine Eingaben, Terminangaben und technische Verbindungsdaten verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.", "Anbieter-, Transfer- und Löschangaben: [prüfen und ergänzen]"] },
  { title: "Zoom", paragraphs: ["Für Online-Gespräche kann Zoom eingesetzt werden. Dabei werden Stamm-, Kontakt-, Meeting- und technische Verbindungsdaten verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.", "Aufzeichnung findet nur nach gesonderter Information und Einwilligung statt. Anbieter- und Transferangaben: [ergänzen]"] },
  { title: "Vimeo", paragraphs: ["Eingebettete Videos werden über Vimeo bereitgestellt. Beim Abspielen können technische Daten und Nutzungsdaten an Vimeo übermittelt werden. Soweit dafür eine Einwilligung erforderlich ist, erfolgt die Verarbeitung erst nach Zustimmung.", "Konkrete Einbettungs- und Consent-Einstellungen sowie Anbieterangaben: [prüfen und ergänzen]"] },
  { title: "Partnerlinks Wix / Base44", paragraphs: ["Einzelne Links zu Wix oder Base44 können Partnerlinks sein. Bei einem Klick kann der jeweilige Anbieter erkennen, dass der Besuch von unserer Website stammt. Wenn daraus ein Kauf entsteht, können wir eine Vergütung erhalten; dein Preis ändert sich dadurch nicht.", "Zuordnungstechnologie, Speicherdauer und Anbieterangaben: [ergänzen]"] },
  { title: "Betroffenenrechte", paragraphs: ["Du hast nach Maßgabe der gesetzlichen Voraussetzungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde."], list: ["Auskunft · Art. 15 DSGVO", "Berichtigung · Art. 16 DSGVO", "Löschung · Art. 17 DSGVO", "Einschränkung · Art. 18 DSGVO", "Datenübertragbarkeit · Art. 20 DSGVO", "Widerspruch · Art. 21 DSGVO", "Beschwerde · Art. 77 DSGVO"] },
  { title: "Widerruf", paragraphs: ["Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt. Schreibe dafür an info@wyldsociety.io oder ändere deine Cookie-Auswahl über [Link oder Schaltfläche ergänzen]."] },
];