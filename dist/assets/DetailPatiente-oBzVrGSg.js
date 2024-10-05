import{L as E,u as U}from"./Layout-Ds3QvfcV.js";import{p as T}from"./patienteService-aoQ1PbEG.js";import{c as f}from"./consultationService-BtuUWyoC.js";import{T as q}from"./tableau-nIdjVny8.js";import{v as R}from"./visiteService-RsLHtb3I.js";import{c as b,_ as D}from"./_plugin-vue_export-helper-Cm6_9V8g.js";import{S as r}from"./sweetalert2.all-BXtj_mcp.js";import{a as v}from"./accouchementService-CuycJTc3.js";import{e as y,f as B,h as z,o as u,a as t,t as d,c as p,d as i,v as s,i as c,F as A,r as V,w as P}from"./index-C-f7vtLL.js";const w={async getRendezVous(){try{return(await b.get("/rv")).data}catch(l){throw console.error("Erreur lors de la récupération des rendez-vous :",l),l}},async getRendezVousById(l){try{return(await b.get(`/rv/${l}`)).data}catch(e){throw console.error(`Erreur lors de la récupération du rendez-vous avec l'id ${l} :`,e),e}},async createRendezVous(l){try{return(await b.post("/rv",l)).data}catch(e){throw console.error("Erreur lors de la création du rendez-vous :",e),e}},async updateRendezVous(l,e){try{return(await b.put(`/rv/${l}`,e)).data}catch(m){throw console.error(`Erreur lors de la mise à jour du rendez-vous avec l'id ${l} :`,m),m}},async deleteRendezVous(l){try{return(await b.delete(`/rv/${l}`)).data}catch(e){throw console.error(`Erreur lors de la suppression du rendez-vous avec l'id ${l} :`,e),e}}},C="view",x="edit",h="delete",S={components:{Layout:E,Table:q},data(){return{accouchements:[],user:[],FormData:{},accouchementsColumns:[{label:"Date",field:"date"},{label:"Mode",field:"mode"},{label:"Pathologie",field:"pathologie"},{label:"Actions",field:"action",type:"action"}],accouchementFields:[{label:"Date",name:"date",field:"date",type:"date"},{label:"Heure",field:"heure",name:"heure",type:"time"},{label:"Lieu",field:"lieu",name:"lieu",type:"select",options:[{value:"",text:"Selectionner              "},{value:"maternité",text:"maternité"},{value:"domicile",text:"domicile"}]},{label:"Mode",field:"mode",name:"mode",type:"select",options:[{value:"",text:"Selectionner              "},{value:"naturel",text:"naturel"},{value:"instrumental",text:"instrumental"},{value:"césarienne",text:"césarienne"}]},{label:"Terme",field:"terme",name:"terme",type:"select",options:[{value:"",text:"Selectionner              "},{value:"naturel",text:"naturel"},{value:"instrumental",text:"instrumental"},{value:"césarienne",text:"césarienne"}]},{label:"Mois de grossesse",field:"mois_grossesse",name:"mois_grossesse",type:"number"},{label:"Début du travail",field:"debut_travail",name:"debut_travail",type:"time"},{label:"Périnée",field:"perinee",name:"perinee",type:"select",options:[{value:"",text:"Selectionner la périnée"},{value:"dechirure",text:"dechirure"},{value:"episiotomie",text:"episiotomie"},{value:"intact",text:"intact"}]},{label:"Pathologie",field:"pathologie",name:"pathologie",type:"text"},{label:"Évolution/réanimation",field:"evolution_reanimation",name:"evolution_reanimation",type:"select",options:[{value:"",text:"Selectionner              "},{value:"favorable",text:"favorable"},{value:"transfert",text:"transfert"},{value:"décès",text:"décès"}]}],newAccouchement:{date:"",heure:"",lieu:"",mode:"",terme:"",mois_grossesse:"",debut_travail:"",perinee:"",pathologie:"",evolution_reanimation:"",patiente_id:this.id},rendezVousFields:[{label:"Date",field:"date_rv",name:"date_rv",type:"date"},{label:"Type de rendez-vous",field:"visite_id",name:"visite_id",type:"select",options:[]}],visite:[],newRendezVous:{date_rv:"",visite_id:"",sage_femme_id:"",patiente_id:this.id},consultationFields:[{name:"date",field:"date",label:"Date",type:"date",placeholder:"Entrez la date de la consultation"},{name:"terme",field:"terme",label:"Terme",type:"text",placeholder:"Entrez le terme"},{name:"SA",field:"SA",label:"SA (Semaines d'Aménorrhée)",type:"number",placeholder:"Entrez les semaines d'aménorrhée"},{name:"plaintes",field:"plaintes",label:"Plaintes",type:"text",placeholder:"Entrez les plaintes"},{name:"mois",field:"mois",label:"Mois de grossesse",type:"number",placeholder:"Entrez le mois de grossesse"},{name:"poids",field:"poids",label:"Poids",type:"number",placeholder:"Entrez le poids"},{name:"taille",field:"taille",label:"Taille",type:"number",placeholder:"Entrez la taille"},{name:"PB",label:"Périmètre brachial",type:"number",placeholder:"Entrez le périmètre brachial"},{name:"temperature",field:"temperature",label:"Température",type:"number",placeholder:"Entrez la température"},{name:"urine",field:"urine",label:"Urine",type:"text",placeholder:"Entrez les résultats d'analyse d'urine"},{name:"sucre",field:"sucre",label:"Sucre",type:"text",placeholder:"Entrez les résultats d'analyse de sucre"},{name:"TA",field:"TA",label:"Tension artérielle",type:"text",placeholder:"Entrez la tension artérielle"},{name:"pouls",field:"pouls",label:"Pouls",type:"number",placeholder:"Entrez le pouls"},{name:"EG",field:"EG",label:"État général",type:"text",placeholder:"Entrez l'état général"},{name:"muqueuse",field:"muqueuse",label:"Muqueuse",type:"text",placeholder:"Entrez l'état des muqueuses"},{name:"mollet",field:"mollet",label:"Mollets",type:"text",placeholder:"Entrez l'état des mollets"},{name:"OMI",field:"OMI",label:"Œdème des membres inférieurs",type:"text",placeholder:"Entrez l'OMI"},{name:"examen_seins",field:"examen_seins",label:"Examen des seins",type:"text",placeholder:"Entrez le résultat de l'examen des seins"},{name:"hu",field:"hu",label:"Hauteur utérine",type:"number",placeholder:"Entrez la hauteur utérine"},{name:"speculum",field:"speculum",label:"Examen au spéculum",type:"text",placeholder:"Entrez le résultat de l'examen au spéculum"},{name:"tv",field:"tv",label:"Toucher vaginal",type:"text",placeholder:"Entrez le résultat du toucher vaginal"},{name:"fer_ac_folique",field:"fer_ac_folique",label:"Fer/Acide folique",type:"text",placeholder:"Indiquez si fer/acide folique est pris"},{name:"milda",field:"milda",label:"MILD (Moustiquaire)",type:"text",placeholder:"Indiquez si moustiquaire est utilisée"},{name:"autre_traitement",field:"autre_traitement",label:"Autre traitement",type:"text",placeholder:"Entrez un autre traitement"},{name:"maf",field:"maf",label:"Mouvements actifs fœtaux",type:"text",placeholder:"Entrez les MAF"},{name:"bdcf",field:"bdcf",label:"Battements du cœur fœtal",type:"text",placeholder:"Entrez les BDCF"},{name:"alb",field:"alb",label:"Protéine dans l'urine",type:"text",placeholder:"Entrez les résultats de l'analyse d'albumine"},{name:"vat",field:"vat",label:"Vaccination antitétanique",type:"text",placeholder:"Indiquez si la vaccination antitétanique est faite"},{name:"tpi",label:"Traitement préventif intermittent",type:"text",placeholder:"Indiquez si le traitement préventif intermittent est fait"},{name:"palpation",field:"palpation",label:"Palpation abdominale",type:"text",placeholder:"Entrez les résultats de la palpation abdominale"},{name:"bdc",field:"bdc",label:"Battements du cœur",type:"text",placeholder:"Entrez les BDC"},{name:"presentation",field:"presentation",label:"Présentation du fœtus",type:"text",placeholder:"Entrez la présentation du fœtus"},{name:"bassin",field:"bassin",label:"Bassin obstétrical",type:"text",placeholder:"Entrez les résultats de l'examen du bassin obstétrical"},{name:"pelvimetre_externe",field:"pelvimetre_externe",label:"Pelvimètre externe",type:"text",placeholder:"Entrez les résultats de la pelvimétrie externe"},{name:"pelvimetre_interne",field:"pelvimetre_interne",label:"Pelvimètre interne",type:"text",placeholder:"Entrez les résultats de la pelvimétrie interne"},{name:"biischiatique",field:"biischiatique",label:"Diamètre bi-ischiatique",type:"number",placeholder:"Entrez le diamètre bi-ischiatique"},{name:"trillat",field:"trillat",label:"Ligne de Trillat",type:"text",placeholder:"Entrez les résultats de la ligne de Trillat"},{name:"lign_innominees",field:"lign_innominees",label:"Lignes innominées",type:"text",placeholder:"Entrez les résultats des lignes innominées"},{name:"autre_examen",field:"autre_examen",label:"Autres examens",type:"text",placeholder:"Entrez les résultats des autres examens"},{name:"resultat",label:"Résultats des examens",type:"text",placeholder:"Entrez les résultats des examens"},{name:"lieu_accouchement_apre_consentement",label:"Lieu d'accouchement après consentement",type:"text",placeholder:"Entrez le lieu d'accouchement après consentement"},{name:"traitement",field:"traitement",label:"Traitement proposé",type:"text",placeholder:"Entrez le traitement proposé"}],newConsultation:{date:"",visite_id:"",terme:"",SA:"",plaintes:"",mois:"",poids:"",taille:"",PB:"",temperature:"",urine:"",sucre:"",TA:"",pouls:"",EG:"",muqueuse:"",mollet:"",OMI:"",examen_seins:"",hu:"",speculum:"",tv:"",fer_ac_folique:"",milda:"",autre_traitement:"",maf:"",bdcf:"",alb:"",vat:"",tpi:"",palpation:"",bdc:"",presentation:"",bassin:"",pelvimetre_externe:"",pelvimetre_interne:"",biischiatique:"",trillat:"",lign_innominees:"",autre_examen:"",resultat:"",lieu_accouchement_apre_consentement:"",traitement:"",patiente_id:this.patienteId,visite_id:this.visiteId},patiente:{},consultations:[],rendezVous:[],consultationColumns:[{label:"Date",field:"date"},{label:"Type de rendez-vous",field:"type"},{label:"Terme",field:"terme"},{label:"Actions",field:"action",type:"action"}],rendezVousColumns:[{label:"Date",field:"date_rv"},{label:"Type de rendez-vous",field:"libelle"},{label:"Actions",field:"action",type:"action"}]}},props:{id:{type:Number,required:!0}},mounted(){this.getPatienteDetails(),this.getConsultations(),this.getRendezVous(),this.getVisites(),this.getAccouchements()},methods:{async getVisites(){try{const l=await R.getVisites();this.visites=l.ListeVisites,this.updateRendezVousOptions()}catch(l){console.error("Erreur lors de la récupération des visites :",l)}},updateRendezVousOptions(){const l=this.visites.map(e=>({value:e.id,text:e.libelle}));this.rendezVousFields.find(e=>e.field==="visite_id").options=l},async getPatienteDetails(){try{const l=await T.getPatiente(this.id);this.patiente=l.patiente,this.user=this.patiente.user,this.photo=this.patiente.user.photo,this.imageUrl=this.photo?U+`${this.photo}`:"/src/assets/images/women.svg"}catch(l){console.error("Erreur lors de la récupération des détails de la patiente :",l)}},async getConsultations(){try{const l=await f.getConsultationsByPatiente(this.id);l&&l.consultations?(Array.isArray(l.consultations)||(l.consultations=[l.consultations]),this.consultations=l.consultations.map(e=>({id:e.id,date:e.date,type:e.visite.libelle,terme:e.terme,autre_examen:e.autre_examen,SA:e.SA,plaintes:e.plaintes,mois:e.mois,poids:e.poids,taille:e.taille,PB:e.PB,temperature:e.temperature,urine:e.urine,sucre:e.sucre,TA:e.TA,pouls:e.pouls,EG:e.EG,muqueuse:e.muqueuse,mollet:e.mollet,OMI:e.OMI,examen_seins:e.examen_seins,hu:e.hu,speculum:e.speculum,tv:e.tv,fer_ac_folique:e.fer_ac_folique,milda:e.milda,autre_traitement:e.autre_traitement,maf:e.maf,bdcf:e.bdcf,alb:e.alb,vat:e.vat,tpi:e.tpi,palpation:e.palpation,bdc:e.bdc,presentation:e.presentation,bassin:e.bassin,pelvimetre_externe:e.pelvimetre_externe,pelvimetre_interne:e.pelvimetre_interne,biischiatique:e.biischiatique,trillat:e.trillat,lign_innominees:e.lign_innominees,resultat:e.resultat,lieu_accouchement_apre_consentement:e.lieu_accouchement_apre_consentement,traitement:e.traitement,sage_femme_id:e.sage_femme_id,patiente_id:e.patiente_id,visite_id:e.visite_id}))):console.log("Aucune consultation trouvée pour cette patiente.")}catch(l){console.error("Erreur lors de la récupération des consultations :",l)}},async getRendezVous(){try{const l=await f.getRendezVousByPatiente(this.id);l&&l.mes_rv?(Array.isArray(l.mes_rv)||(l.mes_rv=[l.mes_rv]),this.rendezVous=l.mes_rv.map(e=>({id:e.id,date_rv:e.date_rv,libelle:e.visite?e.visite.libelle:"Aucun libellé",visite_id:e.visite_id}))):console.log("Aucun rendez-vous trouvé pour cette patiente.")}catch(l){console.error("Erreur lors de la récupération des rendez-vous :",l)}},async addRendezVous(l){this.newRendezVous={...this.newRendezVous,...l};try{await w.createRendezVous(this.newRendezVous),this.getRendezVous(),this.resetRendezVousForm(),r.fire({title:"Rendez-vous ajouté avec succès!",icon:"success"})}catch{r.fire({title:"Erreur lors de l'ajout",text:"Vérifiez les informations.",icon:"error"})}},resetRendezVousForm(){this.newRendezVous={date_rv:"",visite_id:"",patiente_id:this.id}},async addConsultation(){try{console.log("Envoi des données :",{...this.newConsultation,patiente_id:this.id}),await f.createConsultation({...this.newConsultation,patiente_id:this.id}),r.fire({title:"Succès!",text:"Consultation ajoutée avec succès.",icon:"success"}),this.newConsultation={},await this.getConsultations(),$("#ajoutConsultation").modal("hide")}catch(l){console.error("Erreur lors de la création de la consultation :",l),l.response&&l.response.status===422&&console.error("Erreurs de validation :",l.response.data.errors)}},resetConsultationForm(){this.newConsultation={date:"",terme:"",plaintes:"",patiente_id:this.id}},async deleteRendezVous(l){r.fire({title:"Êtes-vous sûr de vouloir supprimer ce rendez-vous ?",icon:"warning",showCancelButton:!0,confirmButtonText:"Oui, supprimer",cancelButtonText:"Annuler"}).then(async e=>{if(e.isConfirmed)try{await w.deleteRendezVous(l),this.getRendezVous(),r.fire({title:"Rendez-vous supprimé avec succès !",icon:"success",timer:1e3})}catch(m){console.error("Erreur lors de la suppression du rendez-vous :",m),r.fire({title:"Erreur lors de la suppression du rendez-vous !",icon:"error",timer:1e3})}})},handleAccouchementTableAction({action:l,row:e}){switch(l){case C:this.$router.push({name:"detailAccouchement",params:{id:e.id}});break;case x:this.editAccouchement(e);break;case h:this.deleteAccouchement(e.id);break}},handleConsultationTableAction({action:l,row:e}){switch(l){case C:this.$router.push({name:"detailConsultation",params:{id:e.id}});break;case x:this.editConsultation(e);break;case h:this.deleteConsultation(e.id);break}},handleRendezVousTableAction({action:l,row:e}){switch(l){case C:this.$router.push({name:"detailRendezVous",params:{id:e.id}});break;case x:this.editRendezVous(e);break;case h:this.deleteRendezVous(e.id);break}},async editConsultation(l){try{await f.updateConsultation(l.id,l),this.getConsultations(),r.fire({title:"Consultation mise à jour avec succès!",icon:"success"})}catch{r.fire({title:"Erreur lors de la mise à jour de la consultation",text:"Veuillez vérifier les informations et réessayer.",icon:"error"})}},async editRendezVous(l){try{await w.updateRendezVous(l.id,l),this.getRendezVous(),r.fire({title:"Rendez-vous mis à jour avec succès!",icon:"success"})}catch{r.fire({title:"Erreur lors de la mise à jour du rendez-vous",text:"Veuillez vérifier les informations et réessayer.",icon:"error"})}},async getAccouchements(){try{const l=await v.getAccouchementsByPatiente(this.id);l&&l.accouchements?this.accouchements=l.accouchements.map(e=>({date:e.date,mode:e.mode,pathologie:e.pathologie,lieu:e.lieu,heure:e.heure,terme:e.terme,mois_grossesse:e.mois_grossesse,debut_travail:e.debut_travail,perinee:e.perinee,evolution_reanimation:e.evolution_reanimation,id:e.id})):console.log("Aucun accouchement trouvé pour cette patiente.")}catch(l){console.error("Erreur lors de la récupération des accouchements :",l)}},async addAccouchement(){try{await v.createAccouchement({...this.newAccouchement,patiente_id:this.id}),this.getAccouchements(),this.resetAccouchementForm(),r.fire({title:"Accouchement ajouté avec succès!",icon:"success"}),this.getAccouchements()}catch(l){r.fire({title:"Erreur lors de l'ajout",text:l,icon:"error"})}},resetAccouchementForm(){this.newAccouchement={date:"",mode:"",perinee:"",lieu:"",mois_grossesse:"",terme:"",debut_travail:"",pathologie:"",heure:"",evolution_reanimation:"",mode:"",patiente_id:this.id}},async editAccouchement(l){try{await v.updateAccouchement(l.id,l),this.getAccouchements(),r.fire({title:"Accouchement mis à jour avec succès!",icon:"success"})}catch{r.fire({title:"Erreur lors de la mise à jour de l'accouchement",text:"Veuillez vérifier les informations et réessayer.",icon:"error"})}},async deleteAccouchement(l){r.fire({title:"Êtes-vous sûr de vouloir supprimer cet accouchement ?",icon:"warning",showCancelButton:!0,confirmButtonText:"Oui, supprimer",cancelButtonText:"Annuler"}).then(async e=>{if(e.isConfirmed)try{await v.deleteAccouchement(l),this.getAccouchements(),r.fire({title:"Accouchement supprimé avec succès!",icon:"success",timer:1e3})}catch{r.fire({title:"Erreur lors de la suppression de l'accouchement",icon:"error",timer:1e3})}})}}},k={class:"container"},F={class:"row"},M={class:"col-md-5"},j={class:"project-info-box mt-0"},I={class:"card-body text-center mb-5"},L=["src"],O={class:"mb-3 text-capitalize"},G={class:"col-md-7"},N={class:""},H={key:0},W={class:"modal fade",id:"ajoutRendezVous","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},J={class:"modal-dialog"},K={class:"modal-content"},Q={class:"modal-body"},X={class:"form-group"},Y={class:"form-group"},Z=["value"],ee={class:"modal-footer"},te={class:"mt-3"},oe={key:0},ne={class:"modal fade",id:"ajoutConsultation","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},le={class:"modal-dialog"},ie={class:"modal-content"},se={class:"modal-body"},re={class:"form-group"},ae={class:"form-group"},ue=["value"],de={class:"form-group"},me={class:"form-group"},pe={class:"form-group"},ce={class:"form-group"},be={class:"form-group"},fe={class:"form-group"},ve={class:"form-group"},ye={class:"form-group"},ge={class:"form-group"},we={class:"form-group"},Ce={class:"form-group"},xe={class:"form-group"},he={class:"form-group"},ze={class:"form-group"},Ae={class:"form-group"},Ve={class:"form-group"},_e={class:"form-group"},Ee={class:"form-group"},Ue={class:"form-group"},Te={class:"form-group"},qe={class:"form-group"},Re={class:"form-group"},De={class:"form-group"},Be={class:"form-group"},Pe={class:"form-group"},Se={class:"form-group"},ke={class:"form-group"},Fe={class:"form-group"},Me={class:"form-group"},je={class:"form-group"},Ie={class:"form-group"},Le={class:"form-group"},Oe={class:"form-group"},Ge={class:"form-group"},Ne={class:"form-group"},He={class:"form-groupe"},We={class:"form-groupe"},Je={class:"form-groupe"},Ke={class:"mt-3"},Qe={class:"mt-3"},Xe={key:0},Ye={class:"modal fade",id:"ajoutAccouchement","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},Ze={class:"modal-dialog"},$e={class:"modal-content"},et={class:"modal-body"},tt={class:"form-group"},ot={class:"form-group"},nt={class:"form-group"},lt={class:"form-group"},it={class:"form-group"},st={class:"form-group"},rt={class:"form-group"},at={class:"form-group"},ut={class:"form-group"},dt={class:"form-group"},mt={class:"modal-footer"};function pt(l,e,m,ct,o,a){const g=z("Table"),_=z("Layout");return u(),y(_,null,{default:B(()=>[t("div",k,[t("div",F,[t("div",M,[t("div",j,[t("div",I,[t("img",{class:"img-account-profile rounded-circle mb-2",src:l.imageUrl,alt:"patiente"},null,8,L)]),t("h4",O,d(o.user.prenom)+" "+d(o.user.nom),1),t("p",null,"Téléphone : "+d(o.user.telephone),1),t("p",null,"Adresse : "+d(o.user.adresse),1),t("p",null,"Lieu de naissance : "+d(o.patiente.lieu_de_naissance),1),t("p",null,"Date de naissance : "+d(o.patiente.date_de_naissance),1),t("p",null,"Profession : "+d(o.patiente.profession),1),t("p",null,"Type : "+d(o.patiente.type),1)])]),t("div",G,[t("div",N,[o.rendezVous.length===0?(u(),p("div",H,[e[63]||(e[63]=t("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#ajoutRendezVous"}," Ajouter un rendez-vous ",-1)),t("div",W,[t("div",J,[t("div",K,[e[62]||(e[62]=t("div",{class:"modal-header"},[t("h1",{class:"modal-title fs-5",id:"staticBackdropLabel"}," Ajouter un rendez-vous "),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),t("div",Q,[t("div",X,[e[58]||(e[58]=t("label",{for:"date_rv"},"Date du rendez-vous",-1)),i(t("input",{"onUpdate:modelValue":e[0]||(e[0]=n=>o.newRendezVous.date_rv=n),type:"date",class:"form-control",id:"date_rv",placeholder:"Sélectionnez la date"},null,512),[[s,o.newRendezVous.date_rv]])]),t("div",Y,[e[60]||(e[60]=t("label",{for:"structure_sante_id"},"Structure de santé",-1)),i(t("select",{"onUpdate:modelValue":e[1]||(e[1]=n=>o.newRendezVous.visite_id=n),id:"visite_id",class:"form-control"},[e[59]||(e[59]=t("option",{value:"",disabled:"",selected:""}," Sélectionnez le type de la consultation ",-1)),(u(!0),p(A,null,V(l.visites,n=>(u(),p("option",{key:n.id,value:n.id},d(n.libelle),9,Z))),128))],512),[[c,o.newRendezVous.visite_id]])])]),t("div",ee,[t("button",{class:"btn btn-primary",onClick:e[2]||(e[2]=(...n)=>a.addRendezVous&&a.addRendezVous(...n))}," Ajouter "),e[61]||(e[61]=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," Fermer ",-1))])])])]),e[64]||(e[64]=t("p",null,"Aucun rendez-vous trouvé pour cette patiente.",-1))])):(u(),y(g,{key:1,columns:o.rendezVousColumns,data:o.rendezVous,title:"Rendez-vous",type:"rendezVous",formFields:o.rendezVousFields,onAction:a.handleRendezVousTableAction,onAddData:a.addRendezVous,onEditData:a.editRendezVous},null,8,["columns","data","formFields","onAction","onAddData","onEditData"]))]),t("div",te,[o.consultations.length===0?(u(),p("div",oe,[e[110]||(e[110]=t("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#ajoutConsultation"}," Ajouter une consultation ",-1)),t("div",ne,[t("div",le,[t("div",ie,[e[109]||(e[109]=t("div",{class:"modal-header"},[t("h1",{class:"modal-title fs-5",id:"staticBackdropLabel"}," Ajouter un accouchement "),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),t("div",se,[t("div",re,[e[65]||(e[65]=t("label",{for:"date"},"Date",-1)),i(t("input",{type:"date","onUpdate:modelValue":e[3]||(e[3]=n=>o.newConsultation.date=n),id:"date",required:""},null,512),[[s,o.newConsultation.date]])]),t("div",ae,[e[67]||(e[67]=t("label",{for:"structure_sante_id"},"Type de consultation",-1)),i(t("select",{"onUpdate:modelValue":e[4]||(e[4]=n=>o.newConsultation.visite_id=n),id:"visite_id",class:"form-control"},[e[66]||(e[66]=t("option",{value:"",disabled:"",selected:""}," Sélectionnez le type de la consultation ",-1)),(u(!0),p(A,null,V(l.visites,n=>(u(),p("option",{key:n.id,value:n.id},d(n.libelle),9,ue))),128))],512),[[c,o.newConsultation.visite_id]])]),t("div",de,[e[68]||(e[68]=t("label",{for:"terme"},"Terme",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=n=>o.newConsultation.terme=n),id:"terme"},null,512),[[s,o.newConsultation.terme]])]),t("div",me,[e[69]||(e[69]=t("label",{for:"sa"},"SA",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[6]||(e[6]=n=>o.newConsultation.SA=n),id:"sa"},null,512),[[s,o.newConsultation.SA]])]),t("div",pe,[e[70]||(e[70]=t("label",{for:"plaintes"},"Plaintes",-1)),i(t("textarea",{"onUpdate:modelValue":e[7]||(e[7]=n=>o.newConsultation.plaintes=n),id:"plaintes"},null,512),[[s,o.newConsultation.plaintes]])]),t("div",ce,[e[71]||(e[71]=t("label",{for:"mois"},"Mois",-1)),i(t("input",{type:"number","onUpdate:modelValue":e[8]||(e[8]=n=>o.newConsultation.mois=n),id:"mois"},null,512),[[s,o.newConsultation.mois]]),e[72]||(e[72]=t("label",{for:"poids"},"Poids (kg)",-1)),i(t("input",{type:"number","onUpdate:modelValue":e[9]||(e[9]=n=>o.newConsultation.poids=n),id:"poids"},null,512),[[s,o.newConsultation.poids]]),e[73]||(e[73]=t("label",{for:"taille"},"Taille (cm)",-1)),i(t("input",{type:"number","onUpdate:modelValue":e[10]||(e[10]=n=>o.newConsultation.taille=n),id:"taille"},null,512),[[s,o.newConsultation.taille]]),e[74]||(e[74]=t("label",{for:"pb"},"PB (cm)",-1)),i(t("input",{type:"number","onUpdate:modelValue":e[11]||(e[11]=n=>o.newConsultation.PB=n),id:"pb"},null,512),[[s,o.newConsultation.PB]])]),t("div",be,[e[75]||(e[75]=t("label",{for:"temperature"},"Température (°C)",-1)),i(t("input",{type:"number","onUpdate:modelValue":e[12]||(e[12]=n=>o.newConsultation.temperature=n),id:"temperature",step:"0.1"},null,512),[[s,o.newConsultation.temperature]])]),t("div",fe,[e[76]||(e[76]=t("label",{for:"urine"},"Urine",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[13]||(e[13]=n=>o.newConsultation.urine=n),id:"urine"},null,512),[[s,o.newConsultation.urine]])]),t("div",ve,[e[77]||(e[77]=t("label",{for:"sucre"},"Sucre",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[14]||(e[14]=n=>o.newConsultation.sucre=n),id:"sucre"},null,512),[[s,o.newConsultation.sucre]])]),t("div",ye,[e[78]||(e[78]=t("label",{for:"ta"},"TA (mmHg)",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[15]||(e[15]=n=>o.newConsultation.TA=n),id:"ta"},null,512),[[s,o.newConsultation.TA]])]),t("div",ge,[e[79]||(e[79]=t("label",{for:"pouls"},"Pouls (bpm)",-1)),i(t("input",{type:"number","onUpdate:modelValue":e[16]||(e[16]=n=>o.newConsultation.pouls=n),id:"pouls"},null,512),[[s,o.newConsultation.pouls]])]),t("div",we,[e[80]||(e[80]=t("label",{for:"eg"},"État général (EG)",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[17]||(e[17]=n=>o.newConsultation.EG=n),id:"eg"},null,512),[[s,o.newConsultation.EG]])]),t("div",Ce,[e[81]||(e[81]=t("label",{for:"muqueuse"},"Muqueuse",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[18]||(e[18]=n=>o.newConsultation.muqueuse=n),id:"muqueuse"},null,512),[[s,o.newConsultation.muqueuse]])]),t("div",xe,[e[82]||(e[82]=t("label",{for:"mollet"},"Mollet",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[19]||(e[19]=n=>o.newConsultation.mollet=n),id:"mollet"},null,512),[[s,o.newConsultation.mollet]])]),t("div",he,[e[83]||(e[83]=t("label",{for:"omi"},"OMI",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[20]||(e[20]=n=>o.newConsultation.OMI=n),id:"omi"},null,512),[[s,o.newConsultation.OMI]])]),t("div",ze,[e[84]||(e[84]=t("label",{for:"examen_seins"},"Examen des seins",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[21]||(e[21]=n=>o.newConsultation.examen_seins=n),id:"examen_seins"},null,512),[[s,o.newConsultation.examen_seins]])]),t("div",Ae,[e[85]||(e[85]=t("label",{for:"hu"},"HU",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[22]||(e[22]=n=>o.newConsultation.hu=n),id:"hu"},null,512),[[s,o.newConsultation.hu]])]),t("div",Ve,[e[86]||(e[86]=t("label",{for:"speculum"},"Speculum",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[23]||(e[23]=n=>o.newConsultation.speculum=n),id:"speculum"},null,512),[[s,o.newConsultation.speculum]])]),t("div",_e,[e[87]||(e[87]=t("label",{for:"tv"},"TV",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[24]||(e[24]=n=>o.newConsultation.tv=n),id:"tv"},null,512),[[s,o.newConsultation.tv]])]),t("div",Ee,[e[88]||(e[88]=t("label",{for:"fer_ac_folique"},"Fer Ac Folique",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[25]||(e[25]=n=>o.newConsultation.fer_ac_folique=n),id:"fer_ac_folique"},null,512),[[s,o.newConsultation.fer_ac_folique]])]),t("div",Ue,[e[89]||(e[89]=t("label",{for:"milda"},"Milda",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[26]||(e[26]=n=>o.newConsultation.milda=n),id:"milda"},null,512),[[s,o.newConsultation.milda]])]),t("div",Te,[e[90]||(e[90]=t("label",{for:"autre_traitement"},"Autre Traitement",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[27]||(e[27]=n=>o.newConsultation.autre_traitement=n),id:"autre_traitement"},null,512),[[s,o.newConsultation.autre_traitement]])]),t("div",qe,[e[91]||(e[91]=t("label",{for:"maf"},"MAF",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[28]||(e[28]=n=>o.newConsultation.maf=n),id:"maf"},null,512),[[s,o.newConsultation.maf]])]),t("div",Re,[e[92]||(e[92]=t("label",{for:"bdcf"},"BDCF",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[29]||(e[29]=n=>o.newConsultation.bdcf=n),id:"bdcf"},null,512),[[s,o.newConsultation.bdcf]])]),t("div",De,[e[93]||(e[93]=t("label",{for:"alb"},"ALB",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[30]||(e[30]=n=>o.newConsultation.alb=n),id:"alb"},null,512),[[s,o.newConsultation.alb]])]),t("div",Be,[e[94]||(e[94]=t("label",{for:"vat"},"VAT",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[31]||(e[31]=n=>o.newConsultation.vat=n),id:"vat"},null,512),[[s,o.newConsultation.vat]])]),t("div",Pe,[e[95]||(e[95]=t("label",{for:"tpi"},"TPI",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[32]||(e[32]=n=>o.newConsultation.tpi=n),id:"tpi"},null,512),[[s,o.newConsultation.tpi]])]),t("div",Se,[e[96]||(e[96]=t("label",{for:"palpation"},"Palpation",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[33]||(e[33]=n=>o.newConsultation.palpation=n),id:"palpation"},null,512),[[s,o.newConsultation.palpation]])]),t("div",ke,[e[97]||(e[97]=t("label",{for:"bdc"},"BDC",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[34]||(e[34]=n=>o.newConsultation.bdc=n),id:"bdc"},null,512),[[s,o.newConsultation.bdc]])]),t("div",Fe,[e[98]||(e[98]=t("label",{for:"presentation"},"Présentation",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[35]||(e[35]=n=>o.newConsultation.presentation=n),id:"presentation"},null,512),[[s,o.newConsultation.presentation]])]),t("div",Me,[e[99]||(e[99]=t("label",{for:"bassin"},"Bassin",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[36]||(e[36]=n=>o.newConsultation.bassin=n),id:"bassin"},null,512),[[s,o.newConsultation.bassin]])]),t("div",je,[e[100]||(e[100]=t("label",{for:"pelvimetre_externe"},"Pelvimètre Externe",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[37]||(e[37]=n=>o.newConsultation.pelvimetre_externe=n),id:"pelvimetre_externe"},null,512),[[s,o.newConsultation.pelvimetre_externe]])]),t("div",Ie,[e[101]||(e[101]=t("label",{for:"pelvimetre_interne"},"Pelvimètre Interne",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[38]||(e[38]=n=>o.newConsultation.pelvimetre_interne=n),id:"pelvimetre_interne"},null,512),[[s,o.newConsultation.pelvimetre_interne]])]),t("div",Le,[e[102]||(e[102]=t("label",{for:"biischiatique"},"Biischiatique",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[39]||(e[39]=n=>o.newConsultation.biischiatique=n),id:"biischiatique"},null,512),[[s,o.newConsultation.biischiatique]])]),t("div",Oe,[e[103]||(e[103]=t("label",{for:"trillat"},"Trillat",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[40]||(e[40]=n=>o.newConsultation.trillat=n),id:"trillat"},null,512),[[s,o.newConsultation.trillat]])]),t("div",Ge,[e[104]||(e[104]=t("label",{for:"lign_innominees"},"Lign Innommées",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[41]||(e[41]=n=>o.newConsultation.lign_innominees=n),id:"lign_innominees"},null,512),[[s,o.newConsultation.lign_innominees]])]),t("div",Ne,[e[105]||(e[105]=t("label",{for:"lv"},"LV",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[42]||(e[42]=n=>o.newConsultation.lv=n),id:"lv"},null,512),[[s,o.newConsultation.lv]])]),t("div",He,[e[106]||(e[106]=t("label",{for:"localisation"},"Localisation",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[43]||(e[43]=n=>o.newConsultation.localisation=n),id:"localisation"},null,512),[[s,o.newConsultation.localisation]])]),t("div",We,[e[107]||(e[107]=t("label",{for:"lien"},"Lien",-1)),i(t("input",{type:"text","onUpdate:modelValue":e[44]||(e[44]=n=>o.newConsultation.lien=n),id:"lien"},null,512),[[s,o.newConsultation.lien]])]),t("div",Je,[e[108]||(e[108]=t("label",{for:"commentaires"},"Commentaires",-1)),i(t("textarea",{"onUpdate:modelValue":e[45]||(e[45]=n=>o.newConsultation.commentaires=n),id:"commentaires"},null,512),[[s,o.newConsultation.commentaires]])]),t("button",{type:"submit",class:"btn btn-primary",onClick:e[46]||(e[46]=P((...n)=>a.addConsultation&&a.addConsultation(...n),["prevent"]))}," Ajouter ")])])])]),e[111]||(e[111]=t("p",null,"Aucune consultation trouvée pour cette patiente.",-1))])):(u(),y(g,{key:1,columns:o.consultationColumns,data:o.consultations,type:"consultation",title:"Consultations",formFields:o.consultationFields,onAction:a.handleConsultationTableAction,onAddData:a.addConsultation,onEditData:a.editConsultation},null,8,["columns","data","formFields","onAction","onAddData","onEditData"]))]),t("div",Ke,[t("div",Qe,[o.accouchements.length===0?(u(),p("div",Xe,[e[129]||(e[129]=t("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#ajoutAccouchement"}," Ajouter un accouchement ",-1)),t("div",Ye,[t("div",Ze,[t("div",$e,[e[128]||(e[128]=t("div",{class:"modal-header"},[t("h1",{class:"modal-title fs-5",id:"staticBackdropLabel"}," Ajouter un accouchement "),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),t("div",et,[t("div",tt,[e[112]||(e[112]=t("label",{for:"date_accouchement"},"Date de l'accouchement",-1)),i(t("input",{"onUpdate:modelValue":e[47]||(e[47]=n=>o.newAccouchement.date=n),type:"date",class:"form-control",id:"date_accouchement"},null,512),[[s,o.newAccouchement.date]])]),t("div",ot,[e[114]||(e[114]=t("label",{for:"mode"},"Mode d'accouchement",-1)),i(t("select",{"onUpdate:modelValue":e[48]||(e[48]=n=>o.newAccouchement.mode=n),id:"mode",class:"form-control"},e[113]||(e[113]=[t("option",{value:"",disabled:"",selected:""}," Sélectionnez le mode d'accouchement ",-1),t("option",{value:"naturel"},"Naturel",-1),t("option",{value:"instrumental"},"Instrumental",-1),t("option",{value:"césarienne"},"Césarienne",-1)]),512),[[c,o.newAccouchement.mode]])]),t("div",nt,[e[116]||(e[116]=t("label",{for:"perinee"},"Perinee",-1)),i(t("select",{"onUpdate:modelValue":e[49]||(e[49]=n=>o.newAccouchement.perinee=n),id:"perinee",class:"form-control"},e[115]||(e[115]=[t("option",{value:"",disabled:"",selected:""}," Sélectionnez la perinee ",-1),t("option",{value:"intact"},"Intact",-1),t("option",{value:"episiotomie"},"Episiotomie",-1),t("option",{value:"dechirure"},"Déchirure",-1)]),512),[[c,o.newAccouchement.perinee]])]),t("div",lt,[e[118]||(e[118]=t("label",{for:"lieu"},"Lieu",-1)),i(t("select",{"onUpdate:modelValue":e[50]||(e[50]=n=>o.newAccouchement.lieu=n),id:"lieu",class:"form-control"},e[117]||(e[117]=[t("option",{value:"",disabled:"",selected:""}," Sélectionnez le lieu ",-1),t("option",{value:"maternité"},"Maternité",-1),t("option",{value:"domicile"},"Domicile",-1)]),512),[[c,o.newAccouchement.lieu]])]),t("div",it,[e[119]||(e[119]=t("label",{for:"mois_grossesse"},"Mois de grossesse",-1)),i(t("input",{"onUpdate:modelValue":e[51]||(e[51]=n=>o.newAccouchement.mois_grossesse=n),type:"number",class:"form-control",id:"mois_grossesse",placeholder:"Entrez le mois de grossesse"},null,512),[[s,o.newAccouchement.mois_grossesse]])]),t("div",st,[e[120]||(e[120]=t("label",{for:"debut_travail"},"Début du travail",-1)),i(t("input",{"onUpdate:modelValue":e[52]||(e[52]=n=>o.newAccouchement.debut_travail=n),type:"time",class:"form-control",id:"debut_travail",placeholder:"Entrez le début du travail"},null,512),[[s,o.newAccouchement.debut_travail]])]),t("div",rt,[e[121]||(e[121]=t("label",{for:"pathologie"},"Pathologie",-1)),i(t("input",{"onUpdate:modelValue":e[53]||(e[53]=n=>o.newAccouchement.pathologie=n),type:"text",class:"form-control",id:"pathologie",placeholder:"Entrez la pathologie"},null,512),[[s,o.newAccouchement.pathologie]])]),t("div",at,[e[122]||(e[122]=t("label",{for:"heure"},"Heure",-1)),i(t("input",{"onUpdate:modelValue":e[54]||(e[54]=n=>o.newAccouchement.heure=n),type:"time",class:"form-control",id:"heure",placeholder:"Entrez l'heure"},null,512),[[s,o.newAccouchement.heure]])]),t("div",ut,[e[124]||(e[124]=t("label",{for:"evolution_reanimation"},"Terme",-1)),i(t("select",{"onUpdate:modelValue":e[55]||(e[55]=n=>o.newAccouchement.terme=n),id:"terme",class:"form-control"},e[123]||(e[123]=[t("option",{value:"",disabled:"",selected:""}," Sélectionnez le terme ",-1),t("option",{value:"prématuré"},"prématuré",-1),t("option",{value:"à terme"},"à terme",-1),t("option",{value:"post-terme"},"post-terme",-1)]),512),[[c,o.newAccouchement.terme]])]),t("div",dt,[e[126]||(e[126]=t("label",{for:"evolution_reanimation"},"Évolution réanimation",-1)),i(t("select",{"onUpdate:modelValue":e[56]||(e[56]=n=>o.newAccouchement.evolution_reanimation=n),id:"evolution_reanimation",class:"form-control"},e[125]||(e[125]=[t("option",{value:"",disabled:"",selected:""}," Sélectionnez l'évolution réanimation ",-1),t("option",{value:"favorable"},"Favorable",-1),t("option",{value:"transfert"},"Transfert",-1),t("option",{value:"décès"},"Décès",-1)]),512),[[c,o.newAccouchement.evolution_reanimation]])])]),t("div",mt,[t("button",{class:"btn btn-primary",onClick:e[57]||(e[57]=(...n)=>a.addAccouchement&&a.addAccouchement(...n))}," Ajouter "),e[127]||(e[127]=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," Fermer ",-1))])])])]),e[130]||(e[130]=t("p",null,"Aucun accouchement trouvé pour cette patiente.",-1))])):(u(),y(g,{key:1,columns:o.accouchementsColumns,data:o.accouchements,title:"Accouchements",type:"accouchement",formFields:o.accouchementFields,onAction:a.handleAccouchementTableAction,onAddData:a.addAccouchement,onEditData:a.editAccouchement},null,8,["columns","data","formFields","onAction","onAddData","onEditData"]))])])])])])]),_:1})}const zt=D(S,[["render",pt],["__scopeId","data-v-57bd4f60"]]);export{zt as default};
