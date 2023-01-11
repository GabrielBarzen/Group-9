# Group-9 - GeoFlex
Student project for a location based application!

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
