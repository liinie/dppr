(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(t,e,a){t.exports=a.p+"static/media/spaceship.57a23070.svg"},function(t){t.exports=[{id:1,name:"Alber",score:[10,20,30]},{id:2,name:"Bob",score:[10,20,30]},{id:3,name:"Colbert",score:[10,20,30]},{id:4,name:"Dave",score:[10,20,30]},{id:5,name:"Ella",score:[10,20,30]},{id:6,name:"Felix",score:[10,20,30]},{id:7,name:"Gabriel",score:[10,20,30]},{id:8,name:"Hilbert",score:[10,20,30]},{id:9,name:"Iron",score:[10,20,30]},{id:10,name:"Jack",score:[10,20,30]}]},function(t,e,a){t.exports=a.p+"static/media/negative_sound.dad0bcc7.mp3"},function(t,e,a){t.exports=a.p+"static/media/positive_sound.13559345.mp3"},,function(t,e,a){t.exports=a(24)},,,,,function(t,e,a){},,function(t,e,a){},,function(t,e,a){"use strict";a.r(e);var i=a(14),o=a(1),n=a(2),s=a(3),r=a(5),c=a(4),h=a(6),l=a(0),u=a.n(l),p=a(9),d=a.n(p),b=(a(20),a(10)),f=a.n(b),m=(a(22),function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return u.a.createElement("div",{className:"App"},u.a.createElement("header",{className:"App-header"},u.a.createElement("img",{src:f.a,className:"App-logo",alt:"logo"}),u.a.createElement("div",{className:"empty_space"}," "),u.a.createElement("p",null,"Enter Spaceship game")))}}]),e}(l.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var v=a(11),g=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this;return this.props.totalStep>0&&this.props.totalStep%10===0&&u.a.createElement("div",null,u.a.createElement("h2",{className:"steps"}," Ranking board after total step of ",this.props.totalStep),v.map(function(e){return u.a.createElement("div",null,u.a.createElement("li",null,e.id,": ",e.name," ",e.score.map(function(e,a){if(a===t.props.totalStep/10-1)return u.a.createElement("div",null,e)})))}))}}]),e}(l.Component),y=a(12),S=a.n(y),O=a(13),j=a.n(O),T=a(7),k={position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"},X={zIndex:2,position:"absolute",top:0,bottom:0,transition:"transform .3s ease-out",WebkitTransition:"-webkit-transform .3s ease-out",willChange:"transform",overflowY:"auto"},E={position:"absolute",top:0,left:0,right:0,bottom:0,overflowY:"auto",WebkitOverflowScrolling:"touch",transition:"left .3s ease-out, right .3s ease-out"},W={zIndex:1,position:"fixed",top:0,left:0,right:0,bottom:0,opacity:0,visibility:"hidden",transition:"opacity .3s ease-out, visibility .3s ease-out",backgroundColor:"rgba(0,0,0,.3)"},C={zIndex:1,position:"fixed",top:0,bottom:0},w=function(t){function e(t){var a;return Object(n.a)(this,e),(a=Object(r.a)(this,Object(c.a)(e).call(this,t))).state={sidebarWidth:t.defaultSidebarWidth,touchIdentifier:null,touchStartX:null,touchCurrentX:null,dragSupported:!1},a.overlayClicked=a.overlayClicked.bind(Object(o.a)(Object(o.a)(a))),a.onTouchStart=a.onTouchStart.bind(Object(o.a)(Object(o.a)(a))),a.onTouchMove=a.onTouchMove.bind(Object(o.a)(Object(o.a)(a))),a.onTouchEnd=a.onTouchEnd.bind(Object(o.a)(Object(o.a)(a))),a.onScroll=a.onScroll.bind(Object(o.a)(Object(o.a)(a))),a.saveSidebarRef=a.saveSidebarRef.bind(Object(o.a)(Object(o.a)(a))),a}return Object(h.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){var t=/iPad|iPhone|iPod/.test(navigator?navigator.userAgent:"");this.setState({dragSupported:"object"===typeof window&&"ontouchstart"in window&&!t}),this.saveSidebarWidth()}},{key:"componentDidUpdate",value:function(){this.isTouching()||this.saveSidebarWidth()}},{key:"onTouchStart",value:function(t){if(!this.isTouching()){var e=t.targetTouches[0];this.setState({touchIdentifier:e.identifier,touchStartX:e.clientX,touchCurrentX:e.clientX})}}},{key:"onTouchMove",value:function(t){if(this.isTouching())for(var e=0;e<t.targetTouches.length;e++)if(t.targetTouches[e].identifier===this.state.touchIdentifier){this.setState({touchCurrentX:t.targetTouches[e].clientX});break}}},{key:"onTouchEnd",value:function(){if(this.isTouching()){var t=this.touchSidebarWidth();(this.props.open&&t<this.state.sidebarWidth-this.props.dragToggleDistance||!this.props.open&&t>this.props.dragToggleDistance)&&this.props.onSetOpen(!this.props.open),this.setState({touchIdentifier:null,touchStartX:null,touchCurrentX:null})}}},{key:"onScroll",value:function(){this.isTouching()&&this.inCancelDistanceOnScroll()&&this.setState({touchIdentifier:null,touchStartX:null,touchCurrentX:null})}},{key:"inCancelDistanceOnScroll",value:function(){return this.props.pullRight?Math.abs(this.state.touchCurrentX-this.state.touchStartX)<20:Math.abs(this.state.touchStartX-this.state.touchCurrentX)<20}},{key:"isTouching",value:function(){return null!==this.state.touchIdentifier}},{key:"overlayClicked",value:function(){this.props.open&&this.props.onSetOpen(!1)}},{key:"saveSidebarWidth",value:function(){var t=this.sidebar.offsetWidth;t!==this.state.sidebarWidth&&this.setState({sidebarWidth:t})}},{key:"saveSidebarRef",value:function(t){this.sidebar=t}},{key:"touchSidebarWidth",value:function(){return this.props.pullRight?this.props.open&&window.innerWidth-this.state.touchStartX<this.state.sidebarWidth?this.state.touchCurrentX>this.state.touchStartX?this.state.sidebarWidth+this.state.touchStartX-this.state.touchCurrentX:this.state.sidebarWidth:Math.min(window.innerWidth-this.state.touchCurrentX,this.state.sidebarWidth):this.props.open&&this.state.touchStartX<this.state.sidebarWidth?this.state.touchCurrentX>this.state.touchStartX?this.state.sidebarWidth:this.state.sidebarWidth-this.state.touchStartX+this.state.touchCurrentX:Math.min(this.state.touchCurrentX,this.state.sidebarWidth)}},{key:"render",value:function(){var t,e=Object(T.a)({},X,this.props.styles.sidebar),a=Object(T.a)({},E,this.props.styles.content),i=Object(T.a)({},W,this.props.styles.overlay),o=this.state.dragSupported&&this.props.touch,n=this.isTouching(),s={className:this.props.rootClassName,style:Object(T.a)({},k,this.props.styles.root),role:"navigation",id:this.props.rootId},r=this.props.shadow&&(n||this.props.open||this.props.docked);if(this.props.pullRight?(e.right=0,e.transform="translateX(100%)",e.WebkitTransform="translateX(100%)",r&&(e.boxShadow="-2px 2px 4px rgba(0, 0, 0, 0.15)")):(e.left=0,e.transform="translateX(-100%)",e.WebkitTransform="translateX(-100%)",r&&(e.boxShadow="2px 2px 4px rgba(0, 0, 0, 0.15)")),n){var c=this.touchSidebarWidth()/this.state.sidebarWidth;this.props.pullRight?(e.transform="translateX(".concat(100*(1-c),"%)"),e.WebkitTransform="translateX(".concat(100*(1-c),"%)")):(e.transform="translateX(-".concat(100*(1-c),"%)"),e.WebkitTransform="translateX(-".concat(100*(1-c),"%)")),i.opacity=c,i.visibility="visible"}else this.props.docked?(0!==this.state.sidebarWidth&&(e.transform="translateX(0%)",e.WebkitTransform="translateX(0%)"),this.props.pullRight?a.right="".concat(this.state.sidebarWidth,"px"):a.left="".concat(this.state.sidebarWidth,"px")):this.props.open&&(e.transform="translateX(0%)",e.WebkitTransform="translateX(0%)",i.opacity=1,i.visibility="visible");if(!n&&this.props.transitions||(e.transition="none",e.WebkitTransition="none",a.transition="none",i.transition="none"),o)if(this.props.open)s.onTouchStart=this.onTouchStart,s.onTouchMove=this.onTouchMove,s.onTouchEnd=this.onTouchEnd,s.onTouchCancel=this.onTouchEnd,s.onScroll=this.onScroll;else{var h=Object(T.a)({},C,this.props.styles.dragHandle);h.width=this.props.touchHandleWidth,this.props.pullRight?h.right=0:h.left=0,t=u.a.createElement("div",{style:h,onTouchStart:this.onTouchStart,onTouchMove:this.onTouchMove,onTouchEnd:this.onTouchEnd,onTouchCancel:this.onTouchEnd})}return u.a.createElement("div",s,u.a.createElement("div",{className:this.props.sidebarClassName,style:e,ref:this.saveSidebarRef,id:this.props.sidebarId},this.props.sidebar),u.a.createElement("div",{className:this.props.overlayClassName,style:i,onClick:this.overlayClicked,id:this.props.overlayId}),u.a.createElement("div",{className:this.props.contentClassName,style:a,id:this.props.contentId},t,this.props.children))}}]),e}(l.Component);w.defaultProps={docked:!1,open:!1,transitions:!0,touch:!0,touchHandleWidth:20,pullRight:!1,shadow:!0,dragToggleDistance:30,onSetOpen:function(){},styles:{},defaultSidebarWidth:0};var x=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return u.a.createElement("div",{className:"square"},this.props.value)}}]),e}(u.a.Component),I=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this,e=Array(6).fill().map(function(t){return Array(6).fill()}).map(function(e,a){return u.a.createElement("tr",{key:"row_"+a},e.map(function(e,i){return a===t.props.current_state_row&&i===t.props.current_state_col?u.a.createElement(x,{value:"X"}):a===t.props.end_state_row&&i===t.props.end_state_col?u.a.createElement(x,{value:"O"}):u.a.createElement(x,{value:""})}))});return u.a.createElement("div",{style:{textAlign:"center"}},u.a.createElement("div",{style:{margin:"auto",width:"40%"}},u.a.createElement("table",{cellSpacing:"0"},u.a.createElement("tbody",null,e))),u.a.createElement("br",null))}}]),e}(u.a.Component),N=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this.props.score<=0?"red":"green";return u.a.createElement("p",null,"Your score is:",u.a.createElement("span",{style:{color:t}}," ",this.props.score))}}]),e}(u.a.Component);u.a.Component,u.a.Component;d.a.render(u.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[15,2,1]]]);
//# sourceMappingURL=main.53dff1ee.chunk.js.map