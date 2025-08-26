import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, BedDouble, Bath, Ruler, Calendar, Mail, Phone, ExternalLink, CalendarDays } from "lucide-react";

/**
 * ⚡ Mini-site vitrine pour 2 propriétés (avec calendrier iCal + formulaire)
 * - Calendrier iCal Airbnb (lecture seule) + retry auto via proxy Vercel pour CORS
 * - Formulaire “Demander une réservation” (mailto → jf@fitamant.fr) par propriété
 */

const PROPERTIES = [
  {
    id: "A",
    title: "Villa familiale les pieds dans l’eau — Rincon de la Victoria",
    location: "Espagne, Andalousie",
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    size: 95,
    highlights: [
      "Vue mer et accès rapide plage",
      "Terrasse ensoleillée",
      "Wi-Fi rapide, espace télétravail",
      "Cuisine équipée, linge fourni"
    ],
    images: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d87?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c55d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"
    ],
    bookingUrl:
      "https://www.airbnb.fr/rooms/946412703120681737?guests=1&adults=1&s=67&unique_share_id=8ec72605-352a-4059-a444-dc2fd57edccf",
    icalUrl: "https://www.airbnb.fr/calendar/ical/946412703120681737.ics?s=79bc128c713afc645dd2ddc1f30c6d16"
  },
  {
    id: "B",
    title: "Propriété B — Maison de plage au Cap Coz",
    location: "Fouesnant, Bretagne",
    capacity: 8,
    bedrooms: 4,
    bathrooms: 2,
    size: 120,
    highlights: [
      "Accès direct plage",
      "Grande pièce de vie lumineuse",
      "Parking privé",
      "Idéale familles et amis"
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop"
    ],
    bookingUrl:
      "https://www.airbnb.fr/rooms/44477300?guests=1&adults=1&s=67&unique_share_id=472129ef-1c82-4e42-b644-b225b95e36ae",
    icalUrl: "https://www.airbnb.fr/calendar/ical/44477300.ics?s=e18e48db9aa911bb762e6b5a53286ed2"
  }
];

export default function SiteDeuxProprietes() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-24">
        <Intro />
        {PROPERTIES.map((p, i) => (
          <PropertySection key={p.id} property={p} flip={i % 2 === 1} />
        ))}
        <PracticalInfo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="font-semibold tracking-tight text-lg">Séjours Bretagne Sud</div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#proprietes" className="hover:underline">Propriétés</a>
          <a href="#infos" className="hover:underline">Infos pratiques</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <a
          href={PROPERTIES[0].bookingUrl}
          target="_blank"
          className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-xl shadow hover:opacity-90"
        >
          Réserver <ExternalLink size={16} />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="h-[480px] bg-gradient-to-br from-blue-200 via-emerald-100 to-amber-100" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight"
        >
          Deux maisons pour respirer l'océan
        </motion.h1>
        <p className="mt-4 text-lg text-zinc-700 max-w-2xl mx-auto">
          Des adresses soignées en Bretagne Sud, idéales pour des séjours en famille ou entre amis.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#proprietes"
            className="px-5 py-3 rounded-xl bg-white border border-zinc-200 shadow hover:shadow-md"
          >
            Découvrir les maisons
          </a>
          <a
            href={PROPERTIES[0].bookingUrl}
            target="_blank"
            className="px-5 py-3 rounded-xl bg-zinc-900 text-white shadow hover:opacity-90"
          >
            Voir les disponibilités
          </a>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section id="proprietes" className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Des séjours simples et confortables</h2>
        <p className="text-zinc-700">
          Chaque maison a été pensée pour que vous profitiez pleinement de votre séjour : literie
          de qualité, cuisine bien équipée, espaces lumineux et accès facile aux plages, aux
          chemins côtiers et aux marchés locaux.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PROPERTIES[0].images.slice(0, 2).map((src, i) => (
          <img key={i} src={src} alt="aperçu" className="rounded-2xl h-40 w-full object-cover" />
        ))}
        <img src={PROPERTIES[1].images[0]} alt="aperçu" className="rounded-2xl h-40 w-full object-cover" />
      </div>
    </section>
  );
}

function PropertySection({ property, flip = false }) {
  return (
    <section className={`grid lg:grid-cols-2 gap-8 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div className="grid grid-cols-3 gap-3">
        {property.images.map((src, i) => (
          <img key={i} src={src} alt={`${property.title} ${i + 1}`} className={`rounded-2xl h-40 sm:h-56 w-full object-cover ${i === 0 ? "col-span-2" : ""}`} />
        ))}
      </div>
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 text-sm text-zinc-600"><MapPin size={16} />{property.location}</div>
        <h3 className="text-2xl sm:text-3xl font-bold">{property.title}</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <Badge icon={<Users size={14} />}>{property.capacity} voyageurs</Badge>
          <Badge icon={<BedDouble size={14} />}>{property.bedrooms} chambres</Badge>
          <Badge icon={<Bath size={14} />}>{property.bathrooms} sdb</Badge>
          <Badge icon={<Ruler size={14} />}>{property.size} m²</Badge>
        </div>
        <ul className="grid sm:grid-cols-2 gap-2 text-zinc-700">
          {property.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Disponibilités (iCal Airbnb) */}
        <div className="pt-2">
          <h4 className="font-semibold mb-2 flex items-center gap-2"><CalendarDays size={18}/>Disponibilités</h4>
          <AvailabilityCalendar icalUrl={property.icalUrl} />
        </div>

        {/* Demande de réservation (email) */}
        <RequestForm property={property} />

        <div className="flex gap-3 pt-2">
          <a
            href={property.bookingUrl}
            target="_blank"
            className="px-5 py-3 rounded-xl bg-zinc-900 text-white shadow hover:opacity-90 inline-flex items-center gap-2"
          >
            Réserver sur Airbnb <ExternalLink size={16} />
          </a>
          <a href="#contact" className="px-5 py-3 rounded-xl bg-white border border-zinc-200 shadow hover:shadow-md">Demande de réservation</a>
        </div>
      </div>
    </section>
  );
}

function Badge({ children, icon }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-700 shadow-sm">
      {icon}
      {children}
    </span>
  );
}

/** ================ CALENDRIER ICAL ================ */

function AvailabilityCalendar({ icalUrl }) {
  const [current, setCurrent] = useState(() => new Date());
  const [busyDates, setBusyDates] = useState(() => new Set());
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function fetchICS(url, triedProxy = false) {
      setError("");
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const ranges = parseICS(text);
        if (ignore) return;
        const dates = new Set();
        ranges.forEach(([start, end]) => {
          const d = new Date(start);
          while (d < end) {
            dates.add(ymd(d));
            d.setDate(d.getDate() + 1);
          }
        });
        setBusyDates(dates);
      } catch (e) {
        // Si CORS en direct, retente via proxy Vercel
        if (!triedProxy) {
          const proxied = `/api/ics-proxy?url=${encodeURIComponent(icalUrl)}`;
          fetchICS(proxied, true);
          return;
        }
        setError("Calendrier indisponible. Si le problème persiste, vérifiez le proxy iCal.");
      }
    }
    if (icalUrl) fetchICS(icalUrl);
    return () => { ignore = true; };
  }, [icalUrl]);

  const days = useMemo(() => buildMonthDays(current), [current]);

  return (
    <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200">
        <button className="px-3 py-1 rounded-lg border" onClick={() => setCurrent(addMonths(current, -1))}>←</button>
        <div className="font-medium">{formatMonth(current)}</div>
        <button className="px-3 py-1 rounded-lg border" onClick={() => setCurrent(addMonths(current, 1))}>→</button>
      </div>
      <div className="grid grid-cols-7 text-xs text-zinc-500 px-3 pt-3">
        {["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map((d) => (
          <div key={d} className="text-center pb-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 p-3">
        {days.map((d, i) => {
          const key = ymd(d.date);
          const isOtherMonth = d.isOtherMonth;
          const isPast = d.date < stripTime(new Date());
          const isBusy = busyDates.has(key);
          return (
            <div
              key={i}
              className={[
                "h-10 rounded-lg flex items-center justify-center text-sm border",
                isOtherMonth ? "text-zinc-300 border-zinc-100 bg-zinc-50" : "",
                !isOtherMonth && isBusy ? "bg-red-100/70 border-red-200 text-red-700" : "",
                !isOtherMonth && !isBusy ? "bg-white border-zinc-200" : "",
                isPast ? "opacity-60" : ""
              ].join(" ")}
              title={isBusy ? "Indisponible" : "Disponible"}
            >
              {d.date.getDate()}
            </div>
          );
        })}
      </div>
      {error && <p className="px-4 pb-3 text-sm text-amber-700">{error}</p>}
      <div className="px-4 pb-4 text-xs text-zinc-500">Source : iCal Airbnb (lecture seule).</div>
    </div>
  );
}

// Parse minimaliste du format ICS pour extraire des paires [start, end]
function parseICS(text) {
  const lines = text.split(/\r?\n/);
  const events = [];
  let current = {};
  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) current = {};
    if (line.startsWith("DTSTART")) current.start = parseICSTime(line);
    if (line.startsWith("DTEND")) current.end = parseICSTime(line);
    if (line.startsWith("END:VEVENT") && current.start && current.end) {
      events.push([current.start, current.end]);
      current = {};
    }
  }
  return events;
}

function parseICSTime(line) {
  // Exemples: DTSTART;VALUE=DATE:20250115  /  DTSTART:20250115T120000Z
  const [, value] = line.split(":");
  if (!value) return null;
  if (/^\d{8}$/.test(value)) {
    const y = +value.slice(0, 4), m = +value.slice(4, 6) - 1, d = +value.slice(6, 8);
    return new Date(Date.UTC(y, m, d));
  }
  // YYYYMMDDTHHmmssZ
  const y = +value.slice(0, 4), m = +value.slice(4, 6) - 1, d = +value.slice(6, 8);
  const hh = +value.slice(9, 11) || 0, mm = +value.slice(11, 13) || 0, ss = +value.slice(13, 15) || 0;
  return new Date(Date.UTC(y, m, d, hh, mm, ss));
}

function buildMonthDays(anchor) {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const firstWeekday = (first.getDay() + 6) % 7; // Lundi=0
  const start = new Date(first);
  start.setDate(first.getDate() - firstWeekday);
  const days = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push({ date, isOtherMonth: date.getMonth() !== anchor.getMonth() });
  }
  return days;
}

function addMonths(date, count) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + count);
  return d;
}

function stripTime(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function ymd(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatMonth(d) {
  return d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

/** ================ FORMULAIRE PAR PROPRIÉTÉ ================ */

function RequestForm({ property }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [message, setMessage] = useState("");

  const valid = firstName && email && start && end;
  const body = `Bonjour,\n\nJe souhaite une réservation pour ${property.title}.\nDates souhaitées: ${start} → ${end}\nVoyageurs: ${guests}\nNom: ${firstName} ${lastName}\nTéléphone: ${phone}\n\nMessage: ${message}\n`;
  const mailto = `mailto:jf@fitamant.fr?subject=${encodeURIComponent("Demande de réservation — " + property.title)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-3">
      <h4 className="text-base font-semibold">Demander une réservation</h4>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Prénom *</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" placeholder="Votre prénom" />
        </div>
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" placeholder="Votre nom" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email *</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" placeholder="vous@exemple.fr" />
        </div>
        <div>
          <label className="block text-sm font-medium">Téléphone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" placeholder="+33…" />
        </div>
        <div>
          <label className="block text-sm font-medium">Arrivée *</label>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Départ *</label>
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Voyageurs</label>
          <input type="number" min={1} max={16} value={guests} onChange={(e) => setGuests(+e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">Message</label>
          <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" placeholder="Précisions: enfants, animaux, heures d'arrivée…" />
        </div>
      </div>
      <div className="flex gap-3">
        <a href={mailto} className={`px-5 py-3 rounded-xl text-white shadow ${valid ? "bg-zinc-900 hover:opacity-90" : "bg-zinc-400 cursor-not-allowed"}`}>Envoyer la demande</a>
        <span className="text-xs text-zinc-500 self-center">* champs obligatoires</span>
      </div>
    </div>
  );
}

/** ================ SECTIONS RESTANTES ================ */

function PracticalInfo() {
  return (
    <section id="infos" className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-3">Infos pratiques</h3>
      <div className="grid sm:grid-cols-3 gap-6 text-sm text-zinc-700">
        <div>
          <h4 className="font-medium mb-1">Arrivées & départs</h4>
          <p>Arrivée à partir de 16h · Départ avant 10h · Boîte à clés autonome.</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Équipements</h4>
          <p>Wi-Fi, TV, lave-linge, lave-vaisselle, cafetière, barbecue (selon maison).</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Enfants</h4>
          <p>Lit parapluie et chaise haute (sur demande) · Plage peu profonde à proximité.</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = `mailto:jf@fitamant.fr?subject=Séjour%20Bretagne%20Sud&body=${encodeURIComponent(
    `Nom: ${name}\nEmail: ${email}\n\n${message}`
  )}`;

  return (
    <section id="contact" className="grid md:grid-cols-2 gap-6 items-start">
      <div>
        <h3 className="text-xl font-semibold mb-2">Une question ?</h3>
        <p className="text-zinc-700">Écrivez-nous, nous répondons rapidement et avec plaisir.</p>
        <ul className="mt-4 space-y-2 text-zinc-700">
          <li className="flex items-center gap-2"><Mail size={16} /> jf@fitamant.fr</li>
          <li className="flex items-center gap-2"><Phone size={16} /> +33 6 12 34 56 78</li>
          <li className="flex items-center gap-2"><Calendar size={16} /> Séjours toute l'année</li>
        </ul>
      </div>
      <form className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" placeholder="Votre nom" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" placeholder="vous@exemple.fr" />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2" placeholder="Dates souhaitées, nombre de voyageurs, questions…" />
        </div>
        <div className="flex gap-3">
          <a href={mailto} className="px-5 py-3 rounded-xl bg-zinc-900 text-white shadow hover:opacity-90 inline-block">Envoyer par email</a>
          <a href="#" className="px-5 py-3 rounded-xl bg-white border border-zinc-200 shadow hover:shadow-md">WhatsApp</a>
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-10 mt-20 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-zinc-600 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <p>© {new Date().getFullYear()} Séjours Bretagne Sud — Tous droits réservés.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Mentions légales</a>
          <a href="#" className="hover:underline">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
}
