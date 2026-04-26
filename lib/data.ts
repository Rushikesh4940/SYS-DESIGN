export const COLORS = ['#8b78f5','#3dd9b3','#f2875a','#f5c842','#60c8f0','#f06090','#90d060','#c890f0'];

export interface CompItem {
  id: string; name: string; icon: string; color: string; desc: string;
  metrics: Record<string, string>;
}
export interface CompCategory { cat: string; items: CompItem[]; }

export const COMPONENTS: CompCategory[] = [
  { cat:'Clients', items:[
    { id:'client', name:'Client / Browser', icon:'🖥', color:'#8b78f5', desc:'End user browser or mobile app', metrics:{type:'Web/Mobile',protocol:'HTTP/WS'} },
    { id:'mobile', name:'Mobile App', icon:'📱', color:'#8b78f5', desc:'iOS / Android client', metrics:{type:'Mobile',protocol:'HTTP/REST'} },
    { id:'cdn', name:'CDN / Edge', icon:'🌐', color:'#90d060', desc:'Global content delivery network', metrics:{latency:'<10ms',nodes:'PoPs worldwide'} },
  ]},
  { cat:'Ingress', items:[
    { id:'dns', name:'DNS', icon:'◉', color:'#60c8f0', desc:'Domain name resolution', metrics:{type:'Route53/Cloudflare',ttl:'300s'} },
    { id:'lb', name:'Load Balancer', icon:'⇌', color:'#60c8f0', desc:'Distributes traffic across servers', metrics:{algo:'Round Robin',health:'30s checks'} },
    { id:'api-gw', name:'API Gateway', icon:'◈', color:'#60c8f0', desc:'Rate limiting, auth, routing', metrics:{rps:'100K/s',features:'Rate limit, Auth'} },
    { id:'reverse-proxy', name:'Reverse Proxy', icon:'⇒', color:'#60c8f0', desc:'Nginx / HAProxy layer', metrics:{type:'L7 HTTP',qps:'100K+'} },
  ]},
  { cat:'Services', items:[
    { id:'api', name:'API Server', icon:'⚙', color:'#3dd9b3', desc:'REST / GraphQL service instance', metrics:{instances:'3-10',lang:'Node/Go/Java'} },
    { id:'worker', name:'Worker', icon:'⬡', color:'#3dd9b3', desc:'Async background job processor', metrics:{type:'Consumer',concurrency:'10-100'} },
    { id:'websocket', name:'WebSocket Server', icon:'⟷', color:'#3dd9b3', desc:'Real-time bidirectional comms', metrics:{connections:'10K/node',protocol:'WS'} },
    { id:'grpc', name:'gRPC Service', icon:'⚡', color:'#3dd9b3', desc:'High-perf internal RPC service', metrics:{protocol:'HTTP/2 + Protobuf',latency:'<5ms'} },
    { id:'graphql', name:'GraphQL Server', icon:'△', color:'#3dd9b3', desc:'Flexible query language API', metrics:{type:'BFF/Gateway',batching:'DataLoader'} },
    { id:'search', name:'Search Service', icon:'🔍', color:'#3dd9b3', desc:'Full-text search indexing', metrics:{engine:'Elasticsearch',latency:'<50ms'} },
  ]},
  { cat:'Caches', items:[
    { id:'redis', name:'Redis', icon:'⚡', color:'#f5c842', desc:'In-memory cache & pub/sub', metrics:{latency:'~0.1ms',ops:'100K/s'} },
    { id:'memcached', name:'Memcached', icon:'⚡', color:'#f5c842', desc:'Distributed memory cache', metrics:{latency:'<1ms',type:'Pure cache'} },
    { id:'local-cache', name:'Local Cache', icon:'◼', color:'#f5c842', desc:'In-process L1 cache', metrics:{type:'In-process',size:'LRU bounded'} },
  ]},
  { cat:'Databases', items:[
    { id:'postgres', name:'PostgreSQL', icon:'⬡', color:'#f2875a', desc:'Relational DB with ACID transactions', metrics:{qps:'10K reads',replication:'Streaming'} },
    { id:'mysql', name:'MySQL', icon:'⬡', color:'#f2875a', desc:'Relational database', metrics:{qps:'10K reads',replication:'Binlog'} },
    { id:'mongo', name:'MongoDB', icon:'◆', color:'#f2875a', desc:'Document store, flexible schema', metrics:{qps:'30K reads',type:'Document'} },
    { id:'cassandra', name:'Cassandra', icon:'◆', color:'#f2875a', desc:'Wide-column, high write throughput', metrics:{writes:'50K/s',type:'AP system'} },
    { id:'dynamo', name:'DynamoDB', icon:'◆', color:'#f2875a', desc:'Fully managed KV + document', metrics:{latency:'<10ms',type:'Serverless'} },
    { id:'timeseries', name:'InfluxDB', icon:'📈', color:'#f2875a', desc:'Time-series metrics database', metrics:{type:'Time-series',retention:'configurable'} },
    { id:'neo4j', name:'Neo4j', icon:'◎', color:'#f2875a', desc:'Graph database for relationships', metrics:{type:'Graph',query:'Cypher'} },
    { id:'elasticsearch', name:'Elasticsearch', icon:'🔍', color:'#f2875a', desc:'Distributed search & analytics', metrics:{type:'Inverted index',latency:'<100ms'} },
  ]},
  { cat:'Messaging', items:[
    { id:'kafka', name:'Kafka', icon:'≡', color:'#f06090', desc:'Distributed event streaming log', metrics:{throughput:'1M+ msg/s',retention:'7 days'} },
    { id:'rabbitmq', name:'RabbitMQ', icon:'≡', color:'#f06090', desc:'Message broker with routing', metrics:{throughput:'50K msg/s',type:'AMQP'} },
    { id:'sqs', name:'AWS SQS', icon:'≡', color:'#f06090', desc:'Managed message queue', metrics:{type:'FIFO or Standard',latency:'~1ms'} },
    { id:'pubsub', name:'Pub/Sub', icon:'◉', color:'#f06090', desc:'Fan-out event distribution', metrics:{pattern:'1:N',type:'Topic-based'} },
  ]},
  { cat:'Storage', items:[
    { id:'s3', name:'Object Storage (S3)', icon:'🗄', color:'#c890f0', desc:'Binary blob / file storage', metrics:{durability:'11 nines',type:'Object store'} },
    { id:'block', name:'Block Storage (EBS)', icon:'◼', color:'#c890f0', desc:'Persistent disk volumes', metrics:{iops:'up to 64K',type:'Block device'} },
    { id:'hdfs', name:'HDFS / Data Lake', icon:'🗄', color:'#c890f0', desc:'Distributed file system', metrics:{type:'Batch/Analytics',format:'Parquet/ORC'} },
  ]},
  { cat:'Infrastructure', items:[
    { id:'firewall', name:'Firewall / WAF', icon:'🛡', color:'#ff6b6b', desc:'Web Application Firewall', metrics:{type:'L7 filtering',rules:'OWASP rules'} },
    { id:'container', name:'Container (K8s Pod)', icon:'□', color:'#8b78f5', desc:'Kubernetes workload unit', metrics:{type:'Docker/OCI',scale:'HPA'} },
    { id:'serverless', name:'Serverless Function', icon:'λ', color:'#8b78f5', desc:'Lambda / Cloud Functions', metrics:{coldstart:'~100ms',billing:'per-invocation'} },
    { id:'monitor', name:'Monitoring', icon:'📊', color:'#60c8f0', desc:'Metrics, logs, traces', metrics:{stack:'Prometheus+Grafana',tracing:'Jaeger'} },
  ]},
];

export function getComp(typeId: string): CompItem {
  for (const cat of COMPONENTS) {
    const c = cat.items.find(i => i.id === typeId);
    if (c) return c;
  }
  return { id: typeId, name: typeId, icon: '⬡', color: '#8b78f5', desc: '', metrics: {} };
}

export interface SystemNode { id: string; type: string; x: number; y: number; label: string; }
export interface SystemEdge { from: string; to: string; label: string; }

export interface PrebuiltSystem {
  id: string; name: string; color: string; icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[]; desc: string; problem: string;
  keyDecisions: string[]; bottlenecks: string[];
  nodes: SystemNode[]; edges: SystemEdge[];
}

export const PREBUILT_SYSTEMS: PrebuiltSystem[] = [
  {
    id:'url-shortener', name:'URL Shortener (bit.ly)', color:'#8b78f5', icon:'🔗',
    difficulty:'Beginner', tags:['Hashing','Redis','NoSQL','CDN'],
    desc:'Shortens long URLs to compact codes. 100:1 read/write ratio.',
    problem:'Long URLs are unwieldy for sharing. bit.ly creates short codes that redirect to originals — simple but requires careful design at billions of redirects/day.',
    keyDecisions:['base62 encoding of auto-increment counter (avoids hash collisions)','Redis caches hot URLs — 99% of traffic hits cache, not DB','301 (permanent, CDN-cacheable) vs 302 (temporary, analytics-trackable)','Custom aliases stored separately with uniqueness constraint'],
    bottlenecks:['Write DB for new URLs','Redis eviction of cold URLs','Analytics counting (use async Kafka pipeline)'],
    nodes:[
      {id:'n1',type:'client',x:60,y:200,label:'Client'},
      {id:'n2',type:'cdn',x:220,y:200,label:'CDN / Edge'},
      {id:'n3',type:'lb',x:390,y:200,label:'Load Balancer'},
      {id:'n4',type:'api',x:560,y:120,label:'API Server (Read)'},
      {id:'n5',type:'api',x:560,y:280,label:'API Server (Write)'},
      {id:'n6',type:'redis',x:730,y:120,label:'Redis Cache'},
      {id:'n7',type:'postgres',x:730,y:280,label:'PostgreSQL'},
      {id:'n8',type:'kafka',x:900,y:280,label:'Analytics Queue'},
      {id:'n9',type:'worker',x:900,y:400,label:'Analytics Worker'},
    ],
    edges:[
      {from:'n1',to:'n2',label:'GET /abc123'},{from:'n2',to:'n3',label:'cache miss'},{from:'n3',to:'n4',label:'GET request'},
      {from:'n3',to:'n5',label:'POST request'},{from:'n4',to:'n6',label:'cache lookup'},{from:'n6',to:'n7',label:'cache miss'},
      {from:'n5',to:'n7',label:'INSERT url'},{from:'n4',to:'n8',label:'click event'},{from:'n8',to:'n9',label:'consume'},
    ]
  },
  {
    id:'twitter-feed', name:'Twitter / Social Feed', color:'#60c8f0', icon:'🐦',
    difficulty:'Intermediate', tags:['Fan-out','Cassandra','Redis','Social Graph'],
    desc:'Social media feed for 300M users. The celebrity user (hotspot) problem.',
    problem:'A tweet from a celebrity with 50M followers must appear in all their feeds. Naive fan-out would queue 50M writes. Smart systems use hybrid approaches.',
    keyDecisions:['Fan-out on write for regular users: pre-populate timelines in Redis','Fan-out on read for celebrities: read their posts and merge on request','Cassandra for timelines: ordered by time_uuid, horizontal scale','Social graph in Redis sets or dedicated graph DB'],
    bottlenecks:['Celebrity posts: fan-out storm (hybrid model)','Redis timeline storage (memory bound)','Graph traversal at scale (cache follow lists)'],
    nodes:[
      {id:'n1',type:'mobile',x:50,y:220,label:'Mobile App'},
      {id:'n2',type:'api-gw',x:210,y:220,label:'API Gateway'},
      {id:'n3',type:'api',x:380,y:120,label:'Feed Service'},
      {id:'n4',type:'api',x:380,y:320,label:'Tweet Service'},
      {id:'n5',type:'redis',x:560,y:120,label:'Timeline Cache'},
      {id:'n6',type:'cassandra',x:560,y:220,label:'Cassandra Timeline'},
      {id:'n7',type:'kafka',x:560,y:380,label:'Tweet Events'},
      {id:'n8',type:'worker',x:740,y:300,label:'Fan-out Worker'},
      {id:'n9',type:'redis',x:740,y:140,label:'Social Graph'},
      {id:'n10',type:'cassandra',x:900,y:220,label:'Tweet Store'},
    ],
    edges:[
      {from:'n1',to:'n2',label:'GET /feed'},{from:'n2',to:'n3',label:'read timeline'},{from:'n3',to:'n5',label:'check cache'},
      {from:'n5',to:'n6',label:'cache miss'},{from:'n3',to:'n9',label:'follow graph'},
      {from:'n4',to:'n10',label:'persist tweet'},{from:'n4',to:'n7',label:'publish event'},
      {from:'n7',to:'n8',label:'consume'},{from:'n8',to:'n5',label:'fan-out'},
    ]
  },
  {
    id:'video-streaming', name:'YouTube / Netflix', color:'#f2875a', icon:'▶',
    difficulty:'Advanced', tags:['CDN','HLS/DASH','Transcoding','S3'],
    desc:'Video upload, transcoding pipeline, and adaptive bitrate streaming.',
    problem:'Users upload raw video. Billions watch it. Must transcode to multiple resolutions, serve adaptive bitrate, and handle peak load during viral events.',
    keyDecisions:['Chunked upload to S3 directly via presigned URLs','Async transcoding: Kafka triggers workers per resolution','HLS/DASH: segment video into 2-10s chunks for adaptive bitrate','CDN serves segments — 95%+ of bandwidth offloaded from origin'],
    bottlenecks:['Transcoding is CPU-intensive (GPU workers, spot instances)','CDN cache eviction for long-tail videos','Video upload bandwidth (multipart + resumable)'],
    nodes:[
      {id:'n1',type:'client',x:50,y:180,label:'Creator'},
      {id:'n2',type:'api',x:210,y:180,label:'Upload Service'},
      {id:'n3',type:'s3',x:380,y:100,label:'Raw Video (S3)'},
      {id:'n4',type:'kafka',x:380,y:260,label:'Transcode Queue'},
      {id:'n5',type:'worker',x:560,y:180,label:'Transcoder (GPU)'},
      {id:'n6',type:'s3',x:740,y:100,label:'Processed Video'},
      {id:'n7',type:'cdn',x:740,y:260,label:'CDN (Edge)'},
      {id:'n8',type:'client',x:900,y:180,label:'Viewer'},
      {id:'n9',type:'mongo',x:210,y:340,label:'Video Metadata'},
      {id:'n10',type:'redis',x:560,y:340,label:'View Counter'},
    ],
    edges:[
      {from:'n1',to:'n2',label:'upload video'},{from:'n2',to:'n3',label:'store raw'},
      {from:'n2',to:'n4',label:'trigger transcode'},{from:'n4',to:'n5',label:'transcode job'},
      {from:'n5',to:'n6',label:'store segments'},{from:'n6',to:'n7',label:'replicate to edge'},
      {from:'n8',to:'n7',label:'HLS request'},{from:'n2',to:'n9',label:'save metadata'},
      {from:'n8',to:'n10',label:'view event'},
    ]
  },
  {
    id:'ride-sharing', name:'Uber / Lyft', color:'#f5c842', icon:'🚗',
    difficulty:'Advanced', tags:['Geospatial','WebSocket','Real-time','Matching'],
    desc:'Real-time ride matching, location tracking, and dynamic pricing.',
    problem:'Match a rider to the nearest driver in <5 seconds, while tracking 1M+ moving drivers, computing ETAs, and applying surge pricing in real time.',
    keyDecisions:['Geospatial indexing: S2 cells or Geohash for fast nearby-driver queries','Driver location in Redis with GEOADD/GEORADIUS','WebSocket for real-time driver position updates and trip status','Matching: Hungarian algorithm or greedy within zone'],
    bottlenecks:['Location update storm from all active drivers','Surge pricing computation (stream processing)','Map routing (OSRM, Google Maps API)'],
    nodes:[
      {id:'n1',type:'mobile',x:50,y:120,label:'Rider App'},
      {id:'n2',type:'mobile',x:50,y:320,label:'Driver App'},
      {id:'n3',type:'api-gw',x:220,y:220,label:'API Gateway'},
      {id:'n4',type:'websocket',x:400,y:220,label:'Location Service'},
      {id:'n5',type:'redis',x:580,y:140,label:'Driver Geo Index'},
      {id:'n6',type:'api',x:580,y:300,label:'Matching Service'},
      {id:'n7',type:'api',x:760,y:220,label:'Trip Service'},
      {id:'n8',type:'kafka',x:760,y:360,label:'Location Events'},
      {id:'n9',type:'postgres',x:940,y:220,label:'Trips DB'},
      {id:'n10',type:'redis',x:940,y:360,label:'Surge Pricing'},
    ],
    edges:[
      {from:'n1',to:'n3',label:'request ride'},{from:'n2',to:'n4',label:'location WS'},
      {from:'n4',to:'n5',label:'GEOADD'},{from:'n3',to:'n6',label:'find drivers'},
      {from:'n6',to:'n5',label:'GEORADIUS'},{from:'n6',to:'n7',label:'create trip'},
      {from:'n4',to:'n8',label:'emit events'},{from:'n7',to:'n9',label:'persist trip'},
      {from:'n8',to:'n10',label:'compute surge'},
    ]
  },
  {
    id:'notification-system', name:'Notification System', color:'#3dd9b3', icon:'🔔',
    difficulty:'Beginner', tags:['Message Queue','Fan-out','Multi-channel'],
    desc:'Send 1M push/email/SMS notifications per day with delivery guarantees.',
    problem:'Multiple event types must trigger notifications across channels (push, email, SMS) with delivery guarantees, deduplication, and user preferences.',
    keyDecisions:['Fan-out via Kafka: one event → N channel workers in parallel','Per-channel retry with exponential backoff (dead-letter queues)','Deduplication: idempotency key per notification per user','Preference cache per user with TTL 5 min'],
    bottlenecks:['Third-party rate limits (APNs, FCM, Twilio, SendGrid)','Preference lookups (cache per user)','Delivery tracking storage (Cassandra for write-heavy)'],
    nodes:[
      {id:'n1',type:'api',x:60,y:200,label:'Event Producers'},
      {id:'n2',type:'kafka',x:230,y:200,label:'Notification Events'},
      {id:'n3',type:'api',x:400,y:200,label:'Notification Service'},
      {id:'n4',type:'redis',x:400,y:360,label:'User Preferences'},
      {id:'n5',type:'kafka',x:580,y:100,label:'Push Queue'},
      {id:'n6',type:'kafka',x:580,y:200,label:'Email Queue'},
      {id:'n7',type:'kafka',x:580,y:300,label:'SMS Queue'},
      {id:'n8',type:'worker',x:760,y:100,label:'Push Worker'},
      {id:'n9',type:'worker',x:760,y:200,label:'Email Worker'},
      {id:'n10',type:'worker',x:760,y:300,label:'SMS Worker'},
      {id:'n11',type:'cassandra',x:940,y:200,label:'Delivery Log'},
    ],
    edges:[
      {from:'n1',to:'n2',label:'publish event'},{from:'n2',to:'n3',label:'consume'},
      {from:'n3',to:'n4',label:'check prefs'},{from:'n3',to:'n5',label:'push'},
      {from:'n3',to:'n6',label:'email'},{from:'n3',to:'n7',label:'SMS'},
      {from:'n5',to:'n8',label:'consume'},{from:'n6',to:'n9',label:'consume'},
      {from:'n7',to:'n10',label:'consume'},{from:'n8',to:'n11',label:'log'},
      {from:'n9',to:'n11',label:'log'},{from:'n10',to:'n11',label:'log'},
    ]
  },
  {
    id:'google-drive', name:'Google Drive / Dropbox', color:'#c890f0', icon:'📁',
    difficulty:'Intermediate', tags:['S3/Blob','Chunking','Sync','Dedup'],
    desc:'File storage, sync across devices, and conflict resolution.',
    problem:'Users upload files from multiple devices and expect reliable sync. Large files must upload efficiently. Simultaneous edits create conflicts.',
    keyDecisions:['Chunk files into 4MB blocks — only upload changed chunks (delta sync)','Block deduplication: hash each chunk, only store unique blocks in S3','Metadata DB (SQL) separate from blob storage (S3)','Operational Transform or last-write-wins for conflict resolution'],
    bottlenecks:['Large file uploads (presigned S3 multipart, resumable)','Real-time sync (polling vs WebSocket push)','Metadata DB write hotspots (user-sharded)'],
    nodes:[
      {id:'n1',type:'client',x:50,y:200,label:'Desktop Client'},
      {id:'n2',type:'api',x:220,y:120,label:'Upload Service'},
      {id:'n3',type:'api',x:220,y:280,label:'Sync Service'},
      {id:'n4',type:'redis',x:400,y:120,label:'Upload Cache'},
      {id:'n5',type:'s3',x:400,y:280,label:'Block Storage (S3)'},
      {id:'n6',type:'postgres',x:580,y:200,label:'Metadata DB'},
      {id:'n7',type:'kafka',x:580,y:360,label:'Sync Events'},
      {id:'n8',type:'worker',x:760,y:280,label:'Thumbnail Worker'},
      {id:'n9',type:'cdn',x:760,y:140,label:'CDN (file serving)'},
      {id:'n10',type:'mobile',x:940,y:200,label:'Mobile Client'},
    ],
    edges:[
      {from:'n1',to:'n2',label:'upload chunks'},{from:'n2',to:'n4',label:'track progress'},
      {from:'n2',to:'n5',label:'store blocks'},{from:'n2',to:'n6',label:'update metadata'},
      {from:'n6',to:'n7',label:'file changed'},{from:'n7',to:'n8',label:'generate thumbnail'},
      {from:'n5',to:'n9',label:'replicate'},{from:'n10',to:'n3',label:'sync request'},
      {from:'n9',to:'n10',label:'serve file'},
    ]
  },
];

export const LEARN_TOPICS = [
  {
    title:'Why System Design Matters', color:'#8b78f5',
    content:`System design is not about memorizing patterns — it's about reasoning under uncertainty. Every production system is a series of trade-offs: consistency vs availability, latency vs throughput, simplicity vs scalability.\n\nThe goal is to build systems that fail gracefully, scale economically, and evolve without rewriting. A good system design interview shows you can navigate ambiguity and reason about constraints.`,
    code:`// The fundamental trade-off:
// You can't have all of these simultaneously:
// - Strong consistency (every read reflects latest write)
// - High availability (always responds)
// - Low latency (responds fast)
// - Cheap to operate
// Something always gives.`
  },
  {
    title:'How to Pick a Database', color:'#f2875a',
    content:`The most impactful decision in system design. Wrong choice = rewrite. Right choice = years of stability.\n\nAsk three questions: What is my data model? What are my query patterns? What scale do I need?\n\nRelational (PostgreSQL): your data has relationships, you need ACID transactions, your team knows SQL.\n\nDocument (MongoDB): flexible schemas, nested data, no complex JOINs required.\n\nWide-column (Cassandra): write-heavy, time-series, needs horizontal scale from day one.`,
    code:`// Decision flowchart:
// Need ACID + JOINs?        → PostgreSQL
// Write-heavy + horizontal? → Cassandra
// Flexible schema + search? → MongoDB
// Pure caching/sessions?    → Redis
// Graph relationships?      → Neo4j
// Full-text search?         → Elasticsearch
// Files/blobs?              → S3`
  },
  {
    title:'Caching Strategy', color:'#f5c842',
    content:`The fastest query is the one you never make. A well-tuned cache can absorb 99% of read traffic.\n\nCache-aside is the default: app checks cache, misses go to DB, result gets cached. Simple. Works well for read-heavy workloads.\n\nThe hard problems: cache invalidation, cache stampede (100 threads hitting DB simultaneously on cold start), and cache penetration (querying for nonexistent keys).`,
    code:`// Cache stampede prevention:
// Option 1: Mutex lock on cache miss
// Option 2: Probabilistic early expiration
//   if (remaining_ttl < threshold * random())
//     refresh in background
// Option 3: Stale-while-revalidate
//
// Target cache hit rate: > 90%
// Redis latency: ~0.1ms vs DB: ~5ms`
  },
  {
    title:'Designing for Failure', color:'#f06090',
    content:`"Everything fails, all the time." — Werner Vogels, CTO Amazon\n\nDesign assumption: your dependencies will fail. Disks corrupt. Networks partition. Servers crash. Third-party APIs return 500.\n\nKey patterns: Circuit breakers stop retrying failing services. Bulkheads isolate failures. Retries with exponential backoff + jitter prevent stampedes. Health checks route away from unhealthy nodes.`,
    code:`// Retry with exponential backoff + jitter:
// attempt 0: wait 0ms
// attempt 1: wait 100ms + random(0-100ms)
// attempt 2: wait 200ms + random(0-200ms)
// attempt 3: wait 400ms + random(0-400ms)
// attempt 4: wait 800ms + ...
// max attempts: 5 (then circuit breaker opens)
//
// Jitter prevents thundering herd on recovery`
  },
  {
    title:'Scaling Writes vs Reads', color:'#90d060',
    content:`Most web apps have 10:1 to 100:1 read/write ratios. This asymmetry drives architecture decisions.\n\nScale reads: Read replicas + cache + CDN + denormalization.\n\nScale writes: Sharding (split data by key), write-ahead buffers (batch small writes), async processing (accept write, queue it, process later).\n\nNever shard prematurely — read replicas + cache handle 100x traffic before you need sharding.`,
    code:`// Write scaling approach (in order):
// 1. Single primary → read replicas
// 2. Add Redis cache (90%+ reads eliminated)
// 3. Shard by user_id (writes scale)
// 4. Move to Cassandra (native horizontal)
//
// Each step handles roughly 10x more load.
// Steps 1+2 often handle millions of users.`
  },
  {
    title:'CAP Theorem in Practice', color:'#3dd9b3',
    content:`In any distributed system, network partitions (P) are inevitable. The question is: when a partition happens, do you preserve Consistency or Availability?\n\nCP systems (HBase, Zookeeper): refuse to serve stale data, return errors during partitions. Use for financial ledgers, config stores.\n\nAP systems (Cassandra, DynamoDB): stay up, serve best-effort data. Use for social feeds, carts, counters.`,
    code:`// Real classifications:
// MySQL single node → CA (not partition tolerant)
// Cassandra         → AP (eventual consistency)
// HBase / ZooKeeper → CP (strong consistency)
// DynamoDB          → AP by default
// CockroachDB       → CP (distributed SQL)
//
// PACELC extends CAP: even without partitions
// there's Latency vs Consistency trade-off`
  },
];
