import{L as y}from"./Layout-Ds3QvfcV.js";import{M as v,e as _,f as h,h as w,o as c,a as t,d as l,v as a,c as p,r as g,F as k,t as b}from"./index-C-f7vtLL.js";/* empty css                                                               */import{_ as x}from"./_plugin-vue_export-helper-Cm6_9V8g.js";import{s as d}from"./structureService-CmFMW1Iu.js";import{S as i}from"./sweetalert2.all-BXtj_mcp.js";const C={components:{Layout:y},data(){return{structures:[],newStructure:{nom:"",lieu:"",district_sanitaire_id:""},editedStructure:{id:"",nom:"",lieu:"",district_sanitaire_id:","}}},mounted(){this.getStructures()},methods:{async getStructures(){try{const o=await d.getStructuresSante();this.structures=o.structures_sante}catch(o){console.error("Erreur lors de la récupération des structures :",o)}},async addStructure(){try{await d.addStructuresSante(this.newStructure),this.getStructures(),this.resetForm(),i.fire({title:"Structure ajoutée avec succès!",icon:"success"})}catch{i.fire({title:"Erreur lors de l'ajout de la structure",text:"Veuillez vérifier les informations et réessayer.",icon:"error"})}},resetForm(){this.newStructure={nom:"",lieu:"",district_sanitaire_id:""}},async deleteStructure(o){i.fire({title:"Supprimer la structure?",text:"Voulez-vous vraiment supprimer cette structure?",icon:"warning",showCancelButton:!0,confirmButtonText:"Oui, supprimer",cancelButtonText:"Non, annuler"}).then(async e=>{if(e.isConfirmed)try{await d.deleteStructuresSante(o),this.getStructures(),i.fire({title:"Structure supprimée avec succès!",icon:"success",showConfirmButton:!1,timer:1500})}catch(n){console.error("Erreur lors de la suppression de la structure :",n),i.fire({title:"Erreur lors de la suppression",text:"Veuillez réessayer.",icon:"error"})}})},async editStructure(o){const e=this.structures.find(m=>m.id===o);this.editedStructure={...e},new v(this.$refs.editStructure).show()},async updateStructure(){try{await d.updateStructuresSante(this.editedStructure.id,this.editedStructure),this.getStructures(),i.fire({title:"Structure mise à jour avec succès!",icon:"success"})}catch{i.fire({title:"Erreur lors de la mise à jour de la structure",text:"Veuillez réessayer.",icon:"error"})}}}},B={class:"structure-list"},L={class:"header"},V={class:"actions"},j={class:"modal fade",id:"ajoutStructure","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},E={class:"modal-dialog"},A={class:"modal-content"},z={class:"modal-body"},M={class:"form-group"},N={class:"form-group"},U={class:"form-group"},F={class:"modal-footer"},D={class:"table-responsive"},T={class:"table m-3"},I=["onClick"],O=["onClick"],q={class:"modal fade",id:"editStructure",ref:"editStructure","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},G={class:"modal-dialog"},H={class:"modal-content"},J={class:"modal-body"},K={class:"form-group"},P={class:"form-group"},Q={class:"modal-footer"};function R(o,e,n,m,s,u){const S=w("Layout");return c(),_(S,null,{default:h(()=>[t("div",B,[t("div",L,[e[13]||(e[13]=t("h1",null,"Liste des Structures de Santé",-1)),t("div",V,[e[12]||(e[12]=t("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#ajoutStructure"}," Ajouter une Structure ",-1)),t("div",j,[t("div",E,[t("div",A,[e[11]||(e[11]=t("div",{class:"modal-header"},[t("h1",{class:"modal-title fs-5",id:"staticBackdropLabel"}," Ajouter une Structure "),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),t("div",z,[t("div",M,[e[7]||(e[7]=t("label",{for:"nom"},"Nom de la Structure",-1)),l(t("input",{"onUpdate:modelValue":e[0]||(e[0]=r=>s.newStructure.nom=r),type:"text",class:"form-control",id:"nom",placeholder:"Entrez le nom de la structure"},null,512),[[a,s.newStructure.nom]])]),t("div",N,[e[8]||(e[8]=t("label",{for:"lieu"},"Adresse",-1)),l(t("input",{"onUpdate:modelValue":e[1]||(e[1]=r=>s.newStructure.lieu=r),type:"text",class:"form-control",id:"lieu",placeholder:"Entrez l'adresse de la structure"},null,512),[[a,s.newStructure.lieu]])]),t("div",U,[e[9]||(e[9]=t("label",{for:"district_sanitaire_id"},"District",-1)),l(t("input",{"onUpdate:modelValue":e[2]||(e[2]=r=>s.newStructure.district_sanitaire_id=r),type:"text",class:"form-control",id:"district_sanitaire_id",placeholder:"Entrez l'adresse de la structure"},null,512),[[a,s.newStructure.district_sanitaire_id]])])]),t("div",F,[t("button",{class:"btn btn-primary",onClick:e[3]||(e[3]=(...r)=>u.addStructure&&u.addStructure(...r))}," Ajouter "),e[10]||(e[10]=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," Annuler ",-1))])])])])])]),t("div",D,[t("table",T,[e[16]||(e[16]=t("thead",null,[t("tr",null,[t("th",null,"Nom"),t("th",null,"Lieu"),t("th",null,"Actions")])],-1)),t("tbody",null,[(c(!0),p(k,null,g(s.structures,r=>(c(),p("tr",{key:r.id},[t("td",null,b(r.nom),1),t("td",null,b(r.lieu),1),t("td",null,[t("button",{class:"btn-action",onClick:f=>u.editStructure(r.id)},e[14]||(e[14]=[t("i",{class:"fa fa-edit"},null,-1)]),8,I),t("button",{class:"btn-action",onClick:f=>u.deleteStructure(r.id)},e[15]||(e[15]=[t("i",{class:"fa-solid fa-trash-can"},null,-1)]),8,O)])]))),128))])])])]),t("div",q,[t("div",G,[t("div",H,[e[20]||(e[20]=t("div",{class:"modal-header"},[t("h1",{class:"modal-title fs-5",id:"staticBackdropLabel"}," Modifier la Structure "),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),t("div",J,[t("form",null,[t("div",K,[e[17]||(e[17]=t("label",{for:"nom"},"Nom de la Structure",-1)),l(t("input",{"onUpdate:modelValue":e[4]||(e[4]=r=>s.editedStructure.nom=r),type:"text",class:"form-control",id:"nom",placeholder:"Nom de la structure"},null,512),[[a,s.editedStructure.nom]])]),t("div",P,[e[18]||(e[18]=t("label",{for:"lieu"},"Lieu",-1)),l(t("input",{"onUpdate:modelValue":e[5]||(e[5]=r=>s.editedStructure.lieu=r),type:"text",class:"form-control",id:"lieu",placeholder:"Adresse"},null,512),[[a,s.editedStructure.lieu]])])])]),t("div",Q,[t("button",{class:"btn btn-primary",onClick:e[6]||(e[6]=(...r)=>u.updateStructure&&u.updateStructure(...r))}," Modifier "),e[19]||(e[19]=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," Annuler ",-1))])])])],512)]),_:1})}const et=x(C,[["render",R],["__scopeId","data-v-ac9a0d09"]]);export{et as default};