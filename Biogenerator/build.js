function type(swnm) {
    if (swnm == "creeper") {
        return "creeper";
    } else if ((swnm == "slime") || (swnm == "magma_cube")) {
        return "slime";
    } else {
        return "eq";
    };
};

function b_name() {
    if ($(".tp-name").val()) {
        var CustomNameJSON = {};
        CustomNameJSON.text = json_escape_string($(".tp-name").val());
        CustomNameJSON.color = ($(".tp-colorhexswitch").html() == "开") ? `#${$(".tp-colorhex").val()}` : colorlst[$(".tp-namecolor").val()];
        CustomNameJSON.bold = ($(".tp-namebold").html() == "开") ? true : false;
        CustomNameJSON.italic = ($(".tp-nameitalic").html() == "开") ? true : false;
        CustomNameJSON.underlined = ($(".tp-underlined").html() == "开") ? true : false;
        CustomNameJSON.strikethrough = ($(".tp-namestrikethrough").html() == "开") ? true : false;
        CustomNameJSON.obfuscated = ($(".tp-nameobfuscated").html() == "开") ? true : false;
        nbt_root.add_child("CustomName", new nbtString(JSON.stringify(CustomNameJSON)))
    };
    if ($(".tp-CustomNameVisible").html() == "开") {
        nbt_root.add_child("CustomNameVisible", new nbtBool(true))
    };
};

function b_attributes() {
    var nbt_attributes = new nbtList();
    if ($(".tp-max-health").val()) {
        nbt_root.add_child("Health", new nbtNumber($(".tp-max-health").val(), "f"))
        nbt_attributes.add_child(new nbtObject({
            "Name": new nbtString("minecraft:generic.max_health"),
            "Base": new nbtNumber($(".tp-max-health").val(), "d"),
        }));
    };
    if ($(".tp-follow-range").val()) {
        nbt_attributes.add_child(new nbtObject({
            "Name": new nbtString("minecraft:generic.follow_range"),
            "Base": new nbtNumber($(".tp-follow-range").val(), "d"),
        }));
    };
    if ($(".tp-movement-speed").val() && (swnm != "ghast")) {
        nbt_attributes.add_child(new nbtObject({
            "Name": new nbtString("minecraft:generic.movement_speed"),
            "Base": new nbtNumber($(".tp-movement-speed").val(), "d"),
        }));
    };
    if ($(".tp-knockback-resistance").val()) {
        nbt_attributes.add_child(new nbtObject({
            "Name": new nbtString("minecraft:generic.knockback_resistance"),
            "Base": new nbtNumber($(".tp-knockback-resistance").val(), "d"),
        }));
    };
    if ($(".tp-attack-damage").val()) {
        nbt_attributes.add_child(new nbtObject({
            "Name": new nbtString("minecraft:generic.attack_damage"),
            "Base": new nbtNumber($(".tp-attack-damage").val(), "d"),
        }));
    };
    if ($(".tp-attack-knockback").val()) {
        nbt_attributes.add_child(new nbtObject({
            "Name": new nbtString("minecraft:generic.attack_knockback"),
            "Base": new nbtNumber($(".tp-attack-knockback").val(), "d"),
        }));
    };
    if (!nbt_attributes.isempty()) {
        nbt_root.add_child("Attributes", nbt_attributes)
    };
}

function b_ArmorItems() {
    var nbt_ArmorItems = new nbtList;
    var has_armor = 0;
    var material_name = {
        "皮革": "leather",
        "铁": "iron",
        "黄金": "golden",
        "钻石": "diamond",
        "锁链": "chainmail",
        "下界合金": "netherite",
    };

    if ($(".tp-armor-boots").val() == "无") {
        nbt_ArmorItems.add_child(new nbtObject);
    } else {
        has_armor += 1;
        nbt_armor_boots = new nbtObject({
            "id": new nbtString(`minecraft:${material_name[$(".tp-armor-boots").val()]}_boots`),
            "Count": new nbtNumber("1", "b"),
        });
        if ($(".tp-armor-boots-unbreakable").html() == "开") {
            nbt_armor_boots.add_child("tag", new nbtObject({ "Unbreakable": new nbtBool(true) }));
        };
        nbt_ArmorItems.add_child(nbt_armor_boots);
    };

    if ($(".tp-armor-leggings").val() == "无") {
        nbt_ArmorItems.add_child(new nbtObject);
    } else {
        has_armor += 1;
        nbt_armor_leggings = new nbtObject({
            "id": new nbtString(`minecraft:${material_name[$(".tp-armor-leggings").val()]}_leggings`),
            "Count": new nbtNumber("1", "b"),
        });
        if ($(".tp-armor-leggings-unbreakable").html() == "开") {
            nbt_armor_leggings.add_child("tag", new nbtObject({ "Unbreakable": new nbtBool(true) }));
        };
        nbt_ArmorItems.add_child(nbt_armor_leggings);
    };

    if ($(".tp-armor-chestplate").val() == "无") {
        nbt_ArmorItems.add_child(new nbtObject);
    } else {
        has_armor += 1;
        nbt_armor_chestplate = new nbtObject({
            "id": new nbtString(`minecraft:${material_name[$(".tp-armor-chestplate").val()]}_chestplate`),
            "Count": new nbtNumber("1", "b"),
        });
        if ($(".tp-armor-chestplate-unbreakable").html() == "开") {
            nbt_armor_chestplate.add_child("tag", new nbtObject({ "Unbreakable": new nbtBool(true) }));
        };
        nbt_ArmorItems.add_child(nbt_armor_chestplate);
    };

    if ($(".tp-armor-helmet").val() == "无") {
        nbt_ArmorItems.add_child(new nbtObject);
    } else {
        has_armor += 1;
        nbt_armor_helmet = new nbtObject({
            "Count": new nbtNumber("1", "b"),
        });
        if ($(".tp-armor-helmet-unbreakable").html() == "开") {
            nbt_armor_helmet.add_child("tag", new nbtObject({ "Unbreakable": new nbtBool(true) }));
        };
        if (material_name[$(".tp-armor-helmet").val()]) {
            nbt_armor_helmet.add_child("id", new nbtString(`minecraft:${material_name[$(".tp-armor-helmet").val()]}_helmet`));
        } else {
            nbt_armor_helmet.add_child("id", new nbtString(`minecraft:${item_name[$(".tp-armor-helmet").val()]}`));
        };
        nbt_ArmorItems.add_child(nbt_armor_helmet);
    };
    if (has_armor > 0) {
        nbt_root.add_child("ArmorItems", nbt_ArmorItems)
    }
};

function b_HandItems() {
    var nbt_HandItems = new nbtList;
    var has_HandItems = 0;
    if ($(".tp-mainhand").val() == "无") {
        nbt_HandItems.add_child(new nbtObject);
    } else {
        has_HandItems += 1;
        nbt_mainhand = new nbtObject({
            "Count": new nbtNumber("1", "b"),
            "id": new nbtString(`minecraft:${item_name[$(".tp-mainhand").val()]}`),
        });
        if ($(".tp-mainhand-unbreakable").html() == "开") {
            nbt_mainhand.add_child("tag", new nbtObject({ "Unbreakable": new nbtBool(true) }));
        };
        nbt_HandItems.add_child(nbt_mainhand);
    };
    if ($(".tp-minorhand").val() == "无") {
        nbt_HandItems.add_child(new nbtObject);
    } else {
        has_HandItems += 1;
        nbt_minorhand = new nbtObject({
            "Count": new nbtNumber("1", "b"),
            "id": new nbtString(`minecraft:${item_name[$(".tp-minorhand").val()]}`),
        });
        if ($(".tp-minorhand-unbreakable").html() == "开") {
            nbt_minorhand.add_child("tag", new nbtObject({ "Unbreakable": new nbtBool(true) }));
        };
        nbt_HandItems.add_child(nbt_minorhand);
    };
    if (has_HandItems > 0) {
        nbt_root.add_child("HandItems", nbt_HandItems)
    }
};

function buildfunc() {
    var swlst = {
        "僵尸": "zombie",
        "溺尸": "drowned",
        "尸壳": "husk",
        "僵尸猪灵": "zombified_piglin",
        "猪灵": "piglin",
        "猪灵蛮兵": "piglin_brute",
        "骷髅": "skeleton",
        "流浪者": "stray",
        "凋零骷髅": "wither_skeleton",
        "苦力怕": "creeper",
        "史莱姆": "slime",
        "岩浆史莱姆": "magma_cube",
        "恶魂": "ghast",
    };
    colorlst = {
        "默认": "",
        "白色": "white",
        "黑色": "black",
        "红色": "red",
        "绿色": "green",
        "黄色": "yellow",
        "蓝色": "blue",
        "橙色": "orange",
        "青色": "aqua",
        "紫色": "purple",
        "灰色": "grey",
        "深蓝色": "dark_blue",
        "深绿色": "dark_green",
        "深青色": "dark_aqua",
        "深红色": "dark_red",
        "深紫色": "dark_purple",
        "金色": "gold",
        "非常默认": "reset",
    };
    item_name = {
        "南瓜": "carved_pumpkin",
        "南瓜灯": "jack_o_lantern",
        "玻璃": "glass",
        "命令方块": "command_block",
        "下界合金剑": "netherite_sword",
        "钻石剑": "diamond_sword",
        "金剑": "golden_sword",
        "铁剑": "iron_sword",
        "石剑": "stone_sword",
        "木剑": "wooden_sword",
        "下界合金镐": "netherite_pickaxe",
        "钻石镐": "diamond_pickaxe",
        "金镐": "golden_pickaxe",
        "铁镐": "iron_pickaxe",
        "石镐": "stone_pickaxe",
        "木镐": "wooden_pickaxe",
        "下界合金锄": "netherite_hoe",
        "钻石锄": "diamond_hoe",
        "金锄": "golden_hoe",
        "铁锄": "iron_hoe",
        "石锄": "stone_hoe",
        "木锄": "wooden_hoe",
        "下界合金锹": "netherite_shovel",
        "钻石锹": "diamond_shovel",
        "金锹": "golden_shovel",
        "铁锹": "iron_shovel",
        "石锹": "stone_shovel",
        "木锹": "wooden_shovel",
        "下界合金斧": "netherite_axe",
        "钻石斧": "diamond_axe",
        "金斧": "golden_axe",
        "铁斧": "iron_axe",
        "石斧": "stone_axe",
        "木斧": "wooden_axe",
        "盾牌": "shield",
        "不死图腾": "totem_of_undying",
        "光灵箭": "spectral_arrow",
    };
    swnm = swlst[$(".tp-swselect").val()];
    nbt_root = new nbtObject();

    var swtype = type(swnm);

    // nbt name
    b_name();

    // nbt attributes
    b_attributes();

    // nbt ArmorItems
    if (swtype == "eq") {
        b_ArmorItems();
        b_HandItems()
    }

    var resultstr = `summon minecraft:${swnm} ~ ~1 ~ ${nbt_root.text(true)}`;
    $(".tp-result").fadeOut(100, function () {
        $(".tp-result").html(resultstr).slideDown(100);
    });
}