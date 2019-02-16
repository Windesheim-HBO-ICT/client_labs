/*!

 handlebars v3.0.3

 Copyright (C) 2011-2014 by Yehuda Katz

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 @license
 */
(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define(factory);
    else if(typeof exports === 'object')
        exports["Handlebars"] = factory();
    else
        root["Handlebars"] = factory();
})(this, function() {
    return /******/ (function(modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {};

        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {

            /******/ 		// Check if module is in cache
            /******/ 		if(installedModules[moduleId])
            /******/ 			return installedModules[moduleId].exports;

            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			exports: {},
                /******/ 			id: moduleId,
                /******/ 			loaded: false
                /******/ 		};

            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

            /******/ 		// Flag the module as loaded
            /******/ 		module.loaded = true;

            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/ 	}


        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules;

        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules;

        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = "";

        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(0);
        /******/ })
    /************************************************************************/
    /******/ ([
        /* 0 */
        /***/ function(module, exports, __webpack_require__) {

            'use strict';

            var _interopRequireWildcard = __webpack_require__(7)['default'];

            exports.__esModule = true;

            var _import = __webpack_require__(1);

            var base = _interopRequireWildcard(_import);

            // Each of these augment the Handlebars object. No need to setup here.
            // (This is done to easily share code between commonjs and browse envs)

            var _SafeString = __webpack_require__(2);

            var _SafeString2 = _interopRequireWildcard(_SafeString);

            var _Exception = __webpack_require__(3);

            var _Exception2 = _interopRequireWildcard(_Exception);

            var _import2 = __webpack_require__(4);

            var Utils = _interopRequireWildcard(_import2);

            var _import3 = __webpack_require__(5);

            var runtime = _interopRequireWildcard(_import3);

            var _noConflict = __webpack_require__(6);

            var _noConflict2 = _interopRequireWildcard(_noConflict);

            // For compatibility and usage outside of module systems, make the Handlebars object a namespace
            function create() {
                var hb = new base.HandlebarsEnvironment();

                Utils.extend(hb, base);
                hb.SafeString = _SafeString2['default'];
                hb.Exception = _Exception2['default'];
                hb.Utils = Utils;
                hb.escapeExpression = Utils.escapeExpression;

                hb.VM = runtime;
                hb.template = function (spec) {
                    return runtime.template(spec, hb);
                };

                return hb;
            }

            var inst = create();
            inst.create = create;

            _noConflict2['default'](inst);

            inst['default'] = inst;

            exports['default'] = inst;
            module.exports = exports['default'];

            /***/ },
        /* 1 */
        /***/ function(module, exports, __webpack_require__) {

            'use strict';

            var _interopRequireWildcard = __webpack_require__(7)['default'];

            exports.__esModule = true;
            exports.HandlebarsEnvironment = HandlebarsEnvironment;
            exports.createFrame = createFrame;

            var _import = __webpack_require__(4);

            var Utils = _interopRequireWildcard(_import);

            var _Exception = __webpack_require__(3);

            var _Exception2 = _interopRequireWildcard(_Exception);

            var VERSION = '3.0.1';
            exports.VERSION = VERSION;
            var COMPILER_REVISION = 6;

            exports.COMPILER_REVISION = COMPILER_REVISION;
            var REVISION_CHANGES = {
                1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
                2: '== 1.0.0-rc.3',
                3: '== 1.0.0-rc.4',
                4: '== 1.x.x',
                5: '== 2.0.0-alpha.x',
                6: '>= 2.0.0-beta.1'
            };

            exports.REVISION_CHANGES = REVISION_CHANGES;
            var isArray = Utils.isArray,
                isFunction = Utils.isFunction,
                toString = Utils.toString,
                objectType = '[object Object]';

            function HandlebarsEnvironment(helpers, partials) {
                this.helpers = helpers || {};
                this.partials = partials || {};

                registerDefaultHelpers(this);
            }

            HandlebarsEnvironment.prototype = {
                constructor: HandlebarsEnvironment,

                logger: logger,
                log: log,

                registerHelper: function registerHelper(name, fn) {
                    if (toString.call(name) === objectType) {
                        if (fn) {
                            throw new _Exception2['default']('Arg not supported with multiple helpers');
                        }
                        Utils.extend(this.helpers, name);
                    } else {
                        this.helpers[name] = fn;
                    }
                },
                unregisterHelper: function unregisterHelper(name) {
                    delete this.helpers[name];
                },

                registerPartial: function registerPartial(name, partial) {
                    if (toString.call(name) === objectType) {
                        Utils.extend(this.partials, name);
                    } else {
                        if (typeof partial === 'undefined') {
                            throw new _Exception2['default']('Attempting to register a partial as undefined');
                        }
                        this.partials[name] = partial;
                    }
                },
                unregisterPartial: function unregisterPartial(name) {
                    delete this.partials[name];
                }
            };

            function registerDefaultHelpers(instance) {
                instance.registerHelper('helperMissing', function () {
                    if (arguments.length === 1) {
                        // A missing field in a {{foo}} constuct.
                        return undefined;
                    } else {
                        // Someone is actually trying to call something, blow up.
                        throw new _Exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
                    }
                });

                instance.registerHelper('blockHelperMissing', function (context, options) {
                    var inverse = options.inverse,
                        fn = options.fn;

                    if (context === true) {
                        return fn(this);
                    } else if (context === false || context == null) {
                        return inverse(this);
                    } else if (isArray(context)) {
                        if (context.length > 0) {
                            if (options.ids) {
                                options.ids = [options.name];
                            }

                            return instance.helpers.each(context, options);
                        } else {
                            return inverse(this);
                        }
                    } else {
                        if (options.data && options.ids) {
                            var data = createFrame(options.data);
                            data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
                            options = { data: data };
                        }

                        return fn(context, options);
                    }
                });

                instance.registerHelper('each', function (context, options) {
                    if (!options) {
                        throw new _Exception2['default']('Must pass iterator to #each');
                    }

                    var fn = options.fn,
                        inverse = options.inverse,
                        i = 0,
                        ret = '',
                        data = undefined,
                        contextPath = undefined;

                    if (options.data && options.ids) {
                        contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
                    }

                    if (isFunction(context)) {
                        context = context.call(this);
                    }

                    if (options.data) {
                        data = createFrame(options.data);
                    }

                    function execIteration(field, index, last) {
                        if (data) {
                            data.key = field;
                            data.index = index;
                            data.first = index === 0;
                            data.last = !!last;

                            if (contextPath) {
                                data.contextPath = contextPath + field;
                            }
                        }

                        ret = ret + fn(context[field], {
                                data: data,
                                blockParams: Utils.blockParams([context[field], field], [contextPath + field, null])
                            });
                    }

                    if (context && typeof context === 'object') {
                        if (isArray(context)) {
                            for (var j = context.length; i < j; i++) {
                                execIteration(i, i, i === context.length - 1);
                            }
                        } else {
                            var priorKey = undefined;

                            for (var key in context) {
                                if (context.hasOwnProperty(key)) {
                                    // We're running the iterations one step out of sync so we can detect
                                    // the last iteration without have to scan the object twice and create
                                    // an itermediate keys array.
                                    if (priorKey) {
                                        execIteration(priorKey, i - 1);
                                    }
                                    priorKey = key;
                                    i++;
                                }
                            }
                            if (priorKey) {
                                execIteration(priorKey, i - 1, true);
                            }
                        }
                    }

                    if (i === 0) {
                        ret = inverse(this);
                    }

                    return ret;
                });

                instance.registerHelper('if', function (conditional, options) {
                    if (isFunction(conditional)) {
                        conditional = conditional.call(this);
                    }

                    // Default behavior is to render the positive path if the value is truthy and not empty.
                    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
                    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
                    if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
                        return options.inverse(this);
                    } else {
                        return options.fn(this);
                    }
                });

                instance.registerHelper('unless', function (conditional, options) {
                    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
                });

                instance.registerHelper('with', function (context, options) {
                    if (isFunction(context)) {
                        context = context.call(this);
                    }

                    var fn = options.fn;

                    if (!Utils.isEmpty(context)) {
                        if (options.data && options.ids) {
                            var data = createFrame(options.data);
                            data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
                            options = { data: data };
                        }

                        return fn(context, options);
                    } else {
                        return options.inverse(this);
                    }
                });

                instance.registerHelper('log', function (message, options) {
                    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
                    instance.log(level, message);
                });

                instance.registerHelper('lookup', function (obj, field) {
                    return obj && obj[field];
                });
            }

            var logger = {
                methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

                // State enum
                DEBUG: 0,
                INFO: 1,
                WARN: 2,
                ERROR: 3,
                level: 1,

                // Can be overridden in the host environment
                log: function log(level, message) {
                    if (typeof console !== 'undefined' && logger.level <= level) {
                        var method = logger.methodMap[level];
                        (console[method] || console.log).call(console, message); // eslint-disable-line no-console
                    }
                }
            };

            exports.logger = logger;
            var log = logger.log;

            exports.log = log;

            function createFrame(object) {
                var frame = Utils.extend({}, object);
                frame._parent = object;
                return frame;
            }

            /* [args, ]options */

            /***/ },
        /* 2 */
        /***/ function(module, exports, __webpack_require__) {

            'use strict';

            exports.__esModule = true;
            // Build out our basic SafeString type
            function SafeString(string) {
                this.string = string;
            }

            SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
                return '' + this.string;
            };

            exports['default'] = SafeString;
            module.exports = exports['default'];

            /***/ },
        /* 3 */
        /***/ function(module, exports, __webpack_require__) {

            'use strict';

            exports.__esModule = true;

            var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

            function Exception(message, node) {
                var loc = node && node.loc,
                    line = undefined,
                    column = undefined;
                if (loc) {
                    line = loc.start.line;
                    column = loc.start.column;

                    message += ' - ' + line + ':' + column;
                }

                var tmp = Error.prototype.constructor.call(this, message);

                // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
                for (var idx = 0; idx < errorProps.length; idx++) {
                    this[errorProps[idx]] = tmp[errorProps[idx]];
                }

                if (Error.captureStackTrace) {
                    Error.captureStackTrace(this, Exception);
                }

                if (loc) {
                    this.lineNumber = line;
                    this.column = column;
                }
            }

            Exception.prototype = new Error();

            exports['default'] = Exception;
            module.exports = exports['default'];

            /***/ },
        /* 4 */
        /***/ function(module, exports, __webpack_require__) {

            'use strict';

            exports.__esModule = true;
            exports.extend = extend;

            // Older IE versions do not directly support indexOf so we must implement our own, sadly.
            exports.indexOf = indexOf;
            exports.escapeExpression = escapeExpression;
            exports.isEmpty = isEmpty;
            exports.blockParams = blockParams;
            exports.appendContextPath = appendContextPath;
            var escape = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                '\'': '&#x27;',
                '`': '&#x60;'
            };

            var badChars = /[&<>"'`]/g,
                possible = /[&<>"'`]/;

            function escapeChar(chr) {
                return escape[chr];
            }

            function extend(obj /* , ...source */) {
                for (var i = 1; i < arguments.length; i++) {
                    for (var key in arguments[i]) {
                        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                            obj[key] = arguments[i][key];
                        }
                    }
                }

                return obj;
            }

            var toString = Object.prototype.toString;

            exports.toString = toString;
            // Sourced from lodash
            // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
            /*eslint-disable func-style, no-var */
            var isFunction = function isFunction(value) {
                return typeof value === 'function';
            };
            // fallback for older versions of Chrome and Safari
            /* istanbul ignore next */
            if (isFunction(/x/)) {
                exports.isFunction = isFunction = function (value) {
                    return typeof value === 'function' && toString.call(value) === '[object Function]';
                };
            }
            var isFunction;
            exports.isFunction = isFunction;
            /*eslint-enable func-style, no-var */

            /* istanbul ignore next */
            var isArray = Array.isArray || function (value) {
                    return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
                };exports.isArray = isArray;

            function indexOf(array, value) {
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] === value) {
                        return i;
                    }
                }
                return -1;
            }

            function escapeExpression(string) {
                if (typeof string !== 'string') {
                    // don't escape SafeStrings, since they're already safe
                    if (string && string.toHTML) {
                        return string.toHTML();
                    } else if (string == null) {
                        return '';
                    } else if (!string) {
                        return string + '';
                    }

                    // Force a string conversion as this will be done by the append regardless and
                    // the regex test will do this transparently behind the scenes, causing issues if
                    // an object's to string has escaped characters in it.
                    string = '' + string;
                }

                if (!possible.test(string)) {
                    return string;
                }
                return string.replace(badChars, escapeChar);
            }

            function isEmpty(value) {
                if (!value && value !== 0) {
                    return true;
                } else if (isArray(value) && value.length === 0) {
                    return true;
                } else {
                    return false;
                }
            }

            function blockParams(params, ids) {
                params.path = ids;
                return params;
            }

            function appendContextPath(contextPath, id) {
                return (contextPath ? contextPath + '.' : '') + id;
            }

            /***/ },
        /* 5 */
        /***/ function(module, exports, __webpack_require__) {

            'use strict';

            var _interopRequireWildcard = __webpack_require__(7)['default'];

            exports.__esModule = true;
            exports.checkRevision = checkRevision;

            // TODO: Remove this line and break up compilePartial

            exports.template = template;
            exports.wrapProgram = wrapProgram;
            exports.resolvePartial = resolvePartial;
            exports.invokePartial = invokePartial;
            exports.noop = noop;

            var _import = __webpack_require__(4);

            var Utils = _interopRequireWildcard(_import);

            var _Exception = __webpack_require__(3);

            var _Exception2 = _interopRequireWildcard(_Exception);

            var _COMPILER_REVISION$REVISION_CHANGES$createFrame = __webpack_require__(1);

            function checkRevision(compilerInfo) {
                var compilerRevision = compilerInfo && compilerInfo[0] || 1,
                    currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;

                if (compilerRevision !== currentRevision) {
                    if (compilerRevision < currentRevision) {
                        var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision],
                            compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
                        throw new _Exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
                    } else {
                        // Use the embedded version info since the runtime doesn't know about this revision yet
                        throw new _Exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
                    }
                }
            }

            function template(templateSpec, env) {
                /* istanbul ignore next */
                if (!env) {
                    throw new _Exception2['default']('No environment passed to template');
                }
                if (!templateSpec || !templateSpec.main) {
                    throw new _Exception2['default']('Unknown template object: ' + typeof templateSpec);
                }

                // Note: Using env.VM references rather than local var references throughout this section to allow
                // for external users to override these as psuedo-supported APIs.
                env.VM.checkRevision(templateSpec.compiler);

                function invokePartialWrapper(partial, context, options) {
                    if (options.hash) {
                        context = Utils.extend({}, context, options.hash);
                    }

                    partial = env.VM.resolvePartial.call(this, partial, context, options);
                    var result = env.VM.invokePartial.call(this, partial, context, options);

                    if (result == null && env.compile) {
                        options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
                        result = options.partials[options.name](context, options);
                    }
                    if (result != null) {
                        if (options.indent) {
                            var lines = result.split('\n');
                            for (var i = 0, l = lines.length; i < l; i++) {
                                if (!lines[i] && i + 1 === l) {
                                    break;
                                }

                                lines[i] = options.indent + lines[i];
                            }
                            result = lines.join('\n');
                        }
                        return result;
                    } else {
                        throw new _Exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
                    }
                }

                // Just add water
                var container = {
                    strict: function strict(obj, name) {
                        if (!(name in obj)) {
                            throw new _Exception2['default']('"' + name + '" not defined in ' + obj);
                        }
                        return obj[name];
                    },
                    lookup: function lookup(depths, name) {
                        var len = depths.length;
                        for (var i = 0; i < len; i++) {
                            if (depths[i] && depths[i][name] != null) {
                                return depths[i][name];
                            }
                        }
                    },
                    lambda: function lambda(current, context) {
                        return typeof current === 'function' ? current.call(context) : current;
                    },

                    escapeExpression: Utils.escapeExpression,
                    invokePartial: invokePartialWrapper,

                    fn: function fn(i) {
                        return templateSpec[i];
                    },

                    programs: [],
                    program: function program(i, data, declaredBlockParams, blockParams, depths) {
                        var programWrapper = this.programs[i],
                            fn = this.fn(i);
                        if (data || depths || blockParams || declaredBlockParams) {
                            programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
                        } else if (!programWrapper) {
                            programWrapper = this.programs[i] = wrapProgram(this, i, fn);
                        }
                        return programWrapper;
                    },

                    data: function data(value, depth) {
                        while (value && depth--) {
                            value = value._parent;
                        }
                        return value;
                    },
                    merge: function merge(param, common) {
                        var obj = param || common;

                        if (param && common && param !== common) {
                            obj = Utils.extend({}, common, param);
                        }

                        return obj;
                    },

                    noop: env.VM.noop,
                    compilerInfo: templateSpec.compiler
                };

                function ret(context) {
                    var options = arguments[1] === undefined ? {} : arguments[1];

                    var data = options.data;

                    ret._setup(options);
                    if (!options.partial && templateSpec.useData) {
                        data = initData(context, data);
                    }
                    var depths = undefined,
                        blockParams = templateSpec.useBlockParams ? [] : undefined;
                    if (templateSpec.useDepths) {
                        depths = options.depths ? [context].concat(options.depths) : [context];
                    }

                    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
                }
                ret.isTop = true;

                ret._setup = function (options) {
                    if (!options.partial) {
                        container.helpers = container.merge(options.helpers, env.helpers);

                        if (templateSpec.usePartial) {
                            container.partials = container.merge(options.partials, env.partials);
                        }
                    } else {
                        container.helpers = options.helpers;
                        container.partials = options.partials;
                    }
                };

                ret._child = function (i, data, blockParams, depths) {
                    if (templateSpec.useBlockParams && !blockParams) {
                        throw new _Exception2['default']('must pass block params');
                    }
                    if (templateSpec.useDepths && !depths) {
                        throw new _Exception2['default']('must pass parent depths');
                    }

                    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
                };
                return ret;
            }

            function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
                function prog(context) {
                    var options = arguments[1] === undefined ? {} : arguments[1];

                    return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
                }
                prog.program = i;
                prog.depth = depths ? depths.length : 0;
                prog.blockParams = declaredBlockParams || 0;
                return prog;
            }

            function resolvePartial(partial, context, options) {
                if (!partial) {
                    partial = options.partials[options.name];
                } else if (!partial.call && !options.name) {
                    // This is a dynamic partial that returned a string
                    options.name = partial;
                    partial = options.partials[partial];
                }
                return partial;
            }

            function invokePartial(partial, context, options) {
                options.partial = true;

                if (partial === undefined) {
                    throw new _Exception2['default']('The partial ' + options.name + ' could not be found');
                } else if (partial instanceof Function) {
                    return partial(context, options);
                }
            }

            function noop() {
                return '';
            }

            function initData(context, data) {
                if (!data || !('root' in data)) {
                    data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
                    data.root = context;
                }
                return data;
            }

            /***/ },
        /* 6 */
        /***/ function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */(function(global) {'use strict';

                exports.__esModule = true;
                /*global window */

                exports['default'] = function (Handlebars) {
                    /* istanbul ignore next */
                    var root = typeof global !== 'undefined' ? global : window,
                        $Handlebars = root.Handlebars;
                    /* istanbul ignore next */
                    Handlebars.noConflict = function () {
                        if (root.Handlebars === Handlebars) {
                            root.Handlebars = $Handlebars;
                        }
                    };
                };

                module.exports = exports['default'];
                /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

            /***/ },
        /* 7 */
        /***/ function(module, exports, __webpack_require__) {

            "use strict";

            exports["default"] = function (obj) {
                return obj && obj.__esModule ? obj : {
                    "default": obj
                };
            };

            exports.__esModule = true;

            /***/ }
        /******/ ])
});
;

/*
 * jQuery global custom event plugin (gevent)
 *
 * Copyright (c) 2013 Michael S. Mikowski
 * (mike[dot]mikowski[at]gmail[dotcom])
 *
 * Dual licensed under the MIT or GPL Version 2
 * http://jquery.org/license
 *
 * Versions
 *  0.1.5 - initial release
 *  0.1.6 - enhanced publishEvent (publish) method pass
 *          a non-array variable as the second argument
 *          to a subscribed function (the first argument
 *          is always the event object).
 *  0.1.7-10, 0.2.0
 *        - documentation changes
 *  1.0.2 - cleaned-up logic, bumped version
 *  1.1.2 - added keywords
 *
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global jQuery*/

(function ( $ ) {
  'use strict';
  $.gevent = (function () {
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
      subscribeEvent, publishEvent, unsubscribeEvent,
      $customSubMap = {}
      ;
    //----------------- END MODULE SCOPE VARIABLES ---------------

    //------------------- BEGIN PUBLIC METHODS -------------------
    // BEGIN public method /publishEvent/
    // Example  :
    //   $.gevent.publish(
    //     'spa-model-msg-receive',
    //     [ { user : 'fred', msg : 'Hi gang' } ]
    //   );
    // Purpose  :
    //   Publish an event with an optional list of arguments
    //   which a subscribed handler will receive after the event object.
    // Arguments (positional)
    //   * 0 ( event_name )  - The global event name
    //   * 1 ( data )        - Optional data to be passed as argument(s)
    //                         to subscribed functions after the event
    //                         object. Provide an array for multiple
    //                         arguments.
    // Throws   : none
    // Returns  : none
    //
    publishEvent = function () {
      var arg_list = [],
        arg_count, event_name,
        event_obj, data, data_list;
  
      arg_list  = arg_list.slice.call( arguments, 0 );
      arg_count = arg_list.length;
  
      if ( arg_count === 0 ) { return false; }
  
      event_name = arg_list.shift();
      event_obj  = $customSubMap[ event_name ];
  
      if ( ! event_obj ) { return false; }
  
      if ( arg_count > 1 ) {
        data      = arg_list.shift();
        data_list = $.isArray( data ) ? data : [ data ];
      }
      else {
        data_list = [];
      }
  
      event_obj.trigger( event_name, data_list );
      return true;
    };
    // END public method /publishEvent/

    // BEGIN public method /subscribeEvent/
    // Example  :
    //   $.gevent.subscribe(
    //     $( '#msg' ),
    //     'spa-msg-receive',
    //     onModelMsgReceive
    //   );
    // Purpose  :
    //   Subscribe a function to a published event on a jQuery collection
    // Arguments (positional)
    //   * 0 ( $collection ) - The jQuery collection on which to bind event
    //   * 1 ( event_name )  - The global event name
    //   * 2 ( fn ) - The function to bound to the event on the collection
    // Throws   : none
    // Returns  : none
    //
    subscribeEvent = function ( $collection, event_name, fn ) {
      $collection.on( event_name, fn );

      if ( $customSubMap[ event_name ] ) {
        $customSubMap[ event_name ]
          = $customSubMap[ event_name ].add( $collection );
      }
      else {
        $customSubMap[ event_name ] = $collection;
      }
    };
    // END public method /subscribeEvent/

    // BEGIN public method /unsubscribeEvent/
    // Example  :
    //   $.gevent.unsubscribe(
    //     $( '#msg' ),
    //     'spa-model-msg-receive'
    //   );
    // Purpose  :
    //   Remove a binding for the named event on a provided collection
    // Arguments (positional)
    //   * 0 ( $collection ) - The jQuery collection on which to bind event
    //   * 1 ( event_name )  - The global event name
    // Throws   : none
    // Returns  : none
    //
    unsubscribeEvent = function ( $collection, event_name ) {
      if ( ! $customSubMap[ event_name ] ){ return false; }

      $customSubMap[ event_name ]
        = $customSubMap[ event_name ].not( $collection );

      if ( $customSubMap[ event_name ].length === 0 ){
        delete $customSubMap[ event_name ];
      }

      return true;
    };
    // END public method /unsubscribeEvent/
    //------------------- END PUBLIC METHODS ---------------------

    // return public methods
    return {
      publish     : publishEvent,
      subscribe   : subscribeEvent,
      unsubscribe : unsubscribeEvent
    };
  }());
}( jQuery ));


/*
 * jQuery plugin for unified mouse and touch events
 *
 * Copyright (c) 2013-2016 Michael S. Mikowski
 * (mike[dot]mikowski[at]gmail[dotcom])
 *
 * Dual licensed under the MIT or GPL Version 2
 * http://jquery.org/license
 *
 * Versions
 *  1.3.x   - Removed all console references
 *          - Change bind to on, unbind to off
 *          - Reinstated ignore_select to ignore text and input areas by default
 *  1.2.x   - ignore_class => ignore_select, now defaults to ''
 *  1.1.9   - Fixed ue-test.html demo to scale properly
 *  1.1.8   - Removed prevent default from non-ue events
 *  1.1.7   - Corrected desktop zoom motion description
 *  1.1.0-5 - No code changes. Updated npm keywords. Fixed typos.
 *            Bumped version to represent maturity and stability.
 *  0.6.1   - Change px_radius from 5 to 10 pixels
 *  0.6.0   - Added px_tdelta_x and px_tdelta_y for deltas from start
 *          - Fixed onheld and drag conflicts
 *  0.5.0   - Updated docs, removed cruft, updated for jslint,
 *            updated test page (zoom)
 *  0.4.3   - Removed fatal execption possibility if originalEvent
 *            is not defined on event object
 *  0.4.2   - Updated documentation
 *  0.3.2   - Updated to jQuery 1.9.1.
 *            Confirmed 1.7.0-1.9.1 compatibility.
 *  0.3.1   - Change for jQuery plugins site
 *  0.3.0   - Initial jQuery plugin site release
 *          - Replaced scrollwheel zoom with drag motion.
 *            This resolved a conflict with scrollable areas.
 *
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,  plusplus : true,    regexp  : true,
  sloppy : true,      vars : false,     white  : true
*/
/*global jQuery */

(function ( $ ) {
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    $Special  = $.event.special,  // Shortcut for special event
    motionMapMap    = {},         // Map of pointer motions by cursor
    isMoveBound     = false,      // Flag if move handlers bound
    pxPinchZoom     = -1,         // Distance between pinch-zoom points
    optionKey       = 'ue_bound', // Data key for storing options
    doDisableMouse  = false,      // Flag to discard mouse input
    defaultOptMap   = {           // Default option map
      bound_ns_map  : {},         // Map of bound namespaces e.g.
                                  // bound_ns_map.utap.fred
      px_radius     : 10,         // Tolerated distance before dragstart
      ignore_select : 'textarea, select, input', // Elements to ignore
      max_tap_ms    : 200,        // Maximum time allowed for tap
      min_held_ms   : 300         // Minimum time require for long-press
    },

    callbackList  = [],           // global callback stack
    zoomMouseNum  = 1,            // multiplier for mouse zoom
    zoomTouchNum  = 4,            // multiplier for touch zoom

    boundList, Ue,
    motionDragId,  motionHeldId, motionDzoomId,
    motion1ZoomId, motion2ZoomId,

    checkMatchVal, removeListVal,  pushUniqVal,   makeListPlus,
    fnHeld,        fnMotionStart,  fnMotionMove,
    fnMotionEnd,   onMouse,        onTouch
    ;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // Begin utiltity /makeListPlus/
  // Returns an array with much desired methods:
  //   * remove_val(value) : remove element that matches
  //     the provided value. Returns number of elements
  //     removed.
  //   * match_val(value)  : shows if a value exists
  //   * push_uniq(value)  : pushes a value onto the stack
  //     iff it does not already exist there
  // Note: the reason I need this is to compare objects to
  //   objects (perhaps jQuery has something similar?)
  checkMatchVal = function ( data ) {
    var match_count = 0, idx;
    for ( idx = this.length; idx; 0 ) {
      if ( this[--idx] === data ) { match_count++; }
    }
    return match_count;
  };
  removeListVal = function ( data ) {
    var removed_count = 0, idx;
    for ( idx = this.length; idx; 0 ) {
      if ( this[--idx] === data ) {
        this.splice(idx, 1);
        removed_count++;
        idx++;
      }
    }
    return removed_count;
  };
  pushUniqVal = function ( data ) {
    if ( checkMatchVal.call(this, data ) ) { return false; }
    this.push( data );
    return true;
  };
  // primary utility
  makeListPlus = function ( input_list ) {
    if ( input_list && $.isArray(input_list) ) {
      if ( input_list.remove_val ) {
        // The array appears to already have listPlus capabilities
        return input_list;
      }
    }
    else {
      input_list = [];
    }
    input_list.remove_val = removeListVal;
    input_list.match_val  = checkMatchVal;
    input_list.push_uniq  = pushUniqVal;

    return input_list;
  };
  // End utility /makeListPlus/
  //-------------------- END UTILITY METHODS -------------------

  //--------------- BEGIN JQUERY SPECIAL EVENTS ----------------
  // Unique array for bound objects
  boundList = makeListPlus();

  // Begin define special event handlers
  /*jslint unparam:true */
  Ue = {
    setup : function( data, name_list, bind_fn ) {
      var
        this_el     = this,
        $to_bind    = $(this_el),
        seen_map    = {},
        option_map, idx, namespace_key, ue_namespace_code, namespace_list
        ;

      // if previous related event bound do not rebind, but do add to
      // type of event bound to this element, if not already noted
      if ( $.data( this, optionKey ) ) { return; }

      option_map = {};
      $.extend( true, option_map, defaultOptMap );
      $.data( this_el, optionKey, option_map );

      namespace_list = makeListPlus(name_list.slice(0));
      if ( ! namespace_list.length
        || namespace_list[0] === ""
      ) { namespace_list = ["000"]; }

      NSPACE_00:
      for ( idx = 0; idx < namespace_list.length; idx++ ) {
        namespace_key = namespace_list[idx];

        if ( ! namespace_key ) { continue NSPACE_00; }
        if ( seen_map.hasOwnProperty(namespace_key) ) { continue NSPACE_00; }

        seen_map[namespace_key] = true;

        ue_namespace_code = '.__ue' + namespace_key;

        $to_bind.on( 'mousedown'  + ue_namespace_code, onMouse  );
        $to_bind.on( 'touchstart' + ue_namespace_code, onTouch );
      }

      boundList.push_uniq( this_el ); // record as bound element

      if ( ! isMoveBound ) {
        // first element bound - adding global binds
        $(document).on( 'mousemove.__ue'   , onMouse );
        $(document).on( 'touchmove.__ue'   , onTouch );
        $(document).on( 'mouseup.__ue'     , onMouse );
        $(document).on( 'touchend.__ue'    , onTouch );
        $(document).on( 'touchcancel.__ue' , onTouch );
        isMoveBound = true;
      }
    },

    // arg_map.type = string - name of event to bind
    // arg_map.data = poly - whatever (optional) data was passed when binding
    // arg_map.namespace = string - A sorted, dot-delimited list of namespaces
    //   specified when binding the event
    // arg_map.handler  = fn - the event handler the developer wishes to be bound
    //   to the event.  This function should be called whenever the event
    //   is triggered
    // arg_map.guid = number - unique ID for event handler, provided by jQuery
    // arg_map.selector = string - selector used by 'delegate' or 'live' jQuery
    //   methods.  Only available when these methods are used.
    //
    // this - the element to which the event handler is being bound
    // this always executes immediate after setup (if first binding)
    add : function ( arg_map ) {
      var
        this_el         = this,
        option_map      = $.data( this_el, optionKey ),
        namespace_str   = arg_map.namespace,
        event_type      = arg_map.type,
        bound_ns_map, namespace_list, idx, namespace_key
        ;
      if ( ! option_map ) { return; }

      bound_ns_map  = option_map.bound_ns_map;

      if ( ! bound_ns_map[event_type] ) {
        // this indicates a non-namespaced entry
        bound_ns_map[event_type] = {};
      }

      if ( ! namespace_str ) { return; }

      namespace_list = namespace_str.split('.');

      for ( idx = 0; idx < namespace_list.length; idx++ ) {
        namespace_key = namespace_list[idx];
        bound_ns_map[event_type][namespace_key] = true;
      }
    },

    remove : function ( arg_map ) {
      var
        elem_bound     = this,
        option_map     = $.data( elem_bound, optionKey ),
        bound_ns_map   = option_map.bound_ns_map,
        event_type     = arg_map.type,
        namespace_str  = arg_map.namespace,
        namespace_list, idx, namespace_key
        ;

      if ( ! bound_ns_map[event_type] ) { return; }

      // No namespace(s) provided:
      // Remove complete record for custom event type (e.g. utap)
      if ( ! namespace_str ) {
        delete bound_ns_map[event_type];
        return;
      }

      // Namespace(s) provided:
      // Remove namespace flags from each custom event typei (e.g. utap)
      // record.  If all claimed namespaces are removed, remove
      // complete record.
      namespace_list = namespace_str.split('.');

      for ( idx = 0; idx < namespace_list.length; idx++ ) {
        namespace_key = namespace_list[idx];
        if (bound_ns_map[event_type][namespace_key]) {
          delete bound_ns_map[event_type][namespace_key];
        }
      }

      if ( $.isEmptyObject( bound_ns_map[event_type] ) ) {
        delete bound_ns_map[event_type];
      }
    },

    teardown : function( name_list ) {
      var
        elem_bound   = this,
        $bound       = $(elem_bound),
        option_map   = $.data( elem_bound, optionKey ),
        bound_ns_map = option_map.bound_ns_map,
        idx, namespace_key, ue_namespace_code, namespace_list
        ;

      // do not tear down if related handlers are still bound
      if ( ! $.isEmptyObject( bound_ns_map ) ) { return; }

      namespace_list = makeListPlus(name_list);
      namespace_list.push_uniq('000');

      NSPACE_01:
      for ( idx = 0; idx < namespace_list.length; idx++ ) {
        namespace_key = namespace_list[idx];

        if ( ! namespace_key ) { continue NSPACE_01; }

        ue_namespace_code = '.__ue' + namespace_key;
        $bound.off( 'mousedown'  + ue_namespace_code );
        $bound.off( 'touchstart' + ue_namespace_code );
        $bound.off( 'mousewheel' + ue_namespace_code );
      }

      $.removeData( elem_bound, optionKey );

      // Unbind document events only after last element element is removed
      boundList.remove_val(this);
      if ( boundList.length === 0 ) {
        // last bound element removed - removing global binds
        $(document).off( 'mousemove.__ue');
        $(document).off( 'touchmove.__ue');
        $(document).off( 'mouseup.__ue');
        $(document).off( 'touchend.__ue');
        $(document).off( 'touchcancel.__ue');
        isMoveBound = false;
      }
    }
  };
  /*jslint unparam:false */
  // End define special event handlers
  //--------------- BEGIN JQUERY SPECIAL EVENTS ----------------

  //------------------ BEGIN MOTION CONTROLS -------------------
  // Begin motion control /fnHeld/
  fnHeld = function ( arg_map ) {
    var
      timestamp    = +new Date(),
      motion_id    = arg_map.motion_id,
      motion_map   = arg_map.motion_map,
      bound_ns_map = arg_map.bound_ns_map,
      event_ue
      ;

    delete motion_map.tapheld_toid;

    if ( ! motion_map.do_allow_held ) { return; }

    motion_map.px_end_x     = motion_map.px_start_x;
    motion_map.px_end_y     = motion_map.px_start_y;
    motion_map.ms_timestop  = timestamp;
    motion_map.ms_elapsed   = timestamp - motion_map.ms_timestart;

    if ( bound_ns_map.uheld ) {
      event_ue = $.Event('uheld');
      $.extend( event_ue, motion_map );
      $(motion_map.elem_bound).trigger(event_ue);
    }

    // remove tracking, as we want no futher action on this motion
    if ( bound_ns_map.uheldstart ) {
      event_ue     = $.Event('uheldstart');
      $.extend( event_ue, motion_map );
      $(motion_map.elem_bound).trigger(event_ue);
      motionHeldId = motion_id;
    }
    else {
      delete motionMapMap[motion_id];
    }
  };
  // End motion control /fnHeld/


  // Begin motion control /fnMotionStart/
  fnMotionStart = function ( arg_map ) {
    var
      motion_id      = arg_map.motion_id,
      event_src      = arg_map.event_src,
      request_dzoom  = arg_map.request_dzoom,

      option_map     = $.data( arg_map.elem, optionKey ),
      bound_ns_map   = option_map.bound_ns_map,
      $target        = $(event_src.target ),
      do_zoomstart   = false,
      motion_map, cb_map, event_ue
      ;

    // this should never happen, but it does
    if ( motionMapMap[ motion_id ] ) { return; }

    // ignore on zoom
    if ( request_dzoom && ! bound_ns_map.uzoomstart ) { return; }

    // :input selector includes text areas
    if ( $target.is( option_map.ignore_select ) ) { return; }

    // Prevent default only after confirming handling this event
    event_src.preventDefault();

    cb_map = callbackList.pop();
    while ( cb_map ) {
      if ( $target.is( cb_map.selector_str )
        || $( arg_map.elem ).is( cb_map.selector_str )
      ) {
        if ( cb_map.callback_match ) {
          cb_map.callback_match( arg_map );
        }
      }
      else {
        if ( cb_map.callback_nomatch ) {
          cb_map.callback_nomatch( arg_map );
        }
      }
      cb_map = callbackList.pop();
    }

    motion_map = {
      do_allow_tap  : bound_ns_map.utap ? true : false,
      do_allow_held : ( bound_ns_map.uheld || bound_ns_map.uheldstart )
        ? true : false,
      elem_bound    : arg_map.elem,
      elem_target   : event_src.target,
      ms_elapsed    : 0,
      ms_timestart  : event_src.timeStamp,
      ms_timestop   : undefined,
      option_map    : option_map,
      orig_target   : event_src.target,
      px_current_x  : event_src.clientX,
      px_current_y  : event_src.clientY,
      px_end_x      : undefined,
      px_end_y      : undefined,
      px_start_x    : event_src.clientX,
      px_start_y    : event_src.clientY,
      timeStamp     : event_src.timeStamp
    };

    motionMapMap[ motion_id ] = motion_map;

    if ( bound_ns_map.uzoomstart ) {
      if ( request_dzoom ) {
        motionDzoomId = motion_id;
      }
      else if ( ! motion1ZoomId ) {
        motion1ZoomId = motion_id;
      }
      else if ( ! motion2ZoomId ) {
        motion2ZoomId = motion_id;
        event_ue = $.Event('uzoomstart');
        do_zoomstart = true;
      }

      if ( do_zoomstart ) {
        event_ue = $.Event( 'uzoomstart' );
        motion_map.px_delta_zoom = 0;
        $.extend( event_ue, motion_map );
        $(motion_map.elem_bound).trigger(event_ue);
        return;
      }
    }

    if ( bound_ns_map.uheld || bound_ns_map.uheldstart ) {
      motion_map.tapheld_toid = setTimeout(
        function() {
          fnHeld({
            motion_id    : motion_id,
            motion_map   : motion_map,
            bound_ns_map : bound_ns_map
          });
        },
        option_map.min_held_ms
      );
    }
  };
  // End motion control /fnMotionStart/

  // Begin motion control /fnMotionMove/
  fnMotionMove  = function ( arg_map ) {
    var
      motion_id   = arg_map.motion_id,
      event_src   = arg_map.event_src,
      do_zoommove = false,

      motion_map,    option_map,  bound_ns_map,
      is_over_rad,   event_ue,    px_pinch_zoom,
      px_delta_zoom, mzoom1_map,  mzoom2_map
      ;

    if ( ! motionMapMap[ motion_id ] ) { return; }

    // Prevent default only after confirming handling this event
    event_src.preventDefault();

    motion_map   = motionMapMap[motion_id];
    option_map   = motion_map.option_map;
    bound_ns_map = option_map.bound_ns_map;

    motion_map.timeStamp    = event_src.timeStamp;
    motion_map.elem_target  = event_src.target;
    motion_map.ms_elapsed   = event_src.timeStamp - motion_map.ms_timestart;

    motion_map.px_delta_x   = event_src.clientX - motion_map.px_current_x;
    motion_map.px_delta_y   = event_src.clientY - motion_map.px_current_y;

    motion_map.px_current_x = event_src.clientX;
    motion_map.px_current_y = event_src.clientY;

    motion_map.px_tdelta_x  = motion_map.px_start_x - event_src.clientX;
    motion_map.px_tdelta_y  = motion_map.px_start_y - event_src.clientY;

    is_over_rad = (
      Math.abs( motion_map.px_tdelta_x ) > option_map.px_radius
      || Math.abs( motion_map.px_tdelta_y ) > option_map.px_radius
    );
    // native event object override
    motion_map.timeStamp    = event_src.timeStamp;

    // disallow held or tap if outside of zone
    if ( is_over_rad ) {
      motion_map.do_allow_tap  = false;
      motion_map.do_allow_held = false;
    }

    // disallow tap if time has elapsed 
    if ( motion_map.ms_elapsed > option_map.max_tap_ms ) {
      motion_map.do_allow_tap = false;
    }

    if ( motion1ZoomId && motion2ZoomId
      && ( motion_id === motion1ZoomId
        || motion_id === motion2ZoomId
    )) {
      motionMapMap[motion_id] = motion_map;
      mzoom1_map = motionMapMap[motion1ZoomId];
      mzoom2_map = motionMapMap[motion2ZoomId];

      px_pinch_zoom = Math.floor(
        Math.sqrt(
            Math.pow((mzoom1_map.px_current_x - mzoom2_map.px_current_x),2)
          + Math.pow((mzoom1_map.px_current_y - mzoom2_map.px_current_y),2)
        ) +0.5
      );

      if ( pxPinchZoom === -1 ) { px_delta_zoom = 0; }
      else { px_delta_zoom = ( px_pinch_zoom - pxPinchZoom ) * zoomTouchNum;}

      // save value for next iteration delta comparison
      pxPinchZoom  = px_pinch_zoom;
      do_zoommove  = true;
    }
    else if ( motionDzoomId === motion_id ) {
      if ( bound_ns_map.uzoommove ) {
        px_delta_zoom = motion_map.px_delta_y * zoomMouseNum;
        do_zoommove = true;
      }
    }

    if ( do_zoommove ){
      event_ue = $.Event('uzoommove');
      motion_map.px_delta_zoom = px_delta_zoom;
      $.extend( event_ue, motion_map );
      $(motion_map.elem_bound).trigger(event_ue);
      return;
    }

    if ( motionHeldId === motion_id ) {
      if ( bound_ns_map.uheldmove ) {
        event_ue = $.Event('uheldmove');
        $.extend( event_ue, motion_map );
        $(motion_map.elem_bound).trigger(event_ue);
      }
      return;
    }

    if ( motionDragId === motion_id ) {
      if ( bound_ns_map.udragmove ) {
        event_ue = $.Event('udragmove');
        $.extend( event_ue, motion_map );
        $(motion_map.elem_bound).trigger(event_ue);
      }
      return;
    }

    if ( bound_ns_map.udragstart
      && motion_map.do_allow_tap  === false
      && motion_map.do_allow_held === false
      && !( motionDragId && motionHeldId )
    ) {
      motionDragId = motion_id;
      event_ue = $.Event('udragstart');
      $.extend( event_ue, motion_map );
      $(motion_map.elem_bound).trigger(event_ue);

      if ( motion_map.tapheld_toid ) {
        clearTimeout(motion_map.tapheld_toid);
        delete motion_map.tapheld_toid;
      }
    }
  };
  // End motion control /fnMotionMove/

  // Begin motion control /fnMotionEnd/
  fnMotionEnd   = function ( arg_map ) {
    var
      motion_id    = arg_map.motion_id,
      event_src    = arg_map.event_src,
      do_zoomend   = false,
      motion_map, option_map, bound_ns_map, event_ue
      ;

    doDisableMouse = false;

    if ( ! motionMapMap[motion_id] ) { return; }

    motion_map   = motionMapMap[motion_id];
    option_map   = motion_map.option_map;
    bound_ns_map = option_map.bound_ns_map;

    motion_map.elem_target  = event_src.target;
    motion_map.ms_elapsed   = event_src.timeStamp - motion_map.ms_timestart;
    motion_map.ms_timestop  = event_src.timeStamp;

    if ( motion_map.px_current_x ) {
      motion_map.px_delta_x   = event_src.clientX - motion_map.px_current_x;
      motion_map.px_delta_y   = event_src.clientY - motion_map.px_current_y;
    }

    motion_map.px_current_x = event_src.clientX;
    motion_map.px_current_y = event_src.clientY;

    motion_map.px_end_x     = event_src.clientX;
    motion_map.px_end_y     = event_src.clientY;

    motion_map.px_tdelta_x  = motion_map.px_start_x - motion_map.px_end_x;
    motion_map.px_tdelta_y  = motion_map.px_start_y - motion_map.px_end_y;

    // native event object override
    motion_map.timeStamp    = event_src.timeStamp
    ;

    // clear-out any long-hold tap timer
    if ( motion_map.tapheld_toid ) {
      clearTimeout(motion_map.tapheld_toid);
      delete motion_map.tapheld_toid;
    }

    // trigger utap
    if ( bound_ns_map.utap
      && motion_map.ms_elapsed <= option_map.max_tap_ms
      && motion_map.do_allow_tap
    ) {
      event_ue = $.Event('utap');
      $.extend( event_ue, motion_map );
      $(motion_map.elem_bound).trigger(event_ue);
    }

    // trigger udragend
    if ( motion_id === motionDragId ) {
      if ( bound_ns_map.udragend ) {
        event_ue = $.Event('udragend');
        $.extend( event_ue, motion_map );
        $(motion_map.elem_bound).trigger(event_ue);
      }
      motionDragId = undefined;
    }

    // trigger heldend
    if ( motion_id === motionHeldId ) {
      if ( bound_ns_map.uheldend ) {
        event_ue = $.Event('uheldend');
        $.extend( event_ue, motion_map );
        $(motion_map.elem_bound).trigger(event_ue);
      }
      motionHeldId = undefined;
    }

    // trigger uzoomend
    if ( motion_id === motionDzoomId ) {
      do_zoomend = true;
      motionDzoomId = undefined;
    }

    // cleanup zoom info
    else if ( motion_id === motion1ZoomId ) {
      if ( motion2ZoomId ) {
        motion1ZoomId = motion2ZoomId;
        motion2ZoomId = undefined;
        do_zoomend = true;
      }
      else { motion1ZoomId = undefined; }
      pxPinchZoom  = -1;
    }
    if ( motion_id === motion2ZoomId ) {
      motion2ZoomId = undefined;
      pxPinchZoom  = -1;
      do_zoomend   = true;
    }

    if ( do_zoomend && bound_ns_map.uzoomend ) {
      event_ue = $.Event('uzoomend');
      motion_map.px_delta_zoom = 0;
      $.extend( event_ue, motion_map );
      $(motion_map.elem_bound).trigger(event_ue);
    }
    // remove pointer from consideration
    delete motionMapMap[motion_id];
  };
  // End motion control /fnMotionEnd/
  //------------------ END MOTION CONTROLS -------------------

 //------------------- BEGIN EVENT HANDLERS -------------------
  // Begin event handler /onTouch/ for all touch events.
  // We use the 'type' attribute to dispatch to motion control
  onTouch = function ( event ) {
    var
      this_el     = this,
      timestamp   = +new Date(),
      o_event     = event.originalEvent,
      touch_list  = o_event ? o_event.changedTouches || [] : [],
      touch_count = touch_list.length,
      idx, touch_event, motion_id, handler_fn
      ;

    doDisableMouse = true;

    event.timeStamp = timestamp;

    switch ( event.type ) {
      case 'touchstart' : handler_fn = fnMotionStart; break;
      case 'touchmove'  : handler_fn = fnMotionMove;  break;
      case 'touchend'    :
      case 'touchcancel' : handler_fn = fnMotionEnd;   break;
      default : handler_fn = null;
    }

    if ( ! handler_fn ) { return; }

    for ( idx = 0; idx < touch_count; idx++ ) {
      touch_event  = touch_list[idx];

      motion_id = 'touch' + String(touch_event.identifier);

      event.clientX   = touch_event.clientX;
      event.clientY   = touch_event.clientY;
      handler_fn({
        elem      : this_el,
        motion_id : motion_id,
        event_src : event
      });
    }
  };
  // End event handler /onTouch/


  // Begin event handler /onMouse/ for all mouse events
  // We use the 'type' attribute to dispatch to motion control
  onMouse = function ( event ) {
    var
      this_el       = this,
      motion_id     = 'mouse' + String(event.button),
      request_dzoom = false,
      handler_fn
      ;

    if ( doDisableMouse ) {
      event.stopImmediatePropagation();
      return;
    }

    if ( event.shiftKey ) { request_dzoom  =  true; }

    // skip left or middle clicks
    if ( event.type !== 'mousemove' ) {
      if ( event.button !== 0 ) { return true; }
    }

    switch ( event.type ) {
      case 'mousedown' : handler_fn = fnMotionStart; break;
      case 'mouseup'   : handler_fn = fnMotionEnd;   break;
      case 'mousemove' : handler_fn = fnMotionMove;  break;
      default          : handler_fn = null;
    }

    if ( ! handler_fn ) { return; }

    handler_fn({
      elem          : this_el,
      event_src     : event,
      request_dzoom : request_dzoom,
      motion_id     : motion_id
    });
  };
  // End event handler /onMouse/
  //-------------------- END EVENT HANDLERS --------------------

  // Export special events through jQuery API
  $Special.ue
    = $Special.utap       = $Special.uheld
    = $Special.uzoomstart = $Special.uzoommove = $Special.uzoomend
    = $Special.udragstart = $Special.udragmove = $Special.udragend
    = $Special.uheldstart = $Special.uheldmove = $Special.uheldend
    = Ue
    ;
  $.ueSetGlobalCb = function ( selector_str, callback_match, callback_nomatch ) {
    callbackList.push( {
      selector_str     : selector_str     || '',
      callback_match   : callback_match   || null,
      callback_nomatch : callback_nomatch || null
    });
  };
}(jQuery));

/*

 Software License Agreement (BSD License)
 http://taffydb.com
 Copyright (c)
 All rights reserved.


 Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following condition is met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */

/*jslint        browser : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 500,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
*/

// BUILD 193d48d, modified by mmikowski to pass jslint

// Setup TAFFY name space to return an object with methods
var TAFFY, exports, T;
(function () {
  'use strict';
  var
    typeList,     makeTest,     idx,    typeKey,
    version,      TC,           idpad,  cmax,
    API,          protectJSON,  each,   eachin,
    isIndexable,  returnFilter, runFilters,
    numcharsplit, orderByCol,   run,    intersection,
    filter,       makeCid,      safeForJson,
    isRegexp, sortArgs
    ;
    
    
  if ( ! TAFFY ){
    // TC = Counter for Taffy DBs on page, used for unique IDs
    // cmax = size of charnumarray conversion cache
    // idpad = zeros to pad record IDs with
    version = '2.7';
    TC      = 1;
    idpad   = '000000';
    cmax    = 1000;
    API     = {};

    sortArgs = function(args) {
      var v = Array.prototype.slice.call(args);
      return v.sort();
    }

    protectJSON = function ( t ) {
      // ****************************************
      // *
      // * Takes: a variable
      // * Returns: the variable if object/array or the parsed variable if JSON
      // *
      // ****************************************  
      if ( TAFFY.isArray( t ) || TAFFY.isObject( t ) ){
        return t;
      }
      else {
        return JSON.parse( t );
      }
    };
    
    // gracefully stolen from underscore.js
    intersection = function(array1, array2) {
        return filter(array1, function(item) {
          return array2.indexOf(item) >= 0;
        });
    };

    // gracefully stolen from underscore.js
    filter = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (Array.prototype.filter && obj.filter === Array.prototype.filter) return obj.filter(iterator, context);
        each(obj, function(value, index, list) {
          if (iterator.call(context, value, index, list)) results[results.length] = value;
        });
        return results;
    };
    
    isRegexp = function(aObj) {
        return Object.prototype.toString.call(aObj)==='[object RegExp]';
    }
    
    safeForJson = function(aObj) {
        var myResult = T.isArray(aObj) ? [] : T.isObject(aObj) ? {} : null;
        if(aObj===null) return aObj;
        for(var i in aObj) {
            myResult[i]  = isRegexp(aObj[i]) ? aObj[i].toString() : T.isArray(aObj[i]) || T.isObject(aObj[i]) ? safeForJson(aObj[i]) : aObj[i];
        }
        return myResult;
    }
    
    makeCid = function(aContext) {
        var myCid = JSON.stringify(aContext);
        if(myCid.match(/regex/)===null) return myCid;
        return JSON.stringify(safeForJson(aContext));
    }
    
    each = function ( a, fun, u ) {
      var r, i, x, y;
      // ****************************************
      // *
      // * Takes:
      // * a = an object/value or an array of objects/values
      // * f = a function
      // * u = optional flag to describe how to handle undefined values
      //   in array of values. True: pass them to the functions,
      //   False: skip. Default False;
      // * Purpose: Used to loop over arrays
      // *
      // ****************************************  
      if ( a && ((T.isArray( a ) && a.length === 1) || (!T.isArray( a ))) ){
        fun( (T.isArray( a )) ? a[0] : a, 0 );
      }
      else {
        for ( r, i, x = 0, a = (T.isArray( a )) ? a : [a], y = a.length;
              x < y; x++ )
        {
          i = a[x];
          if ( !T.isUndefined( i ) || (u || false) ){
            r = fun( i, x );
            if ( r === T.EXIT ){
              break;
            }

          }
        }
      }
    };

    eachin = function ( o, fun ) {
      // ****************************************
      // *
      // * Takes:
      // * o = an object
      // * f = a function
      // * Purpose: Used to loop over objects
      // *
      // ****************************************  
      var x = 0, r, i;

      for ( i in o ){
        if ( o.hasOwnProperty( i ) ){
          r = fun( o[i], i, x++ );
          if ( r === T.EXIT ){
            break;
          }
        }
      }

    };

    API.extend = function ( m, f ) {
      // ****************************************
      // *
      // * Takes: method name, function
      // * Purpose: Add a custom method to the API
      // *
      // ****************************************  
      API[m] = function () {
        return f.apply( this, sortArgs(arguments) );
      };
    };

    isIndexable = function ( f ) {
      var i;
      // Check to see if record ID
      if ( T.isString( f ) && /[t][0-9]*[r][0-9]*/i.test( f ) ){
        return true;
      }
      // Check to see if record
      if ( T.isObject( f ) && f.___id && f.___s ){
        return true;
      }

      // Check to see if array of indexes
      if ( T.isArray( f ) ){
        i = true;
        each( f, function ( r ) {
          if ( !isIndexable( r ) ){
            i = false;

            return TAFFY.EXIT;
          }
        });
        return i;
      }

      return false;
    };

    runFilters = function ( r, filter ) {
      // ****************************************
      // *
      // * Takes: takes a record and a collection of filters
      // * Returns: true if the record matches, false otherwise
      // ****************************************
      var match = true;


      each( filter, function ( mf ) {
        switch ( T.typeOf( mf ) ){
          case 'function':
            // run function
            if ( !mf.apply( r ) ){
              match = false;
              return TAFFY.EXIT;
            }
            break;
          case 'array':
            // loop array and treat like a SQL or
            match = (mf.length === 1) ? (runFilters( r, mf[0] )) :
              (mf.length === 2) ? (runFilters( r, mf[0] ) ||
                runFilters( r, mf[1] )) :
                (mf.length === 3) ? (runFilters( r, mf[0] ) ||
                  runFilters( r, mf[1] ) || runFilters( r, mf[2] )) :
                  (mf.length === 4) ? (runFilters( r, mf[0] ) ||
                    runFilters( r, mf[1] ) || runFilters( r, mf[2] ) ||
                    runFilters( r, mf[3] )) : false;
            if ( mf.length > 4 ){
              each( mf, function ( f ) {
                if ( runFilters( r, f ) ){
                  match = true;
                }
              });
            }
            break;
        }
      });

      return match;
    };

    returnFilter = function ( f ) {
      // ****************************************
      // *
      // * Takes: filter object
      // * Returns: a filter function
      // * Purpose: Take a filter object and return a function that can be used to compare
      // * a TaffyDB record to see if the record matches a query
      // ****************************************  
      var nf = [];
      if ( T.isString( f ) && /[t][0-9]*[r][0-9]*/i.test( f ) ){
        f = { ___id : f };
      }
      if ( T.isArray( f ) ){
        // if we are working with an array

        each( f, function ( r ) {
          // loop the array and return a filter func for each value
          nf.push( returnFilter( r ) );
        });
        // now build a func to loop over the filters and return true if ANY of the filters match
        // This handles logical OR expressions
        f = function () {
          var that = this, match = false;
          each( nf, function ( f ) {
            if ( runFilters( that, f ) ){
              match = true;
            }
          });
          return match;
        };
        return f;

      }
      // if we are dealing with an Object
      if ( T.isObject( f ) ){
        if ( T.isObject( f ) && f.___id && f.___s ){
          f = { ___id : f.___id };
        }

        // Loop over each value on the object to prep match type and match value
        eachin( f, function ( v, i ) {

          // default match type to IS/Equals
          if ( !T.isObject( v ) ){
            v = {
              'is' : v
            };
          }
          // loop over each value on the value object  - if any
          eachin( v, function ( mtest, s ) {
            // s = match type, e.g. is, hasAll, like, etc
            var c = [], looper;

            // function to loop and apply filter
            looper = (s === 'hasAll') ?
              function ( mtest, func ) {
                func( mtest );
              } : each;

            // loop over each test
            looper( mtest, function ( mtest ) {

              // su = match success
              // f = match false
              var su = true, f = false, matchFunc;


              // push a function onto the filter collection to do the matching
              matchFunc = function () {

                // get the value from the record
                var
                  mvalue   = this[i],
                  eqeq     = '==',
                  bangeq   = '!=',
                  eqeqeq   = '===',
                  lt   = '<',
                  gt   = '>',
                  lteq   = '<=',
                  gteq   = '>=',
                  bangeqeq = '!==',
                  r
                  ;

                if (typeof mvalue === 'undefined') {
                  return false;
                }
                
                if ( (s.indexOf( '!' ) === 0) && s !== bangeq &&
                  s !== bangeqeq )
                {
                  // if the filter name starts with ! as in '!is' then reverse the match logic and remove the !
                  su = false;
                  s = s.substring( 1, s.length );
                }
                // get the match results based on the s/match type
                /*jslint eqeq : true */
                r = (
                  (s === 'regex') ? (mtest.test( mvalue )) : (s === 'lt' || s === lt)
                  ? (mvalue < mtest)  : (s === 'gt' || s === gt)
                  ? (mvalue > mtest)  : (s === 'lte' || s === lteq)
                  ? (mvalue <= mtest) : (s === 'gte' || s === gteq)
                  ? (mvalue >= mtest) : (s === 'left')
                  ? (mvalue.indexOf( mtest ) === 0) : (s === 'leftnocase')
                  ? (mvalue.toLowerCase().indexOf( mtest.toLowerCase() )
                    === 0) : (s === 'right')
                  ? (mvalue.substring( (mvalue.length - mtest.length) )
                    === mtest) : (s === 'rightnocase')
                  ? (mvalue.toLowerCase().substring(
                    (mvalue.length - mtest.length) ) === mtest.toLowerCase())
                    : (s === 'like')
                  ? (mvalue.indexOf( mtest ) >= 0) : (s === 'likenocase')
                  ? (mvalue.toLowerCase().indexOf(mtest.toLowerCase()) >= 0)
                    : (s === eqeqeq || s === 'is')
                  ? (mvalue ===  mtest) : (s === eqeq)
                  ? (mvalue == mtest) : (s === bangeqeq)
                  ? (mvalue !==  mtest) : (s === bangeq)
                  ? (mvalue != mtest) : (s === 'isnocase')
                  ? (mvalue.toLowerCase
                    ? mvalue.toLowerCase() === mtest.toLowerCase()
                      : mvalue === mtest) : (s === 'has')
                  ? (T.has( mvalue, mtest )) : (s === 'hasall')
                  ? (T.hasAll( mvalue, mtest )) : (s === 'contains')
                  ? (TAFFY.isArray(mvalue) && mvalue.indexOf(mtest) > -1) : (
                    s.indexOf( 'is' ) === -1
                      && !TAFFY.isNull( mvalue )
                      && !TAFFY.isUndefined( mvalue )
                      && !TAFFY.isObject( mtest )
                      && !TAFFY.isArray( mtest )
                    )
                  ? (mtest === mvalue[s])
                    : (T[s] && T.isFunction( T[s] )
                    && s.indexOf( 'is' ) === 0)
                  ? T[s]( mvalue ) === mtest
                    : (T[s] && T.isFunction( T[s] ))
                  ? T[s]( mvalue, mtest ) : (false)
                );
                /*jslint eqeq : false */
                r = (r && !su) ? false : (!r && !su) ? true : r;

                return r;
              };
              c.push( matchFunc );

            });
            // if only one filter in the collection push it onto the filter list without the array
            if ( c.length === 1 ){

              nf.push( c[0] );
            }
            else {
              // else build a function to loop over all the filters and return true only if ALL match
              // this is a logical AND
              nf.push( function () {
                var that = this, match = false;
                each( c, function ( f ) {
                  if ( f.apply( that ) ){
                    match = true;
                  }
                });
                return match;
              });
            }
          });
        });
        // finally return a single function that wraps all the other functions and will run a query
        // where all functions have to return true for a record to appear in a query result
        f = function () {
          var that = this, match = true;
          // faster if less than  4 functions
          match = (nf.length === 1 && !nf[0].apply( that )) ? false :
            (nf.length === 2 &&
              (!nf[0].apply( that ) || !nf[1].apply( that ))) ? false :
              (nf.length === 3 &&
                (!nf[0].apply( that ) || !nf[1].apply( that ) ||
                  !nf[2].apply( that ))) ? false :
                (nf.length === 4 &&
                  (!nf[0].apply( that ) || !nf[1].apply( that ) ||
                    !nf[2].apply( that ) || !nf[3].apply( that ))) ? false
                  : true;
          if ( nf.length > 4 ){
            each( nf, function ( f ) {
              if ( !runFilters( that, f ) ){
                match = false;
              }
            });
          }
          return match;
        };
        return f;
      }

      // if function
      if ( T.isFunction( f ) ){
        return f;
      }
    };

    orderByCol = function ( ar, o ) {
      // ****************************************
      // *
      // * Takes: takes an array and a sort object
      // * Returns: the array sorted
      // * Purpose: Accept filters such as "[col], [col2]" or "[col] desc" and sort on those columns
      // *
      // ****************************************

      var sortFunc = function ( a, b ) {
        // function to pass to the native array.sort to sort an array
        var r = 0;

        T.each( o, function ( sd ) {
          // loop over the sort instructions
          // get the column name
          var o, col, dir, c, d;
          o = sd.split( ' ' );
          col = o[0];

          // get the direction
          dir = (o.length === 1) ? "logical" : o[1];


          if ( dir === 'logical' ){
            // if dir is logical than grab the charnum arrays for the two values we are looking at
            c = numcharsplit( a[col] );
            d = numcharsplit( b[col] );
            // loop over the charnumarrays until one value is higher than the other
            T.each( (c.length <= d.length) ? c : d, function ( x, i ) {
              if ( c[i] < d[i] ){
                r = -1;
                return TAFFY.EXIT;
              }
              else if ( c[i] > d[i] ){
                r = 1;
                return TAFFY.EXIT;
              }
            } );
          }
          else if ( dir === 'logicaldesc' ){
            // if logicaldesc than grab the charnum arrays for the two values we are looking at
            c = numcharsplit( a[col] );
            d = numcharsplit( b[col] );
            // loop over the charnumarrays until one value is lower than the other
            T.each( (c.length <= d.length) ? c : d, function ( x, i ) {
              if ( c[i] > d[i] ){
                r = -1;
                return TAFFY.EXIT;
              }
              else if ( c[i] < d[i] ){
                r = 1;
                return TAFFY.EXIT;
              }
            } );
          }
          else if ( dir === 'asec' && a[col] < b[col] ){
            // if asec - default - check to see which is higher
            r = -1;
            return T.EXIT;
          }
          else if ( dir === 'asec' && a[col] > b[col] ){
            // if asec - default - check to see which is higher
            r = 1;
            return T.EXIT;
          }
          else if ( dir === 'desc' && a[col] > b[col] ){
            // if desc check to see which is lower
            r = -1;
            return T.EXIT;

          }
          else if ( dir === 'desc' && a[col] < b[col] ){
            // if desc check to see which is lower
            r = 1;
            return T.EXIT;

          }
          // if r is still 0 and we are doing a logical sort than look to see if one array is longer than the other
          if ( r === 0 && dir === 'logical' && c.length < d.length ){
            r = -1;
          }
          else if ( r === 0 && dir === 'logical' && c.length > d.length ){
            r = 1;
          }
          else if ( r === 0 && dir === 'logicaldesc' && c.length > d.length ){
            r = -1;
          }
          else if ( r === 0 && dir === 'logicaldesc' && c.length < d.length ){
            r = 1;
          }

          if ( r !== 0 ){
            return T.EXIT;
          }


        } );
        return r;
      };
      // call the sort function and return the newly sorted array
      return (ar && ar.push) ? ar.sort( sortFunc ) : ar;


    };

    // ****************************************
    // *
    // * Takes: a string containing numbers and letters and turn it into an array
    // * Returns: return an array of numbers and letters
    // * Purpose: Used for logical sorting. String Example: 12ABC results: [12,'ABC']
    // **************************************** 
    (function () {
      // creates a cache for numchar conversions
      var cache = {}, cachcounter = 0;
      // creates the numcharsplit function
      numcharsplit = function ( thing ) {
        // if over 1000 items exist in the cache, clear it and start over
        if ( cachcounter > cmax ){
          cache = {};
          cachcounter = 0;
        }

        // if a cache can be found for a numchar then return its array value
        return cache['_' + thing] || (function () {
          // otherwise do the conversion
          // make sure it is a string and setup so other variables
          var nthing = String( thing ),
            na = [],
            rv = '_',
            rt = '',
            x, xx, c;

          // loop over the string char by char
          for ( x = 0, xx = nthing.length; x < xx; x++ ){
            // take the char at each location
            c = nthing.charCodeAt( x );
            // check to see if it is a valid number char and append it to the array.
            // if last char was a string push the string to the charnum array
            if ( ( c >= 48 && c <= 57 ) || c === 46 ){
              if ( rt !== 'n' ){
                rt = 'n';
                na.push( rv.toLowerCase() );
                rv = '';
              }
              rv = rv + nthing.charAt( x );
            }
            else {
              // check to see if it is a valid string char and append to string
              // if last char was a number push the whole number to the charnum array
              if ( rt !== 's' ){
                rt = 's';
                na.push( parseFloat( rv ) );
                rv = '';
              }
              rv = rv + nthing.charAt( x );
            }
          }
          // once done, push the last value to the charnum array and remove the first uneeded item
          na.push( (rt === 'n') ? parseFloat( rv ) : rv.toLowerCase() );
          na.shift();
          // add to cache
          cache['_' + thing] = na;
          cachcounter++;
          // return charnum array
          return na;
        }());
      };
    }());

    // ****************************************
    // *
    // * Runs a query
    // **************************************** 


    run = function () {
      this.context( {
        results : this.getDBI().query( this.context() )
      });

    };

    API.extend( 'filter', function () {
      // ****************************************
      // *
      // * Takes: takes unlimited filter objects as arguments
      // * Returns: method collection
      // * Purpose: Take filters as objects and cache functions for later lookup when a query is run
      // **************************************** 
      var
        nc = TAFFY.mergeObj( this.context(), { run : null } ),
        nq = []
      ;
      each( nc.q, function ( v ) {
        nq.push( v );
      });
      nc.q = nq;
      // Hadnle passing of ___ID or a record on lookup.
      each( sortArgs(arguments), function ( f ) {
        nc.q.push( returnFilter( f ) );
        nc.filterRaw.push( f );
      });

      return this.getroot( nc );
    });

    API.extend( 'order', function ( o ) {
      // ****************************************
      // *
      // * Purpose: takes a string and creates an array of order instructions to be used with a query
      // ****************************************

      o = o.split( ',' );
      var x = [], nc;

      each( o, function ( r ) {
        x.push( r.replace( /^\s*/, '' ).replace( /\s*$/, '' ) );
      });

      nc = TAFFY.mergeObj( this.context(), {sort : null} );
      nc.order = x;

      return this.getroot( nc );
    });

    API.extend( 'limit', function ( n ) {
      // ****************************************
      // *
      // * Purpose: takes a limit number to limit the number of rows returned by a query. Will update the results
      // * of a query
      // **************************************** 
      var nc = TAFFY.mergeObj( this.context(), {}),
        limitedresults
        ;

      nc.limit = n;

      if ( nc.run && nc.sort ){
        limitedresults = [];
        each( nc.results, function ( i, x ) {
          if ( (x + 1) > n ){
            return TAFFY.EXIT;
          }
          limitedresults.push( i );
        });
        nc.results = limitedresults;
      }

      return this.getroot( nc );
    });

    API.extend( 'start', function ( n ) {
      // ****************************************
      // *
      // * Purpose: takes a limit number to limit the number of rows returned by a query. Will update the results
      // * of a query
      // **************************************** 
      var nc = TAFFY.mergeObj( this.context(), {} ),
        limitedresults
        ;

      nc.start = n;

      if ( nc.run && nc.sort && !nc.limit ){
        limitedresults = [];
        each( nc.results, function ( i, x ) {
          if ( (x + 1) > n ){
            limitedresults.push( i );
          }
        });
        nc.results = limitedresults;
      }
      else {
        nc = TAFFY.mergeObj( this.context(), {run : null, start : n} );
      }

      return this.getroot( nc );
    });

    API.extend( 'update', function ( arg0, arg1, arg2 ) {
      // ****************************************
      // *
      // * Takes: a object and passes it off DBI update method for all matched records
      // **************************************** 
      var runEvent = true, o = {}, args = sortArgs(arguments), that;
      if ( TAFFY.isString( arg0 ) &&
        (arguments.length === 2 || arguments.length === 3) )
      {
        o[arg0] = arg1;
        if ( arguments.length === 3 ){
          runEvent = arg2;
        }
      }
      else {
        o = arg0;
        if ( args.length === 2 ){
          runEvent = arg1;
        }
      }

      that = this;
      run.call( this );
      each( this.context().results, function ( r ) {
        var c = o;
        if ( TAFFY.isFunction( c ) ){
          c = c.apply( TAFFY.mergeObj( r, {} ) );
        }
        else {
          if ( T.isFunction( c ) ){
            c = c( TAFFY.mergeObj( r, {} ) );
          }
        }
        if ( TAFFY.isObject( c ) ){
          that.getDBI().update( r.___id, c, runEvent );
        }
      });
      if ( this.context().results.length ){
        this.context( { run : null });
      }
      return this;
    });
    API.extend( 'remove', function ( runEvent ) {
      // ****************************************
      // *
      // * Purpose: removes records from the DB via the remove and removeCommit DBI methods
      // **************************************** 
      var that = this, c = 0;
      run.call( this );
      each( this.context().results, function ( r ) {
        that.getDBI().remove( r.___id );
        c++;
      });
      if ( this.context().results.length ){
        this.context( {
          run : null
        });
        that.getDBI().removeCommit( runEvent );
      }

      return c;
    });


    API.extend( 'count', function () {
      // ****************************************
      // *
      // * Returns: The length of a query result
      // **************************************** 
      run.call( this );
      return this.context().results.length;
    });

    API.extend( 'callback', function ( f, delay ) {
      // ****************************************
      // *
      // * Returns null;
      // * Runs a function on return of run.call
      // **************************************** 
      if ( f ){
        var that = this;
        setTimeout( function () {
          run.call( that );
          f.call( that.getroot( that.context() ) );
        }, delay || 0 );
      }


      return null;
    });

    API.extend( 'get', function () {
      // ****************************************
      // *
      // * Returns: An array of all matching records
      // **************************************** 
      run.call( this );
      return this.context().results;
    });

    API.extend( 'stringify', function () {
      // ****************************************
      // *
      // * Returns: An JSON string of all matching records
      // **************************************** 
      return JSON.stringify( this.get() );
    });
    API.extend( 'first', function () {
      // ****************************************
      // *
      // * Returns: The first matching record
      // **************************************** 
      run.call( this );
      return this.context().results[0] || false;
    });
    API.extend( 'last', function () {
      // ****************************************
      // *
      // * Returns: The last matching record
      // **************************************** 
      run.call( this );
      return this.context().results[this.context().results.length - 1] ||
        false;
    });


    API.extend( 'sum', function () {
      // ****************************************
      // *
      // * Takes: column to sum up
      // * Returns: Sums the values of a column
      // **************************************** 
      var total = 0, that = this;
      run.call( that );
      each( sortArgs(arguments), function ( c ) {
        each( that.context().results, function ( r ) {
          total = total + (r[c] || 0);
        });
      });
      return total;
    });

    API.extend( 'min', function ( c ) {
      // ****************************************
      // *
      // * Takes: column to find min
      // * Returns: the lowest value
      // **************************************** 
      var lowest = null;
      run.call( this );
      each( this.context().results, function ( r ) {
        if ( lowest === null || r[c] < lowest ){
          lowest = r[c];
        }
      });
      return lowest;
    });

    //  Taffy innerJoin Extension (OCD edition)
    //  =======================================
    //
    //  How to Use
    //  **********
    //
    //  left_table.innerJoin( right_table, condition1 <,... conditionN> )
    //
    //  A condition can take one of 2 forms:
    //
    //    1. An ARRAY with 2 or 3 values:
    //    A column name from the left table, an optional comparison string,
    //    and column name from the right table.  The condition passes if the test
    //    indicated is true.   If the condition string is omitted, '===' is assumed.
    //    EXAMPLES: [ 'last_used_time', '>=', 'current_use_time' ], [ 'user_id','id' ]
    //
    //    2. A FUNCTION:
    //    The function receives a left table row and right table row during the
    //    cartesian join.  If the function returns true for the rows considered,
    //    the merged row is included in the result set.
    //    EXAMPLE: function (l,r){ return l.name === r.label; }
    //
    //  Conditions are considered in the order they are presented.  Therefore the best
    //  performance is realized when the least expensive and highest prune-rate
    //  conditions are placed first, since if they return false Taffy skips any
    //  further condition tests.
    //
    //  Other notes
    //  ***********
    //
    //  This code passes jslint with the exception of 2 warnings about
    //  the '==' and '!=' lines.  We can't do anything about that short of
    //  deleting the lines.
    //
    //  Credits
    //  *******
    //
    //  Heavily based upon the work of Ian Toltz.
    //  Revisions to API by Michael Mikowski.
    //  Code convention per standards in http://manning.com/mikowski
    (function () {
      var innerJoinFunction = (function () {
        var fnCompareList, fnCombineRow, fnMain;

        fnCompareList = function ( left_row, right_row, arg_list ) {
          var data_lt, data_rt, op_code, error;

          if ( arg_list.length === 2 ){
            data_lt = left_row[arg_list[0]];
            op_code = '===';
            data_rt = right_row[arg_list[1]];
          }
          else {
            data_lt = left_row[arg_list[0]];
            op_code = arg_list[1];
            data_rt = right_row[arg_list[2]];
          }

          /*jslint eqeq : true */
          switch ( op_code ){
            case '===' :
              return data_lt === data_rt;
            case '!==' :
              return data_lt !== data_rt;
            case '<'   :
              return data_lt < data_rt;
            case '>'   :
              return data_lt > data_rt;
            case '<='  :
              return data_lt <= data_rt;
            case '>='  :
              return data_lt >= data_rt;
            case '=='  :
              return data_lt == data_rt;
            case '!='  :
              return data_lt != data_rt;
            default :
              throw String( op_code ) + ' is not supported';
          }
          // 'jslint eqeq : false'  here results in
          // "Unreachable '/*jslint' after 'return'".
          // We don't need it though, as the rule exception
          // is discarded at the end of this functional scope
        };

        fnCombineRow = function ( left_row, right_row ) {
          var out_map = {}, i, prefix;

          for ( i in left_row ){
            if ( left_row.hasOwnProperty( i ) ){
              out_map[i] = left_row[i];
            }
          }
          for ( i in right_row ){
            if ( right_row.hasOwnProperty( i ) && i !== '___id' &&
              i !== '___s' )
            {
              prefix = !TAFFY.isUndefined( out_map[i] ) ? 'right_' : '';
              out_map[prefix + String( i ) ] = right_row[i];
            }
          }
          return out_map;
        };

        fnMain = function ( table ) {
          var
            right_table, i,
            arg_list = sortArgs(arguments),
            arg_length = arg_list.length,
            result_list = []
            ;

          if ( typeof table.filter !== 'function' ){
            if ( table.TAFFY ){ right_table = table(); }
            else {
              throw 'TAFFY DB or result not supplied';
            }
          }
          else { right_table = table; }

          this.context( {
            results : this.getDBI().query( this.context() )
          } );

          TAFFY.each( this.context().results, function ( left_row ) {
            right_table.each( function ( right_row ) {
              var arg_data, is_ok = true;
              CONDITION:
                for ( i = 1; i < arg_length; i++ ){
                  arg_data = arg_list[i];
                  if ( typeof arg_data === 'function' ){
                    is_ok = arg_data( left_row, right_row );
                  }
                  else if ( typeof arg_data === 'object' && arg_data.length ){
                    is_ok = fnCompareList( left_row, right_row, arg_data );
                  }
                  else {
                    is_ok = false;
                  }

                  if ( !is_ok ){ break CONDITION; } // short circuit
                }

              if ( is_ok ){
                result_list.push( fnCombineRow( left_row, right_row ) );
              }
            } );
          } );
          return TAFFY( result_list )();
        };

        return fnMain;
      }());

      API.extend( 'join', innerJoinFunction );
    }());

    API.extend( 'max', function ( c ) {
      // ****************************************
      // *
      // * Takes: column to find max
      // * Returns: the highest value
      // ****************************************
      var highest = null;
      run.call( this );
      each( this.context().results, function ( r ) {
        if ( highest === null || r[c] > highest ){
          highest = r[c];
        }
      });
      return highest;
    });

    API.extend( 'select', function () {
      // ****************************************
      // *
      // * Takes: columns to select values into an array
      // * Returns: array of values
      // * Note if more than one column is given an array of arrays is returned
      // **************************************** 

      var ra = [], args = sortArgs(arguments);
      run.call( this );
      if ( arguments.length === 1 ){

        each( this.context().results, function ( r ) {

          ra.push( r[args[0]] );
        });
      }
      else {
        each( this.context().results, function ( r ) {
          var row = [];
          each( args, function ( c ) {
            row.push( r[c] );
          });
          ra.push( row );
        });
      }
      return ra;
    });
    API.extend( 'distinct', function () {
      // ****************************************
      // *
      // * Takes: columns to select unique alues into an array
      // * Returns: array of values
      // * Note if more than one column is given an array of arrays is returned
      // **************************************** 
      var ra = [], args = sortArgs(arguments);
      run.call( this );
      if ( arguments.length === 1 ){

        each( this.context().results, function ( r ) {
          var v = r[args[0]], dup = false;
          each( ra, function ( d ) {
            if ( v === d ){
              dup = true;
              return TAFFY.EXIT;
            }
          });
          if ( !dup ){
            ra.push( v );
          }
        });
      }
      else {
        each( this.context().results, function ( r ) {
          var row = [], dup = false;
          each( args, function ( c ) {
            row.push( r[c] );
          });
          each( ra, function ( d ) {
            var ldup = true;
            each( args, function ( c, i ) {
              if ( row[i] !== d[i] ){
                ldup = false;
                return TAFFY.EXIT;
              }
            });
            if ( ldup ){
              dup = true;
              return TAFFY.EXIT;
            }
          });
          if ( !dup ){
            ra.push( row );
          }
        });
      }
      return ra;
    });
    API.extend( 'supplant', function ( template, returnarray ) {
      // ****************************************
      // *
      // * Takes: a string template formated with key to be replaced with values from the rows, flag to determine if we want array of strings
      // * Returns: array of values or a string
      // **************************************** 
      var ra = [];
      run.call( this );
      each( this.context().results, function ( r ) {
        // TODO: The curly braces used to be unescaped
        ra.push( template.replace( /\{([^\{\}]*)\}/g, function ( a, b ) {
          var v = r[b];
          return typeof v === 'string' || typeof v === 'number' ? v : a;
        } ) );
      });
      return (!returnarray) ? ra.join( "" ) : ra;
    });


    API.extend( 'each', function ( m ) {
      // ****************************************
      // *
      // * Takes: a function
      // * Purpose: loops over every matching record and applies the function
      // **************************************** 
      run.call( this );
      each( this.context().results, m );
      return this;
    });
    API.extend( 'map', function ( m ) {
      // ****************************************
      // *
      // * Takes: a function
      // * Purpose: loops over every matching record and applies the function, returing the results in an array
      // **************************************** 
      var ra = [];
      run.call( this );
      each( this.context().results, function ( r ) {
        ra.push( m( r ) );
      });
      return ra;
    });



    T = function ( d ) {
      // ****************************************
      // *
      // * T is the main TAFFY object
      // * Takes: an array of objects or JSON
      // * Returns a new TAFFYDB
      // **************************************** 
      var TOb = [],
        ID = {},
        RC = 1,
        settings = {
          template          : false,
          onInsert          : false,
          onUpdate          : false,
          onRemove          : false,
          onDBChange        : false,
          storageName       : false,
          forcePropertyCase : null,
          cacheSize         : 100,
          name              : ''
        },
        dm = new Date(),
        CacheCount = 0,
        CacheClear = 0,
        Cache = {},
        DBI, runIndexes, root
        ;
      // ****************************************
      // *
      // * TOb = this database
      // * ID = collection of the record IDs and locations within the DB, used for fast lookups
      // * RC = record counter, used for creating IDs
      // * settings.template = the template to merge all new records with
      // * settings.onInsert = event given a copy of the newly inserted record
      // * settings.onUpdate = event given the original record, the changes, and the new record
      // * settings.onRemove = event given the removed record
      // * settings.forcePropertyCase = on insert force the proprty case to be lower or upper. default lower, null/undefined will leave case as is
      // * dm = the modify date of the database, used for query caching
      // **************************************** 


      runIndexes = function ( indexes ) {
        // ****************************************
        // *
        // * Takes: a collection of indexes
        // * Returns: collection with records matching indexed filters
        // **************************************** 

        var records = [], UniqueEnforce = false;

        if ( indexes.length === 0 ){
          return TOb;
        }

        each( indexes, function ( f ) {
          // Check to see if record ID
          if ( T.isString( f ) && /[t][0-9]*[r][0-9]*/i.test( f ) &&
            TOb[ID[f]] )
          {
            records.push( TOb[ID[f]] );
            UniqueEnforce = true;
          }
          // Check to see if record
          if ( T.isObject( f ) && f.___id && f.___s &&
            TOb[ID[f.___id]] )
          {
            records.push( TOb[ID[f.___id]] );
            UniqueEnforce = true;
          }
          // Check to see if array of indexes
          if ( T.isArray( f ) ){
            each( f, function ( r ) {
              each( runIndexes( r ), function ( rr ) {
                records.push( rr );
              });

            });
          }
        });
        if ( UniqueEnforce && records.length > 1 ){
          records = [];
        }

        return records;
      };

      DBI = {
        // ****************************************
        // *
        // * The DBI is the internal DataBase Interface that interacts with the data
        // **************************************** 
        dm           : function ( nd ) {
          // ****************************************
          // *
          // * Takes: an optional new modify date
          // * Purpose: used to get and set the DB modify date
          // **************************************** 
          if ( nd ){
            dm = nd;
            Cache = {};
            CacheCount = 0;
            CacheClear = 0;
          }
          if ( settings.onDBChange ){
            setTimeout( function () {
              settings.onDBChange.call( TOb );
            }, 0 );
          }
          if ( settings.storageName ){
            setTimeout( function () {
              localStorage.setItem( 'taffy_' + settings.storageName,
                JSON.stringify( TOb ) );
            });
          }
          return dm;
        },
        insert       : function ( i, runEvent ) {
          // ****************************************
          // *
          // * Takes: a new record to insert
          // * Purpose: merge the object with the template, add an ID, insert into DB, call insert event
          // **************************************** 
          var columns = [],
            records   = [],
            input     = protectJSON( i )
            ;
          each( input, function ( v, i ) {
            var nv, o;
            if ( T.isArray( v ) && i === 0 ){
              each( v, function ( av ) {

                columns.push( (settings.forcePropertyCase === 'lower')
                  ? av.toLowerCase()
                    : (settings.forcePropertyCase === 'upper')
                  ? av.toUpperCase() : av );
              });
              return true;
            }
            else if ( T.isArray( v ) ){
              nv = {};
              each( v, function ( av, ai ) {
                nv[columns[ai]] = av;
              });
              v = nv;

            }
            else if ( T.isObject( v ) && settings.forcePropertyCase ){
              o = {};

              eachin( v, function ( av, ai ) {
                o[(settings.forcePropertyCase === 'lower') ? ai.toLowerCase()
                  : (settings.forcePropertyCase === 'upper')
                  ? ai.toUpperCase() : ai] = v[ai];
              });
              v = o;
            }

            RC++;
            v.___id = 'T' + String( idpad + TC ).slice( -6 ) + 'R' +
              String( idpad + RC ).slice( -6 );
            v.___s = true;
            records.push( v.___id );
            if ( settings.template ){
              v = T.mergeObj( settings.template, v );
            }
            TOb.push( v );

            ID[v.___id] = TOb.length - 1;
            if ( settings.onInsert &&
              (runEvent || TAFFY.isUndefined( runEvent )) )
            {
              settings.onInsert.call( v );
            }
            DBI.dm( new Date() );
          });
          return root( records );
        },
        sort         : function ( o ) {
          // ****************************************
          // *
          // * Purpose: Change the sort order of the DB itself and reset the ID bucket
          // **************************************** 
          TOb = orderByCol( TOb, o.split( ',' ) );
          ID = {};
          each( TOb, function ( r, i ) {
            ID[r.___id] = i;
          });
          DBI.dm( new Date() );
          return true;
        },
        update       : function ( id, changes, runEvent ) {
          // ****************************************
          // *
          // * Takes: the ID of record being changed and the changes
          // * Purpose: Update a record and change some or all values, call the on update method
          // ****************************************

          var nc = {}, or, nr, tc, hasChange;
          if ( settings.forcePropertyCase ){
            eachin( changes, function ( v, p ) {
              nc[(settings.forcePropertyCase === 'lower') ? p.toLowerCase()
                : (settings.forcePropertyCase === 'upper') ? p.toUpperCase()
                : p] = v;
            });
            changes = nc;
          }

          or = TOb[ID[id]];
          nr = T.mergeObj( or, changes );

          tc = {};
          hasChange = false;
          eachin( nr, function ( v, i ) {
            if ( TAFFY.isUndefined( or[i] ) || or[i] !== v ){
              tc[i] = v;
              hasChange = true;
            }
          });
          if ( hasChange ){
            if ( settings.onUpdate &&
              (runEvent || TAFFY.isUndefined( runEvent )) )
            {
              settings.onUpdate.call( nr, TOb[ID[id]], tc );
            }
            TOb[ID[id]] = nr;
            DBI.dm( new Date() );
          }
        },
        remove       : function ( id ) {
          // ****************************************
          // *
          // * Takes: the ID of record to be removed
          // * Purpose: remove a record, changes its ___s value to false
          // **************************************** 
          TOb[ID[id]].___s = false;
        },
        removeCommit : function ( runEvent ) {
          var x;
          // ****************************************
          // *
          // * 
          // * Purpose: loop over all records and remove records with ___s = false, call onRemove event, clear ID
          // ****************************************
          for ( x = TOb.length - 1; x > -1; x-- ){

            if ( !TOb[x].___s ){
              if ( settings.onRemove &&
                (runEvent || TAFFY.isUndefined( runEvent )) )
              {
                settings.onRemove.call( TOb[x] );
              }
              ID[TOb[x].___id] = undefined;
              TOb.splice( x, 1 );
            }
          }
          ID = {};
          each( TOb, function ( r, i ) {
            ID[r.___id] = i;
          });
          DBI.dm( new Date() );
        },
        query : function ( context ) {
          // ****************************************
          // *
          // * Takes: the context object for a query and either returns a cache result or a new query result
          // **************************************** 
          var returnq, cid, results, indexed, limitq, ni;

          if ( settings.cacheSize ) {
            cid = '';
            each( context.filterRaw, function ( r ) {
              if ( T.isFunction( r ) ){
                cid = 'nocache';
                return TAFFY.EXIT;
              }
            });
            if ( cid === '' ){
              cid = makeCid( T.mergeObj( context,
                {q : false, run : false, sort : false} ) );
            }
          }
          // Run a new query if there are no results or the run date has been cleared
          if ( !context.results || !context.run ||
            (context.run && DBI.dm() > context.run) )
          {
            results = [];

            // check Cache

            if ( settings.cacheSize && Cache[cid] ){

              Cache[cid].i = CacheCount++;
              return Cache[cid].results;
            }
            else {
              // if no filter, return DB
              if ( context.q.length === 0 && context.index.length === 0 ){
                each( TOb, function ( r ) {
                  results.push( r );
                });
                returnq = results;
              }
              else {
                // use indexes

                indexed = runIndexes( context.index );

                // run filters
                each( indexed, function ( r ) {
                  // Run filter to see if record matches query
                  if ( context.q.length === 0 || runFilters( r, context.q ) ){
                    results.push( r );
                  }
                });

                returnq = results;
              }
            }


          }
          else {
            // If query exists and run has not been cleared return the cache results
            returnq = context.results;
          }
          // If a custom order array exists and the run has been clear or the sort has been cleared
          if ( context.order.length > 0 && (!context.run || !context.sort) ){
            // order the results
            returnq = orderByCol( returnq, context.order );
          }

          // If a limit on the number of results exists and it is less than the returned results, limit results
          if ( returnq.length &&
            ((context.limit && context.limit < returnq.length) ||
              context.start)
          ) {
            limitq = [];
            each( returnq, function ( r, i ) {
              if ( !context.start ||
                (context.start && (i + 1) >= context.start) )
              {
                if ( context.limit ){
                  ni = (context.start) ? (i + 1) - context.start : i;
                  if ( ni < context.limit ){
                    limitq.push( r );
                  }
                  else if ( ni > context.limit ){
                    return TAFFY.EXIT;
                  }
                }
                else {
                  limitq.push( r );
                }
              }
            });
            returnq = limitq;
          }

          // update cache
          if ( settings.cacheSize && cid !== 'nocache' ){
            CacheClear++;

            setTimeout( function () {
              var bCounter, nc;
              if ( CacheClear >= settings.cacheSize * 2 ){
                CacheClear = 0;
                bCounter = CacheCount - settings.cacheSize;
                nc = {};
                eachin( function ( r, k ) {
                  if ( r.i >= bCounter ){
                    nc[k] = r;
                  }
                });
                Cache = nc;
              }
            }, 0 );

            Cache[cid] = { i : CacheCount++, results : returnq };
          }
          return returnq;
        }
      };


      root = function () {
        var iAPI, context;
        // ****************************************
        // *
        // * The root function that gets returned when a new DB is created
        // * Takes: unlimited filter arguments and creates filters to be run when a query is called
        // **************************************** 
        // ****************************************
        // *
        // * iAPI is the the method collection valiable when a query has been started by calling dbname
        // * Certain methods are or are not avaliable once you have started a query such as insert -- you can only insert into root
        // ****************************************
        iAPI = TAFFY.mergeObj( TAFFY.mergeObj( API, { insert : undefined } ),
          { getDBI  : function () { return DBI; },
            getroot : function ( c ) { return root.call( c ); },
          context : function ( n ) {
            // ****************************************
            // *
            // * The context contains all the information to manage a query including filters, limits, and sorts
            // **************************************** 
            if ( n ){
              context = TAFFY.mergeObj( context,
                n.hasOwnProperty('results')
                  ? TAFFY.mergeObj( n, { run : new Date(), sort: new Date() })
                  : n
              );
            }
            return context;
          },
          extend  : undefined
        });

        context = (this && this.q) ? this : {
          limit     : false,
          start     : false,
          q         : [],
          filterRaw : [],
          index     : [],
          order     : [],
          results   : false,
          run       : null,
          sort      : null,
          settings  : settings
        };
        // ****************************************
        // *
        // * Call the query method to setup a new query
        // **************************************** 
        each( sortArgs(arguments), function ( f ) {

          if ( isIndexable( f ) ){
            context.index.push( f );
          }
          else {
            context.q.push( returnFilter( f ) );
          }
          context.filterRaw.push( f );
        });


        return iAPI;
      };

      // ****************************************
      // *
      // * If new records have been passed on creation of the DB either as JSON or as an array/object, insert them
      // **************************************** 
      TC++;
      if ( d ){
        DBI.insert( d );
      }


      root.insert = DBI.insert;

      root.merge = function ( i, key, runEvent ) {
        var
          search      = {},
          finalSearch = [],
          obj         = {}
          ;

        runEvent    = runEvent || false;
        key         = key      || 'id';

        each( i, function ( o ) {
          var existingObject;
          search[key] = o[key];
          finalSearch.push( o[key] );
          existingObject = root( search ).first();
          if ( existingObject ){
            DBI.update( existingObject.___id, o, runEvent );
          }
          else {
            DBI.insert( o, runEvent );
          }
        });

        obj[key] = finalSearch;
        return root( obj );
      };

      root.TAFFY = true;
      root.sort = DBI.sort;
      // ****************************************
      // *
      // * These are the methods that can be accessed on off the root DB function. Example dbname.insert;
      // **************************************** 
      root.settings = function ( n ) {
        // ****************************************
        // *
        // * Getting and setting for this DB's settings/events
        // **************************************** 
        if ( n ){
          settings = TAFFY.mergeObj( settings, n );
          if ( n.template ){

            root().update( n.template );
          }
        }
        return settings;
      };

      // ****************************************
      // *
      // * These are the methods that can be accessed on off the root DB function. Example dbname.insert;
      // **************************************** 
      root.store = function ( n ) {
        // ****************************************
        // *
        // * Setup localstorage for this DB on a given name
        // * Pull data into the DB as needed
        // **************************************** 
        var r = false, i;
        if ( localStorage ){
          if ( n ){
            i = localStorage.getItem( 'taffy_' + n );
            if ( i && i.length > 0 ){
              root.insert( i );
              r = true;
            }
            if ( TOb.length > 0 ){
              setTimeout( function () {
                localStorage.setItem( 'taffy_' + settings.storageName,
                  JSON.stringify( TOb ) );
              });
            }
          }
          root.settings( {storageName : n} );
        }
        return root;
      };

      // ****************************************
      // *
      // * Return root on DB creation and start having fun
      // **************************************** 
      return root;
    };
    // ****************************************
    // *
    // * Sets the global TAFFY object
    // **************************************** 
    TAFFY = T;


    // ****************************************
    // *
    // * Create public each method
    // *
    // ****************************************   
    T.each = each;

    // ****************************************
    // *
    // * Create public eachin method
    // *
    // ****************************************   
    T.eachin = eachin;
    // ****************************************
    // *
    // * Create public extend method
    // * Add a custom method to the API
    // *
    // ****************************************   
    T.extend = API.extend;


    // ****************************************
    // *
    // * Creates TAFFY.EXIT value that can be returned to stop an each loop
    // *
    // ****************************************  
    TAFFY.EXIT = 'TAFFYEXIT';

    // ****************************************
    // *
    // * Create public utility mergeObj method
    // * Return a new object where items from obj2
    // * have replaced or been added to the items in
    // * obj1
    // * Purpose: Used to combine objs
    // *
    // ****************************************   
    TAFFY.mergeObj = function ( ob1, ob2 ) {
      var c = {};
      eachin( ob1, function ( v, n ) { c[n] = ob1[n]; });
      eachin( ob2, function ( v, n ) { c[n] = ob2[n]; });
      return c;
    };


    // ****************************************
    // *
    // * Create public utility has method
    // * Returns true if a complex object, array
    // * or taffy collection contains the material
    // * provided in the second argument
    // * Purpose: Used to comare objects
    // *
    // ****************************************
    TAFFY.has = function ( var1, var2 ) {

      var re = false, n;

      if ( (var1.TAFFY) ){
        re = var1( var2 );
        if ( re.length > 0 ){
          return true;
        }
        else {
          return false;
        }
      }
      else {

        switch ( T.typeOf( var1 ) ){
          case 'object':
            if ( T.isObject( var2 ) ){
              eachin( var2, function ( v, n ) {
                if ( re === true && !T.isUndefined( var1[n] ) &&
                  var1.hasOwnProperty( n ) )
                {
                  re = T.has( var1[n], var2[n] );
                }
                else {
                  re = false;
                  return TAFFY.EXIT;
                }
              });
            }
            else if ( T.isArray( var2 ) ){
              each( var2, function ( v, n ) {
                re = T.has( var1, var2[n] );
                if ( re ){
                  return TAFFY.EXIT;
                }
              });
            }
            else if ( T.isString( var2 ) ){
              if ( !TAFFY.isUndefined( var1[var2] ) ){
                return true;
              }
              else {
                return false;
              }
            }
            return re;
          case 'array':
            if ( T.isObject( var2 ) ){
              each( var1, function ( v, i ) {
                re = T.has( var1[i], var2 );
                if ( re === true ){
                  return TAFFY.EXIT;
                }
              });
            }
            else if ( T.isArray( var2 ) ){
              each( var2, function ( v2, i2 ) {
                each( var1, function ( v1, i1 ) {
                  re = T.has( var1[i1], var2[i2] );
                  if ( re === true ){
                    return TAFFY.EXIT;
                  }
                });
                if ( re === true ){
                  return TAFFY.EXIT;
                }
              });
            }
            else if ( T.isString( var2 ) || T.isNumber( var2 ) ){
             re = false;
              for ( n = 0; n < var1.length; n++ ){
                re = T.has( var1[n], var2 );
                if ( re ){
                  return true;
                }
              }
            }
            return re;
          case 'string':
            if ( T.isString( var2 ) && var2 === var1 ){
              return true;
            }
            break;
          default:
            if ( T.typeOf( var1 ) === T.typeOf( var2 ) && var1 === var2 ){
              return true;
            }
            break;
        }
      }
      return false;
    };

    // ****************************************
    // *
    // * Create public utility hasAll method
    // * Returns true if a complex object, array
    // * or taffy collection contains the material
    // * provided in the call - for arrays it must
    // * contain all the material in each array item
    // * Purpose: Used to comare objects
    // *
    // ****************************************
    TAFFY.hasAll = function ( var1, var2 ) {

      var T = TAFFY, ar;
      if ( T.isArray( var2 ) ){
        ar = true;
        each( var2, function ( v ) {
          ar = T.has( var1, v );
          if ( ar === false ){
            return TAFFY.EXIT;
          }
        });
        return ar;
      }
      else {
        return T.has( var1, var2 );
      }
    };


    // ****************************************
    // *
    // * typeOf Fixed in JavaScript as public utility
    // *
    // ****************************************
    TAFFY.typeOf = function ( v ) {
      var s = typeof v;
      if ( s === 'object' ){
        if ( v ){
          if ( typeof v.length === 'number' &&
            !(v.propertyIsEnumerable( 'length' )) )
          {
            s = 'array';
          }
        }
        else {
          s = 'null';
        }
      }
      return s;
    };

    // ****************************************
    // *
    // * Create public utility getObjectKeys method
    // * Returns an array of an objects keys
    // * Purpose: Used to get the keys for an object
    // *
    // ****************************************   
    TAFFY.getObjectKeys = function ( ob ) {
      var kA = [];
      eachin( ob, function ( n, h ) {
        kA.push( h );
      });
      kA.sort();
      return kA;
    };

    // ****************************************
    // *
    // * Create public utility isSameArray
    // * Returns an array of an objects keys
    // * Purpose: Used to get the keys for an object
    // *
    // ****************************************   
    TAFFY.isSameArray = function ( ar1, ar2 ) {
      return (TAFFY.isArray( ar1 ) && TAFFY.isArray( ar2 ) &&
        ar1.join( ',' ) === ar2.join( ',' )) ? true : false;
    };

    // ****************************************
    // *
    // * Create public utility isSameObject method
    // * Returns true if objects contain the same
    // * material or false if they do not
    // * Purpose: Used to comare objects
    // *
    // ****************************************   
    TAFFY.isSameObject = function ( ob1, ob2 ) {
      var T = TAFFY, rv = true;

      if ( T.isObject( ob1 ) && T.isObject( ob2 ) ){
        if ( T.isSameArray( T.getObjectKeys( ob1 ),
          T.getObjectKeys( ob2 ) ) )
        {
          eachin( ob1, function ( v, n ) {
            if ( ! ( (T.isObject( ob1[n] ) && T.isObject( ob2[n] ) &&
              T.isSameObject( ob1[n], ob2[n] )) ||
              (T.isArray( ob1[n] ) && T.isArray( ob2[n] ) &&
                T.isSameArray( ob1[n], ob2[n] )) || (ob1[n] === ob2[n]) )
            ) {
              rv = false;
              return TAFFY.EXIT;
            }
          });
        }
        else {
          rv = false;
        }
      }
      else {
        rv = false;
      }
      return rv;
    };

    // ****************************************
    // *
    // * Create public utility is[DataType] methods
    // * Return true if obj is datatype, false otherwise
    // * Purpose: Used to determine if arguments are of certain data type
    // *
    // * mmikowski 2012-08-06 refactored to make much less "magical":
    // *   fewer closures and passes jslint
    // *
    // ****************************************

    typeList = [
      'String',  'Number', 'Object',   'Array',
      'Boolean', 'Null',   'Function', 'Undefined'
    ];
  
    makeTest = function ( thisKey ) {
      return function ( data ) {
        return TAFFY.typeOf( data ) === thisKey.toLowerCase() ? true : false;
      };
    };
  
    for ( idx = 0; idx < typeList.length; idx++ ){
      typeKey = typeList[idx];
      TAFFY['is' + typeKey] = makeTest( typeKey );
    }
  }
}());

if ( typeof(exports) === 'object' ){
  exports.taffy = TAFFY;
}

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.page=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){
  /* globals require, module */

  'use strict';

  /**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * Detect click event
   */
  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;


  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(/** @type {string} */ (path));
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {string}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) {
      document.addEventListener(clickEvent, onclick, false);
    }
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    document.removeEventListener(clickEvent, onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(/** @type {!string} */ (to));
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */
  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };


  /**
   * Handle "populate" events.
   */

  var onpopstate = (function () {
    var loaded = false;
    if ('undefined' === typeof window) {
      return;
    }
    if (document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else {
        page.show(location.pathname + location.hash, undefined, undefined, false);
      }
    };
  })();
  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    // use shadow dom when available
    var el = e.path ? e.path[0] : e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;

    if (path.indexOf(base) === 0) {
      path = path.substr(base.length);
    }

    if (hashbang) path = path.replace('#!', '');

    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

}).call(this,require('_process'))
},{"_process":2,"path-to-regexp":3}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var suffix = res[6]
    var asterisk = res[7]

    var repeat = suffix === '+' || suffix === '*'
    var optional = suffix === '?' || suffix === '*'
    var delimiter = prefix || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
    }
  }

  return function (obj) {
    var path = ''
    var data = obj || {}

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = encodeURIComponent(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.pattern

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = keys
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

},{"isarray":4}],4:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}]},{},[1])(1)
});