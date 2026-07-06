/* =============================================================
   AstroFeeds — shared interactivity
   ============================================================= */

/* ---------- Zodiac knowledge base (from site content) ---------- */
const ZODIAC = [
  { key:'aries', name:'Aries', symbol:'The Ram', element:'Fire', planet:'Mars',
    from:[3,21], to:[4,19], dates:'March 21 – April 19',
    traits:'bold, leadership, and competitive; adventurous and love a good challenge',
    strengths:'Courageous, passionate, adventurous',
    weaknesses:'Impulsive, impatient, prone to aggression',
    match:'Leo and Sagittarius; a good pair with Libra and Taurus' },
  { key:'taurus', name:'Taurus', symbol:'The Bull', element:'Earth', planet:'Venus',
    from:[4,20], to:[5,20], dates:'April 20 – May 20',
    traits:'dependable, practical and grounded; value security and stability',
    strengths:'Loyal, patient, hardworking',
    weaknesses:'Stubborn, possessive, materialistic',
    match:'Best with earth signs Capricorn and Virgo; Scorpio too' },
  { key:'gemini', name:'Gemini', symbol:'The Twins', element:'Air', planet:'Mercury',
    from:[5,21], to:[6,20], dates:'May 21 – June 20',
    traits:'curious, adaptable and sociable; witty and thought-provoking',
    strengths:'Versatile, expressive, witty',
    weaknesses:'Superficial, restless, indecisive',
    match:'Air signs Libra and Aquarius; also Sagittarius' },
  { key:'cancer', name:'Cancer', symbol:'The Crab', element:'Water', planet:'Moon',
    from:[6,21], to:[7,22], dates:'June 21 – July 22',
    traits:'nurturing, intuitive and compassionate; deeply family-oriented',
    strengths:'Empathetic, protective, loyal',
    weaknesses:'Moody, clingy, overly sensitive',
    match:'Water signs Scorpio and Pisces; earth signs Virgo and Taurus' },
  { key:'leo', name:'Leo', symbol:'The Lion', element:'Fire', planet:'Sun',
    from:[7,23], to:[8,22], dates:'July 23 – August 22',
    traits:'charming, confident and generous; enjoy the spotlight',
    strengths:'Creative, passionate, loyal',
    weaknesses:'Arrogant, domineering, self-centered',
    match:'Fire signs Aries and Sagittarius; air sign Aquarius' },
  { key:'virgo', name:'Virgo', symbol:'The Maiden', element:'Earth', planet:'Mercury',
    from:[8,23], to:[9,22], dates:'August 23 – September 22',
    traits:'practical, analytical and detail-oriented; strong work ethic',
    strengths:'Organized, diligent, reliable',
    weaknesses:'Critical, worrisome, overly cautious',
    match:'Earth signs Taurus and Capricorn; water signs Scorpio and Cancer' },
  { key:'libra', name:'Libra', symbol:'The Scales', element:'Air', planet:'Venus',
    from:[9,23], to:[10,22], dates:'September 23 – October 22',
    traits:'fair-minded, diplomatic and charming; value harmony',
    strengths:'Romantic, balanced, sociable',
    weaknesses:'Indecisive, superficial, conflict-avoidant',
    match:'Air signs Gemini and Aquarius; fire signs Sagittarius, Leo, Aries' },
  { key:'scorpio', name:'Scorpio', symbol:'The Scorpion', element:'Water', planet:'Pluto / Mars',
    from:[10,23], to:[11,21], dates:'October 23 – November 21',
    traits:'passionate, intense and determined; magnetic presence',
    strengths:'Loyal, intuitive, ambitious',
    weaknesses:'Jealous, secretive, resentful',
    match:'Water signs Cancer and Pisces; earth signs Capricorn and Virgo' },
  { key:'sagittarius', name:'Sagittarius', symbol:'The Archer', element:'Fire', planet:'Jupiter',
    from:[11,22], to:[12,21], dates:'November 22 – December 21',
    traits:'adventurous, optimistic and philosophical; freedom-loving',
    strengths:'Adventurous, open-minded, optimistic',
    weaknesses:'Impulsive, tactless, restless',
    match:'Fire signs Aries and Leo; air signs Aquarius and Libra' },
  { key:'capricorn', name:'Capricorn', symbol:'The Goat', element:'Earth', planet:'Saturn',
    from:[12,22], to:[1,19], dates:'December 22 – January 19',
    traits:'disciplined, responsible and ambitious; masters of self-control',
    strengths:'Disciplined, responsible, patient',
    weaknesses:'Pessimistic, stubborn, unforgiving',
    match:'Earth signs Taurus and Virgo; water signs Scorpio and Pisces' },
  { key:'aquarius', name:'Aquarius', symbol:'The Water Bearer', element:'Air', planet:'Uranus / Saturn',
    from:[1,20], to:[2,18], dates:'January 20 – February 18',
    traits:'independent, original and humanitarian; forward-thinking',
    strengths:'Innovative, independent, idealistic',
    weaknesses:'Aloof, unpredictable, detached',
    match:'Air signs Gemini and Libra; fire signs Aries and Sagittarius' },
  { key:'pisces', name:'Pisces', symbol:'The Fish', element:'Water', planet:'Neptune / Jupiter',
    from:[2,19], to:[3,20], dates:'February 19 – March 20',
    traits:'compassionate, artistic and intuitive; deeply empathetic dreamers',
    strengths:'Gentle, imaginative, wise',
    weaknesses:'Escapist, over-trusting, indecisive',
    match:'Water signs Cancer and Scorpio; earth signs Taurus and Capricorn' }
];

const NAKSHATRAS = ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu',
  'Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati',
  'Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana',
  'Dhanishta','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];

const MOON_SIGNS = ['Mesha','Vrishabha','Mithuna','Karka','Simha','Kanya','Tula',
  'Vrischika','Dhanu','Makara','Kumbha','Meena'];

/* find zodiac sign from a Date */
function signFromDate(d){
  const m = d.getMonth()+1, day = d.getDate();
  return ZODIAC.find(z=>{
    const [fm,fd]=z.from,[tm,td]=z.to;
    if(fm<=tm){ return (m>fm||(m===fm&&day>=fd)) && (m<tm||(m===tm&&day<=td)); }
    // wraps year end (Capricorn)
    return (m>fm||(m===fm&&day>=fd)) || (m<tm||(m===tm&&day<=td));
  }) || ZODIAC[0];
}

/* deterministic pseudo-random from a seed string (stable results per input) */
function seedRand(str){
  let h=2166136261;
  for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}
  return ()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
}
const pick=(rng,arr)=>arr[Math.floor(rng()*arr.length)];

/* ---------- Horoscope generator ---------- */
const HORO = {
  openers:['The cosmos aligns in your favour','Planetary energy is on your side','The stars whisper of change',
    'A gentle celestial current guides you','Your ruling planet turns supportive','The Moon lights a new path'],
  love:['A heartfelt conversation deepens a bond.','Single? A magnetic connection may surprise you.',
    'Give your partner room and watch trust grow.','Old tensions in love finally ease.'],
  career:['A bold idea earns recognition at work.','Patience with a colleague pays off well.',
    'Financial matters take a promising turn.','A delayed opportunity resurfaces — act on it.'],
  health:['Rest restores more than you expect.','Channel restless energy into movement.',
    'A mindful routine steadies your mood.','Hydration and calm bring clarity.'],
  colors:['Saffron','Emerald','Royal Blue','Gold','Coral','Turquoise','Maroon','Amber'],
  numbers:[3,5,7,8,9,11,18,21],
  moods:['Optimistic','Reflective','Energized','Calm','Ambitious','Warm-hearted']
};
function horoscope(sign, period){
  const rng = seedRand(sign.key + period + new Date().toDateString());
  const scope = {daily:'today',weekly:'this week',monthly:'this month',yearly:'this year'}[period]||'today';
  return {
    text:`${pick(rng,HORO.openers)}, ${sign.name}. ${pick(rng,HORO.love)} `+
         `On the professional front, ${pick(rng,HORO.career).toLowerCase()} `+
         `Take care of yourself — ${pick(rng,HORO.health).toLowerCase()} Overall, ${scope} rewards a steady, hopeful heart.`,
    lucky:{ Colour:pick(rng,HORO.colors), Number:pick(rng,HORO.numbers), Mood:pick(rng,HORO.moods),
            'Best Time': `${5+Math.floor(rng()*7)} ${rng()>.5?'AM':'PM'}` }
  };
}

/* =============================================================
   DOM wiring
   ============================================================= */
document.addEventListener('DOMContentLoaded',()=>{

  /* --- mobile nav --- */
  const toggle=document.querySelector('.nav-toggle');
  const links=document.querySelector('.nav-links');
  if(toggle&&links){toggle.addEventListener('click',()=>links.classList.toggle('open'));}

  /* --- helper: validation --- */
  const need=(v)=> v && v.trim().length>0;
  const showErr=(field,msg)=>{const e=field.parentElement.querySelector('.err');if(e)e.textContent=msg||'';};

  /* ============ FREE KUNDLI ============ */
  const kundliForm=document.getElementById('kundliForm');
  if(kundliForm){
    kundliForm.addEventListener('submit',e=>{
      e.preventDefault();
      const name=kundliForm.name.value, dob=kundliForm.dob.value;
      let ok=true;
      if(!need(name)){showErr(kundliForm.name,'Please enter your name');ok=false;}else showErr(kundliForm.name);
      if(!need(dob)){showErr(kundliForm.dob,'Please select your date of birth');ok=false;}else showErr(kundliForm.dob);
      if(!ok)return;
      const d=new Date(dob); const sign=signFromDate(d);
      const rng=seedRand(name+dob);
      const out=document.getElementById('kundliResult');
      const asc=pick(rng,ZODIAC).name;
      const moon=pick(rng,MOON_SIGNS);
      const nak=pick(rng,NAKSHATRAS);
      out.innerHTML=`
        <h3>Namaste, ${name.split(' ')[0]} — here is your birth-chart snapshot</h3>
        <p>Generated from your date of birth (${d.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}).</p>
        <div class="result-grid">
          <div class="result-item"><span>Sun Sign</span><b>${sign.name}</b></div>
          <div class="result-item"><span>Moon Sign (Rashi)</span><b>${moon}</b></div>
          <div class="result-item"><span>Ascendant (Lagna)</span><b>${asc}</b></div>
          <div class="result-item"><span>Nakshatra</span><b>${nak}</b></div>
          <div class="result-item"><span>Ruling Planet</span><b>${sign.planet}</b></div>
          <div class="result-item"><span>Element</span><b>${sign.element}</b></div>
        </div>
        <p style="margin-top:16px">As a <b>${sign.name}</b>, you are ${sign.traits}. Your strengths — ${sign.strengths.toLowerCase()} — shape the way your chart expresses itself. For a full reading of your houses and dashas, connect with an AstroFeeds astrologer.</p>
        <a href="#" class="btn btn-primary" style="margin-top:6px">Talk to an Astrologer</a>`;
      out.hidden=false;
      out.scrollIntoView({behavior:'smooth',block:'center'});
    });
  }

  /* ============ MATCHMAKING ============ */
  const matchForm=document.getElementById('matchForm');
  if(matchForm){
    matchForm.addEventListener('submit',e=>{
      e.preventDefault();
      const b=matchForm.brideDob.value, g=matchForm.groomDob.value;
      let ok=true;
      if(!need(matchForm.brideName.value)){showErr(matchForm.brideName,'Enter name');ok=false;}else showErr(matchForm.brideName);
      if(!need(matchForm.groomName.value)){showErr(matchForm.groomName,'Enter name');ok=false;}else showErr(matchForm.groomName);
      if(!need(b)){showErr(matchForm.brideDob,'Select date');ok=false;}else showErr(matchForm.brideDob);
      if(!need(g)){showErr(matchForm.groomDob,'Select date');ok=false;}else showErr(matchForm.groomDob);
      if(!ok)return;
      const bs=signFromDate(new Date(b)), gs=signFromDate(new Date(g));
      const rng=seedRand(b+g+matchForm.brideName.value+matchForm.groomName.value);
      // Ashtakoot: 8 kootas out of 36
      const koota=[['Varna',1],['Vashya',2],['Tara',3],['Yoni',4],['Graha Maitri',5],['Gana',6],['Bhakoot',7],['Nadi',8]];
      let total=0; const rows=koota.map(([nm,max])=>{const s=Math.round(rng()*max);total+=s;return {nm,s,max};});
      const pct=Math.round(total/36*100);
      let verdict = pct>=75?'An excellent match — the stars strongly favour this union.':
                    pct>=50?'A good and workable match with harmonious potential.':
                    pct>=30?'A moderate match — a few remedies can strengthen the bond.':
                    'A challenging match — consult an astrologer for remedies.';
      const out=document.getElementById('matchResult');
      out.innerHTML=`
        <h3>Guna Milan Score for ${matchForm.brideName.value.split(' ')[0]} &amp; ${matchForm.groomName.value.split(' ')[0]}</h3>
        <div class="score-wrap">
          <div class="score-num">${total}<small>/36</small></div>
          <div class="meter"><i id="matchBar"></i></div>
          <p>${verdict}</p>
        </div>
        <div class="result-grid">
          ${rows.map(r=>`<div class="result-item"><span>${r.nm}</span><b>${r.s} / ${r.max}</b></div>`).join('')}
        </div>
        <p style="margin-top:16px">Moon signs pair <b>${bs.name}</b> with <b>${gs.name}</b>. This Ashtakoot snapshot checks compatibility across Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot and Nadi. For a detailed Kundli Milan including Mangal Dosha, speak with our astrologers.</p>
        <a href="#" class="btn btn-primary">Get Detailed Report</a>`;
      out.hidden=false;
      requestAnimationFrame(()=>{const bar=document.getElementById('matchBar');if(bar)bar.style.width=pct+'%';});
      out.scrollIntoView({behavior:'smooth',block:'center'});
    });
  }

  /* ============ ZODIAC PAGE ============ */
  const signDetail=document.getElementById('signDetail');
  let activePeriod='daily';
  function renderSign(key){
    const sign=ZODIAC.find(z=>z.key===key); if(!sign||!signDetail)return;
    const h=horoscope(sign,activePeriod);
    signDetail.innerHTML=`
      <div class="sd-head">
        <img src="Icons/Forecast/${capImg(sign)}" alt="${sign.name}">
        <div><h3>${sign.name}</h3><div class="sd-dates">${sign.dates}</div></div>
      </div>
      <div class="sd-meta">
        <span>Symbol: <b>${sign.symbol}</b></span>
        <span>Element: <b>${sign.element}</b></span>
        <span>Ruling Planet: <b>${sign.planet}</b></span>
      </div>
      <p><b>Personality:</b> ${cap(sign.name)} people are ${sign.traits}.</p>
      <p><b>Strengths:</b> ${sign.strengths}. &nbsp; <b>Weaknesses:</b> ${sign.weaknesses}.</p>
      <p><b>Best matches:</b> ${sign.match}.</p>
      <div class="result" style="margin-top:10px" hidden id="_x"></div>
      <h4 style="font-family:var(--f-display);margin:18px 0 6px;color:var(--orange-d)">${cap(activePeriod)} Horoscope</h4>
      <p>${h.text}</p>
      <div class="sd-meta">${Object.entries(h.lucky).map(([k,v])=>`<span>${k}: <b>${v}</b></span>`).join('')}</div>`;
  }
  document.querySelectorAll('[data-sign]').forEach(c=>{
    c.addEventListener('click',()=>{
      if(!signDetail){ // no detail panel on this page (e.g. forecast) -> go to zodiac page
        window.location.href='zodiac-signs.html'; return;
      }
      renderSign(c.dataset.sign);
      signDetail.scrollIntoView({behavior:'smooth',block:'center'});
    });
  });
  document.querySelectorAll('.horo-pill').forEach(p=>{
    p.addEventListener('click',()=>{
      document.querySelectorAll('.horo-pill').forEach(x=>x.classList.remove('active'));
      p.classList.add('active'); activePeriod=p.dataset.period||'daily';
      const cur=signDetail&&signDetail.querySelector('.sd-head img');
      renderSign(cur? cur.alt.toLowerCase() : 'aries');
    });
  });
  if(signDetail) renderSign('aries');

  /* ============ SUN SIGN LOOKUP (forecast/home) ============ */
  const sunForm=document.getElementById('sunForm');
  if(sunForm){
    sunForm.addEventListener('submit',e=>{
      e.preventDefault();
      const dob=sunForm.dob.value; if(!need(dob)){showErr(sunForm.dob,'Please pick your date of birth');return;} showErr(sunForm.dob);
      const sign=signFromDate(new Date(dob));
      const h=horoscope(sign,'yearly');
      const out=document.getElementById('sunResult');
      out.innerHTML=`
        <div class="sd-head">
          <img src="Icons/Forecast/${capImg(sign)}" alt="${sign.name}">
          <div><h3>Your Sun Sign is ${sign.name}</h3><div class="sd-dates">${sign.dates}</div></div>
        </div>
        <p>${h.text}</p>
        <div class="sd-meta">${Object.entries(h.lucky).map(([k,v])=>`<span>${k}: <b>${v}</b></span>`).join('')}</div>`;
      out.hidden=false;
      out.scrollIntoView({behavior:'smooth',block:'center'});
    });
  }

  /* ============ generic newsletter/subscribe forms ============ */
  document.querySelectorAll('form[data-toast]').forEach(f=>{
    f.addEventListener('submit',e=>{
      e.preventDefault();
      const input=f.querySelector('input');
      if(input && !need(input.value)){showErr(input,'Please enter a value');return;}
      f.innerHTML=`<div style="text-align:center;padding:6px 0"><i class="bi bi-check-circle-fill text-green" style="font-size:1.6rem"></i><p style="margin:8px 0 0">Thank you! Your personalized AstroFeed is on its way to WhatsApp.</p></div>`;
    });
  });
});

/* helpers */
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}
function capImg(sign){
  // map to actual file names in Icons/Forecast/
  const map={aries:'aries.png',taurus:'Taurus.png',gemini:'gemini.png',cancer:'Cancer.png',
    leo:'Leo.png',virgo:'Virgo.png',libra:'Libra.png',scorpio:'Scorpio.png',
    sagittarius:'Sagittarius.png',capricorn:'Capricorn.png',aquarius:'Aquarius.png',pisces:'Pisces.png'};
  return map[sign.key]||'forecast.png';
}
