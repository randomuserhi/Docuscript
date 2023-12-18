RHU.require(new Error(), { 
    docs: "docs", rhuDocuscript: "docuscript",
}, function({
    docs, rhuDocuscript,
}) {
    docs.jit = () => docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>(({
        p, link, br, i
    }) => {
        p(
            "Docuscript is an experimental typescript program for writing quick and dirty documentation using code. The Github rep can be found ",
            link("https://github.com/randomuserhi/Docuscript", "here"), "."
        );
        br();
        p(
            i("Disclaimer:"), " This codebase is incredibly badly written and is in for a much needed refactor. It works well enough as a proof of concept though!"
        );
    }, rhuDocuscript);
});