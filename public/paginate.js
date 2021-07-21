const actualPage = location.search
const menuPages = document.querySelectorAll('section .pagination a')

for (item of menuPages) {
   if(actualPage.includes(item.getAttribute('href'))) {
      item.classList.add('active')
   }
}

function paginate(selectedPage, totalPages) {
   let pages = [],
       oldPage

   for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const firstAndLastPage = currentPage==1 || currentPage==2 || currentPage==(totalPages-1) || currentPage==totalPages
      const pagesAfterSelectedPage = currentPage <= selectedPage + 1
      const pagesBeforeSelectedPage = currentPage >= selectedPage - 1

      if(firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
         if(oldPage && currentPage - oldPage > 2) {
            pages.push("...")
         }
         if(oldPage && currentPage - oldPage == 2) {
            pages.push(oldPage + 1)
         }
         pages.push(currentPage)
         oldPage = currentPage
      }
   }

   return pages
}

function createPagination(pagination) {
   const page = +pagination.dataset.page
   const total = +pagination.dataset.total
   const filter = pagination.dataset.filter
   const pages = paginate(page, total)
   let elements = ""
   
   for(let page of pages) {
      if(String(page).includes("...")) {
         elements += `<span> ${page} </span>`
      } else {
         if(filter) {
            elements += `<a class="" href="?filter=${filter}&page=${page}"> ${page} </a>`
         } else {
            elements += `<a class="" href="?page=${page}"> ${page} </a>`
         }
      }
   }
   
   pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if(pagination) createPagination(pagination)