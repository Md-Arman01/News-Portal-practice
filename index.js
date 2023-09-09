
const handleCetagori =async () =>{
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const categories = await response.json()
    const categoriesList = categories.data.news_category

    // list-container 
    const listContainer = document.getElementById('list-container');


    categoriesList.forEach((element) => {
      
        // console.log(element)
        const div = document.createElement('div');
        div.innerHTML = `
        <li onclick="categoriesViews('${element.category_id}'),loadingSpinner(true)"><a>${element.category_name}</a></li>
        `
        listContainer.appendChild(div)

    });



}

// cetagoriesViews
const categoriesViews = async(categoryId) => {
    const response =await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const categoriesId = await response.json()
    const categoriesIdData = categoriesId.data
    console.log(categoriesIdData)

    const viewsContainer = document.getElementById('views-container');
    viewsContainer.innerHTML = ''

    categoriesIdData.forEach((cardDetails) => {
        const div = document.createElement('div')
        div.innerHTML =`
        <div class="card bg-base-100 border border-gray-300">
        <figure><img class="h-56 mt-6 px-4 md:px-0 rounded-xl" src="${cardDetails.image_url}" /></figure>
        <div class="card-body">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold">${cardDetails.author.name? cardDetails.author.name: "No Name" }</h2>
            <button class="btn bg-[#EB5757] hover:bg-[#EB5757] rounded-3xl text-white">${cardDetails.rating.badge}</button>
          </div>
          <p class="text-base font-medium text-[#585858]">${cardDetails.details.slice(0, 80)}</p>
          <p class="text-base font-medium text-[#585858]">total views: ${cardDetails.total_view? cardDetails.total_view : "No Views" }</p>
          <div class="flex justify-between items-center mt-4">
            <div class="img-container flex gap-3">

              <div class="stat-figure text-secondary">
                <div class="avatar online">
                  <div class="w-16 rounded-full">
                    <img src="${cardDetails.author.img}" />
                  </div>
                </div>
              </div>
              <div class="">
                <h1 class="text-base font-medium text-[#585858]">${cardDetails.author.name}</h1>
                <p class="text-base font-medium text-[#585858]">${cardDetails.author.published_date
                }</p>
              </div>
            </div>

            <div>
              <button onclick="showModalBtn('${cardDetails._id}'),my_modal_5.showModal()" class="bg-[#FEF7F7] hover:bg-[#e9e1e1] rounded-full p-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-[#EB5757] w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              </button>
            </div>
            
          </div>
        </div>
      </div>
        `
        viewsContainer.appendChild(div)


    })

    loadingSpinner(false)
    
    

}

const showModalBtn =async (id)=>{
  const response =await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
  const modalData = await response.json();
  const modalDataDetails = modalData.data[0];
  console.log(modalDataDetails)

  const modalTitle = document.getElementById('modal-title');
  modalTitle.innerHTML = `${modalDataDetails.title.slice(0,15)}`

  const modalNumber = document.getElementById('modal-Number');
  modalNumber.innerHTML = `${modalDataDetails.rating.number ? modalDataDetails.rating.number: 'No Number'}`


}


// LODING
const loadingSpinner = (isLoading) => {

  const loading = document.getElementById('loading');
  // isLoading? loading.classList.remove('hidden') : loading.classList.add('hidden')
  if(isLoading){
    loading.classList.remove('hidden')
}else{
  loading.classList.add('hidden')
}
}


handleCetagori()
categoriesViews('01')