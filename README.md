# Restaurant

- Each module has it's own components, redux store and effects, services, model and guard protecting routes.

## Key learning to take away

- Routes
	- Lazy loading route
	- Guarding the route based on parameters
	- navigation

- Forms
	- ngModel and ngForm data bindings

- Angular Redux (ngrx)
	- Reducers, Actions, Effects

- Angular http
	- HttpClient and HttpRespose with singleton injected service

- Angular lifecycle hooks
	- OnInit, OnChanges, OnDestroy

- Reactive Programming (rxjs)
	- Working with observables (multiple data push, like streams in java)
	- rxjs operators for streaming data, does not do anything till subscribe

- Pipes in html
	- Use pipes to pass through data at runtime rendering of DOM
	- Custom pipes to format data
- user registration service
	1. create user in mongodb
	2. create a jwt
	3. send jwt to angular
	4. store jwt in angular
	5. store jwt in angular authentication header
	6. decrypt jwt in nodejs
	7. identify user

- ngrx/data
	- using ngrx/data for user entity only as it does not support deep cloning
	- less code for simple data entities

## Todos
- Lazy loading routes
- Caching the data
- Auth
- Testing in Angular
- Resolver with redux store?