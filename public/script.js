const cards = document.querySelectorAll(".card");
const span = document.querySelectorAll("span");
const mode = document.querySelectorAll(".mode");

for (let card of cards) {
    card.addEventListener("click", function() {
        const index = card.getAttribute('id');
        window.location.href = `/recipes/${index}`;
    });
};

function visibility(index) {
    span[index].addEventListener("click", function() {
        if (mode[index].classList.contains("hide")) {
            mode[index].classList.remove("hide");
            span[index].innerHTML = "ESCONDER";
        } else {
            mode[index].classList.add("hide");
            span[index].innerHTML = "MOSTRAR";
        }
    });
};

for (i = 0; i <= 2; i++) {
    visibility(i)
};