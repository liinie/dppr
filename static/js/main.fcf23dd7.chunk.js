(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){e.exports=a.p+"static/media/spaceship.57a23070.svg"},16:function(e){e.exports=[{id:1,name:"Alber",score:[10,190,380,570,760,950,1120,1310,1500]},{id:2,name:"Bob",score:[10,190,380,570,760,930,1110,1290,1480]},{id:3,name:"Colbert",score:[10,190,380,570,740,930,1100,1290,1460]},{id:4,name:"Dave",score:[10,190,380,570,740,930,1100,1270,1420]},{id:5,name:"Ella",score:[10,190,380,570,740,911,1061,1214,1385]},{id:6,name:"Felix",score:[10,190,380,550,740,910,1044,1214,1340]},{id:7,name:"Gabriel",score:[10,190,380,550,740,910,1040,1210,1320]},{id:8,name:"Hilbert",score:[10,190,380,550,740,910,1040,1150,1267]},{id:9,name:"Iron",score:[10,190,361,550,720,910,1020,1130,1220]},{id:10,name:"Jack",score:[10,190,342,532,711,902,1002,1120,1210]}]},17:function(e,t,a){e.exports=a.p+"static/media/negative_sound.dad0bcc7.mp3"},18:function(e,t,a){e.exports=a.p+"static/media/positive_sound.13559345.mp3"},22:function(e,t,a){e.exports=a(34)},27:function(e,t,a){},29:function(e,t,a){},34:function(e,t,a){"use strict";a.r(t);var n=a(3),r=a(4),s=a(7),o=a(5),c=a(6),i=a(0),l=a.n(i),u=a(14),p=a.n(u),m=(a(27),a(15)),d=a.n(m),h=(a(29),a(35)),_=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"App-header"},l.a.createElement("img",{src:d.a,className:"App-logo",alt:"logo"}),l.a.createElement("div",{className:"empty_space"}," "),l.a.createElement(h.a,{to:"/main"},"Enter Spaceship game")))}}]),t}(i.Component),y=a(36),b=a(38),f=a(37);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var v=a(20),k=a(10),E=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"square"},this.props.value)}}]),t}(l.a.Component),w=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=Array(6).fill().map(function(e){return Array(6).fill()}).map(function(t,a){return l.a.createElement("tr",{key:"row_"+a},t.map(function(t,n){return a===e.props.current_state_row&&n===e.props.current_state_col?l.a.createElement(E,{value:"X"}):a===e.props.end_state_row&&n===e.props.end_state_col?l.a.createElement(E,{value:"O"}):l.a.createElement(E,{value:""})}))});return l.a.createElement("div",{style:{textAlign:"center"}},l.a.createElement("div",{style:{margin:"auto",width:"40%"}},l.a.createElement("table",{cellSpacing:"0"},l.a.createElement("tbody",null,t))),l.a.createElement("br",null))}}]),t}(l.a.Component),O=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.score<=0?"red":"green";return l.a.createElement("p",null,"Your score is:",l.a.createElement("span",{style:{color:e}}," ",this.props.score))}}]),t}(l.a.Component),g=a(16),j=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return this.props.totalStep>0&&this.props.totalStep%10===0&&l.a.createElement("div",null,l.a.createElement("h2",{className:"steps"}," Ranking board after total step of ",this.props.totalStep),g.map(function(t){return l.a.createElement("div",null,l.a.createElement("li",null,t.id,": ",t.name," ",t.score.map(function(t,a){if(a===e.props.totalStep/10-1)return l.a.createElement("div",null,t)})))}))}}]),t}(i.Component),S=a(17),A=a.n(S),C=a(18),x=a.n(C),P=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,c=new Array(r),i=0;i<r;i++)c[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(c)))).getLogFile=function(){var e=JSON.stringify(a.props.keyPressHist),t=document.createElement("a");t.href="data:text/json;charset=utf-8,"+encodeURIComponent(e),t.target="_blank",t.download="logfile.json",t.click()},a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,this.getLogFile())}}]),t}(l.a.Component),H=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(s.a)(this,Object(o.a)(t).call(this,e))).checkEpisodeWin=function(){return a.state.current_state_row===a.state.end_state_row&&a.state.current_state_col===a.state.end_state_col},a.next_round_board=function(){a.setState({current_state_row:5,current_state_col:0,episode_win:!1,step:0,round:a.state.round+1})},a.checkCrash=function(){var e=Math.round(100*(1-a.state.gamma))/100;Math.random()<e&&a.setState({crash:!0})},a.handleKeyPress=function(e){("ArrowRight"===e.key||"ArrowUp"===e.key||e.key===a.state.teleportationKey||(97<=e.key.charCodeAt(0)&&e.key.charCodeAt(0)<=122||"ArrowLeft"===e.key||"ArrowDown"===e.key)&&!a.state.keyPressHist.includes(e.key))&&(console.log(e.key.charCodeAt(0)),a.setState({currentKey:e.key,step:a.state.step+1,score:a.state.score-1,totalStep:a.state.totalStep+1}),a.setState(function(t){return{keyPressHist:Object(v.a)(t.keyPressHist).concat([e.key])}}),a.state.totalStep>=1&&a.checkCrash(),"ArrowRight"===e.key?(a.state.current_state_col+1<=5&&a.setState({current_state_col:a.state.current_state_col+1}),a.checkGameStatus()):"ArrowUp"===e.key?(a.state.current_state_row-1>=0&&a.setState({current_state_row:a.state.current_state_row-1}),a.checkGameStatus()):e.key===a.state.teleportationKey?(a.setState({current_state_row:a.state.end_state_row,current_state_col:a.state.end_state_col,episode_win:!0,score:a.state.score+a.state.goal}),a.checkGameStatus()):document.getElementById("negative_sound").play())},a.gameStatus=function(){return l.a.createElement("p",null,"step ",a.state.step," / round ",a.state.round)},a.showCrashMessage=function(){return a.componentWillUnmount(),l.a.createElement("p",null,"Your spaceship crashes, game over, thanks for playing!")},a.state={currentKey:"",current_state_row:null,current_state_col:null,end_state_row:null,end_state_col:null,teleportationKey:"",episode_win:null,step:null,round:null,score:null,goal:null,episode_interrupt:null,gamma:null,totalStep:null,crash:!1,sidebarOpen:!0,keyPressHist:[]},a.onSetSidebarOpen=a.onSetSidebarOpen.bind(Object(k.a)(Object(k.a)(a))),a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"onSetSidebarOpen",value:function(e){this.setState({sidebarOpen:e})}},{key:"checkGameStatus",value:function(){this.checkEpisodeWin()?(this.setState({episode_win:!0,score:this.state.score+this.state.goal}),document.getElementById("positive_sound").play(),this.next_round_board()):document.getElementById("negative_sound").play()}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleKeyPress),this.setState({current_state_row:5,current_state_col:0,end_state_row:0,end_state_col:5,teleportationKey:"p",episode_win:!1,step:0,round:1,goal:20,score:0,gamma:.94,totalStep:0,crash:!1})}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyPress)}},{key:"render",value:function(){var e=this.gameStatus();return l.a.createElement("div",null,l.a.createElement("h1",{style:{textAlign:"center"}},"Spaceship Adventure"),l.a.createElement("h3",{className:"instruction1"},"skill1: try arrow keys to move. Hint: ArrowUp moves your spaceship up."),l.a.createElement("h3",{className:"instruction2"},"skill2: try [a-z] lower case letters to teleport the spaceship, so that your spaceship will reach the dstination in one move"),l.a.createElement("div",{className:"game_status"},e),l.a.createElement("p",null,"Your total step: ",this.state.totalStep),l.a.createElement("p",null,"There is a ",Math.round(100*(1-this.state.gamma))," percent probability that your spaceship will crash in the next step!"),l.a.createElement("div",null,this.state.crash&&this.showCrashMessage()),l.a.createElement(O,{score:this.state.score}),l.a.createElement(w,{current_state_row:this.state.current_state_row,current_state_col:this.state.current_state_col,end_state_row:this.state.end_state_row,end_state_col:this.state.end_state_col}),l.a.createElement("p",null,"The last key(s) you pressed: ",this.state.keyPressHist),l.a.createElement("audio",{id:"negative_sound",src:A.a}),l.a.createElement("audio",{id:"positive_sound",src:x.a}),l.a.createElement(j,{totalStep:this.state.totalStep}),this.state.crash&&l.a.createElement(P,{keyPressHist:this.state.keyPressHist}))}}]),t}(l.a.Component),N=function(e){function t(){return Object(n.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement(y.a,null,l.a.createElement(b.a,null,l.a.createElement(f.a,{exact:!0,path:"/",component:_}),l.a.createElement(f.a,{exact:!0,parh:"/main",component:H})))}}]),t}(l.a.Component);p.a.render(l.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,2,1]]]);
//# sourceMappingURL=main.fcf23dd7.chunk.js.map