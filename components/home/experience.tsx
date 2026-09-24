"use client";

const chapters = [
  { name: "The stay", title: <>Somewhere you’ll enjoy<br /><em>coming back to.</em></>, text: "We choose 4–5-star stays because the room, the setting, and time to relax matter too. Each trip page shows where you’ll stay and the rooms you can book.", images: ["villa-pool", "villa-room", "toast"], alts: ["A tropical villa pool — inspiration for the kind of stay", "A light-filled Bali bedroom — stay inspiration", "A view over the pool and the Caribbean Sea"], labels: ["Room to slow down.", "Somewhere to settle in.", "And a view worth a moment."] },
  { name: "The days out", title: <>Plans you don’t have<br /><em>to pull together.</em></>, text: "We arrange the stay and scheduled group activities. You can see the plans before you book, including what’s covered and where there’s time for yourself.", images: ["terraces", "beach", "boat"], alts: ["Bali’s rice terraces", "The cliffs above Kelingking Beach", "A catamaran off Bali"], labels: ["A different kind of morning.", "Time to take it in.", "A day out on the water."] },
  { name: "The people", title: <>An introduction<br /><em>when you need one.</em></>, text: "You don’t have to walk in and work the room. Olivia gets people talking and laughing, and helps you join in at your own pace.", images: ["moment-5", "moment-1", "moment-7"], alts: ["Olivia with the Travel & LIV group", "The group sharing dinner", "Travel & LIV travelers exploring together"], labels: ["A first hello.", "A seat at the table.", "People to share it with."] },
];

export function Experience() {
  return <section id="experience" className="experience">
    <div className="experience-intro wrap">
      <span className="editorial-label">The experience</span>
      <div className="experience-intro-copy"><h2 className="editorial-heading">There’s a whole trip behind<br /><em>those laughing videos.</em></h2><p>The days out. The conversations over dinner. Someone getting everyone up to dance. Those are the moments we make room for, along with time to head off on your own or do nothing for a while.</p></div>
    </div>
    <div className="experience-scroll">
      <div className="experience-stage">
        <div className="experience-rule" aria-hidden="true" />
        {chapters.map((chapter, index) => <section className={`chapter-panel panel-${index}`} key={chapter.name} aria-labelledby={`chapter-${index}`}>
          <div className="chapter-copy"><span className="eyebrow">0{index + 1} / {chapter.name}</span><h3 id={`chapter-${index}`}>{chapter.title}</h3><p>{chapter.text}</p></div>
          <div className="chapter-images">{chapter.images.map((img, j) => <figure className={`journey-photo photo-${j}`} key={img}><div className="photo-window"><img src={`/media/${img}.webp`} alt={chapter.alts[j]} loading="lazy" /></div><figcaption>{chapter.labels[j]}</figcaption></figure>)}</div>
        </section>)}
        <div className="experience-progress"><span className="experience-current">01</span><i><b /></i><span>03</span><small>The stay · The days out · The people</small></div>
      </div>
    </div>
  </section>;
}
