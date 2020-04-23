//infinite scrollbar
var downloadSelected = [];
var url;
    function generateRandom(){
        return Math.floor((Math.random() * 5000) + 1000);    
    }
    var urlToGetData;
    $(document).ready(function() {
	   urlToGetData = '/feeds?ajaxcall=true'
        getDataFromAjaxCall(urlToGetData), generateRandom();	
    })

    function getDataFromAjaxCall(urlToGetData){
        $.ajax({
            type: 'GET',
            url: urlToGetData,
            success: function (result) {
                console.log(result)
                localStorage.setItem("data", JSON.stringify(result))
                if (localStorage.getItem("data")) {
                    template(result)
                }
            },
            beforeSend: function () {
                $("#progress").show();
            },
            complete: function () {
                $("#progress").hide();
                if($(document).height() <= $(window).height()){
                    urlToGetData = '/feeds?ajaxcall=true&isLoadattemptFirst=true'
                    getDataFromAjaxCall(urlToGetData)
                }
            },
            error: function () {
                alert("Error while retrieving data!");
            }
        });
    }

function categorySelect(items){
    out = `<div class="dropdown">` +
        `<button type="button" class="btn btn-outline-primary dropdown-toggle form-group" data-toggle="dropdown">` +
        `none` +
        `</button>` +
        `<div class="dropdown-menu">`
    for (var i = 0; i < items.length; i++) {
        out = out +
        `<a class="dropdown-item" href="#" id="${items[i]}">${items[i]}</a>`
    }
    return out + `</div></div>`;
}

function userSelect(items){
    out =`<div class="dropdown">` +
        `<button type="button" class="btn btn-outline-primary dropdown-toggle form-group" data-toggle="dropdown">` +
        `none` +
        `</button>` +
        `<div class="dropdown-menu">`
        for (var i = 0; i < items.length; i++) {
            out = out +
            `<a class="dropdown-item" href="#" id="${items[i]}">${items[i].name}</a>`
        }
        return out + `</div></div>`;
}


function envSelect(items){
    out =`<div class="dropdown">` +
    `<button type="button" class="btn btn-outline-primary dropdown-toggle form-group" data-toggle="dropdown">` +
    `none` +
    `</button>` +
    `<div class="dropdown-menu">`
    for (var i = 0; i < items.length; i++) {
        out = out +
        `<a class="dropdown-item" href="#" width=100% id="${items[i]}">${items[i].name}</a>`
    }
    return out + `</div></div>`
    
}

function uploadTypeSelect(items){
    out =`<div class="dropdown">` +
    `<button type="button" class="btn btn-outline-primary dropdown-toggle form-group" data-toggle="dropdown">` +
    `none` +
    `</button>` +
    `<div class="dropdown-menu">`
    for (var i = 0; i < items.length; i++) {
        out = out +
        `<a class="dropdown-item" href="#" id="${items[i]}">${items[i].name}</a>`
    }
    return out + `</div></div>`
}

function template(result){
    var data = result.data;
    $(".total_video").text(` | ${data.length}`)
    $("#sectionEnvSelect").append(
        envSelect(result.enviromentType)
    ); 
    $("#sectiontypeSelect").append(
        uploadTypeSelect(result.uploadType)   
    );
    var category = result.categoryList;
    var users = result.users;
    if (data.length !== 0) {
        for (var i = 0; i < data.length; i++){
            $element1 = "<div class='card'>"+   
                    "<div class='card-block'>"
                    if (data[i].thumbnail.path!=null && data[i].thumbnail.path!="") {
                        $element1 = $element1 +
                        "<div class='row videoDescription'>"+
                        "   <div class='col-md-4'>"+
                        "       <div class='row'>"+
                        "           <div class='col-md-12' style='background-color:black'>"+
                        `               <video data-source="${data[i].video.path}/${data[i].video.name}" style="margin:0; " width=300px height=200px controls>`+
                        "                   <source src="+ data[i].video.path+ "/" + data[i].video.name +" type='video/mp4'>"+
                        '                </video>'+
                        "            </div>"+
                        "       </div>"+
                        "   </div>"+
                        "   <div class='col-md-8'>"+
                        "       <form>"+
                        "           <div class='row'>"+
                        "               <div class='offset-md-1 col-md-7 form-group'>"+
                        "                   <div class='row'>"+
                        "                       <div class='col-md-12 form-group'>"+
                        `                           <label for="name" class="control-label">`+
                        `                               <p><a class="text-info pr-md-5">title: </a></p>`+
                        `                           </label>`+
                        `                           <input type="text" class="video-title-text" data-name="${data[i].video.name}" value="${data[i].metaData.title}"/>`+
                        "                       </div>"+
                        "                       <div class='col-md-12 form-group'>"+
                        `                           <label for="name" class="control-label">`+
                        `                               <p class="video-author">`+
                        `                                   <a class="text-info pr-md-4">author: </a><a class="text author-id-text"></a>`+
                        `                               </p>`+
                        `                           </label>`+
                        `                           <input type="text" id="${data[i].author.id}" class="form-group" value="${data[i].author.name}"/>`+
                        "                       </div>"+
                        "                       <div class='col-md-12 form-group'>"+
                        `                           <label for="name" class="control-label">`+
                        `                               <p>`+
                        `                                   <a class="text-info pr-md-4">tags: </a>`+
                        `                               </p>`+
                        `                           </label>`+
                        `                           <input type="text" class="form-group tags"/>`+
                        "                       </div>"+
                        "                       <div class='col-md-12'>"+
                        "                           <div class='row'>"+
                        "                               <div class='col-md-4'>"+
                        `                                   <label for="name" class="control-label">`+
                        `                                        <p class="video-category"><a class="text-info">category: </a></p>`+
                        `                                   </label>`+
                        "                               </div>"+
                        "                               <div class='col-md-8'>"+
                                                            categorySelect(category) +
                        "                               </div>"+
                        "                           </div>"+
                        "                       </div>"+
                        "                       <div class='col-md-12'>"+
                        "                           <div class='row'>"+
                        "                               <div class='col-md-4'>"+
                        `                                   <label for="name" class="control-label">`+
                        `                                       <p class="video-category"><a class="text-info">user: </a></p>`+
                        `                                   </label>`+
                        "                               </div>"+
                        "                               <div class='col-md-8 form-group'>"+
                                                            userSelect(users) +
                        "                               </div>"+
                        "                           </div>"+
                        "                       </div>"+
                        "                       <div class='col-md-12'>"+
                        `                           <label for="path" class="control-label">`+
                        `                               <p><a class="text-info pr-md-5">file: </a></p>`+
                        `                           </label>`+
                        `                           <a class="myFile form-group text-muted">${data[i].video.path}/${data[i].video.name}</a>` +
                        "                       </div>"+
                        "                       <div class='col-md-12 detail_col'>"+
                        `                           <input type="text" class="details form-group" name="details"/>` +
                        "                       </div>"+
                        "                   </div>"+
                        "               </div>"+
                        "               <div class='offset-md-1 col-md-2'>"+
                        "                   <div class='row'>"+
                        "                       <div class='col-md-12'>"+
                        `                           <button type="button" class='btn btn-success accept' data-status="accept"><i class="fa fa-check fa-2x" aria-hidden="true"> </i><span style="font-size: 30px;margin-bottom:10px;"> | Accept</span> </button>`+
                        "                       </div>"+
                        "                       <div class='col-md-12 mt-md-2'>"+
                        `                           <button type="button" class='btn btn-danger reject  pr-md-4' data-status="reject"><i class="fa fa-ban fa-2x" aria-hidden="true"> </i><span style="font-size: 30px;margin-bottom:10px;"> |  Reject </span></button>`+
                        "                       </div>"+
                        "                       <div class='col-md-4 mt-md-2'>"+
                        `                           <button type="button" class='btn btn-info save pr-md-5' data-status="save"><i class="fa fa-floppy-o fa-2x" aria-hidden="true"> </i><span style="font-size: 30px;margin-bottom:10px;"> |  Save </span> </button>`+
                        "                       </div>"+
                        "                       <div class='col-md-4 mt-md-2'><a class='uploadStatus'></a></div>"+
                        "                   </div>"+
                        "               </div>"+
                        "           </div>"+
                        "       </form>"+
                        "   </div>"
                        "</div>"
                        
                    }    
                    $element1 = $element1 + "<h5 style='margin:5px 0px 5px 10px;'></div></div></div>"
                        $("#sectionA").append(
                            $element1
                        );
                    }
                }
                 $(".detail_col").hide();
                 $(".uploadStatus").parent().hide();
}

function ajaxCallToSaveData(URL, data, method, element){
    if(method === "POST"){
        element.find(".accept").text("wait")   
        element.find(".accept").removeClass("btn btn-success")
        element.find(".accept").addClass("btn btn-warning")
    }
    var arrayLength = 0;
    $.ajax({
        type: method,
        url: URL,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(result){
            $(window).scroll(function () {
                urlToGetData = '/feeds?ajaxcall=true'
                if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                    getDataFromAjaxCall(urlToGetData);
                }
            })
            if(result.message === "success"){
                element.addClass("bg-faded")
                element.find(".accept").remove();
                element.find(".reject").remove();
                element.find(".save").remove();
                element.find(".uploadStatus").parent().show();
                element.find(".uploadStatus").text(result.data.uploadStatus);
                element.find(".uploadStatus").addClass("text-danger display-4");
                if($(".accept").length === 0){
                    urlToGetData = '/feeds?ajaxcall=true'
                    getDataFromAjaxCall(urlToGetData);
                }
            }
        },
        error: function(){
            console.log("error")           
            location.reload();
        }
    })
}


function ajaxCallToBulkUploadData(URL, method, data){
    $.ajax({
        type: method,
        url: URL,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(result){
            if(result === "success"){
                location.reload();
            }
        },
        error: function(){
            alert("error")           
            location.reload();
        }
    })   
}

$("#sectionA").on("click", '.accept' ,function(){
    url = "/uploads";
    method="POST" 
    if($(this).closest(".card").find(".video-title-text").val()
        && $.trim($(this).closest(".card").find(".video-title-text").val()) !== "" 
        && $.trim($(this).closest(".card").find(".dropdown-toggle").eq(1).text())!=="none"
        && $.trim($(this).closest(".card").find(".dropdown-toggle").eq(0).text())!=="none"
        && $.trim($(this).closest(".card").find(".video-title-text").attr("data-name"))
        && $.trim($(this).closest(".card").find(".video-title-text").attr("data-name")!=="")){
        var acceptedData = {
            details:{
                    title: $(this).closest(".card").find(".video-title-text").val(),
                    tags: $(this).closest(".card").find(".tags").val(),
                    videoShade: "",
                    trackInfo: "",
                    uploadStatus: "accept",
                    author: $.trim($(this).closest(".card").find(".dropdown-toggle").eq(1).text()),
                    category: $.trim($(this).closest(".card").find(".dropdown-toggle").eq(0).text()),
                    video: $(this).closest(".card").find(".video-title-text").attr("data-name")
                },
                path: $.trim($(this).closest(".card").find("video").attr("data-source"))
            }
            ajaxCallToSaveData(url, acceptedData, method, $(this).closest(".card"));
        }else{
            alert("select fields")
        }
})


$("#sectionA").on("click", '.reject' ,function(){
    url = "/uploads";
    method='PUT'
    console.log($(this).closest(".card").find(".dropdown-toggle").eq(1).text());
    if($(this).closest(".card").find(".video-title-text").val()
    && $.trim($(this).closest(".card").find(".video-title-text").val()) !== "" 
    && $.trim($(this).closest(".card").find(".dropdown-toggle").eq(1).text())!=="none"
    && $.trim($(this).closest(".card").find(".dropdown-toggle").eq(0).text())!=="none"
    && $.trim($(this).closest(".card").find(".video-title-text").attr("data-name"))
    && $.trim($(this).closest(".card").find(".video-title-text").attr("data-name")!=="")){
            var rejectedData = {
                details:{
                    title: $(this).closest(".card").find(".video-title-text").val(),
                    tags: "",
                    videoShade: "",
                    trackInfo: "",
                    uploadStatus: "reject",
                    author: $.trim($(this).closest(".card").find(".dropdown-toggle").eq(1).text()),
                    category: $.trim($(this).closest(".card").find(".dropdown-toggle").eq(0).text()),
                    video: $(this).closest(".card").find(".video-title-text").attr("data-name")
                },
                path:""
            }
            ajaxCallToSaveData(url, rejectedData, method, $(this).closest(".card"));
        }else{
            alert("select fields")
        }      
})

$("#sectionA").on("click", '.save' ,function(){
    url = "/save";
    method='PUT' 
    if($(this).closest(".card").find(".video-title-text").val()
        && $.trim($(this).closest(".card").find(".video-title-text").val()) !== "" 
        && $.trim($(this).closest(".card").find(".dropdown-toggle").eq(1).text())!=="none"
        && $.trim($(this).closest(".card").find(".dropdown-toggle").eq(0).text())!=="none"
        && $.trim($(this).closest(".card").find(".video-title-text").attr("data-name"))
        && $.trim($(this).closest(".card").find(".video-title-text").attr("data-name")!=="")){
        var savedData = {
            details:{
                title: $(this).closest(".card").find(".video-title-text").val(),
                tags: $(this).closest(".card").find(".tags").val(),
                videoShade: "",
                trackInfo: "",
                uploadStatus: "save",
                author: $.trim($(this).closest(".card").find(".dropdown-toggle").eq(1).text()),
                category: $.trim($(this).closest(".card").find(".dropdown-toggle").eq(0).text()),
                video: $(this).closest(".card").find(".video-title-text").attr("data-name")
            },
            path: $.trim($(this).closest(".card").find("video").attr("data-source")),
        }
        ajaxCallToSaveData(url, savedData, method, $(this).closest(".card"));
    }else{
        alert("select fields")
    }
})

$("#uploadConfigData").on("click", function(){
    url = "/uploads?is-bulk-upload=true";
    method='POST'
    var data={
        envType: $(".modalData").find(".dropdown-toggle").eq(1).text(),
        uploadType: $(".modalData").find(".dropdown-toggle").eq(0).text(),
        totalCount: $(".modalData").find(".count").val()   
    }
    if(data.envType!== "none" && data.uploadType!== "none" && !isNaN(data.totalCount)) {
        ajaxCallToBulkUploadData(url, method, data);
    }else{
        alert("validation error");
    }
})

$("#sectionA").on("click", '.dropdown-item' ,function(){
    var data = $(this).text();
    $(this).closest(".dropdown-menu").parent().find("button").html(data);
});

$("#sectionEnvSelect").on("click", '.dropdown-item' ,function(){
    var data = $(this).text();
    $(this).closest(".dropdown-menu").parent().find("button").html(data);  
});

$("#sectiontypeSelect").on("click", '.dropdown-item' ,function(){
    
    var data = $(this).text();
    $(this).closest(".dropdown-menu").parent().find("button").html(data);  
});