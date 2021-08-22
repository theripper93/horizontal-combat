Hooks.on("renderCombatTracker", (app, html, data) => {
  $("#combat-popout")
    .find("#combat-tracker")
    .animate(
      {
        scrollLeft:
          ($("#combat-popout")
            .find(".combatant.active")[0]
            ?.getBoundingClientRect()?.x -
            $("#combat-popout")[0]?.getBoundingClientRect()?.x -
            $("#combat-popout")[0]?.getBoundingClientRect()?.width / 2) /
          game.settings.get("horizontal-combat", "scale"),
      },
      0
    );
  if (game.settings.get("horizontal-combat", "scale") < 1)
    $("#combat-popout")?.css({
      top: `10px`,
      left: `120px`,
    });
  if (html[0].id != "combat-popout") return;
  html.find();
  app.position.top = 10;
  app.position.left = 120;
  html.css({
    top: `10px`,
    left: `120px`,
  });
});

Hooks.on("createCombat", () => {
  ui.combat.renderPopout();
  ui.nav.collapse();
});

Hooks.on("canvasReady", () => {
  if (game?.combat?.started) {
    ui.combat.renderPopout();
    ui.nav.collapse();
  } else {
    ui.combat?._popout?.close();
    ui.nav.expand();
  }
});

Hooks.on("deleteCombat", () => {
  ui.combat?._popout?.close();
  ui.nav.expand();
});

Hooks.on("collapseSidebar", (sidebar, collapsed) => {
  document.documentElement.style.setProperty(
    "--hc-sidebar",
    collapsed ? "50px" : "330px"
  );
});

Hooks.on("init", () => {
  game.settings.register("horizontal-combat", "scale", {
    name: "Scale",
    hint: "Scale of the Horizontal Combat Tracker",
    scope: "client",
    config: true,
    type: Number,
    range: {
      min: 0.1,
      max: 2,
      step: 0.05,
    },
    default: 1,
    onChange: (sett) => {
      document.documentElement.style.setProperty("--hc-scale", sett);
    },
  });

  document.documentElement.style.setProperty(
    "--hc-scale",
    game.settings.get("horizontal-combat", "scale")
  );
});
