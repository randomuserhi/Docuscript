RHU.require(new Error(), { 
    docs: "docs", rhuDocuscript: "docuscript",
}, function({
    docs, rhuDocuscript,
}) {
    const version = "1.0.0";
    const path = "Docuscript";
    
    const page = docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>(({
        h, p, frag, br, code
    }) => {
        frag(
            "Docuscript is a framework for writing docs and blogs using javascript.",
            br(),
            "Writing with code opens up avenues for productivity and customisation through enabling standard code behaviour."
        );
        h(1, "About");
        code("language-md",
            "# Example",
            "woah"
        );
    }, rhuDocuscript);
    docs.get(version)!.setCache(path, page);
    return page;
});