(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(t,e,a){t.exports=a.p+"static/media/spaceship.79b8702f.svg"},19:function(t){t.exports=[{id:1,name:"Alber",score:[10,190,380,570,760,950,1120,1310,1500]},{id:2,name:"Bob",score:[10,190,380,570,760,930,1110,1290,1480]},{id:3,name:"Colbert",score:[10,190,380,570,740,930,1100,1290,1460]},{id:4,name:"Dave",score:[10,190,380,570,740,930,1100,1270,1420]},{id:5,name:"Ella",score:[10,190,380,570,740,911,1061,1214,1385]},{id:6,name:"Felix",score:[10,190,380,550,740,910,1044,1214,1340]},{id:7,name:"Gabriel",score:[10,190,380,550,740,910,1040,1210,1320]},{id:8,name:"Hilbert",score:[10,190,380,550,740,910,1040,1150,1267]},{id:9,name:"Iron",score:[10,190,361,550,720,910,1020,1130,1220]},{id:10,name:"Jack",score:[10,190,342,532,711,902,1002,1120,1210]}]},20:function(t,e,a){t.exports=a.p+"static/media/negative_sound.dad0bcc7.mp3"},21:function(t,e,a){t.exports=a.p+"static/media/positive_sound.13559345.mp3"},23:function(t,e,a){t.exports=a(35)},28:function(t,e,a){},30:function(t,e,a){},35:function(t,e,a){"use strict";a.r(e);var n=a(2),s=a(3),r=a(5),o=a(4),i=a(6),c=a(0),l=a.n(c),u=a(17),h=a.n(u),p=(a(28),a(38)),d=a(39),m=a(41);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var b=a(18),f=a.n(b),y=(a(30),a(37)),v=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"App-header"},l.a.createElement("img",{src:f.a,className:"App-logo",alt:"logo"}),l.a.createElement("div",{className:"empty_space"}," "),l.a.createElement(y.a,{to:"/main",className:"link"},"Enter Spaceship game")))}}]),e}(c.Component),g=a(22),k=a(8),_=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return l.a.createElement("div",{className:"square"},this.props.value)}}]),e}(l.a.Component),S=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this,e=Array(6).fill().map(function(t){return Array(6).fill()}).map(function(e,a){return l.a.createElement("tr",{key:"row_"+a},e.map(function(e,n){return a===t.props.current_state_row&&n===t.props.current_state_col?l.a.createElement(_,{value:"X"}):a===t.props.end_state_row&&n===t.props.end_state_col?l.a.createElement(_,{value:"O"}):l.a.createElement(_,{value:""})}))});return l.a.createElement("div",{style:{textAlign:"center",paddingLeft:"100px"}},l.a.createElement("div",{style:{margin:"auto",width:"40%"}},l.a.createElement("table",{cellSpacing:"0"},l.a.createElement("tbody",null,e))),l.a.createElement("br",null))}}]),e}(l.a.Component),O=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this.props.score<=0?"red":"green";return l.a.createElement("p",{style:{paddingLeft:"50px"}},"Your score is:",l.a.createElement("span",{style:{color:t}}," ",this.props.score))}}]),e}(l.a.Component),E=a(19),w=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){var t=this;return this.props.totalStep>0&&this.props.totalStep%10===0&&l.a.createElement("div",null,l.a.createElement("b",{className:"steps"}," at total step of ",this.props.totalStep),E.map(function(e){return l.a.createElement("div",null,l.a.createElement("ul",{style:{listStyleType:"none"}},l.a.createElement("li",null,e.id,": ",e.name," ",e.score.map(function(e,a){if(a===t.props.totalStep/10-1)return l.a.createElement("span",null,e)}))))}))}}]),e}(c.Component),j=a(20),T=a.n(j),C=a(21),W=a.n(C),X=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(s.a)(e,[{key:"getLogFile",value:function(){var t=JSON.stringify(this.props.keyPressHist),e=document.createElement("a");e.href="data:text/json;charset=utf-8,"+encodeURIComponent(t),e.target="_blank",e.download="logfile.json",e.click()}},{key:"render",value:function(){return l.a.createElement("div",null,this.getLogFile())}}]),e}(l.a.Component),x=a(12),A={position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"},I={zIndex:2,position:"absolute",top:0,bottom:0,transition:"transform .3s ease-out",WebkitTransition:"-webkit-transform .3s ease-out",willChange:"transform",overflowY:"auto"},N={position:"absolute",top:0,left:0,right:0,bottom:0,overflowY:"auto",WebkitOverflowScrolling:"touch",transition:"left .3s ease-out, right .3s ease-out"},M={zIndex:1,position:"fixed",top:0,left:0,right:0,bottom:0,opacity:0,visibility:"hidden",transition:"opacity .3s ease-out, visibility .3s ease-out",backgroundColor:"rgba(0,0,0,.3)"},P={zIndex:1,position:"fixed",top:0,bottom:0},R=function(t){function e(t){var a;return Object(n.a)(this,e),(a=Object(r.a)(this,Object(o.a)(e).call(this,t))).state={sidebarWidth:t.defaultSidebarWidth,touchIdentifier:null,touchStartX:null,touchCurrentX:null,dragSupported:!1},a.overlayClicked=a.overlayClicked.bind(Object(k.a)(Object(k.a)(a))),a.onTouchStart=a.onTouchStart.bind(Object(k.a)(Object(k.a)(a))),a.onTouchMove=a.onTouchMove.bind(Object(k.a)(Object(k.a)(a))),a.onTouchEnd=a.onTouchEnd.bind(Object(k.a)(Object(k.a)(a))),a.onScroll=a.onScroll.bind(Object(k.a)(Object(k.a)(a))),a.saveSidebarRef=a.saveSidebarRef.bind(Object(k.a)(Object(k.a)(a))),a}return Object(i.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){var t=/iPad|iPhone|iPod/.test(navigator?navigator.userAgent:"");this.setState({dragSupported:"object"===typeof window&&"ontouchstart"in window&&!t}),this.saveSidebarWidth()}},{key:"componentDidUpdate",value:function(){this.isTouching()||this.saveSidebarWidth()}},{key:"onTouchStart",value:function(t){if(!this.isTouching()){var e=t.targetTouches[0];this.setState({touchIdentifier:e.identifier,touchStartX:e.clientX,touchCurrentX:e.clientX})}}},{key:"onTouchMove",value:function(t){if(this.isTouching())for(var e=0;e<t.targetTouches.length;e++)if(t.targetTouches[e].identifier===this.state.touchIdentifier){this.setState({touchCurrentX:t.targetTouches[e].clientX});break}}},{key:"onTouchEnd",value:function(){if(this.isTouching()){var t=this.touchSidebarWidth();(this.props.open&&t<this.state.sidebarWidth-this.props.dragToggleDistance||!this.props.open&&t>this.props.dragToggleDistance)&&this.props.onSetOpen(!this.props.open),this.setState({touchIdentifier:null,touchStartX:null,touchCurrentX:null})}}},{key:"onScroll",value:function(){this.isTouching()&&this.inCancelDistanceOnScroll()&&this.setState({touchIdentifier:null,touchStartX:null,touchCurrentX:null})}},{key:"inCancelDistanceOnScroll",value:function(){return this.props.pullRight?Math.abs(this.state.touchCurrentX-this.state.touchStartX)<20:Math.abs(this.state.touchStartX-this.state.touchCurrentX)<20}},{key:"isTouching",value:function(){return null!==this.state.touchIdentifier}},{key:"overlayClicked",value:function(){this.props.open&&this.props.onSetOpen(!1)}},{key:"saveSidebarWidth",value:function(){var t=this.sidebar.offsetWidth;t!==this.state.sidebarWidth&&this.setState({sidebarWidth:t})}},{key:"saveSidebarRef",value:function(t){this.sidebar=t}},{key:"touchSidebarWidth",value:function(){return this.props.pullRight?this.props.open&&window.innerWidth-this.state.touchStartX<this.state.sidebarWidth?this.state.touchCurrentX>this.state.touchStartX?this.state.sidebarWidth+this.state.touchStartX-this.state.touchCurrentX:this.state.sidebarWidth:Math.min(window.innerWidth-this.state.touchCurrentX,this.state.sidebarWidth):this.props.open&&this.state.touchStartX<this.state.sidebarWidth?this.state.touchCurrentX>this.state.touchStartX?this.state.sidebarWidth:this.state.sidebarWidth-this.state.touchStartX+this.state.touchCurrentX:Math.min(this.state.touchCurrentX,this.state.sidebarWidth)}},{key:"render",value:function(){var t,e=Object(x.a)({},I,this.props.styles.sidebar),a=Object(x.a)({},N,this.props.styles.content),n=Object(x.a)({},M,this.props.styles.overlay),s=this.state.dragSupported&&this.props.touch,r=this.isTouching(),o={className:this.props.rootClassName,style:Object(x.a)({},A,this.props.styles.root),role:"navigation",id:this.props.rootId},i=this.props.shadow&&(r||this.props.open||this.props.docked);if(this.props.pullRight?(e.right=0,e.transform="translateX(100%)",e.WebkitTransform="translateX(100%)",i&&(e.boxShadow="-2px 2px 4px rgba(0, 0, 0, 0.15)")):(e.left=0,e.transform="translateX(-100%)",e.WebkitTransform="translateX(-100%)",i&&(e.boxShadow="2px 2px 4px rgba(0, 0, 0, 0.15)")),r){var c=this.touchSidebarWidth()/this.state.sidebarWidth;this.props.pullRight?(e.transform="translateX(".concat(100*(1-c),"%)"),e.WebkitTransform="translateX(".concat(100*(1-c),"%)")):(e.transform="translateX(-".concat(100*(1-c),"%)"),e.WebkitTransform="translateX(-".concat(100*(1-c),"%)")),n.opacity=c,n.visibility="visible"}else this.props.docked?(0!==this.state.sidebarWidth&&(e.transform="translateX(0%)",e.WebkitTransform="translateX(0%)"),this.props.pullRight?a.right="".concat(this.state.sidebarWidth,"px"):a.left="".concat(this.state.sidebarWidth,"px")):this.props.open&&(e.transform="translateX(0%)",e.WebkitTransform="translateX(0%)",n.opacity=1,n.visibility="visible");if(!r&&this.props.transitions||(e.transition="none",e.WebkitTransition="none",a.transition="none",n.transition="none"),s)if(this.props.open)o.onTouchStart=this.onTouchStart,o.onTouchMove=this.onTouchMove,o.onTouchEnd=this.onTouchEnd,o.onTouchCancel=this.onTouchEnd,o.onScroll=this.onScroll;else{var u=Object(x.a)({},P,this.props.styles.dragHandle);u.width=this.props.touchHandleWidth,this.props.pullRight?u.right=0:u.left=0,t=l.a.createElement("div",{style:u,onTouchStart:this.onTouchStart,onTouchMove:this.onTouchMove,onTouchEnd:this.onTouchEnd,onTouchCancel:this.onTouchEnd})}return l.a.createElement("div",o,l.a.createElement("div",{className:this.props.sidebarClassName,style:e,ref:this.saveSidebarRef,id:this.props.sidebarId},this.props.sidebar),l.a.createElement("div",{className:this.props.overlayClassName,style:n,onClick:this.overlayClicked,id:this.props.overlayId}),l.a.createElement("div",{className:this.props.contentClassName,style:a,id:this.props.contentId},t,this.props.children))}}]),e}(c.Component);R.defaultProps={docked:!0,open:!1,transitions:!0,touch:!0,touchHandleWidth:20,pullRight:!1,shadow:!0,dragToggleDistance:30,onSetOpen:function(){},styles:{},defaultSidebarWidth:0};var H=R,L=a(40),D=function(t){function e(t){var a;return Object(n.a)(this,e),(a=Object(r.a)(this,Object(o.a)(e).call(this,t))).checkEpisodeWin=function(){return a.state.current_state_row===a.state.end_state_row&&a.state.current_state_col===a.state.end_state_col},a.next_round_board=function(){a.setState({current_state_row:5,current_state_col:0,episode_win:!1,step:0,round:a.state.round+1})},a.checkCrash=function(){var t=Math.round(100*(1-a.state.gamma))/100;Math.random()<t&&a.setState({crash:!0})},a.handleKeyPress=function(t){("ArrowRight"===t.key||"ArrowUp"===t.key||t.key===a.state.teleportationKey||(97<=t.key.charCodeAt(0)&&t.key.charCodeAt(0)<=122||"ArrowLeft"===t.key||"ArrowDown"===t.key)&&!a.state.keyPressHist.includes(t.key))&&(console.log(t.key.charCodeAt(0)),a.setState({currentKey:t.key,step:a.state.step+1,score:a.state.score-1,totalStep:a.state.totalStep+1}),a.setState(function(e){return{keyPressHist:Object(g.a)(e.keyPressHist).concat([t.key])}}),a.state.totalStep>=1&&a.checkCrash(),"ArrowRight"===t.key?(a.state.current_state_col+1<=5&&a.setState({current_state_col:a.state.current_state_col+1}),a.checkGameStatus()):"ArrowUp"===t.key?(a.state.current_state_row-1>=0&&a.setState({current_state_row:a.state.current_state_row-1}),a.checkGameStatus()):t.key===a.state.teleportationKey?(a.setState({current_state_row:a.state.end_state_row,current_state_col:a.state.end_state_col,episode_win:!0,score:a.state.score+a.state.goal}),a.checkGameStatus()):a.state.crash||document.getElementById("negative_sound").play())},a.gameStatus=function(){return l.a.createElement("p",null,"step ",a.state.step," / round ",a.state.round)},a.showCrashMessage=function(){return a.componentWillUnmount(),l.a.createElement("p",null,"Your spaceship crashes, game over, thanks for playing!")},a.state={currentKey:"",current_state_row:null,current_state_col:null,end_state_row:null,end_state_col:null,teleportationKey:"",episode_win:null,step:null,round:null,score:null,goal:null,episode_interrupt:null,gamma:null,totalStep:null,crash:!1,sidebarOpen:!0,keyPressHist:[]},a.onSetSidebarOpen=a.onSetSidebarOpen.bind(Object(k.a)(Object(k.a)(a))),a}return Object(i.a)(e,t),Object(s.a)(e,[{key:"onSetSidebarOpen",value:function(t){this.setState({sidebarOpen:t})}},{key:"checkGameStatus",value:function(){var t,e=this;if(this.checkEpisodeWin()){this.setState({episode_win:!0,score:this.state.score+this.state.goal}),document.getElementById("positive_sound").play();(t=2e3,new Promise(function(e,a){return setTimeout(e,t)})).then(e.next_round_board())}else this.state.crash||document.getElementById("negative_sound").play()}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeyPress),this.setState({current_state_row:5,current_state_col:0,end_state_row:0,end_state_col:5,teleportationKey:"p",episode_win:!1,step:0,round:1,goal:20,score:0,gamma:.94,totalStep:0,crash:!1,sidebarOpen:!1})}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyPress)}},{key:"render",value:function(){var t=this.gameStatus();return console.log("get into layout render"),l.a.createElement("div",null,l.a.createElement(H,{sidebar:l.a.createElement("div",null,l.a.createElement(w,{totalStep:this.state.totalStep})),open:this.state.sidebarOpen,styles:{sidebar:{background:"white"}}},l.a.createElement("h1",{style:{textAlign:"center"}},"Spaceship Adventure"),l.a.createElement("h3",{style:{paddingLeft:"50px"},className:"instruction1"},"skill1: try arrow keys to move. Hint: ArrowUp moves your spaceship up."),l.a.createElement("h3",{style:{paddingLeft:"50px"},className:"instruction2"},"skill2: try [a-z] lower case letters to teleport the spaceship, so that your spaceship will reach the destination in one move"),l.a.createElement("div",{style:{paddingLeft:"50px"},className:"game_status"},t),l.a.createElement("p",{style:{paddingLeft:"50px"}},"Your total step: ",this.state.totalStep),l.a.createElement("p",{style:{paddingLeft:"50px"}},"There is a ",Math.round(100*(1-this.state.gamma))," percent probability that your spaceship will crash in the next step!"),l.a.createElement(O,{score:this.state.score}),l.a.createElement(S,{current_state_row:this.state.current_state_row,current_state_col:this.state.current_state_col,end_state_row:this.state.end_state_row,end_state_col:this.state.end_state_col}),l.a.createElement("p",{style:{paddingLeft:"50px"}},"The key(s) you pressed: ",this.state.keyPressHist.map(function(t){return l.a.createElement("li",null,t)})),l.a.createElement("audio",{id:"negative_sound",src:T.a}),l.a.createElement("audio",{id:"positive_sound",src:W.a}),this.state.crash&&l.a.createElement(X,{keyPressHist:this.state.keyPressHist}),this.state.crash&&l.a.createElement(L.a,{to:"/gameOver"})))}}]),e}(l.a.Component),K=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("p",null,"Your spaceship crashes, game over, thanks for playing"),l.a.createElement("p",null,"Your keystrokes will be logged."))}}]),e}(c.Component),U=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return l.a.createElement(p.a,null,l.a.createElement(d.a,null,l.a.createElement(m.a,{exact:!0,path:"/",component:v}),l.a.createElement(m.a,{exact:!0,path:"/gameOver",component:K}),l.a.createElement(m.a,{exact:!0,parh:"/main",component:D})))}}]),e}(l.a.Component);h.a.render(l.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[23,2,1]]]);
//# sourceMappingURL=main.3dbc2431.chunk.js.map