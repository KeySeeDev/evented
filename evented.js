var Evented = {
    v: 0.1,
    events: {},
    filters: {},
    stop: false,
    debug: false,
    /**
     * Add event handler
     * @param {String} name
     * @param {Function} function {}
     * @param {Int} priority
     * @param {Int} overwrite_priority
     */
    on: function (name, funct, priority, overwrite_priority) {
        if (typeof Evented.events[name] != 'object')
            Evented.events[name] = {};
        if (!overwrite_priority) {
            priority = !!priority ? priority : 50;
            while (typeof Evented.events[name][priority] == 'function') {
                priority++;
            }
        }
        Evented.events[name][priority] = funct;
        if (this.debug) {
            console.log('Evented.on', arguments);
        }
        return Evented;
    },
    off: function (name, priority) {
        (priority ? delete Evented.events[name][priority] : delete Evented.events[name])
    },
    /*
     * Do actions, the output will not be changed
     Evented.on('test', function(e,a,b,c,d,e,f,g) { console.log(e,a,b,c,d,e,f,g);});
     Evented.trigger('test', [1,2,3,4,5,6]);
     */
    trigger: function (name, args, context, async, is_filter) {
        Evented._run_functions(false, name, args, context, async, is_filter);
        if (this.debug) {
            console.log('Evented.trigger', arguments);
        }
    },
    /*
     * Do action and change the output
     Evented.add_filter('test', function(data) { data.addme += 2; return data; });
     Evented.filter('test', [{addme: 5, deleteme: true}]);
     */
    filter: function (name, args, context) {
        return (Evented.has_filters(name) ? Evented._run_functions(true, name, args, context, false, true) : args[0]);
        if (this.debug) {
            console.log('Evented.filter', arguments);
        }
    },
    has_filters: function (name) {
        for (var key in Evented.filters[name]) {
            return true;
        }
        return false;
    },
    add_filter: function (name, funct, priority, overwrite_priority) {
        if (typeof Evented.filters[name] != 'object')
            Evented.filters[name] = {};
        if (!overwrite_priority) {
            priority = !!priority ? priority : 50;
            while (typeof Evented.filters[name][priority] == 'function') {
                priority++;
            }
        }
        Evented.filters[name][priority] = funct;
        if (this.debug) {
            console.log('Evented.add_filter', arguments);
        }
    },
    remove_filter: function (name, priority) {
        (priority ? delete Evented.filters[name][priority] : delete Evented.filters[name]);
        if (this.debug) {
            console.log('Evented.remove_filter', arguments);
        }
        return true;
    },
    _run_functions: function (is_filter, name, args, context, async) {
        Evented.stop = false;
        var Type = is_filter ? Evented.filters : Evented.events;
        if (Type[name]) {
            if (typeof args == 'undefined') {
                args = [];
            }
            if (is_filter == false) {
                args.unshift({type: 'Evented'});
            }
            var keys = Object.keys(Type[name]);
            for (var priority = 0; priority < keys.length; priority++) {
                var the_key = keys[priority];
                if (typeof Type[name][the_key] == 'function') {
                    try {
                        if (async) {
                            setTimeout(function () {
                                Type[name][the_key].apply(context, args);
                            }, 0);
                        } else {
                            if (Evented.stop == false) {
                                if (is_filter) {
                                    filtered = Type[name][the_key].apply(context, args);
                                    if (typeof filtered !== 'undefined') {
                                        args[1] = filtered;
                                    }
                                } else {
                                    Type[name][the_key].apply(context, args);
                                }
                            }
                        }
                    } catch (e) {
                    }
                }
            }
            return is_filter ? args[1] : true;
        }
    }
}
