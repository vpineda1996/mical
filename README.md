# FarmGek

## Project Description

The  purpose of this repo is house the client side code for  the FarmGeek web application.  FarmGeek is a new web-based application for policy makers, researchers, funders, donors, and farm extension agents to identify the balance of the evidence for different on-farm interventions for agricultural outcomes such as yield, biodiversity, human health. 

This repository has been developed by worklearn students at the University of British Columbia, under direction of Zia Mehrabi and Navin Ramankutty. It is currently maintained by Zia Mehrabi, at the University of Colorado Boulder. Any questions please contact ziamehrabi@gmail.com.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites Development Tool Installations

What things you need to install the software and how to install them. No need to install again if you already have installed these tools previously.

- This project uses [Git](https://git-scm.com/) as our version control manager. Install the [latest version](https://git-scm.com/downloads) in order to have version control for the project.

- open your command line tool and navigate to the directory you wish to install the project into and download the project using `git clone <project-repo-link>`

- download latest version of [node](https://nodejs.org/en/download/) as npm (node package manager) and node.js server language are used in the project.

- This project uses the javascript framework Angular. Install Angular CLI by running this command on the command line at the root of your project directory.

```
npm install -g @angular/cli
```

### Installing

A step by step series of examples that tell you how to get a development env running. Type all commands into the root of your project directory.

Install all project dependencies using npm.

```
npm install 
```

To run project locally use the command

```
npm start
```

The app will run locally on the url http://localhost:4200/

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

### As of April 2021, the test suite needs to be remade as they are not up to date (so ignore this section of README)

The Project contains Unit tests using [Karma](https://karma-runner.github.io), and E2E tests using [Protractor](http://www.protractortest.org/).

### Run Unit Test Suite

```
Run ng test
```

### Run E2E Test Suite

```
Run ng e2e
```

## Deployment

Run `ng build` to build the project locally. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

This project is hosted with [Heroku](https://www.heroku.com).
Deployment of this project to heroku is done from the [mical_server](https://github.com/AgriculturalEvidence/mical_server) project. Look at its Readme for instructions on deployment.

## Built With

- [Angular](https://angular.io/) - The web framework used
- [npm](https://www.npmjs.com/) - Package manager for Node JavaScript platform
- [flot](https://www.flotcharts.org/) - library used to create JavaScript charts
- [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview) - library for composing asynchronous and event-based programs
- [Mapbox](https://www.mapbox.com/) - Map library for JavaScript

## Contributors

- **Jaehun Song**
- **Candice Pang**
- **Victor Pineda Gonzalez**
