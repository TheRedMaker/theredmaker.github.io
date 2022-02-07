import {engine$bs3, engine$bs5} from "./Engine.js";

export class Log {
    /**
     *
     * @param {string}date
     * @param {string}abstract
     * @param {Engine}engine
     * @param {string}url
     */
    constructor(date, abstract, engine, url) {
        const log$this = this;
        log$this.date = date;
        log$this.abstract = abstract;
        log$this.engine = engine;
        log$this.url = url;
    }

}

/**
 *
 * @param {Log}log
 */
export function registerLog(log) {
    const $tr = $("<tr />")
    const $tdDate = $("<td />")
    const $tdAbstract = $("<td />")
    const $tdEngine = $("<td />")
    $tdDate.append($("<a />").html(log.date).attr("href", log.url));
    $tdAbstract.html(log.abstract)
    $tdEngine
        .append($("<img src=\"\" alt=\"\" style=\"height:50px;width:50px\">").attr("src", `./static/${log.engine.logo}`))
        .append("&nbsp;")
        .append(log.engine.name)
    $tr.append($tdDate).append($tdAbstract).append($tdEngine);
    $("#indexTable").append($tr)
}

export function registerLogs() {
    registerLog(new Log("2022年1月25日", "得到了粘液球", engine$bs3, "./2022年1月25日/index.html"));
    registerLog(new Log("2022年1月28日", "金制背包，钻石", engine$bs5, "./2022年1月28日/index.html"));
    registerLog(new Log("2022年2月3日", "不祥之兆真不详", engine$bs5, "./2022年2月3日/index.html"));
    registerLog(new Log("2022年2月4日", "又一个不祥之兆", engine$bs5, "./2022年2月4日/index.html"));
}
