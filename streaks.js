(function(root){
function key(d){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),dd=String(d.getDate()).padStart(2,'0');return y+'-'+m+'-'+dd}
function addDays(d,n){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate()+n,12);return x}
// done: object {dateKey:true}. Current streak counts back from today, or from yesterday if today not yet done.
function streaks(done,today){
  let cur=0,d=new Date(today.getFullYear(),today.getMonth(),today.getDate(),12);
  if(!done[key(d)])d=addDays(d,-1);
  while(done[key(d)]){cur++;d=addDays(d,-1)}
  const ks=Object.keys(done).filter(k=>done[k]).sort();
  let best=0,run=0,prev=null;
  ks.forEach(k=>{
    const dt=new Date(k+'T12:00:00');
    if(prev&&key(addDays(prev,1))===k)run++;else run=1;
    if(run>best)best=run;prev=dt;
  });
  return{cur,best,total:ks.length};
}
const api={key,addDays,streaks};
if(typeof module!=='undefined')module.exports=api;else root.Streaks=api;
})(this);
