RHU.require(new Error(), { 
    docs: "docs", rhuDocuscript: "docuscript",
}, function({
    docs, rhuDocuscript,
}) {
    docs.jit = () => docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>((lib, include) => {
        const {
            p
        } = lib;

        p(
            "To create "
        );     
    }, rhuDocuscript);
});