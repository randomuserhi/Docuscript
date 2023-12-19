RHU.require(new Error(), { 
    docs: "docs", rhuDocuscript: "docuscript",
}, function({
    docs, rhuDocuscript,
}) {
    docs.jit = () => docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>((lib, include) => {
        const { 
            p, br, link, h1, i, ul, b
        } = lib;
        const { 
            cb, ic
        } = include({ cb: "code:block", ic: "code:inline" });
       
        p(
            "Docuscript is an experimental typescript program for writing quick and dirty documentation using code. The Github rep can be found ",
            link("https://github.com/randomuserhi/Docuscript", "here"), "."
        );
        br();
        p(
            i("Disclaimer:"), " This codebase is incredibly badly written and is in for a much needed refactor. It works well enough as a proof of concept though!"
        );

        h1("Show me the code!");
        p(
            "Example docuscript for the start of this ", ic([], "About"), " page:"
        );
        cb(["typescript"], `docs.jit = () => docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>((lib, include) => {
    const { 
        p, br, link, h1, i 
    } = lib;
    const { 
        cb 
    } = include({ cb: "code:block", ic: "code:inline" });

    p(
        "Docuscript is an experimental typescript program for writing quick and dirty documentation using code. ",
        "The Github rep can be found ", link("https://github.com/randomuserhi/Docuscript", "here"), "."
    );
    br();
    p(
        i("Disclaimer:"), " This codebase is incredibly badly written and is in for a much needed refactor. ",
        "It works well enough as a proof of concept though!"
    );
    cb(["typescript"], \`docs.jit = () => docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>(() => {
        //...
    }, rhuDocuscript);\`);
}, rhuDocuscript);`);

        h1("Why?");
        p(
            "Docuscript offers a few benefits over standard documentation methods:"
        );
        ul(
            p(
                b("Full customisation over styles: "), "put simply, you can design and build your own CSS stylesheets for the pages to customize how docuscript looks."
            ),
            p(
                b("Custom nodes: "), "Since Docuscript is essentially Javascript aliases for HTML, you can make your own custom HTML components that can be used as docuscript nodes, extending the language to fit your needs. ",
                "These components are not limited to pure HTML as well and can be as complex as required supporting javascript functionality."
            ),
            p(
                b("Code based writeup: "), "The benefits of writing docs in code allows for a lot of productivity improvements such as writing auto generating docs or creating function templates to generate parts of docs automatically."
            ),
            p(
                b("Standard format: "), "Since docuscript is just a webpage, its easily built and can be distributed to run anywhere as long as a modern browser is available (runs offline as well)."
            ),
            p(
                b("Simplicity: "), "Since everything is written in plain ", ic([], "Javascript"), "/", ic([], "Typescript"), " its very easy for any programmer to pick up."
            ),
        );
    }, rhuDocuscript);
});