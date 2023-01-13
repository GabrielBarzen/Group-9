# Group-9 - GeoFlex
Student project for a location based application.
## The config properties needs to be placed in the [resource](https://github.com/GabrielModin/Group-9/tree/Dev/GeoFlex/src/main/resources) directory BEFORE BUILDING.
### config.properties
```
domain.email=domain email
domain.password=email password
database.ip=ip to database
database.port=port to database
database.username=db user
database.password=db user password
```
## Commandline arguments
```
database                       , change&view database info
user                           , change&view user information
clear                          , clear the terminal
exit                           , close server

user get                       , gets all users from database
user password {ID}             , sets the user password using id
user new                       , creates new user
user set-access {ID} {level]   , sets the user accesslevel using id (0, user;1, moderator;2, admin)

database ip set {IP}           , set ip for current session
database port set {PORT}       , set port for current session
database username set {USER}   , set username for current session
database password set {PASS}   , set password for current session
database ip get                , get ip for current session
database port get              , get port for current session
database username get          , get username for current session
database password get          , get password for current session
database connection get        , get current db connection info
```

## Rules & process
### Main
Updating main is only done through pull requests reviewd by the rest of the team.
In order to merge code into main, it has to be tested and contribute with enough functionality for
a major version increase (eg. a decimal increase 0.10->0.20) & release.
New functionality Constitutes a new use case for the program, retrieving statistics, ability to create routes and so on.

### Dev
Dev is the branch current work is being done on.
When developing a new feture or fix a new branch is created from Dev.
Code in dev is merged from Working branches.

### Working branches
A working branch is created when developing a new feture or fix for the program.
This feture or fix should have a decriptive name alongsite the specification requirement where applicable.
If the feture is missing a requirement in the specification one should be created.

If a working branch concerns more than one requirement from the specification, it should be specified in the pull request.

## Setup on Microsoft Azure
```
1. Install Web Server (IIS) in the Server Manager on the VM.
2. Open port 8080 on the VM (Done on azure website).
3. Allow inbound 8080 in the VM firewall.
4. Get the optinal DNS that azure provides, should look something like: geoflex.westeurope.cloudapp.azure.com
5. Create a CNAME dns on your domain provider and point ur selected URL to the link: geoflex.westeurope.cloudapp.azure.com
6. Create a website for and use geoflex.westeurope.cloudapp.azure.com as the host. Reverse proxy it so it can be accessed without a port. See: https://techcommunity.microsoft.com/t5/iis-support-blog/setup-iis-with-url-rewrite-as-a-reverse-proxy-for-real-world/ba-p/846222
(The step above might not be needed, ignore and try without. Implement if it doesnt work).
7. Create a second website in the IIS and use the URL you created in the domain as the host.
8. Make a folder in inetpub and set it as the physcal location for the website. Put some default files like a basic index.html in the folder.
9. Run WINACME and generate a SSL Certificate for the website you just created in the IIS. 
```

