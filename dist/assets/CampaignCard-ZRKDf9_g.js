import{_ as i}from"./_plugin-vue_export-helper-Cm6_9V8g.js";import{o as c,c as o,a,t as s}from"./index-C-f7vtLL.js";const d={name:"CampaignCard",props:{image:String,title:String,date:String,location:String,campagneId:Number}},r={class:"card"},l={class:"card-int"},_={class:"card__span"},m={class:"img"},g=["src"],p={class:"card-data"},u={class:"title"};function f(n,e,t,h,C,v){return c(),o("article",r,[a("div",l,[a("span",_,s(t.date),1),a("div",m,[a("img",{src:t.image,alt:"image campagne",class:"w-100"},null,8,g)]),a("div",p,[a("p",u,s(t.title),1),a("p",null,s(t.location),1),a("button",{class:"button",onClick:e[0]||(e[0]=S=>n.$router.push({name:"detailCampagne-patiente",params:{id:t.campagneId}}))},"Plus d'informations")])])])}const B=i(d,[["render",f],["__scopeId","data-v-872300cb"]]);export{B as C};