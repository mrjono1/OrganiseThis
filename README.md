# OrganiseThis

## Project Goals

The goal of this project is to be able to build timetables for things like workplace shift timetables and school timetables.

It is being built as a NPM package and the aim is for it to be able to be run on a client browser or server via nodejs.

Built using [Typescript](http://www.typescriptlang.org/) so is fully typed

It is currently a work in progress, this also is my third attempt at this project the previous attempts took a more pure Genetic Algorithm approach. This time I am working a lot more loosly on that idea by attempting to generate a population (set of timetables) using rules first up to increase the fitness (quality of timetable) straight up. So the first generation (inital set of timetables) may be a valid solution instead of needing multiple generations (tweaks of the data over time)

## Contribution

```bash
## NVM to manage node versions https://github.com/nvm-sh/nvm
nvm use

## Yarn to manage NPM Packages https://yarnpkg.com
yarn

## Jest to run tests https://jestjs.io/
yarn test
```
