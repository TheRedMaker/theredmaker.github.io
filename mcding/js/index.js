$(function(){
    $(".main").animate({
        "opacity": "1",
        "left": "0"
    }, 1000, function(){
        $(".main").css("position", "static")
    })




    function messageBox(target, title, content, closeBtnContent="确定", closeBtnColor="btn-success") {
        let msgBox = `\
        <div class="modal fade" id="${target}">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title bold">${title}</h5>
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        ${content}
                    </div>

                    <div class="modal-footer">
                        <button class="btn ${closeBtnColor}" data-bs-dismiss="modal">${closeBtnContent}</button>
                    </div>

                </div>
            </div>
        </div>
        `
        return msgBox
    }

    function checkbox(ele) {
        return $(ele).prop("checked") ? true : false
    }




    $(".messageBoxs").append(messageBox("dropItemNameHelp", "掉落物名称", "当掉落物被捡起来再次变成掉落物时，此名称无法再显示"))
    $(".messageBoxs").append(messageBox("itemNameHelp", "物品名称", "物品在背包里显示的名称"))




    $(".dinainTitle").click(function(){
        $(".dinainContent").stop().slideToggle(500)
    })




    var din = $("#dropItemName .dropItemName")
    var dincc = $("#dropItemName .dinCustomColor")
    $(".test").click(function(){
        console.log("making...")
    })
})
