# fakeTwitter
**Author**: Sean Murray
**Version**: 0.0.3 

## Overview
This is a personal project to build a simple twitter clone.

## Getting Started

### Step 1:
Once you have cloned the repo in the command line run:

```
npm i
```

### Step 2:
From the root directory run the following:

```
psql -d dbname -f schema.sql
```


### Step 3:
Create a local **.env** file and insert the following:
 - openport should be a number for an open port on your machine.
```
PORT=<openport>
DATABASE_URL=postgres://localhost:5432/DBNAME
```
 - postgres link provided for mac OS
### Step 4:
To start the server run the following in the terminal:

```
npm start
```

## Architecture
This app will have a login page to access your feed of posts and find new people.

### Libraries Used:
 - Express
 - dotenv
 - pg
 - bcrypt
 - ejs

## Change Log
 - 06-10-2020 2323 - Initial commit of files.
 - 06-12-2020 2045 - Add bcrypt and start the login and register backend routes.
 - 06-13-2020 0039 - Add login post and get routes, Register post and get routes.
 

## Credits and Collaborations

 - Diane Stephani
 - Edgar Romero
 - Jonathon Lee
 - Sarah Shatto
