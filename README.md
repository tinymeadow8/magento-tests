# Cypress Test Suite

## Project Description

This project contains two automated tests written in Cypress by Eglė Mozūraitytė. These tests are designed to validate the functionality of a web application [Magento Software Testing Board](https://magento.softwaretestingboard.com/), ensuring that key features such as navigating item pages, filtering items, adding and removing items to and from the cart, verifying item details, and placing orders are working correctly.

## Prerequisites

Before you can set up and run the tests, make sure you have the following installed:

- **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js official site](https://nodejs.org/).
- **npm**: npm (Node Package Manager) is installed automatically with Node.js. Verify the installation by running `npm -v` in your terminal.
- **Visual Studio Code (VSC)**: Download and install Visual Studio Code from [here](https://code.visualstudio.com/).

## Setup Instructions

### Clone the Repository

First, you need to clone the project repository to your computer using Git. Open your terminal and run:

```bash
git clone https://github.com/tinymeadow8/magento-tests.git
cd magento-tests
```

### Open the Project in Visual Studio Code

After cloning the repository, open Visual Studio Code (VSC). In VSC, go to **File > Open Folder...**, and select the project directory **magento-tests** that you just cloned.

### Install Dependencies

Once the project is open in VSC, open the integrated terminal by navigating to **Terminal > New Terminal**. In the terminal, run the following command to install the required dependencies:

```bash 
npm install
```

This command will install all the dependencies listed in the **package.json** file, including Cypress.

## Running the Test

### Run Test in Cypress Test Runner

To open the Cypress Test Runner, run the following command in VSC Terminal:

```bash
npx cypress open
```

This opens the Cypress Test Runner. You can click on the test file **twoday.cy.js** to run it.

### Run Test in Headless Mode

If you want to run the test without opening the Cypress Test Runner, you can use:

```bash
npx cypress run
```

This command will execute the test in the command line and output the results to the terminal.