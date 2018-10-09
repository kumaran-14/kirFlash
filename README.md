# kiranFlash
Blueseed

Setting up the environment

If the hosting services already comes with node environment, skip this step. Else refer the below link for setting up node environment by installing node and npm.

How to install and configure Node.js on managed hosting accounts

Installation

Either download the ZIP file or clone this repository and make sure you have Node installed and run:

For cloning:

git clone git@github.com:krnsnaik/blueseed.git
Quickstart

Make sure you are in the blueseed directory and run the following commands:

npm install
The above command builds the package and installs all the dependancies(node modules).

Now, to run the file just type in the following command:

npm start
If the hosting services already comes with pre-configured node environment, then no need to perform npm install and npm start. Just push git repository to the hosting server.

Configuring environment variables

After deploying the application, configure the environment variables. This app uses the following environment variables.

ZILLOW_API_KEY
GOOGLE_STATIC_MAPS_KEY
MAPQUEST_API_KEY
Note: Make sure to use same variable names and provide the keys in the value field corresponding to the above names.
