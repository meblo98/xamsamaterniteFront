import{_ as c,c as t}from"./_plugin-vue_export-helper-rQ_DBal5.js";import{o as n,c as o,a as r}from"./index-1QRIi6KU.js";const i="/assets/campagne-DmN1oWYe.jpg",p={name:"AdviceVideo",props:{image:String}},d={id:"card1",class:"card"};function l(e,s,a,u,m,_){return n(),o("section",d,s[0]||(s[0]=[r("img",{src:i,alt:"Advice Video"},null,-1),r("div",{class:"card__content"},[r("p",{class:"card__title"},"Lorem Ipsum"),r("p",{class:"card__description"}," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae justo vel lorem tincidunt ultrices at non nunc. Donec in sapien viverra, tincidunt augue id, efficitur massa. ")],-1)]))}const y=c(p,[["render",l],["__scopeId","data-v-302106cc"]]),f={async getConseils(){try{return(await t.get("/conseils")).data}catch{}},async getConseil(e){try{return(await t.get(`/conseils/${e}`)).data}catch{}},async createConseil(e){try{return(await t.post("/conseils",e)).data}catch{}},async updateConseil(e,s){try{return(await t.put(`/conseils/${e}`,s)).data}catch{}},async deleteConseil(e){try{return(await t.delete(`/conseils/${e}`)).data}catch{}}};export{y as A,f as c};