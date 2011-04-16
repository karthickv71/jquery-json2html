/**
 * This jQuery plugin builds html from the json representation of html dom.
 * Copyright (C) 2011 Rustam Bogubaev
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function($) {
    jQuery.jsonToHtml = function(json) {
        var methods = {
            processAttribute:function(element, name, value) {
                element.setAttribute(name, value);
            },
            processArray:function(parent, name, value) {
                // empty tag
                if (value.length == 0) {
                    methods.processObject(parent, name, null);
                    return;
                }

                for (var i = 0; i < value.length; i++) {
                    methods.processObject(parent, name, value[i]);
                }
            },
            processObject:function(parent, name, obj) {
                var element = document.createElement(name);

                for (var a in obj) {
                    if (!obj.hasOwnProperty(a)) {
                        continue;
                    }

                    var value = obj[a];

                    if (methods.isString(value)) {
                        methods.processAttribute(element, a, value);
                    } else if (methods.isObject(value)) {
                        methods.processObject(element, a, value);
                    } else if (methods.isArray(value)) {
                        methods.processArray(element, a, value);
                    }
                }

                if (parent != null) {
                    parent.appendChild(element);
                }
            },
            isArray:function(o) {
                return o.constructor === ([]).constructor;
            },
            isObject:function (o) {
                return o.constructor === (new Object()).constructor;
            },
            isString:function(o) {
                return o.constructor === (new String()).constructor;
            },
            isNumber:function(v) {
                return v.constructor === (new Number()).constructor;
            }
        };

        var holder = document.createElement("holder");

        for (var attribute in json) {
            if (json.hasOwnProperty(attribute)) {
                var value = json[attribute];

                if (methods.isArray(value)) {
                    methods.processArray(holder, attribute, value);
                } else if (methods.isObject(value)) {
                    methods.processObject(holder, attribute, value);
                }
            }
        }

        return $(holder).html();
    };
})(jQuery);
