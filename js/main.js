let rowa= document.getElementById("Row")

// hide moddel when click a link
let exampleModal=document.getElementById("exampleModal");
// fetch meals at home
let finalResult=[]
async function getMealAtHome(x) {
    // https://www.themealdb.com/api/json/v1/1/filter.php?c
    if(x==" "){
        const loading = document.querySelector(".loading");
        loading.classList.remove("d-none"); 
        let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
        let result= await data.json();
        finalResult=result.meals;
        loading.classList.add("d-none");
        showDataAtHome()
    }
    else{
        
        const loading = document.querySelector(".loading");
        loading.classList.remove("d-none");
        rowa.classList.add("d-none")
        let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`)
        
        let result= await data.json();
        rowa.classList.add("d-none")
        finalResult=result.meals.splice(0,20);
       
        loading.classList.add("d-none");
        
        
        showDataAtHome() 
        rowa.classList.add("d-none")
    }
  
}
getMealAtHome(" ")


// show data at home page

function showDataAtHome(){

   cartona=``;
   finalResult.forEach((el)=>{
      cartona+=`
      
      <div class="col-md-4   cusItem"data-bs-toggle="modal" data-bs-target="#exampleModal" customeId= "${el.idMeal}" >
      <div class="home-meals position-relative rounded-2 overflow-hidden" >
          <img src="${el.strMealThumb}" class="w-100" alt="">
          <h1 class="position-absolute name-of-meal special-font">${el.strMeal}</h1>
      </div>
  </div>

    `
    
   })
   rowa.classList.remove("d-none")
   document.getElementById("RowData").classList.remove("d-none")
   document.getElementById("RowData").innerHTML=cartona;
   
   
   getItems()
   
//    showDetailes()
}
// get id from items to show detailes
function getItems() {
    let item= Array.from( document.querySelectorAll(".cusItem"))
    item.forEach((el)=>{
        el.addEventListener("click",function(){
            let id=this.getAttribute("customeId")
            getDeailes(id)
        })
    })


}


// get detailes 
let finResultDetailes={}

async function getDeailes(id){
    
    const loading = document.querySelector(".loading");
        loading.classList.remove("d-none")
    let data=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let result=await data.json()
    finResultDetailes=result.meals;
    loading.classList.add("d-none");
       
    displayDetailes()
   
       
    
   
}


// show detailes at modal when click on cusItem at home page 
function displayDetailes() { 
    
    // show first data
    document.getElementById("img-detailes").setAttribute("src",finResultDetailes[0].strMealThumb)
    document.getElementById("title").innerHTML=finResultDetailes[0].strMeal
    
    // show second data
    document.getElementById("strInstructions").innerHTML=finResultDetailes[0].strInstructions
    document.getElementById("area").innerHTML=finResultDetailes[0].strArea
    document.getElementById("Category").innerHTML=finResultDetailes[0].strCategory
// bind two ingredients 
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (finResultDetailes[0][`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${finResultDetailes[0][`strMeasure${i}`]} ${finResultDetailes[0][`strIngredient${i}`]}</li>`
        }
    }
    rowa.classList.add("d-none")
    document.getElementById("ingredient").innerHTML= ingredients
// tags
    let tags = finResultDetailes[0].strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    rowa.classList.add("d-none")
   document.getElementById("atgs").innerHTML=tagsStr

//    source about two buttons

document.getElementById("Source").setAttribute("href",finResultDetailes[0].strSource)
document.getElementById("Youtube").setAttribute("href",finResultDetailes[0].strYoutube)
            
if (search.classList.contains("active")==true) {
    rowa.classList.add("d-block")
        rowa.classList.remove("d-none") 
  
   }          
   else{
    console.log("false");
   }

}


// data of Categories

let Categories=document.getElementById("Categories")
Categories.addEventListener("click", (e) =>{
//    hide model
    $('#exampleModal').modal('hide');
    
    document.getElementById("regex").classList.add("d-none")
    let width=$(".nav-content").outerWidth(true)
    $(".container-setting").animate({left:`-${width}px`},1000)
    $("#close-base-icon").hide(10)
   $("#base-icon-control").show(10)
    rowa.classList.add("d-none")

    function showCategoryAtHome(){
       
        cartona=``;
        categoryData.forEach((el)=>{
         
            getDataofCategories()
           cartona+=`
           
           <div class="col-md-3 cusItem getStrCategory" strCategory="${el.strCategory}" >
           <div class="home-meals position-relative rounded-2 overflow-hidden" >
               <img src="${el.strCategoryThumb}" class="w-100" alt="">
               <div class="position-absolute name-of-meal d-flex flex-column">
               <h3 class="pt-2">${el.strCategory}</h3>
               <p class="text-center p-1">${el.strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
               </div>
           </div>
       </div>
     
         `
         
        })
        // rowa.classList.add("d-none")
        document.getElementById("RowData").classList.remove("d-none")
        
        document.getElementById("RowData").innerHTML=cartona;
        // rowa.classList.add("d-none")
        getStrCategory()
       
      
        // rowa.classList.add("d-none")
     }
     
     showCategoryAtHome()
     
    //  rowa.classList.add("d-none")
})


let categoryData=[]
async function getDataofCategories(){
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none")
    rowa.classList.add("d-none")
    let data= await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
   let result= await data.json();
    categoryData=result.categories;
    rowa.classList.add("d-none")
    
    loading.classList.add("d-none")
   console.log( categoryData);


}
getDataofCategories()


// get attr strCategory to get category item

function getStrCategory(){
    let StrCategory=Array.from( document.querySelectorAll(".getStrCategory"))
    StrCategory.forEach((el)=>{

      el.addEventListener("click",function (e) {
        
       let itemDate=this.getAttribute("strCategory")
       
       getMealAtHome(itemDate)
       rowa.classList.add("d-none")
    
       })
    })
    
    
}

// data of area
let Areas=document.getElementById("areas")
Areas.addEventListener("click", (e) =>{
    //    hide model
    $('#exampleModal').modal('hide');
    document.getElementById("regex").classList.add("d-none")
    let width=$(".nav-content").outerWidth(true)
    $(".container-setting").animate({left:`-${width}px`},1000)
    $("#close-base-icon").hide(10)
   $("#base-icon-control").show(10)
    
    function showAreasAtHome(){
        getDataofArea()
        cartona=``;
        areaData.forEach((el)=>{
           cartona+=`
           
           <div class="col-md-4 cusItem getStrArea" strArea="${el.strArea}" >
           <div class="home-meals " >
               <div class="container text-center custome-color">
               <i class="fa-solid fa-house-laptop fa-4x text-center"></i>
               
               <h3 class="pt-1">${el.strArea}</h3>
               </div>
               </div>
           </div>
       </div>
     
         `
         
        })
        rowa.classList.add("d-none")
        document.getElementById("RowData").classList.remove("d-none")
        document.getElementById("RowData").innerHTML=cartona;
        
     
        getStrArea()
        
   
     }
     showAreasAtHome()
    
})

let areaData=[]
async function getDataofArea(){
    const loading = document.querySelector(".loading");
        loading.classList.remove("d-none")
    let data= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
   let result= await data.json();
   areaData=result.meals;
   
        loading.classList.add("d-none")
   


}
getDataofArea()
function getStrArea(){
    let StrArea=Array.from( document.querySelectorAll(".getStrArea"))
    StrArea.forEach((el)=>{

      el.addEventListener("click",function (e) {
       let itemDate=this.getAttribute("strArea")
      getAreaResult(itemDate)

      console.log(itemDate);
       })
    })
    
    
}
let ArData=[]
async function getAreaResult(x) {
    const loading = document.querySelector(".loading");
        loading.classList.remove("d-none")
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${x}`)
    let result= await data.json();
    ArData=result.meals.splice(0,20);

        loading.classList.add("d-none")
    showAreaAtHome()
    console.log( ArData +"ali");
    
}

    function showAreaAtHome(){

        cartona=``;
        ArData.forEach((el)=>{
           cartona+=`
           
           <div class="col-md-4 cusAreaItem getStrCategory" AreaId="${el.idMeal}"  data-bs-toggle="modal" data-bs-target="#exampleModal">
           <div class="home-meals position-relative rounded-2 overflow-hidden" >
               <img src="${el.strMealThumb}" class="w-100" alt="">
               <div class="position-absolute name-of-meal d-flex align-items-center">
               <h3 class="special-font">${el.strMeal}</h3>
               </div>
           </div>
       </div>
     
         `
         
        })
        rowa.classList.add("d-none")
        document.getElementById("RowData").classList.remove("d-none")
        document.getElementById("RowData").innerHTML=cartona;
        
        getAreaItems()
        
   
     }

     function getAreaItems() {
        let item= Array.from( document.querySelectorAll(".cusAreaItem"))
        item.forEach((el)=>{
            el.addEventListener("click",function(){
                let id=this.getAttribute("AreaId")
                getDeailes(id)
            })
        })
    
    
    }
    
     


    // data of Ingredients
let Ingredients=document.getElementById("Ingredients")
Ingredients.addEventListener("click", (e) =>{
    //    hide model
    $('#exampleModal').modal('hide');
    
    document.getElementById("regex").classList.add("d-none")
    let width=$(".nav-content").outerWidth(true)
    $(".container-setting").animate({left:`-${width}px`},1000)
    $("#close-base-icon").hide(10)
   $("#base-icon-control").show(10)
    
    function showIngredientsAtHome(){

        cartona=``;
        IngredientsData.forEach((el)=>{
            getDataofIngredients()
           cartona+=`
           
           <div class="col-md-4 cusItem getStrIngredients" strIngredients="${el.strIngredient}" >
           <div class="home-meals text-center " >
               <div class="container text-center custome-color">
               <i class="fa-solid fa-drumstick-bite fa-4x text-center"></i>
               
               <h3 class="pt-1">${el.strIngredient}</h3>
               <p class="text-center">${el.strDescription.split(" ").slice(0,20).join(" ")}</p>
               </div>
               </div>
           </div>
       </div>
     
         `
         
        })
        rowa.classList.add("d-none")
        document.getElementById("RowData").classList.remove("d-none")
        document.getElementById("RowData").innerHTML=cartona;
        getStrIngredients()
        
   
     }
     
     showIngredientsAtHome()
})

let IngredientsData=[]
async function getDataofIngredients(){
    const loading = document.querySelector(".loading");
        loading.classList.remove("d-none")
    let data= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
   let result= await data.json();
   IngredientsData=result.meals.splice(0,20);  
     loading.classList.add("d-none")
   console.log( IngredientsData );


}

getDataofIngredients()
function getStrIngredients(){
    let StrIng=Array.from( document.querySelectorAll(".getStrIngredients"))
    StrIng.forEach((el)=>{

      el.addEventListener("click",function (e) {
       let itemDate=this.getAttribute("strIngredients")
       getIngredientResult(itemDate)

      console.log(itemDate);
       })
    })
    
    
}
let ingData=[]
async function getIngredientResult(x) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none")
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`)
    let result= await data.json();
    ingData=result.meals.splice(0,20);
    
        loading.classList.add("d-none")
    showIngradientAtHome()
   
    
}

    function showIngradientAtHome(){

        cartona=``;
        ingData.forEach((el)=>{
           cartona+=`
           
           <div class="col-md-4 cusIngItem getStrCategory" IngreId="${el.idMeal}"  data-bs-toggle="modal" data-bs-target="#exampleModal">
           <div class="home-meals position-relative rounded-2 overflow-hidden" >
               <img src="${el.strMealThumb}" class="w-100" alt="">
               <div class="position-absolute name-of-meal d-flex  align-items-center">
               <h3 class=" special-font">${el.strMeal}</h3>
               </div>
           </div>
       </div>
     
         `
         
        })
        rowa.classList.add("d-none")
        document.getElementById("RowData").classList.remove("d-none")
        document.getElementById("RowData").innerHTML=cartona;
        
        
        getIngradientItems()
        
   
     }

     function getIngradientItems() {
        let item= Array.from( document.querySelectorAll(".cusIngItem"))
        item.forEach((el)=>{
            el.addEventListener("click",function(){
                let id=this.getAttribute("IngreId")
                getDeailes(id)
            })
        })
    
    
    }
    
     


 

// contact us
let ali=''
    let contactUs=document.getElementById("contactUs")
    contactUs.addEventListener("click",function(){
        //    hide model
    $('#exampleModal').modal('hide');
        let width=$(".nav-content").outerWidth(true)
        $(".container-setting").animate({left:`-${width}px`},1000)
        $("#close-base-icon").hide(10)
       $("#base-icon-control").show(10)
       
        rowa.classList.add("d-none")
        document.getElementById("RowData").classList.add("d-none")
        document.getElementById("regex").classList.remove("d-none")
        
        ali=document.getElementById("nameInput") 
        
        
    })

    console.log(ali);

    // search
  
    let search=document.getElementById("search")
    search.addEventListener("click",function(){
        //    hide model
    $('#exampleModal').modal('hide');
        document.getElementById("regex").classList.add("d-none")
        let width=$(".nav-content").outerWidth(true)
    $(".container-setting").animate({left:`-${width}px`},1000)
    $("#close-base-icon").hide(10)
   $("#base-icon-control").show(10)
let cartona=`
<div class="container special-width">
                        <div class="row ">
                            <div class="col-md-6 search-media">
                                <input id="searchName" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
                              </div>
                             
                              <div class="col-md-6 search-media">
                                <input  maxlength="1" id="searchF" onkeyup="searchByFirstLet(this.value)"  class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
                              </div>
                                
                        </div>
    
                    </div>
`
rowa.classList.remove("d-none")
rowa.innerHTML=cartona;


document.getElementById("RowData").classList.add("d-none")


    })
    
   async function searchByName(name) {
    const loading = document.querySelector(".loading");
        loading.classList.remove("d-none")
            let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
            let result= await data.json();
            finalResult=result.meals;
            
        loading.classList.add("d-none")
        // rowa.classList.add("d-block")
                showDataAtHome() 
                
            
            console.log( finalResult);
       
        
    }
    async function searchByFirstLet(name) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("d-none")
        name == "" ? name = "a" : "";
        let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
        let result= await data.json();
        finalResult=result.meals;
       
        loading.classList.add("d-none")
        // rowa.classList.add("d-block")
            showDataAtHome() 
           
        
        console.log( finalResult);
   
    
}
// // fun validate 
let submitBtn= document.getElementById("submitBtn")
console.log(submitBtn);
// validate name
let nameInput=document.getElementById("nameInput")
console.log(nameInput);

nameInput.addEventListener("blur",validateName)

function validateName() {
    
    let reg=/^[A-Z][a-z]{2,7}( )?([A-za-z]{3,7})?$/
    if (reg.test(nameInput.value)==true) {
        document.getElementById("nameAlert").classList.replace("d-block","d-none")
       return true
    }
    else{
        document.getElementById("nameAlert").classList.replace("d-none","d-block")
        return false
    }
    
}

// validate email
let emailInput=document.getElementById("emailInput")
console.log(emailInput);

emailInput.addEventListener("blur",validateEmail)

function validateEmail() {
    
    let reg=/^[a-z]{3,10}@[a-z]{2,10}\.[a-z]{2,4}$/
    if (reg.test(emailInput.value)==true) {
        document.getElementById("emailAlert").classList.replace("d-block","d-none")
       return true
    }
    else{
        document.getElementById("emailAlert").classList.replace("d-none","d-block")
        return false
    }
   
}

// validate email
let phoneInput=document.getElementById("phoneInput")
console.log(emailInput);

phoneInput.addEventListener("blur",validatePhone)

function validatePhone() {
    
    let reg=/^(010|011|012|015)[0-9]{8}$/
    if (reg.test(phoneInput.value)==true) {
        document.getElementById("phoneAlert").classList.replace("d-block","d-none")
       return true
    }
    else{
        document.getElementById("phoneAlert").classList.replace("d-none","d-block")
        return false
    }
   
}

// validate age
let ageInput=document.getElementById("ageInput")
console.log(emailInput);

ageInput.addEventListener("blur",validateAge)

function validateAge() {
    
    let reg=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    if (reg.test(ageInput.value)==true) {
        document.getElementById("ageAlert").classList.replace("d-block","d-none")
       return true
    }
    else{
        document.getElementById("ageAlert").classList.replace("d-none","d-block")
        return false
    }
   
}

// validate pass
let passwordInput=document.getElementById("passwordInput")
console.log(emailInput);

passwordInput.addEventListener("blur",validatePass)

function validatePass() {
    
    let reg=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    if (reg.test(passwordInput.value)==true) {
        document.getElementById("passwordAlert").classList.replace("d-block","d-none")
       return true
    }
    else{
        document.getElementById("passwordAlert").classList.replace("d-none","d-block")
        return false
    }
   
}


// validate re pass
let repasswordInput=document.getElementById("repasswordInput")
console.log(emailInput);

repasswordInput.addEventListener("blur",validateRePass)

function validateRePass() {
    
    let reg=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    if (reg.test(repasswordInput.value)==true &&(document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value)==true) {
        document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
       return true
    }
    else{
        document.getElementById("repasswordAlert").classList.replace("d-none","d-block")
        return false
    }
   
}
 

function val() {
    if (validateRePass() ==true&&validatePass()==true &&validateAge()==true&&validatePhone()==true&&validateEmail()==true&&validateName()==true) {
        document.getElementById("submitBtn").removeAttribute("disabled")
        } else {
        document.getElementById("submitBtn").setAttribute("disabled", true)
        
        }
}

repasswordInput.addEventListener("keyup",val)




// Query
// // opan and close side nav
$("#base-icon-control ,#close-base-icon").click(function(){
  
   let left= $(".container-setting").css("left")
   if(left=="0px"){
    
    let width=$(".nav-content").outerWidth(true)
    $(".container-setting").animate({left:`-${width}px`},1000)
    // animation about links at side navbar start from bottom to top
    for (let i = 0; i < 5; i++) {
        $(".nav-item ul li a").eq(i).animate({
            top: 300
        }, (i + 5) * 150)
    }
    //  display close-base-icon
   $("#close-base-icon").hide(10)
   $("#base-icon-control").show(10)
//    
let a=document.getElementById("exampleModal");
console.log(a);
// .setAttribute("data-bs-toggle","none")
   }
   else{
     $(".container-setting").animate({left:`0px`},1000)
     // animation about links at side navbar start from bottom to top
     for (let i = 0; i < 5; i++) {
        $(".nav-item ul li a").eq(i).animate({
            top: 0
        }, (i + 5) * 150)
    }

   //  display close-base-icon
   $("#close-base-icon").show(10)
   $("#base-icon-control").hide(10)
   
 
   }
   
    
    
})
let width=$(".nav-content").outerWidth(true)
$(".container-setting").css({left:`-${width}px`})




// links
$(".nav-link").click(function(){

    $(this).addClass("active")
    $(this).parent().siblings().children().removeClass("active")
})


