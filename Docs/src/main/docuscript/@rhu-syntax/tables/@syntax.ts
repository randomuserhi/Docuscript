declare namespace RHU {
    interface Modules {
        "docuscript/tables": RHUDocuscript.Tables.Parser;
    }
}

declare namespace RHUDocuscript.Tables {
    interface NodeMap {
        table: {
            widths?: string[];
        };
        tr: {};
        td: {};
        t: never;
        ot: never;
    }
    type Language = keyof NodeMap;

    interface FuncMap extends Docuscript.NodeFuncMap<Language> {
        ot: <T>( options: { 
            widths?: string[],
            headings?: string[]
        }, headings: (string | ((i: T) => any))[], ...objects: T[]) => Node<"table">;
        t: (widths: string[] | undefined, ...content: (string | Node)[][]) => Node<"table">;
        table: (widths: string[] | undefined, ...content: (string | Node<"tr">)[]) => Node<"table">;
        tr: (...content: (string | Node<"td">)[]) => Node<"tr">;
        td: (...content: (string | Node)[]) => Node<"td">;
    }

    type Parser = Docuscript.Parser<Language, FuncMap>;
}

(() => { 
    const _module_ = "docuscript/tables";

    RHU.module(new Error(), `${_module_}`, {
        helper: "docuscript/@helper", root: "docuscript/@style"
    }, function({
        helper, root
    }) {
        type context = RHUDocuscript.Context;
        type node<T extends RHUDocuscript.Language | undefined = undefined> = RHUDocuscript.Node<T>;

        return {
            ot: {
                create: function<T>(this: context, options: { 
                    widths?: string[],
                    headings?: string[],
                    default?: string
                }, headings: (string | ((i: T) => any))[], ...objects: T[]): node<"table"> {
                    const node: node<"table"> = {
                        __type__: "table",
                        widths: options.widths
                    };

                    const { td, tr, b, i } = this.nodes;
                    if (options.headings) {
                        this.remount(tr(...options.headings.map(h => td(b(i(h))))), node);
                    }
                    for (const obj of objects) {
                        this.remount(tr(...headings.map(h => {
                            if (typeof h === "string") {
                                return td((obj as any)[h] === undefined ? options.default ? options.default : (obj as any)[h] : (obj as any)[h]);
                            } else {
                                return td(h(obj));
                            }
                        })), node);
                    }

                    return node;
                },
            },
            t: {
                create: function(this: context, widths, ...content) {
                    const node: node<"table"> = {
                        __type__: "table",
                        widths
                    };

                    const { td, tr } = this.nodes;
                    for (const row of content) {
                        this.remount(tr(...row.map(r => td(r))), node);
                    }

                    return node;
                },
            },
            table: {
                create: function(this: context, widths, ...children) {
                    const node: node<"table"> = {
                        __type__: "table",
                        widths
                    };

                    helper.mountChildrenText(this, node, children);

                    return node;
                },
                parse: function(children, node) {
                    for (const row of children) {
                        if (node.widths) {
                            for (let i = 0; i < node.widths.length && i < row.childNodes.length; ++i) {
                                (row.childNodes[i] as HTMLElement).style.width = node.widths[i];
                            }
                        }
                    }

                    const wrapper = document.createElement("table");
                    if (node.widths) {
                        wrapper.classList.toggle(`${root.block}`, true);
                    }
                    const dom = document.createElement("tbody");
                    dom.append(...children);
                    wrapper.append(dom);
                    return wrapper;
                }
            },
            tr: {
                create: function(this: context, ...children) {
                    const node: node<"tr"> = {
                        __type__: "tr"
                    };

                    helper.mountChildrenText(this, node, children);

                    return node;
                },
                parse: function(children) {
                    const dom = document.createElement("tr");
                    dom.append(...children);
                    return dom;
                }
            },
            td: {
                create: function(this: context, ...children) {
                    const node: node<"td"> = {
                        __type__: "td"
                    };

                    helper.mountChildrenText(this, node, children);

                    return node;
                },
                parse: function(children) {
                    const dom = document.createElement("td");
                    dom.append(...children);
                    return dom;
                }
            },
        };
    });
})();