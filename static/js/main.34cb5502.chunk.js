(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(t,e,a){t.exports=a.p+"static/media/spaceship.57a23070.svg"},function(t){t.exports=[{id:1,name:"Alber",score:[10,20,30]},{id:2,name:"Bob",score:[10,20,30]},{id:3,name:"Colbert",score:[10,20,30]},{id:4,name:"Dave",score:[10,20,30]},{id:5,name:"Ella",score:[10,20,30]},{id:6,name:"Felix",score:[10,20,30]},{id:7,name:"Gabriel",score:[10,20,30]},{id:8,name:"Hilbert",score:[10,20,30]},{id:9,name:"Iron",score:[10,20,30]},{id:10,name:"Jack",score:[10,20,30]}]},function(t,e,a){t.exports=a.p+"static/media/negative_sound.dad0bcc7.mp3"},function(t,e,a){t.exports=a.p+"static/media/positive_sound.13559345.mp3"},,function(t,e,a){t.exports=a(24)},,,,,function(t,e,a){},,function(t,e,a){},,function(t,e,a){"use strict";a.r(e);var s=a(14),n=a(1),o=a(2),r=a(3),i=a(5),c=a(4),l=a(6),h=a(0),u=a.n(h),p=a(9),d=a.n(p),b=(a(20),a(10)),m=a.n(b);a(22),h.Component,Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var f=a(11),v=function(t){function e(){return Object(o.a)(this,e),Object(i.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(l.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){var t=this;return this.props.totalStep>0&&this.props.totalStep%10===0&&u.a.createElement("div",null,u.a.createElement("h2",{className:"steps"}," Ranking board after total step of ",this.props.totalStep),f.map(function(e){return u.a.createElement("div",null,u.a.createElement("li",null,e.id,": ",e.name," ",e.score.map(function(e,a){if(a===t.props.totalStep/10-1)return u.a.createElement("div",null,e)})))}))}}]),e}(h.Component),y=a(12),_=a.n(y),S=a(13),g=a.n(S),k=a(7),w={position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden"},O={zIndex:2,position:"absolute",top:0,bottom:0,transition:"transform .3s ease-out",WebkitTransition:"-webkit-transform .3s ease-out",willChange:"transform",overflowY:"auto"},E={position:"absolute",top:0,left:0,right:0,bottom:0,overflowY:"auto",WebkitOverflowScrolling:"touch",transition:"left .3s ease-out, right .3s ease-out"},j={zIndex:1,position:"fixed",top:0,left:0,right:0,bottom:0,opacity:0,visibility:"hidden",transition:"opacity .3s ease-out, visibility .3s ease-out",backgroundColor:"rgba(0,0,0,.3)"},T={zIndex:1,position:"fixed",top:0,bottom:0},C=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(i.a)(this,Object(c.a)(e).call(this,t))).state={sidebarWidth:t.defaultSidebarWidth,touchIdentifier:null,touchStartX:null,touchCurrentX:null,dragSupported:!1},a.overlayClicked=a.overlayClicked.bind(Object(n.a)(Object(n.a)(a))),a.onTouchStart=a.onTouchStart.bind(Object(n.a)(Object(n.a)(a))),a.onTouchMove=a.onTouchMove.bind(Object(n.a)(Object(n.a)(a))),a.onTouchEnd=a.onTouchEnd.bind(Object(n.a)(Object(n.a)(a))),a.onScroll=a.onScroll.bind(Object(n.a)(Object(n.a)(a))),a.saveSidebarRef=a.saveSidebarRef.bind(Object(n.a)(Object(n.a)(a))),a}return Object(l.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){var t=/iPad|iPhone|iPod/.test(navigator?navigator.userAgent:"");this.setState({dragSupported:"object"===typeof window&&"ontouchstart"in window&&!t}),this.saveSidebarWidth()}},{key:"componentDidUpdate",value:function(){this.isTouching()||this.saveSidebarWidth()}},{key:"onTouchStart",value:function(t){if(!this.isTouching()){var e=t.targetTouches[0];this.setState({touchIdentifier:e.identifier,touchStartX:e.clientX,touchCurrentX:e.clientX})}}},{key:"onTouchMove",value:function(t){if(this.isTouching())for(var e=0;e<t.targetTouches.length;e++)if(t.targetTouches[e].identifier===this.state.touchIdentifier){this.setState({touchCurrentX:t.targetTouches[e].clientX});break}}},{key:"onTouchEnd",value:function(){if(this.isTouching()){var t=this.touchSidebarWidth();(this.props.open&&t<this.state.sidebarWidth-this.props.dragToggleDistance||!this.props.open&&t>this.props.dragToggleDistance)&&this.props.onSetOpen(!this.props.open),this.setState({touchIdentifier:null,touchStartX:null,touchCurrentX:null})}}},{key:"onScroll",value:function(){this.isTouching()&&this.inCancelDistanceOnScroll()&&this.setState({touchIdentifier:null,touchStartX:null,touchCurrentX:null})}},{key:"inCancelDistanceOnScroll",value:function(){return this.props.pullRight?Math.abs(this.state.touchCurrentX-this.state.touchStartX)<20:Math.abs(this.state.touchStartX-this.state.touchCurrentX)<20}},{key:"isTouching",value:function(){return null!==this.state.touchIdentifier}},{key:"overlayClicked",value:function(){this.props.open&&this.props.onSetOpen(!1)}},{key:"saveSidebarWidth",value:function(){var t=this.sidebar.offsetWidth;t!==this.state.sidebarWidth&&this.setState({sidebarWidth:t})}},{key:"saveSidebarRef",value:function(t){this.sidebar=t}},{key:"touchSidebarWidth",value:function(){return this.props.pullRight?this.props.open&&window.innerWidth-this.state.touchStartX<this.state.sidebarWidth?this.state.touchCurrentX>this.state.touchStartX?this.state.sidebarWidth+this.state.touchStartX-this.state.touchCurrentX:this.state.sidebarWidth:Math.min(window.innerWidth-this.state.touchCurrentX,this.state.sidebarWidth):this.props.open&&this.state.touchStartX<this.state.sidebarWidth?this.state.touchCurrentX>this.state.touchStartX?this.state.sidebarWidth:this.state.sidebarWidth-this.state.touchStartX+this.state.touchCurrentX:Math.min(this.state.touchCurrentX,this.state.sidebarWidth)}},{key:"render",value:function(){var t,e=Object(k.a)({},O,this.props.styles.sidebar),a=Object(k.a)({},E,this.props.styles.content),s=Object(k.a)({},j,this.props.styles.overlay),n=this.state.dragSupported&&this.props.touch,o=this.isTouching(),r={className:this.props.rootClassName,style:Object(k.a)({},w,this.props.styles.root),role:"navigation",id:this.props.rootId},i=this.props.shadow&&(o||this.props.open||this.props.docked);if(this.props.pullRight?(e.right=0,e.transform="translateX(100%)",e.WebkitTransform="translateX(100%)",i&&(e.boxShadow="-2px 2px 4px rgba(0, 0, 0, 0.15)")):(e.left=0,e.transform="translateX(-100%)",e.WebkitTransform="translateX(-100%)",i&&(e.boxShadow="2px 2px 4px rgba(0, 0, 0, 0.15)")),o){var c=this.touchSidebarWidth()/this.state.sidebarWidth;this.props.pullRight?(e.transform="translateX(".concat(100*(1-c),"%)"),e.WebkitTransform="translateX(".concat(100*(1-c),"%)")):(e.transform="translateX(-".concat(100*(1-c),"%)"),e.WebkitTransform="translateX(-".concat(100*(1-c),"%)")),s.opacity=c,s.visibility="visible"}else this.props.docked?(0!==this.state.sidebarWidth&&(e.transform="translateX(0%)",e.WebkitTransform="translateX(0%)"),this.props.pullRight?a.right="".concat(this.state.sidebarWidth,"px"):a.left="".concat(this.state.sidebarWidth,"px")):this.props.open&&(e.transform="translateX(0%)",e.WebkitTransform="translateX(0%)",s.opacity=1,s.visibility="visible");if(!o&&this.props.transitions||(e.transition="none",e.WebkitTransition="none",a.transition="none",s.transition="none"),n)if(this.props.open)r.onTouchStart=this.onTouchStart,r.onTouchMove=this.onTouchMove,r.onTouchEnd=this.onTouchEnd,r.onTouchCancel=this.onTouchEnd,r.onScroll=this.onScroll;else{var l=Object(k.a)({},T,this.props.styles.dragHandle);l.width=this.props.touchHandleWidth,this.props.pullRight?l.right=0:l.left=0,t=u.a.createElement("div",{style:l,onTouchStart:this.onTouchStart,onTouchMove:this.onTouchMove,onTouchEnd:this.onTouchEnd,onTouchCancel:this.onTouchEnd})}return u.a.createElement("div",r,u.a.createElement("div",{className:this.props.sidebarClassName,style:e,ref:this.saveSidebarRef,id:this.props.sidebarId},this.props.sidebar),u.a.createElement("div",{className:this.props.overlayClassName,style:s,onClick:this.overlayClicked,id:this.props.overlayId}),u.a.createElement("div",{className:this.props.contentClassName,style:a,id:this.props.contentId},t,this.props.children))}}]),e}(h.Component);C.defaultProps={docked:!1,open:!1,transitions:!0,touch:!0,touchHandleWidth:20,pullRight:!1,shadow:!0,dragToggleDistance:30,onSetOpen:function(){},styles:{},defaultSidebarWidth:0};var W=function(t){function e(){return Object(o.a)(this,e),Object(i.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(l.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){return u.a.createElement("div",{className:"square"},this.props.value)}}]),e}(u.a.Component),X=function(t){function e(){return Object(o.a)(this,e),Object(i.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(l.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){var t=this,e=Array(6).fill().map(function(t){return Array(6).fill()}).map(function(e,a){return u.a.createElement("tr",{key:"row_"+a},e.map(function(e,s){return a===t.props.current_state_row&&s===t.props.current_state_col?u.a.createElement(W,{value:"X"}):a===t.props.end_state_row&&s===t.props.end_state_col?u.a.createElement(W,{value:"O"}):u.a.createElement(W,{value:""})}))});return u.a.createElement("div",{style:{textAlign:"center"}},u.a.createElement("div",{style:{margin:"auto",width:"40%"}},u.a.createElement("table",{cellSpacing:"0"},u.a.createElement("tbody",null,e))),u.a.createElement("br",null))}}]),e}(u.a.Component),x=function(t){function e(){return Object(o.a)(this,e),Object(i.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(l.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){var t=this.props.score<=0?"red":"green";return u.a.createElement("p",null,"Your score is:",u.a.createElement("span",{style:{color:t}}," ",this.props.score))}}]),e}(u.a.Component),I=(u.a.Component,function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(i.a)(this,Object(c.a)(e).call(this,t))).checkEpisodeWin=function(){return a.state.current_state_row===a.state.end_state_row&&a.state.current_state_col===a.state.end_state_col},a.next_round_board=function(){a.setState({current_state_row:5,current_state_col:0,episode_win:!1,step:0,round:a.state.round+1})},a.checkCrash=function(){var t=Math.round(100*(1-a.state.gamma))/100;Math.random()<t&&a.setState({crash:!0})},a.handleKeyPress=function(t){("ArrowRight"===t.key||"ArrowUp"===t.key||t.key===a.state.teleportationKey||(97<=t.key.charCodeAt(0)&&t.key.charCodeAt(0)<=122||"ArrowLeft"===t.key||"ArrowDown"===t.key)&&!a.state.keyPressHist.includes(t.key))&&(console.log(t.key.charCodeAt(0)),a.setState({currentKey:t.key,step:a.state.step+1,score:a.state.score-1,totalStep:a.state.totalStep+1}),a.setState(function(e){return{keyPressHist:Object(s.a)(e.keyPressHist).concat([t.key])}}),a.state.totalStep>=1&&a.checkCrash(),"ArrowRight"===t.key?(a.state.current_state_col+1<=5&&a.setState({current_state_col:a.state.current_state_col+1}),a.checkGameStatus()):"ArrowUp"===t.key?(a.state.current_state_row-1>=0&&a.setState({current_state_row:a.state.current_state_row-1}),a.checkGameStatus()):t.key===a.state.teleportationKey?(a.setState({current_state_row:a.state.end_state_row,current_state_col:a.state.end_state_col,episode_win:!0,score:a.state.score+a.state.goal}),a.checkGameStatus()):document.getElementById("negative_sound").play())},a.gameStatus=function(){return u.a.createElement("p",null,"step ",a.state.step," / round ",a.state.round)},a.showCrashMessage=function(){return a.componentWillUnmount(),u.a.createElement("p",null,"Your spaceship crashes, game over, thanks for playing!")},a.state={currentKey:"",current_state_row:null,current_state_col:null,end_state_row:null,end_state_col:null,teleportationKey:"",episode_win:null,step:null,round:null,score:null,goal:null,episode_interrupt:null,gamma:null,totalStep:null,crash:!1,sidebarOpen:!0,keyPressHist:[]},a.onSetSidebarOpen=a.onSetSidebarOpen.bind(Object(n.a)(Object(n.a)(a))),a}return Object(l.a)(e,t),Object(r.a)(e,[{key:"onSetSidebarOpen",value:function(t){this.setState({sidebarOpen:t})}},{key:"checkGameStatus",value:function(){this.checkEpisodeWin()?(this.setState({episode_win:!0,score:this.state.score+this.state.goal}),document.getElementById("positive_sound").play(),this.next_round_board()):document.getElementById("negative_sound").play()}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeyPress),this.setState({current_state_row:5,current_state_col:0,end_state_row:0,end_state_col:5,teleportationKey:"p",episode_win:!1,step:0,round:1,goal:20,score:0,gamma:.94,totalStep:0,crash:!1})}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyPress)}},{key:"render",value:function(){var t=this.gameStatus();return u.a.createElement("div",null,u.a.createElement("h1",{style:{textAlign:"center"}},"Spaceship Adventure"),u.a.createElement("h3",{className:"instruction1"},"skill1: try arrow keys to move. Hint: ArrowUp moves your spaceship up."),u.a.createElement("h3",{className:"instruction2"},"skill2: try [a-z] lower case letters to teleport the spaceship, so that your spaceship will reach the dstination in one move"),u.a.createElement("div",{className:"game_status"},t),u.a.createElement("p",null,"Your total step: ",this.state.totalStep),u.a.createElement("p",null,"There is a ",Math.round(100*(1-this.state.gamma))," percent probability that your spaceship will crash in the next step!"),u.a.createElement("div",null,this.state.crash&&this.showCrashMessage()),u.a.createElement(x,{score:this.state.score}),u.a.createElement(X,{current_state_row:this.state.current_state_row,current_state_col:this.state.current_state_col,end_state_row:this.state.end_state_row,end_state_col:this.state.end_state_col}),u.a.createElement("p",null,"The last key(s) you pressed: ",this.state.keyPressHist),u.a.createElement("audio",{id:"negative_sound",src:_.a}),u.a.createElement("audio",{id:"positive_sound",src:g.a}),u.a.createElement(v,{totalStep:this.state.totalStep}))}}]),e}(u.a.Component));d.a.render(u.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[15,2,1]]]);
//# sourceMappingURL=main.34cb5502.chunk.js.map