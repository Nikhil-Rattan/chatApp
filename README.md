This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Relay Chat

A performance-focused React Native chat assessment app. It lists contacts with infinite pagination, opens per-contact message threads, sends messages with optimistic updates, fetches profiles through TanStack Query, and stores block/unblock state globally with Zustand.

## Demo

[![Watch the Relay Chat screen recording](docs/screenshots/chat.png)](docs/recordings/recording.webm)

Click the preview above to watch the complete application flow.

## Screenshots

|                                  Chats                                  |                                 Conversation                                  |                             Sent message                              |
| :---------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :-------------------------------------------------------------------: |
| <img src="docs/screenshots/Chat_tab.png" width="220" alt="Chats tab" /> | <img src="docs/screenshots/chat.png" width="220" alt="Conversation screen" /> | <img src="docs/screenshots/msg.png" width="220" alt="Sent message" /> |

|                                   Profile                                    |                                   Settings                                    |
| :--------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
| <img src="docs/screenshots/profile.png" width="220" alt="Contact profile" /> | <img src="docs/screenshots/setting-tab.png" width="220" alt="Settings tab" /> |

## Architecture

Each screen is colocated in its own folder and split into three responsibilities:

- `screen.tsx`: rendering and user interaction
- `useScreen.ts`: query, mutation, state, and navigation logic
- `styles.ts`: React Native styles

Shared API adapters normalize either array-based or `{ data: [] }` responses into stable domain types. The UI uses FlashList, memoized rows, stable callbacks, native-stack screens, atomic Zustand selectors, cached queries, loading/error/empty states, and release resource/code shrinking. Screen entrance transitions use the native animation driver and honor the operating system’s Reduce Motion preference.

React Query is connected to React Native app focus and network state, requests are cancellable, and an app-level error boundary provides recovery from unexpected rendering failures. The project uses React 19.2’s `useEffectEvent` to keep animation effect logic current without unnecessary effect restarts.

All internal imports use the `@/` alias. Runtime values are provided by `.env`; copy `.env.example` when setting up another machine.

## Run

```sh
npm install
cd ios && bundle exec pod install && cd ..
npm start
npm run ios # or npm run android
```

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run test:coverage
```

---

# React Native template notes

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
