# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

Website currently deployed at:
https://shipthis-fletnix-frontend.vercel.app/

Backend code repo present at:
https://github.com/AbhinavJuyal/shipthis_fletnix_backend

**Note: Deployed website might take time to load, since the backend instance will spin down with inactivity, which can delay requests by 50 seconds or more. It will be only for the first request to the backend.**

## Development server

Create .env file, you can refer to .env.example file for the environment variables and then run the following command

```bash
node -r dotenv/config setEnv.js
```

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Website Routes

| Route  | Description | Access |
| ------------- | ------------- | ------------- |
| /  | Home page (only contains header)  | Public |
| /login  | Login page. Allows user to login to their account  | Public |
| /signup  | Signup page. Allows user to create a new account  | Public |
| /browse  | Browse page. User can filter through various titles here  | Protected |
| /browse/:id  | Title page. Specific title can be seen here  | Protected |
| /account  | Account page. Active User details can be seen here.  | Protected |


## Features

- Paginated UI for `/browse` Route
- User can select the page size: 15, 20, 25, 30
- User can filter on the basis of Movie Name, TV Shows, and Cast Members
- User can see their account information and logout as well in `/account` route
- User is only able to access `/browse` and `/account` pages only after logging into the website
- User can see the entire details of the title by clicking on the title card


## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
