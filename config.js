// ============================================================
// JOSH'S HOME PAGE — EDIT THIS FILE TO CHANGE THE PAGE
// ============================================================
//
// Add/remove sections in HOME_SECTIONS.
// Each link supports:
//   name        Required display name
//   url         Required destination
//   note        Optional small description
//   icon        Optional short text/emoji shown in the tile
//   favourite   true = also appears in Quick Access
//
// Reorder sections or links simply by moving their blocks.
// No HTML/CSS changes are required for normal edits.

const HOME_SETTINGS = {
  title: "Josh's Home",
  greeting: "Good {daypart}, Josh",
  subtitle: "Everything in one place.",
  searchEngine: "https://www.google.com/search?q=",
};

const HOME_SECTIONS = [
  {
    title: "Admin & Finance",
    links: [
      {
        name: "Admin Sync",
        url: "https://joshuas-macbook-air.tailda8b88.ts.net/",
        note: "Personal dashboard",
        icon: "AS",
        favourite: true,
      },
      {
        name: "Up",
        url: "https://up.com.au/",
        note: "Banking",
        icon: "UP",
        favourite: true,
      },
      {
        name: "CommBank",
        url: "https://www.commbank.com.au/netbank.html",
        note: "NetBank",
        icon: "CB",
        favourite: true,
      },
      {
        name: "Sharesies",
        url: "https://app.sharesies.com.au/",
        note: "Investments",
        icon: "SH",
        favourite: true,
      },
    ],
  },

  {
    title: "Work & Development",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/",
        note: "Repositories",
        icon: "GH",
        favourite: true,
      },
      {
        name: "ChatGPT",
        url: "https://chatgpt.com/",
        note: "ChatGPT",
        icon: "AI",
        favourite: true,
      },
      {
        name: "Outlook",
        url: "https://outlook.office.com/mail/",
        note: "Email",
        icon: "OL",
      },
      {
        name: "Teams",
        url: "https://teams.microsoft.com/",
        note: "Microsoft Teams",
        icon: "TM",
      },
    ],
  },

  {
    title: "Engineering",
    links: [
      {
        name: "DigiKey",
        url: "https://www.digikey.com.au/",
        note: "Components",
        icon: "DK",
        favourite: true,
      },
      {
        name: "Mouser",
        url: "https://au.mouser.com/",
        note: "Components",
        icon: "MO",
      },
      {
        name: "NXP",
        url: "https://www.nxp.com/",
        note: "Semiconductors",
        icon: "NX",
      },
      {
        name: "ST",
        url: "https://www.st.com/",
        note: "STMicroelectronics",
        icon: "ST",
      },
      {
        name: "Altium",
        url: "https://www.altium.com/",
        note: "PCB design",
        icon: "AL",
      },
    ],
  },

  {
    title: "Google & Personal",
    links: [
      {
        name: "Gmail",
        url: "https://mail.google.com/",
        note: "Personal email",
        icon: "GM",
        favourite: true,
      },
      {
        name: "Calendar",
        url: "https://calendar.google.com/",
        note: "Google Calendar",
        icon: "GC",
        favourite: true,
      },
      {
        name: "Drive",
        url: "https://drive.google.com/",
        note: "Google Drive",
        icon: "GD",
      },
      {
        name: "Maps",
        url: "https://maps.google.com/",
        note: "Google Maps",
        icon: "MP",
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/",
        note: "YouTube",
        icon: "YT",
      },
    ],
  },

  {
    title: "Sport & Streaming",
    links: [
      {
        name: "Kayo",
        url: "https://kayosports.com.au/",
        note: "Sport",
        icon: "KY",
        favourite: true,
      },
      {
        name: "NBA",
        url: "https://www.nba.com/watch/league-pass-stream",
        note: "League Pass",
        icon: "NBA",
      },
      {
        name: "Stan",
        url: "https://www.stan.com.au/",
        note: "Stan / Stan Sport",
        icon: "SN",
      },
      {
        name: "9Now",
        url: "https://www.9now.com.au/",
        note: "Nine / live sport",
        icon: "9",
      },
    ],
  },
];
