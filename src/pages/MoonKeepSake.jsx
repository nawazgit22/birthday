import React, { useState } from 'react';

// Swap these to personalize the keepsake
const DEFAULT_NAME = 'Priyam';
const DEFAULT_DATE_LABEL = 'Sep 13, 2005';
const DEFAULT_DATE_LONG = 'September 13, 2005';
const DEFAULT_DAY = 'Tuesday';

const MOON_FACTS = [
    {
        id: 'crescent',
        latin: 'LUNA GIBBOSA',
        pill: 'The Waxing Gibbous',
        title: 'The Spark of Light',
        text: (name, dateLong, day) =>
            `On ${day}, ${dateLong}, the sky glowed nearly full and bright, the moon swollen with light just days from completion. It was the night the universe made room for you, bringing warmth, beauty, and kindness into the world.`,
        marker: { top: '38%', left: '74%' },
    },
    {
        id: 'crisium',
        latin: 'MARE CRISIUM',
        pill: 'Sea of Crises',
        title: 'Quiet Resilience',
        text: (name, dateLong, day) =>
            `Within the growing light, your inner strength shines with quiet certainty. You carry yourself through life with effortless grace and quiet dignity.`,
        marker: { top: '50%', left: '80%' },
    },
    {
        id: 'serenity',
        latin: 'MARE SERENITATIS',
        pill: 'Sea of Serenity',
        title: 'Serene Depths',
        text: (name, dateLong, day) =>
            `Within the Moon’s growing light rests this quiet basin, older than memory. It carries the promise that even in stillness, something vast and luminous can grow.`,
        marker: { top: '63%', left: '75%' },
    },
    {
        id: 'earthshine',
        latin: 'THE EARTHSHINE LIMB',
        pill: 'The Earthshine Limb',
        title: 'Borrowed Light',
        text: (name, dateLong, day) =>
            `Along the Moon’s growing light rests a gentle borrowed glow — light received and given freely, the kind you leave in people long after you’ve gone.`,
        marker: { top: '75%', left: '69%' },
    },
];

const MoonKeepsake = ({
    name = DEFAULT_NAME,
    dateLabel = DEFAULT_DATE_LABEL,
    dateLong = DEFAULT_DATE_LONG,
    dayOfWeek = DEFAULT_DAY,
    phase = 'Waxing Gibbous',
    illumination = '75%',
    moonAge = '9.8 Days',
    onContinue,
}) => {
    const [activeId, setActiveId] = useState('crescent');
    const active = MOON_FACTS.find((f) => f.id === activeId) ?? MOON_FACTS[0];

    const handleContinue = () => {
        if (onContinue) {
            onContinue();
            return;
        }
        const next = document.getElementById('more-memories');
        if (next) next.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="moonkeep">
            <style>{`
                .moonkeep {
                    background: radial-gradient(ellipse at 20% 0%, #1a1030 0%, #07060d 55%, #050408 100%);
                    color: #ece9f3;
                    padding: 72px 20px 56px;
                    font-family: 'Quicksand', 'Baloo 2', system-ui, sans-serif;
                    position: relative;
                    overflow: hidden;
                }
                .moonkeep::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image:
                        radial-gradient(1.5px 1.5px at 10% 20%, rgba(255,255,255,.6), transparent),
                        radial-gradient(1.5px 1.5px at 80% 10%, rgba(255,255,255,.4), transparent),
                        radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,.5), transparent),
                        radial-gradient(1px 1px at 30% 85%, rgba(255,255,255,.35), transparent),
                        radial-gradient(1.5px 1.5px at 92% 60%, rgba(255,255,255,.4), transparent);
                    pointer-events: none;
                }
                .mk-inner { max-width: 1040px; margin: 0 auto; position: relative; z-index: 1; }
                .mk-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    letter-spacing: .08em;
                    padding: 8px 16px;
                    border-radius: 999px;
                    background: rgba(217, 34, 110, 0.12);
                    border: 1px solid rgba(217, 34, 110, 0.35);
                    color: #f490c0;
                }
                .mk-badge .dot { width: 6px; height: 6px; border-radius: 999px; background: #ec4899; }
                .mk-headline {
                    font-family: 'Baloo 2', 'Quicksand', system-ui, sans-serif;
                    font-weight: 700;
                    font-size: clamp(30px, 5vw, 48px);
                    line-height: 1.15;
                    margin: 22px 0 16px;
                    max-width: 640px;
                }
                .mk-sub {
                    color: #b9b3cc;
                    font-size: 16px;
                    line-height: 1.6;
                    max-width: 520px;
                    margin-bottom: 48px;
                }
                .mk-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 40px;
                    align-items: start;
                }
                @media (min-width: 860px) {
                    .mk-layout { grid-template-columns: 400px 1fr; }
                }
                .mk-moon-wrap { display: flex; justify-content: center; }
                .mk-moon {
                    position: relative;
                    width: 100%;
                    max-width: 380px;
                    aspect-ratio: 1;
                    border-radius: 999px;
                    background: radial-gradient(circle at 62% 40%, #e6e4ec 0%, #b9b6c4 45%, #8d8a99 100%);
                    overflow: hidden;
                    box-shadow: 0 0 60px rgba(180, 170, 220, 0.15);
                }
                .mk-moon-shadow {
                    position: absolute;
                    inset: 0;
                    border-radius: 999px;
                    background: #07060d;
                    transform: translateX(0%);
                    animation: mk-reveal-gibbous 3.2s ease-out forwards;
                }
                @keyframes mk-reveal-gibbous {
                    0%   { transform: translateX(0%); }
                    100% { transform: translateX(-82%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .mk-moon-shadow { animation: none; transform: translateX(-82%); }
                }
                .mk-mare {
                    position: absolute;
                    background: rgba(60, 58, 70, 0.55);
                    filter: blur(6px);
                    border-radius: 50%;
                }
                .mk-marker {
                    position: absolute;
                    width: 22px;
                    height: 22px;
                    border-radius: 999px;
                    border: 2px solid rgba(255,255,255,0.55);
                    background: rgba(10,10,16,0.35);
                    transform: translate(-50%, -50%);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: border-color .2s ease, box-shadow .2s ease;
                }
                .mk-marker:hover { border-color: #fff; }
                .mk-marker::after {
                    content: '';
                    width: 8px;
                    height: 8px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.85);
                }
                .mk-marker.active {
                    border-color: #ec4899;
                    box-shadow: 0 0 0 6px rgba(236, 72, 153, 0.18), 0 0 18px rgba(236, 72, 153, 0.55);
                }
                .mk-marker.active::after { background: #ec4899; }
                .mk-panel {
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.03);
                    border-radius: 20px;
                    padding: 28px 28px 24px;
                }
                .mk-panel-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                .mk-latin { font-size: 13px; letter-spacing: .08em; color: #9d97b5; }
                .mk-tag {
                    font-size: 12px;
                    padding: 5px 12px;
                    border-radius: 999px;
                    background: rgba(236,72,153,0.15);
                    border: 1px solid rgba(236,72,153,0.4);
                    color: #f6a8cf;
                    white-space: nowrap;
                }
                .mk-title {
                    font-family: 'Baloo 2', 'Quicksand', system-ui, sans-serif;
                    font-weight: 700;
                    font-size: 28px;
                    margin: 16px 0 14px;
                }
                .mk-text { color: #cbc6da; line-height: 1.7; font-size: 15.5px; }
                .mk-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 22px 0 16px; }
                .mk-buttons { display: flex; flex-wrap: wrap; gap: 10px; }
                .mk-tab {
                    font-size: 13.5px;
                    padding: 9px 16px;
                    border-radius: 999px;
                    border: 1px solid rgba(255,255,255,0.14);
                    background: rgba(255,255,255,0.04);
                    color: #d8d4e6;
                    cursor: pointer;
                    transition: all .18s ease;
                }
                .mk-tab:hover { border-color: rgba(255,255,255,0.3); }
                .mk-tab.active {
                    background: #ec4899;
                    border-color: #ec4899;
                    color: #fff;
                }
                .mk-stats {
                    margin-top: 32px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 18px 12px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.02);
                    border-radius: 18px;
                    padding: 22px 26px;
                }
                @media (min-width: 640px) {
                    .mk-stats { grid-template-columns: repeat(4, 1fr); }
                }
                .mk-stat-label { font-size: 11px; letter-spacing: .08em; color: #8d87a2; margin-bottom: 6px; }
                .mk-stat-value { font-weight: 700; font-size: 16px; color: #f1eef7; }
                .mk-footer {
                    margin-top: 26px;
                    display: flex;
                    justify-content: flex-end;
                }
                .mk-continue {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 700;
                    font-size: 15px;
                    padding: 13px 26px;
                    border-radius: 999px;
                    border: none;
                    color: #fff;
                    background: linear-gradient(135deg, #ec4899, #f472b6);
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(236, 72, 153, 0.35);
                    transition: transform .15s ease, box-shadow .15s ease;
                }
                .mk-continue:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(236, 72, 153, 0.45); }
                .mk-continue:active { transform: translateY(0); }
            `}</style>

            <div className="mk-inner">
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span className="mk-badge">
                        <span className="dot" />
                        Astronomical Keepsake
                    </span>
                    <span className="mk-badge">
                        <span className="dot" />
                        {dateLabel}
                    </span>
                </div>

                <h2 className="mk-headline">The Moon the Night You Were Born</h2>
                <p className="mk-sub">
                    On {dateLong}, the sky looked exactly like this for {name}. Tap any glowing marker on the moon to reveal its secret meaning.
                </p>

                <div className="mk-layout">
                    <div className="mk-moon-wrap">
                        <div className="mk-moon">
                            <div className="mk-moon-shadow" />
                            <div className="mk-mare" style={{ width: 70, height: 90, top: '18%', left: '48%' }} />
                            <div className="mk-mare" style={{ width: 55, height: 70, top: '46%', left: '55%' }} />

                            {MOON_FACTS.map((fact) => (
                                <button
                                    key={fact.id}
                                    type="button"
                                    aria-label={fact.pill}
                                    className={`mk-marker ${fact.id === activeId ? 'active' : ''}`}
                                    style={{ top: fact.marker.top, left: fact.marker.left }}
                                    onClick={() => setActiveId(fact.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mk-panel">
                        <div className="mk-panel-top">
                            <span className="mk-latin">{active.latin}</span>
                            <span className="mk-tag">{active.pill}</span>
                        </div>

                        <h3 className="mk-title">{active.title}</h3>
                        <p className="mk-text">{active.text(name, dateLong, dayOfWeek)}</p>

                        <div className="mk-divider" />

                        <div className="mk-buttons">
                            {MOON_FACTS.map((fact) => (
                                <button
                                    key={fact.id}
                                    type="button"
                                    className={`mk-tab ${fact.id === activeId ? 'active' : ''}`}
                                    onClick={() => setActiveId(fact.id)}
                                >
                                    {fact.pill}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mk-stats">
                    <div>
                        <div className="mk-stat-label">DATE</div>
                        <div className="mk-stat-value">{dateLabel}</div>
                    </div>
                    <div>
                        <div className="mk-stat-label">PHASE</div>
                        <div className="mk-stat-value">{phase}</div>
                    </div>
                    <div>
                        <div className="mk-stat-label">ILLUMINATION</div>
                        <div className="mk-stat-value">{illumination}</div>
                    </div>
                    <div>
                        <div className="mk-stat-label">MOON AGE</div>
                        <div className="mk-stat-value">{moonAge}</div>
                    </div>
                </div>

                <div className="mk-footer">
                    <button type="button" className="mk-continue" onClick={handleContinue}>
                        Continue To See Surprises ✨
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MoonKeepsake;
