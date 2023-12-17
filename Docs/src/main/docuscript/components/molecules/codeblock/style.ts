declare namespace RHU {
    interface Modules {
        "docuscript/components/molecules/codeblock/style": {
        };
    }
}

RHU.module(new Error(), "docuscript/components/molecules/codeblock/style",
    { Style: "rhu/style", theme: "main/theme" },
    function({ Style }) {
        const style = Style(() => {

            return {
            };
        });

        return style;
    }
);