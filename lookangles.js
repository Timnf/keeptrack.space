(function lookangles(){
// //////////////Satellite.js/////////////////////////////////////////////////
/*Copyright (C) 2013 Shashwat Kandadai, UCSC Jack Baskin School of Engineering

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

satellite=function(){function he(b,c){var d=c.init,f=c.ep,g=c.inclp,e=c.nodep,n=c.argpp,ab=c.mp,L=c.opsmode,v,y,z,k,q,p,W,G,A,B,D,ea,fa,E,w,X,M;W=b.e3;var ga=b.ee2;y=b.peo;v=b.pgho;z=b.pho;k=b.pinco;var ma=b.plo;ea=b.se2;var sa=b.se3;fa=b.sgh2;var cb=b.sgh3,db=b.sgh4;E=b.sh2;var eb=b.sh3;X=b.si2;var Ia=b.si3;M=b.sl2;var ha=b.sl3,Ja=b.sl4,H=b.t;G=b.xgh2;var Q=b.xgh3,Ba=b.xgh4;A=b.xh2;var ta=b.xh3;B=b.xi2;var ua=b.xi3;D=b.xl2;var fb=b.xl3,ia=b.xl4,va=b.zmol;p=b.zmos;q=p+1.19459E-5*H;"y"===d&&(q=p);
p=q+.0335*Math.sin(q);w=Math.sin(p);q=.5*w*w-.25;p=-.5*w*Math.cos(p);ea=ea*q+sa*p;X=X*q+Ia*p;M=M*q+ha*p+Ja*w;fa=fa*q+cb*p+db*w;E=E*q+eb*p;q=va+1.5835218E-4*H;"y"===d&&(q=va);p=q+.1098*Math.sin(q);w=Math.sin(p);q=.5*w*w-.25;p=-.5*w*Math.cos(p);W=ea+(ga*q+W*p);B=X+(B*q+ua*p);D=M+(D*q+fb*p+ia*w);G=fa+(G*q+Q*p+Ba*w);A=E+(A*q+ta*p);"n"===d&&(B-=k,D-=ma,G-=v,A-=z,g+=B,f+=W-y,z=Math.sin(g),y=Math.cos(g),.2<=g?(A/=z,n+=G-y*A,e+=A,ab+=D):(k=Math.sin(e),v=Math.cos(e),d=z*k+(A*v+B*y*k),v=z*v+(-A*k+B*y*v),e%=
r,0>e&&"a"===L&&(e+=r),z=D+G-B*e*z,n=ab+n+y*e+z,z=e,e=Math.atan2(d,v),0>e&&"a"===L&&(e+=r),Math.abs(z-e)>N&&(e=e<z?e+r:e-r),ab+=D,n=n-ab-y*e));return{ep:f,inclp:g,nodep:e,argpp:n,mp:ab}}function lc(b){b=(b-2451545)/36525;b=(-6.2E-6*b*b*b+.093104*b*b+3.164400184812866E9*b+67310.54841)*Ka/240%r;0>b&&(b+=r);return b}function sd(b,c,d,f,g,e){return 367*b-Math.floor(1.75*(b+Math.floor((c+9)/12)))+Math.floor(275*c/9)+d+1721013.5+((e/60+g)/60+f)/24}function td(b,c){var d,f,g,e,n,k,L,v,y,z,Ka,q,p,W,G,A,B,
D,ea,fa,E,w,X,M,ga,bb,sa,cb,db,eb,Ia,ha,Ja,H,Q,Ba,ta,ua,fb,ia,va,mc,La,Ma,Na,Eb,nc,Y,I,Ca,Oa,Pa,gb,hb,oc,Fb,Gb,Hb,pc,qc,rc,Da,R,ja,ka,Ib,Z,ib,jb,kb,Jb,Kb,sc,Lb,la,Qa=0,Mb=6378.137*ma/60;b.t=c;b.error=0;kb=b.mo+b.mdot*b.t;var tc=b.argpo+b.argpdot*b.t;sc=b.nodeo+b.nodedot*b.t;H=tc;R=kb;Ma=b.t*b.t;ka=sc+b.nodecf*Ma;Pa=1-b.cc1*b.t;gb=b.bstar*b.cc4*b.t;hb=b.t2cof*Ma;if(1!==b.isimp){db=b.omgcof*b.t;var Nb=1+b.eta*Math.cos(kb);cb=b.xmcof*(Nb*Nb*Nb-b.delmo);I=db+cb;R=kb+I;H=tc-I;Na=Ma*b.t;Eb=Na*b.t;Pa=Pa-
b.d2*Ma-b.d3*Na-b.d4*Eb;gb+=b.bstar*b.cc5*(Math.sin(R)-b.sinmao);hb=hb+b.t3cof*Na+Eb*(b.t4cof+b.t*b.t5cof)}ja=b.no;var aa=b.ecco;Da=b.inclo;if("d"===b.method){nc=b.t;var lb,na,Ob,S,Ea,a,Ra,wa,xa,x,Sa=b.irez,Oc=b.d2201,Pc=b.d2211,Ta=b.d3210,uc=b.d3222,vc=b.d4410,Pb=b.d4422,Qc=b.d5220,Rc=b.d5232,Sc=b.d5421,Tc=b.d5433,lc=b.dedt,Uc=b.del1,Vc=b.del2,Fa=b.del3,Wc=b.didt,wc=b.dmdt,Qb=b.dnodt,Rb=b.domdt,Sb=b.argpo,ya=b.argpdot,t=b.t,Tb=b.xfact,Ub=b.xlamo,Ga=b.no,O=b.atime,mb=aa,P=H,nb=Da,h=b.xli,Ha=R,za=
b.xni,J=ka,ob=ja,Vb=0;Ob=(b.gsto+.0043752690880113*nc)%r;mb+=lc*t;nb+=Wc*t;P+=Rb*t;J+=Qb*t;Ha+=wc*t;na=0;if(0!==Sa){if(0===O||0>=t*O||Math.abs(t)<Math.abs(O))O=0,za=Ga,h=Ub;lb=0<t?720:-720;for(var Wb=381;381===Wb;)2!==Sa?(xa=Uc*Math.sin(h-.13130908)+Vc*Math.sin(2*(h-2.8843198))+Fa*Math.sin(3*(h-.37448087)),Ra=za+Tb,wa=Uc*Math.cos(h-.13130908)+2*Vc*Math.cos(2*(h-2.8843198))+3*Fa*Math.cos(3*(h-.37448087))):(x=Sb+ya*O,Ea=x+x,S=h+h,xa=Oc*Math.sin(Ea+h-5.7686396)+Pc*Math.sin(h-5.7686396)+Ta*Math.sin(x+
h-.95240898)+uc*Math.sin(-x+h-.95240898)+vc*Math.sin(Ea+S-1.8014998)+Pb*Math.sin(S-1.8014998)+Qc*Math.sin(x+h-1.050833)+Rc*Math.sin(-x+h-1.050833)+Sc*Math.sin(x+S-4.4108898)+Tc*Math.sin(-x+S-4.4108898),Ra=za+Tb,wa=Oc*Math.cos(Ea+h-5.7686396)+Pc*Math.cos(h-5.7686396)+Ta*Math.cos(x+h-.95240898)+uc*Math.cos(-x+h-.95240898)+Qc*Math.cos(x+h-1.050833)+Rc*Math.cos(-x+h-1.050833)+2*(vc*Math.cos(Ea+S-1.8014998)+Pb*Math.cos(S-1.8014998)+Sc*Math.cos(x+S-4.4108898)+Tc*Math.cos(-x+S-4.4108898))),wa*=Ra,720<=Math.abs(t-
O)?Wb=381:(na=t-O,Wb=0),381===Wb&&(h=h+Ra*lb+259200*xa,za=za+xa*lb+259200*wa,O+=lb);ob=za+xa*na+wa*na*na*.5;a=h+Ra*na+xa*na*na*.5;Ha=1!==Sa?a-2*J+2*Ob:a-J-P+Ob;Vb=ob-Ga;ob=Ga+Vb}d=mb;f=P;g=nb;e=Ha;n=J;k=ob;aa=d;H=f;Da=g;R=e;ka=n;ja=k}if(0>=ja)return b.error=2,[!1,!1];L=Math.pow(ma/ja,ud)*Pa*Pa;ja=ma/Math.pow(L,1.5);aa-=gb;if(1<=aa||-.001>aa)return b.error=1,[!1,!1];1E-6>aa&&(aa=1E-6);R+=b.no*hb;ib=R+H+ka;ka%=r;H%=r;ib%=r;R=(ib-H-ka)%r;q=Math.sin(Da);Ka=Math.cos(Da);var T=aa;Z=Da;Q=H;la=ka;jb=R;w=
q;E=Ka;if("d"===b.method){var pb=he(b,{inclo:b.inclo,init:"n",ep:T,inclp:Z,nodep:la,argpp:Q,mp:jb,opsmode:b.operationmod}),T=pb.ep;Z=pb.inclp;la=pb.nodep;Q=pb.argpp;jb=pb.mp;0>Z&&(Z=-Z,la+=N,Q-=N);if(0>T||1<T)return b.error=3,[!1,!1]}"d"===b.method&&(w=Math.sin(Z),E=Math.cos(Z),b.aycof=.0011694452793710002*w,1.5E-12<Math.abs(E+1)?b.xlcof=5.847226396855001E-4*w*(3+5*E)/(1+E):b.xlcof=5.847226396855001E-4*w*(3+5*E)/1.5E-12);v=T*Math.cos(Q);I=1/(L*(1-T*T));y=T*Math.sin(Q)+I*b.aycof;ha=oc=(jb+Q+la+I*b.xlcof*
v-la)%r;Y=9999.9;for(var xc=1;1E-12<=Math.abs(Y)&&10>=xc;)D=Math.sin(ha),B=Math.cos(ha),Y=1-B*v-D*y,Y=(oc-y*B+v*D-ha)/Y,.95<=Math.abs(Y)&&(Y=0<Y?.95:-.95),ha+=Y,xc+=1;eb=v*B+y*D;Ja=v*D-y*B;Ia=v*v+y*y;Ba=L*(1-Ia);if(0>Ba)return b.error=4,[!1,!1];ia=L*(1-eb);fb=Math.sqrt(L)*Ja/ia;mc=Math.sqrt(Ba)/ia;z=Math.sqrt(1-Ia);I=Ja/(1+z);sa=L/ia*(D-y-v*I);bb=L/ia*(B-v+y*I);La=Math.atan2(sa,bb);A=(bb+bb)*sa;G=1-2*sa*sa;I=1/Ba;Ca=5.41314994525E-4*I;Oa=Ca*I;"d"===b.method&&(X=E*E,b.con41=3*X-1,b.x1mth2=1-X,b.x7thm1=
7*X-1);Qa=ia*(1-1.5*Oa*z*b.con41)+.5*Ca*b.x1mth2*G;La-=.25*Oa*b.x7thm1*A;Lb=la+1.5*Oa*E*A;Ib=Z+1.5*Oa*E*w*G;var qb=fb-ja*Ca*b.x1mth2*A/ma;va=mc+ja*Ca*(b.x1mth2*G+1.5*b.con41)/ma;ga=Math.sin(La);M=Math.cos(La);W=Math.sin(Lb);p=Math.cos(Lb);fa=Math.sin(Ib);ea=Math.cos(Ib);Jb=-W*ea;Kb=p*ea;Fb=Jb*ga+p*M;Gb=Kb*ga+W*M;Hb=fa*ga;pc=Jb*M-p*ga;qc=Kb*M-W*ga;rc=fa*M;ta={x:0,y:0,z:0};ta.x=Qa*Fb*6378.137;ta.y=Qa*Gb*6378.137;ta.z=Qa*Hb*6378.137;ua={x:0,y:0,z:0};ua.x=(qb*Fb+va*pc)*Mb;ua.y=(qb*Gb+va*qc)*Mb;ua.z=(qb*
Hb+va*rc)*Mb;return 1>Qa?(b.error=6,{position:!1,velocity:!1}):{position:ta,velocity:ua}}function yc(b){var c=b.longitude,d=b.latitude,f=b.height,g=6378.137/Math.sqrt(1-.006694380004260718*Math.sin(d)*Math.sin(d));b=(g+f)*Math.cos(d)*Math.cos(c);c=(g+f)*Math.cos(d)*Math.sin(c);d=(.9933056199957393*g+f)*Math.sin(d);return{x:b,y:c,z:d}}var k={version:"1.2"},N=Math.PI,r=2*N,Ka=N/180,ma=60/Math.sqrt(6378.137*6378.137*6378.137/398600.5),Qf=1/ma,ud=2/3;k.gstime_from_jday=function(b){return lc(b)};k.gstime_from_date=
function(b,c,d,f,g,e){b=sd(b,c,d,f,g,e);return lc(b)};k.twoline2satrec=function(b,c){var d,f,g,e,n,k,L,v,y,z,yc,q,p,W,G,A,B,D,ea,fa,E,w,X,M,ga,bb,sa,cb,db,eb,Ia,ha,Ja,H,Q,Ba,ta,ua,fb,ia,va,mc,La,Ma,Na,Eb,nc,Y,I,Ca,Oa,Pa,gb,hb,oc,Fb,Gb,Hb,pc,qc,rc,Da,R,ja,ka,Ib,Z,ib,jb,kb,Jb,Kb,sc,Lb,la,Qa,Mb,tc,Nb,aa,lb,na,Ob,S=1440/(2*N),Ea=0,a={error:0};parseInt(b.substring(0,1),10);a.satnum=b.substring(2,7);b.substring(7,8);b.substring(9,11);a.epochyr=parseInt(b.substring(18,20),10);a.epochdays=parseFloat(b.substring(20,
32));a.ndot=parseFloat(b.substring(33,43));a.nddot=parseFloat("."+parseInt(b.substring(44,50),10)+"E"+b.substring(50,52));a.bstar=parseFloat(b.substring(53,54)+"."+parseInt(b.substring(54,59),10)+"E"+b.substring(59,61));parseInt(b.substring(62,63),10);parseInt(b.substring(64,68),10);a.inclo=parseFloat(c.substring(8,16));a.nodeo=parseFloat(c.substring(17,25));a.ecco=parseFloat("."+c.substring(26,33));a.argpo=parseFloat(c.substring(34,42));a.mo=parseFloat(c.substring(43,51));a.no=parseFloat(c.substring(52,
63));parseFloat(c.substring(63,68));a.no/=S;a.a=Math.pow(a.no*Qf,-2/3);a.ndot/=1440*S;a.nddot/=2073600*S;a.inclo*=Ka;a.nodeo*=Ka;a.argpo*=Ka;a.mo*=Ka;a.alta=a.a*(1+a.ecco)-1;a.altp=a.a*(1-a.ecco)-1;var Ea=57>a.epochyr?a.epochyr+2E3:a.epochyr+1900,Ra=a.epochdays,wa=[31,28,31,30,31,30,31,31,30,31,30,31],xa=Math.floor(Ra);0===Ea%4&&(wa=[31,29,31,30,31,30,31,31,30,31,30,31]);for(var x=1,Sa=0;xa>Sa+wa[x-1]&&12>x;)Sa+=wa[x-1],x+=1;var Oc=x,Pc=xa-Sa,Ta=24*(Ra-xa),uc=Math.floor(Ta),Ta=60*(Ta-uc),vc=Math.floor(Ta);
a.jdsatepoch=sd(Ea,Oc,Pc,uc,vc,60*(Ta-vc));var Pb=a.jdsatepoch-2433281.5,Qc=a.bstar,Rc=a.ecco,Sc=a.argpo,Tc=a.inclo,Pf=a.mo,Uc=a.no,Vc=a.nodeo,Fa,Wc,wc,Qb,Rb,Sb,ya,t,Tb,Ub,Ga,O,mb,P,nb,h,Ha,za,J,ob,Vb;a.isimp=0;a.method="n";a.aycof=0;a.con41=0;a.cc1=0;a.cc4=0;a.cc5=0;a.d2=0;a.d3=0;a.d4=0;a.delmo=0;a.eta=0;a.argpdot=0;a.omgcof=0;a.sinmao=0;a.t=0;a.t2cof=0;a.t3cof=0;a.t4cof=0;a.t5cof=0;a.x1mth2=0;a.x7thm1=0;a.mdot=0;a.nodedot=0;a.xlcof=0;a.xmcof=0;a.nodecf=0;a.irez=0;a.d2201=0;a.d2211=0;a.d3210=0;a.d3222=
0;a.d4410=0;a.d4422=0;a.d5220=0;a.d5232=0;a.d5421=0;a.d5433=0;a.dedt=0;a.del1=0;a.del2=0;a.del3=0;a.didt=0;a.dmdt=0;a.dnodt=0;a.domdt=0;a.e3=0;a.ee2=0;a.peo=0;a.pgho=0;a.pho=0;a.pinco=0;a.plo=0;a.se2=0;a.se3=0;a.sgh2=0;a.sgh3=0;a.sgh4=0;a.sh2=0;a.sh3=0;a.si2=0;a.si3=0;a.sl2=0;a.sl3=0;a.sl4=0;a.gsto=0;a.xfact=0;a.xgh2=0;a.xgh3=0;a.xgh4=0;a.xh2=0;a.xh3=0;a.xi2=0;a.xi3=0;a.xl2=0;a.xl3=0;a.xl4=0;a.xlamo=0;a.zmol=0;a.zmos=0;a.atime=0;a.xli=0;a.xni=0;a.bstar=Qc;a.ecco=Rc;a.argpo=Sc;a.inclo=Tc;a.mo=Pf;a.no=
Uc;a.nodeo=Vc;a.operationmode="i";var Wb=78/6378.137+1,T=42/6378.137,pb=T*T*T*T,xc=2/3;a.init="y";a.t=0;var qb=a.ecco,ie=a.inclo,zc=a.no,Rf=a.operationmode,Xc,vd,wd,xd,Xb,je=qb*qb,rb=1-je,yd=Math.sqrt(rb),Ua=Math.cos(ie),U=Ua*Ua;Xc=Math.pow(ma/zc,ud);vd=8.119724917875E-4*(3*U-1)/(yd*rb);var sb=vd/(Xc*Xc);wd=Xc*(1-sb*sb-sb*(1/3+134*sb*sb/81));var sb=vd/(wd*wd),zc=zc/(1+sb),ba=Math.pow(ma/zc,ud),Yc=Math.sin(ie);xd=ba*rb;var ke=1-5*U,Sf=-ke-U-U,Tf=xd*xd,le=ba*(1-qb);if("a"===Rf){var Zc=Pb-7305,me=Math.floor(Zc+
1E-8);Xb=(1.7321343856509375+.017202791694070362*me+(.017202791694070362+r)*(Zc-me)+Zc*Zc*5.075514194322695E-15)%r;0>Xb&&(Xb+=r)}else Xb=lc(Pb+2433281.5);na=zc;Ob=Xb;a.no=na;a.con41=Sf;a.gsto=Ob;a.error=0;if(0<=rb||0<=a.no){a.isimp=0;le<220/6378.137+1&&(a.isimp=1);P=Wb;mb=pb;Ub=6378.137*(le-1);if(156>Ub){P=Ub-78;98>Ub&&(P=20);var $c=(120-P)/6378.137;mb=$c*$c*$c*$c;P=P/6378.137+1}Ga=1/Tf;J=1/(ba-P);a.eta=ba*a.ecco*J;t=a.eta*a.eta;ya=a.ecco*a.eta;O=Math.abs(1-t);Qb=mb*Math.pow(J,4);Rb=Qb/Math.pow(O,
3.5);Wc=Rb*a.no*(ba*(1+1.5*t+ya*(4+t))+4.0598624589375E-4*J/O*a.con41*(8+3*t*(8+t)));a.cc1=a.bstar*Wc;wc=0;1E-4<a.ecco&&(wc=-2*Qb*J*-.0023388905587420003*a.no*Yc/a.ecco);a.x1mth2=1-U;a.cc4=2*a.no*Rb*ba*rb*(a.eta*(2+.5*t)+a.ecco*(.5+2*t)-.00108262998905*J/(ba*O)*(-3*a.con41*(1-2*ya+t*(1.5-.5*ya))+.75*a.x1mth2*(2*t-ya*(1+t))*Math.cos(2*a.argpo)));a.cc5=2*Rb*ba*rb*(1+2.75*(t+ya)+ya*t);Sb=U*U;h=.001623944983575*Ga*a.no;Ha=5.41314994525E-4*h*Ga;za=7.551504421875001E-7*Ga*Ga*a.no;a.mdot=a.no+.5*h*yd*a.con41+
.0625*Ha*yd*(13-78*U+137*Sb);a.argpdot=-.5*h*ke+.0625*Ha*(7-114*U+395*Sb)+za*(3-36*U+49*Sb);Vb=-h*Ua;a.nodedot=Vb+(.5*Ha*(4-19*U)+2*za*(3-7*U))*Ua;ob=a.argpdot+a.nodedot;a.omgcof=a.bstar*wc*Math.cos(a.argpo);a.xmcof=0;1E-4<a.ecco&&(a.xmcof=-xc*Qb*a.bstar/ya);a.nodecf=3.5*rb*Vb*a.cc1;a.t2cof=1.5*a.cc1;1.5E-12<Math.abs(Ua+1)?a.xlcof=5.847226396855001E-4*Yc*(3+5*Ua)/(1+Ua):a.xlcof=5.847226396855001E-4*Yc*(3+5*Ua)/1.5E-12;a.aycof=.0011694452793710002*Yc;var zd=1+a.eta*Math.cos(a.mo);a.delmo=zd*zd*zd;
a.sinmao=Math.sin(a.mo);a.x7thm1=7*U-1;if(225<=2*N/a.no){a.method="d";a.isimp=1;Tb=a.inclo;var ne=a.argpo,oe=a.inclo,pe=a.nodeo,qe=a.e3,re=a.ee2,se=a.peo,te=a.pgho,ue=a.pho,ve=a.pinco,we=a.plo,xe=a.se2,ye=a.se3,ze=a.sgh2,Ae=a.sgh3,Be=a.sgh4,Ce=a.sh2,De=a.sh3,Ee=a.si2,Fe=a.si3,Ge=a.sl2,He=a.sl3,Ie=a.sl4,Je=a.xgh2,Ke=a.xgh3,Le=a.xgh4,Me=a.xh2,Ne=a.xh3,Oe=a.xi2,Pe=a.xi3,Qe=a.xl2,Re=a.xl3,Se=a.xl4,Te=a.zmol,Ue=a.zmos,Va,Wa,Xa,Ya,tb,ub,Ad,Bd,Cd,Dd,Ac,Ed,Fd,ad,oa,pa,qa,ra,Bc,Cc,Dc,Ec,bd,Ve,vb,wb,We,Xe,
Yb,Zb,cd,$b,ac,dd,ed,fd,xb,gd,bc,Fc,Gc,Ye,Ze,$e,Gd,af,Hd,Id,bf,Jd,Kd,cf,Ld,Md,df,Nd,Hc,yb,Za,zb,Od,Pd,Qd,Ab,cc,Bb,hd,Rd,id,jd,Sd,kd,dc,Ic,ec,ef=a.no,ld=a.ecco,Td=Math.sin(pe),Ud=Math.cos(pe),fc=Math.sin(ne),gc=Math.cos(ne),C=Math.sin(oe),u=Math.cos(oe),V=ld*ld;Ac=1-V;var ff=Math.sqrt(Ac),ue=te=we=ve=se=0,md=Pb+18261.5+0;bd=(4.523602-9.2422029E-4*md)%r;ad=Math.sin(bd);Fd=Math.cos(bd);ed=.91375164-.03568096*Fd;fd=Math.sqrt(1-ed*ed);$b=.089683511*ad/fd;cd=Math.sqrt(1-$b*$b);var gf=5.8351514+.001944368*
md;xb=.39785416*ad/fd;xb=Math.atan2(xb,cd*Fd+.91744867*$b*ad);xb=gf+xb-bd;We=Math.cos(xb);Xe=Math.sin(xb);vb=.1945905;wb=-.98088458;ac=.91744867;dd=.39785416;Yb=Ud;Zb=Td;Ed=2.9864797E-6;Ve=1/ef;for(var nd=0;2>nd;)nd+=1,Va=vb*Yb+wb*ac*Zb,Xa=-wb*Yb+vb*ac*Zb,Ad=-vb*Zb+wb*ac*Yb,Bd=wb*dd,Cd=wb*Zb+vb*ac*Yb,Dd=vb*dd,Wa=u*Ad+C*Bd,Ya=u*Cd+C*Dd,tb=-C*Ad+u*Bd,ub=-C*Cd+u*Dd,oa=Va*gc+Wa*fc,pa=Xa*gc+Ya*fc,qa=-Va*fc+Wa*gc,ra=-Xa*fc+Ya*gc,Bc=tb*fc,Cc=ub*fc,Dc=tb*gc,Ec=ub*gc,dc=12*oa*oa-3*qa*qa,Ic=24*oa*pa-6*qa*ra,
ec=12*pa*pa-3*ra*ra,Ab=3*(Va*Va+Wa*Wa)+dc*V,cc=6*(Va*Xa+Wa*Ya)+Ic*V,Bb=3*(Xa*Xa+Ya*Ya)+ec*V,hd=-6*Va*tb+V*(-24*oa*Dc-6*qa*Bc),Rd=-6*(Va*ub+Xa*tb)+V*(-24*(pa*Dc+oa*Ec)+-6*(qa*Cc+ra*Bc)),id=-6*Xa*ub+V*(-24*pa*Ec-6*ra*Cc),jd=6*Wa*tb+V*(24*oa*Bc-6*qa*Dc),Sd=6*(Ya*tb+Wa*ub)+V*(24*(pa*Bc+oa*Cc)-6*(ra*Dc+qa*Ec)),kd=6*Ya*ub+V*(24*pa*Cc-6*ra*Ec),Ab=Ab+Ab+Ac*dc,cc=cc+cc+Ac*Ic,Bb=Bb+Bb+Ac*ec,Za=Ed*Ve,yb=-.5*Za/ff,zb=Za*ff,Hc=-15*ld*zb,Od=oa*qa+pa*ra,Pd=pa*qa+oa*ra,Qd=pa*ra-oa*qa,1===nd&&(gd=Hc,bc=yb,Fc=Za,Gc=
zb,Ye=Od,Ze=Pd,$e=Qd,Gd=Ab,af=cc,Hd=Bb,Id=hd,bf=Rd,Jd=id,Kd=jd,cf=Sd,Ld=kd,Md=dc,df=Ic,Nd=ec,vb=We,wb=Xe,ac=ed,dd=fd,Yb=cd*Ud+$b*Td,Zb=Td*cd-Ud*$b,Ed=4.7968065E-7);Te=(4.7199672+.2299715*md-gf)%r;Ue=(6.2565837+.017201977*md)%r;xe=2*gd*Ze;ye=2*gd*$e;Ee=2*bc*bf;Fe=2*bc*(Jd-Id);Ge=-2*Fc*af;He=-2*Fc*(Hd-Gd);Ie=-2*Fc*(-21-9*V)*.01675;ze=2*Gc*df;Ae=2*Gc*(Nd-Md);Be=-.3015*Gc;Ce=-2*bc*cf;De=-2*bc*(Ld-Kd);re=2*Hc*Pd;qe=2*Hc*Qd;Oe=2*yb*Rd;Pe=2*yb*(id-hd);Qe=-2*Za*cc;Re=-2*Za*(Bb-Ab);Se=-2*Za*(-21-9*V)*.0549;
Je=2*zb*Ic;Ke=2*zb*(ec-dc);Le=-.9882*zb;Me=-2*yb*Sd;Ne=-2*yb*(kd-jd);ga=qe;bb=re;sa=se;cb=te;db=ue;eb=ve;Ia=we;ha=xe;Ja=ye;H=ze;Q=Ae;Ba=Be;ta=Ce;ua=De;fb=Ee;ia=Fe;va=Ge;mc=He;La=Ie;Ma=Hc;Na=yb;Eb=Za;nc=zb;Y=Od;I=gd;Ca=bc;Oa=Fc;Pa=Gc;gb=Ye;hb=Gd;oc=Hd;Fb=Id;Gb=Jd;Hb=Kd;pc=Ld;qc=Md;rc=Nd;Da=Je;R=Ke;ja=Le;ka=Me;Ib=Ne;Z=Oe;ib=Pe;jb=Qe;kb=Re;Jb=Se;Kb=Ab;sc=Bb;Lb=hd;la=id;Qa=jd;Mb=kd;tc=dc;Nb=ec;aa=Te;lb=Ue;a.e3=ga;a.ee2=bb;a.peo=sa;a.pgho=cb;a.pho=db;a.pinco=eb;a.plo=Ia;a.se2=ha;a.se3=Ja;a.sgh2=H;a.sgh3=
Q;a.sgh4=Ba;a.sh2=ta;a.sh3=ua;a.si2=fb;a.si3=ia;a.sl2=va;a.sl3=mc;a.sl4=La;a.xgh2=Da;a.xgh3=R;a.xgh4=ja;a.xh2=ka;a.xh3=Ib;a.xi2=Z;a.xi3=ib;a.xl2=jb;a.xl3=kb;a.xl4=Jb;a.zmol=aa;a.zmos=lb;var Jc=he(a,{inclo:Tb,init:a.init,ep:a.ecco,inclp:a.inclo,nodep:a.nodeo,argpp:a.argpo,mp:a.mo,opsmode:a.operationmode});a.ecco=Jc.ep;a.inclo=Jc.inclp;a.nodeo=Jc.nodep;a.argpo=Jc.argpp;a.mo=Jc.mp;var l=V,Uf=a.argpo,hf=a.t,Vf=a.gsto,jf=a.mo,kf=a.mdot,od=a.no,Vd=a.nodeo,Wf=a.nodedot,Xf=a.ecco,m=ld,hc=Tb,$a=ef,Cb=a.irez,
lf=a.atime,mf=a.d2201,nf=a.d2211,of=a.d3210,pf=a.d3222,qf=a.d4410,rf=a.d4422,sf=a.d5220,tf=a.d5232,uf=a.d5421,vf=a.d5433,Wd=a.dedt,Xd=a.didt,pd=a.dmdt,ic=a.dnodt,Kc=a.domdt,jc=a.del1,wf=a.del2,xf=a.del3,Yd=a.xfact,qd=a.xlamo,yf=a.xli,zf=a.xni,Lc,Af,Bf,Cf,Df,kc,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Zd,Mf,Mc,$d,ae,be,ce,de,ee,fe,Db,K,ca,rd,Nf,Of,Aa,da,F,Yf=2/3,Cb=0;.0034906585<$a<.0052359877&&(Cb=1);.00826<=$a<=.00924&&.5<=m&&(Cb=2);var Zf=1.19459E-5*I*gb,$f=1.19459E-5*Ca*(Fb+Gb),ag=-1.19459E-5*Oa*(hb+oc-14-6*l),
bg=1.19459E-5*Pa*(qc+rc-6),Nc=-1.19459E-5*Ca*(Hb+pc);if(.052359877>hc||hc>N-.052359877)Nc=0;0!==C&&(Nc/=C);var cg=bg-u*Nc,Wd=Zf+1.5835218E-4*Ma*Y,Xd=$f+1.5835218E-4*Na*(Lb+la),pd=ag-1.5835218E-4*Eb*(Kb+sc-14-6*l),dg=1.5835218E-4*nc*(tc+Nb-6),ge=-1.5835218E-4*Na*(Qa+Mb);if(.052359877>hc||hc>N-.052359877)ge=0;Kc=cg+dg;ic=Nc;0!==C&&(Kc-=u/C*ge,ic+=ge/C);rd=(Vf+0)%r;m+=Wd*hf;hc+=Xd*hf;if(0!==Cb){Aa=Math.pow($a/ma,Yf);if(2===Cb){da=u*u;var eg=m,m=Xf,fg=l,l=je;F=m*l;Lf=-.306-.44*(m-.64);.65>=m?(Zd=3.616-
13.247*m+16.29*l,Mc=-19.302+117.39*m-228.419*l+156.591*F,$d=-18.9068+109.7927*m-214.6334*l+146.5816*F,ae=-41.122+242.694*m-471.094*l+313.953*F,be=-146.407+841.88*m-1629.014*l+1083.435*F,ce=-532.114+3017.977*m-5740.032*l+3708.276*F):(Zd=-72.099+331.819*m-508.738*l+266.724*F,Mc=-346.844+1582.851*m-2415.925*l+1246.113*F,$d=-342.585+1554.908*m-2366.899*l+1215.972*F,ae=-1052.797+4758.686*m-7193.992*l+3651.957*F,be=-3581.69+16178.11*m-24462.77*l+12422.52*F,ce=.715<m?-5149.66+29936.92*m-54087.36*l+31324.56*
F:1464.74-4664.75*m+3763.64*l);.7>m?(fe=-919.2277+4988.61*m-9064.77*l+5542.21*F,de=-822.71072+4568.6173*m-8491.4146*l+5337.524*F,ee=-853.666+4690.25*m-8624.77*l+5341.4*F):(fe=-37995.78+161616.52*m-229838.2*l+109377.94*F,de=-51752.104+218913.95*m-309468.16*l+146349.42*F,ee=-40023.88+170470.89*m-242699.48*l+115605.82*F);Db=C*C;Lc=.75*(1+2*u+da);Af=1.5*Db;Cf=1.875*C*(1-2*u-3*da);Df=-1.875*C*(1+2*u-3*da);Ef=35*Db*Lc;Ff=39.375*Db*Db;Gf=9.84375*C*(Db*(1-2*u-5*da)+.33333333*(-2+4*u+6*da));Hf=C*(4.92187512*
Db*(-2-4*u+10*da)+6.56250012*(1+2*u-3*da));If=29.53125*C*(2-8*u+da*(-12+8*u+10*da));Jf=29.53125*C*(-2-8*u+da*(12+8*u-10*da));Nf=$a*$a;Of=Aa*Aa;ca=3*Nf*Of;K=1.7891679E-6*ca;mf=K*Lc*Lf;nf=K*Af*Zd;ca*=Aa;K=3.7393792E-7*ca;of=K*Cf*Mc;pf=K*Df*$d;ca*=Aa;K=1.47273906E-8*ca;qf=K*Ef*ae;rf=K*Ff*be;ca*=Aa;K=1.1428639E-7*ca;sf=K*Gf*ce;tf=K*Hf*ee;K=4.3531606E-9*ca;uf=K*If*de;vf=K*Jf*fe;qd=(jf+Vd+Vd-rd-rd)%r;Yd=kf+pd+2*(Wf+ic-.0043752690880113)-od;m=eg;l=fg}1===Cb&&(Kf=1+l*(-2.5+.8125*l),Mc=1+2*l,Mf=1+l*(-6+6.60937*
l),Lc=.75*(1+u)*(1+u),Bf=.9375*C*C*(1+3*u)-.75*(1+u),kc=1+u,kc*=1.875*kc*kc,jc=3*$a*$a*Aa*Aa,wf=2*jc*Lc*Kf*1.7891679E-6,xf=3*jc*kc*Mf*2.2123015E-7*Aa,jc=jc*Bf*Mc*2.1460748E-6*Aa,qd=(jf+Vd+Uf-rd)%r,Yd=kf+ob-.0043752690880113+pd+Kc+ic-od);yf=qd;zf=od;lf=0;$a=od+0}d=Cb;f=lf;g=mf;e=nf;n=of;k=pf;L=qf;v=rf;y=sf;z=tf;yc=uf;q=vf;p=Wd;W=Xd;G=pd;A=ic;B=Kc;D=jc;ea=wf;fa=xf;E=Yd;w=qd;X=yf;M=zf;a.irez=d;a.atime=f;a.d2201=g;a.d2211=e;a.d3210=n;a.d3222=k;a.d4410=L;a.d4422=v;a.d5220=y;a.d5232=z;a.d5421=yc;a.d5433=
q;a.dedt=p;a.didt=W;a.dmdt=G;a.dnodt=A;a.domdt=B;a.del1=D;a.del2=ea;a.del3=fa;a.xfact=E;a.xlamo=w;a.xli=X;a.xni=M}1!==a.isimp&&(Fa=a.cc1*a.cc1,a.d2=4*ba*J*Fa,nb=a.d2*J*a.cc1/3,a.d3=(17*ba+P)*nb,a.d4=.5*nb*ba*J*(221*ba+31*P)*a.cc1,a.t3cof=a.d2+2*Fa,a.t4cof=.25*(3*a.d3+a.cc1*(12*a.d2+10*Fa)),a.t5cof=.2*(3*a.d4+12*a.cc1*a.d3+6*a.d2*a.d2+15*Fa*(2*a.d2+Fa)))}td(a,0);a.init="n";return a};k.propagate=function(b,c,d,f,g,e,n){c=1440*(sd(c,d,f,g,e,n)-b.jdsatepoch);return td(b,c)};k.sgp4=function(b,c){return td(b,
c)};k.eci_to_geodetic=function(b,c){for(var d=Math.sqrt(b.x*b.x+b.y*b.y),f=Math.atan2(b.y,b.x)-c,g=0,e=Math.atan2(b.z,Math.sqrt(b.x*b.x+b.y*b.y)),n;20>g;)n=1/Math.sqrt(1-.006694380004260718*Math.sin(e)*Math.sin(e)),e=Math.atan2(b.z+42.69767279723544*n*Math.sin(e),d),g+=1;d=d/Math.cos(e)-6378.137*n;return{longitude:f,latitude:e,height:d}};k.ecf_to_look_angles=function(b,c){var d,f=b.longitude,g=b.latitude,e=yc(b);d=c.x-e.x;var n=c.y-e.y,k=c.z-e.z,e=Math.sin(g)*Math.cos(f)*d+Math.sin(g)*Math.sin(f)*
n-Math.cos(g)*k,r=-Math.sin(f)*d+Math.cos(f)*n,f=Math.cos(g)*Math.cos(f)*d+Math.cos(g)*Math.sin(f)*n+Math.sin(g)*k;d={top_s:e,top_e:r,top_z:f};f=d.top_s;g=d.top_e;n=d.top_z;d=Math.sqrt(f*f+g*g+n*n);n=Math.asin(n/d);return{azimuth:Math.atan2(-g,f)+N,elevation:n,range_sat:d}};k.geodetic_to_ecf=function(b){return yc(b)};k.ecf_to_eci=function(b,c){var d=b.x*Math.cos(c)-b.y*Math.sin(c),f=b.x*Math.sin(c)+b.y*Math.cos(c);return{x:d,y:f,z:b.z}};k.eci_to_ecf=function(b,c){var d=b.x*Math.cos(c)+b.y*Math.sin(c),
f=b.x*-Math.sin(c)+b.y*Math.cos(c);return{x:d,y:f,z:b.z}};k.degrees_lat=function(b){b=b>N/2||b<-N/2?"Err":b/N*180;return b};k.degrees_long=function(b){b=b/N*180%360;180<b?b=360-b:-180>b&&(b=360+b);return b};k.doppler_factor=function(b,c,d){var f=Math.sqrt(Math.pow(c.x-b.x,2)+Math.pow(c.y-b.y,2)+Math.pow(c.z-b.z,2));c={x:c.x+d.x,y:c.y+d.y,z:c.z+d.z};b=Math.sqrt(Math.pow(c.x-b.x,2)+Math.pow(c.y-b.y,2)+Math.pow(c.z-b.z,2))-f;b*=0<=b?1:-1;return 1+b/299792.458};return k}();
//////////////////////////////////////////////////////

// Set the Observer Location and variable to convert to RADIANS TODO: Change these to variables received in a method call.
var latitude = 41.754785,       // Observer Lattitude - use Google Maps
  longitude = -70.539151,     // Observer Longitude - use Google Maps
  height = 0.060966,          // Observer Height in Km
  obsminaz = 347,             // Observer min azimuth (satellite azimuth must be greater) left extent looking towards target
  obsmaxaz = 227,             // Observer max azimuth (satellite azimuth must be smaller) right extent looking towards target
  obsminel = 3,               // Observer min elevation
  obsmaxel = 85,              // Observer max elevation TODO: Determine if radars with 105deg elevation work correctly
  obsminrange = 750,          // Observer min range TODO: Determine how to calculate min range with transmit cycle information
  obsmaxrange = 5500,         // Observer max range TODO: Determine how to calculate max range with transmit cycle information
  deg2rad = 0.017453292519943295; // (angle / 180) * Math.PI --- Divide by deg2rad to get rad2deg
var observerGd = {              // Array to calculate look angles in propagate()
  longitude: longitude * deg2rad,
  latitude: latitude * deg2rad,
  height: height * 1            // Converts from string to number TODO: Find correct way to convert string to integer
};

// Set default timing settings. These will be changed to find look angles at different times in future.
var propOffset = 0,             // offset letting us propagate in the future (or past)
  propRealTime = Date.now();  // Set current time

// TODO: Send TLE_LINE1 and TLE_LINE2
var satrec = satellite.twoline2satrec( // perform and store sat init calcs
  '1 00005U 58002B   16279.45968805 -.00000128  00000-0 -13905-3 0  9994', '2 00005  34.2459  69.4262 1847431  33.7260 336.8209 10.84722504 58638');

var tbl = document.getElementById('looks'); // Identify the table to update TODO: Change this to a menu in index.php

for (var i = 0; i < (24 * 60 * 60); i += 5) { // 5second Looks
  propOffset = i * 1000;               // Offset in seconds (msec * 1000)
  tbl = propagate(propOffset, tbl);    // Update the table with looks for this 5 second chunk
}

function propagate (propOffset, tbl) {
  var now = propTime(propOffset);
  var j = jday(now.getUTCFullYear(),
               now.getUTCMonth() + 1, // Note, this function requires months in range 1-12.
               now.getUTCDate(),
               now.getUTCHours(),
               now.getUTCMinutes(),
               now.getUTCSeconds()); // Converts time to jday (TLEs use epoch year/day)
  j += now.getUTCMilliseconds() * 1.15741e-8; // days per millisecond
  var gmst = satellite.gstime_from_jday(j);

  var m = (j - satrec.jdsatepoch) * 1440.0; // 1440 = minutes_per_day
  var pv = satellite.sgp4(satrec, m);
  var positionEcf, lookAngles, azimuth, elevation, rangeSat;

  positionEcf = satellite.eci_to_ecf(pv.position, gmst); // pv.position is called positionEci originally
  lookAngles = satellite.ecf_to_look_angles(observerGd, positionEcf);
  azimuth = lookAngles.azimuth / deg2rad;
  elevation = lookAngles.elevation / deg2rad;
  rangeSat = lookAngles.range_sat;

  if ((azimuth >= obsminaz || azimuth <= obsmaxaz) && (elevation >= obsminel && elevation <= obsmaxel) && (rangeSat <= obsmaxrange && rangeSat >= obsminrange)) {
    var tr = tbl.insertRow();
    var tdT = tr.insertCell();
    tdT.appendChild(document.createTextNode('Time: ' + now));
    tdT.style.border = '1px solid black';
    var tdE = tr.insertCell();
    tdE.appendChild(document.createTextNode('El: ' + elevation.toFixed(1)));
    tdE.style.border = '1px solid black';
    var tdA = tr.insertCell();
    tdA.appendChild(document.createTextNode('Az: ' + azimuth.toFixed(0)));
    tdA.style.border = '1px solid black';
    var tdR = tr.insertCell();
    tdR.appendChild(document.createTextNode('Rng: ' + rangeSat.toFixed(0)));
    tdR.style.border = '1px solid black';
  }
  return tbl;
}

function jday (year, mon, day, hr, minute, sec) { // from satellite.js
  'use strict';
  return (367.0 * year -
        Math.floor((7 * (year + Math.floor((mon + 9) / 12.0))) * 0.25) +
        Math.floor(275 * mon / 9.0) +
        day + 1721013.5 +
        ((sec / 60.0 + minute) / 60.0 + hr) / 24.0  //  ut in days
        );
}

function propTime (propOffset) {
  'use strict';                                             // May be unnescessary but doesn't hurt anything atm.
  var now = new Date();                                     // Make a time variable
  now.setTime(Number(propRealTime) + propOffset);           // Set the time variable to the time in the future
  return now;
}
})();