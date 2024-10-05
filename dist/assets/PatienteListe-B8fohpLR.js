import{L as h}from"./Layout-Ds3QvfcV.js";import{P as v}from"./pagination-B0tE2wTz.js";import{T as x}from"./tableau-nIdjVny8.js";import{b as E}from"./badieneGoxService-B0c3JR-3.js";import{p}from"./patienteService-aoQ1PbEG.js";import{S as i}from"./sweetalert2.all-BXtj_mcp.js";import{e as w,f as D,h as f,o as m,c as u,a as t,d as s,v as l,i as P,F as A,r as T,g,t as z}from"./index-C-f7vtLL.js";import{_ as B}from"./_plugin-vue_export-helper-Cm6_9V8g.js";const L="view",k="edit",C="delete",F={components:{Layout:h,Pagination:v,Table:x},data(){return{newPatiente:{nom:"",prenom:"",adresse:"",telephone:"",email:"",date_de_naissance:"",lieu_de_naissance:"",profession:"",type:"",badien_gox_id:""},badiene:[],columns:[{label:"Nom",field:"nom"},{label:"Prénom",field:"prenom"},{label:"Téléphone",field:"telephone"},{label:"Âge",field:"age"},{label:"Lieu de Naissance",field:"lieu_de_naissance"},{label:"Profession",field:"profession"},{label:"Type",field:"type"},{label:"Actions",field:"action",type:"action"}],formFields:[{name:"prenom",label:"Prénom",type:"text",placeholder:"Entrez le prénom"},{name:"nom",label:"Nom",type:"text",placeholder:"Entrez le nom"},{name:"lieu_de_naissance",label:"Lieu de Naissance",type:"text",placeholder:"Entrez le lieu de naissance"},{name:"date_de_naissance",label:"Date de Naissance",type:"date",placeholder:"Entrez la date de naissance"},{name:"profession",label:"Profession",type:"text",placeholder:"Entrez la profession"},{name:"type",label:"Type",type:"select",options:[{value:"",text:"Selectionner le type de patiente"},{value:"Enceinte",text:"Enceinte"},{value:"En planning",text:"En planning"},{value:"Allaitente",text:"Allaitente"}],placeholder:"Entrez le type de patiente"},{name:"adresse",label:"Adresse",type:"text",placeholder:"Entrez l'adresse de la patiente"},{name:"badien_gox_id",label:"Badiene Gox",type:"select",options:[]},{name:"email",label:"Email",type:"email",placeholder:"Entrez l'email de la patiente"},{name:"telephone",label:"Téléphone",type:"text",placeholder:"Entrez le numéro de téléphone de la patiente"}],formData:{},allData:[],paginatedData:[],currentPage:1,totalItems:0,itemsPerPage:10}},mounted(){this.getPatients(),this.getBadiene()},methods:{async getPatients(){try{const n=await p.getPatientes();n&&n.Liste_des_patientes&&Array.isArray(n.Liste_des_patientes)&&(this.allData=n.Liste_des_patientes.map(e=>({id:e.id,nom:e.user.nom,prenom:e.user.prenom,telephone:e.user.telephone,adresse:e.user.adresse,email:e.user.email,age:this.calculateAge(e.date_de_naissance),lieu_de_naissance:e.lieu_de_naissance,profession:e.profession,type:e.type,badien_gox_id:e.badien_gox_id,date_de_naissance:e.date_de_naissance})),this.totalItems=this.allData.length,this.getPatientsPaginated())}catch(n){console.error("Erreur lors de la récupération des patientes :",n)}},handleTableAction({action:n,row:e}){switch(n){case L:this.$router.push({name:"detailPatiente-sage-femme",params:{id:e.id}});break;case k:this.editPatiente(e);break;case C:this.deletePatiente(e.id);break}},async addPatiente(n){if(console.log(n),!n.nom||!n.prenom||!n.telephone||!n.email||!n.adresse||!n.badien_gox_id){i.fire({icon:"error",title:"Erreur",text:"Tous les champs sont requis."});return}try{await p.createPatiente(n),this.getPatients(),i.fire({title:"Patiente ajoutée avec succès !",icon:"success",showConfirmButton:!1,timer:1500}),this.$router.replace({name:"patiente-sage-femme"})}catch(e){console.error("Erreur lors de l'ajout de la patiente :",e),i.fire({title:"Erreur lors de l'ajout de la patiente !",icon:"error",timer:1e3}),this.$router.replace({name:"patiente-sage-femme"})}},async editPatiente(n){try{const e=await p.updatePatiente(n.id,n);this.getPatients(),i.fire({title:"Patient mis à jour avec succès !",icon:"success",timer:1e3})}catch(e){console.error("Erreur lors de la modification de la patiente :",e),i.fire({title:"Erreur lors de la mise à jour du patient !",icon:"error",timer:1e3})}},async deletePatiente(n){i.fire({title:"Êtes-vous sûr de vouloir supprimer cette patiente ?",icon:"warning",showCancelButton:!0,confirmButtonText:"Oui, supprimer",cancelButtonText:"Annuler"}).then(async e=>{if(e.isConfirmed)try{await p.deletePatiente(n),this.getPatients(),i.fire({title:"Patient supprimé avec succès !",icon:"success",timer:1e3})}catch(r){console.error("Erreur lors de la suppression de la patiente :",r),i.fire({title:"Erreur lors de la suppression du patient !",icon:"error",timer:1e3})}})},async getBadiene(){try{const n=await E.getBadieneGoxes();this.badiene=n.Liste_BadieneGox,this.updateFormFields()}catch(n){console.error("Erreur lors de la récupération des badiene :",n)}},updateFormFields(){const n=this.badiene.map(e=>({value:e.id,text:`${e.user.prenom} ${e.user.nom}`}));this.formFields.find(e=>e.name==="badien_gox_id").options=n},getPatientsPaginated(){if(this.allData.length>0){const n=(this.currentPage-1)*this.itemsPerPage,e=n+this.itemsPerPage;this.paginatedData=this.allData.slice(n,e)}},handlePageChange(n){this.currentPage=n,this.getPatientsPaginated()},calculateAge(n){const e=new Date,r=new Date(n);let c=e.getFullYear()-r.getFullYear();const a=e.getMonth()-r.getMonth();return(a<0||a===0&&e.getDate()<r.getDate())&&c--,c}}},V={key:0},I={class:"modal fade",id:"ajoutPatiente","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"},q={class:"modal-dialog"},N={class:"modal-content"},j={class:"modal-body"},U={class:"form-group"},G={class:"form-group"},S={class:"form-group"},O={class:"form-group"},M={class:"form-group"},Y={class:"form-group"},W={class:"form-group"},H={class:"form-group"},J={class:"form-group"},K={class:"form-group"},Q=["value"],R={class:"modal-footer"},X={key:1,class:"tableau"};function Z(n,e,r,c,a,d){const b=f("Table"),y=f("Pagination"),_=f("Layout");return m(),w(_,null,{default:D(()=>[a.allData.length===0?(m(),u("div",V,[e[25]||(e[25]=t("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#ajoutPatiente"}," Ajouter une Patiente ",-1)),t("div",I,[t("div",q,[t("div",N,[e[24]||(e[24]=t("div",{class:"modal-header"},[t("h1",{class:"modal-title fs-5",id:"staticBackdropLabel"}," Ajouter une Patiente "),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),t("div",j,[t("div",U,[e[11]||(e[11]=t("label",{for:"prenom"},"Prénom de la Patiente",-1)),s(t("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>a.newPatiente.prenom=o),type:"text",class:"form-control",id:"prenom",placeholder:"Donnez le prénom",required:""},null,512),[[l,a.newPatiente.prenom]])]),t("div",G,[e[12]||(e[12]=t("label",{for:"nom"},"Nom de la Patiente",-1)),s(t("input",{"onUpdate:modelValue":e[1]||(e[1]=o=>a.newPatiente.nom=o),type:"text",class:"form-control",id:"nom",placeholder:"Donnez le nom",required:""},null,512),[[l,a.newPatiente.nom]])]),t("div",S,[e[13]||(e[13]=t("label",{for:"telephone"},"Téléphone de la Patiente",-1)),s(t("input",{"onUpdate:modelValue":e[2]||(e[2]=o=>a.newPatiente.telephone=o),type:"tel",class:"form-control",id:"telephone",placeholder:"Donnez le numéro de téléphone",required:""},null,512),[[l,a.newPatiente.telephone]])]),t("div",O,[e[14]||(e[14]=t("label",{for:"adresse"},"Adresse de la Patiente",-1)),s(t("input",{"onUpdate:modelValue":e[3]||(e[3]=o=>a.newPatiente.adresse=o),type:"text",class:"form-control",id:"adresse",placeholder:"Donnez l'adresse",required:""},null,512),[[l,a.newPatiente.adresse]])]),t("div",M,[e[15]||(e[15]=t("label",{for:"email"},"Email de la Patiente",-1)),s(t("input",{"onUpdate:modelValue":e[4]||(e[4]=o=>a.newPatiente.email=o),type:"email",class:"form-control",id:"email",placeholder:"Donnez l'email",required:""},null,512),[[l,a.newPatiente.email]])]),t("div",Y,[e[16]||(e[16]=t("label",{for:"date_de_naissance"},"Date de naissance de la Patiente",-1)),s(t("input",{"onUpdate:modelValue":e[5]||(e[5]=o=>a.newPatiente.date_de_naissance=o),type:"date",class:"form-control",id:"date_de_naissance",placeholder:"Donnez la date de naissance",required:""},null,512),[[l,a.newPatiente.date_de_naissance]])]),t("div",W,[e[17]||(e[17]=t("label",{for:"lieu_de_naissance"},"Lieu de naissance de la Patiente",-1)),s(t("input",{"onUpdate:modelValue":e[6]||(e[6]=o=>a.newPatiente.lieu_de_naissance=o),type:"text",class:"form-control",id:"lieu_de_naissance",placeholder:"Donnez le lieu de naissance",required:""},null,512),[[l,a.newPatiente.lieu_de_naissance]])]),t("div",H,[e[18]||(e[18]=t("label",{for:"profession"},"Profession de la Patiente",-1)),s(t("input",{"onUpdate:modelValue":e[7]||(e[7]=o=>a.newPatiente.profession=o),type:"text",class:"form-control",id:"profession",placeholder:"Donnez la profession",required:""},null,512),[[l,a.newPatiente.profession]])]),t("div",J,[e[20]||(e[20]=t("label",{for:"type"},"Type de la Patiente",-1)),s(t("select",{"onUpdate:modelValue":e[8]||(e[8]=o=>a.newPatiente.type=o),class:"form-control",id:"type",required:""},e[19]||(e[19]=[t("option",{value:"Enceinte"},"Enceinte",-1),t("option",{value:"En planning"},"En planning",-1),t("option",{value:"Allaitente"},"Allaitente",-1)]),512),[[P,a.newPatiente.type]])]),t("div",K,[e[22]||(e[22]=t("label",{for:"badieneGox"},"Badiene Gox",-1)),s(t("select",{"onUpdate:modelValue":e[9]||(e[9]=o=>a.newPatiente.badieneGox=o),class:"form-control",id:"badien_gox_id",required:""},[e[21]||(e[21]=t("option",{value:""},"Sélectionnez une Badiene Gox",-1)),(m(!0),u(A,null,T(a.badiene,o=>(m(),u("option",{key:o.id,value:o.id},z(o.nom),9,Q))),128))],512),[[P,a.newPatiente.badieneGox]])])]),t("div",R,[t("button",{class:"btn btn-primary",onClick:e[10]||(e[10]=o=>d.addPatiente(a.newPatiente))}," Ajouter "),e[23]||(e[23]=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," Fermer ",-1))])])])]),e[26]||(e[26]=t("p",null,"Aucune Patiente trouvée.",-1))])):(m(),u("div",X,[g(b,{columns:a.columns,data:a.paginatedData,title:"Liste des Patientes",formFields:a.formFields,onAction:d.handleTableAction,onAddData:d.addPatiente,onEditData:d.editPatiente},null,8,["columns","data","formFields","onAction","onAddData","onEditData"]),g(y,{currentPage:a.currentPage,totalItems:a.totalItems,itemsPerPage:a.itemsPerPage,onPageChanged:d.handlePageChange},null,8,["currentPage","totalItems","itemsPerPage","onPageChanged"])]))]),_:1})}const le=B(F,[["render",Z]]);export{le as default};