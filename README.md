- [Delta Vue Components](#delta-vue-components)
  - [`@deltares/vue-components`](#deltaresvue-components)
  - [`@deltares/design-tokens`](#deltaresdesign-tokens)
  - [`@deltares/vuetify-theme`](#deltaresvuetify-theme)
  - [`demo-app`](#demo-app)
  - [Building components in `@deltares/vue-components`](#building-components-in-deltaresvue-components)
  - [Adding dependencies to packages](#adding-dependencies-to-packages)

# Delta Vue Components

This is the monorepo for Deltares it's Vue components. We maintain it with
[lerna](https://github.com/lerna/lerna).

## `@deltares/vue-components`

This package contains the reusable Vue components to be used in your Deltares 
projects. For its features and how to use it, 
[look here](packages/vue-components/README.md).

## `@deltares/design-tokens`

This package contains the raw design tokens for the Deltares projects.
⚠️ You probably don't need to include this as a dependency in your projects. If 
you want the `@deltares/vue-components` to have the Deltares theme, look at the
`@deltares/vuetify-theme` package.
For more info [look here](./packages/design-tokens/README.md)

## `@deltares/vuetify-theme`

This package contains the Vuetify theme for Deltares projects.
For more info [look here](./packages/vuetify-theme/README.md)

## `demo-app`

This package contains a demo app of how the `@deltares/vue-components` can be 
used. Use this app to test the components in a Real World App. For more
information about the `demo-app` [look here](packages/demo-app/README.md)

## Building components in `@deltares/vue-components`

In the root of this repo, run `npm run start`. The `demo-app` project will be 
build and run, you can reference components from `@deltares/vue-components` 
directly. It features hot module reloading as well.

## Adding dependencies to packages

Because we use Lerna, we have the posibility to _hoist_ dependencies to the root
of the repo, while still have packages with their own `package.json`. The 
benefit of this method, is that we have a single `node_modules` folder at the 
root of the repo, instead of having multiple in every `packages/*` folder.

This reduces the amount of duplicate files on your system by quite a lot.

_Hoisting_ packages to the root comes at a cost though. Using 
`npm install <dependency>` is not enough.  
Example: Say we want to install `@vue/test-utils` in `packages/vue-components/`
we have to do this:

```
$ cd packages/vue-components
$ npm install @vue/test-utils
$ cd ../../
$ npm run hoist
```