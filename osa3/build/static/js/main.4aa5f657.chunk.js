(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{38:function(n,e,t){},39:function(n,e,t){"use strict";t.r(e);var c=t(0),a=t(1),o=t(15),r=t.n(o),i=t(5),u=t(3),s=function(n){return Object(c.jsx)("form",{children:Object(c.jsxs)("div",{children:["filter shown with",Object(c.jsx)("input",{value:n.newName,onChange:n.handlePerson})]})})},d=function(n){return Object(c.jsxs)("form",{onSubmit:n.addName,children:[Object(c.jsxs)("div",{children:["name:",Object(c.jsx)("input",{value:n.newName,onChange:n.handlePerson})]}),Object(c.jsxs)("div",{children:["number:",Object(c.jsx)("input",{value:n.newNumber,onChange:n.handleNumber})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},l=t(4),f=t.n(l),j="/api/persons",b=function(){return f.a.get(j).then((function(n){return n.data}))},h=function(n){return f.a.post(j,n).then((function(n){return n.data}))},m=function(n,e){return f.a.put("".concat(j,"/").concat(n),e).then((function(n){return n.data}))},O=function(n){return f.a.delete("".concat(j,"/").concat(n)).then((function(n){return n.data}))},p=function(n){var e=n.message;return null===e?null:Object(c.jsx)("div",{className:"error",children:e})},v=(t(38),function(n){var e=n.person,t=n.painaa,a=(e.name,"delete");return Object(c.jsxs)("div",{children:[e.name," ",e.number,Object(c.jsx)("button",{onClick:t,children:a})]})}),x=function(){var n=Object(a.useState)([]),e=Object(u.a)(n,2),t=e[0],o=e[1],r=Object(a.useState)(""),l=Object(u.a)(r,2),f=l[0],j=l[1],x=Object(a.useState)(""),w=Object(u.a)(x,2),g=w[0],N=w[1],S=Object(a.useState)(""),k=Object(u.a)(S,2),y=k[0],P=k[1],C=Object(a.useState)(!0),T=Object(u.a)(C,2),J=T[0],D=(T[1],Object(a.useState)(null)),E=Object(u.a)(D,2),I=E[0],A=E[1];Object(a.useEffect)((function(){b().then((function(n){o(n)}))}),[]);var B=J?t:t.filter((function(n){return n.name})),q=t.find((function(n){return n.name===f}));return!0===t.map((function(n){return n.name})).includes(f)&&!1===t.map((function(n){return n.id})).includes(f.id)&&(console.log(q.id),function(n){"http://localhost:3001/persons/".concat(n);var e=t.find((function(e){return e.id===n})),c=Object(i.a)(Object(i.a)({},e),{},{number:g});window.confirm(e.name+" is already added to phonebook, replace the old number with new one?")&&(m(n,c),window.location.reload().then(A(" ".concat(e.name," is updated"))).then(setTimeout((function(){A(null)}),2500)).then((function(e){o(t.map((function(t){return t.id!==n?t:e})))})).catch((function(c){o(t.filter((function(e){return e.id!==n}))),A("Information of ".concat(e.name," has already been removed from server")),setTimeout((function(){A(null)}),2500)})))}(q.id)),Object(c.jsxs)("div",{children:[Object(c.jsx)(p,{message:I}),Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(s,{newName:y,handlePerson:function(n){P(n.target.value)}}),Object(c.jsx)("h3",{children:"Add a new"}),Object(c.jsx)(d,{addName:function(n){n.preventDefault();var e={name:f,number:g,id:t.length+1};h(e).then(A("Note '".concat(f,"' added to phonebook"))).then(setTimeout((function(){A(null)}),5e3)).then((function(n){o(t.concat(n)),j(""),N("")})).catch((function(n){var e=JSON.stringify(n.response.data.error);A(e),console.log(n.response.data.error)}))},newName:f,handlePerson:function(n){console.log(n.target.value),j(n.target.value)},newNumber:g,handleNumber:function(n){console.log(n.target.value),N(n.target.value)}}),Object(c.jsx)("h2",{children:"Numbers"}),B.filter((function(n){return n.name.includes(y)})).map((function(n,e){return Object(c.jsx)(v,{person:n,painaa:function(){return function(n){"http://localhost:3001/persons/".concat(n);var e=t.find((function(e){return e.id===n}));Object(i.a)(Object(i.a)({},e),{},{important:e.important}),window.confirm("Delete "+e.name+" ?")&&(O(n).then(A(" ".concat(e.name," is deleted"))).then(setTimeout((function(){A(null)}),5e3)).then((function(e){o(t.map((function(t){return t.id!==n?t:e})))})).catch((function(e){o(t.filter((function(e){return e.id!==n})))})),window.location.reload())}(n.id)}},e)}))]})};r.a.render(Object(c.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.4aa5f657.chunk.js.map