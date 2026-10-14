const en = {
  brand: 'SEE',

  meta: {
    title: 'SEE. Find Your Space.',
    description: 'Connecting people through meaningful small-group experiences.',
  },

  nav: {
    ariaLabel: 'Main',
    home: 'SEE home',
    languageSwitcher: 'Change language',
    links: {
      findYourCircle: 'Find Your Circle',
      about: 'About Us',
      team: 'Team',
      contact: 'Contact',
      message: 'Message us',
      meeting: 'Plan a meeting',
    },
    cta: 'Get Early Access',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  hero: {
    title: 'Find Your Space',
    description:
      'SEE turns shared interests, values, goals, and skills into social capital through curated micro-groups. Choose your intention: build a team or find new friends.',
    primaryCta: 'Get Early Access',
    secondaryCta: 'How It Works',
    imageAlt:
      'The SEE app on a phone showing a notification: Your Space is Ready, with Sarah, Alex, James and two more.',
  },

  story: {
    title: 'Connection came before code.',
    paragraphs: [
      'SEE didn’t start with a pitch deck, it began in 2023 at TSU with SEEvrce. We saw firsthand how hard it was for students and young builders to find their circle, so we started manually curating small offline spaces to bring the right people together.',
      'As the movement grew into Youth Space of Georgia, we proved that high-intent matching actually works in the real world. In fact, our core team met through those very first meetups. Now, we’re building the technology to scale that proven model for everyone.',
    ],
    timeline: {
      seevrce: {
        title: 'SEEvrce launches',
        desc: 'Offline communities & curated Spaces',
      },
      ngo: {
        title: 'Youth Space of Georgia',
        desc: 'Community grows into an NGO',
      },
      see: {
        title: 'SEE',
        desc: 'Official launch as a technology startup, building platforms to scale meaningful connections.',
      },
    },
  },

  intention: {
    title: 'What are you looking for?',
    description: 'Choose one or select both. Every Space is tailored to your intention.',
    items: {
      friends: {
        title: 'Find Friends',
        desc: 'Find people for genuine conversation, shared interests, and new experiences.',
      },
      team: {
        title: 'Build Your Team',
        desc: 'Meet collaborators, startup teammates, mentors, and people growing in similar directions.',
      },
    },
  },

  findYourCircle: {
    title: 'Find Your Circle',
    description: 'SEE the way to build meaningful connections.',
    steps: {
      profile: {
        title: 'Create Profile & Set Intentions',
        desc: 'Share your goals, skills, and interests, whether you are looking for co-founders, project collaborators, study partners, or new friends.',
      },
      match: {
        title: 'Get Matched in Micro-Groups',
        desc: 'Skip endless swiping and public feeds. Get matched into private, high-alignment micro-groups built around shared ground.',
      },
      meet: {
        title: 'Break the Ice & Meet Offline',
        desc: 'Our built-in smart facilitator breaks the ice, coordinates group availability, and effortlessly organizes your first real-world meetup, building lasting social capital.',
      },
    },
  },

  team: {
    title: 'Our Team',
    linkedinLabel: '{name} on LinkedIn',
    members: {
      alexander: { name: 'Alexander Pasieshvili', role: 'Founder & CEO' },
      sophie: { name: 'Sophie Darchiashvili', role: 'COO (Chief Operating Officer)' },
      nika: { name: 'Nika Ebralidze', role: 'CTO (Chief Technology Officer)' },
    },
  },

  waitlist: {
    title: 'Ready to find your space?',
    description: 'Join the waitlist to get priority access to the first micro-groups in Tbilisi.',
    cohortNote: 'Limited spots for the first cohort',
    emailPlaceholder: 'you@email.com',
    emailLabel: 'Email address',
    submit: 'Get Early Access',
    successTitle: "You're on the list!",
    successBody: "We'll email you the moment spots open up.",
    errors: {
      invalid: 'Please enter a valid email address.',
      rateLimited: 'Too many attempts. Please wait a few minutes and try again.',
      unavailable: 'We couldn’t add you right now. Please try again in a few minutes.',
    },
    noSpam: 'No spam. Unsubscribe anytime.',
  },

  contact: {
    meta: {
      title: 'Contact SEE. Let’s talk.',
      description: 'Write to the SEE team or plan a meeting with us. We are based in Tbilisi, Georgia.',
    },
    title: 'Let’s talk.',
    description: 'Questions, partnerships or press: send us a message, or pick a time and we will meet you.',
    detailsLabel: 'Contact details',
    tabsLabel: 'How would you like to reach us?',
    followLabel: 'Follow us',
    location: 'Tbilisi, Georgia',
    phoneLabel: 'Phone',
    locationLabel: 'Location',
    optional: 'Optional',
    nameLabel: 'Name',
    emailLabel: 'Email',
    errors: {
      required: 'This field is required.',
      email: 'Enter a valid email address.',
      tooLong: 'This is too long.',
      date: 'Choose a date from tomorrow onwards.',
      time: 'Choose one of the available times.',
      option: 'Choose an option.',
      rateLimited: 'Too many attempts. Please wait a few minutes and try again.',
      unavailable: 'We couldn’t send this right now. Please try again in a few minutes.',
    },
    message: {
      title: 'Send us a message',
      description: 'We read every message and reply by email.',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we help?',
      submit: 'Send message',
      successTitle: 'Message sent',
      successBody: 'Thank you. We will reply to your email soon.',
    },
    meeting: {
      title: 'Plan a meeting',
      description: 'Tell us when suits you. We confirm the time by email.',
      dateLabel: 'Preferred date',
      timeLabel: 'Preferred time',
      timeHint: 'Tbilisi time (GMT+4)',
      timePlaceholder: 'Choose a time',
      timezoneLabel: 'Your time zone',
      timezonePlaceholder: 'e.g. London, GMT+0',
      durationLabel: 'Duration',
      durations: { '30': '30 minutes', '60': '1 hour' },
      topicLabel: 'Topic',
      topicPlaceholder: 'Choose a topic',
      topics: {
        partnership: 'Partnership',
        press: 'Press',
        product: 'The SEE app',
        other: 'Something else',
      },
      notesLabel: 'Anything we should know?',
      notesPlaceholder: 'Agenda, questions, who will join…',
      submit: 'Request meeting',
      successTitle: 'Request received',
      successBody: 'We will confirm the time by email.',
    },
  },

  footer: {
    tagline: 'Turning shared interests, values, goals, and skills into social capital through curated micro-groups.',
    explore: 'Explore',
    navLabel: 'Footer',
    contactNavLabel: 'Contact options',
    contact: 'Contact',
    copyright: '© {year} {brand}. All rights reserved.',
    social: {
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      tiktok: 'TikTok',
    },
    theme: {
      label: 'Colour theme',
      light: 'Light theme',
      dark: 'Dark theme',
    },
  },
};

export default en;
