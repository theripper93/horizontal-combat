Hooks.on("renderCombatTracker", (app, html, data) => {
    $("#combat-popout").find("#combat-tracker").animate({
        scrollLeft: $("#combat-popout").find(".combatant.active")[0]?.getBoundingClientRect()?.x - $("#combat-popout")[0]?.getBoundingClientRect()?.x - $("#combat-popout")[0]?.getBoundingClientRect()?.width/2
    }, 0)
    if(html[0].id != "combat-popout") return
    html.find()
    app.position.top = 10
    app.position.left = 120
    html.css({
        top: "10px",
        left: "120px"
    })

})

Hooks.on("createCombat",() => {
    ui.combat.renderPopout()
})

Hooks.on("canvasReady",() => {
    if(game?.combat?.started) {
        ui.combat.renderPopout()
    }else{
        ui.combat?._popout?.close()
    }
})

Hooks.on("deleteCombat", () => {
    ui.combat?._popout?.close()
})