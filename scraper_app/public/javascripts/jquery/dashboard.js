//infinite scrollbar
var downloadSelected = [];
function generateRandom(){
    return Math.floor((Math.random() * 5000) + 1000);    
}
    var urlToGetData;
    $(document).ready(function() {
	urlToGetData = '/feeds?ajaxcall=true&isLoadattemptFirst=true'
    setInterval(getDataFromAjaxCall(urlToGetData), generateRandom());	
    console.log($(document).height()) 
    console.log($(window).height())
    if($(document).height() <= $(window).height()){
        urlToGetData = '/feeds?ajaxcall=true&isLoadattemptFirst=true'
        setInterval(getDataFromAjaxCall(urlToGetData));
    }
    $(window).scroll(function () {
            if ($(window).scrollTop() ==
                $(document).height() - $(window).height()) {
                console.log(generateRandom());
                setInterval(getDataFromAjaxCall(urlToGetData), generateRandom());
            }
            else if ($(window).scrollTop() ==
            $(document).height() - $(window).height() -18) {
            urlToGetData = '/feeds?ajaxcall=true&isLoadattemptFirst=false';
            setInterval(getDataFromAjaxCall(urlToGetData), generateRandom());
        }
    });
})

$(window).scroll(function() {
    urlToGetData = '/feeds?ajaxcall=true&isLoadattemptFirst=false'
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        generateRandom()
        setInterval(getDataFromAjaxCall(urlToGetData), generateRandom());
    }
    else if ($(window).scrollTop() == $(document).height() - $(window).height() -18) {
        setInterval(getDataFromAjaxCall(urlToGetData), generateRandom());
    }
});

function ajaxcallForDownload(isFetchAllFeedsOfUser, downloadSelected){
    var arrayLength = 0;
    if(!isFetchAllFeedsOfUser){
        //$(':checked').parents('.card').remove();     
        console.log($(':checked').parents('.card').addClass("bg-info text_color"));
        $(':checked').remove();
    }else if(isFetchAllFeedsOfUser){
       // console.log($(".downloadAll").closest(".videoDescription").parent().remove())       
    }

    $.ajax({
        type: 'PUT',
        url: '/download?ajaxcall',
        contentType: "application/json",
        data: JSON.stringify({"isFetchAllFeedsOfUser":isFetchAllFeedsOfUser, "feeds":downloadSelected}),
        success: function(result){
        },
        error: function(){
            console.log("error")
            if($(document).height() <= $(window).height()){
                urlToGetData = '/feeds?ajaxcall=true&isLoadattemptFirst=true'
                getDataFromAjaxCall(urlToGetData)
            }
        }
    })
}

function getDataFromAjaxCall(urlToGetData){
    $.ajax({
        type: 'GET',
        url: urlToGetData,
        success: function (result) {
            console.log(result)
            localStorage.setItem("data", JSON.stringify(result.data))
            localStorage.setItem("extra", JSON.stringify(result.extra))
            if (localStorage.getItem("data")) {
                template(result.data)
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


function template(result){
    var data = result || localStorage.getItem("data") 
    if (data.length !== 0) {
        for (var i = 0; i < data.length; i++){
            $element1 = "<div class='col-md-12'>"+
                "<div class='card'>"+   
                    "<div class='card-block'>"
                    if (data[i].video.thumbnail!=null && data[i].video.thumbnail!="") {
                        $element1 = $element1 +
                        "<div class='row videoDescription'>"+
                        "   <div class='col-md-1'>"+
                        "       <div class='row'>"+
                        "           <div class='col-md-12'>"+
                        `               <input type="checkbox" class="checkbox" data-id="${data[i].id}" data-download='${data[i].video.download_url}'  title="select item to download" class="selectVideoToDownload mt-md-5 pl-md-2">`+
                        "           </div>"+
                        "       </div>"+
                        "   </div>"+
                        "   <div class='col-md-2'>"+
                        "       <div class='row'>"+
                        "           <div class='col-md-12'>"+
                        "               <a title='video thumbnail'><img src='" + data[i].video.thumbnail + "' class='img-thumbnail title='thumbnail'/></a>"+
                        "           </div>"+
                        "       </div>"+
                        "   </div>"+
                        "   <div class='col-md-2'>"+
                        "       <div class='row'>"+
                        "           <div class='col-md-12'>"+
                        "               <a class='video-title' title='video_title'>" + data[i].video.title + "</a>"+
                        "           </div>"+
                        "       </div>"+
                        "      <div class='row'>"+
                        "         <div class='col-md-12'>"+
                        `             <a class="create_time">${data[i].video.create_time}</a>`+
                        `         </div>`+
                        "      </div>"+
                        "      <div class='row'>"+
                        "         <div class='col-md-12'>"+
                        `             <a class="duration">${data[i].video.duration}</a>`+
                        `         </div>`+
                        "      </div>"+
                        "      <div class='row'>"+
                        "         <div class='col-md-12'>"+
                        `             <a class="preload_size">${data[i].video.preload_size}</a>`+
                        `         </div>`+
                        "      </div>"+
                        "   </div>"+
                        "   <div class='col-md-2'>"+
                        "       <div class='row'>"+
                        "           <div class='col-md-3'>"+
                        '               <i class="fa fa-eye fa-2x" aria-hidden="true"  title="views"></i>'+
                        "           </div>"+
                        "           <div class='col-md-3'>"+
                        `               <a class="views">${data[i].video.stats.play_count}</a>`+
                        `           </div>`+
                        "       </div>"+
                        "      <div class='row'>"+
                        "         <div class='col-md-3'>"+
                        '             <i class="fa fa-thumbs-up fa-2x" aria-hidden="true"   title="likes"></i>'+
                        "         </div>"+
                        "         <div class='col-md-3'>"+
                        `             <a class="likes">${data[i].video.stats.digg_count}</a>`+
                        `         </div>`+
                        "      </div>"+
                        "      <div class='row'>"+
                        "         <div class='col-md-3'>"+
                        '             <i class="fa fa-share fa-2x" aria-hidden="true"   title="shares"></i>'+
                        "         </div>"+
                        "         <div class='col-md-3'>"+
                        `             <a class="shares">${data[i].video.stats.share_count}</a>`+
                        `         </div>`+
                        "      </div>"+
                        "      <div class='row'>"+
                        "         <div class='col-md-3'>"+
                        '             <a ><i class="fa fa-comments-o fa-2x" aria-hidden="true"  title="comments"></i></a>'+
                        "         </div>"+
                        "         <div class='col-md-3'>"+
                        `             <a class="comments">${data[i].video.stats.comment_count}</a>`+
                        `         </div>`+
                        "      </div>"+
                        "   </div>"+
                        "   <div class='col-md-2'>"+
                        "      <div class='row'>"+
                        "         <div class='col-md-3'>"+
                        '             <a title="user"><i class="fa fa-user fa-2x" aria-hidden="true"></i></a>'+
                        "         </div>"+
                        "         <div class='col-md-3'>"+
                        `             <a class='username'>${data[i].author.username}</a>`+
                        `         </div>`+
                        "      </div>"+
                        "      <div class='row'>"+
                        "         <div class='col-md-3'>"+
                        '             <a title="followers"><i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i></a>'+
                        "         </div>"+
                        "         <div class='col-md-3'>"+
                        `             <a>${data[i].author.followers}</a>`+
                        `         </div>`+
                        "      </div>"+
                        "   </div>"+
                        "   <div class='col-md-2'>"+
                        "      <div class='row'>"+
                        "          <div class='col-md-12'>"+
                        `              <button class="downloadAll" id="${data[i].author.id}" data-id="${data[i].author.id}"><i class="fa fa-download fa-2x" aria-hidden="true"></i></button>`+
                        "          </div>"+
                        "      </div>"+
                        "   </div>"+
                        "</div>"
                    }    
                    $element1 = $element1 + "<h5 style='margin:5px 0px 5px 10px;'></div></div></div>"
                        $("#sectionA").append(
                            $element1
                        );
                    }
                }
                
}


$(".downloadSelectedVideos").on("click", function(){
    for(let i = 0; i < $(".checkbox").length; i++){
        if($(".checkbox").eq(i).prop("checked") === true){          
            downloadSelected.push({
                    "downloadLinkVideo":$.trim($(".checkbox").eq(i).attr("data-download")),
                    "downloadLinkThumbnail":$.trim($(".checkbox").eq(i).closest(".videoDescription").find("img").attr("src")),
                    "data":{
                    "id": $.trim($(".checkbox").eq(i).attr("data-id")),
                    "author": {
                        "id":$.trim($(".checkbox").eq(i).closest(".videoDescription").find(".downloadAll").attr("data-id")),
                        "name":$.trim($(".checkbox").eq(i).closest(".videoDescription").find(".username").text())
                    },
                    "video":{
                        "name": `${($.trim($(".checkbox").eq(i).attr("data-id")).toString())}.mp4`,
                        "path":`${($.trim($(".checkbox").eq(i).attr("data-id")).toString()).match(/.{1,5}/g).join("/")}`
                    },
                    "thumbnail":{
                        "name":`${($.trim($(".checkbox").eq(i).attr("data-id")).toString())}.webp`,
                        "path":`${($.trim($(".checkbox").eq(i).attr("data-id")).toString()).match(/.{1,5}/g).join("/")}`
                    },
                    "metaData":{
                        "likes":$.trim($(".checkbox").eq(i).closest(".videoDescription").find(".likes").text()),
                        "comments":$.trim($(".checkbox").eq(i).closest(".videoDescription").find(".comments").text()),
                        "shares":$.trim($(".checkbox").eq(i).closest(".videoDescription").find(".shares").text()),
                        "views":$.trim($(".checkbox").eq(i).closest(".videoDescription").find(".views").text()),
                        "title":$.trim($(".checkbox").eq(i).closest(".videoDescription").find(".title").text()),
                        "create_time":$.trim($(".checkbox").eq(i).closest(".videoDescription").find(".create_time").text()),
                        "duration":$.trim($(".checkbox").eq(i).closest(".videoDescription").find(".duration").text()),
                        "preload_size":$.trim($(".checkbox").eq(i).closest(".videoDescription").find(".preload_size").text())
                    }
                }
            })
        }
    }
    ajaxcallForDownload(false, downloadSelected);
})

$("#sectionA").on("click", ".downloadAll" ,function(){
    ajaxcallForDownload(true, [$(this)[0].id])
})