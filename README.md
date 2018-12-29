# eventer
Javascript events witouth any DOM overheat

## So what we can do?


### Do actions, the output will not be changed
First we need to declare listners

`Eventer.on('test', function(e,a,b,c,d,e,f,g) { console.log(e,a,b,c,d,e,f,g);});`
`Eventer.on('test', function() { console.log(arguments);});`

And than we can run a trigger wich will execute the code buy triggering

`Eventer.trigger('test', [1,2,3,4,5,6]);`


     
### Do action and change the output (or FILTER)
First we need to declare listners

`Eventer.add_filter('test', function(data) { data.addme += 2; return data; });`
`Eventer.add_filter('test', function(data) { data.addme += 2; return data; });`

And than we can run a trigger wich will execute the code buy triggering

`Eventer.filter('test', [{addme: 5, deleteme: true}]);`


## TODO
[ ] namespacing
[ ] refactoring
[x] debug
[x] filter system
[x] trigger system
