// Image path resolver — works from both root and pages/ subfolder
const _imgBase = (function() {
  const p = window.location.pathname;
  return p.includes('/pages/') ? '../' : '';
})();
function imgPath(p) { return p.startsWith('http') ? p : _imgBase + p; }

const hotels = [

  // ══ MAHARASHTRA ═══════════════════════════════════════════════════════════
  {
    id:"mh1",name:"The Oberoi Mumbai",location:"Nariman Point",city:"Mumbai",state:"Maharashtra",
    stars:5,rating:4.9,reviews:3201,price:28000,
    image:imgPath("images/mh1.jpg"),
    description:"Iconic 5-star on Marine Drive with panoramic Arabian Sea views, world-class dining and the celebrated Oberoi Spa.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Mumbai Film Festival",surge:18,base:23728,surgeAmt:4272,gst:4250},
    nearby:[{icon:"place",name:"Gateway of India",detail:"2.5 km · 8 min drive",warn:null},{icon:"beach_access",name:"Marine Drive",detail:"Right outside",warn:null},{icon:"construction",name:"Coastal Road Project",detail:"Near Haji Ali",warn:"Expect traffic delays 8am–7pm"}],
    rooms:[{id:"mh1-1",name:"Premier Sea View Room",description:"Floor-to-ceiling windows overlooking the Arabian Sea",price:28000,maxGuests:2,beds:"1 King Bed",size:42,amenities:["Free WiFi","TV","Mini Bar","Safe"],image:imgPath("images/up4-1.jpg")},{id:"mh1-2",name:"Luxury Suite",description:"Expansive suite with butler service and private terrace",price:65000,maxGuests:3,beds:"1 King Bed + Sitting Room",size:90,amenities:["Free WiFi","TV","Butler Service","Bathtub"],image:imgPath("images/up1-2.jpg")}]
  },
  {
    id:"mh2",name:"Taj Mahal Palace",location:"Apollo Bunder, Colaba",city:"Mumbai",state:"Maharashtra",
    stars:5,rating:4.95,reviews:4102,price:35000,
    image:imgPath("images/mh2.jpg"),
    description:"Mumbai's most iconic landmark — a 1903 heritage hotel overlooking the Gateway of India with legendary service and Michelin-starred dining.",
    amenities:["Free WiFi","Pool","Spa","Gym","5 Restaurants","Bar","Room Service","Concierge"],
    pricingReason:{event:"New Year Premium",surge:30,base:26923,surgeAmt:8077,gst:5250},
    nearby:[{icon:"place",name:"Gateway of India",detail:"50m · Steps away",warn:null},{icon:"account_balance",name:"Chhatrapati Shivaji Museum",detail:"800m",warn:null}],
    rooms:[{id:"mh2-1",name:"Heritage Grand Luxury Room",description:"Palace wing room with harbour views and antique furnishings",price:35000,maxGuests:2,beds:"1 King Bed",size:48,amenities:["Free WiFi","TV","Mini Bar","Harbour View"],image:imgPath("images/up1-1.jpg")}]
  },
  {
    id:"mh3",name:"Trident Nariman Point",location:"Nariman Point",city:"Mumbai",state:"Maharashtra",
    stars:4,rating:4.6,reviews:1842,price:11500,
    image:imgPath("images/gj3.jpg"),
    description:"Sophisticated business hotel in the financial district with stunning sea views and excellent conferencing facilities.",
    amenities:["Free WiFi","Pool","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Weekend Demand",surge:10,base:10455,surgeAmt:1045,gst:1725},
    nearby:[{icon:"place",name:"Nariman Point",detail:"Walking distance",warn:null},{icon:"subway",name:"Churchgate Station",detail:"1.2 km",warn:null}],
    rooms:[{id:"mh3-1",name:"Superior Room",description:"Well-appointed room with city or sea views",price:11500,maxGuests:2,beds:"1 King Bed",size:35,amenities:["Free WiFi","TV","Mini Bar"],image:imgPath("images/gj4-1.jpg")}]
  },
  {
    id:"mh4",name:"Hotel Suba Palace",location:"Colaba",city:"Mumbai",state:"Maharashtra",
    stars:3,rating:4.1,reviews:976,price:5200,
    image:imgPath("images/mh4.jpg"),
    description:"Well-located 3-star near the Gateway of India offering comfortable rooms and reliable service.",
    amenities:["Free WiFi","Restaurant","Room Service","Concierge"],
    pricingReason:{event:"Standard Rate",surge:0,base:4407,surgeAmt:0,gst:793},
    nearby:[{icon:"place",name:"Gateway of India",detail:"600m",warn:null},{icon:"restaurant",name:"Leopold Café",detail:"300m",warn:null}],
    rooms:[{id:"mh4-1",name:"Standard Room",description:"Clean comfortable room with modern amenities",price:5200,maxGuests:2,beds:"1 Queen Bed",size:28,amenities:["Free WiFi","TV","Safe"],image:imgPath("images/hp6-1.jpg")}]
  },
  {
    id:"mh5",name:"Hotel City Point",location:"Dadar",city:"Mumbai",state:"Maharashtra",
    stars:2,rating:3.5,reviews:412,price:2100,
    image:imgPath("images/wb6.jpg"),
    description:"Budget-friendly 2-star in central Mumbai with easy access to trains, markets and local eateries.",
    amenities:["Free WiFi","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:1780,surgeAmt:0,gst:320},
    nearby:[{icon:"subway",name:"Dadar Station",detail:"400m",warn:null},{icon:"shopping_bag",name:"Dadar Market",detail:"200m",warn:null}],
    rooms:[{id:"mh5-1",name:"Standard Room",description:"Simple clean room with AC",price:2100,maxGuests:2,beds:"1 Double Bed",size:20,amenities:["Free WiFi","TV"],image:imgPath("images/up5-1.jpg")}]
  },
  {
    id:"mh6",name:"Hotel Decent",location:"CST Area",city:"Mumbai",state:"Maharashtra",
    stars:1,rating:3.1,reviews:218,price:850,
    image:imgPath("images/gj6.jpg"),
    description:"No-frills 1-star lodge steps from Chhatrapati Shivaji Terminus — perfect for budget backpackers.",
    amenities:["Free WiFi"],
    pricingReason:{event:"Standard Rate",surge:0,base:720,surgeAmt:0,gst:130},
    nearby:[{icon:"train",name:"CST Railway Station",detail:"200m",warn:null}],
    rooms:[{id:"mh6-1",name:"Budget Room",description:"Basic room with fan",price:850,maxGuests:2,beds:"1 Single Bed",size:14,amenities:["Free WiFi"],image:imgPath("images/gj6-1.jpg")}]
  },

  // ══ RAJASTHAN ═════════════════════════════════════════════════════════════
  {
    id:"rj1",name:"Rambagh Palace",location:"Bhawani Singh Road",city:"Jaipur",state:"Rajasthan",
    stars:5,rating:4.91,reviews:2671,price:38000,
    image:imgPath("images/rj1.jpg"),
    description:"Once the Maharaja of Jaipur's residence, set amidst 47 acres of Mughal gardens — one of the world's finest palace hotels.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Jaipur Literature Festival",surge:28,base:29687,surgeAmt:8313,gst:5700},
    nearby:[{icon:"account_balance",name:"Hawa Mahal",detail:"4 km",warn:null},{icon:"fort",name:"Amber Fort",detail:"12 km",warn:null},{icon:"event",name:"Lit Fest Grounds",detail:"2 km",warn:"Heavy traffic during festival week"}],
    rooms:[{id:"rj1-1",name:"Luxury Room",description:"Palace wing room with Mughal garden views",price:38000,maxGuests:2,beds:"1 King Bed",size:45,amenities:["Free WiFi","TV","Mini Bar","Garden View"],image:imgPath("images/up3-1.jpg")},{id:"rj1-2",name:"Royal Suite",description:"Antique-furnished suite with private courtyard",price:75000,maxGuests:4,beds:"1 King Bed + Study",size:110,amenities:["Free WiFi","TV","Butler Service","Bathtub"],image:imgPath("images/up1-2.jpg")}]
  },
  {
    id:"rj2",name:"The Oberoi Udaivilas",location:"Haridasji Ki Magri",city:"Udaipur",state:"Rajasthan",
    stars:5,rating:4.95,reviews:2104,price:42000,
    image:imgPath("images/rj2.jpg"),
    description:"Perched on Lake Pichola's banks — Rajasthan's most celebrated resort with private pools and hand-painted domes.",
    amenities:["Free WiFi","Pool","Spa","Gym","3 Restaurants","Bar","Room Service","Concierge"],
    pricingReason:{event:"Diwali Season",surge:35,base:31111,surgeAmt:10889,gst:6300},
    nearby:[{icon:"account_balance",name:"City Palace",detail:"2.3 km · 8 min boat",warn:null},{icon:"notifications",name:"Jagdish Temple",detail:"2.8 km",warn:"Morning bells 5am–7am"}],
    rooms:[{id:"rj2-1",name:"Premier Room with Pool",description:"Lake view suite with private plunge pool",price:42000,maxGuests:2,beds:"1 King Bed",size:55,amenities:["Free WiFi","Private Pool","Lake View"],image:imgPath("images/rj2-1.jpg")}]
  },
  {
    id:"rj3",name:"Umaid Bhawan Palace",location:"Palace Road",city:"Jodhpur",state:"Rajasthan",
    stars:5,rating:4.93,reviews:1102,price:55000,
    image:imgPath("images/rj3.jpg"),
    description:"Part of HH Gaj Singh II's royal residence — this 1943 Art Deco masterpiece overlooks the Blue City.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Limited Availability",surge:0,base:46610,surgeAmt:0,gst:8390},
    nearby:[{icon:"fort",name:"Mehrangarh Fort",detail:"1.8 km",warn:null}],
    rooms:[{id:"rj3-1",name:"Luxury Room",description:"Art Deco room with desert skyline views",price:55000,maxGuests:2,beds:"1 King Bed",size:52,amenities:["Free WiFi","TV","Mini Bar","City View"],image:imgPath("images/up2-1.jpg")}]
  },
  {
    id:"rj4",name:"Dera Rawatsar",location:"Civil Lines",city:"Jaipur",state:"Rajasthan",
    stars:4,rating:4.3,reviews:589,price:8500,
    image:"https://images.unsplash.com/photo-1568575177891-8f71bb3a6f18?w=1080&q=80",
    description:"Charming heritage haveli converted to a boutique 4-star with courtyard pool and authentic Rajasthani cuisine.",
    amenities:["Free WiFi","Pool","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:7203,surgeAmt:0,gst:1297},
    nearby:[{icon:"shopping_bag",name:"Johari Bazaar",detail:"3 km · Gems & jewellery",warn:null}],
    rooms:[{id:"rj4-1",name:"Heritage Room",description:"Decorated room with traditional Rajput murals",price:8500,maxGuests:2,beds:"1 Queen Bed",size:32,amenities:["Free WiFi","TV","Garden View"],image:imgPath("images/gj1-1.jpg")}]
  },
  {
    id:"rj5",name:"Hotel Pearl Palace",location:"Hathroi Fort",city:"Jaipur",state:"Rajasthan",
    stars:3,rating:4.4,reviews:1203,price:3200,
    image:imgPath("images/up5.jpg"),
    description:"A beloved budget-traveller favourite — rooftop café, hand-painted rooms and exceptional value in the Pink City.",
    amenities:["Free WiFi","Restaurant","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:2712,surgeAmt:0,gst:488},
    nearby:[{icon:"account_balance",name:"City Palace",detail:"5 km",warn:null}],
    rooms:[{id:"rj5-1",name:"Deluxe Room",description:"Colourfully painted room with rooftop access",price:3200,maxGuests:2,beds:"1 Double Bed",size:22,amenities:["Free WiFi","TV"],image:imgPath("images/up4-1.jpg")}]
  },
  {
    id:"rj6",name:"Hotel Atithi",location:"Sindhi Camp",city:"Jaipur",state:"Rajasthan",
    stars:2,rating:3.6,reviews:387,price:1700,
    image:imgPath("images/gj5.jpg"),
    description:"Clean 2-star near the bus stand with 24hr reception and easy access to major sights.",
    amenities:["Free WiFi","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:1441,surgeAmt:0,gst:259},
    nearby:[{icon:"directions_bus",name:"Sindhi Camp Bus Stand",detail:"200m",warn:null}],
    rooms:[{id:"rj6-1",name:"Standard Room",description:"Simple clean room with AC",price:1700,maxGuests:2,beds:"1 Double Bed",size:18,amenities:["Free WiFi","TV"],image:imgPath("images/hp6-1.jpg")}]
  },

  // ══ DELHI ═════════════════════════════════════════════════════════════════
  {
    id:"dl1",name:"The Leela Palace",location:"Chanakyapuri",city:"New Delhi",state:"Delhi",
    stars:5,rating:4.87,reviews:1923,price:31000,
    image:imgPath("images/dl1.jpg"),
    description:"Crowned with a gilded dome, The Leela Palace is the pinnacle of contemporary Indian luxury in the diplomatic enclave.",
    amenities:["Free WiFi","Pool","Spa","Gym","3 Restaurants","Bar","Room Service","Concierge"],
    pricingReason:{event:"Government Summit",surge:18,base:26271,surgeAmt:4729,gst:4650},
    nearby:[{icon:"account_balance",name:"India Gate",detail:"6.5 km",warn:null},{icon:"construction",name:"Road Work",detail:"Sardar Patel Marg",warn:"Daytime noise — use back entrance"}],
    rooms:[{id:"dl1-1",name:"Deluxe Room",description:"Elegant room overlooking heritage gardens",price:31000,maxGuests:2,beds:"1 King Bed",size:40,amenities:["Free WiFi","TV","Mini Bar","Safe"],image:imgPath("images/up4-1.jpg")},{id:"dl1-2",name:"Grand Deluxe Suite",description:"Suite furnished with fine Indian art and silks",price:58000,maxGuests:3,beds:"1 King Bed + Sitting Room",size:72,amenities:["Free WiFi","TV","Butler Service","Bathtub"],image:imgPath("images/up1-2.jpg")}]
  },
  {
    id:"dl2",name:"The Imperial New Delhi",location:"Janpath",city:"New Delhi",state:"Delhi",
    stars:5,rating:4.85,reviews:2340,price:26000,
    image:imgPath("images/up1.jpg"),
    description:"A 1931 Art Deco landmark on Janpath — a living heritage hotel with galleries, fine dining and colonial-era charm.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Republic Day Season",surge:22,base:21311,surgeAmt:4689,gst:3900},
    nearby:[{icon:"shopping_bag",name:"Connaught Place",detail:"1 km",warn:null},{icon:"account_balance",name:"Rashtrapati Bhavan",detail:"3 km",warn:null}],
    rooms:[{id:"dl2-1",name:"Heritage Room",description:"Art Deco room with original 1930s furnishings",price:26000,maxGuests:2,beds:"1 King Bed",size:38,amenities:["Free WiFi","TV","Mini Bar"],image:imgPath("images/up3-1.jpg")}]
  },
  {
    id:"dl3",name:"Hyatt Regency Delhi",location:"Bhikaji Cama Place",city:"New Delhi",state:"Delhi",
    stars:4,rating:4.5,reviews:1456,price:10500,
    image:imgPath("images/ka4.jpg"),
    description:"Sleek international 4-star in South Delhi's business corridor with a stunning rooftop pool.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Weekend Surge",surge:12,base:9375,surgeAmt:1125,gst:1575},
    nearby:[{icon:"subway",name:"Bhikaji Cama Metro",detail:"500m",warn:null}],
    rooms:[{id:"dl3-1",name:"King Room",description:"Modern room with city views",price:10500,maxGuests:2,beds:"1 King Bed",size:36,amenities:["Free WiFi","TV","Work Desk"],image:imgPath("images/up2-1.jpg")}]
  },
  {
    id:"dl4",name:"Hotel Broadway",location:"Asaf Ali Road",city:"New Delhi",state:"Delhi",
    stars:3,rating:4.0,reviews:723,price:4800,
    image:imgPath("images/dl4.jpg"),
    description:"A Delhi institution since 1956 near Old Delhi's markets, with the famous Chor Bizarre restaurant on-site.",
    amenities:["Free WiFi","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:4068,surgeAmt:0,gst:732},
    nearby:[{icon:"shopping_bag",name:"Chandni Chowk",detail:"1 km",warn:null},{icon:"account_balance",name:"Red Fort",detail:"1.5 km",warn:null}],
    rooms:[{id:"dl4-1",name:"Superior Room",description:"Spacious heritage-style room",price:4800,maxGuests:2,beds:"1 Double Bed",size:28,amenities:["Free WiFi","TV","Safe"],image:imgPath("images/gj4-1.jpg")}]
  },
  {
    id:"dl5",name:"Hotel Tara Palace",location:"Paharganj",city:"New Delhi",state:"Delhi",
    stars:2,rating:3.4,reviews:534,price:1900,
    image:imgPath("images/dl5.jpg"),
    description:"Budget 2-star in Paharganj backpacker hub — steps from New Delhi Railway Station.",
    amenities:["Free WiFi","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:1610,surgeAmt:0,gst:290},
    nearby:[{icon:"train",name:"New Delhi Railway Station",detail:"400m",warn:null}],
    rooms:[{id:"dl5-1",name:"Standard Room",description:"Clean AC room",price:1900,maxGuests:2,beds:"1 Double Bed",size:18,amenities:["Free WiFi","TV"],image:imgPath("images/up5-1.jpg")}]
  },
  {
    id:"dl6",name:"Hotel Ajanta",location:"Arakashan Road",city:"New Delhi",state:"Delhi",
    stars:1,rating:3.2,reviews:298,price:1100,
    image:imgPath("images/dl6.jpg"),
    description:"No-frills 1-star lodge near New Delhi station — clean and safe with helpful staff.",
    amenities:["Free WiFi"],
    pricingReason:{event:"Standard Rate",surge:0,base:932,surgeAmt:0,gst:168},
    nearby:[{icon:"train",name:"New Delhi Station",detail:"600m",warn:null}],
    rooms:[{id:"dl6-1",name:"Budget Room",description:"Simple room with hot water and AC",price:1100,maxGuests:2,beds:"1 Single Bed",size:13,amenities:["Free WiFi"],image:imgPath("images/gj6-1.jpg")}]
  },

  // ══ TAMIL NADU ════════════════════════════════════════════════════════════
  {
    id:"tn1",name:"ITC Grand Chola",location:"Guindy",city:"Chennai",state:"Tamil Nadu",
    stars:5,rating:4.82,reviews:1456,price:18000,
    image:imgPath("images/tn1.jpg"),
    description:"South India's largest luxury hotel — a LEED Platinum masterpiece inspired by the Chola Empire with seven restaurants.",
    amenities:["Free WiFi","Rooftop Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Weekend Surge",surge:12,base:16071,surgeAmt:1929,gst:2700},
    nearby:[{icon:"flight",name:"Chennai Airport",detail:"4 km",warn:null},{icon:"sports_cricket",name:"MA Chidambaram Stadium",detail:"8 km",warn:"Severe traffic on match days — allow 45 min extra"}],
    rooms:[{id:"tn1-1",name:"Executive Room",description:"Contemporary room with city views",price:18000,maxGuests:2,beds:"1 King Bed",size:40,amenities:["Free WiFi","TV","Mini Bar","Work Desk"],image:imgPath("images/up4-1.jpg")},{id:"tn1-2",name:"Chola Suite",description:"Suite with Chola-inspired bronze artwork",price:42000,maxGuests:4,beds:"1 King Bed + Living Room",size:90,amenities:["Free WiFi","TV","Bathtub","Butler Service"],image:imgPath("images/up1-2.jpg")}]
  },
  {
    id:"tn2",name:"Taj Coromandel",location:"Nungambakkam",city:"Chennai",state:"Tamil Nadu",
    stars:5,rating:4.8,reviews:1893,price:16500,
    image:imgPath("images/wb4.jpg"),
    description:"Chennai's original luxury address, renowned for legendary service, the iconic Prego restaurant and a serene pool.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Corporate Season",surge:15,base:14348,surgeAmt:2152,gst:2475},
    nearby:[{icon:"shopping_bag",name:"Express Avenue Mall",detail:"2 km",warn:null}],
    rooms:[{id:"tn2-1",name:"Superior Room",description:"Elegant room in the heritage wing",price:16500,maxGuests:2,beds:"1 King Bed",size:38,amenities:["Free WiFi","TV","Mini Bar"],image:imgPath("images/up2-1.jpg")}]
  },
  {
    id:"tn3",name:"Hyatt Regency Chennai",location:"Anna Salai",city:"Chennai",state:"Tamil Nadu",
    stars:4,rating:4.5,reviews:1102,price:9000,
    image:imgPath("images/wb3.jpg"),
    description:"Centrally located 4-star with vibrant dining, rooftop bar and well-equipped fitness centre.",
    amenities:["Free WiFi","Pool","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:7627,surgeAmt:0,gst:1373},
    nearby:[{icon:"temple_hindu",name:"Kapaleeshwarar Temple",detail:"4 km",warn:null}],
    rooms:[{id:"tn3-1",name:"King Room",description:"Spacious room with Anna Salai views",price:9000,maxGuests:2,beds:"1 King Bed",size:35,amenities:["Free WiFi","TV","Work Desk"],image:imgPath("images/up3-1.jpg")}]
  },
  {
    id:"tn4",name:"Hotel Fortel",location:"Anna Salai",city:"Chennai",state:"Tamil Nadu",
    stars:3,rating:3.9,reviews:645,price:4200,
    image:imgPath("images/gj4.jpg"),
    description:"Reliable 3-star on Anna Salai with a rooftop restaurant and easy city access.",
    amenities:["Free WiFi","Restaurant","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:3559,surgeAmt:0,gst:641},
    nearby:[{icon:"subway",name:"LIC Metro Station",detail:"500m",warn:null}],
    rooms:[{id:"tn4-1",name:"Deluxe Room",description:"Clean comfortable room with AC",price:4200,maxGuests:2,beds:"1 Double Bed",size:25,amenities:["Free WiFi","TV"],image:imgPath("images/gj4-1.jpg")}]
  },
  {
    id:"tn5",name:"Hotel Pandian",location:"Egmore",city:"Chennai",state:"Tamil Nadu",
    stars:2,rating:3.5,reviews:421,price:1900,
    image:imgPath("images/wb6.jpg"),
    description:"2-star standby near Egmore railway station — clean, safe and value for money.",
    amenities:["Free WiFi","Restaurant"],
    pricingReason:{event:"Standard Rate",surge:0,base:1610,surgeAmt:0,gst:290},
    nearby:[{icon:"train",name:"Chennai Egmore Station",detail:"300m",warn:null}],
    rooms:[{id:"tn5-1",name:"Standard Room",description:"Simple AC room",price:1900,maxGuests:2,beds:"1 Double Bed",size:18,amenities:["Free WiFi","TV"],image:imgPath("images/hp6-1.jpg")}]
  },
  {
    id:"tn6",name:"Hotel Chennai Gate",location:"Broadway",city:"Chennai",state:"Tamil Nadu",
    stars:1,rating:3.0,reviews:187,price:950,
    image:imgPath("images/gj6.jpg"),
    description:"1-star budget lodge in central Chennai near Broadway bus terminus — basic but clean.",
    amenities:["Free WiFi"],
    pricingReason:{event:"Standard Rate",surge:0,base:805,surgeAmt:0,gst:145},
    nearby:[{icon:"directions_bus",name:"Broadway Bus Terminus",detail:"100m",warn:null}],
    rooms:[{id:"tn6-1",name:"Budget Room",description:"Basic room with essential amenities",price:950,maxGuests:2,beds:"1 Single Bed",size:12,amenities:["Free WiFi"],image:imgPath("images/gj6-1.jpg")}]
  },

  // ══ KERALA ════════════════════════════════════════════════════════════════
  {
    id:"kl1",name:"Taj Malabar Resort & Spa",location:"Willingdon Island",city:"Kochi",state:"Kerala",
    stars:5,rating:4.85,reviews:1672,price:22000,
    image:imgPath("images/kl1.jpg"),
    description:"Legendary 5-star on Willingdon Island commanding panoramic views of Kochi harbour, Fort Kochi and the Arabian Sea.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Christmas–New Year Peak",surge:30,base:16923,surgeAmt:5077,gst:3300},
    nearby:[{icon:"sailing",name:"Chinese Fishing Nets",detail:"2 km by boat",warn:null},{icon:"account_balance",name:"Fort Kochi",detail:"3 km",warn:null}],
    rooms:[{id:"kl1-1",name:"Harbour View Room",description:"Room with sweeping harbour and backwater views",price:22000,maxGuests:2,beds:"1 King Bed",size:40,amenities:["Free WiFi","TV","Mini Bar"],image:imgPath("images/up4-1.jpg")}]
  },
  {
    id:"kl2",name:"Kumarakom Lake Resort",location:"Kumarakom",city:"Kottayam",state:"Kerala",
    stars:5,rating:4.88,reviews:1234,price:25000,
    image:imgPath("images/kl2.jpg"),
    description:"Award-winning heritage resort on Vembanad Lake — private villas, traditional kettuvallam and Ayurvedic treatments.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Monsoon Premium",surge:20,base:20833,surgeAmt:4167,gst:3750},
    nearby:[{icon:"sailing",name:"Vembanad Lake",detail:"Direct access",warn:null},{icon:"park",name:"Bird Sanctuary",detail:"1 km",warn:null}],
    rooms:[{id:"kl2-1",name:"Lake Villa",description:"Heritage villa on the water's edge with open-air bath",price:25000,maxGuests:2,beds:"1 King Bed",size:55,amenities:["Free WiFi","TV","Outdoor Bath","Lake View"],image:imgPath("images/up2-1.jpg")}]
  },
  {
    id:"kl3",name:"Casino Hotel Kochi",location:"Wellington Island",city:"Kochi",state:"Kerala",
    stars:4,rating:4.4,reviews:978,price:8200,
    image:imgPath("images/kl3.jpg"),
    description:"Well-established 4-star with waterfront dining, pool and easy ferry access to Fort Kochi.",
    amenities:["Free WiFi","Pool","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:6949,surgeAmt:0,gst:1251},
    nearby:[{icon:"directions_ferry",name:"Fort Kochi Ferry",detail:"500m · 10 min boat",warn:null}],
    rooms:[{id:"kl3-1",name:"Deluxe Room",description:"Room with waterfront or garden views",price:8200,maxGuests:2,beds:"1 King Bed",size:32,amenities:["Free WiFi","TV"],image:imgPath("images/gj4-1.jpg")}]
  },
  {
    id:"kl4",name:"Spice Village",location:"Kumily",city:"Thekkady",state:"Kerala",
    stars:4,rating:4.6,reviews:834,price:9500,
    image:imgPath("images/kl4.jpg"),
    description:"CGH Earth's eco-resort near Periyar Tiger Reserve — thatched cottages, spice walks and birdwatching.",
    amenities:["Free WiFi","Pool","Spa","Restaurant","Room Service"],
    pricingReason:{event:"Peak Wildlife Season",surge:15,base:8261,surgeAmt:1239,gst:1425},
    nearby:[{icon:"park",name:"Periyar Tiger Reserve",detail:"2 km",warn:null}],
    rooms:[{id:"kl4-1",name:"Tribal Cottage",description:"Cosy thatched cottage in cardamom groves",price:9500,maxGuests:2,beds:"1 King Bed",size:38,amenities:["Free WiFi","Garden View"],image:imgPath("images/up3-1.jpg")}]
  },
  {
    id:"kl5",name:"Hotel Presidency",location:"MG Road",city:"Kochi",state:"Kerala",
    stars:2,rating:3.6,reviews:512,price:2200,
    image:imgPath("images/gj5.jpg"),
    description:"Budget-friendly 2-star on MG Road with reliable AC rooms and helpful staff.",
    amenities:["Free WiFi","Restaurant"],
    pricingReason:{event:"Standard Rate",surge:0,base:1864,surgeAmt:0,gst:336},
    nearby:[{icon:"subway",name:"MG Road Metro",detail:"200m",warn:null}],
    rooms:[{id:"kl5-1",name:"Standard Room",description:"Clean AC room with TV",price:2200,maxGuests:2,beds:"1 Double Bed",size:20,amenities:["Free WiFi","TV"],image:imgPath("images/up5-1.jpg")}]
  },
  {
    id:"kl6",name:"Hotel Grace Residency",location:"Ernakulam",city:"Kochi",state:"Kerala",
    stars:1,rating:3.1,reviews:203,price:900,
    image:imgPath("images/gj6.jpg"),
    description:"Simple 1-star near Ernakulam Junction — hot water, AC and WiFi at the lowest price.",
    amenities:["Free WiFi"],
    pricingReason:{event:"Standard Rate",surge:0,base:763,surgeAmt:0,gst:137},
    nearby:[{icon:"train",name:"Ernakulam Junction",detail:"400m",warn:null}],
    rooms:[{id:"kl6-1",name:"Budget Room",description:"Basic room with essentials",price:900,maxGuests:2,beds:"1 Single Bed",size:13,amenities:["Free WiFi"],image:imgPath("images/gj6-1.jpg")}]
  },

  // ══ GOA ═══════════════════════════════════════════════════════════════════
  {
    id:"ga1",name:"Taj Exotica Resort & Spa",location:"Benaulim Beach",city:"South Goa",state:"Goa",
    stars:5,rating:4.9,reviews:2103,price:32000,
    image:imgPath("images/ga1.jpg"),
    description:"Set across 56 acres on Benaulim Beach — Goa's most glamorous resort with private beach and world-class spa.",
    amenities:["Free WiFi","Beach Access","Pool","Spa","Gym","3 Restaurants","Bar","Room Service","Concierge"],
    pricingReason:{event:"Christmas–New Year Peak",surge:40,base:22857,surgeAmt:9143,gst:4800},
    nearby:[{icon:"beach_access",name:"Benaulim Beach",detail:"Direct access",warn:null},{icon:"sailing",name:"Dolphin Watching",detail:"Boat trips at 7am",warn:null}],
    rooms:[{id:"ga1-1",name:"Luxury Room",description:"Spacious room with sea or garden views",price:32000,maxGuests:2,beds:"1 King Bed",size:48,amenities:["Free WiFi","TV","Mini Bar","Balcony"],image:imgPath("images/up4-1.jpg")},{id:"ga1-2",name:"Beach Villa",description:"Private villa with plunge pool steps from the sand",price:85000,maxGuests:4,beds:"1 King Bed + Daybed",size:120,amenities:["Free WiFi","Plunge Pool","Beach Access","Butler Service"],image:"https://images.unsplash.com/photo-1540541338537-71acf8a7d6a4?w=800&q=80"}]
  },
  {
    id:"ga2",name:"W Goa",location:"Vagator Beach",city:"North Goa",state:"Goa",
    stars:5,rating:4.75,reviews:1567,price:28000,
    image:"https://images.unsplash.com/photo-1540541338537-71acf8a7d6a4?w=1080&q=80",
    description:"Ultra-chic clifftop resort at Vagator with dramatic Arabian Sea views, infinity pool and buzzing beach club.",
    amenities:["Free WiFi","Infinity Pool","Spa","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"New Year Eve Premium",surge:35,base:20741,surgeAmt:7259,gst:4200},
    nearby:[{icon:"beach_access",name:"Vagator Beach",detail:"200m",warn:null},{icon:"music_note",name:"Nightlife Strip",detail:"2 km",warn:"Loud music audible from north-facing rooms until 4am"}],
    rooms:[{id:"ga2-1",name:"Wonderful Room",description:"Clifftop room with floor-to-ceiling sea views",price:28000,maxGuests:2,beds:"1 King Bed",size:45,amenities:["Free WiFi","TV","Minibar","Sea View"],image:imgPath("images/up1-2.jpg")}]
  },
  {
    id:"ga3",name:"Alila Diwa Goa",location:"Majorda",city:"South Goa",state:"Goa",
    stars:4,rating:4.6,reviews:1123,price:14000,
    image:"https://images.unsplash.com/photo-1537991756753-29e6faca30b8?w=1080&q=80",
    description:"Serene 4-star surrounded by paddy fields near Majorda Beach — quiet ambience and excellent Spice Studio restaurant.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Peak Season",surge:20,base:11667,surgeAmt:2333,gst:2100},
    nearby:[{icon:"beach_access",name:"Majorda Beach",detail:"800m",warn:null}],
    rooms:[{id:"ga3-1",name:"Studio Suite",description:"Bright studio with paddy field views",price:14000,maxGuests:2,beds:"1 King Bed",size:42,amenities:["Free WiFi","TV","Balcony"],image:imgPath("images/up2-1.jpg")}]
  },
  {
    id:"ga4",name:"Hotel Fidalgo",location:"18th June Road",city:"Panaji",state:"Goa",
    stars:3,rating:4.0,reviews:876,price:5500,
    image:imgPath("images/ga4.jpg"),
    description:"A Goa institution since 1962 — centrally located 3-star in Panaji with pool and multicuisine restaurant.",
    amenities:["Free WiFi","Pool","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:4661,surgeAmt:0,gst:839},
    nearby:[{icon:"shopping_bag",name:"Panaji Market",detail:"500m",warn:null}],
    rooms:[{id:"ga4-1",name:"Standard Room",description:"Comfortable room with pool access",price:5500,maxGuests:2,beds:"1 Double Bed",size:28,amenities:["Free WiFi","TV"],image:imgPath("images/gj4-1.jpg")}]
  },
  {
    id:"ga5",name:"Hotel Mandovi",location:"DB Marg",city:"Panaji",state:"Goa",
    stars:3,rating:3.8,reviews:634,price:4000,
    image:imgPath("images/ga5.jpg"),
    description:"Heritage 3-star on the Mandovi riverfront — a Goa landmark with rooftop bar and sundowning views.",
    amenities:["Free WiFi","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:3390,surgeAmt:0,gst:610},
    nearby:[{icon:"sailing",name:"Mandovi River",detail:"Direct view",warn:null}],
    rooms:[{id:"ga5-1",name:"River View Room",description:"Room with Mandovi sunset views",price:4000,maxGuests:2,beds:"1 Double Bed",size:24,amenities:["Free WiFi","TV"],image:imgPath("images/up5-1.jpg")}]
  },
  {
    id:"ga6",name:"Pousada Tauma",location:"Porvorim",city:"North Goa",state:"Goa",
    stars:2,rating:3.7,reviews:398,price:2500,
    image:imgPath("images/ga6.jpg"),
    description:"Small boutique guesthouse with pool and Portuguese-influenced décor — budget travellers seeking character.",
    amenities:["Free WiFi","Pool","Restaurant"],
    pricingReason:{event:"Standard Rate",surge:0,base:2119,surgeAmt:0,gst:381},
    nearby:[{icon:"beach_access",name:"Calangute Beach",detail:"5 km",warn:null}],
    rooms:[{id:"ga6-1",name:"Garden Room",description:"Cosy room with pool access",price:2500,maxGuests:2,beds:"1 Double Bed",size:22,amenities:["Free WiFi","TV"],image:imgPath("images/hp6-1.jpg")}]
  },

  // ══ KARNATAKA ═════════════════════════════════════════════════════════════
  {
    id:"ka1",name:"The Leela Palace Bengaluru",location:"Old Airport Road",city:"Bengaluru",state:"Karnataka",
    stars:5,rating:4.88,reviews:2341,price:29000,
    image:imgPath("images/wb2.jpg"),
    description:"Bengaluru's most luxurious address — a palatial 5-star with stunning atrium, rooftop pool and award-winning restaurants.",
    amenities:["Free WiFi","Rooftop Pool","Spa","Gym","3 Restaurants","Bar","Room Service","Concierge"],
    pricingReason:{event:"Tech Summit Season",surge:20,base:24167,surgeAmt:4833,gst:4350},
    nearby:[{icon:"flight",name:"Kempegowda Airport",detail:"35 km · 50 min",warn:null},{icon:"shopping_bag",name:"UB City Mall",detail:"3 km",warn:null}],
    rooms:[{id:"ka1-1",name:"Deluxe Room",description:"Elegant room overlooking gardens and pool",price:29000,maxGuests:2,beds:"1 King Bed",size:40,amenities:["Free WiFi","TV","Mini Bar"],image:imgPath("images/up4-1.jpg")},{id:"ka1-2",name:"Royal Suite",description:"Grand suite with butler and rooftop terrace",price:70000,maxGuests:3,beds:"1 King Bed + Living Room",size:95,amenities:["Free WiFi","Butler Service","Bathtub","TV"],image:imgPath("images/up1-2.jpg")}]
  },
  {
    id:"ka2",name:"Taj West End",location:"Race Course Road",city:"Bengaluru",state:"Karnataka",
    stars:5,rating:4.82,reviews:1876,price:24000,
    image:imgPath("images/ka2.jpg"),
    description:"A 20-acre urban forest in the heart of Bengaluru — 130 years of history with colonial bungalows and a celebrated Jazz bar.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"IPL Season",surge:18,base:20339,surgeAmt:3661,gst:3600},
    nearby:[{icon:"park",name:"Cubbon Park",detail:"1 km",warn:null},{icon:"account_balance",name:"Vidhana Soudha",detail:"2 km",warn:null}],
    rooms:[{id:"ka2-1",name:"Garden Room",description:"Colonial bungalow room surrounded by century-old trees",price:24000,maxGuests:2,beds:"1 King Bed",size:45,amenities:["Free WiFi","TV","Mini Bar","Garden View"],image:imgPath("images/up3-1.jpg")}]
  },
  {
    id:"ka3",name:"Evolve Back Coorg",location:"Galibeedu",city:"Coorg",state:"Karnataka",
    stars:5,rating:4.9,reviews:1102,price:36000,
    image:imgPath("images/gj3.jpg"),
    description:"An extraordinary wilderness resort in Coorg's coffee estates — private pool villas, estate walks and traditional Coorgi cuisine.",
    amenities:["Free WiFi","Private Pool","Spa","Gym","Restaurant","Room Service"],
    pricingReason:{event:"Monsoon Season",surge:10,base:32727,surgeAmt:3273,gst:5400},
    nearby:[{icon:"park",name:"Coffee Plantation",detail:"On-site",warn:null},{icon:"water",name:"Dubare Elephant Camp",detail:"15 km",warn:null}],
    rooms:[{id:"ka3-1",name:"Pool Villa",description:"Private estate villa with plunge pool and forest views",price:36000,maxGuests:2,beds:"1 King Bed",size:80,amenities:["Free WiFi","Private Pool","Mini Bar"],image:imgPath("images/up2-1.jpg")}]
  },
  {
    id:"ka4",name:"Royal Orchid Hotel",location:"Golf Course Road",city:"Bengaluru",state:"Karnataka",
    stars:4,rating:4.3,reviews:987,price:7500,
    image:imgPath("images/ka4.jpg"),
    description:"Polished 4-star business hotel near Bengaluru's IT corridor with a well-regarded multi-cuisine restaurant.",
    amenities:["Free WiFi","Pool","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:6356,surgeAmt:0,gst:1144},
    nearby:[{icon:"place",name:"Whitefield IT Park",detail:"8 km",warn:null}],
    rooms:[{id:"ka4-1",name:"Deluxe Room",description:"Contemporary room with work desk and city views",price:7500,maxGuests:2,beds:"1 King Bed",size:34,amenities:["Free WiFi","TV","Work Desk"],image:imgPath("images/gj4-1.jpg")}]
  },
  {
    id:"ka5",name:"Hotel Ajantha",location:"MG Road",city:"Bengaluru",state:"Karnataka",
    stars:2,rating:3.5,reviews:534,price:2400,
    image:imgPath("images/wb6.jpg"),
    description:"Budget 2-star on iconic MG Road — well connected, clean and great value for the location.",
    amenities:["Free WiFi","Restaurant"],
    pricingReason:{event:"Standard Rate",surge:0,base:2034,surgeAmt:0,gst:366},
    nearby:[{icon:"subway",name:"MG Road Metro",detail:"200m",warn:null}],
    rooms:[{id:"ka5-1",name:"Standard Room",description:"Clean AC room near metro",price:2400,maxGuests:2,beds:"1 Double Bed",size:20,amenities:["Free WiFi","TV"],image:imgPath("images/up5-1.jpg")}]
  },
  {
    id:"ka6",name:"Hotel Adora",location:"Shivajinagar",city:"Bengaluru",state:"Karnataka",
    stars:1,rating:3.2,reviews:267,price:1100,
    image:imgPath("images/gj6.jpg"),
    description:"No-frills 1-star lodge in the centre of Bengaluru — hot water, AC and WiFi at the lowest price.",
    amenities:["Free WiFi"],
    pricingReason:{event:"Standard Rate",surge:0,base:932,surgeAmt:0,gst:168},
    nearby:[{icon:"directions_bus",name:"Shivajinagar Bus Stand",detail:"100m",warn:null}],
    rooms:[{id:"ka6-1",name:"Budget Room",description:"Simple room with AC",price:1100,maxGuests:2,beds:"1 Single Bed",size:13,amenities:["Free WiFi"],image:imgPath("images/gj6-1.jpg")}]
  },

  // ══ WEST BENGAL ═══════════════════════════════════════════════════════════
  {
    id:"wb1",name:"The Oberoi Grand",location:"Jawaharlal Nehru Road",city:"Kolkata",state:"West Bengal",
    stars:5,rating:4.87,reviews:2103,price:21000,
    image:"https://images.unsplash.com/photo-1587563974553-b9b8bf3e6e5d?w=1080&q=80",
    description:"A Victorian Gothic landmark on Park Street — Kolkata's most prestigious address since 1841, with unmatched colonial grandeur.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Durga Puja Premium",surge:40,base:15000,surgeAmt:6000,gst:3150},
    nearby:[{icon:"account_balance",name:"Victoria Memorial",detail:"2 km",warn:null},{icon:"event",name:"Durga Puja pandals",detail:"City-wide",warn:"Extreme crowds and traffic during Puja week (Oct)"}],
    rooms:[{id:"wb1-1",name:"Deluxe Room",description:"Victorian-era room with modern luxuries",price:21000,maxGuests:2,beds:"1 King Bed",size:40,amenities:["Free WiFi","TV","Mini Bar"],image:imgPath("images/up3-1.jpg")},{id:"wb1-2",name:"Premier Suite",description:"Grand suite overlooking the heritage pool",price:50000,maxGuests:3,beds:"1 King Bed + Sitting Room",size:85,amenities:["Free WiFi","TV","Butler","Bathtub"],image:imgPath("images/up1-2.jpg")}]
  },
  {
    id:"wb2",name:"ITC Royal Bengal",location:"JBS Haldane Avenue",city:"Kolkata",state:"West Bengal",
    stars:5,rating:4.82,reviews:1567,price:19000,
    image:imgPath("images/wb2.jpg"),
    description:"ITC's flagship in Kolkata — towering 5-star with Bengal-inspired décor, six restaurants and a signature ITC One Club floor.",
    amenities:["Free WiFi","Pool","Spa","Gym","6 Restaurants","Bar","Room Service","Concierge"],
    pricingReason:{event:"Business Season",surge:15,base:16522,surgeAmt:2478,gst:2850},
    nearby:[{icon:"place",name:"Science City",detail:"1.5 km",warn:null}],
    rooms:[{id:"wb2-1",name:"Executive Room",description:"Modern room with Bengal-art accents",price:19000,maxGuests:2,beds:"1 King Bed",size:38,amenities:["Free WiFi","TV","Mini Bar"],image:imgPath("images/up4-1.jpg")}]
  },
  {
    id:"wb3",name:"Taj Bengal",location:"Alipore",city:"Kolkata",state:"West Bengal",
    stars:5,rating:4.8,reviews:1892,price:18500,
    image:imgPath("images/wb3.jpg"),
    description:"Overlooking the Maidan, Taj Bengal showcases the finest Bengali craftsmanship with exceptional cuisine and service.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Standard Rate",surge:0,base:15678,surgeAmt:0,gst:2822},
    nearby:[{icon:"park",name:"Maidan",detail:"1 km",warn:null},{icon:"account_balance",name:"Victoria Memorial",detail:"1.5 km",warn:null}],
    rooms:[{id:"wb3-1",name:"Superior Room",description:"Room with Maidan or pool views",price:18500,maxGuests:2,beds:"1 King Bed",size:40,amenities:["Free WiFi","TV","Mini Bar"],image:imgPath("images/up2-1.jpg")}]
  },
  {
    id:"wb4",name:"Swissotel Kolkata",location:"New Town",city:"Kolkata",state:"West Bengal",
    stars:4,rating:4.5,reviews:876,price:8500,
    image:imgPath("images/wb4.jpg"),
    description:"Contemporary 4-star in New Town's business district — clean lines, excellent service and popular Kebabs & Kurries restaurant.",
    amenities:["Free WiFi","Pool","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:7203,surgeAmt:0,gst:1297},
    nearby:[{icon:"place",name:"Eco Park",detail:"2 km",warn:null}],
    rooms:[{id:"wb4-1",name:"Superior Room",description:"Bright contemporary room with city views",price:8500,maxGuests:2,beds:"1 King Bed",size:35,amenities:["Free WiFi","TV","Work Desk"],image:imgPath("images/gj4-1.jpg")}]
  },
  {
    id:"wb5",name:"Hotel Hindustan International",location:"AJC Bose Road",city:"Kolkata",state:"West Bengal",
    stars:3,rating:3.9,reviews:654,price:4500,
    image:imgPath("images/gj5.jpg"),
    description:"Kolkata's well-known 3-star with an old-world charm, central location and popular Bengali restaurant.",
    amenities:["Free WiFi","Pool","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:3814,surgeAmt:0,gst:686},
    nearby:[{icon:"subway",name:"Rabindra Sadan Metro",detail:"500m",warn:null}],
    rooms:[{id:"wb5-1",name:"Deluxe Room",description:"Comfortable room with city views",price:4500,maxGuests:2,beds:"1 Double Bed",size:28,amenities:["Free WiFi","TV"],image:imgPath("images/hp6-1.jpg")}]
  },
  {
    id:"wb6",name:"Hotel VIP International",location:"Park Circus",city:"Kolkata",state:"West Bengal",
    stars:2,rating:3.4,reviews:389,price:2000,
    image:imgPath("images/wb6.jpg"),
    description:"No-nonsense 2-star in central Kolkata — good connectivity, clean rooms and budget-friendly rates.",
    amenities:["Free WiFi","Restaurant"],
    pricingReason:{event:"Standard Rate",surge:0,base:1695,surgeAmt:0,gst:305},
    nearby:[{icon:"subway",name:"Park Circus Metro",detail:"300m",warn:null}],
    rooms:[{id:"wb6-1",name:"Standard Room",description:"Clean AC room",price:2000,maxGuests:2,beds:"1 Double Bed",size:18,amenities:["Free WiFi","TV"],image:imgPath("images/up5-1.jpg")}]
  },

  // ══ GUJARAT ═══════════════════════════════════════════════════════════════
  {
    id:"gj1",name:"The House of MG",location:"Lal Darwaja",city:"Ahmedabad",state:"Gujarat",
    stars:5,rating:4.85,reviews:1203,price:14000,
    image:"https://images.unsplash.com/photo-1568575177891-8f71bb3a6f18?w=1080&q=80",
    description:"A 1924 heritage mansion transformed into a boutique 5-star — handcrafted Gujarati interiors, rooftop dining and an Agashiye restaurant.",
    amenities:["Free WiFi","Pool","Spa","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Navratri Premium",surge:30,base:10769,surgeAmt:3231,gst:2100},
    nearby:[{icon:"account_balance",name:"Bhadra Fort",detail:"500m",warn:null},{icon:"event",name:"Navratri Grounds",detail:"1 km",warn:"Very heavy crowds and noise during Navratri (Oct)"}],
    rooms:[{id:"gj1-1",name:"Heritage Room",description:"Room with original wooden joinery and carved furniture",price:14000,maxGuests:2,beds:"1 King Bed",size:38,amenities:["Free WiFi","TV","Heritage Décor"],image:imgPath("images/gj1-1.jpg")}]
  },
  {
    id:"gj2",name:"Taj Gateway Surat",location:"Athwalines",city:"Surat",state:"Gujarat",
    stars:5,rating:4.7,reviews:876,price:12000,
    image:imgPath("images/gj2.jpg"),
    description:"Surat's premier 5-star — the address of choice for diamond industry executives with outstanding Gujarati vegetarian cuisine.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Diamond Season",surge:15,base:10435,surgeAmt:1565,gst:1800},
    nearby:[{icon:"shopping_bag",name:"Diamond Bourse",detail:"5 km",warn:null}],
    rooms:[{id:"gj2-1",name:"Deluxe Room",description:"Contemporary room with city skyline views",price:12000,maxGuests:2,beds:"1 King Bed",size:38,amenities:["Free WiFi","TV","Mini Bar"],image:imgPath("images/up2-1.jpg")}]
  },
  {
    id:"gj3",name:"Lemon Tree Hotel Ahmedabad",location:"Judges Bungalow Road",city:"Ahmedabad",state:"Gujarat",
    stars:4,rating:4.3,reviews:765,price:6500,
    image:imgPath("images/gj3.jpg"),
    description:"Vibrant 4-star with cheerful design, rooftop pool and the popular Citrus Café — ideal for leisure and business travellers.",
    amenities:["Free WiFi","Pool","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:5508,surgeAmt:0,gst:992},
    nearby:[{icon:"account_balance",name:"Sabarmati Ashram",detail:"6 km",warn:null}],
    rooms:[{id:"gj3-1",name:"Premium Room",description:"Bright modern room with pool or garden views",price:6500,maxGuests:2,beds:"1 King Bed",size:32,amenities:["Free WiFi","TV","Work Desk"],image:imgPath("images/up3-1.jpg")}]
  },
  {
    id:"gj4",name:"Hotel Regenta Inn",location:"CG Road",city:"Ahmedabad",state:"Gujarat",
    stars:3,rating:4.0,reviews:543,price:3800,
    image:imgPath("images/gj4.jpg"),
    description:"Dependable 3-star on CG Road — Ahmedabad's main commercial strip — with multicuisine restaurant and solid service.",
    amenities:["Free WiFi","Restaurant","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:3220,surgeAmt:0,gst:580},
    nearby:[{icon:"shopping_bag",name:"CG Road Shopping",detail:"On the street",warn:null}],
    rooms:[{id:"gj4-1",name:"Deluxe Room",description:"Clean spacious room with modern amenities",price:3800,maxGuests:2,beds:"1 Double Bed",size:26,amenities:["Free WiFi","TV"],image:imgPath("images/gj4-1.jpg")}]
  },
  {
    id:"gj5",name:"Hotel Comfort Inn",location:"Paldi",city:"Ahmedabad",state:"Gujarat",
    stars:2,rating:3.6,reviews:398,price:2000,
    image:imgPath("images/gj5.jpg"),
    description:"Budget 2-star in Paldi — clean, AC and well-connected to all of Ahmedabad by metro and road.",
    amenities:["Free WiFi","Restaurant"],
    pricingReason:{event:"Standard Rate",surge:0,base:1695,surgeAmt:0,gst:305},
    nearby:[{icon:"subway",name:"Paldi Metro Station",detail:"300m",warn:null}],
    rooms:[{id:"gj5-1",name:"Standard Room",description:"Basic AC room with TV",price:2000,maxGuests:2,beds:"1 Double Bed",size:19,amenities:["Free WiFi","TV"],image:imgPath("images/hp6-1.jpg")}]
  },
  {
    id:"gj6",name:"Hotel Volga",location:"Kalupur",city:"Ahmedabad",state:"Gujarat",
    stars:1,rating:3.2,reviews:214,price:950,
    image:imgPath("images/gj6.jpg"),
    description:"1-star budget lodge near Ahmedabad railway station — basic, safe and the cheapest option in the city.",
    amenities:["Free WiFi"],
    pricingReason:{event:"Standard Rate",surge:0,base:805,surgeAmt:0,gst:145},
    nearby:[{icon:"train",name:"Ahmedabad Railway Station",detail:"400m",warn:null}],
    rooms:[{id:"gj6-1",name:"Budget Room",description:"Simple room with AC and hot water",price:950,maxGuests:2,beds:"1 Single Bed",size:13,amenities:["Free WiFi"],image:imgPath("images/gj6-1.jpg")}]
  },

  // ══ HIMACHAL PRADESH ══════════════════════════════════════════════════════
  {
    id:"hp1",name:"Wildflower Hall",location:"Mashobra",city:"Shimla",state:"Himachal Pradesh",
    stars:5,rating:4.93,reviews:1034,price:45000,
    image:imgPath("images/hp1.jpg"),
    description:"Once Lord Kitchener's residence, perched at 8,250 ft in cedar forests — the Himalayas' most celebrated mountain retreat.",
    amenities:["Free WiFi","Heated Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Peak Summer Season",surge:25,base:36000,surgeAmt:9000,gst:6750},
    nearby:[{icon:"park",name:"Cedar Forest Trails",detail:"On property · 6 km of trails",warn:null},{icon:"ac_unit",name:"Snow Zone",detail:"Dec–Feb snowfall",warn:"Road may close during heavy snowfall; confirm before travel"}],
    rooms:[{id:"hp1-1",name:"Deluxe Mountain Room",description:"Cedar-panelled room with sweeping Himalayan panoramas",price:45000,maxGuests:2,beds:"1 King Bed",size:48,amenities:["Free WiFi","TV","Fireplace","Mountain View"],image:imgPath("images/hp1-1.jpg")},{id:"hp1-2",name:"Kitchener Suite",description:"Heritage suite in the original 1905 mansion wing",price:90000,maxGuests:2,beds:"1 King Bed + Study",size:100,amenities:["Free WiFi","Fireplace","Butler","Bathtub"],image:imgPath("images/up1-2.jpg")}]
  },
  {
    id:"hp2",name:"Spiti Sarai",location:"Kaza",city:"Spiti Valley",state:"Himachal Pradesh",
    stars:4,rating:4.7,reviews:567,price:8000,
    image:imgPath("images/hp2.jpg"),
    description:"Boutique 4-star at 12,500 ft in the Spiti Valley — solar-powered, sustainable and spectacularly remote.",
    amenities:["Free WiFi","Restaurant","Room Service"],
    pricingReason:{event:"Peak Monsoon Access",surge:20,base:6780,surgeAmt:1220,gst:1200},
    nearby:[{icon:"account_balance",name:"Key Monastery",detail:"7 km",warn:null},{icon:"ac_unit",name:"High Altitude Warning",detail:"12,500 ft — acclimatise first",warn:"Altitude sickness possible; rest on Day 1"}],
    rooms:[{id:"hp2-1",name:"Valley View Room",description:"Simple yet charming room overlooking the Spiti River",price:8000,maxGuests:2,beds:"1 Queen Bed",size:30,amenities:["Free WiFi","Valley View"],image:imgPath("images/hp2-1.jpg")}]
  },
  {
    id:"hp3",name:"Oberoi Cecil",location:"Chaura Maidan",city:"Shimla",state:"Himachal Pradesh",
    stars:5,rating:4.86,reviews:1243,price:32000,
    image:imgPath("images/hp3.jpg"),
    description:"A 1884 colonial-era heritage hotel on Shimla's ridge with unobstructed Himalayan views and Oberoi's signature elegance.",
    amenities:["Free WiFi","Indoor Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Summer Peak",surge:20,base:26667,surgeAmt:5333,gst:4800},
    nearby:[{icon:"place",name:"The Ridge",detail:"1 km · Shimla's main promenade",warn:null},{icon:"train",name:"Shimla Toy Train",detail:"2 km · UNESCO heritage",warn:null}],
    rooms:[{id:"hp3-1",name:"Heritage Deluxe Room",description:"Beautifully restored colonial room with mountain views",price:32000,maxGuests:2,beds:"1 King Bed",size:42,amenities:["Free WiFi","TV","Mini Bar","Mountain View"],image:imgPath("images/up3-1.jpg")}]
  },
  {
    id:"hp4",name:"Zostel Kasol",location:"Kasol Village",city:"Kasol",state:"Himachal Pradesh",
    stars:2,rating:4.2,reviews:1876,price:1500,
    image:imgPath("images/hp4.jpg"),
    description:"The most popular backpacker hostel in the Parvati Valley — dorms and private rooms, with the Beas River right outside.",
    amenities:["Free WiFi","Common Area","Bonfire"],
    pricingReason:{event:"Trekking Season",surge:10,base:1364,surgeAmt:136,gst:225},
    nearby:[{icon:"hiking",name:"Kheerganga Trek",detail:"12 km trailhead from Kasol",warn:null},{icon:"water",name:"Parvati River",detail:"50m from hostel",warn:null}],
    rooms:[{id:"hp4-1",name:"Private Room",description:"Simple mountain room with river views",price:1500,maxGuests:2,beds:"1 Double Bed",size:16,amenities:["Free WiFi"],image:imgPath("images/hp4-1.jpg")}]
  },
  {
    id:"hp5",name:"Hotel Peterhof",location:"Circular Road",city:"Shimla",state:"Himachal Pradesh",
    stars:3,rating:3.8,reviews:654,price:4500,
    image:"https://images.unsplash.com/photo-1543296236-62b3b0a2d82e?w=1080&q=80",
    description:"A heritage 3-star run by HPTDC on Shimla's most scenic stretch — old-world character with modern comfort.",
    amenities:["Free WiFi","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:3814,surgeAmt:0,gst:686},
    nearby:[{icon:"place",name:"The Ridge",detail:"500m",warn:null}],
    rooms:[{id:"hp5-1",name:"Standard Room",description:"Heritage-style room with valley views",price:4500,maxGuests:2,beds:"1 Double Bed",size:26,amenities:["Free WiFi","TV"],image:imgPath("images/up5-1.jpg")}]
  },
  {
    id:"hp6",name:"Hotel Snow View",location:"Mall Road",city:"Manali",state:"Himachal Pradesh",
    stars:2,rating:3.6,reviews:487,price:2200,
    image:"https://images.unsplash.com/photo-1598977905070-a0e3a9b9a9a0?w=1080&q=80",
    description:"Budget 2-star on Manali's Mall Road — clean rooms, mountain views and walking distance from all trekking operators.",
    amenities:["Free WiFi","Restaurant"],
    pricingReason:{event:"Standard Rate",surge:0,base:1864,surgeAmt:0,gst:336},
    nearby:[{icon:"hiking",name:"Rohtang Pass",detail:"51 km · Book permits in advance",warn:"Road closed Nov–May"},
            {icon:"place",name:"Old Manali",detail:"2 km · Cafes & handicrafts",warn:null}],
    rooms:[{id:"hp6-1",name:"Mountain View Room",description:"Cosy room with Beas Valley views",price:2200,maxGuests:2,beds:"1 Double Bed",size:20,amenities:["Free WiFi","TV"],image:imgPath("images/hp6-1.jpg")}]
  },

  // ══ UTTAR PRADESH ═════════════════════════════════════════════════════════
  {
    id:"up1",name:"Taj Hotel & Convention Centre",location:"Vikas Nagar",city:"Agra",state:"Uttar Pradesh",
    stars:5,rating:4.85,reviews:2341,price:22000,
    image:imgPath("images/up1.jpg"),
    description:"The closest 5-star to the Taj Mahal — stunning sunrise views of the monument from the pool, Jiva Spa and the famous Mughal-E-Azam restaurant.",
    amenities:["Free WiFi","Pool","Spa","Gym","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Taj Mahal Tourist Season",surge:25,base:17600,surgeAmt:4400,gst:3300},
    nearby:[{icon:"account_balance",name:"Taj Mahal",detail:"2 km · 8 min drive",warn:null},{icon:"fort",name:"Agra Fort",detail:"5 km",warn:null}],
    rooms:[{id:"up1-1",name:"Deluxe Taj View Room",description:"Room with a direct Taj Mahal sunrise view from the balcony",price:22000,maxGuests:2,beds:"1 King Bed",size:40,amenities:["Free WiFi","TV","Mini Bar","Taj View"],image:imgPath("images/up1-1.jpg")},{id:"up1-2",name:"Presidential Suite",description:"Top floor suite with panoramic Taj Mahal views",price:80000,maxGuests:4,beds:"1 King Bed + Living Room",size:120,amenities:["Free WiFi","Butler","Spa Bath","Taj View"],image:imgPath("images/up1-2.jpg")}]
  },
  {
    id:"up2",name:"Nadesar Palace",location:"Nadesar",city:"Varanasi",state:"Uttar Pradesh",
    stars:5,rating:4.88,reviews:987,price:38000,
    image:imgPath("images/up2.jpg"),
    description:"A royal 5-star property — once the residence of the Maharaja of Benares — set in 6 acres of gardens by the Ganga.",
    amenities:["Free WiFi","Pool","Spa","Restaurant","Bar","Room Service","Concierge"],
    pricingReason:{event:"Dev Deepawali Season",surge:35,base:28148,surgeAmt:9852,gst:5700},
    nearby:[{icon:"place",name:"Dashashwamedh Ghat",detail:"4 km · Evening Ganga Aarti",warn:null},{icon:"temple_hindu",name:"Kashi Vishwanath Temple",detail:"5 km",warn:"Very heavy crowds during festival days"}],
    rooms:[{id:"up2-1",name:"Palace Room",description:"Royal room with original royal furnishings",price:38000,maxGuests:2,beds:"1 King Bed",size:50,amenities:["Free WiFi","TV","Garden View"],image:imgPath("images/up2-1.jpg")}]
  },
  {
    id:"up3",name:"Trident Agra",location:"Taj Nagri",city:"Agra",state:"Uttar Pradesh",
    stars:4,rating:4.5,reviews:1654,price:9500,
    image:imgPath("images/up3.jpg"),
    description:"Serene 4-star just 500m from the Taj Mahal — Mughal-inspired architecture, beautiful gardens and the Tajganj restaurant.",
    amenities:["Free WiFi","Pool","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:8051,surgeAmt:0,gst:1449},
    nearby:[{icon:"account_balance",name:"Taj Mahal",detail:"500m · 5 min walk",warn:null}],
    rooms:[{id:"up3-1",name:"Deluxe Room",description:"Mughal-inspired room with garden views",price:9500,maxGuests:2,beds:"1 King Bed",size:36,amenities:["Free WiFi","TV","Work Desk"],image:imgPath("images/up3-1.jpg")}]
  },
  {
    id:"up4",name:"Hotel Clarks Varanasi",location:"The Mall",city:"Varanasi",state:"Uttar Pradesh",
    stars:4,rating:4.2,reviews:876,price:7500,
    image:imgPath("images/up4.jpg"),
    description:"Varanasi's oldest established 4-star — colonial heritage, pool and a convenient base for the ghats.",
    amenities:["Free WiFi","Pool","Gym","Restaurant","Bar","Room Service"],
    pricingReason:{event:"Standard Rate",surge:0,base:6356,surgeAmt:0,gst:1144},
    nearby:[{icon:"place",name:"Dashashwamedh Ghat",detail:"5 km",warn:null}],
    rooms:[{id:"up4-1",name:"Standard Room",description:"Classic colonial-style room",price:7500,maxGuests:2,beds:"1 King Bed",size:33,amenities:["Free WiFi","TV"],image:imgPath("images/up4-1.jpg")}]
  },
  {
    id:"up5",name:"Hotel Sheela",location:"East Gate, Taj Mahal",city:"Agra",state:"Uttar Pradesh",
    stars:2,rating:3.8,reviews:2301,price:2200,
    image:imgPath("images/up5.jpg"),
    description:"Legendary budget hotel right outside the Taj Mahal's East Gate — clean, friendly and unbeatable location for the price.",
    amenities:["Free WiFi","Restaurant"],
    pricingReason:{event:"Standard Rate",surge:0,base:1864,surgeAmt:0,gst:336},
    nearby:[{icon:"account_balance",name:"Taj Mahal East Gate",detail:"50m · Walk",warn:null}],
    rooms:[{id:"up5-1",name:"Standard Room",description:"Clean room with garden and Taj views from rooftop",price:2200,maxGuests:2,beds:"1 Double Bed",size:20,amenities:["Free WiFi","TV"],image:imgPath("images/up5-1.jpg")}]
  },
  {
    id:"up6",name:"Hotel Alka",location:"Meer Ghat",city:"Varanasi",state:"Uttar Pradesh",
    stars:1,rating:3.5,reviews:1203,price:1100,
    image:"https://images.unsplash.com/photo-1561361058-c24e023867f3?w=1080&q=80",
    description:"1-star guesthouse right on the Ganges ghats — the most atmospheric budget stay in Varanasi.",
    amenities:["Free WiFi"],
    pricingReason:{event:"Standard Rate",surge:0,base:932,surgeAmt:0,gst:168},
    nearby:[{icon:"place",name:"Meer Ghat",detail:"On the ghat",warn:null},{icon:"temple_hindu",name:"Morning Aarti",detail:"5am daily",warn:"Loud ceremony audible from 4:30am"}],
    rooms:[{id:"up6-1",name:"Ganga View Room",description:"Simple room with direct Ganges views",price:1100,maxGuests:2,beds:"1 Double Bed",size:15,amenities:["Free WiFi"],image:imgPath("images/up6-1.jpg")}]
  }

];

const amenityIcons = {
  "Free WiFi":"wifi","WiFi":"wifi","Pool":"waves","2 Pools":"waves","3 Pools":"waves",
  "Heated Pool":"waves","Rooftop Pool":"waves","Private Pool":"waves","Plunge Pool":"waves",
  "Spa":"spa","Hot Tub":"hot_tub","Gym":"fitness_center",
  "Restaurant":"restaurant","3 Restaurants":"restaurant","5 Restaurants":"restaurant","Private Dining":"restaurant",
  "Bar":"local_bar","Rooftop Bar":"local_bar","Vintage Bar":"local_bar",
  "Room Service":"room_service","Concierge":"support_agent","Beach Access":"beach_access",
  "Butler Service":"person","TV":"tv","Mini Bar":"liquor","Coffee Maker":"coffee",
  "Safe":"lock","Bathtub":"bathtub","Work Desk":"desk","Balcony":"balcony",
  "Ocean View":"water","Lake View":"water","Garden View":"yard","City View":"location_city",
  "Mountain View":"landscape","Private Terrace":"deck","Private Courtyard":"yard",
  "Fireplace":"fireplace","Full Kitchen":"kitchen","default":"star"
};

function getAmenityIcon(a){ return amenityIcons[a]||amenityIcons["default"]; }
function getParams(){ return new URLSearchParams(window.location.search); }
function buildUrl(page,params){ const qs=new URLSearchParams(params).toString(); return `${page}${qs?'?'+qs:''}`; }
function calcNights(ci,co){ if(!ci||!co)return 1; const d=new Date(co)-new Date(ci); return Math.max(1,Math.ceil(d/(1000*60*60*24))); }
function formatDate(s){ if(!s)return''; const d=new Date(s+'T00:00:00'); return d.toLocaleDateString('en-IN',{month:'short',day:'numeric',year:'numeric'}); }
function formatINR(n){ return '₹'+Number(n).toLocaleString('en-IN'); }
function imgWithFallback(src,alt,cls=''){ return `<img src="${src}" alt="${alt}" class="${cls}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80';this.onerror=null;">`; }

// ── PREFERENCE PROFILE ───────────────────────────────────────────────────────
function savePrefs(p){ try{localStorage.setItem('sb_prefs',JSON.stringify(p));}catch(e){} }
function loadPrefs(){ try{return JSON.parse(localStorage.getItem('sb_prefs')||'{}');}catch(e){return{};} }
function countPrefs(p){ let n=0; if(p.temp)n++; if(p.pillow)n++; if(p.floor)n++; if(p.diet&&p.diet.length)n++; if(p.bed)n++; if(p.special&&p.special.trim())n++; return n; }

function buildPrefModal(){
  const existing=document.getElementById('prefModalOverlay'); if(existing)existing.remove();
  const prefs=loadPrefs();
  const overlay=document.createElement('div');
  overlay.id='prefModalOverlay';
  overlay.style.cssText='position:fixed;inset:0;background:rgba(15,30,46,0.65);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
  overlay.innerHTML=`
    <div style="background:#fff;border-radius:16px;padding:36px;max-width:540px;width:92%;position:relative;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(15,30,46,0.3);">
      <button onclick="document.getElementById('prefModalOverlay').remove()" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;color:#9a9aaa;line-height:1;">✕</button>
      <h2 style="font-family:'Cormorant Garamond',serif;font-size:1.8rem;margin-bottom:4px;color:#0f1e2e;">Guest Preferences</h2>
      <p style="font-size:0.85rem;color:#5a5a6e;margin-bottom:24px;">Saved once, applied to every booking automatically.</p>
      <div style="margin-bottom:20px;"><div class="form-label" style="margin-bottom:8px;">Room Temperature</div><div id="pt-temp" style="display:flex;flex-wrap:wrap;gap:8px;"></div></div>
      <div style="margin-bottom:20px;"><div class="form-label" style="margin-bottom:8px;">Pillow Preference</div><div id="pt-pillow" style="display:flex;flex-wrap:wrap;gap:8px;"></div></div>
      <div style="margin-bottom:20px;"><div class="form-label" style="margin-bottom:8px;">Floor Preference</div><div id="pt-floor" style="display:flex;flex-wrap:wrap;gap:8px;"></div></div>
      <div style="margin-bottom:20px;"><div class="form-label" style="margin-bottom:8px;">Dietary Needs</div><div id="pt-diet" style="display:flex;flex-wrap:wrap;gap:8px;"></div></div>
      <div style="margin-bottom:20px;"><div class="form-label" style="margin-bottom:8px;">Bed Configuration</div><div id="pt-bed" style="display:flex;flex-wrap:wrap;gap:8px;"></div></div>
      <div style="margin-bottom:20px;"><div class="form-label" style="margin-bottom:8px;">Special Requests</div><textarea id="pt-special" class="input-field no-icon" rows="3" style="resize:vertical;" placeholder="Honeymoon setup, accessibility needs, anniversary…">${prefs.special||''}</textarea></div>
      <div id="prefSavedMsg" style="display:none;background:#e8f5ee;border:1px solid #a8d5bc;border-radius:8px;padding:10px 16px;font-size:0.875rem;color:#1a7a4a;margin-bottom:12px;align-items:center;gap:8px;"><span class="material-icons-round" style="font-size:18px;">check_circle</span> Preferences saved!</div>
      <button id="prefSaveBtn" class="btn btn-primary btn-full"><span class="material-icons-round">save</span> Save Preferences</button>
    </div>`;
  document.body.appendChild(overlay);

  const cfg={
    'pt-temp':{key:'temp',multi:false,opts:['Cool (18–20°C)','Mild (21–23°C)','Warm (24–26°C)']},
    'pt-pillow':{key:'pillow',multi:false,opts:['Soft','Medium','Firm','Memory Foam','Feather']},
    'pt-floor':{key:'floor',multi:false,opts:['Low (1–5)','Mid (6–12)','High (13+)','No Preference']},
    'pt-diet':{key:'diet',multi:true,opts:['Pure Veg','Jain','Halal','Vegan','Gluten-Free','No Restrictions']},
    'pt-bed':{key:'bed',multi:false,opts:['King','Twin','Double-Double','Any']}
  };
  const cur={...prefs}; if(!cur.diet)cur.diet=[];

  function renderAll(){
    Object.entries(cfg).forEach(([id,c])=>{
      const el=document.getElementById(id); el.innerHTML='';
      c.opts.forEach(opt=>{
        const active=c.multi?(cur[c.key]||[]).includes(opt):cur[c.key]===opt;
        const btn=document.createElement('button');
        btn.type='button'; btn.textContent=opt;
        btn.style.cssText=`padding:7px 16px;border-radius:20px;border:1.5px solid ${active?'#0f1e2e':'#e8e8ec'};background:${active?'#0f1e2e':'#fff'};color:${active?'#fff':'#5a5a6e'};font-size:0.8rem;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:inherit;`;
        btn.addEventListener('click',()=>{
          if(c.multi){ if(!cur[c.key])cur[c.key]=[]; if(cur[c.key].includes(opt))cur[c.key]=cur[c.key].filter(x=>x!==opt); else cur[c.key].push(opt); }
          else{ cur[c.key]=cur[c.key]===opt?'':opt; }
          renderAll();
        });
        el.appendChild(btn);
      });
    });
  }
  renderAll();
  overlay.addEventListener('click',e=>{ if(e.target===overlay)overlay.remove(); });
  document.getElementById('prefSaveBtn').addEventListener('click',()=>{
    cur.special=document.getElementById('pt-special').value;
    savePrefs(cur); updateNavPrefBtn();
    const msg=document.getElementById('prefSavedMsg'); msg.style.display='flex';
    setTimeout(()=>overlay.remove(),1200);
  });
}

// updateNavPrefBtn — see buildNav()

// ── BOOKINGS STORE ────────────────────────────────────────────────────────────
function saveBooking(data){ try{ const b=getBookings(); b.unshift(data); localStorage.setItem('sb_bookings',JSON.stringify(b.slice(0,20))); }catch(e){} }
function getBookings(){ try{return JSON.parse(localStorage.getItem('sb_bookings')||'[]');}catch(e){return[];} }
function updateBooking(bid,updates){ try{ const b=getBookings(); const i=b.findIndex(x=>x.bookingId===bid); if(i!==-1){b[i]={...b[i],...updates};localStorage.setItem('sb_bookings',JSON.stringify(b));} }catch(e){} }

// ── LOYALTY SYSTEM ────────────────────────────────────────────────────────────
const LOYALTY_TIERS = [
  {
    id: 'bronze',
    name: 'Bronze',
    icon: 'military_tech',
    color: '#CD7F32',
    colorLight: '#FDF0E6',
    minBookings: 1,
    minSpend: 0,
    discount: 5,
    perks: [
      'Early check-in request (subject to availability)',
      'Welcome amenity on arrival',
      '5% discount on all bookings'
    ]
  },
  {
    id: 'silver',
    name: 'Silver',
    icon: 'workspace_premium',
    color: '#8E9BAE',
    colorLight: '#F0F2F5',
    minBookings: 3,
    minSpend: 100000,
    discount: 10,
    perks: [
      'Guaranteed early check-in (12pm)',
      'Late checkout till 2pm',
      'Complimentary room upgrade when available',
      '10% discount on all bookings'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    icon: 'stars',
    color: '#C9A96E',
    colorLight: '#F5EDD8',
    minBookings: 6,
    minSpend: 300000,
    discount: 15,
    perks: [
      'Guaranteed late checkout (4pm)',
      'Complimentary airport transfer (one-way)',
      'Complimentary breakfast for two',
      'Access to exclusive Gold member events',
      '15% discount on all bookings'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    icon: 'diamond',
    color: '#5C6BC0',
    colorLight: '#EEF0FB',
    minBookings: 12,
    minSpend: 750000,
    discount: 20,
    perks: [
      'Dedicated personal concierge',
      'Complimentary suite upgrade when available',
      'Round-trip airport transfer included',
      'Full breakfast & evening cocktails',
      'Priority booking at sold-out properties',
      '20% discount on all bookings'
    ]
  }
];

function getLoyaltyStats() {
  const bookings = getBookings();
  const totalBookings = bookings.length;
  const totalSpend = bookings.reduce((sum, b) => sum + (b.grandTotal || 0), 0);
  return { totalBookings, totalSpend };
}

function getCurrentTier() {
  const { totalBookings, totalSpend } = getLoyaltyStats();
  // Walk tiers from highest to lowest, return first one the user qualifies for
  for (let i = LOYALTY_TIERS.length - 1; i >= 0; i--) {
    const t = LOYALTY_TIERS[i];
    if (totalBookings >= t.minBookings && totalSpend >= t.minSpend) return t;
  }
  return null; // No tier yet (0 bookings)
}

function getNextTier() {
  const current = getCurrentTier();
  if (!current) return LOYALTY_TIERS[0]; // point to Bronze
  const idx = LOYALTY_TIERS.findIndex(t => t.id === current.id);
  return idx < LOYALTY_TIERS.length - 1 ? LOYALTY_TIERS[idx + 1] : null;
}

function applyLoyaltyDiscount(price) {
  const tier = getCurrentTier();
  if (!tier) return { discounted: price, saving: 0, pct: 0 };
  const saving = Math.round(price * tier.discount / 100);
  return { discounted: price - saving, saving, pct: tier.discount };
}

// updateNavLoyaltyBadge — see buildNav()

// ═══════════════════════════════════════════════════════════════
// USER AUTH
// ═══════════════════════════════════════════════════════════════
function saveUser(u){ try{localStorage.setItem('sb_user',JSON.stringify(u));}catch(e){} }
function getUser(){ try{return JSON.parse(localStorage.getItem('sb_user')||'null');}catch(e){return null;} }
function isLoggedIn(){ return !!getUser(); }
function logoutUser(){
  try{localStorage.removeItem('sb_user');}catch(e){}
  var inPages = window.location.pathname.indexOf('/pages/') !== -1;
  window.location.href = inPages ? '../index.html' : 'index.html';
}
function requireLogin(){
  if(!isLoggedIn()){
    var inPages = window.location.pathname.indexOf('/pages/') !== -1;
    var back = encodeURIComponent(window.location.href);
    window.location.href = (inPages ? '' : 'pages/') + 'login.html?redirect=' + back;
    throw new Error('redirect');
  }
}

// ═══════════════════════════════════════════════════════════════
// SMART NAV
// ═══════════════════════════════════════════════════════════════
function buildNav(activePage){
  var user = getUser();
  var inPages = window.location.pathname.indexOf('/pages/') !== -1;
  var root = inPages ? '../' : '';
  var nav = document.querySelector('.nav-links');
  var mob = document.getElementById('mobileMenu');
  if(!nav) return;

  if(user){
    var tier = getCurrentTier();
    var tierBadge = tier
      ? '<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:10px;font-size:0.68rem;font-weight:700;background:'+tier.colorLight+';color:'+tier.color+';border:1px solid '+tier.color+'40;"><span class=\"material-icons-round\" style=\"font-size:12px;\">'+tier.icon+'</span>'+tier.name+'</span>'
      : '';
    nav.innerHTML =
      '<a href="'+root+'index.html"'+(activePage==='home'?' class=\"active\"':'')+'>Home</a>'+
      '<a href="'+root+'pages/search.html"'+(activePage==='search'?' class=\"active\"':'')+'>Browse Hotels</a>'+
      '<a href="'+root+'pages/mybookings.html"'+(activePage==='bookings'?' class=\"active\"':'')+'>My Bookings</a>'+
      '<a href="'+root+'pages/loyalty.html"'+(activePage==='rewards'?' class=\"active\"':'')+'>My Rewards</a>'+
      '<button id=\"navPrefBtn\" onclick=\"buildPrefModal()\" style=\"display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:6px;border:1.5px solid rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,0.7);font-size:0.8rem;font-weight:600;cursor:pointer;font-family:inherit;\"><span class=\"material-icons-round\" style=\"font-size:15px;\">tune</span> Prefs</button>'+
      tierBadge+
      '<span style=\"font-size:0.82rem;color:rgba(255,255,255,0.55);\" >Hi, <strong style=\"color:#fff;\">'+user.name.split(' ')[0]+'</strong></span>'+
      '<button onclick=\"logoutUser()\" style=\"display:inline-flex;align-items:center;gap:5px;padding:7px 13px;border-radius:6px;border:1.5px solid rgba(255,80,80,0.4);background:rgba(255,60,60,0.08);color:rgba(255,170,170,0.9);font-size:0.78rem;font-weight:600;cursor:pointer;font-family:inherit;\"><span class=\"material-icons-round\" style=\"font-size:14px;\">logout</span>Sign Out</button>';
    if(mob) mob.innerHTML =
      '<a href="'+root+'index.html">Home</a>'+
      '<a href="'+root+'pages/search.html">Browse Hotels</a>'+
      '<a href="'+root+'pages/mybookings.html">My Bookings</a>'+
      '<a href="'+root+'pages/loyalty.html">My Rewards</a>'+
      '<a href=\"#\" onclick=\"buildPrefModal();return false;\">Preferences</a>'+
      '<a href=\"#\" onclick=\"logoutUser();return false;\" style=\"color:#f99;\">Sign Out</a>';
  } else {
    nav.innerHTML =
      '<a href="'+root+'index.html"'+(activePage==='home'?' class=\"active\"':'')+'>Home</a>'+
      '<a href="'+root+'pages/search.html"'+(activePage==='search'?' class=\"active\"':'')+'>Browse Hotels</a>'+
      '<a href="'+root+'index.html#destinations">Destinations</a>'+
      '<a href="'+root+'pages/login.html" class=\"nav-cta\" style=\"background:var(--gold);color:var(--navy);\"><span class=\"material-icons-round\" style=\"font-size:15px;vertical-align:middle;\">person</span> Sign In</a>';
    if(mob) mob.innerHTML =
      '<a href="'+root+'index.html">Home</a>'+
      '<a href="'+root+'pages/search.html">Browse Hotels</a>'+
      '<a href="'+root+'index.html#destinations">Destinations</a>'+
      '<a href="'+root+'pages/login.html">Sign In</a>';
  }
}

function updateNavPrefBtn(){}
function updateNavLoyaltyBadge(){}

// ═══════════════════════════════════════════════════════════════
// ADMIN AUTH
// ═══════════════════════════════════════════════════════════════
function isAdmin(){ try{return localStorage.getItem('sb_admin')==='1';}catch(e){return false;} }
function logoutAdmin(){ try{localStorage.removeItem('sb_admin');}catch(e){} window.location.href='../index.html'; }
