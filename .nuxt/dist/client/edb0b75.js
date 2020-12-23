(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{192:function(t,e,r){"use strict";r.d(e,"h",(function(){return o})),r.d(e,"b",(function(){return c})),r.d(e,"f",(function(){return l})),r.d(e,"g",(function(){return d})),r.d(e,"i",(function(){return m})),r.d(e,"a",(function(){return f})),r.d(e,"e",(function(){return v})),r.d(e,"c",(function(){return h})),r.d(e,"d",(function(){return w}));var n=r(60),o=function(t){return Object(n.b)({method:"GET",url:"/api/articles",params:t})},c=function(t){return Object(n.b)({method:"POST",url:"/api/articles/".concat(t,"/favorite")})},l=function(t){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t,"/favorite")})},d=function(t){return Object(n.b)({method:"GET",url:"/api/articles/".concat(t)})},m=function(t){return Object(n.b)({method:"GET",url:"/api/articles/".concat(t,"/comments")})},f=function(t,data){return Object(n.b)({method:"POST",url:"/api/articles/".concat(t,"/comments"),data:data})},v=function(t,e){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t,"/comments/").concat(e)})},h=function(data){return Object(n.b)({method:"POST",url:"/api/articles",data:data})},w=function(t){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t)})}},274:function(t,e,r){"use strict";r.r(e);r(79),r(30);var n=r(3),article=(r(31),r(13),r(59),r(192)),o={middleware:"authenticated",name:"EditorIndex",data:function(){return{article:{title:"",description:"",body:"",tagList:""},errors:[]}},mounted:function(){if(this.$route.params.article){var article=this.$route.params.article;console.log(article),0!==Object.keys(article).length&&(this.article=article)}},methods:{onSubmit:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var data,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.article.tagList=t.article.tagList.split(","),e.next=4,Object(article.c)({article:t.article});case 4:data=e.sent,r=data.data.article.slug,t.$router.push({name:"article",params:{slug:r}}),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.dir(e.t0),t.errors=e.t0.response.data.errors;case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))()}}},c=r(23),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"editor-page"},[r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-10 offset-md-1 col-xs-12"},[r("ul",{staticClass:"error-messages"},[t._l(t.errors,(function(e,n){return t._l(e,(function(e,o){return r("li",{key:o},[t._v("\n              "+t._s(n)+" "+t._s(e)+"\n            ")])}))}))],2),t._v(" "),r("form",[r("fieldset",[r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.article.title,expression:"article.title"}],staticClass:"form-control form-control-lg",attrs:{type:"text",placeholder:"Article Title"},domProps:{value:t.article.title},on:{input:function(e){e.target.composing||t.$set(t.article,"title",e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.article.description,expression:"article.description"}],staticClass:"form-control",attrs:{type:"text",placeholder:"What's this article about?"},domProps:{value:t.article.description},on:{input:function(e){e.target.composing||t.$set(t.article,"description",e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.article.body,expression:"article.body"}],staticClass:"form-control",attrs:{rows:"8",placeholder:"Write your article (in markdown)"},domProps:{value:t.article.body},on:{input:function(e){e.target.composing||t.$set(t.article,"body",e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.article.tagList,expression:"article.tagList"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter tags"},domProps:{value:t.article.tagList},on:{input:function(e){e.target.composing||t.$set(t.article,"tagList",e.target.value)}}}),t._v(" "),r("div",{staticClass:"tag-list"})]),t._v(" "),r("button",{staticClass:"btn btn-lg pull-xs-right btn-primary",attrs:{type:"button"},on:{click:t.onSubmit}},[t._v("\n              Publish Article\n            ")])])])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);