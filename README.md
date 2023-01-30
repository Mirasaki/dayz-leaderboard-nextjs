<h1 align="center">Welcome to dayz-leaderboard-next 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://mit-license.org/" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

This is a DayZ leaderboard website created with [NextJS](https://nextjs.org) using data collected and provided by the [CFTools Data API](https://app.cftools.cloud/). Originally funded by TwoPigs from [The Traveller](https://discord.gg/thetraveller) who's always looking to give to the community, here it is, open-source and ready for you to host.

> 😎 Have any questions or just want to chill/have a chat? Come join our [support server](https://discord.gg/jKja5FBnYf)

> 💡 Have any feedback or feature suggestions? [Create a new issue](https://github.com/Mirasaki/dayz-leaderboard-nextjs/issues)

## ✨ Demo

A demo deployment showcasing this project can be found [here](https://leaderboard.mirasaki.dev/)

## 🤩 Features

- Shows the top 100 leaderboard for your DayZ server
- Query by in-game name **or** Steam64/CFTools ID if you're not on the leaderboard
- Display detailed player statistics
- Very customizable, from theming to branding - there's a configuration value to customize it to your wants and needs
- Manual single and multiple server configuration, or automatically resolve server grants directly from the CFTools API
- Social media previews (and directly rich Search Engine Optimization) to preview your community

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

**TLDR:** Fork the repo, authorize Vercel to manage your fork and watch it deploy the site to a live domain for you.

## 🔨 Installation

1. Download and extract [the latest release](https://github.com/Mirasaki/dayz-leaderboard-nextjs/releases) and navigate to the newly created folder
2. Rename `.env.example` to `.env` (make sure displaying file extensions is enabled) and fill in your configuration. The **only** required variables are:
    - `CFTOOLS_API_APPLICATION_ID`: Application ID from your [CFTools Developer Apps](https://developer.cftools.cloud/applications) - Authorization has to be granted by navigating to the `Grant URL` that's displayed in your app overview
    - `CFTOOLS_API_SECRET`: Same as above, click `Reveal Secret`
    - `CFTOOLS_SERVER_API_ID`: Click `Manage Server` in your [CF Cloud Panel](https://app.cftools.cloud/dashboard) > `Settings` > `API Key` > `Server ID`
3. Rename `config.example.json` to `config.json` and customize the project to your hearts content
4. Run the following commands in this exact order:

```sh
# Install dependencies
npm install

# Build the project
npm run build

# Start the project
npm run start
```

The project is now available on [port 3002](http://localhost:3002/). This is only available on your local network.

To allow anyone to reach your website basic knowledge of web-servers (like [Apache](https://apache.org/) or [Nginx](https://nginx.org/en/)) is required.

- An example Nginx file is included for your convenience [here](/nginx.example.conf).
- With this conf Nginx serves all static assets, if these fail to load (like no styles applied to the website) use the [minimal conf instead](/nginx.min.conf)

## ⚙️ Configuration

This project was initially funded by [The Traveller](https://discord.gg/thetraveller) and their configuration and branding will be used throughout the project.

### .env

```bash
# CFTools API Credentials - The ONLY required values here
# CFTOOLS_SERVER_API_ID will only be used AS THE DEFAULT
# when using multiple server setup in the config file
CFTOOLS_API_APPLICATION_ID=
CFTOOLS_API_SECRET=
CFTOOLS_SERVER_API_ID=

# Runtime Environment - production/development/staging
NODE_ENV=production

# Development-only - Analyze the app bundle
ANALYZE=true

# If provided, uses these values for the og:image meta tag (discord embed link previews)
# If omitted, uses your branding logo from the config file as a small image
NEXT_PUBLIC_IMAGE_URL=
NEXT_PUBLIC_LARGE_OG_IMAGE=false
```

### config.json

> These are the default values with a bit of an explanation, but comments (lines starting with `//` are **not** valid in JSON - so don't copy-paste this into your live application. This is but a reference.)

*Values marked with `(*)` use static files that are automatically served from the `/public` folder. If you change `BRANDING_LOGO_FILE_NAME` to `logo.jpeg`, that file should exist in the `/public` folder*

❗**Don't use this! Use the [example configuration](/config.example.json) file instead** ❗

```json
{
  // Branding
  "BRANDING_NAME": "The Traveller",
  "BRANDING_URL": "https://discord.gg/thetraveller",
  (*) "BRANDING_LOGO_FILE_NAME": "logo.png",

  // Branding Color/Theme
  "BRANDING_THEME_COLOR": "#00FFFF",
  "BRANDING_TEXT_BRAND_COLOR": "#0070f3",
  "BRANDING_TEXT_LEADERBOARD_COLOR": "#FFF",
  "BRANDING_BORDER_COLOR": "#000",

  // Page Meta (Search Engine Optimization and Social Media Previews)
  "PAGE_TITLE": "The Traveller",
  "PAGE_SUB_TITLE": "DayZ",
  "PAGE_DESCRIPTION": "DayZ Leaderboard for The Traveller community. Browse the top players, and display your own detailed player statistics.",

  // Community referral/entry button
  "COMMUNITY_BUTTON_USE_DISCORD_LOGO": true,
  "COMMUNITY_BUTTON_INVITE_LINK": "https://discord.gg/thetraveller",
  "COMMUNITY_BUTTON_TEXT": "Join our Discord!",

  // Background image
  "USE_BACKGROUND_IMAGE": true,
  (*) "BACKGROUND_IMAGE_FILE_NAME": "background.png",
  "DEFAULT_BACKGROUND_COLOR": "#121212",
  "OVERLAP_BACKGROUND_AND_NAVBAR": true,
  "NAVBAR_BACKGROUND_COLOR": "rgba(0,0,0,.7)",

  // Page Scroll Indicator
  "USE_SCROLL_INDICATOR": true,
  "SCROLL_INDICATOR_COLOR": "#FFF",
  "SCROLL_INDICATOR_BACKGROUND_COLOR": "grey",

  // The default value to sort by when landing on the page,
  // value is REQUIRED in the next LEADERBOARD_ALLOWED_SORT_VALUES array
  "LEADERBOARD_DEFAULT_SORT_VALUE": "kdratio",
  // Allowed values to sort by in the dropdown menu
  "LEADERBOARD_ALLOWED_SORT_VALUES": [
    "kdratio", "kills", "deaths",
    "longest_kill", "longest_shot", "playtime",
    "suicides"
  ],

  // Creates a dropdown menu to select servers, if false - only the default server from the .env file is served
  "USE_MULTIPLE_SERVER_CONFIGURATION": true,

  // Hits the CFTools API endpoint to automatically resolve available server grants and lists these all as available servers
  "AUTOMATICALLY_RESOLVE_SERVER_GRANTS": false,

  // Multiple, manual, server configuration
  // Only active when USE_MULTIPLE_SERVER_CONFIGURATION is true
  "CFTOOLS_DAYZ_SERVERS": [
    {
      "NAME": "Cherno - The Traveller (Hive)",
      "SERVER_API_ID": "Your secret server API ID O;"
    },
    {
      "NAME": "Deerisle - The Traveller (Hive)",
      "SERVER_API_ID": "Your secret server API ID O;"
    }
  ],

  // This prevents players in the blacklist from being queried,
  // displaying their detailed player stats
  "ALLOW_PLAYER_STATISTICS_FOR_BLACKLIST": false,
  // Filters out specific id's/players from being shown on the leaderboard
  // HAS to be CFTools id, if a steam64 is supplied,
  // the player will only be blacklisted from detailed player stats, NOT the leaderboard page
  // Particularly useful for admins
  "BLACKLISTED_CFTOOLS_IDS": [
    "ID_1",
    "ID_2"
  ]
}
```

## Author

👤 **Richard Hillebrand (Mirasaki)**

- Website: [https://mirasaki.dev/](https://mirasaki.dev/)
- Github: [@Mirasaki](https://github.com/Mirasaki)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Mirasaki/dayz-leaderboard-nextjs/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Richard Hillebrand (Mirasaki)](https://github.com/Mirasaki).<br />
This project is [MIT](https://mit-license.org/) licensed.
