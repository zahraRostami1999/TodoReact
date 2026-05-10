# Description

This is a simple To-Do application built with ReactJS that connects to a RESTful API developed in raw PHP. Connection and file serving are managed via a [.htaccess](/.htaccess) file. The backend uses PDO to connect to a MySQL database

# Deployment Steps

1. run `npm i`
2. run `npm run build`
3. move `api`, `build` and `.htaccess` to the host.

## Deployment Considerations

- comment out lines 2 to 9 in [/api/index.php](/api/index.php) in order to apply CORS restrictions. These lines are added for local development purpose.