import{s as b,n as _,c as f}from"./scheduler.c607dd8c.js";import{S as k,i as B,g,h as p,j as y,f as o,k as r,a as x,C,m as E,s as S,n as T,c as j,y as u,o as q}from"./index.0cf6920a.js";import{e as m}from"./AppState.2b05501d.js";function v(c,e,n){const l=c.slice();return l[2]=e[n],l[4]=n,l}function d(c){let e,n=c[2]+"",l,s;return{c(){e=g("div"),l=E(n),s=S(),this.h()},l(t){e=p(t,"DIV",{style:!0,class:!0});var i=y(e);l=T(i,n),s=j(i),i.forEach(o),this.h()},h(){r(e,"style",`transition: transform 0.5s ${2+c[4]*c[4]/100}s, opacity 0.5s ${2+c[4]*c[4]/100}s, color 0.3s 0s, text-shadow 0.3s 0s;`),r(e,"class","svelte-b47aht")},m(t,i){x(t,e,i),u(e,l),u(e,s)},p(t,i){i&1&&n!==(n=t[2]+"")&&q(l,n)},d(t){t&&o(e)}}}function w(c){let e,n,l=m(c[0].split("")),s=[];for(let t=0;t<l.length;t+=1)s[t]=d(v(c,l,t));return{c(){e=g("h2");for(let t=0;t<s.length;t+=1)s[t].c();this.h()},l(t){e=p(t,"H2",{class:!0});var i=y(e);for(let a=0;a<s.length;a+=1)s[a].l(i);i.forEach(o),this.h()},h(){r(e,"class",n=_(`bg-text ${c[1]?"active":""}`)+" svelte-b47aht")},m(t,i){x(t,e,i);for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(e,null)},p(t,[i]){if(i&1){l=m(t[0].split(""));let a;for(a=0;a<l.length;a+=1){const h=v(t,l,a);s[a]?s[a].p(h,i):(s[a]=d(h),s[a].c(),s[a].m(e,null))}for(;a<s.length;a+=1)s[a].d(1);s.length=l.length}i&2&&n!==(n=_(`bg-text ${t[1]?"active":""}`)+" svelte-b47aht")&&r(e,"class",n)},i:f,o:f,d(t){t&&o(e),C(s,t)}}}function D(c,e,n){let{text:l}=e,{active:s=!1}=e;return c.$$set=t=>{"text"in t&&n(0,l=t.text),"active"in t&&n(1,s=t.active)},[l,s]}class z extends k{constructor(e){super(),B(this,e,D,w,b,{text:0,active:1})}}export{z as B};