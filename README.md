# pprs-prototype

&ensp;
## Project Setup
### Cloning the project
Clone the project using git:
```shell
git clone https://github.com/nhsbsa/medicines-management-prototype.git
```
or
```shell
git clone git@github.com:nhsbsa/medicines-management-prototype.git
```
### NPM Setup
Once the project is cloned, run the following command to download and install node dependencies:
```shell
npm install
npm install gulp
```
If there are issues downloading dependencies, you may need to add the nhsbsa npm repository.
To do this:
- Create the file ~/.npmrc
- Add the following configuration:
```shell
registry=https://dps-nexus.service.nhsbsa:8443/repository/npm
strict-ssl=false
```

### Install the live reload plugin
Install the live reload plugin for your browser
* [Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei/related)

&ensp;
***
&ensp;
## Running the Prototype locally
To run the prototype locally, use gulp:


```shell
gulp
```

The prototype will then open a window in your browser on http://localhost:3000.

Browser sync settings can be accessed on http://localhost:3001.

## Running Pa11y accessibility checks
 
```shell
pa11y-ci -c pa11y.json
```
&ensp;
