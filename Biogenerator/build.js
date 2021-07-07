function type(swnm) {
    if (swnm == "creeper") {
        return "creeper";
    } else if ((swnm == "slime") || (swnm == "magma_cube")) {
        return "slime";
    } else if (swnm == "ghast") {
        return "ghast";
    } else {
        return "eq";
    };
};

function b_name() {
    if ($(".tp-name").val()) {
        var CustomNameJSON = {};
        CustomNameJSON.text = json_escape_string($(".tp-name").val(), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS);
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

function b_others() {
    if (($(".tp-CanPickupLoot").html() == "开") && (swtype == "eq")) {
        nbt_root.add_child("CanPickupLoot", new nbtBool(true));
    };
    if (["僵尸", "溺尸", "尸壳", "僵尸猪灵"].includes($(".tp-swselect").val())) {
        nbt_root.add_child("CanBreakDoors", new nbtBool(($(".tp-CanBreakDoors").html() == "开")));
        nbt_root.add_child("IsBaby", new nbtBool(($(".tp-IsBaby").html() == "开")));
    };
    if ($(".tp-PersistenceRequired").html() == "关") {
        nbt_root.add_child("PersistenceRequired", new nbtBool(true));
    };
    if ($(".tp-Silent").html() == "开") {
        nbt_root.add_child("Silent", new nbtBool(true));
    };
};

function b_slime() {
    if ($(".tp-size").val()) {
        nbt_root.add_child("Size", new nbtNumber($(".tp-size").val()))
    };
};

function b_creeper() {
    if ($(".tp-ExplosionRadius").val()) {
        nbt_root.add_child("ExplosionRadius", new nbtNumber($(".tp-ExplosionRadius").val(), "b"))
    };
    if ($(".tp-Fuse").val()) {
        nbt_root.add_child("Fuse", new nbtNumber($(".tp-Fuse").val(), "s"))
    };
    if ($(".tp-ignited").html() == "开") {
        nbt_root.add_child("ignited", new nbtBool(true));
    };
    if ($(".tp-power").html() == "开") {
        nbt_root.add_child("power", new nbtBool(true));
    };
}

function b_ghast() {
    if ($(".tp-ExplosionPower").val()) {
        nbt_root.add_child("ExplosionPower", new nbtNumber($(".tp-ExplosionPower").val(), "b"))
    };
}

function b_chance() {
    // hands
    var nbt_HandDropChances = new nbtList;
    var has_HandDropChances = 0;
    if ($(".tp-HandDropChances-1").val()) {
        has_HandDropChances += 1;
        nbt_HandDropChances.add_child(new nbtNumber($(".tp-HandDropChances-1").val() / 100, "f"));
    } else {
        nbt_HandDropChances.add_child(new nbtNumber(0.085, "f"));
    };
    if ($(".tp-HandDropChances-2").val()) {
        has_HandDropChances += 1;
        nbt_HandDropChances.add_child(new nbtNumber($(".tp-HandDropChances-2").val() / 100, "f"));
    } else {
        nbt_HandDropChances.add_child(new nbtNumber(0.085, "f"));
    };
    if (has_HandDropChances > 0) {
        nbt_root.add_child("HandDropChances", nbt_HandDropChances);
    }
    // eq
    var nbt_ArmorDropChances = new nbtList;
    var has_ArmorDropChances = 0;
    if ($(".tp-ArmorDropChances-b").val()) {
        has_ArmorDropChances += 1;
        nbt_ArmorDropChances.add_child(new nbtNumber($(".tp-ArmorDropChances-b").val() / 100, "f"));
    } else {
        nbt_ArmorDropChances.add_child(new nbtNumber(0.085, "f"));
    };
    if ($(".tp-ArmorDropChances-l").val()) {
        has_ArmorDropChances += 1;
        nbt_ArmorDropChances.add_child(new nbtNumber($(".tp-ArmorDropChances-l").val() / 100, "f"));
    } else {
        nbt_ArmorDropChances.add_child(new nbtNumber(0.085, "f"));
    };
    if ($(".tp-ArmorDropChances-c").val()) {
        has_ArmorDropChances += 1;
        nbt_ArmorDropChances.add_child(new nbtNumber($(".tp-ArmorDropChances-c").val() / 100, "f"));
    } else {
        nbt_ArmorDropChances.add_child(new nbtNumber(0.085, "f"));
    };
    if ($(".tp-ArmorDropChances-h").val()) {
        has_ArmorDropChances += 1;
        nbt_ArmorDropChances.add_child(new nbtNumber($(".tp-ArmorDropChances-h").val() / 100, "f"));
    } else {
        nbt_ArmorDropChances.add_child(new nbtNumber(0.085, "f"));
    };
    if (has_ArmorDropChances > 0) {
        nbt_root.add_child("ArmorDropChances", nbt_ArmorDropChances);
    }
}

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
        "弓": "bow",
        "三叉戟": "trident"
    };
    swnm = swlst[$(".tp-swselect").val()];
    nbt_root = new nbtObject();

    swtype = type(swnm);

    // nbt name
    b_name();

    // nbt attributes
    b_attributes();

    // nbt ArmorItems and HandItems
    if (swtype == "eq") {
        b_ArmorItems();
        b_HandItems();
        b_chance();
    } else if (swtype == "slime") {
        b_slime();
    } else if (swtype == "creeper") {
        b_creeper();
    } else if (swtype == "ghast") {
        b_ghast();
    };

    // nbt others
    b_others()

    var resultstr = `summon minecraft:${swnm} ~ ~1 ~ ${nbt_root.text(true)}`;
    $(".tp-result").fadeOut(200, function () {
        $(".tp-result").html(resultstr).slideDown(500);
    });
}