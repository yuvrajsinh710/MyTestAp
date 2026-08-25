# MyTestAp

A React Native app built with Expo (SDK 57) and expo-router.

## Screens

- **Home** — shows device details (name, manufacturer, model, Android ID, OS and version) after asking for permission, and a Photos button to pick an image from the gallery
- **Listing** — a list of dummy contacts generated with faker
- **Settings** — a form with name, email, birthdate picker and country selector

There is a splash screen with the app logo, bottom tab navigation between the
three screens, and a light/dark theme toggle in the header.

## Running it

You need Node.js installed. Then:

```bash
npm install
npx expo start
```

Scan the QR code with the Expo Go app on your phone, or press `a` for Android,
`i` for iOS and `w` for web.

Tested on Android with Expo Go.

## Notes

- Device details are gated behind an in-app permission prompt. Android has no
  runtime permission for these fields, so the app asks before showing anything.
- `metro.config.js` contains a resolver fix for `react-async-hook` (a dependency
  of the country picker) which otherwise breaks the web bundle.
- On web, `Alert` and the native date picker are not available, so the app falls
  back to `window.confirm` and an `<input type="date">`.
