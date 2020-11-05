- [Delta Vue Components](#delta-vue-components)
  - [`@deltares/vue-components`](#deltaresvue-components)
  - [`demo-app`](#demo-app)
  - [Building components in `@deltares/vue-components`](#building-components-in-deltaresvue-components)

# Delta Vue Components

This is the monorepo for Deltares it's Vue components. We maintain it with
[lerna](https://github.com/lerna/lerna).


## `@deltares/vue-components`

This package contains the reusable Vue components to be used in your Deltares 
projects. For its features and how to use it, 
[look here](packages/vue-components/README.md).

## `demo-app`

This package contains a demo app of how the `@deltares/vue-components` can be 
used. Use this app to test the components in a Real World App. For more
information about the `demo-app` [look here](packages/demo-app/README.md)

## Building components in `@deltares/vue-components`

In the root of this repo, run `npm run start`. The `demo-app` project will be 
build and run, you can reference components from `@deltares/vue-components` 
directly. It features hot module reloading as well.