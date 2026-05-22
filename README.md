# FuelStationDashboard

Application for a fuel station employee. You can:

- view fuel list
- set current prices
- add and edit promotions
- set services availability
- filter data
- and many more

## Run Locally

Clone the project

```bash
  git clone https://github.com/kvrolg/Fuel-Station-Dashboard.git
```

Go to the project directory

```bash
  cd Fuel-Station-Dashboard
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

To run local database go to the project directory

```bash
  cd Fuel-Station-Dashboard
```

Run JSON server

```bash
  json-server --watch mocks/db.json
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
