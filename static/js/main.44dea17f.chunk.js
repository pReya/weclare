(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{142:function(e,t,n){e.exports=n(358)},147:function(e,t,n){},284:function(e,t,n){},34:function(e,t,n){},356:function(e,t,n){},358:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(20),c=n.n(o),s=(n(147),n(361)),l=n(363),i=n(360),u=n(25),d=(n(34),n(2)),m=n(4),E=n(6),p=n(51),f=n(52),b=n(121),h=n.n(b);function w(){return r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement("footer",{className:"container"},r.a.createElement(d.C,null,r.a.createElement(d.h,null,r.a.createElement("p",{className:"font-weight-light text-muted"},"\xa9 2018 Moritz St\xfcckler \u2013 HAW Hamburg")),r.a.createElement(d.h,{className:"text-right"},r.a.createElement("a",{href:"https://github.com/pReya/weclare/"},r.a.createElement(h.a,null))))))}var v=n(359),y=n(9),g=n(10),S=n(13),O=n(12),x=n(14),A=n(33),C=n(123),I=n.n(C),j=n(124),N=n.n(j),T=n(125),q=n.n(T),_=function(e){function t(e){var n;return Object(y.a)(this,t),(n=Object(S.a)(this,Object(O.a)(t).call(this,e))).toggleDropDown=n.toggleDropDown.bind(Object(A.a)(Object(A.a)(n))),n.state={dropdownOpen:!1},n}return Object(x.a)(t,e),Object(g.a)(t,[{key:"toggleDropDown",value:function(){var e=this.state.dropdownOpen;this.setState({dropdownOpen:!e})}},{key:"render",value:function(){var e=this.props,t=e.status,n=e.isServer,a=e.numberOfClients,o=e.ownServerId,c=this.state.dropdownOpen,s={client:["\u2328\ufe0f Ready","Trying to connect","\u2705 Connected","\u274c Error"],server:["\u2328\ufe0f Ready","\u2753 Waiting for connections","\u2705 ".concat(a," Clients Connected"),"\u274c Error"]}[n?"server":"client"][t];return r.a.createElement(d.p,{className:"justify-content-center col-md-8"},n&&[1,2,3].includes(t)?r.a.createElement(d.r,{addonType:"prepend",isOpen:c,toggle:this.toggleDropDown},r.a.createElement(d.l,{caret:!0,className:"font-weight-bold"},"".concat(o," ")),r.a.createElement(d.k,null,r.a.createElement(d.j,{header:!0},"Share"),r.a.createElement(d.j,{divider:!0}),r.a.createElement(d.j,{style:{cursor:"pointer"}},r.a.createElement(q.a,{className:"text-muted"}),"  ","Show QR Code"),document.queryCommandSupported("copy")&&r.a.createElement(d.j,{onClick:function(){var e,t;e=o,(t=document.createElement("input")).style="position: absolute; left: -1000px; top: -1000px",t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)},style:{cursor:"pointer"}},r.a.createElement(N.a,{className:"text-muted"}),"  ","Copy ID"),r.a.createElement(d.j,{style:{cursor:"pointer"}},r.a.createElement(I.a,{className:"text-muted"}),"  ","Copy Link"))):null,r.a.createElement(d.o,{className:"text-center col-5",value:s,disabled:!0}))}}]),t}(r.a.Component);_.defaultProps={isServer:!1,numberOfClients:0,ownServerId:""};var R=function(e){var t=e.status,n=e.numberOfClients,a=e.isServer,o=e.isClient,c=e.ownServerId;return r.a.createElement(r.a.Fragment,null,r.a.createElement(d.A,{expand:"sm",className:"mb-4 border-bottom shadow-sm d-flex flex-row justify-content-between"},r.a.createElement(d.i,null,r.a.createElement(d.B,{href:"/"},"Weclare",a?" Server":" Client"),(a||o)&&r.a.createElement(_,{isServer:a,status:t,numberOfClients:n,ownServerId:c}),r.a.createElement(d.x,{className:"flex-row"},r.a.createElement(d.y,null,r.a.createElement(d.z,{tag:v.a,to:"/"},"Help")),r.a.createElement(d.y,null,r.a.createElement(d.z,{tag:v.a,to:"/about"},"About"))))))};R.defaultProps={isServer:!1,isClient:!1,numberOfClients:0,ownServerId:"",status:0};var Q=R,k=Object(m.b)(function(e){return{status:e.connection.status,numberOfClients:e.connection.peer?Object.keys(e.connection.peer.connections).length:null,ownServerId:e.server.ownServerId}})(function(e){return r.a.createElement(Q,Object.assign({isServer:!0},e))}),P=n(362),D=n(53),J=n.n(D),U=function(){function e(){Object(y.a)(this,e)}return Object(g.a)(e,null,[{key:"info",value:function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];e.emitMessage("info",t,a)}},{key:"error",value:function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];e.emitMessage("error",t,a)}},{key:"warn",value:function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];e.emitMessage("warn",t,a)}},{key:"debug",value:function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];e.emitMessage("debug",t,a)}},{key:"emitMessage",value:function(e,t,n){n.length>0?console[e](t,n):console[e](t)}}]),e}();n(177);function W(e){var t=e.title,n=e.text,a=e.children,o=e.badge,c=e.footer;return r.a.createElement(d.h,{md:"8"},r.a.createElement(d.c,{className:"shadow"},r.a.createElement(d.f,null,o?r.a.createElement("h6",{className:"my-0 d-flex justify-content-between"},t,r.a.createElement(d.a,{color:"dark",pill:!0},o)):r.a.createElement("h6",{className:"my-0"},t)),r.a.createElement(d.d,null,n&&r.a.createElement(d.g,null,n),a),c&&r.a.createElement(d.e,null,c)))}W.defaultProps={text:null,children:null,badge:null,footer:null};var F=W,B=function(e){var t=e.onChangeServerId,n=e.onClickConnect,a=e.serverId,o=e.title,c=e.text,s=e.buttonText,l=e.history,i=e.location;return r.a.createElement(F,{title:o,text:c},r.a.createElement(d.m,null,r.a.createElement(d.n,{row:!0,className:"form-row"},r.a.createElement(d.h,{md:6},r.a.createElement(d.o,{id:"serverId",type:"text",value:a,onChange:function(e){return t(e.target.value)}})),r.a.createElement(d.h,{md:3},r.a.createElement(d.b,{type:"button",id:"connect",className:"btn-block",onClick:function(){n(a),l&&i&&l.push(i)}},s)))))};B.defaultProps={buttonText:"Connect"};var L=B,M="ADD_CONNECTION",z="SET_SERVER_ID";var G="REGISTER_ANSWER",H="INIT_ANSWERS";var V="SET_PEER",X="SET_CONNECTION_STATUS";function Y(e){return{type:X,payload:{newStatus:e}}}function $(e){return{type:V,payload:{peer:e}}}var K=function(e,t){var n,a,r,o=e.type,c=e.payload;switch(U.info("Received Data: ",e),o){case"answer":console.log("Received answer",c),t((n=c.questionIdx,a=c.answerIdx,r=c.userId,function(e,t){t().server.acceptingAnswers?e({type:G,payload:{questionIdx:n,answerIdx:a,userId:r}}):console.log("TEST")}));break;default:console.log("Default")}},Z=function(e,t){var n=Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_PEERJS_SERVER:"peerjs-server-mvmastudcl.now.sh",REACT_APP_PEERJS_SECURE:"true",REACT_APP_PEERJS_DEBUG:"2"}),a=n.REACT_APP_PEERJS_SERVER,r=n.REACT_APP_PEERJS_SECURE,o=n.REACT_APP_PEERJS_DEBUG,c=new J.a(e,{host:a,secure:"true"===r,debug:parseInt(o,10)});t($(c)),c.on("open",function(e){U.info("Successfully created Peer with id ",e),t(Y(1))}),c.on("connection",function(e){U.info("New client connected with id: ",e.peer),e.on("data",function(e){return K(e,t)}),t(Y(2)),t(function(e){return{type:M,payload:{connection:e}}}(e))}),c.on("error",function(e){U.error("FEHLER: ",e),t(Y(3))})},ee={title:"Create a New Server Id",text:"Please define your individual Server Id that you can give to participants.",buttonText:"Create",location:"/server/wait"},te=Object(P.a)(Object(m.b)(function(e){return{serverId:e.server.ownServerId}},function(e){return{onChangeServerId:function(t){return e({type:z,payload:{newId:t}})},onClickConnect:function(t){Z(t,e)}}})(function(e){return r.a.createElement(d.C,{className:"justify-content-center"},r.a.createElement(L,Object.assign({},e,ee)))})),ne=n(128),ae=n.n(ne),re=(n(282),n(284),function(e){function t(){var e,n;Object(y.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(S.a)(this,(e=Object(O.a)(t)).call.apply(e,[this].concat(r)))).state={typingTimeout:null},n}return Object(x.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.question,a=t.selectedQuestion,o=t.onEditAnswerText,c=t.onEditQuestionText,s=t.onAddAnswer,l=t.onSetCorrectAnswer,i=t.onDeleteAnswer,u=t.onDeleteQuestion;return r.a.createElement(d.c,{className:"shadow"},r.a.createElement(d.f,null,r.a.createElement("h6",{className:"my-0"},"Edit Question")),r.a.createElement(d.d,null,null!=a?r.a.createElement(r.a.Fragment,null,r.a.createElement(d.t,{for:"question"},"Question Text"),r.a.createElement(ae.a,{className:"mb-4",id:"question",value:n.questionText,modules:{toolbar:[["bold","italic","underline"],[{list:"ordered"},{list:"bullet"}],["link"],["clean"]]},onChange:function(t,n,r){"user"===r&&(clearTimeout(e.typingTimeout),e.typingTimeout=setTimeout(function(){return c(a,t)},300))}}),r.a.createElement(d.m,null,r.a.createElement(d.n,null,r.a.createElement(d.t,null,"Answers (Check the correct answer)"),n.answers.map(function(e,t){return r.a.createElement(oe,{isCorrectAnswer:n.correctAnswers===t,selectedQuestion:a,number:t,answer:e.answerText,key:t,onEditAnswerText:function(e){o(a,e.target.value,t)},onSetCorrectAnswer:l,onDeleteAnswer:i})}),r.a.createElement(d.b,{outline:!0,block:!0,color:"success",onClick:function(){return s(a)}},"Add answer"),r.a.createElement(d.b,{outline:!0,block:!0,color:"danger",onClick:function(){return u(a)}},"Delete Question")))):"No question selected"))}}]),t}(r.a.Component));re.defaultProps={question:{},selectedQuestion:0};var oe=function(e){var t=e.answer,n=e.number,a=e.selectedQuestion,o=e.isCorrectAnswer,c=e.onEditAnswerText,s=e.onSetCorrectAnswer,l=e.onDeleteAnswer;return r.a.createElement(d.p,{className:"mb-2"},r.a.createElement(d.q,{addonType:"prepend"},r.a.createElement(d.s,null,r.a.createElement(d.o,{addon:!0,checked:o,type:"radio",name:"answer",onChange:function(){s(a,n)}}))),r.a.createElement(d.o,{value:t,onChange:c}),r.a.createElement(d.q,{addonType:"append"},r.a.createElement(d.s,null,r.a.createElement(d.b,{outline:!0,close:!0,onClick:function(){l(a,n)}}))))},ce=re,se=n(59),le=n(129),ie=n.n(le),ue=n(130),de=n.n(ue),me=function(e){var t=e.questions,n=e.onSelectQuestion,a=e.onSortQuestion,o=e.selectedQuestion,c=e.onAddQuestion;return r.a.createElement(d.c,{className:"shadow"},r.a.createElement(d.f,null,r.a.createElement("h6",{className:"my-0 d-flex justify-content-between"},"Questions"," ",r.a.createElement(d.a,{color:"dark",pill:!0},t.length))),r.a.createElement(se.a,{onDragEnd:function(e){var t=e.destination,n=e.source;t&&(t.droppableId===n.droppableId&&t.index===n.inde||a(n.index,t.index))}},r.a.createElement(se.c,{droppableId:"list"},function(e){return r.a.createElement(d.u,{flush:!0},r.a.createElement("div",Object.assign({},e.droppableProps,{ref:e.innerRef}),t.map(function(e,t){return r.a.createElement(se.b,{draggableId:e.id,index:t,key:e.id},function(a){return r.a.createElement("div",Object.assign({},a.draggableProps,{ref:a.innerRef,key:e.id}),r.a.createElement(d.v,{key:e.id,tag:"a",href:"#",onClick:function(e){e.preventDefault(),n(t)},action:!0,active:o===t,className:"d-flex justify-content-between align-items-center hover"},(u=e.questionText,c=(new DOMParser).parseFromString(u,"text/html").body.textContent||"",s=6,l="...",(i=c.trim().split(" ")).length>s?i.slice(0,s).join(" ")+(l||""):c),r.a.createElement("div",Object.assign({className:"hover__hover"},a.dragHandleProps),r.a.createElement(de.a,{style:{paddingBottom:"3px"}}))));var c,s,l,i,u})}),e.placeholder),0===t.length&&r.a.createElement(d.v,{disabled:!0},r.a.createElement(d.w,{className:"mb-0"},"No questions")))})),r.a.createElement(d.e,{tag:"button",className:"cardFooterButton",onClick:function(){c()}},r.a.createElement(ie.a,{className:"text-success",style:{paddingBottom:"3px"}}),"Add"))};me.defaultProps={questions:["No questions"],selectedQuestion:null};var Ee=me,pe="SELECT_QUESTION",fe="ADD_QUESTION",be="EDIT_QUESTION_TEXT",he="DELETE_QUESTION",we="LOAD_QUESTIONS",ve="SORT_QUESTION";function ye(e){return{type:pe,payload:{questionIdx:e}}}var ge="SET_CORRECT_ANSWER",Se="ADD_ANSWER",Oe="EDIT_ANSWER_TEXT",xe="DELETE_ANSWER";var Ae={selectQuestion:ye,addQuestion:function(){return function(e,t){e({type:fe}),e(ye(t().questionEditor.length-1))}},editQuestionText:function(e,t){return{type:be,payload:{questionIdx:e,questionText:t}}},deleteQuestion:function(e){return function(t,n){t({type:he,payload:{questionIdx:e}}),t(ye(n().selectedQuestion-1))}},addAnswer:function(e){return{type:Se,payload:{questionIdx:e}}},editAnswerText:function(e,t,n){return{type:Oe,payload:{questionIdx:e,answerText:t,answerIdx:n}}},deleteAnswer:function(e,t){return{type:xe,payload:{questionIdx:e,answerIdx:t}}},setCorrectAnswer:function(e,t){return{type:ge,payload:{questionIdx:e,answerIdx:t}}},loadQuestions:function(e){return{type:we,payload:{newQuestions:e}}},initAnswers:function(){return console.log("Arrived in initAnswers Action Creator"),function(e,t){var n=t().questionEditor.map(function(e){return e.answers.map(function(){return[]})});e({type:H,payload:{array:n}})}},sortQuestion:function(e,t){return function(n,a){n({type:ve,payload:{oldQuestionIdx:e,newQuestionIdx:t}}),a().selectedQuestion===e&&n(ye(t))}}},Ce=function(e){function t(e){var n;Object(y.a)(this,t);var a=(n=Object(S.a)(this,Object(O.a)(t).call(this,e))).props.loadQuestions,r=localStorage.getItem("weclare");return r&&a(JSON.parse(r)),n}return Object(x.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e=this.props,t=e.selectedQuestion,n=e.questions,a=e.history,o=e.addQuestion,c=e.selectQuestion,s=e.editQuestionText,l=e.deleteQuestion,i=e.addAnswer,u=e.editAnswerText,m=e.deleteAnswer,E=e.setCorrectAnswer,p=e.initAnswers,f=e.sortQuestion;return r.a.createElement(r.a.Fragment,null,r.a.createElement(d.C,{className:"justify-content-center mb-4"},r.a.createElement(d.h,{md:"4"},r.a.createElement(Ee,{questions:n,selectedQuestion:t,onSelectQuestion:c,onAddQuestion:o,onSortQuestion:f})),r.a.createElement(d.h,{md:"8"},r.a.createElement(ce,{question:n[t],selectedQuestion:t,onEditQuestionText:s,onEditAnswerText:u,onAddAnswer:i,onSetCorrectAnswer:E,onDeleteAnswer:m,onDeleteQuestion:l}))),r.a.createElement(d.C,{className:"justify-content-end"},r.a.createElement(d.h,{xs:"auto"},r.a.createElement(d.b,{outline:!0,block:!0,onClick:function(){p(),localStorage.setItem("weclare",JSON.stringify(n)),U.info("Saved questionset to local Storage"),a&&a.push("/server/create")},color:"success"},"Save & Continue"))))}}]),t}(r.a.Component),Ie=Object(P.a)(Object(m.b)(function(e){return{questions:e.questionEditor,selectedQuestion:e.selectedQuestion}},Ae)(Ce)),je=n(134),Ne=n.n(je),Te=n(0),qe=n.n(Te),_e=(qe.a.string,qe.a.number,qe.a.shape({question:qe.a.shape({progress:qe.a.string,questionIdx:qe.a.number,questionText:qe.a.string,questionType:qe.a.string,answers:qe.a.arrayOf(qe.a.object)})}),{question:{progress:"",questionIdx:null,questionText:null,questionType:null,answers:null},disabled:!1,selectedAnswerIdx:null}),Re=function(e){var t=e.title,n=e.size;return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.Helmet,null,r.a.createElement("title",null,t)),r.a.createElement(F,{title:t},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement(Ne.a,{color1:"#8a817c",color2:"#f44336",color3:"#dc9125",color4:"#5fa15d",size:n}))))};Re.defaultProps={title:"Waiting",size:30};var Qe=Re;var ke=Object(m.b)(function(e){return{status:e.connection.status,connections:e.server.connections}})(Object(P.a)(function(e){var t=e.connections,n=e.history,a=t.length>0,o=1===t.length?"client":"clients",c=1===t.length?"is":"are";return r.a.createElement(d.C,{className:"justify-content-center"},a?r.a.createElement(F,{title:"Start the quiz",text:"Currently there ".concat(c," ").concat(t.length," ").concat(o," connected. You can choose to wait for more participants or go ahead and start the quiz.")},r.a.createElement(d.b,{color:"secondary",block:!0,onClick:function(){n.push("/server/ask")}},"Start Quiz")):r.a.createElement(Qe,{title:"Waiting for participants"}))})),Pe=n(5),De=n(141),Je=n(135),Ue=n.n(Je),We=n(136),Fe=n.n(We),Be=n(137),Le=n.n(Be),Me=n(138),ze=n.n(Me),Ge=function(e){var t=e.question,n=e.onClickAnswer,a=e.countedAnswers,o=e.disabled,c=e.selectedAnswerIdx;return console.log(e),r.a.createElement(r.a.Fragment,null,r.a.createElement(u.Helmet,null,r.a.createElement("title",null,"Answer question")),r.a.createElement(F,Object.assign({title:"Answer question",badge:t.progress},e),t.questionText&&r.a.createElement("h4",{className:"text-center mb-4"},t.questionText),t.answers&&t.answers.map(function(e,t){return r.a.createElement(d.b,{outline:c!==t,id:t,key:t,block:!0,onClick:n?function(e){var t=parseInt(e.target.id,10);n(t)}:null,color:"secondary",disabled:o},e.answerText,a&&r.a.createElement(d.a,{className:"float-right",color:"secondary"},0!==a[t]&&a[t]))})))};Ge.defaultProps={question:_e};var He=Ge,Ve=function(e){function t(){var e,n;Object(y.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(S.a)(this,(e=Object(O.a)(t)).call.apply(e,[this].concat(r)))).state={buttonPhase:0,countedAnswers:null},n}return Object(x.a)(t,e),Object(g.a)(t,[{key:"countAnswers",value:function(e,t){var n=e[t].map(function(e){return e.length});this.setState(function(e){return Object(Pe.a)({},e,{countedAnswers:n})})}},{key:"render",value:function(){var e=this,t=this.props,n=t.connections,a=t.questions,o=t.currentQuestionIdx,c=t.setCurrentQuestionIdx,s=t.toggleAcceptingAnswers,l=(t.history,t.status,t.registeredAnswers),i=this.state,u=i.buttonPhase,m=i.countedAnswers,E=n.length>0,p=o||0,f=p+1,b=function(e,t){if(e&&e[t]){var n=e[t],a=(n.correctAnswers,Object(De.a)(n,["correctAnswers"])),r=String(t+1),o=Object.keys(e).length;return{question:Object(Pe.a)({},a,{questionIdx:t,progress:"".concat(r,"/").concat(o)})}}return null}(a,p);return r.a.createElement(d.C,{className:"justify-content-center"},E?r.a.createElement(He,{question:b.question,countedAnswers:m,disabled:!0,footer:E&&r.a.createElement(d.b,{color:"secondary",block:!0,onClick:function(){switch(u){case 0:!function(e,t){t.length>0&&e?t.forEach(function(t){return t.send(JSON.stringify(e))}):console.error("Can't send question to clients")}(b,n),s(),e.setState({buttonPhase:1});break;case 1:s(),e.setState({buttonPhase:2});break;case 2:e.countAnswers(l,p),e.setState({buttonPhase:3});break;case 3:c(f),e.setState({buttonPhase:0})}}},function(){switch(u){case 0:return r.a.createElement(r.a.Fragment,null,r.a.createElement(Ue.a,{style:{paddingBottom:"3px"}})," Start question");case 1:return r.a.createElement(r.a.Fragment,null,r.a.createElement(Fe.a,{style:{paddingBottom:"3px"}})," Stop Question");case 2:return r.a.createElement(r.a.Fragment,null,r.a.createElement(ze.a,{style:{paddingBottom:"3px"}})," ","Show Results");case 3:return r.a.createElement(r.a.Fragment,null,r.a.createElement(Le.a,{style:{paddingBottom:"3px"}})," ","Next Question");default:return r.a.createElement(r.a.Fragment,null)}}())}):r.a.createElement(Qe,{title:"Waiting for participants"}))}}]),t}(r.a.Component),Xe={setCurrentQuestionIdx:function(e){return{type:"SET_CURRENT_QUESTION_IDX",payload:{questionIdx:e}}},toggleAcceptingAnswers:function(){return{type:"TOGGLE_ACCEPTING_ANSWERS"}}},Ye=Object(m.b)(function(e){return{status:e.connection.status,connections:e.server.connections,questions:e.questionEditor,currentQuestionIdx:e.server.currentQuestion,registeredAnswers:e.registeredAnswers}},Xe)(Object(P.a)(Ve)),$e=n(26),Ke=n(139),Ze=n.n(Ke),et=function(e,t,n){return e.map(function(e,a){return t===a?n(e):e})},tt={answerText:"New answer"},nt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{connections:[],ownServerId:"",currentQuestion:null,acceptingAnswers:!1},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENT_QUESTION_IDX":return Object(Pe.a)({},e,{currentQuestion:t.payload.questionIdx});case M:return Object(Pe.a)({},e,{connections:Object($e.a)(e.connections).concat([t.payload.connection])});case z:return Object(Pe.a)({},e,{ownServerId:t.payload.newId});case"TOGGLE_ACCEPTING_ANSWERS":return Object(Pe.a)({},e,{acceptingAnswers:!e.acceptingAnswers});default:return e}},at=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case H:return console.log("HELLO REDUCER"),t.payload.array;case G:return console.log("Reducer",t.payload),et(e,t.payload.questionIdx,function(e){return et(e,t.payload.answerIdx,function(e){return e.push(t.payload.userId),e})});default:return e}},rt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{peer:null,status:0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case X:return Object(Pe.a)({},e,{status:t.payload.newStatus});case V:return Object(Pe.a)({},e,{peer:t.payload.peer});default:return e}},ot=Object(E.combineReducers)({registeredAnswers:at,connection:rt,server:nt,questionEditor:function(){var e,t,n,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments.length>1?arguments[1]:void 0;switch(r.type){case fe:var o=JSON.parse(JSON.stringify(a));return o.push({id:Ze()(6),questionType:"singleChoice",questionText:"<p>New question</p>",correctAnswers:null,answers:[{answerText:"Answer A"},{answerText:"Answer B"}]}),o;case be:var c=r.payload,s=c.questionIdx,l=c.questionText,i=JSON.parse(JSON.stringify(a));return i[s]=Object(Pe.a)({},i[s],{questionText:l}),i;case he:var u=JSON.parse(JSON.stringify(a));return Object($e.a)(u.slice(0,r.payload.questionIdx)).concat(Object($e.a)(u.slice(r.payload.questionIdx+1)));case xe:var d=r.payload,m=d.questionIdx,E=d.answerIdx,p=JSON.parse(JSON.stringify(a));return et(p,m,function(e){return Object(Pe.a)({},e,{answers:(t=e.answers,n=E,t.filter(function(e,t){return n!==t}))});var t,n});case Se:var f=r.payload.questionIdx,b=JSON.parse(JSON.stringify(a));return b[f]=Object(Pe.a)({},a[f],{answers:Object($e.a)(a[f].answers).concat([tt])}),b;case Oe:var h=r.payload,w=h.questionIdx,v=h.answerText,y=h.answerIdx,g=JSON.parse(JSON.stringify(a));return et(g,w,function(e){return Object(Pe.a)({},e,{answers:et(e.answers,y,function(e){return Object(Pe.a)({},e,{answerText:v})})})});case ge:var S=r.payload,O=S.questionIdx,x=S.answerIdx,A=JSON.parse(JSON.stringify(a));return et(A,O,function(e){return Object(Pe.a)({},e,{correctAnswers:x})});case we:return r.payload.newQuestions;case ve:var C=r.payload,I=C.newQuestionIdx,j=C.oldQuestionIdx,N=JSON.parse(JSON.stringify(a));return t=j,n=I,(e=N)&&e.splice(n,0,e.splice(t,1)[0]),N;default:return a}},selectedQuestion:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case pe:return t.payload.questionIdx;default:return e}}}),ct=Object(E.createStore)(ot,Object(f.composeWithDevTools)(Object(E.applyMiddleware)(p.a))),st=function(){return r.a.createElement("div",null,r.a.createElement(m.a,{store:ct},r.a.createElement(r.a.Fragment,null,r.a.createElement(k,null),r.a.createElement(d.i,null,r.a.createElement(i.a,{exact:!0,path:"/server/create",component:te}),r.a.createElement(i.a,{exact:!0,path:"/server/editor",component:Ie}),r.a.createElement(i.a,{exact:!0,path:"/server/wait",component:ke}),r.a.createElement(i.a,{exact:!0,path:"/server/ask",component:Ye}),r.a.createElement(w,null)))))},lt="ADD_CONNECTION",it="SET_REMOTE_SERVER_ID",ut="SET_CURRENT_QUESTION";var dt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{connection:null,remoteServerId:"",questionIdx:null,currentQuestion:{}},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case lt:return Object(Pe.a)({},e,{connection:t.payload.connection});case it:return Object(Pe.a)({},e,{remoteServerId:t.payload.newId});case ut:return Object(Pe.a)({},e,{currentQuestion:t.payload.newQuestion});default:return e}},mt=Object(E.combineReducers)({connection:rt,client:dt}),Et=Object(m.b)(function(e){return{status:e.connection.status}})(function(e){return r.a.createElement(Q,Object.assign({isClient:!0},e))}),pt=function(e,t){var n=Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_PEERJS_SERVER:"peerjs-server-mvmastudcl.now.sh",REACT_APP_PEERJS_SECURE:"true",REACT_APP_PEERJS_DEBUG:"2"}),a=n.REACT_APP_PEERJS_SERVER,r=n.REACT_APP_PEERJS_SECURE,o=n.REACT_APP_PEERJS_DEBUG,c=new J.a({host:a,secure:"true"===r,debug:parseInt(o,10)});t($(c)),c.on("error",function(e){console.error(e),t(Y(3))});var s=c.connect(e,{reliable:!1});t(function(e){return{type:lt,payload:{connection:e}}}(s)),t(Y(1)),s.on("open",function(){console.log("Client Connected"),t(Y(2)),s.on("data",function(e){var n,a=JSON.parse(e);console.log("Received data: ",a),t((n=a.question,{type:ut,payload:{newQuestion:n}}))})})},ft={title:"Connect to Server",text:"Please enter a valid Server ID. You should receive this ID from your instructor.",buttonText:"Connect",location:"/client/answer"},bt=Object(m.b)(function(e){return{serverId:e.client.remoteServerId}},function(e){return{onChangeServerId:function(t){return e({type:it,payload:{newId:t}})},onClickConnect:function(t){return pt(t,e)}}})(function(e){return r.a.createElement(d.C,{className:"justify-content-center"},r.a.createElement(L,Object.assign({},e,ft)))}),ht=function(e){function t(e){var n;return Object(y.a)(this,t),(n=Object(S.a)(this,Object(O.a)(t).call(this,e))).initialState={disabled:!1,selectedAnswerIdx:null},n.state=n.initialState,n}return Object(x.a)(t,e),Object(g.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.currentQuestion!==e.currentQuestion&&this.resetState()}},{key:"resetState",value:function(){this.setState(this.initialState)}},{key:"render",value:function(){var e=this,t=this.props,n=t.currentQuestion,a=t.connection,o=this.state,c=o.disabled,s=o.selectedAnswerIdx,l=Object.keys(n).length>0;return r.a.createElement(d.C,{className:"justify-content-center"},l?r.a.createElement(He,{question:n,disabled:c,selectedAnswerIdx:s,onClickAnswer:function(t){console.log("Sending back answer ",t,n),function(e,t,n){e&&e.send({type:"answer",payload:{questionIdx:n,answerIdx:t,userId:e.provider.id}})}(a,t,n.questionIdx),e.setState({disabled:!0,selectedAnswerIdx:t},function(){return console.log("New state",e.state)})}}):r.a.createElement(Qe,{title:"Waiting for question"}))}}]),t}(r.a.Component);ht.defaultProps={currentQuestion:_e};var wt=Object(m.b)(function(e){return{currentQuestion:e.client.currentQuestion,connection:e.client.connection}})(ht),vt=Object(E.createStore)(mt,Object(f.composeWithDevTools)(Object(E.applyMiddleware)(p.a))),yt=function(){return r.a.createElement("div",null,r.a.createElement(m.a,{store:vt},r.a.createElement(r.a.Fragment,null,r.a.createElement(Et,null),r.a.createElement(d.i,null,r.a.createElement(i.a,{exact:!0,path:"/client/connect",component:bt}),r.a.createElement(i.a,{exact:!0,path:"/client/answer",component:wt}),r.a.createElement(w,null)))))},gt=n(140),St=(n(354),function(e){function t(e){var n;return Object(y.a)(this,t),(n=Object(S.a)(this,Object(O.a)(t).call(this,e))).state={data:""},n}return Object(x.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat("","/README.MD")).then(function(e){return e.text()}).then(function(e){return Object(gt.a)(e)}).then(function(t){return e.setState({data:t})})}},{key:"render",value:function(){var e=this.state.data;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Q,null),r.a.createElement(d.i,null,r.a.createElement(d.C,null,r.a.createElement(d.h,{md:"12"},r.a.createElement(d.c,{className:"shadow"},r.a.createElement(d.f,null,r.a.createElement("h6",{className:"my-0"},"About")),r.a.createElement(d.d,null,r.a.createElement("div",{className:"markdown-body",style:{fontFamily:"IBM Plex Sans"},dangerouslySetInnerHTML:{__html:e}}))))),r.a.createElement(w,null)))}}]),t}(r.a.Component)),Ot=function(e){var t=e.header,n=e.text,a=e.children,o=e.emoji;return r.a.createElement("div",null,r.a.createElement(d.c,{className:"shadow"},r.a.createElement(d.f,null,r.a.createElement("h4",{className:"my-0"},t)),r.a.createElement(d.d,null,r.a.createElement(d.g,null,r.a.createElement("span",{role:"img","aria-label":"Student",className:"d-block",style:{fontSize:"4em"}},o),r.a.createElement("span",null,n)),a)))};Ot.defaultProps={header:"",text:"",children:"",emoji:""};var xt=Ot,At=function(){return r.a.createElement(d.i,null,r.a.createElement("div",{className:"pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"},r.a.createElement("h1",{className:"display-4"},"Weclare"),r.a.createElement("p",{className:"lead"},"A web based, peer-to-peer classroom response system, tailored to computer science education at university level.")),r.a.createElement(d.C,null,r.a.createElement(d.h,{sm:"6"},r.a.createElement("div",{className:"card-deck mb-3 text-center"},r.a.createElement(xt,{header:"For Students",text:"Start the client app, which allows you to connect to an existing session and answer questions.",emoji:"\ud83d\udc69\u200d\ud83c\udf93"},r.a.createElement(d.b,{tag:v.a,to:"/client/connect",className:"btn btn-lg btn-block btn-outline-primary"},"Join Quiz")))),r.a.createElement(d.h,{sm:"6"},r.a.createElement("div",{className:"card-deck mb-3 text-center"},r.a.createElement(xt,{header:"For Instructors",text:"Start the server app, which allows you to create new question sets and accept connections from students.",emoji:"\ud83d\udc69\u200d\ud83c\udfeb"},r.a.createElement(d.b,{tag:v.a,to:"/server/editor",className:"btn btn-lg btn-block btn-outline-primary"},"Create Quiz"))))),r.a.createElement(w,null))},Ct=function(){return r.a.createElement(s.a,{basename:""},r.a.createElement("div",{className:"App"},r.a.createElement(u.Helmet,{titleTemplate:"Weclare | %s",defaultTitle:"Weclare \u2013 A web based classroom response system"}),r.a.createElement(l.a,null,r.a.createElement(i.a,{path:"/",exact:!0,component:At}),r.a.createElement(i.a,{path:"/server",component:st}),r.a.createElement(i.a,{path:"/client",component:yt}),r.a.createElement(i.a,{path:"/about",component:St}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(356);c.a.render(r.a.createElement(Ct,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[142,2,1]]]);
//# sourceMappingURL=main.44dea17f.chunk.js.map