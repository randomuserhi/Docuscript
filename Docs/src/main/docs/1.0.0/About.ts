RHU.require(new Error(), { 
    docs: "docs", rhuDocuscript: "docuscript",
}, function({
    docs, rhuDocuscript,
}) {
    docs.jit = (version, path) => docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>(({
        h, p, frag, br, link, img
    }) => {
        p(
            "Docuscript is an experimental typescript program for writing quick and dirty documentation using code. The Github rep can be found ",
            link("https://github.com/randomuserhi/Docuscript", "here"), "."
        );
    }, rhuDocuscript);
});