import { ProjectPin, CheerMessage } from '../types';

export const INITIAL_PROJECTS: ProjectPin[] = [
  {
    id: 'promptsprout',
    title: 'PromptSprout',
    pitch: 'Generate production-ready Tailwind landing pages from single napkin sketches. Uses vision models coupled with a strict accessibility AST checker.',
    category: 'AI & Micro-SaaS',
    categoryLabel: 'AI & DEV TOOLS',
    website: 'promptsprout.dev',
    repoUrl: 'https://github.com/promptsprout/core',
    statusText: 'v1.4 LIVE',
    versionBadge: '★ FIRST TIP RECEIVED',
    pushpinColor: 'primary',
    gridSpan: 'hero',
    views: 342,
    supporters: 14,
    tipTotal: 125,
    updatedAgo: '2h ago',
    stacks: ['Tailwind CSS', 'TypeScript', 'Vision AI', 'Vite'],
    tags: ['AI', 'Micro-SaaS', 'Dev Tools', 'Design Systems'],
    author: {
      name: 'Kai Vance',
      handle: '@kaivance_dev',
    },
    details: {
      fullDescription: 'PromptSprout was built to bridge the gap between rough ideation on coffee shop napkins and clean HTML/Tailwind production code. Unlike generic AI code generators that output bloated inline styles, PromptSprout enforces semantic HTML5, passes WCAG AA accessibility tests via an Abstract Syntax Tree (AST) validation pass, and compiles strictly to standardized utility classes.',
      features: [
        'Multi-modal sketch scanner converting hand-drawn grids into 12-column responsive layouts',
        'Automatic contrast validator checking hex ratios before generating classes',
        'Direct Figma token sync or clean single-file export',
        'Zero node_modules bloat runtime',
      ],
      astMatch: 99.4,
      codeSnippet: `<section class="grid grid-cols-12 gap-6 bg-surface-glass">
  <h2 class="text-2xl font-bold tracking-tight">The Cold Engine</h2>
  <button class="btn-glacier">Deploy Sketch</button>
</section>`,
      changelog: [
        { version: 'v1.4', date: 'Yesterday', notes: 'Integrated Tailwind v4 CSS theme variables & dark mode switcher' },
        { version: 'v1.3', date: '3 days ago', notes: 'Reduced sketch parsing latency to under 750ms' },
        { version: 'v1.0', date: '1 week ago', notes: 'Initial public zero-auth launch on The Pinboard' }
      ]
    },
    slips: [
      { id: 'ps-tip', title: 'Tip Jar ($5)', subtitle: 'Direct grant', actionType: 'tip', amount: 5 },
      { id: 'ps-beta', title: 'Beta: SPROUT100', subtitle: 'Click to copy', actionType: 'copy', actionPayload: 'SPROUT100' },
      { id: 'ps-repo', title: 'Visit Repo', subtitle: 'GitHub v1.4', actionType: 'link', actionPayload: 'https://github.com/promptsprout/core' }
    ]
  },
  {
    id: 'tabzenith',
    title: 'TabZenith',
    pitch: 'Minimalist tab suspender Chrome extension saving 80% RAM without losing session history or audio playback buffers.',
    category: 'Productivity',
    categoryLabel: 'PRODUCTIVITY',
    website: 'tabzenith.app',
    statusText: 'PIN #089',
    versionBadge: 'MIT Open Source',
    pushpinColor: 'primary',
    gridSpan: 'tall',
    views: 189,
    supporters: 8,
    tipTotal: 48,
    updatedAgo: '4h ago',
    stacks: ['Chrome Extension', 'TypeScript', 'Web Workers', 'Wasm'],
    tags: ['Productivity', 'Performance', 'Browser Tool'],
    author: {
      name: 'Lena Chen',
      handle: '@lenachen_labs',
    },
    details: {
      fullDescription: 'TabZenith solves Chrome memory starvation with precision. Instead of unloading tabs and breaking active forms or media state, TabZenith swaps background DOM trees into compressed binary buffers using WebAssembly, freeing up to 80% of RAM while restoring state in under 12 milliseconds.',
      features: [
        'Memory decompression in <15ms with intact scroll positions',
        'Audio buffer persistence for podcast and music tabs',
        'Zero tracking or analytics scripts injected into user pages',
        'Full keyboard shortcut palette for power users',
      ],
      ramSaved: '-78.4% Saved',
    },
    slips: [
      { id: 'tz-tip', title: 'Buy Builder a Coffee', subtitle: '$3 ↗', actionType: 'tip', amount: 3 },
      { id: 'tz-store', title: 'Chrome Web Store', subtitle: 'v2.1 Install', actionType: 'link', actionPayload: 'https://chrome.google.com/webstore' }
    ]
  },
  {
    id: 'fontradar',
    title: 'FontRadar',
    pitch: 'Spot open-source typography alternatives in seconds. Match licensed corporate font weights to Google/Fontshare fonts.',
    category: 'Design & Fonts',
    categoryLabel: 'DESIGN',
    website: 'fontradar.xyz',
    statusText: '500+ VIEWS',
    versionBadge: '★ Verified',
    pushpinColor: 'tertiary',
    gridSpan: 'compact',
    views: 524,
    supporters: 22,
    tipTotal: 180,
    updatedAgo: '5h ago',
    stacks: ['Svelte', 'Typography API', 'Tailwind CSS'],
    tags: ['Design & Fonts', 'Typography', 'Open Source'],
    author: {
      name: 'Julian Ross',
      handle: '@ross_type',
    },
    details: {
      fullDescription: 'Stop paying expensive enterprise licenses for font pairings on early prototypes. FontRadar compares letterform x-height, cap-height, terminal angles, and stem weights between commercial fonts and open-source Google/Fontshare alternatives with optical accuracy.',
      features: [
        'Instant visual overlay comparison tool',
        'Curated index of 450+ high-quality open-source typefaces',
        'Optical metric similarity score and CSS font-face generator',
      ]
    },
    slips: [
      { id: 'fr-pdf', title: 'Free Font Matrix PDF', subtitle: 'Tear slip', actionType: 'copy', actionPayload: 'MATRIX-FREE-PDF' }
    ]
  },
  {
    id: 'ghostcraft',
    title: 'GhostCraft',
    pitch: 'Turn bare Markdown folders into lightning-fast static documentation sites in 60 seconds. Built-in instant full-text search with zero node_modules bloat.',
    category: 'Open Source',
    categoryLabel: 'OPEN SOURCE',
    website: 'ghostcraft.sh',
    repoUrl: 'https://github.com/ghostcraft/ghostcraft',
    statusText: 'Zero Dependencies',
    versionBadge: 'Trending',
    pushpinColor: 'primary',
    gridSpan: 'wide',
    views: 210,
    supporters: 12,
    tipTotal: 95,
    updatedAgo: '6h ago',
    stacks: ['Rust', 'Markdown', 'WebAssembly', 'HTML5'],
    tags: ['Open Source', 'Dev Tools', 'Documentation'],
    author: {
      name: 'Nico Bell',
      handle: '@nicobell_os',
    },
    details: {
      fullDescription: 'GhostCraft is a single-binary documentation engine written in Rust. Drop it into any directory containing README.md or markdown files, and it emits an atomic HTML bundle with client-side BM25 full-text search index in 120ms.',
      features: [
        'Single binary with zero runtime dependencies or node_modules',
        'Sub-millisecond static page transitions',
        'Automated dark mode with Glacier/Nord palette presets',
        'Automatic sitemap and RSS generation for developer changelogs',
      ],
      codeSnippet: '$ npx ghostcraft init',
    },
    slips: [
      { id: 'gc-tip', title: 'GitHub Sponsor ($5)', subtitle: 'Micro-grant', actionType: 'tip', amount: 5 },
      { id: 'gc-demo', title: 'Live Demo', subtitle: 'Explore Docs', actionType: 'link', actionPayload: 'https://ghostcraft.sh' }
    ]
  },
  {
    id: 'microcron',
    title: 'MicroCron',
    pitch: 'Serverless scheduled HTTP webhooks with zero cold starts. Dead simple cron triggers for your background workers.',
    category: 'Dev Tools',
    categoryLabel: 'DEV TOOLS',
    website: 'microcron.io',
    statusText: '99.99% UP',
    versionBadge: 'Edge Fleet',
    pushpinColor: 'primary',
    gridSpan: 'compact',
    views: 165,
    supporters: 9,
    tipTotal: 62,
    updatedAgo: '8h ago',
    stacks: ['Go', 'Cloudflare Workers', 'Edge Compute'],
    tags: ['Dev Tools', 'Serverless', 'Webhooks'],
    author: {
      name: 'Daria Novak',
      handle: '@darianovak',
    },
    details: {
      fullDescription: 'Setting up recurring jobs usually requires clunky cloud scheduler consoles or persistent daemon servers. MicroCron provides a single webhook URL with instant cron syntax, HMAC request signing, and automatic retries with exponential backoff.',
      features: [
        '18 edge regions delivering sub-5ms jitter execution',
        'HMAC SHA-256 payload signing for webhook authenticity',
        'Integrated live logs dashboard with request replay',
      ]
    },
    slips: [
      { id: 'mc-tier', title: 'Tear: Free Forever Tier', subtitle: 'Redeem code', actionType: 'copy', actionPayload: 'CRON_TIER_FREE' }
    ]
  },
  {
    id: 'typeforge',
    title: 'TypeForge',
    pitch: 'Generative variable fonts crafted for editorial web design. Sliders adjust optical size, slant, and ink traps in realtime.',
    category: 'Design & Fonts',
    categoryLabel: 'DESIGN / TYPOGRAPHY',
    website: 'typeforge.design',
    statusText: 'VARIABLE',
    versionBadge: 'Curator Pick #Mondrian24',
    pushpinColor: 'secondary',
    gridSpan: 'tall',
    views: 412,
    supporters: 19,
    tipTotal: 240,
    updatedAgo: '12h ago',
    stacks: ['Python FontTools', 'WebGL', 'OpenType', 'CSS Variable Fonts'],
    tags: ['Design & Fonts', 'Typography', 'Variable Fonts'],
    author: {
      name: 'Matteo V.',
      handle: '@matteotype',
    },
    details: {
      fullDescription: 'TypeForge delivers fluid typographic expression on the modern web. Built using Python FontTools and custom bezier interpolators, each font family features continuous variable axes for weight (100-900), optical size, and exaggerated ink-traps that adapt to pixel density.',
      features: [
        '840 carefully drawn glyphs supporting extended Latin and Cyrillic',
        'Dynamic optical size compensation for high-density mobile screens',
        'Deep ink traps optimized for small screens and ultra-black display headers',
      ]
    },
    slips: [
      { id: 'tf-tip', title: 'Back Font Foundry ($12)', subtitle: 'Patron tier', actionType: 'tip', amount: 12 },
      { id: 'tf-license', title: 'Snag Webfont License', subtitle: 'Copy Key', actionType: 'copy', actionPayload: 'TYPEFORGE_BETA' }
    ]
  }
];

export const INITIAL_CHEERS: CheerMessage[] = [
  {
    id: 'c1',
    projectId: 'promptsprout',
    author: 'Samir @ IndieHacker',
    amount: 5,
    message: 'Astounding execution on the napkin-to-AST parsing. Already saved 3 hours building my client prototype!',
    timestamp: '2h ago'
  },
  {
    id: 'c2',
    projectId: 'promptsprout',
    author: 'Elena K.',
    amount: 5,
    message: 'Love the Glacier dark palette and zero paywall ethos. Keep shipping!',
    timestamp: '4h ago'
  },
  {
    id: 'c3',
    projectId: 'tabzenith',
    author: 'David Wu',
    amount: 3,
    message: 'Finally a tab suspender that doesn’t kill my Spotify player in the background. Cheers!',
    timestamp: '5h ago'
  }
];
