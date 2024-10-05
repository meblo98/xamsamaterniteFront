import{M as h,e as w,f as E,h as x,o as d,a as t,d as a,v as n,i as b,c as p,r as S,F,t as m}from"./index-C-f7vtLL.js";/* empty css                                                               */import{c,_}from"./_plugin-vue_export-helper-Cm6_9V8g.js";import{s as k}from"./structureService-CmFMW1Iu.js";import{S as i}from"./sweetalert2.all-BXtj_mcp.js";import{L as V}from"./Layout-Ds3QvfcV.js";const g={async getSageFemmes(){try{return(await c.get("/sages-femmes")).data}catch(r){throw console.error("Erreur lors de la récupération des sages-femmes:",r),r}},async addSageFemme(r){try{return(await c.post("/sages-femmes",r)).data}catch(e){throw e}},async getSageFemme(r){try{return(await c.get(`/sages-femmes/${r}`)).data}catch(e){throw console.error(`Erreur lors de la récupération de la sage-femme avec l'id ${r} :`,e),e}},async updateSageFemme(r,e){try{return(await c.put(`/sages-femmes/${r}`,e)).data}catch(l){throw console.error(`Erreur lors de la mise à jour de la sage-femme avec l'id ${r} :`,l),l}},async deleteSageFemme(r){try{return(await c.delete(`/sages-femmes/${r}`)).data}catch(e){throw console.error(`Erreur lors de la suppression de la sage-femme avec l'id ${r} :`,e),e}}},z={components:{Layout:V},data(){return{structuresSante:[],editedSageFemme:{id:"",prenom:"",nom:"",adresse:"",email:"",telephone:"",matricule:"",structure_sante_id:null},newSageFemme:{prenom:"",nom:"",adresse:"",email:"",telephone:"",matricule:"",structure_sante_id:null},sageFemmes:[]}},mounted(){this.getSageFemmes(),this.getStructuresSante()},methods:{async getStructuresSante(){const r=await k.getStructuresSante();this.structuresSante=r.structures_sante},async getSageFemmes(){try{const r=await g.getSageFemmes();this.sageFemmes=r.sages_femmes}catch(r){console.error("Erreur lors de la récupération des sages-femmes:",r)}},async addSageFemme(){try{await g.addSageFemme(this.newSageFemme),this.getSageFemmes(),this.resetForm(),i.fire({title:"Sage-femme ajoutée avec succès!",icon:"success"})}catch{i.fire({title:"Erreur lors de l'ajout d'une sage-femme",text:"Veuillez vérifier les informations et réessayer.",icon:"error"})}},resetForm(){this.newSageFemme={prenom:"",nom:"",adresse:"",email:"",telephone:"",matricule:"",structure_sante_id:null}},viewSageFemme(r){},async deleteSageFemme(r){i.fire({title:"Supprimer la sage-femme?",text:"Voulez-vous vraiment supprimer cette sage-femme?",icon:"warning",showCancelButton:!0,confirmButtonText:"Oui, supprimer",cancelButtonText:"Non, annuler"}).then(e=>{if(e.isConfirmed)try{g.deleteSageFemme(r);const l=this.sageFemmes.findIndex(f=>f.id===r);this.sageFemmes.splice(l,1),i.fire({title:"Sage-femme supprimée avec succès!",icon:"success",showConfirmButton:!1,timer:1500})}catch(l){console.error("Erreur lors de la suppression d'une sage-femme :",l),i.fire({title:"Erreur lors de la suppression d'une sage-femme",text:"Veuillez réessayer.",icon:"error"})}})},async editSageFemme(r){if(!r){console.error("Erreur : l'ID de la sage-femme est manquant");return}try{const e=await g.getSageFemme(r),l=e.sage_femme;l?(this.editedSageFemme.id=l.id,this.editedSageFemme.prenom=l.user.prenom,this.editedSageFemme.nom=l.user.nom,this.editedSageFemme.adresse=l.user.adresse,this.editedSageFemme.email=l.user.email,this.editedSageFemme.telephone=l.user.telephone,this.editedSageFemme.matricule=l.matricule,this.editedSageFemme.structure_sante_id=l.structure_sante_id):console.error("Erreur lors de la récupération des données de la sage-femme :",e),new h(this.$refs.editSageFemme).show()}catch(e){console.error("Erreur lors de la récupération des données de la sage-femme :",e)}},async updateSageFemme(){try{await g.updateSageFemme(this.editedSageFemme.id,this.editedSageFemme);const r=this.sageFemmes.findIndex(e=>e.id===this.editedSageFemme.id);this.sageFemmes.splice(r,1,this.editedSageFemme),i.fire({title:"Sage-femme modifiée avec succès !",icon:"success"})}catch(r){if(r.response&&r.response.status===422){const e=r.response.data.errors;let l="";e.email&&(l+=`L'email est déjà utilisé.
`),e.telephone&&(l+=`Le téléphone est déjà utilisé.
`),i.fire({title:"Erreur lors de la modification",text:l,icon:"error"})}else console.error("Erreur lors de la modification :",r),i.fire({title:"Erreur lors de la modification",text:"Veuillez vérifier les informations et réessayer.",icon:"error"})}}}},C={class:"sage-femme-list"},U={class:"header"},L={class:"actions"},B={class:"modal fade",id:"ajoutSageFemme","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},M={class:"modal-dialog"},j={class:"modal-content"},A={class:"modal-body"},T={class:"form-group"},N={class:"form-group"},I={class:"form-group"},D={class:"form-group"},P={class:"form-group"},q={class:"form-group"},O={class:"form-group"},G=["value"],H={class:"modal-footer"},J={class:"table-responsive"},K={class:"table m-3"},Q=["onClick"],R=["onClick"],W={class:"modal fade",id:"editSageFemme",ref:"editSageFemme","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},X={class:"modal-dialog"},Y={class:"modal-content"},Z={class:"modal-body"},$={class:"form-group"},ee={class:"form-group"},te={class:"form-group"},se={class:"form-group"},re={class:"form-group"},oe={class:"form-group"},le={class:"form-group"},ae=["value"],ne={class:"modal-footer"};function me(r,e,l,f,o,u){const y=x("Layout");return d(),w(y,null,{default:E(()=>[t("div",C,[t("div",U,[e[27]||(e[27]=t("h1",null,"Liste des Sage-femmes",-1)),t("div",L,[e[26]||(e[26]=t("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#ajoutSageFemme"}," Ajouter une sage-femme ",-1)),t("div",B,[t("div",M,[t("div",j,[e[25]||(e[25]=t("div",{class:"modal-header"},[t("h1",{class:"modal-title fs-5",id:"staticBackdropLabel"}," Modal title "),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),t("div",A,[t("div",T,[e[16]||(e[16]=t("label",{for:"prenom"},"Prénom",-1)),a(t("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>o.newSageFemme.prenom=s),type:"text",class:"form-control",id:"prenom",placeholder:"Entrez le prénom"},null,512),[[n,o.newSageFemme.prenom]])]),t("div",N,[e[17]||(e[17]=t("label",{for:"nom"},"Nom",-1)),a(t("input",{"onUpdate:modelValue":e[1]||(e[1]=s=>o.newSageFemme.nom=s),type:"text",class:"form-control",id:"nom",placeholder:"Entrez le nom"},null,512),[[n,o.newSageFemme.nom]])]),t("div",I,[e[18]||(e[18]=t("label",{for:"adresse"},"Adresse",-1)),a(t("input",{"onUpdate:modelValue":e[2]||(e[2]=s=>o.newSageFemme.adresse=s),type:"text",class:"form-control",id:"adresse",placeholder:"Entrez l'adresse"},null,512),[[n,o.newSageFemme.adresse]])]),t("div",D,[e[19]||(e[19]=t("label",{for:"email"},"Email",-1)),a(t("input",{"onUpdate:modelValue":e[3]||(e[3]=s=>o.newSageFemme.email=s),type:"email",class:"form-control",id:"email",placeholder:"Entrez l'email"},null,512),[[n,o.newSageFemme.email]])]),t("div",P,[e[20]||(e[20]=t("label",{for:"telephone"},"Téléphone",-1)),a(t("input",{"onUpdate:modelValue":e[4]||(e[4]=s=>o.newSageFemme.telephone=s),type:"text",class:"form-control",id:"telephone",placeholder:"Entrez le téléphone"},null,512),[[n,o.newSageFemme.telephone]])]),t("div",q,[e[21]||(e[21]=t("label",{for:"matricule"},"Matricule",-1)),a(t("input",{"onUpdate:modelValue":e[5]||(e[5]=s=>o.newSageFemme.matricule=s),type:"text",class:"form-control",id:"matricule",placeholder:"Entrez le matricule"},null,512),[[n,o.newSageFemme.matricule]])]),t("div",O,[e[23]||(e[23]=t("label",{for:"structure_sante_id"},"Structure de santé",-1)),a(t("select",{"onUpdate:modelValue":e[6]||(e[6]=s=>o.newSageFemme.structure_sante_id=s),id:"structure_sante_id",class:"form-control"},[e[22]||(e[22]=t("option",{value:"",disabled:"",selected:""}," Sélectionnez une structure de santé ",-1)),(d(!0),p(F,null,S(o.structuresSante,s=>(d(),p("option",{key:s.id,value:s.id},m(s.nom),9,G))),128))],512),[[b,o.newSageFemme.structure_sante_id]])])]),t("div",H,[t("button",{class:"btn",variant:"primary",onClick:e[7]||(e[7]=(...s)=>u.addSageFemme&&u.addSageFemme(...s))}," Ajouter "),e[24]||(e[24]=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," Close ",-1))])])])])])]),t("div",J,[t("table",K,[e[30]||(e[30]=t("thead",null,[t("tr",null,[t("th",null,"Nom complet"),t("th",null,"Adresse"),t("th",null,"Email"),t("th",null,"Téléphone"),t("th",null,"Matricule"),t("th",null,"Structure de santé"),t("th",null,"Actions")])],-1)),t("tbody",null,[(d(!0),p(F,null,S(o.sageFemmes,s=>(d(),p("tr",{key:s.id},[t("td",null,m(s.user.prenom)+" "+m(s.user.nom),1),t("td",null,m(s.user.adresse),1),t("td",null,m(s.user.email),1),t("td",null,m(s.user.telephone),1),t("td",null,m(s.matricule),1),t("td",null,m(s.structure_sante.nom),1),t("td",null,[t("button",{class:"btn-action",onClick:v=>u.editSageFemme(s.id)},e[28]||(e[28]=[t("i",{class:"fa fa-edit"},null,-1)]),8,Q),t("button",{class:"btn-action",onClick:v=>u.deleteSageFemme(s.id)},e[29]||(e[29]=[t("i",{class:"fa-solid fa-trash-can"},null,-1)]),8,R)])]))),128))])])])]),t("div",W,[t("div",X,[t("div",Y,[e[40]||(e[40]=t("div",{class:"modal-header"},[t("h1",{class:"modal-title fs-5",id:"staticBackdropLabel"}," Modifier une sage-femme "),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),t("div",Z,[t("form",null,[t("div",$,[e[31]||(e[31]=t("label",{for:"prenom"},"Prénom",-1)),a(t("input",{"onUpdate:modelValue":e[8]||(e[8]=s=>o.editedSageFemme.prenom=s),type:"text",class:"form-control",id:"prenom",placeholder:"Entrez le prénom"},null,512),[[n,o.editedSageFemme.prenom]])]),t("div",ee,[e[32]||(e[32]=t("label",{for:"nom"},"Nom",-1)),a(t("input",{"onUpdate:modelValue":e[9]||(e[9]=s=>o.editedSageFemme.nom=s),type:"text",class:"form-control",id:"nom",placeholder:"Entrez le nom"},null,512),[[n,o.editedSageFemme.nom]])]),t("div",te,[e[33]||(e[33]=t("label",{for:"adresse"},"Adresse",-1)),a(t("input",{"onUpdate:modelValue":e[10]||(e[10]=s=>o.editedSageFemme.adresse=s),type:"text",class:"form-control",id:"adresse",placeholder:"Entrez l'adresse"},null,512),[[n,o.editedSageFemme.adresse]])]),t("div",se,[e[34]||(e[34]=t("label",{for:"email"},"Email",-1)),a(t("input",{"onUpdate:modelValue":e[11]||(e[11]=s=>o.editedSageFemme.email=s),type:"email",class:"form-control",id:"email",placeholder:"Entrez l'email"},null,512),[[n,o.editedSageFemme.email]])]),t("div",re,[e[35]||(e[35]=t("label",{for:"telephone"},"Téléphone",-1)),a(t("input",{"onUpdate:modelValue":e[12]||(e[12]=s=>o.editedSageFemme.telephone=s),type:"text",class:"form-control",id:"telephone",placeholder:"Entrez le téléphone"},null,512),[[n,o.editedSageFemme.telephone]])]),t("div",oe,[e[36]||(e[36]=t("label",{for:"matricule"},"Matricule",-1)),a(t("input",{"onUpdate:modelValue":e[13]||(e[13]=s=>o.editedSageFemme.matricule=s),type:"text",class:"form-control",id:"matricule",placeholder:"Entrez le matricule"},null,512),[[n,o.editedSageFemme.matricule]])]),t("div",le,[e[38]||(e[38]=t("label",{for:"structure_sante_id"},"Structure de santé",-1)),a(t("select",{"onUpdate:modelValue":e[14]||(e[14]=s=>o.editedSageFemme.structure_sante_id=s),id:"structure_sante_id",class:"form-control"},[e[37]||(e[37]=t("option",{value:"",disabled:"",selected:""}," Sélectionnez une structure de santé ",-1)),(d(!0),p(F,null,S(o.structuresSante,s=>(d(),p("option",{key:s.id,value:s.id},m(s.nom),9,ae))),128))],512),[[b,o.editedSageFemme.structure_sante_id]])])])]),t("div",ne,[t("button",{class:"btn btn-primary",onClick:e[15]||(e[15]=(...s)=>u.updateSageFemme&&u.updateSageFemme(...s))}," Modifier "),e[39]||(e[39]=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," Annuler ",-1))])])])],512)]),_:1})}const fe=_(z,[["render",me],["__scopeId","data-v-532fa8a0"]]);export{fe as default};