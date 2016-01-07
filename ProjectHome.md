This jQuery plugin builds html from the json representation of html dom.

Here is a sample usage:

```
var json = {
    br:new Array(3),
    form:{
        action:"http://code.google.com/hosting/search",
        method:"get",
        input:[
            {
                type:"text",
                name:"q",
                value:"jquery"
            },
            {
                type:"submit",
                value:"search"
            }
        ]
    }
};

var html = jQuery.jsonToHtml(json);
jQuery("#generated-html-container").html(html);
```

P.S.
I have not decided yet how to nicely represent `<h1>` like tags in json (text nodes) and cdata nodes, so if you have any ideas please let me know.