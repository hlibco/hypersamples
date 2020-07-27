# HyperSamples

A working website that includes
[Hyperapp](https://github.com/jorgebucaran/hyperapp) v2,
[Typescript](https://www.typescriptlang.org/), and
[Parcel](https://parceljs.org/).
Also demonstrates accessing an HTTP API.

This project uses a fork of
[Hyperway](https://www.npmjs.com/package/hyperway) to manage client-side routes and
[Hyperlit](https://www.npmjs.com/package/hyperlit) to improve HTML legibility.

## What is this project about?

If you're evaluating a new front-end framework and came across `Hyperapp`, this project can help you with the first steps. Explore the source code and the workflow below.

## Usage

Install dependencies, including Typescript and Parcel:

```
yarn install
```

To run the local parcel application server (it opens your default browser with auto-reload enabled):

```
yarn start
```

**Pro tip:** Change the `localhost` in the URL of the browser to your local network IP Address and share the URL with your mobile device for quickly see how your changes look on mobile.

To build the application:

```
yarn build
```

To check for compilation issues:

```
yarn check
```

To serve the compiled version of the application (remember to build it first):

```
yarn serve
```

When you serve the built version, you can share the URL with other devices in the same network (useful to test on your phone).

To run unit tests (not implemented yet):

```
yarn test
```

## FAQ

#### Why some views use `h` (from Hyperapp) and others use `html` (from Hyperlit)?

This is by design. This project explores Two ways to render views. There's also possible to use JSX/TSX or other view engines.

#### Why does this project use Bulma (CSS)?

The only reason is to showcase how a 3rd party CSS framework can be easily added to your project if you decide to do so.

#### Does the state load from the Local Storage?

Yes, partially. Why? To demonstrate how you can adopt this technique in your application if you decide to do so. You can choose to do not use Local Storage at all to store the application's state, even though it's useful in some cases.

## Typescript

Nothing about Hyperapp depends on Typescript. I included it because I like to
use it with my own data structures. Hyperapp does not currently provide
Typescript type definitions, and the `hyperapp.d.ts` file in this project was copied (and modified) from the
[PR #969](https://github.com/jorgebucaran/hyperapp/pull/969).

## License

MIT

## Resources

https://httpstat.us/200
