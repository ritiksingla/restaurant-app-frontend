# Restaurant

- Each module has its components, redux store and effects, services, model, and guard protecting routes

## Key learnings to take away

- Routes
	- Guarding the route based on parameters and token
	- navigation

- ngForm
	- ngModel and ngForm data bindings (one way and two way)
	- form validation for browser independency displaying messages

- Angular Redux (ngrx)
	- Reducers, Actions, Effects
	- may not need redux but used for learning

- Angular HTTP
	- HttpClient and HttpRespose with singleton injected service
	- use with operator shareReplay(1) to cache data and call API only once

- Angular lifecycle hooks
	- OnInit, OnChanges, OnDestroy

- Reactive Programming (rxjs)
	- Working with observables that come handy while emitting async data 
	  to all subscribers
	- rxjs operators for streaming data

- Pipes in HTML
	- Use pipes to pass through data at runtime rendering of DOM
	- Custom pipes to format data

- User registration service
	1. create a user in MongoDB
	2. create a jwt
	3. send jwt to angular
	4. store jwt in angular
	5. store jwt in the angular authentication header
	6. decrypt jwt in nodejs
	7. identify the user

- Authorization
	- use HTTP interceptor (analogous to middlewares) for setting header token
	- protect routes using guards

- Cache the data
	- use vanilla javascript's localStorage to store small data across the session
	- use the redux store for synchronizing the data and subscribe to changes till the session is reloaded
	- use shareReplay in to cache HTTP response data till refreshing

## Todos
- Lazy loading routes
- Angular material
- Angular animations while routing
- Testing in angular
- Resolver with the redux store ?