function tpshow(elem) {
    $(`${elem}:hidden`).slideDown(200, function () {
        $(elem).fadeTo(200, 1);
    });
};
function tphide(elem) {
    $(`${elem}:visible`).fadeTo(200, 0, function () {
        $(elem).slideUp(200);
    });
};

function change_to_float(val) {
    if ((val / 1).toString().includes(".")) {
        return (val / 1);
    } else {
        return (val / 1).toFixed(1);
    };
};

