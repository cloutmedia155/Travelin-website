export type Trip = {
  slug: string;
  name: string;
  region: string;
  image: string;
  alt: string;
  mood: [string, string];
  state: "review" | "announced";
  position?: string;
};

export const trips: Trip[] = [
  { slug: "punta-cana", name: "Punta Cana", region: "Dominican Republic", image: "/media/punta-beach.webp", alt: "Palm-lined beach and resort on the Punta Cana coast", mood: ["Good company.", "Caribbean time."], state: "review" },
  { slug: "brazil", name: "Brazil", region: "Rio de Janeiro", image: "/media/rio.webp", alt: "The coastline and mountains of Rio de Janeiro", mood: ["A little rhythm.", "A whole lot of Rio."], state: "announced" },
  { slug: "phuket", name: "Phuket", region: "Thailand", image: "/media/phuket.webp", alt: "Coastal scenery in Phuket, Thailand", mood: ["Take the long way", "to the beach."], state: "announced" },
  { slug: "bali", name: "Bali", region: "Indonesia", image: "/media/beach.webp", alt: "Cliffs and blue water at Kelingking Beach, Bali", mood: ["A slower morning.", "A different world."], state: "announced", position: "center 65%" },
];

export function getTrip(slug: string) { return trips.find(trip => trip.slug === slug); }
export function askAbout(name: string) { return `mailto:Info@travelnliv.com?subject=${encodeURIComponent(`${name} trip enquiry`)}`; }

// Source provenance is kept with the data. No room inventory or payment is simulated.
export const puntaPackage = {
  checkedAt: "2026-09-26",
  websiteSource: "https://www.travelnliv.com/puntacana",
  providerSource: "https://travelnliv.wetravel.com/trips/travel-liv-collective-punta-cana-single-s-trip-travel-liv-5990310291",
  bookingState: "needs-date-confirmation" as const,
  providerDates: "3–7 February 2027",
  websiteDates: "28 October–1 November 2026",
  duration: "5 days / 4 nights",
  property: "Excellence Punta Cana",
  propertyImage: "https://cdn.filestackcontent.com/resize=width:1200/quality=value:85/UWElGptqQ6m8YtBcjnjV",
  propertyDetailImage: "https://cdn.filestackcontent.com/resize=width:800/quality=value:85/jIQQTEMiSIGr2syaafLu",
  rooms: [
    { id: "roommate", name: "Come on your own", type: "Roommate matching", amount: 179900, description: "Shared Junior Suite, garden view. Same-sex roommate matching; confirm bedding before booking." },
    { id: "friend", name: "Bring a friend", type: "Double occupancy", amount: 179900, description: "Shared Junior Suite, garden view. One bed shared by both travelers." },
    { id: "private", name: "Your own space", type: "Private room", amount: 229900, description: "A room to yourself, with the same group experience." },
  ],
  chapters: [
    { name: "The first hello", days: "Day 1", title: "Arrive. Exhale.", italic: "Meet everyone.", text: "Settle in, then meet the group over drinks at the all-white welcome mixer.", image: "/media/moment-1.webp", alt: "Travel & LIV travelers at dinner on a previous trip", caption: "A moment from a previous Travel & LIV trip." },
    { name: "A little adventure", days: "Day 2", title: "A different kind", italic: "of day out.", text: "Buggies, ziplining and a Dominican lunch, with the group along for the ride.", image: "https://www.travelnliv.com/punta/IMG_6315.JPG", alt: "Adventure excursion pictured on the Punta Cana trip page", caption: "An adventure day in the Dominican Republic." },
    { name: "Out on the water", days: "Day 3", title: "Nowhere to be.", italic: "Except here.", text: "A private catamaran, snorkeling stops and lunch on the water.", image: "https://www.travelnliv.com/punta/IMG_6311.JPG", alt: "Catamaran experience pictured on the Punta Cana trip page", caption: "The Caribbean, a little closer." },
    { name: "Your own pace", days: "Days 4–5", title: "One more swim.", italic: "One more story.", text: "A free day, a farewell dinner, then the journey home.", image: "/media/punta-beach.webp", alt: "Quiet palm-lined Punta Cana beach", caption: "Room for a little unplanned time." },
  ],
  itinerary: [
    ["Day 1", "Arrive & settle in", "Airport transfer, resort check-in and an all-white welcome mixer."],
    ["Day 2", "Adventure together", "Off-road buggies, ziplining, chairlift views, group games and buffet lunch. Optional nightlife costs extra."],
    ["Day 3", "A day at sea", "Private catamaran, snorkeling, a beach stop and natural pool, with drinks and barbecue lunch."],
    ["Day 4", "Make it your day", "Free time followed by a group farewell dinner. Optional evening outings are at your own expense."],
    ["Day 5", "Until next time", "Check out and transfer to the airport. Confirm flight windows with the host."],
  ],
};

// Display follows the provider's published dollar amounts; checkout confirms currency and charges.
export function listedPrice(amount: number) { return `$${(amount / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`; }
export const startingPrice = Math.min(...puntaPackage.rooms.map(room => room.amount));
export const homeTrips = ["brazil", "punta-cana", "phuket", "bali"].map(slug => {
  const trip = getTrip(slug)!;
  return {
    name: trip.name, country: trip.region.toUpperCase(), image: trip.image.replace("/media/", "").replace(".webp", ""),
    line: trip.mood.join("<br />"), dates: trip.state === "review" ? "Departure dates being confirmed" : "Next dates coming soon",
    length: trip.state === "review" ? puntaPackage.duration : "Details to be confirmed",
    price: trip.state === "review" ? `From ${listedPrice(startingPrice)}` : "Price to be confirmed",
    note: trip.state === "review" ? "Listed per person · Singles trip · Flights extra" : "Ask Olivia about the next departure",
    link: `/trips/${trip.slug}`, cta: "Explore this trip",
  };
});
