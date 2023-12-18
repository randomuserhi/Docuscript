declare namespace RHU {
    interface Modules {
        "docuscript/@helper": {
            mountChildren(context: RHUDocuscript.Context, node: RHUDocuscript.Node<undefined>, children: (string | RHUDocuscript.Node<undefined>)[], conversion: (text: string) => RHUDocuscript.Node<undefined>): void;
            mountChildrenText(context: RHUDocuscript.Context, node: RHUDocuscript.Node<undefined>, children: (string | RHUDocuscript.Node<undefined>)[]): void;
            mountChildrenP(context: RHUDocuscript.Context, node: RHUDocuscript.Node<undefined>, children: (string | RHUDocuscript.Node<undefined>)[]): void;
        };
    }
}

RHU.module(new Error(), "docuscript/@helper", {
}, function() {
    type context = RHUDocuscript.Context;
    type node<T extends RHUDocuscript.Language | undefined = undefined> = RHUDocuscript.Node<T>;

    const mountChildren = (context: context, node: node, children: (string | node)[], conversion: (text: string) => node) => {
        for (const child of children) {
            let childNode: node;
            if (typeof child === "string") {
                childNode = conversion(child);
            } else {
                childNode = child;
            }
            
            context.remount(childNode, node);
        }
    };
    const mountChildrenText = (context: context, node: node, children: (string | node)[]) => {
        mountChildren(context, node, children, (text) => context.nodes.text(text));
    };
    const mountChildrenP = (context: context, node: node, children: (string | node)[]) => {
        mountChildren(context, node, children, (text) => context.nodes.p(text));
    };

    return {
        mountChildren,
        mountChildrenText,
        mountChildrenP,
    };
});