import{L as a}from"./Layout-BJFKaUJJ.js";import{c as r}from"./consultationService-TtmIVXSN.js";import{_ as l}from"./_plugin-vue_export-helper-rQ_DBal5.js";import{e as c,f as p,h as u,o as d,a as t,t as n}from"./index-1QRIi6KU.js";const m={components:{Layout:a},data(){return{consultation:[],type:[]}},props:{id:{type:Number,required:!0}},mounted(){this.getConsultation()},methods:{async getConsultation(){try{const o=await r.getConsultation(this.id);this.consultation=o,this.type=o.visite}catch(o){console.error(o)}}}},_={class:"container"},f={class:"row"},h={class:"col-md-5"},y={class:"project-info-box mt-0"};function v(o,s,b,x,e,C){const i=u("Layout");return d(),c(i,null,{default:p(()=>[t("div",_,[t("div",f,[t("div",h,[t("div",y,[s[0]||(s[0]=t("h5",{class:"mb-5"},"Detail de la consultation",-1)),t("p",null,"Date: "+n(e.consultation.date),1),t("p",null,"Type: "+n(e.type.libelle),1),t("p",null,"Terme: "+n(e.consultation.terme),1)])]),s[1]||(s[1]=t("div",{class:"col-md-7"},[t("div",{class:"project-info-box mt-0"},[t("h5"),t("div",{class:"mb-3"})])],-1))])])]),_:1})}const B=l(m,[["render",v]]);export{B as default};