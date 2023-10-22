// TODO(randomuserhi): Macros "headeritem" and "filteritem" are very similar, the only difference are their styling
//                     - I should combine them into 1 Macro for cleaner code.

// TODO(randomuserhi): Cleanup code -> page loader should be in a different module.

declare namespace RHU {
    interface Modules {
        "components/organisms/docpages": "organisms/docpages";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/docpages": Organisms.Docpages;
            "atoms/headeritem": Atoms.Headeritem;
        }
    }
}

declare namespace Organisms {
    interface Docpages extends HTMLDivElement {
        view(version: string, page: string, index?: string | null, seek?: boolean, updateURL?: boolean, _data?: { scrollTop: number }): void;
        render(page: RHUDocuscript.Page, index?: string | null, directory?: Page, scrollTop?: boolean): void;
        setPath(path?: string): void;

        content: HTMLDivElement;
        filterlist: Molecules.Filterlist;
        headerlist: HTMLDivElement;
        path: HTMLDivElement;
        
        currentPath: string;
        currentVersion: string;
    }
}

declare namespace Atoms {
    interface Headeritem extends HTMLDivElement {
        set(label: string, index: number, page?: Page): void;
        add(item: Node): void;

        target: Node;

        dropdown: HTMLSpanElement;
        label: HTMLDivElement;
        list: HTMLDivElement;
    }
}

RHU.module(new Error(), "components/organisms/docpages", { 
    Macro: "rhu/macro", style: "components/organsisms/docpages/style",
    filterlist: "components/molecules/filterlist",
    rhuDocuscript: "docuscript", rhuDocuscriptStyle: "docuscript/style",
    docs: "docs", indices: "docs/indices",
}, function({ 
    Macro, style,
    filterlist,
    rhuDocuscript, rhuDocuscriptStyle,
    docs, indices,
}) {
    const DOCUSCRIPT_ROOT = indices.DOCUSCRIPT_ROOT;

    const path = {
        join: function (...paths: string[]) {
            const separator = "/";
            paths = paths.map((part, index) => {
                if (index)
                    part = part.replace(new RegExp("^" + separator), "");
                if (index !== paths.length - 1)
                    part = part.replace(new RegExp(separator + "$"), "");
                return part;
            });
            return paths.join(separator);
        },
        isAbsolute: function (path: string) {
            return /^([a-z]+:)?[\\/]/i.test(path);
        }
    };

    const loadPage = (versionStr: string, page: PageLink, callback?: { onload?: () => void; onerror?: () => void; }) => {
        if (page.cache) return;

        if (!page.script) {
            const script = document.createElement("script");
            script.onload = () => {
                page.script = undefined;

                if (callback && callback.onload) {
                    callback.onload();
                }
            };
            script.onerror = () => {
                if (callback && callback.onerror) {
                    callback.onerror();
                }
                page.script = undefined;
                script.replaceWith();
            };
            script.src = path.join(DOCUSCRIPT_ROOT, versionStr, page.path);
            page.script = script;
            document.head.append(script);
        } else {
            page.script.addEventListener("load", () => {
                if (callback && callback.onload) {
                    callback.onload();
                }
            });
            page.script.addEventListener("error", () => {
                if (callback && callback.onerror) {
                    callback.onerror();
                }
            });
        }
    };

    const loadAll = (versionStr: string) => {
        const version = docs.get(versionStr);
        if (version) {
            version.walk((dir) => {
                let page = dir as Page;
                if (page.page) {
                    loadPage(versionStr, page.page); // TODO(randomuserhi): On fail to load, log error or something
                }
            });
        }
    };

    const LoadingPage = docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>(({
        h
    }) => {
        h(1, "Page is loading.");
    }, rhuDocuscript);

    const FailedLoadingPage = docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>(({
        h
    }) => {
        h(1, "Page failed to load.");
    }, rhuDocuscript);

    const PageNotFound = docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>(({
        h, p
    }) => {
        h(1, "Page not found.");
    }, rhuDocuscript);

    const VersionNotFound = docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>(({
        h, p
    }) => {
        h(1, "Version not found.");
    }, rhuDocuscript);

    const DirectoryPage = (directory: Page) => {
        return docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>(({

        }) => {

        }, rhuDocuscript);
    }

    const headeritem = Macro((() => {
        const headeritem = function(this: Atoms.Headeritem) {
            this.label.addEventListener("click", (e) => {
                this.dispatchEvent(RHU.CustomEvent("view", { target: this.target }));
                e.preventDefault(); // stop redirect
            });
            this.dropdown.addEventListener("click", (e) => {
                this.classList.toggle(`${style.headeritem.expanded}`);
            });
        } as RHU.Macro.Constructor<Atoms.Headeritem>;

        headeritem.prototype.set = function(label, index, page) {
            this.label.innerHTML = label;

            if (page) {
                const url = new URL(window.location.origin + window.location.pathname);
                url.searchParams.set("version", page.version);
                url.searchParams.set("page", page.fullPath());
                url.searchParams.set("index", index.toString());
                this.label.setAttribute("href", url.toString());
            }
        };

        headeritem.prototype.add = function(item) {
            this.list.append(item);
            this.dropdown.classList.toggle(`${style.headeritem.nochildren}`, false);
        };

        return headeritem;
    })(), "atoms/headeritem", //html
        `
            <div class="${style.headeritem.content}">
                <span rhu-id="dropdown" class="${style.headeritem.nochildren} ${style.headeritem.dropdown}"></span>
                <a class="${style.headeritem}" rhu-id="label"></a>
            </div>
            <ol rhu-id="list" class="${style.headeritem.children}">
            </ol>
        `, {
            element: //html
            `<li></li>`
        });

    const docpages = Macro((() => {
        const docpages = function(this: Organisms.Docpages) {

            this.filterlist.version.addEventListener("change", () => {
                this.currentVersion = this.filterlist.version.value;
                this.view(this.currentVersion, this.currentPath);
            });
            this.filterlist.addEventListener("view", (e) => {
                const page = e.detail.target as Page;
                this.view(this.currentVersion, page.fullPath());
            });

            const latest = this.filterlist.version.value;
            const defaultPage = "home"; // TODO(randomuserhi): better default page -> maybe get it from version (store default page in version so when people write docs they can declare the default page)
            this.currentVersion = this.filterlist.version.value;
            this.currentPath = defaultPage;
            
            const urlParams = new URLSearchParams(window.location.search);
            const page = urlParams.get("page");
            const version = urlParams.get("version");
            if (page) {
                this.currentPath = page;
            }
            if (version) {
                this.currentVersion = version;
            }
            const index = urlParams.get("index");

            this.view(this.currentVersion, this.currentPath, index, true);

            window.addEventListener("scrollend", (e) => {
                const data = { 
                    scrollTop: document.documentElement.scrollTop 
                };
                window.history.replaceState(data, "", window.location.href);
            });

            window.addEventListener("popstate", (e) => {
                const urlParams = new URLSearchParams(window.location.search);
                const page = urlParams.get("page");
                const version = urlParams.get("version");
                const index = urlParams.get("index");

                if (e.state && e.state.scrollTop) {
                    const scrollTop = e.state.scrollTop;
                    this.view(version ? version : latest, page ? page : defaultPage, index, false, false, e.state);
                    requestAnimationFrame(() => {
                        document.documentElement.scrollTop = scrollTop;
                    })
                } else {
                    this.view(version ? version : latest, page ? page : defaultPage, index, false, false, { scrollTop: 0 });
                }
            });

        } as RHU.Macro.Constructor<Organisms.Docpages>;

        docpages.prototype.render = function(page, index, directory, scrollTop = true) {
            // TODO(randomuserhi): generate a label -> node map so that after page render we can seek to a header node via its label
            //                     - used when loading URL query params for a page if a link to a specific title is provided

            const frag = new DocumentFragment();
            const stack: Atoms.Headeritem[] = [];
            const depths: number[] = [];
            let i = 0;
            let scrollTarget: HTMLElement | undefined;
            let pageDom = docuscript.render<RHUDocuscript.Language, RHUDocuscript.FuncMap>(page, { 
                pre: (node) => {
                    if (node.__type__ === "h") {
                        const h = node as RHUDocuscript.Node<"h">;

                        const _i = i.toString();
                        const url = new URL(window.location.origin + window.location.pathname);
                        url.searchParams.set("version", this.currentVersion);
                        url.searchParams.set("page", this.currentPath);
                        url.searchParams.set("index", _i);
                        const link = url.toString();
                        h.link = link;
                    }
                },
                post: (node, dom) => {
                    if (node.__type__ === "h") {
                        const h = node as RHUDocuscript.Node<"h">;
                        h.onclick = () => {
                            if (index != _i) {
                                index = _i;
                                window.history.pushState(undefined, "", link);
                            }

                            (dom as HTMLElement).scrollIntoView(true);
                        }
                        
                        let depth = depths.length === 0 ? Infinity : depths[depths.length - 1];
                        while (h.heading <= depth && depths.length > 0) {
                            depths.pop();
                            stack.pop();
                            depth = depths[depths.length - 1];
                        }

                        const parent = stack.length === 0 ? undefined : stack[stack.length - 1];
                        
                        const _i = i.toString();
                        const link = h.link;
                        const item = document.createMacro(headeritem);
                        item.addEventListener("view", (e) => {
                            if (index != _i) {
                                index = _i;
                                window.history.pushState(undefined, "", link);
                            }

                            const node = e.detail.target as HTMLElement;
                            node.scrollIntoView(true);
                        });
                        item.target = dom;
                        if (index === _i) {
                            scrollTarget = dom as HTMLElement;
                        }
                        item.set(h.label, i++, directory);
                        
                        stack.push(item);
                        depths.push(h.heading);
                        
                        if (parent) {
                            parent.add(item);
                        } else {
                            frag.append(item);
                        }
                    }
                }
            });
            this.content.replaceChildren(pageDom);
            this.headerlist.replaceChildren(frag);
            requestAnimationFrame(() => { 
                if (scrollTarget) {
                    scrollTarget.scrollIntoView(true);
                } else if (scrollTop) {
                    document.documentElement.scrollTop = 0;
                }
            });
        }

        docpages.prototype.view = function(versionStr, pageStr, index, seek, updateURL = true, _data) {
            let rerender = this.currentVersion === versionStr && this.currentPath === pageStr;

            const url = new URL(window.location.origin + window.location.pathname);
            if (this.currentVersion !== versionStr || this.currentPath !== pageStr) {
                this.currentVersion = versionStr;
                this.currentPath = pageStr;
                
                url.searchParams.set("version", this.currentVersion);
                url.searchParams.set("page", this.currentPath);
                if (index) {
                    url.searchParams.set("index", index);
                }

                if (updateURL) {
                    window.history.pushState(undefined, "", url.toString());
                } else {
                    window.history.replaceState(_data, "", url.toString());
                }
            } else {
                url.searchParams.set("version", this.currentVersion);
                url.searchParams.set("page", this.currentPath);
                if (index) {
                    url.searchParams.set("index", index);
                }
                window.history.replaceState(_data, "", url.toString());
            }

            const version = docs.get(this.currentVersion);
            if (RHU.exists(version)) {
                const directory = version.get(this.currentPath);
                if (RHU.exists(directory)) {
                    if (RHU.exists(directory.page)) {
                        this.setPath(this.currentPath);
                        this.filterlist.setActive(this.currentPath, seek);
                        if (RHU.exists(directory.page.cache)) {
                            this.render(directory.page.cache, index, directory, !rerender);
                        } else {
                            this.render(LoadingPage);
                            loadPage(this.currentVersion, directory.page, {
                                onload: () => {
                                    this.render(directory.page!.cache!, index, directory, !rerender);
                                }, 
                                onerror: () => {
                                    this.render(FailedLoadingPage);
                                }
                            });
                        }
                    } else {
                        this.render(DirectoryPage(directory));
                    }
                } else {
                    this.render(PageNotFound);
                }
            } else {
                this.render(VersionNotFound);
            }
        }

        docpages.prototype.setPath = function(path) {
            if (!path) {
                this.path.replaceChildren();
            } else {
                let frag = new DocumentFragment();
                let builtPath: string[] = [];
                for (const directory of docs.split(path)) {
                    const item = document.createElement("a");
                    item.href = "file:///E:/Git/Enter-the-Deep/Docs/build/main/main.html?10";
                    item.innerHTML = directory;
                    
                    builtPath.push(directory);
                    const p = [...builtPath].join("/");
                    item.addEventListener("click", (e) => {
                        this.view(this.currentVersion, p);
                        e.preventDefault();
                    });

                    item.classList.toggle(`${style.path.item}`);
                    const wrapper = document.createElement("li");
                    wrapper.append(item);
                    frag.append(wrapper);
                }
                this.path.replaceChildren(frag);
            }
        };

        return docpages;
    })(), "organisms/docpages", //html
        `
        <div class="${style.margin}">
            <rhu-macro rhu-id="filterlist" class="${style.sidebar}" rhu-type="${filterlist}"></rhu-macro>
            <div class="${style.page}">
                <div class="${style.content}">
                    <ol rhu-id="path" class="${style.path}"></ol>
                    <div rhu-id="content" class="${rhuDocuscriptStyle.body}"></div>
                </div>
                <div class="${style.outline}">
                    <div class="${style.outline.content}">
                        <div style="
                            width: 100%;
                            border-radius: 5px;
                            background-color: #eee;
                        ">
                            <div style="
                                display: flex;
                                gap: 5px;
                                align-items: center;
                                font-size: 1rem;
                                background-color: #ccc;
                                border-radius: 5px 5px 0 0;
                                padding: 8px 16px;
                            ">
                                <span style="
                                    font-family: docons;
                                    -webkit-user-select: none;
                                    user-select: none;
                                ">ｧ</span>
                                <span>In this article</span>
                            </div>
                            <ol rhu-id="headerlist" style="
                                padding: 8px;
                                user-select: none;
                            "></ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return docpages;
});