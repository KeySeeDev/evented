# eventer.js
Javascript events without any DOM overheat
Inspired by WordPress hooks system and jQuery

# Roadmap
- [ ] namespacing : es. triggering "updated" will trigger "updated.namespace"
- [ ] refactoring : there is always space to improvement!
- [ ] once : trigger the function or filter just once
- [x] context : assing a context to the run function
- [x] async : we can trigger events without locking current script
- [x] stopPropagation : stop further events from running
- [x] priority : set function priority just like in wordpress
- [x] debug : console log events and action perfomed
- [x] filter system : triggers and events and passes the result allowing changing value
- [x] failure handler : every action is run in try-catch mode so the chain wont be broken
- [x] trigger system : event listner core concept

# So what we can do?
This library will allow you to trigger custom events and filter data in kinda WordPress fashion!

### Do actions, the output will not be changed
First we need to declare listeners

`Eventer.on('test', function(e,a, b,c, d,e, f,g) {console.log(e,a,b,c, d,e, f,g);});`

`Eventer.on('test', function(e,a, b,c, d,e, f,g) {console.log('Second', e,a, b,c, d,e, f,g);});`

`Eventer.on('test', function() {console.log(arguments);});`

And than we can run a trigger which will execute the code by triggering

`Eventer.trigger('test', [1,2,3,4,5,6]);`


 
### Do action and change the output (or FILTER)
First we need to declare listeners

`Eventer.add_filter('test', function(data) {data.addme += 2; return data;});`

`Eventer.add_filter('test', function(data) {data.addme += 5; return data;});`

And than we can run a trigger which will execute the code by triggering

`Eventer.filter('test', [{addme: 5, deleteme: true}]);`

### Events / filters priority
Sometimes you need to perform action before others.
Every event added will have a priority set. The default value is 50.
If that space is already occupied it will become priority 51 or greater until a free slot is found.

`Eventer.on('test', function() {}, 50);`

You can overwrite any event by forcing priority like this:

`Eventer.on('test', function() {}, 50, true);`


### Debugging?
Set `Eventer.debug = true;` to see what is happening under the hood ;)

### How to stopEventPropagation?
To stop event propagation set `Eventer.stop = true;` and no further action will be triggered.
(Maybe in conflict with async functions, cos it's a shared value, for now).

### Trigger in async mode (testing)
Sometimes we need to keep the current workflow stable and don't want to lock the current workflow.
Se we can send the event(not filter) to background trought.setTimeout() and that function will be executed as soon as possible probably at the end of all the others. This function is still under research and just an idea...and may be removed.
`Eventer.trigger(name, args, context, async, is_filter)`
