import{_ as l}from"./_plugin-vue_export-helper-Cm6_9V8g.js";import{o as r,c as i,a as e,F as c,r as g,n as d,t as u}from"./index-C-f7vtLL.js";const m={name:"Pagination",props:{currentPage:{type:Number,default:1},totalItems:{type:Number,required:!0},itemsPerPage:{type:Number,default:10}},computed:{totalPages(){return Math.ceil(this.totalItems/this.itemsPerPage)}},methods:{goToPage(n){n>=1&&n<=this.totalPages&&this.$emit("page-changed",n)}}},P={class:"pagination"},f=["disabled"],b=["onClick"],h=["disabled"];function v(n,t,o,w,_,s){return r(),i("div",P,[e("button",{disabled:o.currentPage===1,onClick:t[0]||(t[0]=a=>s.goToPage(o.currentPage-1)),class:"pagination-btn",style:{"background-color":"#6932f9",color:"white"}},t[2]||(t[2]=[e("svg",{height:"16",width:"16",xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 1024 1024"},[e("path",{d:"M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z",fill:"#fff"})],-1),e("span",{class:"mx-3"},"Précédent",-1)]),8,f),(r(!0),i(c,null,g(s.totalPages,a=>(r(),i("button",{key:a,onClick:k=>s.goToPage(a),class:d([{active:o.currentPage===a},"pagination-btn"]),style:{"background-color":"#6932f9",color:"white"}},u(a),11,b))),128)),e("button",{disabled:o.currentPage===s.totalPages,onClick:t[1]||(t[1]=a=>s.goToPage(o.currentPage+1)),class:"pagination-btn",style:{"background-color":"#6932f9",color:"white"}},t[3]||(t[3]=[e("span",{class:"mx-3"},"Suivant",-1),e("svg",{height:"16",width:"16",xmlns:"http://www.w3.org/2000/svg",version:"1.1",viewBox:"0 0 1024 1024"},[e("path",{d:"M149.328125 495.52477c0 11.2973 9.168824 20.466124 20.466124 20.466124l604.773963 0-188.083679 188.083679c-7.992021 7.992021-7.992021 20.947078 0 28.939099 4.001127 3.990894 9.240455 5.996574 14.46955 5.996574 5.239328 0 10.478655-1.995447 14.479783-5.996574l223.00912-223.00912c3.837398-3.837398 5.996574-9.046027 5.996574-14.46955 0-5.433756-2.159176-10.632151-5.996574-14.46955l-223.019353-223.029586c-7.992021-7.992021-20.957311-7.992021-28.949332 0-7.992021 8.002254-7.992021 20.957311 0 28.949332l188.073446 188.073446-604.753497 0C139.859375 475.058646 149.328125 484.217237 149.328125 495.52477z",fill:"#fff"})],-1)]),8,h)])}const y=l(m,[["render",v],["__scopeId","data-v-bd373c07"]]);export{y as P};
