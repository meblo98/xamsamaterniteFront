import{c}from"./_plugin-vue_export-helper-Cm6_9V8g.js";const a={async getAccouchements(){try{return(await c.get("/accouchements")).data}catch(e){throw console.error("Erreur lors de la récupération des accouchements :",e),e}},async getAccouchement(e){try{return(await c.get(`/accouchements/${e}`)).data}catch(r){throw console.error(`Erreur lors de la récupération de l'accouchement avec l'id ${e} :`,r),r}},async createAccouchement(e){try{return(await c.post("/accouchements",e)).data}catch(r){throw console.error("Erreur lors de la création de l'accouchement :",r),r}},async updateAccouchement(e,r){try{return(await c.put(`/accouchements/${e}`,r)).data}catch(o){throw console.error(`Erreur lors de la mise à jour de l'accouchement avec l'id ${e} :`,o),o}},async deleteAccouchement(e){try{return(await c.delete(`/accouchements/${e}`)).data}catch(r){throw console.error(`Erreur lors de la suppression de l'accouchement avec l'id ${e} :`,r),r}},async getAccouchementsByPatiente(e){try{return(await c.get(`/accouchements/patiente/${e}`)).data}catch(r){throw console.error(`Erreur lors de la récupération des accouchements pour la patiente avec l'id ${e} :`,r),r}}};export{a};
