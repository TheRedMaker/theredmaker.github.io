var dynamicLoading = {
    css: function (path) {
        if (!path || path.length === 0) {
            alert('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
};

dynamicLoading.css("https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css");
dynamicLoading.js("https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js");
dynamicLoading.js("https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js");

// jquery has loaded --

var showModal = {};

showModal.show = function (heading = "", content = "", btntext, btncmd) {
    $(".tp-modal-title").html(heading);
    $(".tp-modal-content").html(content);
    if (btntext) {
        $(".tp-modal-btn").show();
        $(".tp-modal-btn").html(btntext);
        if (btncmd) {
            $(".tp-modal-btn").click(btncmd);
        } else {
            $(".tp-modal-btn").click(function () { });
        };
    } else {
        $(".tp-modal-btn").hide()
    };
    $(".tp-modal-show").click()
};

showModal.init = function () {
    var modal_html = `<button class="tp-modal-show btn btn-primary btn-lg hide" data-toggle="modal" data-target="#myModal"> </button> <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times; </button> <h4 class="tp-modal-title modal-title" id="myModalLabel"> </h4> </div> <div class="tp-modal-content modal-body"> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal"> 关闭 </button> <button type="button" class="tp-modal-btn btn btn-primary"> </button> </div> </div> </div> </div>`;
    $("body").append(modal_html);
};
