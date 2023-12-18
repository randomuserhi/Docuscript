declare namespace RHU {
    interface Modules {
        "docuscript": RHUDocuscript.Parser;
    }
}

declare namespace RHUDocuscript {
    type NodeMapIncludes = 
        Tables.NodeMap & 
        Code.NodeMap &
        Images.NodeMap &
        Lists.NodeMap &
        MathJax.NodeMap;

    type NodeLanguageIncludes = 
        Tables.Language & 
        Code.Language &
        Images.Language &
        Lists.Language &
        MathJax.Language;

    interface NodeMap extends NodeMapIncludes
    {
        text: {
            text: string;
        };
        br: {};
        p: {};
        h: {
            heading: number;
            label: string;
            link?: string;
            onclick?: () => void;
        };
        h1: never;
        h2: never;
        h3: never;
        h4: never;
        h5: never;
        h6: never;
        div: {};
        frag: {};
        pl: {
            path: string;
            index?: number;
            link?: string;
            onclick?: () => void;
        };
        link: {
            href: string;
        };
        i: {};
        b: {};
        center: {};
    }
    type Language = keyof NodeMap;

    interface FuncMap extends Docuscript.NodeFuncMap<Language>, Docuscript.NodeFuncMap<NodeLanguageIncludes>
    {
        text: (text: string) => Node<"text">;
        br: () => Node<"br">;
        i: (...children: (string | Node)[]) => Node<"i">;
        b: (...children: (string | Node)[]) => Node<"b">;
        p: (...children: (string | Node)[]) => Node<"p">;
        
        h: (heading: number, label: string, ...children: (string | Node)[]) => Node<"h">;
        h1: (label: string, ...children: (string | Node)[]) => Node<"h">;
        h2: (label: string, ...children: (string | Node)[]) => Node<"h">;
        h3: (label: string, ...children: (string | Node)[]) => Node<"h">;
        h4: (label: string, ...children: (string | Node)[]) => Node<"h">;
        h5: (label: string, ...children: (string | Node)[]) => Node<"h">;
        h6: (label: string, ...children: (string | Node)[]) => Node<"h">;

        div: (...children: (string | Node)[]) => Node<"div">;
        frag: (...children: (string | Node)[]) => Node<"frag">;

        pl: (params: [path: string, index?: number], ...children: (string | Node)[]) => Node<"pl">;
        link: (href: string, ...children: (string | Node)[]) => Node<"link">;

        center: (...content: (string | Node)[]) => Node<"center">;
    }

    type Page = Docuscript.Page<Language, FuncMap>;
    type Parser = Docuscript.Parser<Language, FuncMap>;
    type Context = Docuscript.Context<Language, FuncMap>;
    type Node<T extends Language | undefined = undefined> = Docuscript.NodeDef<NodeMap, T>;
}

RHU.module(new Error(), "docuscript", {
    helper: "docuscript/@helper", style: "docuscript/@style",
    tables: "docuscript/tables",
    code: "docuscript/code",
    images: "docuscript/images",
    lists: "docuscript/lists",
    mathjax: "docuscript/mathjax",
}, function({
    helper, style,
    code, 
    tables,
    images,
    lists,
    mathjax,
}) {
    type context = RHUDocuscript.Context;
    type node<T extends RHUDocuscript.Language | undefined = undefined> = RHUDocuscript.Node<T>;

    const includes = {
        ...tables,
        ...code,
        ...images,
        ...lists,
        ...mathjax,
    };

    return {
        ...includes,
        center: {
            create: function(this: context, ...children) {
                const node: node<"center"> = {
                    __type__: "center"
                };

                helper.mountChildrenText(this, node, children);

                return node;
            },
            parse: function(children) {
                const dom = document.createElement("div");
                dom.classList.toggle(`${style.center}`, true);
                dom.append(...children);
                return dom;
            }
        },
        i: {
            create: function(this: context, ...children) {
                const node: node<"i"> = {
                    __type__: "i",
                };

                helper.mountChildrenText(this, node, children);

                return node;
            },
            parse: function(children) {
                const dom = document.createElement("i");
                dom.append(...children);
                return dom;
            }
        },
        b: {
            create: function(this: context, ...children) {
                const node: node<"b"> = {
                    __type__: "b",
                };

                helper.mountChildrenText(this, node, children);

                return node;
            },
            parse: function(children) {
                const dom = document.createElement("b");
                dom.append(...children);
                return dom;
            }
        },
        link: {
            create: function(this: context, href, ...children) {
                const node: node<"link"> = {
                    __type__: "link",
                    href,
                };

                helper.mountChildrenText(this, node, children);

                return node;
            },
            parse: function(children, node) {
                const dom = document.createElement("a");
                dom.target = "blank";
                dom.href = node.href;
                dom.append(...children);
                return dom;
            }
        },
        pl: {
            create: function(this: context, [path, index], ...children) {
                const node: node<"pl"> = {
                    __type__: "pl",
                    path,
                    index,
                };

                helper.mountChildrenText(this, node, children);

                return node;
            },
            parse: function(children, node) {
                const pl = node as node<"pl">;
                const dom = document.createElement(`a`);
                dom.style.textDecoration = "inherit"; // TODO(randomuserhi): style properly with :hover { text-decoration: underline; }
                if (pl.link) {
                    dom.href = pl.link;
                    dom.addEventListener("click", (e) => {  
                        e.preventDefault();
                        if (pl.onclick) {
                            pl.onclick(); 
                        }
                    });
                }
                dom.append(...children);
                return dom;
            }
        },
        text: {
            create: function(text) {
                return {
                    __type__: "text",
                    text: text.toString(),
                };
            },
            parse: function(_, node) {
                return document.createTextNode(node.text);
            }
        },
        br: {
            create: function() {
                return {
                    __type__: "br",
                };
            },
            parse: function() {
                const dom = document.createElement("br");
                return dom;
            }
        },
        p: {
            create: function(this: context, ...children) {
                const node: node<"p"> = {
                    __type__: "p",
                };

                helper.mountChildrenText(this, node, children);

                return node;
            },
            parse: function(children) {
                const dom = document.createElement("p");
                dom.classList.toggle(`${style.block}`, true);
                dom.append(...children);
                return dom;
            }
        },
        h1: {
            create: function(this: context, label, ...children) {
                return this.nodes.h(1, label, ...children);
            },
        },
        h2: {
            create: function(this: context, label, ...children) {
                return this.nodes.h(1, label, ...children);
            },
        },
        h3: {
            create: function(this: context, label, ...children) {
                return this.nodes.h(1, label, ...children);
            },
        },
        h4: {
            create: function(this: context, label, ...children) {
                return this.nodes.h(1, label, ...children);
            },
        },
        h5: {
            create: function(this: context, label, ...children) {
                return this.nodes.h(1, label, ...children);
            },
        },
        h6: {
            create: function(this: context, label, ...children) {
                return this.nodes.h(1, label, ...children);
            },
        },
        h: {
            create: function(this: context, heading, label, ...children) {
                const node: node<"h"> = {
                    __type__: "h",
                    heading,
                    label,
                };

                if (children.length === 0) {
                    this.remount(this.nodes.text(label), node);
                } else {
                    helper.mountChildrenText(this, node, children);
                }

                return node;
            },
            parse: function(children, node) {
                const h = node as node<"h">;
                const dom = document.createElement(`h${h.heading}`);
                dom.style.display = "flex";
                dom.style.gap = "8px";
                dom.style.alignItems = "center";
                dom.classList.toggle(`${style.block}`, true);
                if (h.link) {
                    const wrapper = document.createElement("div");
                    wrapper.style.alignSelf = "stretch";
                    wrapper.style.flexShrink = "0";
                    wrapper.style.paddingTop = "0.8rem";
                    wrapper.style.display = "flex";
                    const link = document.createElement("a");
                    link.href = h.link;
                    link.innerHTML = "";
                    link.style.fontFamily = "docons";
                    link.style.fontSize = "1rem";
                    link.style.textDecoration = "inherit";
                    link.style.color = "inherit";
                    link.addEventListener("click", (e) => {  
                        e.preventDefault();
                        if (h.onclick) {
                            h.onclick(); 
                        }
                    });
                    wrapper.append(link);
                    dom.append(wrapper);
                }
                dom.append(...children);
                return dom;
            }
        },
        div: {
            create: function(this: context, ...children) {
                const node: node<"div"> = {
                    __type__: "div",
                };
                
                helper.mountChildrenP(this, node, children);

                return node;
            },
            parse: function(children) {
                const dom = document.createElement("div");
                dom.classList.toggle(`${style.block}`, true);
                dom.append(...children);
                return dom;
            }
        },
        frag: {
            create: function (this: context, ...children) {
                const node: node<"frag"> = {
                    __type__: "frag",
                };
                
                helper.mountChildrenText(this, node, children);

                return node;
            },
            parse: function(children) {
                const dom = new DocumentFragment();
                dom.append(...children);
                return dom;
            },
        },
    };
});