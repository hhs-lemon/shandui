(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-refer-share"],{"11fc":function(t,e,r){"use strict";var n=r("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(r("5d1b")),o={name:"uqrcode",data:function(){return{options:{canvasId:"qrcode",size:354,margin:10,text:""}}},methods:{make:function(t){return i.default.make(Object.assign(this.options,t),this)}}};e.default=o},"4ec1":function(t,e,r){"use strict";r.r(e);var n=r("82f4"),i=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},5119:function(t,e,r){var n=r("cdab");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=r("4f06").default;i("116c07d8",n,!0,{sourceMap:!1,shadowMode:!1})},"530f":function(t,e,r){"use strict";r.r(e);var n=r("11fc"),i=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"5d1b":function(t,e,r){"use strict";r("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={};(function(){function t(t){this.mode=r.MODE_8BIT_BYTE,this.data=t}function e(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=new Array}t.prototype={getLength:function(t){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},e.prototype={addData:function(e){var r=new t(e);this.dataList.push(r),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){if(this.typeNumber<1){var t=1;for(t=1;t<40;t++){for(var e=c.getRSBlocks(t,this.errorCorrectLevel),r=new h,n=0,i=0;i<e.length;i++)n+=e[i].dataCount;for(i=0;i<this.dataList.length;i++){var o=this.dataList[i];r.put(o.mode,4),r.put(o.getLength(),a.getLengthInBits(o.mode,t)),o.write(r)}if(r.getLengthInBits()<=8*n)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,r){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++){this.modules[n]=new Array(this.moduleCount);for(var i=0;i<this.moduleCount;i++)this.modules[n][i]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,r),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=e.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,r)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var n=-1;n<=7;n++)e+n<=-1||this.moduleCount<=e+n||(this.modules[t+r][e+n]=0<=r&&r<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=n&&n<=4)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var n=a.getLostPoint(this);(0==r||t>n)&&(t=n,e=r)}return e},createMovieClip:function(t,e,r){var n=t.createEmptyMovieClip(e,r),i=1;this.make();for(var o=0;o<this.modules.length;o++)for(var a=o*i,s=0;s<this.modules[o].length;s++){var u=s*i,l=this.modules[o][s];l&&(n.beginFill(0,100),n.moveTo(u,a),n.lineTo(u+i,a),n.lineTo(u+i,a+i),n.lineTo(u,a+i),n.endFill())}return n},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=a.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var n=t[e],i=t[r];if(null==this.modules[n][i])for(var o=-2;o<=2;o++)for(var s=-2;s<=2;s++)this.modules[n+o][i+s]=-2==o||2==o||-2==s||2==s||0==o&&0==s}},setupTypeNumber:function(t){for(var e=a.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var n=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=n}for(r=0;r<18;r++){n=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=n}},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,n=a.getBCHTypeInfo(r),i=0;i<15;i++){var o=!t&&1==(n>>i&1);i<6?this.modules[i][8]=o:i<8?this.modules[i+1][8]=o:this.modules[this.moduleCount-15+i][8]=o}for(i=0;i<15;i++){o=!t&&1==(n>>i&1);i<8?this.modules[8][this.moduleCount-i-1]=o:i<9?this.modules[8][15-i-1+1]=o:this.modules[8][15-i-1]=o}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,n=this.moduleCount-1,i=7,o=0,s=this.moduleCount-1;s>0;s-=2){6==s&&s--;while(1){for(var u=0;u<2;u++)if(null==this.modules[n][s-u]){var l=!1;o<t.length&&(l=1==(t[o]>>>i&1));var c=a.getMask(e,n,s-u);c&&(l=!l),this.modules[n][s-u]=l,i--,-1==i&&(o++,i=7)}if(n+=r,n<0||this.moduleCount<=n){n-=r,r=-r;break}}}}},e.PAD0=236,e.PAD1=17,e.createData=function(t,r,n){for(var i=c.getRSBlocks(t,r),o=new h,s=0;s<n.length;s++){var u=n[s];o.put(u.mode,4),o.put(u.getLength(),a.getLengthInBits(u.mode,t)),u.write(o)}var l=0;for(s=0;s<i.length;s++)l+=i[s].dataCount;if(o.getLengthInBits()>8*l)throw new Error("code length overflow. ("+o.getLengthInBits()+">"+8*l+")");o.getLengthInBits()+4<=8*l&&o.put(0,4);while(o.getLengthInBits()%8!=0)o.putBit(!1);while(1){if(o.getLengthInBits()>=8*l)break;if(o.put(e.PAD0,8),o.getLengthInBits()>=8*l)break;o.put(e.PAD1,8)}return e.createBytes(o,i)},e.createBytes=function(t,e){for(var r=0,n=0,i=0,o=new Array(e.length),s=new Array(e.length),u=0;u<e.length;u++){var c=e[u].dataCount,h=e[u].totalCount-c;n=Math.max(n,c),i=Math.max(i,h),o[u]=new Array(c);for(var f=0;f<o[u].length;f++)o[u][f]=255&t.buffer[f+r];r+=c;var d=a.getErrorCorrectPolynomial(h),g=new l(o[u],d.getLength()-1),v=g.mod(d);s[u]=new Array(d.getLength()-1);for(f=0;f<s[u].length;f++){var m=f+v.getLength()-s[u].length;s[u][f]=m>=0?v.get(m):0}}var p=0;for(f=0;f<e.length;f++)p+=e[f].totalCount;var C=new Array(p),w=0;for(f=0;f<n;f++)for(u=0;u<e.length;u++)f<o[u].length&&(C[w++]=o[u][f]);for(f=0;f<i;f++)for(u=0;u<e.length;u++)f<s[u].length&&(C[w++]=s[u][f]);return C};for(var r={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},i={L:1,M:0,Q:3,H:2},o={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},a={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){var e=t<<10;while(a.getBCHDigit(e)-a.getBCHDigit(a.G15)>=0)e^=a.G15<<a.getBCHDigit(e)-a.getBCHDigit(a.G15);return(t<<10|e)^a.G15_MASK},getBCHTypeNumber:function(t){var e=t<<12;while(a.getBCHDigit(e)-a.getBCHDigit(a.G18)>=0)e^=a.G18<<a.getBCHDigit(e)-a.getBCHDigit(a.G18);return t<<12|e},getBCHDigit:function(t){var e=0;while(0!=t)e++,t>>>=1;return e},getPatternPosition:function(t){return a.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case o.PATTERN000:return(e+r)%2==0;case o.PATTERN001:return e%2==0;case o.PATTERN010:return r%3==0;case o.PATTERN011:return(e+r)%3==0;case o.PATTERN100:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case o.PATTERN101:return e*r%2+e*r%3==0;case o.PATTERN110:return(e*r%2+e*r%3)%2==0;case o.PATTERN111:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new l([1],0),r=0;r<t;r++)e=e.multiply(new l([1,s.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case r.MODE_NUMBER:return 10;case r.MODE_ALPHA_NUM:return 9;case r.MODE_8BIT_BYTE:return 8;case r.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case r.MODE_NUMBER:return 12;case r.MODE_ALPHA_NUM:return 11;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case r.MODE_NUMBER:return 14;case r.MODE_ALPHA_NUM:return 13;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,n=0;n<e;n++)for(var i=0;i<e;i++){for(var o=0,a=t.isDark(n,i),s=-1;s<=1;s++)if(!(n+s<0||e<=n+s))for(var u=-1;u<=1;u++)i+u<0||e<=i+u||0==s&&0==u||a==t.isDark(n+s,i+u)&&o++;o>5&&(r+=3+o-5)}for(n=0;n<e-1;n++)for(i=0;i<e-1;i++){var l=0;t.isDark(n,i)&&l++,t.isDark(n+1,i)&&l++,t.isDark(n,i+1)&&l++,t.isDark(n+1,i+1)&&l++,0!=l&&4!=l||(r+=3)}for(n=0;n<e;n++)for(i=0;i<e-6;i++)t.isDark(n,i)&&!t.isDark(n,i+1)&&t.isDark(n,i+2)&&t.isDark(n,i+3)&&t.isDark(n,i+4)&&!t.isDark(n,i+5)&&t.isDark(n,i+6)&&(r+=40);for(i=0;i<e;i++)for(n=0;n<e-6;n++)t.isDark(n,i)&&!t.isDark(n+1,i)&&t.isDark(n+2,i)&&t.isDark(n+3,i)&&t.isDark(n+4,i)&&!t.isDark(n+5,i)&&t.isDark(n+6,i)&&(r+=40);var c=0;for(i=0;i<e;i++)for(n=0;n<e;n++)t.isDark(n,i)&&c++;var h=Math.abs(100*c/e/e-50)/5;return r+=10*h,r}},s={glog:function(t){if(t<1)throw new Error("glog("+t+")");return s.LOG_TABLE[t]},gexp:function(t){while(t<0)t+=255;while(t>=256)t-=255;return s.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},u=0;u<8;u++)s.EXP_TABLE[u]=1<<u;for(u=8;u<256;u++)s.EXP_TABLE[u]=s.EXP_TABLE[u-4]^s.EXP_TABLE[u-5]^s.EXP_TABLE[u-6]^s.EXP_TABLE[u-8];for(u=0;u<255;u++)s.LOG_TABLE[s.EXP_TABLE[u]]=u;function l(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);var r=0;while(r<t.length&&0==t[r])r++;this.num=new Array(t.length-r+e);for(var n=0;n<t.length-r;n++)this.num[n]=t[n+r]}function c(t,e){this.totalCount=t,this.dataCount=e}function h(){this.buffer=new Array,this.length=0}function f(t){for(var e,r="",n=0;n<t.length;n++)e=t.charCodeAt(n),e>=1&&e<=127?r+=t.charAt(n):e>2047?(r+=String.fromCharCode(224|e>>12&15),r+=String.fromCharCode(128|e>>6&63),r+=String.fromCharCode(128|e>>0&63)):(r+=String.fromCharCode(192|e>>6&31),r+=String.fromCharCode(128|e>>0&63));return r}l.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var n=0;n<t.getLength();n++)e[r+n]^=s.gexp(s.glog(this.get(r))+s.glog(t.get(n)));return new l(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=s.glog(this.get(0))-s.glog(t.get(0)),r=new Array(this.getLength()),n=0;n<this.getLength();n++)r[n]=this.get(n);for(n=0;n<t.getLength();n++)r[n]^=s.gexp(s.glog(t.get(n))+e);return new l(r,0).mod(t)}},c.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],c.getRSBlocks=function(t,e){var r=c.getRsBlockTable(t,e);if(void 0==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var n=r.length/3,i=new Array,o=0;o<n;o++)for(var a=r[3*o+0],s=r[3*o+1],u=r[3*o+2],l=0;l<a;l++)i.push(new c(s,u));return i},c.getRsBlockTable=function(t,e){switch(e){case i.L:return c.RS_BLOCK_TABLE[4*(t-1)+0];case i.M:return c.RS_BLOCK_TABLE[4*(t-1)+1];case i.Q:return c.RS_BLOCK_TABLE[4*(t-1)+2];case i.H:return c.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},h.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},n={errorCorrectLevel:i,defaults:{size:354,margin:0,backgroundColor:"#ffffff",foregroundColor:"#000000",fileType:"png",errorCorrectLevel:i.H,typeNumber:-1,enableDelay:!1},getModules:function(t){t=Object.assign(this.defaults,t);var r=new e(t.typeNumber,t.errorCorrectLevel);return r.addData(f(t.text)),r.make(),r.modules},make:function(t,e){var r=this;return new Promise((function(n,i){if(t=Object.assign(r.defaults,t),!t.canvasId)throw new Error("uQRCode: Please set canvasId!");var o=r.getModules(t),a=(t.size-2*t.margin)/o.length,s=a,u=0;setTimeout((function(){var r=uni.createCanvasContext(t.canvasId,e);r.setFillStyle(t.backgroundColor),r.fillRect(0,0,t.size,t.size);for(var l=0;l<o.length;l++)for(var c=0;c<o.length;c++)u=t.enableDelay?l*o.length+c+1:0,setTimeout((function(e,n){var i=Math.round(n*a)+t.margin,u=Math.round(e*s)+t.margin,l=Math.ceil((n+1)*a)-Math.floor(n*a),c=Math.ceil((e+1)*a)-Math.floor(e*a),h=o[e][n]?t.foregroundColor:t.backgroundColor;r.setFillStyle(h),r.fillRect(i,u,l,c)}),u,l,c);var h=t.enableDelay?u+2*t.size+2*t.margin+t.text.length:0;setTimeout((function(){r.draw(!1,(function(){uni.canvasToTempFilePath({canvasId:t.canvasId,fileType:t.fileType,width:t.size,height:t.size,destWidth:t.size,destHeight:t.size,success:function(t){n(Object.assign(t,{time:h+50}))},fail:function(t){i(t)}},e)}))}),h)}),50)}))}}})();var i=n;e.default=i},"723d":function(t,e,r){"use strict";r.r(e);var n=r("c895"),i=r("530f");for(var o in i)"default"!==o&&function(t){r.d(e,t,(function(){return i[t]}))}(o);var a,s=r("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"6a5f415e",null,!1,n["a"],a);e["default"]=u.exports},"82f4":function(t,e,r){"use strict";var n=r("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(r("a485")),o={data:function(){return{qr_url:"/static/images/home/WechatIMG22.png",activeCode:"",invitation_url:"http://8.129.134.121/#/pages/login/register?code="}},components:{commonHead:i.default},onLoad:function(){var t=this;uni.setNavigationBarTitle({title:this.$t("My_Share")}),setTimeout((function(){t.$api.loading(!1)}),500)},onReady:function(){this.loadData()},methods:{openBrowser:function(t){plus.runtime.openURL(t)},copy:function(t){if(console.log(333,uni.setClipboardData()),document.execCommand){var e=document.createElement("input");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("Copy"),uni.showToast({title:this.$t("Copy_successful"),icon:"none",duration:2e3}),e.remove()}else uni.setClipboardData({data:t,success:function(){uni.hideToast({title:this.$t("Copy_successful"),duration:2e3,icon:"none"})},fail:function(t){console.log(44,t),uni.showToast({title:this.$t("Copy_failed"),duration:2e3,icon:"none"})}})},loadData:function(){var t=this.$queue.getData("user").inviteCode;this.$queue.getData("user").inviteUrl;this.activeCode=t,this.invitation_url="http://8.129.134.121/#/pages/login/register?code="+t,this.$refs.uqrcode.make({size:110,text:this.invitation_url}).then((function(t){}))}}};e.default=o},8908:function(t,e,r){"use strict";r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return o})),r.d(e,"a",(function(){return n}));var n={uqrcode:r("723d").default},i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-uni-view",{staticClass:"share"},[r("v-uni-view",{staticClass:"share-invitation"},[r("v-uni-view",{staticClass:"Share-code"},[r("v-uni-view",{staticClass:"code-title"},[t._v("-"+t._s(t.$t("Invitation_code"))+"-")]),r("v-uni-view",{staticClass:"code",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copy(t.activeCode)}}},[t._v(t._s(t.activeCode))]),r("v-uni-view",{staticClass:"tip"},[t._v(t._s(t.$t("Your_friends_can_also_fill_in_the_invitation_code_when_registering")))])],1),r("v-uni-view",{staticClass:"uqrcode"},[r("uqrcode",{ref:"uqrcode"})],1),r("v-uni-view",{staticClass:"share-link"},[t._v(t._s(t.invitation_url))]),r("v-uni-view",{staticClass:"link-copy",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.copy(t.invitation_url)}}},[t._v(t._s(t.$t("copy")))])],1)],1)},o=[]},a229:function(t,e,r){"use strict";r.r(e);var n=r("8908"),i=r("4ec1");for(var o in i)"default"!==o&&function(t){r.d(e,t,(function(){return i[t]}))}(o);r("a425");var a,s=r("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"35f0379e",null,!1,n["a"],a);e["default"]=u.exports},a425:function(t,e,r){"use strict";var n=r("5119"),i=r.n(n);i.a},c895:function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return o})),r.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-uni-view",{staticClass:"uqrcode"},[r("v-uni-canvas",{style:{width:t.options.size+"px",height:t.options.size+"px"},attrs:{id:"qrcode","canvas-id":"qrcode"}})],1)},o=[]},cdab:function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.share-invitation[data-v-35f0379e]{margin:%?37?% %?30?%;font-weight:500;width:%?690?%;height:%?800?%;background:#fff;box-shadow:%?0?% %?2?% %?5?% %?0?% rgba(0,0,0,.3);border-radius:%?20?%}.share-invitation .Share-code[data-v-35f0379e]{text-align:center;margin:%?30?% auto %?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;color:#111113;font-size:%?30?%}.share-invitation .Share-code .code-title[data-v-35f0379e]{margin-top:%?46?%}.share-invitation .Share-code .code[data-v-35f0379e]{margin-top:%?40?%;font-size:%?60?%;color:#111113;letter-spacing:%?20?%;margin-left:%?20?%}.share-invitation .Share-code .tip[data-v-35f0379e]{font-size:%?20?%;color:#717171}.share-invitation .Share-code .share-invitation-copy[data-v-35f0379e]{height:%?50?%;line-height:%?50?%;display:inline-block;border-radius:%?30?%;color:#6a32da;width:%?100?%;font-size:%?24?%;border:%?1?% solid #ddd;text-align:center;background-image:-webkit-linear-gradient(0,#fcfcab,#fff);background-image:linear-gradient(0,#fcfcab,#fff)}.share-invitation .uqrcode[data-v-35f0379e]{width:%?220?%;margin:%?50?% auto %?50?%}.share-invitation .share-link[data-v-35f0379e]{margin:%?40?% auto;width:%?502?%;font-size:%?24?%;color:#717171;line-height:%?44?%;text-decoration:underline;text-align:center;word-break:break-all}.share-invitation .link-copy[data-v-35f0379e]{margin:auto;text-align:center;width:%?160?%;height:%?50?%;border:%?1?% solid #000;border-radius:%?25?%;font-size:%?24?%;color:#686868;line-height:%?50?%}',""]),t.exports=e}}]);