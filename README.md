# Web-Development
Projects for Stanford CS 142

Common Bugs: 
* If react isn't being recognized:
    1. Make .bashrc file with:
        ```{
            "presets": [
                "@babel/preset-env",
                "@babel/preset-react"
            ]
        }```
    2. In package.json replace devDependancies with:
        ```
            "@babel/core": "^7.10.2",
            "@babel/preset-env": "^7.10.2",
            "@babel/preset-react": "^7.10.1",
            "babel-core": "^7.0.0-bridge.0",
            "babel-eslint": "^10.0.1",
            "babel-jest": "^24.7.1",
            "babel-loader": "^7.1.5",
            "babel-preset-env": "^1.6.1",
            "babel-preset-react": "^6.24.1",
            "babel-preset-stage-2": "^6.24.1",
            "css-loader": "^1.0.0",
            "eslint": "^5.8.0",
            "eslint-config-airbnb": "^17.1.0",
            "eslint-plugin-import": "^2.14.0",
            "eslint-plugin-jsx-a11y": "^6.1.2",
            "eslint-plugin-react": "^7.11.1",
            "style-loader": "^0.23.0",
            "webpack": "^4.43.0",
            "webpack-cli": "^3.1.2"
        ```
    3. Use when not recognizing jsx: 
        ```npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react```
        or
        ```npm install babel-loader babel-core@^7.0.0-bridge @babel/core --save-dev```
* Remove fsevents from node_modules
* USE WITH NODEMON to kill hanging processes: 
    ```sudo kill -9 $(ps aux | grep '[n]ode' | awk '{print $2}```
    - The ps gives you the list of all the processes.
    - The grep filters that based on your search string
        * [n] is a trick to stop you picking up the actual grep process itself.
    - The awk just gives you the second field of each line, which is the PID.
    - The $(x) construct means to execute x then take its output and put it on the command line. 
        * The output of that ps pipeline inside that construct above is the list of process IDs 
        * so you end up with a command like kill 1234 1122 7654.