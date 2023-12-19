RHU.require(new Error(), { 
    docs: "docs", rhuDocuscript: "docuscript",
}, function({
    docs, rhuDocuscript,
}) {
    docs.jit = () => docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>((lib, include) => {
        const { 
            p, link 
        } = lib;

        p(
            "To setup a docuscript page...",
        );
    }, rhuDocuscript);
});