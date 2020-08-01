class ExpandingList extends HTMLUListElement {
    constructor() {
        self = super(); // 自分自身に親エレメントをいれちゃう。今回で言えばulかな。

        console.log(self.querySelectorAll("ul"))
        Array.from(self.querySelectorAll("ul")).forEach(ul => {
            ul.style.display = "none"
        })

        Array.from(self.querySelectorAll("li")).forEach(li => {
            if (li.querySelectorAll("ul").length > 0) {
                li.setAttribute("class", "closed");

                const childText = li.childNodes[0];
                const newSpan = document.createElement("span");
                newSpan.textContent = childText.textContent;
                newSpan.style.cursor = "pointer";

                newSpan.onclick = self.showul;

                childText.parentNode.insertBefore(newSpan, childText);
                childText.parentNode.removeChild(childText);
            }
        });
    }

    showul = function (e) {
        const nul = e.target.nextElementSibling;

        if (nul.style.display === "block") {
            nul.style.display = "none";
            nul.parentElement.setAttribute("class", "closed");
        } else {
            nul.style.display = "block";
            nul.parentElement.setAttribute("class", "open");
        }
    };
}

customElements.define("expanding-list", ExpandingList, {extends: "ul"})
