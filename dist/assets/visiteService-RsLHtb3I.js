import{c as s}from"./_plugin-vue_export-helper-Cm6_9V8g.js";const a={async getVisites(){try{return(await s.get("/visites")).data}catch(e){throw console.error("Erreur lors de la récupération des visites :",e),e}},async getVisite(e){try{return(await s.get(`/visites/${e}`)).data}catch(r){throw console.error(`Erreur lors de la récupération de la visite avec l'id ${e} :`,r),r}},async createVisite(e){try{return(await s.post("/visites",e)).data}catch(r){throw console.error("Erreur lors de la création de la visite :",r),r}},async updateVisite(e,r){try{return(await s.put(`/visites/${e}`,r)).data}catch(t){throw console.error(`Erreur lors de la mise à jour de la visite avec l'id ${e} :`,t),t}},async deleteVisite(e){try{return(await s.delete(`/visites/${e}`)).data}catch(r){throw console.error(`Erreur lors de la suppression de la visite avec l'id ${e} :`,r),r}}};export{a as v};
