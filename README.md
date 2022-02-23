# PremiumCalculator
 
The folder PremiumAPI contains the project's backend.
In this folder you can change the localhost port on the Properties/launchSettings.json file.
- "applicationUrl": "http://localhost:56923" <- here you can change the port

The forder PremiumFront contain the project's frontend.
In this folder you can change the port of the service on the js/requests.js file's first line
- var proxy = 56923; <- here you can change the port

Both ports need to be the same for the application to works.

The Backend contains 3 json files for further configurations or modifications, these file are located on the /files folder.

- plans.json contains the available plans (A,B,C)
- states.json contains the available states (usa states)
- premium_table.json contains the plan table of the exercise.

I made a run.bat file to execute the Backend, it could be find on PremiumAPI/run.bat