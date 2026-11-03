/* Nabban Bhai Zari Wala storefront. Add the deployed Apps Script URL below. */
const API = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
const DEMO = {
  settings: {
    shop_name: "Nabban Bhai Zari Wala",
    tagline: "Timeless Elegance, Crafted for Every Occasion",
    announcement: "Discover thoughtfully detailed ethnic wear",
    shipping_flat: 80, free_shipping_above: 2000,
    delivery_time: "5–8 working days", return_window: "7 days from delivery for eligible items",
    cancellation_window: "Before the order is dispatched",
    whatsapp_number: "", phone: "", store_email: "", upi_id: "", address: "Lucknow, Uttar Pradesh, India"
  },
  products: []
};
const $ = s => document.querySelector(s);
const rs = n => "₹" + Number(n || 0).toLocaleString("en-IN");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const apiReady = () => /^https:\/\/script\.google\.com\/macros\/s\//.test(API);
let S = {}, P = [], C = {};
try { C = JSON.parse(localStorage.getItem("zc") || "{}"); } catch (_) { C = {}; }
const pg = document.body.dataset.p, Q = new URLSearchParams(location.search), R = {};
const isAmazon = p => String(p.sale_type || "website").toLowerCase() === "amazon";
const pic = (p, i=1) => { const u = p["image"+i]; return u ? (/^https?:\/\//i.test(u) ? u : "images/"+u) : ""; };
const ph = (p,i=1) => pic(p,i) ? `<img src="${esc(pic(p,i))}" alt="${esc(p.name)}" loading="lazy">` : '<div class="ph" aria-label="Product image coming soon"></div>';
const sv = () => { localStorage.setItem("zc", JSON.stringify(C)); cnt(); };
const cnt = () => { const e=$("#cc"); if(e) e.textContent=Object.values(C).reduce((a,b)=>a+(+b||0),0); };
const tag = p => isAmazon(p) ? '<span class="tg am">Shop on Amazon</span>' : (+p.stock<=0 ? '<span class="tg out">Sold out</span>' : (+p.mrp>+p.price ? `<span class="tg">${Math.round(100-p.price*100/p.mrp)}% off</span>` : ''));
const card = p => `<a class="card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="im">${ph(p)}${tag(p)}</div><h3>${esc(p.name)}</h3><div class="pr">${isAmazon(p) ? '<span class="mu">View product on Amazon</span>' : `<b>${rs(p.price)}</b>${+p.mrp>+p.price?`<s>${rs(p.mrp)}</s>`:""}`}</div></a>`;
const cartLines = () => Object.keys(C).map(k=>{const [id,size]=k.split("|");const p=P.find(x=>x.id===id);return p&&!isAmazon(p)?{k,p,size,qty:+C[k]}:null;}).filter(Boolean);
const calc = () => { const sub=cartLines().reduce((a,l)=>a+(+l.p.price*l.qty),0); const ship=sub&&sub<+(S.free_shipping_above||0)?+(S.shipping_flat||0):0; return {sub,ship,total:sub+ship}; };
const wa = () => String(S.whatsapp_number||"").replace(/\D/g,"");
const waLink = message => `https://wa.me/${wa()}?text=${encodeURIComponent(message)}`;

async function load(){
  let d=DEMO;
  if(apiReady()){
    try {
      const response=await fetch(API+(API.includes("?")?"&":"?")+"v="+Date.now(),{cache:"no-store"});
      if(!response.ok) throw new Error("Could not load the store sheet");
      const j=await response.json();
      if(j && Array.isArray(j.products) && j.settings) d=j;
    } catch(e) { console.error("Google Sheet sync failed:",e); window.sheetLoadError=true; }
  }
  S={...DEMO.settings,...(d.settings||{})};
  P=(d.products||[]).filter(p=>String(p.active??"yes").toLowerCase()!=="no" && String(p.active).toLowerCase()!=="false").map(p=>({...p,id:String(p.id),price:+p.price||0,mrp:+p.mrp||0,stock:+p.stock||0,sizes:Array.isArray(p.sizes)?p.sizes:String(p.sizes||"").split(",").map(x=>x.trim()).filter(Boolean)}));
}
function chrome(){
  const n=S.shop_name||"Nabban Bhai Zari Wala";
  $("#hd").innerHTML=`${S.announcement?`<div class="bar">${esc(S.announcement)}</div>`:""}<header class="site-header"><div class="head-inner"><a class="logo" href="index.html"><span class="logo-mark">NB</span><span>${esc(n)}<small>LUCKNOW · ZARI & ETHNIC WEAR</small></span></a><button class="menu-toggle" id="menuToggle" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="main-nav" id="mainNav"><a href="index.html">Home</a><a href="products.html">Shop</a><a href="about.html">Our Story</a><a href="contact.html">Contact</a><a class="cart-link" href="cart.html">Bag <span id="cc">0</span></a></nav></div></header>`;
  const m=$("#menuToggle");m.onclick=()=>{const nav=$("#mainNav"),open=nav.classList.toggle("open");m.setAttribute("aria-expanded",String(open));m.textContent=open?"×":"☰";};
  $("#ft").innerHTML=`<footer><div class="footer-main"><div><a class="footer-brand" href="index.html">${esc(n)}</a><p>Indian ethnic wear, thoughtfully detailed with traditional embroidery and zari-inspired craftsmanship.</p></div><div><b>Explore</b><a href="products.html">Shop collection</a><a href="about.html">About us</a><a href="contact.html">Contact</a></div><div><b>Customer care</b><a href="policy.html#shipping">Shipping</a><a href="policy.html#returns">Returns & refunds</a><a href="policy.html#terms">Terms & conditions</a><a href="policy.html#privacy">Privacy</a></div><div><b>Get in touch</b><span>${esc(S.address||"")}</span>${S.phone?`<a href="tel:${esc(S.phone)}">${esc(S.phone)}</a>`:""}${S.store_email?`<a href="mailto:${esc(S.store_email)}">${esc(S.store_email)}</a>`:""}${wa()?`<a href="${waLink("Hello, I have a question about your collection.")}" target="_blank" rel="noopener">WhatsApp us</a>`:""}</div></div><div class="footer-bottom">© ${new Date().getFullYear()} ${esc(n)}. All rights reserved. <span>Our products are also available through our official Amazon product listings.</span></div></footer>`;
  cnt();
}

R.home=()=>{
  const f=P.filter(p=>/^(yes|true|1)$/i.test(String(p.featured))).slice(0,8), products=f.length?f:P.slice(0,8);
  const cats=[...new Set(P.map(p=>p.category).filter(Boolean))];
  $("#app").innerHTML=`<section class="hero"><div class="hero-copy"><span class="eyebrow">NABBAN BHAI ZARI WALA · LUCKNOW</span><h1>${esc(S.tagline||"Timeless Elegance, Crafted for Every Occasion")}</h1><p>Discover elegant unstitched suits and occasion wear, featuring intricate embroidery, rich fabrics and carefully considered details.</p><a class="btn" href="products.html">Explore the collection</a></div><div class="hero-art"><div class="hero-art-inner"><span>TRADITION</span><b>Woven in<br>every detail</b><i>✦</i><small>CRAFT · CULTURE · ELEGANCE</small></div></div></section>
  <section class="intro-strip"><span>Thoughtful detailing</span><i>✦</i><span>Made for celebrations</span><i>✦</i><span>Shop with confidence</span></section>
  <section class="wrap section"><div class="section-heading"><div><span class="eyebrow">CURATED FOR YOU</span><h2>Featured collection</h2><p>Explore selected pieces from our collection.</p></div><a class="text-link" href="products.html">View all products ↗</a></div><div class="grid">${products.map(card).join("")||'<p class="empty-state">Our collection is being updated. Please visit again soon.</p>'}</div></section>
  <section class="craft-band"><div><span class="eyebrow">THE NABBan BHAI EXPERIENCE</span><h2>Tradition in every detail.</h2><p>From delicate resham accents to statement zari and hand-embellished details, find pieces that make every occasion feel special.</p><a class="btn btn-light" href="about.html">Discover our story</a></div></section>
  <section class="wrap section"><div class="section-heading centered"><div><span class="eyebrow">A LITTLE MORE TO LOVE</span><h2>Why shop with us</h2><p>Thoughtful service, clear information and a personal touch.</p></div></div><div class="promise-grid"><article><span>01</span><h3>Details that matter</h3><p>Explore rich fabrics, considered colour combinations and traditional embroidery details.</p></article><article><span>02</span><h3>Personal assistance</h3><p>Need help with a product or order? Reach out to our team for assistance before you buy.</p></article><article><span>03</span><h3>Convenient shopping</h3><p>Shop selected products directly with us or visit our official product listings on Amazon.</p></article></div></section>
  <section class="testimonial-section"><div class="wrap section"><span class="eyebrow">OUR COMMITMENT</span><h2>A thoughtful experience, from first look to delivery.</h2><p>We believe the little details matter: honest product information, responsive assistance and care at every step.</p><a class="text-link" href="contact.html">Have a question? Talk to us ↗</a></div></section>`;
};

R.products=()=>{let cat=Q.get("c")||"All",t="";const cats=["All",...new Set(P.map(p=>p.category).filter(Boolean))];
 $("#app").innerHTML=`<div class="wrap section"><span class="eyebrow">THE COLLECTION</span><h1 class="page-title">Shop our products</h1><p class="page-lead">Find a piece for your next celebration or special occasion.</p><input id="q" type="search" placeholder="Search products" aria-label="Search products" class="search-box"><div class="tabs" id="tb"></div><div class="grid" id="gr"></div><p id="em" class="empty-state" hidden>No products found. Try another search.</p></div>`;
 const draw=()=>{$("#tb").innerHTML=cats.map(c=>`<button class="${c===cat?"on":""}" data-c="${esc(c)}">${esc(c)}</button>`).join("");const l=P.filter(p=>(cat==="All"||p.category===cat)&&(p.name+" "+p.category).toLowerCase().includes(t));$("#gr").innerHTML=l.map(card).join("");$("#em").hidden=l.length>0;};
 $("#tb").onclick=e=>{if(e.target.dataset.c){cat=e.target.dataset.c;draw();}};$("#q").oninput=e=>{t=e.target.value.toLowerCase();draw();};draw();
};

R.product=()=>{const p=P.find(x=>x.id===Q.get("id"));if(!p){$("#app").innerHTML='<div class="wrap section"><p>Product not found. <a href="products.html">Browse all products</a></p></div>';return;}
 document.title=p.name+" | "+S.shop_name;const im=[1,2,3].filter(i=>pic(p,i));
 const buy=isAmazon(p)?`<a class="btn" href="${esc(p.amazon_link||"#")}" target="_blank" rel="noopener">View on Amazon</a><p class="mu2">This is a Nabban Bhai Zari Wala product. You will complete your purchase on our official Amazon product listing. Price, availability and Amazon's applicable delivery/return terms are shown there.</p>`:
 `${p.sizes.length?`<label class="field-label">Select size<select id="sz">${p.sizes.map(s=>`<option>${esc(s)}</option>`).join("")}</select></label>`:""}<label class="field-label">Quantity<input id="qt" type="number" min="1" max="${p.stock}" value="1"></label><button class="btn" id="ad" ${p.stock<=0?"disabled":""}>${p.stock<=0?"Currently unavailable":"Add to bag"}</button><p class="mu2" id="ms">${p.stock>0&&p.stock<=3?`Only ${p.stock} piece(s) available`:""}</p>`;
 $("#app").innerHTML=`<div class="wrap section two product-layout"><div><div class="main">${ph(p)}</div><div class="th">${im.map(i=>`<img src="${esc(pic(p,i))}" alt="${esc(p.name)}" data-src="${esc(pic(p,i))}">`).join("")}</div></div><div class="stack product-info"><span class="eyebrow">${esc(p.category||"NABBAN BHAI COLLECTION")}</span><h1>${esc(p.name)}</h1>${isAmazon(p)?'<span class="amazon-note">Official Amazon listing</span>':`<div class="pr product-price"><b>${rs(p.price)}</b>${+p.mrp>+p.price?`<s>${rs(p.mrp)}</s>`:""}</div>`}<p>${esc(p.description||"")}</p>${p.fabric?`<p><b>Fabric:</b> ${esc(p.fabric)}</p>`:""}${p.work_details?`<p><b>Work details:</b> ${esc(p.work_details)}</p>`:""}${buy}<div class="product-assurance"><span>Secure order assistance</span><span>Customer support available</span></div></div></div>`;
 document.querySelectorAll(".th img").forEach(x=>x.onclick=()=>{$(".main img").src=x.dataset.src;});
 const a=$("#ad");if(a&&p.stock>0)a.onclick=()=>{const k=p.id+"|"+($("#sz")?$("#sz").value:"");C[k]=Math.min((C[k]||0)+Math.max(1,+$("#qt").value||1),p.stock);sv();$("#ms").innerHTML='Added to your bag. <a href="cart.html">View bag</a>';};
};

R.cart=()=>{const l=cartLines(),c=calc();
 $("#app").innerHTML=`<div class="wrap section"><span class="eyebrow">YOUR SELECTION</span><h1 class="page-title">Your shopping bag</h1>${l.length?`<div class="two cart-layout"><div>${l.map(x=>`<div class="line"><div class="im">${ph(x.p)}</div><div><b>${esc(x.p.name)}</b><br><span class="mu2">${esc(x.size||"Standard size")} · ${rs(x.p.price)}</span><br><input aria-label="Quantity" type="number" min="1" max="${x.p.stock}" value="${x.qty}" style="width:76px;margin-top:8px" data-qty="${esc(x.k)}"><button class="remove-btn" data-remove="${esc(x.k)}">Remove</button></div><b>${rs(x.p.price*x.qty)}</b></div>`).join("")}</div><div class="sum"><h3>Order summary</h3><div><span>Subtotal</span><span>${rs(c.sub)}</span></div><div><span>Shipping</span><span>${c.ship?rs(c.ship):"Free"}</span></div><div class="sum-total"><b>Total</b><b>${rs(c.total)}</b></div><p class="mu2">${S.free_shipping_above?`Free delivery on orders above ${rs(S.free_shipping_above)}.`:"Shipping is calculated at checkout."}</p><a class="btn" href="checkout.html">Proceed to checkout</a></div></div>`:'<div class="empty-state"><h2>Your bag is waiting</h2><p>You have not added any products yet.</p><a class="btn" href="products.html">Explore collection</a></div>'}</div>`;
 document.querySelectorAll("[data-qty]").forEach(e=>e.onchange=()=>{const k=e.dataset.qty,p=P.find(x=>x.id===k.split("|")[0]);C[k]=Math.min(Math.max(1,+e.value||1),p.stock);sv();R.cart();});
 document.querySelectorAll("[data-remove]").forEach(e=>e.onclick=()=>{delete C[e.dataset.remove];sv();R.cart();});
};

R.checkout=()=>{const l=cartLines(),c=calc();if(!l.length){location.href="cart.html";return;}
 const policy=`<div class="checkout-policy"><b>Before you place your order</b><ul><li><strong>Estimated delivery:</strong> ${esc(S.delivery_time||"5–8 working days")}, subject to serviceability and courier conditions.</li><li><strong>Cancellation:</strong> ${esc(S.cancellation_window||"Before dispatch")}.</li><li><strong>Returns:</strong> ${esc(S.return_window||"Eligible items may be returned within 7 days of delivery; conditions apply")}.</li><li>Products purchased through Amazon follow the delivery, cancellation and return terms displayed on Amazon.</li></ul><a href="policy.html">Read our policies</a></div>`;
 $("#app").innerHTML=`<div class="wrap section"><span class="eyebrow">ALMOST THERE</span><h1 class="page-title">Checkout</h1><div class="two checkout-layout"><form class="stack checkout-form" id="f"><h2>Delivery details</h2><input name="name" placeholder="Full name" autocomplete="name" required><input name="phone" type="tel" placeholder="Mobile number (10 digits)" autocomplete="tel" required pattern="[0-9]{10}"><input name="email" type="email" placeholder="Email address (optional)" autocomplete="email"><textarea name="address" rows="3" placeholder="Full delivery address" autocomplete="street-address" required></textarea><input name="pincode" placeholder="PIN code" inputmode="numeric" required pattern="[0-9]{6}"><h2>Payment method</h2><label class="pay-option"><input type="radio" name="pay" value="UPI" checked> <span><b>Manual UPI payment</b><small>Place the order first. We will share payment confirmation details with you.</small></span></label><label class="pay-option"><input type="radio" name="pay" value="COD"> <span><b>Cash on delivery</b><small>Pay in cash when the order is delivered, subject to confirmation.</small></span></label><button class="btn" id="placeOrder">Place order</button><p class="mu2">Your order is confirmed after our team contacts you. No online payment is collected on this website.</p></form><aside class="stack"><div class="sum"><h3>Order summary</h3>${l.map(x=>`<div><span>${esc(x.p.name)} × ${x.qty}</span><span>${rs(x.p.price*x.qty)}</span></div>`).join("")}<div><span>Subtotal</span><span>${rs(c.sub)}</span></div><div><span>Shipping</span><span>${c.ship?rs(c.ship):"Free"}</span></div><div class="sum-total"><b>Total</b><b>${rs(c.total)}</b></div></div>${policy}</aside></div></div>`;
 $("#f").onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const b=$("#placeOrder");b.disabled=true;b.textContent="Preparing order…";
  if(!apiReady()){
    if(!wa()){alert("Online order service is not connected yet. Please contact the store using the contact details on this website.");b.disabled=false;b.textContent="Place order";return;}
    const lines=l.map(x=>`${x.p.name} (${x.size||"Standard"}) x ${x.qty}: ${rs(x.p.price*x.qty)}`).join("\n");const msg=`New website order request\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email||"Not provided"}\nAddress: ${d.address}, ${d.pincode}\nPayment: ${d.pay}\n${lines}\nSubtotal: ${rs(c.sub)}\nShipping: ${rs(c.ship)}\nTotal: ${rs(c.total)}\nPlease confirm availability and order.`;
    window.open(waLink(msg),"_blank","noopener");b.disabled=false;b.textContent="Send order request on WhatsApp";b.onclick=null;return;
  }
  try{const response=await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({...d,action:"order",items:l.map(x=>({id:x.p.id,size:x.size,qty:x.qty}))})});const r=await response.json();if(!r.ok)throw new Error(r.error||"Order could not be placed.");C={};sv();done(r,d);}
  catch(err){alert(err.message||"Order could not be placed. Please try again or contact us on WhatsApp.");b.disabled=false;b.textContent="Place order";}
 };
};
function done(r,d){const msg=encodeURIComponent(`Hello, I placed order ${r.order_id} for ${rs(r.total)} (${d.pay}). Name: ${d.name}. Please confirm the next steps.`);const pay=d.pay==="UPI"?`<p>Order amount: <b>${rs(r.total)}</b>.</p>${S.upi_id?`<p>UPI ID: <b>${esc(S.upi_id)}</b>. Please use order number ${esc(r.order_id)} as payment reference and share the payment screenshot with us.</p>`:"Our team will share the UPI details with you shortly."}`:`<p>Please keep ${rs(r.total)} ready for cash payment at delivery. Our team will confirm your order.</p>`;
 $("#app").innerHTML=`<div class="wrap section order-success"><span class="eyebrow">THANK YOU</span><h1>Your order request has been received.</h1><p>Order number: <b>${esc(r.order_id)}</b></p>${pay}<p>Our team will contact you to confirm your order and delivery details.</p>${wa()?`<a class="btn" href="https://wa.me/${wa()}?text=${msg}" target="_blank" rel="noopener">Continue on WhatsApp</a>`:""}<a class="text-link" href="products.html">Continue shopping</a></div>`;
}

R.contact=()=>{$("#app").innerHTML=`<div class="wrap section two contact-layout"><div class="stack"><span class="eyebrow">WE ARE HERE TO HELP</span><h1 class="page-title">Get in touch</h1><p>Questions about a product, an order or shopping with us? Send us a message and our team will be happy to assist.</p><div class="contact-detail"><b>Visit / write to us</b><span>${esc(S.address||"Lucknow, Uttar Pradesh, India")}</span>${S.phone?`<a href="tel:${esc(S.phone)}">${esc(S.phone)}</a>`:""}${S.store_email?`<a href="mailto:${esc(S.store_email)}">${esc(S.store_email)}</a>`:""}</div>${wa()?`<a class="btn" style="width:max-content" href="${waLink("Hello, I would like to know more about your collection.")}" target="_blank" rel="noopener">Chat on WhatsApp</a>`:""}</div><form class="stack contact-form" id="f"><h2>Send a message</h2><input name="name" placeholder="Your name" required><input name="email" type="email" placeholder="Email address"><input name="phone" type="tel" placeholder="Phone number"><textarea name="message" rows="5" placeholder="How can we help?" required></textarea><button class="btn">Send message</button><p class="mu2" id="contactStatus"></p></form></div>`;
 $("#f").onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(!apiReady()){if(wa()){window.open(waLink(`Website enquiry\nName: ${d.name}\nEmail: ${d.email||""}\nPhone: ${d.phone||""}\nMessage: ${d.message}`),"_blank","noopener");$("#contactStatus").textContent="Your message is ready to send on WhatsApp.";}else{$("#contactStatus").textContent="Please contact us using the phone or email details listed here.";}return;}
 const b=e.target.querySelector("button");b.disabled=true;try{const r=await(await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({...d,action:"contact"})})).json();if(!r.ok)throw new Error(r.error||"Message could not be sent.");e.target.innerHTML="<p><b>Thank you.</b> Your message has been sent. We will get back to you soon.</p>";}catch(x){$("#contactStatus").textContent="Could not send right now. Please contact us on WhatsApp.";b.disabled=false;}}
};

(async()=>{await load();chrome();if(R[pg])R[pg]();cnt();})();
