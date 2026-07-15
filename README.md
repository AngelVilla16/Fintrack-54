
# Fintrack 54

Fintrack 54 is a React Native app built with Expo 54 designed to help users manage their expenses and income in a visual, accessible, and easy way.

## Tech Stack

**Client:** React Native, CSS, Typescript

**Server:** Node, Express, MySql


## Installation
git clone https://github.com/AngelVilla16/Fintrack-54

```bash
    pnpm install 
 ```
In the backend folder, you need to install
```bash
    pnpm install
    pnpm add express
    pnpm add bcrypt
    pnpm add mysql2
```
## Environment Variables

To run this project, you will need to add the following environment variables to your /backend/.env file

Example
DB_HOST= YOUR_HOST
DB_USER= YOUR_DB_USER
DB_PASSWORD= YOUR_DB_PASSWORD
DB_DATABASE= YOUR_DB




## Run The Project


```bash
    pnpm expo start 
    OR
    pnpm run android
    OR 
    pnpm run ios
```

Go to the backend folder

```bash
  node src/index.js
```

```


## Features

- Login and Register 
- Auth 
- Native Interface for Android and Ios


## Roadmap

- [ ] Add Expenses and Income to the Database
- [ ] Add Statistics and Graphics for Expenses 
- [ ] Add View the recent moves

## Project Structure
```
Fintrack-54/
├── app/          # Frontend (Expo Router)
├── backend/      # API REST (Node + Express)
└── ...
``` 
