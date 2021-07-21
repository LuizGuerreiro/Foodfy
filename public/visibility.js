const span = document.querySelectorAll("span");
const mode = document.querySelectorAll(".mode");

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