declare namespace RHU {
    interface Modules {
        "docuscript/mathjax": RHUDocuscript.MathJax.Parser;
    }
}

declare namespace RHUDocuscript.MathJax {
    interface NodeMap {
        mj: {};
    }
    type Language = keyof NodeMap;

    interface FuncMap extends Docuscript.NodeFuncMap<Language> {
        mj: (...children: (string | Node)[]) => Node<"mj">;
    }

    type Parser = Docuscript.Parser<Language, FuncMap>;
}

(() => { 
    const _module_ = "docuscript/mathjax";

    RHU.module(new Error(), `${_module_}`, {
        helper: "docuscript/@helper", root: "docuscript/@style", style: `${_module_}/@style`,
    }, function({
        helper,
    }) {
        type context = RHUDocuscript.Context;
        type node<T extends RHUDocuscript.Language | undefined = undefined> = RHUDocuscript.Node<T>;

        return {
            mj: {
                create: function(this: context, ...children) {
                    const node: node<"mj"> = {
                        __type__: "mj",
                    };

                    helper.mountChildrenText(this, node, children);

                    return node;
                },
                parse: function(children) {
                    const dom = document.createElement("span");
                    dom.append(...children);
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, dom]);
                    return dom;
                }
            },
        };
    });
})();