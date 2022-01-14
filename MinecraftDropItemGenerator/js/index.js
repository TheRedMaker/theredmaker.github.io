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
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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

    function checkbox(ele, value) {
        return $(ele).prop("checked") ? true : false
    }




    // 帮助信息
    $(".messageBoxs").append(messageBox("dropItemNameHelp", "掉落物名称", "当掉落物被捡起来再次变成掉落物时，此名称无法再显示"))
    $(".messageBoxs").append(messageBox("itemNameHelp", "物品名称", "物品在背包里显示的名称"))
    $(".messageBoxs").append(messageBox("author-s-words", "作者的话", "1.为了体验到最佳的效果，请使用内核是webkit的浏览器打开此网页<br><br>2.生成的指令可以用在1.13 - 1.18，<span class='bold' style='color: rgb(251, 84, 84);'>不要使用高版本新增的物品在低版本生成，如: 1.16的下界合金，1.13 - 1.15没有此物品；1.18的望远镜，1.13 - 1.16没有此物品</span>"))
    $(".messageBoxs").append(messageBox("itemIDHelp", "物品ID", "先按<kbd>F3</kbd>+<kbd>H</kbd>打开高级信息框<br><br>在游戏中打开背包，鼠标悬停在某一物品上面时，在显示的信息框中的最底下就是物品ID，minecraft:xxx<br><br><span class='bold'>minecraft:也要写上<br>正确格式是<br><span class='bold' style='color: rgb(64, 192, 64);'>minecraft:stone</span><br>而不是<br><span class='bold' style='color:  rgb(251, 84, 84);'>stone<br>minecraft: stone</span></span>"))
    $(".messageBoxs").append(messageBox("pickupDelayHelp", "捡起延迟", "物品生成之后，多久后可以捡起物品<br>20游戏刻 = 1秒<br>如果游戏刻设为32767，物品将永远无法捡起"))




    // 内容折叠

    // 物品和名称设置
    $(".dinainTitle").click(function(){
        $(".dinainContent").stop().slideToggle(500)
    })

    // 其他设置
    $(".otherTitle").click(function(){
        $(".otherContent").stop().slideToggle(500)
    })




    // 输入错误处理




    // 指令生成
    var commandHead = "summon minecraft:item ~ ~1 ~ "

    var mainNBT = new MCNBTObject()

    var dropItemName = new MCNBTObject()

    var item = new MCNBTObject()
    var itemTag = new MCNBTObject()
    var display = new MCNBTObject()
    var itemName = new MCNBTObject()

    $(".generate").click(function(){
        // 掉落物名称
        dropItemName.add({
            "text": `"${$("#dropItemName .dropItemName").val().replace(/"/g, '\\\\"').replace(/'/g, "\\'")}"`,
            "color": `"${$("#dropItemName .dinCustomColor").val()}"`,
            "bold": checkbox("#dropItemName #dinbold"),
            "italic": checkbox("#dropItemName #dinitalic"),
            "underlined": checkbox("#dropItemName #dinunderline"),
            "strikethrough": checkbox("#dropItemName #dinstrike"),
            "obfuscated": checkbox("#dropItemName #dinunknown")
        }, false)
        mainNBT.add({
            "CustomNameVisible": mcNBTHL("nau", [1, "b"]),
            "CustomName": `'${mcNBTHL("string", dropItemName.getString('"'))}'`
        })
        if ($("#dropItemName .dropItemName").val()) {
            mainNBT.add({
                "CustomNameVisible": mcNBTHL("nau", [1, "b"])
            })
        }
        else {
            mainNBT.add({
                "CustomNameVisible": mcNBTHL("nau", [0, "b"])
            })
        }

        // 物品
        itemName.add({
            "text": `"${$("#itemName .itemName").val().replace(/"/g, '\\\\"').replace(/'/g, "\\'")}"`,
            "color": `"${$("#itemName .inCustomColor").val()}"`,
            "bold": checkbox("#itemName #inbold"),
            "italic": checkbox("#itemName #initalic"),
            "underlined": checkbox("#itemName #inunderline"),
            "strikethrough": checkbox("#itemName #instrike"),
            "obfuscated": checkbox("#itemName #inunknown")
        }, false)
        display.add({
            "Name": `'${mcNBTHL("string", itemName.getString('"'))}'`
        })
        itemTag.add({
            "display": display.getString()
        })
        item.add({
            "id": `"${mcNBTHL("string", $("#itemID .itemID").val())}"`,
            "Count": mcNBTHL("nau", [Number($("#itemCount .itemCount").val()), "b"]),
            "tag": itemTag.getString()
        })
        mainNBT.add({
            "Item": item.getString()
        })

        // 捡起延迟
        mainNBT.add({
            "PickupDelay": mcNBTHL("nau", [Number($(".pickupDelay").val()), "s"])
        })

        // 物品生成动画
        if (checkbox("#itemMotion")) {
            mainNBT.add({
                "Motion": `[${mcNBTHL("nau", [".0", "d"])}, ${mcNBTHL("nau", [".3", "d"])}, ${mcNBTHL("nau", [".0", "d"])}]`
            })
        }
        else {
            mainNBT.del(mcNBTHL("key", "Motion"))
        }

        // 生成指令
        $(".resultBG .result").html(commandHead + mainNBT.getString());

        // 指令框高度控制
        if ($(".result").outerHeight() >= 1000) {
            $(".result").css({
                "height": "1000px"
            })
        }
        else {
            $(".result").css({
                "height": "auto"
            })
        }
    })
})
