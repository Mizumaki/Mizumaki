(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[820],{9651:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n(7294)),l=i(n(2717));function i(e){return e&&e.__esModule?e:{default:e}}const o={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function a({res:e,err:t}){return{statusCode:e&&e.statusCode?e.statusCode:t?t.statusCode:404}}class s extends r.default.Component{render(){const{statusCode:e}=this.props,t=this.props.title||o[e]||"An unexpected error has occurred";return r.default.createElement("div",{style:d.error},r.default.createElement(l.default,null,r.default.createElement("title",null,e?`${e}: ${t}`:"Application error: a client-side exception has occurred")),r.default.createElement("div",null,r.default.createElement("style",{dangerouslySetInnerHTML:{__html:"body { margin: 0 }"}}),e?r.default.createElement("h1",{style:d.h1},e):null,r.default.createElement("div",{style:d.desc},r.default.createElement("h2",{style:d.h2},this.props.title||e?t:r.default.createElement(r.default.Fragment,null,"Application error: a client-side exception has occurred (see the browser console for more information)"),"."))))}}s.displayName="ErrorPage",s.getInitialProps=a,s.origGetInitialProps=a,t.default=s;const d={error:{color:"#000",background:"#fff",fontFamily:'-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block",textAlign:"left",lineHeight:"49px",height:"49px",verticalAlign:"middle"},h1:{display:"inline-block",borderRight:"1px solid rgba(0, 0, 0,.3)",margin:0,marginRight:"20px",padding:"10px 23px 10px 0",fontSize:"24px",fontWeight:500,verticalAlign:"top"},h2:{fontSize:"14px",fontWeight:"normal",lineHeight:"inherit",margin:0,padding:0}}},4977:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_error",function(){return n(9651)}])}},function(e){e.O(0,[774,888,179],(function(){return t=4977,e(e.s=t);var t}));var t=e.O();_N_E=t}]);