const modal = document.querySelector(".modalOverlay");
const cards = document.querySelectorAll(".card");

for (let card of cards) {
    card.addEventListener("click", function() {
        modal.querySelector("img").src = card.querySelector("img").src;
        modal.querySelector(".name").innerHTML = card.querySelector(".recipeName").innerHTML;
        modal.querySelector(".author").innerHTML = card.querySelector(".recipeAuthor").innerHTML;
        modal.classList.add("active");
    })
}

document.querySelector(".closeModal").addEventListener("click", function() {
    modal.classList.remove("active")
})