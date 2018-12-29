# eventer.js
Javascript events witouth any DOM overheat

## So what we can do?


### Do actions, the output will not be changed
First we need to declare listners

`Eventer.on('test', function(e,a,b,c,d,e,f,g) { console.log(e,a,b,c,d,e,f,g);});`

`Eventer.on('test', function(e,a,b,c,d,e,f,g) { console.log('Second',e,a,b,c,d,e,f,g);});`

`Eventer.on('test', function() { console.log(arguments);});`

And than we can run a trigger wich will execute the code buy triggering

`Eventer.trigger('test', [1,2,3,4,5,6]);`


     
### Do action and change the output (or FILTER)
First we need to declare listners

`Eventer.add_filter('test', function(data) { data.addme += 2; return data; });`

`Eventer.add_filter('test', function(data) { data.addme += 5; return data; });`

And than we can run a trigger wich will execute the code buy triggering

`Eventer.filter('test', [{addme: 5, deleteme: true}]);`

### Events / filters priority
Sometimes you need to perform action before others.
Every event added will have a priority set. The default value is 50.
If that space is alredy occupied it will become priority 51 or greater until a free slot is found.

`Eventer.on('test', function() {}, 50);`

You can overwrite any event by forcing priority like this:

`Eventer.on('test', function() {}, 50, true);`


### Debugging?
Set Eventer.debug = true; to see what is happening under the hood ;)


## TODO
- [ ] namespacing : es. triggering "updated" will trigger "updated.namespace"
- [ ] refactoring : there is always space to improvement!
- [ ] once : trigger the function or filter just once
- [x] priority: set function priority just like in wordpress
- [x] debug : console log events and action perfomed
- [x] filter system : triggers and events and passes the result allowing to change value
- [x] failure handler : every action is run in try-catch mode so the chain wont be broken
- [x] trigger system : event listner core concept
