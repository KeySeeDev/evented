var Eventer = {
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
        if (typeof Eventer.events[name] != 'object')
            Eventer.events[name] = {};
        if (!overwrite_priority) {
            priority = !!priority ? priority : 50;
            while (typeof Eventer.events[name][priority] == 'function') {
                priority++;
            }
        }
        Eventer.events[name][priority] = funct;
        if (this.debug) {
            console.log('Eventer.on', arguments);
        }
        return Eventer;
    },
    off: function (name, priority) {
        (priority ? delete Eventer.events[name][priority] : delete Eventer.events[name])
    },
    /*
     * Do actions, the output will not be changed
     Eventer.on('test', function(e,a,b,c,d,e,f,g) { console.log(e,a,b,c,d,e,f,g);});
     Eventer.trigger('test', [1,2,3,4,5,6]);
     */
    trigger: function (name, args, context, async, is_filter) {
        Eventer._run_functions(false, name, args, context, async, is_filter);
        if (this.debug) {
            console.log('Eventer.trigger', arguments);
        }
    },
    /*
     * Do action and change the output
     Eventer.add_filter('test', function(data) { data.addme += 2; return data; });
     Eventer.filter('test', [{addme: 5, deleteme: true}]);
     */
    filter: function (name, args, context) {
        return (Eventer.has_filters(name) ? Eventer._run_functions(true, name, args, context, false, true) : args[0]);
        if (this.debug) {
            console.log('Eventer.filter', arguments);
        }
    },
    has_filters: function (name) {
        for (var key in Eventer.filters[name]) {
            return true;
        }
        return false;
    },
    add_filter: function (name, funct, priority, overwrite_priority) {
        if (typeof Eventer.filters[name] != 'object')
            Eventer.filters[name] = {};
        if (!overwrite_priority) {
            priority = !!priority ? priority : 50;
            while (typeof Eventer.filters[name][priority] == 'function') {
                priority++;
            }
        }
        Eventer.filters[name][priority] = funct;
        if (this.debug) {
            console.log('Eventer.add_filter', arguments);
        }
    },
    remove_filter: function (name, priority) {
        (priority ? delete Eventer.filters[name][priority] : delete Eventer.filters[name]);
        if (this.debug) {
            console.log('Eventer.remove_filter', arguments);
        }
        return true;
    },
    _run_functions: function (is_filter, name, args, context, async) {
        Eventer.stop = false;
        var Type = is_filter ? Eventer.filters : Eventer.events;
        if (Type[name]) {
            if (typeof args == 'undefined') {
                args = [];
            }
            if (is_filter == false) {
                args.unshift({type: 'eventer'});
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
                            if (Eventer.stop == false) {
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
