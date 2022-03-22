# Restaurant

- Each module has its components, redux store and effects, services, model, and guard protecting routes

## Key learnings to take away

- Routes
	- Router navigation
	- Guarding the route based on parameters and token
	- Child routes extending same url
	- Secondary routes for same hierarchy (useful for dashboard or displaying comments)

- ngForm
	- ngModel and ngForm data bindings (one way and two way)
	- Form validation for browser independency displaying messages

- Angular Redux (ngrx)
	- Reducers, Actions, Effects
	- May not need redux but used for learning

- Angular HTTP
	- HttpClient and HttpRespose with singleton injected service
	- Use with operator shareReplay(1) to cache data and call API only once

- Angular lifecycle hooks
	- OnInit, OnChanges, OnDestroy

- Reactive Programming (rxjs)
	- Working with observables that come handy while emitting async data 
	  to all subscribers
	- rxjs operators for streaming data
	- Combine data and action observables with rxjs combiners like combineLatest
	- Use subjects for emitting data and listening to data simultaneously

- Pipes in HTML
	- Use pipes to pass through data at runtime rendering of DOM
	- Custom pipes to format data

- User registration service
	1. Create a user in MongoDB
	2. Create a jwt
	3. Send jwt to angular
	4. Store jwt in angular
	5. Store jwt in the angular authentication header
	6. Decrypt jwt in nodejs
	7. Identify the user

- Authorization
	- Use HTTP interceptor (analogous to middlewares) for setting header token
	- Protect routes using guards

- Cache the data
	- Use vanilla javascript's localStorage to store small data across the session
	- Use the redux store for synchronizing the data and subscribe to changes till the session is reloaded
	- Use shareReplay in to cache HTTP response data till refreshing

## Todos
- Lazy loading routes
- Angular material
- Angular animations while routing
- Testing in angular
- Resolver with the redux store ?