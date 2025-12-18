/**
 * 
  Clear existing Topics & Articles
  Insert fresh demo Topics
  Insert realistic demo Articles
  Maintain relations using ObjectId refs
  Useful for development, testing & UI demo
 */

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Topic = require("../models/Topic");
const Article = require("../models/Article");

const run = async () => {
  try {
    // 1: CONNECT TO DATABASE (THIS WAS MISSING)
    await connectDB();
    await mongoose.connection.asPromise(); // ensure connection is ready

    /**
     *  2: CLEAR OLD DATA
     */
    console.log("🧹 Clearing old data...");
    await Topic.deleteMany({});
    await Article.deleteMany({});

    /**
     *  3: CREATE TOPICS
     */
    console.log(" Creating topics...");
    const topics = await Topic.insertMany([
      {
        name: "Technology",
        slug: "technology",
        description: "Latest in software, AI, gadgets, and innovation.",
      },
      {
        name: "Sports",
        slug: "sports",
        description: "Scores, tournaments, athlete stories, and analysis.",
      },
      {
        name: "Finance",
        slug: "finance",
        description: "Markets, investing, economy, and business news.",
      },
      {
        name: "Health",
        slug: "health",
        description: "Wellness, science, medicine, and breakthroughs.",
      },
    ]);

    /**
     *  4: CREATE TOPIC MAP
     */
    const topicMap = {};
    topics.forEach((topic) => {
      topicMap[topic.name.toLowerCase()] = topic._id;
    });

    const getTopicId = (name) => topicMap[name.toLowerCase()];

    /**
     *  5: PUBLISHED DATE LOGIC
     */
    let publishedDate = Date.now();
    const ONE_HOUR = 60 * 60 * 1000;

        /**
     *  5: Raw data
     */


        const rawArticles = [
            // TECHNOLOGY (5)
            {
              title: "AI Breakthrough: New Model Shows Near-Human Reasoning",
              summary:
                "Researchers develop an AI system capable of advanced logical thinking.",
              content:
                "Researchers have developed a new AI model capable of near-human reasoning.\n\
          The system demonstrates structured logical thinking instead of simple pattern matching.\n\
          It can break complex problems into multiple reasoning steps.\n\
          The model performs well in mathematics, language, and decision-making tasks.\n\
          Researchers used improved training techniques and richer datasets.\n\
          The AI evaluates consequences before generating responses.\n\
          Experts believe this could transform professional workflows.\n\
          Potential applications include healthcare, law, and research.\n\
          Ethical and safety considerations remain a priority.\n\
          The model is currently under controlled testing.\n\
          Industry leaders view this as a major milestone.\n\
          True general intelligence is still distant.\n\
          Responsible development is strongly emphasized.\n\
          Governments are monitoring rapid AI progress.\n\
          Human-AI collaboration may improve significantly.",
              topicName: "Technology",
              sourceName: "AI Frontier",
              imageUrl:
                "https://miro.medium.com/v2/resize:fit:1200/1*-4cq5-L8yAKuRhZTOWBYog.jpeg",
              tags: ["AI", "LLM", "Research"],
            },
          
            {
              title: "Quantum Computing Moves Closer to Commercial Reality",
              summary:
                "Cloud companies begin offering quantum services to enterprises.",
              content:
                "Quantum computing is moving closer to real-world adoption.\n\
          Cloud providers now offer limited quantum access to businesses.\n\
          Companies can experiment without owning costly hardware.\n\
          Quantum systems solve specific problems faster than classical computers.\n\
          Pharmaceutical and financial sectors lead adoption.\n\
          Researchers use quantum simulations for complex molecules.\n\
          Error rates remain a major challenge.\n\
          Hybrid quantum-classical models show promise.\n\
          Governments continue investing in research.\n\
          Security implications are under review.\n\
          Post-quantum cryptography is gaining importance.\n\
          Commercial pilots show encouraging results.\n\
          Experts predict gradual adoption.\n\
          Costs are expected to decrease over time.\n\
          Quantum computing’s future impact looks significant.",
              topicName: "Technology",
              sourceName: "Physics Today",
              imageUrl:
                "https://imageio.forbes.com/specials-images/imageserve/5e1c9a33a854780006e868cc/image-of-IBM-s-Quantum-Computer/960x0.jpg?fit=bounds&format=jpg&width=960",
              tags: ["Quantum", "Cloud"],
            },
          
            {
              title: "Cybersecurity Warning: Massive Zero-Day Attack Discovered",
              summary:
                "Millions of users are at risk due to a newly discovered vulnerability.",
              content:
                "Security experts have uncovered a dangerous zero-day vulnerability.\n\
          The flaw allows attackers to exploit systems before detection.\n\
          Millions of users could be affected globally.\n\
          The attack targets widely used software platforms.\n\
          Experts urge immediate updates and patches.\n\
          Organizations are advised to monitor networks closely.\n\
          Zero-day exploits are difficult to prevent.\n\
          Hackers often sell such vulnerabilities illegally.\n\
          Sensitive data may be compromised.\n\
          Multi-factor authentication is recommended.\n\
          Cyber hygiene reduces long-term risks.\n\
          Governments are coordinating responses.\n\
          Incident response teams remain active.\n\
          User awareness is crucial.\n\
          Cybersecurity remains a global priority.",
              topicName: "Technology",
              sourceName: "Security Daily",
              imageUrl:
                "https://lirp.cdn-website.com/35fcf6c5/dms3rep/multi/opt/zero+day+attack-640w.jpg",
              tags: ["Cybersecurity", "Hacking"],
            },
          
            {
              title: "The Race for Metaverse Dominance Intensifies",
              summary:
                "Tech giants compete to build the future of immersive digital worlds.",
              content:
                "Major tech companies are investing heavily in the metaverse.\n\
          Virtual and augmented reality drive immersive experiences.\n\
          Gaming remains a major entry point.\n\
          Virtual workplaces are gaining attention.\n\
          Social interaction is evolving digitally.\n\
          Hardware improvements increase accessibility.\n\
          Interoperability remains a challenge.\n\
          User privacy concerns continue.\n\
          Brands test virtual commerce models.\n\
          Education and training show potential.\n\
          Content moderation is complex.\n\
          Adoption depends on user value.\n\
          Infrastructure costs remain high.\n\
          Competition fuels rapid innovation.\n\
          The metaverse race is ongoing.",
              topicName: "Technology",
              sourceName: "The Verge",
              imageUrl:
                "https://wp.technologyreview.com/wp-content/uploads/2022/06/Infosys-metaverse-image.png",
              tags: ["Metaverse", "VR", "AR"],
            },
          
            {
              title: "5G Expansion Accelerates Smart City Development",
              summary:
                "Cities adopt 5G infrastructure to improve connectivity and services.",
              content:
                "5G networks are reshaping modern cities.\n\
          Low latency improves real-time communication.\n\
          Smart traffic systems reduce congestion.\n\
          Public transport benefits from live data.\n\
          IoT devices operate more efficiently.\n\
          Energy management becomes smarter.\n\
          Emergency response improves significantly.\n\
          Autonomous vehicles rely on 5G.\n\
          Urban planning becomes data-driven.\n\
          Infrastructure costs pose challenges.\n\
          Cybersecurity remains essential.\n\
          Public-private partnerships support rollout.\n\
          Healthcare services benefit remotely.\n\
          Digital inclusion improves gradually.\n\
          5G forms the backbone of smart cities.",
              topicName: "Technology",
              sourceName: "Tech Radar",
              imageUrl:
                "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
              tags: ["5G", "Smart Cities"],
            },
          
            // FINANCE (5)
            {
              title: "Global Markets Rally as Tech Stocks Surge",
              summary: "Investors show optimism following strong earnings reports.",
              content:
                "Global markets rallied following strong tech earnings.\n\
          Investor confidence improved significantly.\n\
          Major indices posted gains worldwide.\n\
          Technology stocks led the rally.\n\
          AI-driven growth boosted optimism.\n\
          Lower inflation expectations supported markets.\n\
          Interest rate fears eased slightly.\n\
          Retail investors returned actively.\n\
          Institutional buying increased.\n\
          Volatility remained moderate.\n\
          Analysts advise cautious optimism.\n\
          Geopolitical risks persist.\n\
          Bond yields fluctuated mildly.\n\
          Currencies remained stable.\n\
          Markets remain data-sensitive.",
              topicName: "Finance",
              sourceName: "Market Insight",
              imageUrl:
                "https://img.etimg.com/thumb/width-1200,height-1200,imgsize-151740,resizemode-75,msid-123280446/news/international/us/us-stock-market-futures-surge.jpg",
              tags: ["Stocks", "Markets"],
            },
          
            {
              title: "Cryptocurrency Regulations Tighten Across Asia",
              summary: "Governments introduce stricter crypto policies.",
              content:
                "Asian governments are tightening crypto regulations.\n\
          Authorities aim to protect investors.\n\
          Licensing rules are expanding.\n\
          Reporting requirements increase transparency.\n\
          Money laundering concerns drive changes.\n\
          Retail trading limits are introduced.\n\
          Market volatility followed announcements.\n\
          Institutions welcome regulatory clarity.\n\
          Blockchain innovation continues.\n\
          CBDCs gain attention.\n\
          Compliance costs may rise.\n\
          Cross-border coordination improves.\n\
          Investor education expands.\n\
          Asia remains a major crypto hub.\n\
          Regulation shapes the future.",
              topicName: "Finance",
              sourceName: "The Economist",
              imageUrl:
                "https://ik.imagekit.io/edtechdigit/uscsi/Content/images/articles/a-brief-guide-on-cryptography-technology-for-cybersecurity.jpg",
              tags: ["Crypto", "Regulation"],
            },
          
            {
              title: "Housing Market Shows Signs of Cooling",
              summary: "Property prices stabilize after years of rapid growth.",
              content:
                "The housing market is stabilizing.\n\
          Price growth has slowed.\n\
          Interest rates affect affordability.\n\
          Buyers are more cautious.\n\
          Sellers adjust expectations.\n\
          Urban markets show corrections.\n\
          Suburban demand remains steady.\n\
          Rental markets stay strong.\n\
          Construction activity slows.\n\
          Affordable housing gains focus.\n\
          Government policies influence trends.\n\
          Mortgage approvals decline slightly.\n\
          Speculation reduces significantly.\n\
          Long-term demand remains.\n\
          Housing stays a key asset.",
              topicName: "Finance",
              sourceName: "Property Insights",
              imageUrl:
                "https://static.standard.co.uk/2021/02/01/18/DSC_6009.JPG?crop=8:5,smart&quality=75&auto=webp&width=1000",
              tags: ["Real Estate", "Housing"],
            },
          
            {
              title: "Oil Prices Stabilize Amid Global Uncertainty",
              summary: "Energy markets remain steady despite geopolitical tensions.",
              content:
                "Oil prices remain relatively stable.\n\
          Geopolitical tensions influence supply.\n\
          OPEC decisions guide pricing.\n\
          Demand recovery is uneven.\n\
          Economic data drives sentiment.\n\
          Renewables gain momentum.\n\
          Supply disruptions remain possible.\n\
          Strategic reserves offer support.\n\
          Traders act cautiously.\n\
          Inflation impacts consumption.\n\
          Energy security is prioritized.\n\
          EV adoption affects demand.\n\
          Emerging markets drive growth.\n\
          Stability aids planning.\n\
          Uncertainty persists.",
              topicName: "Finance",
              sourceName: "Energy Bulletin",
              imageUrl:
                "https://etimg.etb2bimg.com/photo/103383421.cms",
              tags: ["Oil", "Energy"],
            },
          
            {
              title: "Startups Attract Record Venture Capital Funding",
              summary: "Investors pour money into early-stage innovation.",
              content:
                "Startup funding has reached record levels.\n\
          Investors focus on innovation.\n\
          AI and fintech dominate funding rounds.\n\
          Early-stage startups attract strong interest.\n\
          Global capital flows increase.\n\
          Risk appetite remains healthy.\n\
          Valuations rise selectively.\n\
          Investors seek scalable models.\n\
          Economic uncertainty influences deals.\n\
          Government support boosts ecosystems.\n\
          Talent availability improves growth.\n\
          Competition for funding increases.\n\
          Sustainable models gain preference.\n\
          Long-term innovation remains strong.\n\
          Venture capital stays active.",
              topicName: "Finance",
              sourceName: "VC Times",
              imageUrl:
                "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
              tags: ["Startups", "Funding"],
            },
          
            // SPORTS (5)
            {
              title: "Veteran Athlete Wins Marathon Against All Odds",
              summary: "A stunning comeback victory shocks fans worldwide.",
              content:
                "A veteran athlete achieved a remarkable marathon victory.\n\
          The comeback inspired fans globally.\n\
          Years of training led to success.\n\
          Injuries once threatened the career.\n\
          Discipline played a key role.\n\
          Mental strength proved decisive.\n\
          The athlete paced strategically.\n\
          Weather conditions were challenging.\n\
          Crowd support boosted morale.\n\
          The win redefined expectations.\n\
          Experience outweighed youth.\n\
          The performance earned respect.\n\
          Recovery methods were crucial.\n\
          The victory became historic.\n\
          Sportsmanship was widely praised.",
              topicName: "Sports",
              sourceName: "Athletics Today",
              imageUrl:
                "https://media.aws.iaaf.org/media/Original/fb554f46-839f-4bf5-85f4-b263d68abd42.jpg",
              tags: ["Marathon", "Athletics"],
            },
          
            {
              title: "Football VAR Decisions Spark Major Controversy",
              summary: "Fans demand transparency in refereeing decisions.",
              content:
                "VAR decisions sparked heated debate.\n\
          Fans questioned officiating accuracy.\n\
          Several matches were affected.\n\
          Referees faced increased scrutiny.\n\
          Clubs demanded transparency.\n\
          Inconsistent rulings frustrated supporters.\n\
          Technology limitations were highlighted.\n\
          Officials defended decisions.\n\
          Calls for improved guidelines emerged.\n\
          League reviews are underway.\n\
          Coaches voiced concerns publicly.\n\
          Players expressed confusion.\n\
          Fans demanded accountability.\n\
          Trust in officiating was tested.\n\
          VAR reforms are being considered.",
              topicName: "Sports",
              sourceName: "Football Weekly",
              imageUrl:
                "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/tuzol0ixs0vuqphinm8l",
              tags: ["Football", "VAR"],
            },
          
            {
              title: "E-Sports Tournament Sets New Viewership Record",
              summary: "Millions tune in to watch the global finals.",
              content:
                "E-sports viewership reached record levels.\n\
          Millions watched the global finals.\n\
          Streaming platforms saw huge traffic.\n\
          Competitive gaming continues growing.\n\
          Younger audiences drive popularity.\n\
          Sponsorship revenue increased.\n\
          Prize pools reached new highs.\n\
          Professional teams gained recognition.\n\
          Broadcast quality improved.\n\
          Global participation expanded.\n\
          Mobile gaming gained attention.\n\
          Regional leagues strengthened.\n\
          Mainstream acceptance increased.\n\
          Career opportunities expanded.\n\
          E-sports entered a new era.",
              topicName: "Sports",
              sourceName: "Game Stats",
              imageUrl:
                "https://i.pcmag.com/imagery/lineups/06dxdkd5h3MmSKAaMczRpbQ-1.fit_lim.size_768x432.v1569492889.jpg",
              tags: ["Esports", "Gaming"],
            },
          
            {
              title: "Young Tennis Star Wins First Grand Slam",
              summary: "A new champion emerges on the world stage.",
              content:
                "A young tennis star captured a first Grand Slam.\n\
          The victory marked a breakthrough moment.\n\
          Skill and composure stood out.\n\
          The final drew global attention.\n\
          The champion defeated top-ranked opponents.\n\
          Mental toughness proved decisive.\n\
          Coaches praised dedication.\n\
          Fans celebrated a new era.\n\
          The win signaled generational change.\n\
          Training methods paid off.\n\
          Media coverage surged worldwide.\n\
          Sponsorship interest increased.\n\
          The future looks promising.\n\
          Tennis gains fresh excitement.\n\
          A star was born.",
              topicName: "Sports",
              sourceName: "Tennis World",
              imageUrl:
                "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
              tags: ["Tennis", "Grand Slam"],
            },
          
            {
              title: "Cricket League Final Breaks Attendance Records",
              summary: "Fans flood stadiums for historic final match.",
              content:
                "The cricket league final drew record crowds.\n\
          Stadiums were filled to capacity.\n\
          Fans traveled from across regions.\n\
          The atmosphere was electric.\n\
          The match delivered intense competition.\n\
          Broadcast ratings also peaked.\n\
          Players delivered standout performances.\n\
          League popularity continues growing.\n\
          Youth engagement increased.\n\
          Merchandise sales surged.\n\
          Sponsors saw strong returns.\n\
          Security arrangements were tight.\n\
          The final created lasting memories.\n\
          Cricket’s global reach expanded.\n\
          The league set new benchmarks.",
              topicName: "Sports",
              sourceName: "Cricket Today",
              imageUrl:
                "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d",
              tags: ["Cricket", "League"],
            },
          
            // HEALTH (5)
            {
              title: "Gut Microbiome Strongly Linked to Mental Health",
              summary: "Study reveals powerful gut-brain connection.",
              content:
                "New research highlights the gut-brain connection.\n\
          Microbiome balance affects mental health.\n\
          Gut bacteria influence neurotransmitters.\n\
          Diet plays a key role.\n\
          Processed foods may disrupt balance.\n\
          Probiotics show positive effects.\n\
          Stress impacts gut health.\n\
          Mental disorders show microbiome links.\n\
          Lifestyle changes improve outcomes.\n\
          Personalized nutrition gains interest.\n\
          Research continues expanding.\n\
          Clinical trials show promise.\n\
          Doctors stress holistic treatment.\n\
          Prevention becomes a focus.\n\
          Gut health gains recognition.",
              topicName: "Health",
              sourceName: "Medical Journal",
              imageUrl: "https://assets.newatlas.com/dims4/default/44433a7/2147483647/strip/true/crop/1620x1080+90+0/resize/1200x800!/format/webp/quality/90/?url=https%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fgut-microbiome-depression-1.jpg",
              tags: ["Mental Health", "Science"],
            },
          
            {
              title: "Intermittent Fasting: Benefits and Risks Explained",
              summary: "Experts weigh in on popular diet trend.",
              content:
                "Intermittent fasting remains widely popular.\n\
          Experts explain potential benefits.\n\
          Weight management improves for some.\n\
          Metabolic health may benefit.\n\
          Not suitable for everyone.\n\
          Medical guidance is recommended.\n\
          Consistency is important.\n\
          Balanced nutrition remains key.\n\
          Risks include nutrient deficiency.\n\
          Energy levels may fluctuate.\n\
          Lifestyle compatibility matters.\n\
          Hydration is essential.\n\
          Long-term effects vary.\n\
          Personalization improves success.\n\
          Moderation is advised.",
              topicName: "Health",
              sourceName: "Wellness Expert",
              imageUrl:
                "https://aarp.widen.net/content/cateec9uj5/web/79349_IntermittentFasting.gif?animate=true&u=7wu7cw",
              tags: ["Nutrition", "Diet"],
            },
          
            {
              title: "mRNA Technology Expands Beyond Vaccines",
              summary: "New therapies emerge using mRNA science.",
              content:
                "mRNA technology is advancing rapidly.\n\
          Its success in vaccines sparked expansion.\n\
          Cancer therapies show promise.\n\
          Autoimmune treatments are developing.\n\
          Personalized medicine becomes possible.\n\
          Faster drug development is achievable.\n\
          Clinical trials show positive results.\n\
          Manufacturing processes improve.\n\
          Safety monitoring remains critical.\n\
          Costs may decrease over time.\n\
          Global research investment increases.\n\
          Regulatory pathways evolve.\n\
          Biotech innovation accelerates.\n\
          New treatments reach patients.\n\
          mRNA reshapes medicine.",
              topicName: "Health",
              sourceName: "BioTech Review",
              imageUrl: "https://static.cepi.net/images/3840x2160/2025-04/vaccine-technology-mrna-CEPI_1440x810_0.webp",
              tags: ["Biotech", "Medicine"],
            },
          
            {
              title: "Wearable Tech Transforms Preventive Healthcare",
              summary: "Smart devices detect health risks early.",
              content:
                "Wearable technology is changing healthcare.\n\
          Devices monitor vital signs continuously.\n\
          Early detection improves outcomes.\n\
          Patients gain health awareness.\n\
          Doctors receive real-time data.\n\
          Remote monitoring expands care.\n\
          Chronic disease management improves.\n\
          Fitness tracking encourages activity.\n\
          Data accuracy continues improving.\n\
          Privacy concerns are addressed.\n\
          AI enhances health insights.\n\
          Healthcare costs may reduce.\n\
          Adoption increases globally.\n\
          Preventive care gains focus.\n\
          Wearables reshape medicine.",
              topicName: "Health",
              sourceName: "Health Tech",
              imageUrl:
                "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8",
              tags: ["Wearables", "Health Tech"],
            },
          
            {
              title: "Sleep Science: Why Quality Rest Matters More Than Ever",
              summary: "Sleep deprivation linked to chronic illness.",
              content:
                "Sleep quality is essential for health.\n\
          Chronic sleep loss affects immunity.\n\
          Mental health suffers without rest.\n\
          Productivity declines significantly.\n\
          Consistent routines improve sleep.\n\
          Technology disrupts sleep cycles.\n\
          Experts recommend limiting screen time.\n\
          Sleep impacts heart health.\n\
          Hormonal balance depends on rest.\n\
          Lifestyle changes improve sleep.\n\
          Work stress reduces quality.\n\
          Sleep disorders are increasing.\n\
          Medical treatment helps severe cases.\n\
          Public awareness is rising.\n\
          Quality sleep supports longevity.",
              topicName: "Health",
              sourceName: "Sleep Foundation",
              imageUrl:
                "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
              tags: ["Sleep", "Wellness"],
            },
          ];


    /**
     *  6: TRANSFORM RAW DATA
     */
    const articlesData = rawArticles.map((article) => ({
      title: article.title,
      summary: article.summary,
      content: article.content,
      imageUrl: article.imageUrl,
      sourceName: article.sourceName,
      topic: getTopicId(article.topicName),
      tags: article.tags || [],
      publishedAt: new Date((publishedDate -= ONE_HOUR)),
      readingTimeMinutes: Math.floor(Math.random() * 8) + 3,
    }));

    /**
     *  8: INSERT ARTICLES
     */
    await Article.insertMany(articlesData);

    console.log(` SEED COMPLETE! Inserted ${articlesData.length} articles.`);
    process.exit(0);
  } catch (error) {
    console.error(" Seeding failed:", error);
    process.exit(1);
  }
};

run();
