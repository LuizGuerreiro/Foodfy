const formDelete = document.querySelector("#formDelete")
let totalRecipes = document.getElementsByName("recipes")
if (totalRecipes.length){
   totalRecipes = totalRecipes[0].value
}

formDelete.addEventListener("submit", function(event) {
   if (totalRecipes > 0) {
      confirm("Este chef possui receitas cadastradas, portanto não pode ser excluído!")
      event.preventDefault()
   } else {
      const confirmation = confirm("Tem certeza que quer deletar?")
      if(!confirmation) {
         event.preventDefault()
      }
   }
})