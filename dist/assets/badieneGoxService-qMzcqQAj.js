import{c as r}from"./_plugin-vue_export-helper-rQ_DBal5.js";const o={async getBadieneGoxes(){try{return(await r.get("/badiene-gox")).data}catch{}},async getBadieneGox(e){try{return(await r.get(`/badiene-gox/${e}`)).data}catch{}},async createBadieneGox(e){try{return(await r.post("/badiene-gox",e)).data}catch{}},async updateBadieneGox(e,a){try{return(await r.put(`/badiene-gox/${e}`,a)).data}catch{}},async deleteBadieneGox(e){try{return(await r.delete(`/badiene-gox/${e}`)).data}catch{}}};export{o as b};