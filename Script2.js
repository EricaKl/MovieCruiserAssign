
function DisplayCardsForMovie(JSONresult)
{
  
    // var display="";
    for(var i =0;i<JSONresult.length;i++)
    {
        document.getElementById("Moviecard").innerHTML +=
         `
         <div class="card" style="width:300px;border:2px solid pink;box-shadow: 4px 5px #b9936c;margin-top:10px; margin-left:10px;">
         <img class="card-img-top" src="${JSONresult[i].posterPath}" style="width:300px;">
         <div class="card-body">
         <h4 class="card-title" style="margin-left:10px;"><b>${JSONresult[i].title}<b></h4>
         <p class="card-text" style="margin-left:10px;">${JSONresult[i].releaseDate}</p>
         <button type="button" onclick="AddFavorites(id)" id="${JSONresult[i].id}"
          class="btn btn-info" style="margin-bottom:10px; margin-left:10px;color:black;">Add Favourites</a>
         </div>
         </div> 
         </div>  
        <br></br>`

    }
    // document.getElementById("Moviecard").innerHTML = display;
}
function DisplayCradsForFavourites(JSONresult)
{
    debugger;
    // var display="";
    for(var i =0;i<JSONresult.length;i++)
    {
        document.getElementById("FavouritesCard").innerHTML +=
        `
        <div class="card" style="width:300px;border:2px solid pink;box-shadow: 4px 5px #b9936c;margin-top:10px; margin-left:10px;">
        <img class="card-img-top" src="${JSONresult[i].posterPath}" style="width:300px;">
        <div class="card-body">
        <h4 class="card-title" style="margin-left:10px;"><b>${JSONresult[i].title}<b></h4>
        <p class="card-text" style="margin-left:10px;">${JSONresult[i].releaseDate}</p>
        <button type="button" onclick="DeleteFavourites(id)" id="${JSONresult[i].id}"
         class="btn btn-info" style="margin-bottom:10px; margin-left:10px;color:black;">Delete Favourites</a>
        </div>
        </div>   
       <br></br>`

    }
    // var heading = "<h2 class='m-3' style ='justify:left;'>All movies</h2>"
    // document.getElementById("FavouritesCard").innerHTML = display ;
}

async function FetchMovie()
{
   
    const responsemovie = await fetch("http://localhost:3000/movies");
    const JSONresult = await responsemovie.json();
   // arr = JSON.parse(JSONresult);
    DisplayCardsForMovie(JSONresult);
}

async function FetchFavourites()
{
    debugger;
    const responsefavourites = await fetch("http://localhost:3000/favourites");  
    const JSONresult = await responsefavourites.json();
    DisplayCradsForFavourites(JSONresult);
}

async function AddFavorites(id)
{
    debugger;
    
    const responsemovie = await fetch("http://localhost:3000/movies/"+id);
    const JSONresultmovie = await responsemovie.json();
   // let data = JSON.parse(JSONresult)
    //    const responsefavourites = await fetch("http://localhost:3000/favourites");  
    //    const JSONresultfavorites = await responsefavourites.json();

    //    var item = JSONresultmovie.find(item => item.id == id);
    //     if(JSONresultfavorites.find(temp => temp.id == item.id)!=null){
    //         alert("Movie already exists in favourites");
    //     }
   
        let response = await fetch("http://localhost:3000/favourites", {
            method: "POST",
            body: JSON.stringify({
                id: JSONresultmovie.id,
                title: JSONresultmovie.title,
                releaseDate: JSONresultmovie.releaseDate,
                posterPath: JSONresultmovie.posterPath,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    
    
    FetchFavourites();
}

async function DeleteFavourites(id)
{
    const responsefavourites = await fetch("http://localhost:3000/favourites/"+id,{
        method:"DELETE",
    });

    FetchFavourites();
}

FetchMovie();
FetchFavourites();

