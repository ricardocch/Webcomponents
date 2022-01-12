
document.getElementById("btnMostrar").addEventListener('click',function(){
   let template = document.getElementById('Mostar').content

   template =document.importNode(template,true)

   let target = document.getElementById("divMostrar")
   target.innerHTML = ""
   target.appendChild(template)
})