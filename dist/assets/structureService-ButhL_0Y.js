import{c as e}from"./_plugin-vue_export-helper-rQ_DBal5.js";const c={async getStructuresSante(){try{return(await e.get("/structure")).data}catch{return[]}},async addStructuresSante(t){try{return(await e.post("/structure",t)).data}catch{}},async getStructure(t){try{return(await e.get(`/structure/${t}`)).data}catch{}},async updateStructuresSante(t,r){try{return(await e.put(`/structure/${t}`,r)).data}catch{}},async deleteStructuresSante(t){try{return(await e.delete(`/structure/${t}`)).data}catch{}}};export{c as s};
