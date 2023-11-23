RHU.require(new Error(), { 
    docs: "docs", rhuDocuscript: "docuscript",
}, function({
    docs, rhuDocuscript,
}) {
    docs.jit = (version, path) => docuscript<RHUDocuscript.Language, RHUDocuscript.FuncMap>(({
        h, div, p, frag, br, mj, i, t, center, ul
    }) => {
        let wrapper = mj;
        mj = frag as any as typeof mj;

        wrapper(
            h(1, "f1", mj(`$f_1(n) = (3/2)^n$`)),
            br(),
            div(
                "Let's use the first as a baseline:",
                br(),
                center(t(undefined, 
                    [mj(`$f_1(n) = (3/2)^n$`)]
                ))
            ),

            h(1, "f2", mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}}$`)),
            br(),
            div(
                mj(`$$f_2(n) = (\\sqrt{2})^{\\log{n}}$$`),
                frag(
                    i("Converting root into power, "), mj(`$\\sqrt{x} = x^{\\frac{1}{2}}$`)
                ),
                mj(`$$f_2(n) = (2^{\\frac{1}{2}})^{\\log{n}}$$`),
                frag(
                    i("Using the power rule: "), mj(`$(x^y)^z = x^{yz}$`)
                ),
                mj(`$$f_2(n) = 2^{\\frac{1}{2}\\log{n}}$$`),
                frag(
                    i("Using the power rule: "), mj(`$x^{yz} = (x^y)^z$`)
                ),
                mj(`$$f_2(n) = (2^{\\log{n}})^{\\frac{1}{2}}$$`),
                frag(
                    i("Since all "), mj(`$\\log$`), i(" are base 2, and "), mj(`$x^{log_x{y}}=y$`)
                ),
                mj(`$$f_2(n) = n^{\\frac{1}{2}} = \\sqrt{n}$$`),
                frag(
                    mj(`$\\sqrt{n}$`), " is smaller than ", mj(`$(3/2)^n$`), " asymtopically, since ", mj(`$(3/2)^n$`), 
                    "grows much faster than ", mj(`$\\sqrt{n}=n^{\\frac{1}{2}}$`), " thus:"
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)]
                ))
            ),

            h(1, "f3", mj(`$f_3(n) = \\log{n}$`)),
            br(),
            div(
                frag(
                    mj(`$\\log{n}$`), " is smaller than ", mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`), " asymtopically. To prove this, we need to prove that ",
                    mj(`$\\log{n} < n$`), ":"
                ),
                br(),
                frag(
                    "Let ", mj(`$f(n) = \\log{n}$`), " and ", mj(`$g(n) = n$`), ", then ", mj(`$f'(n)=\\frac{1}{n}$`), " and ",
                    mj(`$g'(n)=1$`), ". Since ", mj(`$f(1) < g(1)$`), " and ", mj(`$f'(n)\\leq g'(n)$`), " for ", mj(`$n \\geq 1$`),
                    " we must have ", mj(`$f(n) < g(n)$`), " for all ", mj(`$n \\geq 1$`), ".",
                    br(), br(),
                    ul(
                        frag(
                            mj(`$f'(n)\\leq g'(n)$`), " since ", mj(`$\\frac{1}{n}$`), " clearly gets smaller than ", mj(`$1$`), " as ", mj(`$n$`), " increases."
                        ),
                        frag(
                            "Showing that ", mj(`$f'(n)\\leq g'(n)$`), " for all ", mj(`$n$`), " means that the growth rate of ", mj(`$f$`), " never exceeds ", mj(`$g$`),
                            " past point ", mj(`$c$`), " where ", mj(`$c = 1$`), "(", mj(`$f(1) < g(1)$`), ") thus once ", mj(`$f$`), " reaches point ", mj(`$c$`), " it is smaller than ",
                            mj(`$g$`), " and can never grow larger than it as its growth rate remains smaller beyond point ", mj(`$c=1$`), "."
                        )
                    )
                ),
                br(),
                frag(
                    "Next, to prove that ", mj(`$\\log{n} < \\sqrt{n}$`), ", we can transform ", mj(`$log(n)$`), ":"
                ),
                mj(`$$\\log{n} = \\log{\\sqrt{n}^{2}} = 2\\log{\\sqrt{n}}$$`),
                frag(
                    "Since ", mj(`$\\log{n} < n$`), ", then:"
                ),
                mj(`$$2\\log{\\sqrt{n}} < 2\\sqrt{n}$$`),
                frag(
                    "And since ", mj(`$\\log{n} = 2\\log{\\sqrt{n}}$`), " then:"
                ),
                mj(`$$\\log{n} < 2\\sqrt{n} \\\\ \\log{n} < O(\\sqrt{n})$$`),
                frag(
                    "And since ", mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`), " then:"
                ),
                mj(`$$\\log{n} < O(f_2(n))$$`),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_3(n) = \\log{n}$`)]
                ))
            ),

            h(1, "f4", mj(`$f_4(n) = n^2$`)),
            br(),
            div(
                frag(
                    mj(`$n^2$`), " is larger than ", mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`), " asymtopically. This can easily be seen since ",
                    mj(`$\\sqrt{n} = n^{\\frac{1}{2}}$`), ", which clearly grows at a slower rate."
                ),
                br(),
                frag(
                    mj(`$n^2$`), " is smaller than ", mj(`$f_1(n) = (3/2)^n$`), " asymtopically. This can easily be seen since ", mj(`$(3/2)^n$`), " clearly grows at a much faster rate."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_3(n) = \\log{n}$`)]
                ))
            ),

            h(1, "f5", mj(`$f_5(n) = n^n$`)),
            br(),
            div(
                frag(
                    mj(`$n^n$`), " is larger than ", mj(`$f_1(n) = (3/2)^n$`), " asymtopically. This can easily be seen since ",
                    mj(`$n^n$`), " clearly grows at a slower rate."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_3(n) = \\log{n}$`)]
                ))
            ),

            h(1, "f6", mj(`$f_6(n) = \\ln{n}$`)),
            br(),
            div(
                frag(
                    mj(`$\\ln{n}$`), " is the same as ", mj(`$f_3(n) = \\log{n}$`), " asymtopically."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`)
                    )]
                ))
            ),

            h(1, "f7", mj(`$f_7(n) = \\log^2{n}$`)),
            br(),
            div(
                frag(
                    mj(`$\\log^2{n}$`), " is larger than ", mj(`$f_3(n) = \\log{n}$`), " asymtopically."
                ), 
                br(),
                frag(
                    mj(`$\\log^2{n}$`), " is smaller than ", mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`), " asymtopically. This can be proven using limits since if ",
                    mj(`$\\log^2{n}$`), "grows smaller than ", mj(`$f_2(n)$`), " then as ", mj(`$n \\to \\infty$`), " the ratio of the gradients (growth rate) should approach ",
                    mj(`$0$:`)
                ),
                mj(`$$
                    \\lim_{n\\to\\infty} \\frac{f_7'(n)}{f_2'(n)} = 0
                $$`),
                frag(
                    "By substituting in the derivatives and simplifying:"
                ),
                mj(`$$
                    \\lim_{n\\to\\infty} \\frac{
                        \\frac{
                            2\\log(n)
                        }{
                            n
                        }
                    }{
                        \\frac{
                            1
                        }{
                            2\\sqrt{n}
                        }
                    } = 0 
                    \\\\
                    \\lim_{n\\to\\infty}
                    \\frac{
                        2\\log(n)
                    }{
                        n
                    }
                    \\times
                    \\frac{
                        2\\sqrt{n}
                    }{
                        1
                    } = 0
                    \\\\
                    \\lim_{n\\to\\infty}
                    \\frac{
                        4\\log(n) \\sqrt{n}
                    }{
                        n
                    } = 0
                    \\\\
                    \\lim_{n\\to\\infty}
                    \\frac{
                        4\\log(n)
                    }{
                        \\sqrt{n}
                    }
                    \\times
                    \\frac{
                        \\sqrt{n}
                    }{
                        \\sqrt{n}
                    } = 0
                    \\\\
                    \\lim_{n\\to\\infty}
                    \\frac{
                        4\\log(n)
                    }{
                        \\sqrt{n}
                    } = 0
                $$`),
                frag(
                    "From here we can see that the comparison is equivalent to comparing ", mj(`$\\log{n}$`), " and ", mj(`$\\sqrt{n}$`), " in which we know that ", mj(`$\\log{n} < \\sqrt{n}$`),
                    " thus ", mj(`$\\log^2{n}$`), " is smaller than ", mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`), "."
                ),
                br(), br(),
                frag(
                    i("NOTE: The comparison of their growth rates are equivalent, not the actual growth rates. Thus it does not hold true that "), mj(`$\\log{n} = \\log^2{n}$`)
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`)
                    )]
                ))
            ),

            h(1, "f8", mj(`$f_8(n) = n^{\\log_{3}{3}}$`)),
            br(),
            div(
                frag(
                    "First we can simplify, ", mj(`$n^{\\log_{3}{3}}$`), " to:"
                ),
                mj(`$$
                    n^{\\log_{3}{3}} = n^{1} = n
                $$`),
                frag(
                    mj(`$n$`), " is smaller than ", mj(`$f_4(n) = n^2$`), " asymtopically."
                ),
                br(),
                frag(
                    mj(`$n$`), " is larger than ", mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`), " asymtopically."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`)
                    )]
                ))
            ),

            h(1, "f9", mj(`$f_9(n) = 2^{2^n}$`)),
            br(),
            div(
                frag(
                    mj(`$2^{2^n}$`), " is larger than ", mj(`$f_1(n) = (3/2)^n$`), " asymtopically."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`)
                    )]
                ))
            ),

            h(1, "f10", mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}}$`)),
            br(),
            div(
                frag(
                    "First we can simplify, ", mj(`$n^{\\frac{1}{\\log{n}}}$`), ":"
                ),
                br(),
                frag(
                    i("Say that: ")
                ),
                mj(`$$
                    x = \\log(n) 
                $$`),
                frag(
                    i("Given that all "), mj(`$\\log$`), i(" are base 2:")
                ),
                mj(`$$
                    2^{x} = n \\\\
                    2 = \\sqrt[x]{n}
                $$`),
                frag(
                    i("Now by substituting "), mj(`$x$`), i(" into the original equation:")
                ),
                mj(`$$
                    n^{\\frac{1}{\\log{n}}} = n^{\\frac{1}{x}}
                $$`),
                frag(
                    i("Converting root into power, "), mj(`$\\sqrt{x} = x^{\\frac{1}{2}}$`)
                ),
                mj(`$$
                    n^{\\frac{1}{x}} = \\sqrt[x]{n}
                $$`),
                frag(
                    i("Using "), mj(`$2 = \\sqrt[x]{n}$`), i(" from before:")
                ),
                mj(`$$
                    f_{10}(n) = n^{\\frac{1}{\\log{n}}} = n^{\\frac{1}{x}} = \\sqrt[x]{n} = 2
                $$`),
                frag(
                    "Thus we know that ", mj(`$f_{10}$`), " is constant time which is the fastest so far."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`)
                    )],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f11", mj(`$f_{11}(n) = \\log{\\log{n}}$`)),
            br(),
            div(
                frag(
                    mj(`$\\log{\\log{n}}$`), " is larger than ", mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`), " asymtopically."
                ),
                br(),
                frag(
                    mj(`$\\log{\\log{n}}$`), " is smaller than ", mj(`$f_3(n) = \\log{n}$`), " asymtopically. To prove this, we need to prove that ",
                    mj(`$\\log{n} < n$`), ":"
                ),
                br(),
                frag(
                    "Let ", mj(`$f(n) = \\log{n}$`), " and ", mj(`$g(n) = n$`), ", then ", mj(`$f'(n)=\\frac{1}{n}$`), " and ",
                    mj(`$g'(n)=1$`), ". Since ", mj(`$f(1) < g(1)$`), " and ", mj(`$f'(n)\\leq g'(n)$`), " for ", mj(`$n \\geq 1$`),
                    " we must have ", mj(`$f(n) < g(n)$`), " for all ", mj(`$n \\geq 1$`), ".",
                    br(), br(),
                    ul(
                        frag(
                            mj(`$f'(n)\\leq g'(n)$`), " since ", mj(`$\\frac{1}{n}$`), " clearly gets smaller than ", mj(`$1$`), " as ", mj(`$n$`), " increases."
                        ),
                        frag(
                            "Showing that ", mj(`$f'(n)\\leq g'(n)$`), " for all ", mj(`$n$`), " means that the growth rate of ", mj(`$f$`), " never exceeds ", mj(`$g$`),
                            " past point ", mj(`$c$`), " where ", mj(`$c = 1$`), "(", mj(`$f(1) < g(1)$`), ") thus once ", mj(`$f$`), " reaches point ", mj(`$c$`), " it is smaller than ",
                            mj(`$g$`), " and can never grow larger than it as its growth rate remains smaller beyond point ", mj(`$c=1$`), "."
                        )
                    )
                ),
                br(),
                frag(
                    "Next, to prove that ", mj(`$\\log{\\log{n}} < \\log{n}$`), " we just need to substitute ", mj(`$\\log{n} = x$`), ":"
                ),
                mj(`$$
                    \\log{\\log{n}} < \\log{n} \\to \\log{x} < x
                $$`),
                frag(
                    "And we know that ", mj(`$\\log{x} < x$`)
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`)
                    )],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f12", mj(`$f_{12}(n) = n \\cdot 2^{n}$`)),
            br(),
            div(
                frag(
                    mj(`$n \\cdot 2^{n}$`), " is larger than ", mj(`$f_1(n) = (3/2)^n$`), " asymtopically."
                ),
                br(),
                frag(
                    mj(`$n \\cdot 2^{n}$`), " is smaller than ", mj(`$f_5(n) = n^n$`), " asymtopically."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`)
                    )],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f13", mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`)),
            br(),
            div(
                frag(
                    mj(`$n^{\\log{\\log{n}}}$`), " is larger than ", mj(`$f_4(n) = n^2$`), " asymtopically."
                ),
                br(),
                frag(
                    mj(`$n^{\\log{\\log{n}}}$`), " is smaller than ", mj(`$f_1(n) = (3/2)^n$`), " asymtopically. We know this because we can compare the growth rate of the power factor and ",
                    mj(`$\\log{\\log{n}} < n$`), " thus ", mj(`$n^{\\log{\\log{n}}} < f_1(n)$`)
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`)
                    )],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f14", mj(`$f_{14}(n) = \\log{n^2}$`)),
            br(),
            div(
                frag(
                    mj(`$\\log{n^2}$`), " is the same as ", mj(`$f_3(n) = \\log{n}$`), " asymtopically:"
                ),
                frag(
                    i("Using the power rule of logs "), mj(`$\\log{x^y}=y\\log{x}$`)
                ),
                mj(`$$
                    \\log{n^2} = 2\\log{n}
                $$`),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`),
                        mj(`$f_{14}(n) = \\log{n^2}$`)
                    )],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f15", mj(`$f_{15}(n) = 2^n$`)),
            br(),
            div(
                frag(
                    mj(`$\\log{n^2}$`), " is smaller than ", mj(`$f_{12}(n) = n \\cdot 2^{n}$`), " asymtopically:"
                ),
                frag(
                    mj(`$\\log{n^2}$`), " is larger than ", mj(`$f_1(n) = (3/2)^n$`), " asymtopically:"
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_{15}(n) = 2^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`)],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`),
                        mj(`$f_{14}(n) = \\log{n^2}$`)
                    )],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f16", mj(`$f_{16}(n) = 2^{\\log{n}}$`)),
            br(),
            div(
                frag(
                    "Since all ", mj(`$\\log$`), " are base 2, and ", mj(`$x^{log_x{y}}=y$`)
                ),
                mj(`$$
                    2^{\\log{n}} = n
                $$`),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_{15}(n) = 2^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`)],
                    [mj(`$f_4(n) = n^2$`)],
                    [ul(
                        mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`),
                        mj(`$f_{16}(n) = 2^{\\log{n}} = n$`)
                    )],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`),
                        mj(`$f_{14}(n) = \\log{n^2}$`)
                    )],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f17", mj(`$f_{17}(n) = (\\log{n})^{\\log{n}}$`)),
            br(),
            div(
                frag(
                    mj(`$(\\log{n})^{\\log{n}}$`), " is equivalent to ", mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`), ":"
                ),
                mj(`$$
                    n^{\\log{\\log{n}}} = n^{\\frac{\\log{\\log{n}}}{\\log{n}} \\times \\log{n}}
                $$`),
                frag(
                    i("Using the base change rule "), mj(`$\\log_{a}{b}=\\frac{log_{c}{b}}{log_{c}{a}}$`), " where ", mj(`$a = n, b = \\log{n}, c = 2$`)
                ),
                mj(`$$
                    n^{\\frac{\\log{\\log{n}}}{\\log{n}} \\times \\log{n}} = n^{\\log_{n}{\\log{n}} \\times \\log{n}}
                $$`),
                frag(
                    i("Using the power rule: "), mj(`$(x^y)^z = x^{yz}$`)
                ),
                mj(`$$
                    n^{\\log_{n}{\\log{n}} \\times \\log{n}} = (n^{\\log_{n}{\\log{n}})^{\\log{n}}}
                $$`),
                frag(
                    "Using ", mj(`$x^{log_x{y}}=y$`), " where ", mj(`$x = n, y = \\log{n}$`)
                ),
                mj(`$$
                    (n^{\\log_{n}{\\log{n}})^{\\log{n}}} = (\\log{n})^{\\log{n}}
                $$`),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_{15}(n) = 2^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [ul(
                        mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`),
                        mj(`$f_{17}(n) = (\\log{n})^{\\log{n}}$`)
                    )],
                    [mj(`$f_4(n) = n^2$`)],
                    [ul(
                        mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`),
                        mj(`$f_{16}(n) = 2^{\\log{n}} = n$`)
                    )],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`),
                        mj(`$f_{14}(n) = \\log{n^2}$`)
                    )],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f18", mj(`$f_{18}(n) = 4^{\\log{n}}$`)),
            br(),
            div(
                frag(
                    mj(`$4^{\\log{n}}$`), " is equivalent to ", mj(`$f_4(n) = n^2$`), ":"
                ),
                mj(`$$
                    4^{\\log{n}} = (2^2)^{\\log{n}}
                $$`),
                frag(
                    i("Using the power rule: "), mj(`$(x^y)^z = x^{yz}$`)
                ),
                mj(`$$
                    (2^2)^{\\log{n}} = 2^{2\\log{n}}
                $$`),
                frag(
                    i("Using the log power rule: "), mj(`$y\\log{x}=\\log{x^y}$`)
                ),
                mj(`$$
                    2^{2\\log{n}} = 2^{\\log{n^2}}
                $$`),
                frag(
                    i("Since all "), mj(`$\\log$`), i(" are base 2, and "), mj(`$x^{log_x{y}}=y$`)
                ),
                mj(`$$
                    2^{\\log{n^2}} = n^2
                $$`),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_{15}(n) = 2^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [ul(
                        mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`),
                        mj(`$f_{17}(n) = (\\log{n})^{\\log{n}}$`)
                    )],
                    [ul(
                        mj(`$f_4(n) = n^2$`),
                        mj(`$f_{18}(n) = 4^{\\log{n}}$`)
                    )],
                    [ul(
                        mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`),
                        mj(`$f_{16}(n) = 2^{\\log{n}} = n$`)
                    )],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`),
                        mj(`$f_{14}(n) = \\log{n^2}$`)
                    )],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f19", mj(`$f_{19}(n) = \\log_{(\\log_{5}{25})}{n}$`)),
            br(),
            div(
                frag(
                    mj(`$log_{(\\log_{5}{25})}{n}$`), " is equivalent to ", mj(`$f_3(n) = \\log{n}$`),
                    " since its just a logarithm with a constant base (despite the base being different)."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_{15}(n) = 2^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [ul(
                        mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`),
                        mj(`$f_{17}(n) = (\\log{n})^{\\log{n}}$`)
                    )],
                    [ul(
                        mj(`$f_4(n) = n^2$`),
                        mj(`$f_{18}(n) = 4^{\\log{n}}$`)
                    )],
                    [ul(
                        mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`),
                        mj(`$f_{16}(n) = 2^{\\log{n}} = n$`)
                    )],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`),
                        mj(`$f_{14}(n) = \\log{n^2}$`),
                        mj(`$f_{19}(n) = log_{(\\log_{5}{25})}{n}$`)
                    )],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f20", mj(`$f_{20}(n) = \\sqrt{\\log{n}}$`)),
            br(),
            div(
                frag(
                    mj(`$\\sqrt{\\log{n}$`), " is smaller than ", mj(`$f_3(n) = \\log{n}$`), " asymtopically. This is simply proven as we know that this is comparatively equivalent to ",
                    mj(`$\\sqrt{x} < x, x = \\log{n}$`), " which we know is true."
                ),
                frag(
                    mj(`$\\sqrt{\\log{n}$`), " is larger than ", mj(`$\\log{\\log{n}}$`), " asymtopically. This is simply proven as we know that this is comparatively equivalent to ",
                    mj(`$\\sqrt{x} > log{x}, x = \\log{n}$`), " which we know is true."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_{15}(n) = 2^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [ul(
                        mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`),
                        mj(`$f_{17}(n) = (\\log{n})^{\\log{n}}$`)
                    )],
                    [ul(
                        mj(`$f_4(n) = n^2$`),
                        mj(`$f_{18}(n) = 4^{\\log{n}}$`)
                    )],
                    [ul(
                        mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`),
                        mj(`$f_{16}(n) = 2^{\\log{n}} = n$`)
                    )],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`),
                        mj(`$f_{14}(n) = \\log{n^2}$`),
                        mj(`$f_{19}(n) = log_{(\\log_{5}{25})}{n}$`)
                    )],
                    [mj(`$f_{20}(n) = \\sqrt{\\log{n}}$`)],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f21", mj(`$f_{21}(n) = \\log{n!}$`)),
            br(),
            div(
                frag(
                    "Let's first reconsider ", mj("$\\log{n!}$", " in a different form:")
                ),
                mj(`$$
                    \\log(n!) = \\log{(1 \\cdot 2 \\cdot 3 \\ldots \\cdot n)}
                $$`),
                frag(
                    "By the rule of multiplication in logs ", mj(`$\\log{x \\cdot y} = log{x} + log{y}$`)
                ),
                mj(`$$
                    \\log{(1 \\cdot 2 \\cdot 3 \\ldots (\\frac{n}{2}) \\cdot (\\frac{n}{2} + 1) \\cdot n)} = \\log{1} + \\log{2} + \\log{3} + \\ldots + \\log{n}
                $$`),
                frag(
                    "This is a sum containing ", mj(`$n$`), " elements and we can very clearly see that: "
                ),
                mj(`$$
                    \\log{1} + \\log{2} + \\log{3} + \\ldots + \\log{n} <= \\log{n} + \\log{n} + \\log{n} + \\ldots + \\log{n}
                $$`),
                frag(
                    "Where on the right hand side we are summing up ", mj(`$\\log{n}$`), " ", mj(`$\\log{n}$`), " times to match the element count. Thus:"
                ),
                mj(`$$
                    \\log{1} + \\log{2} + \\log{3} + \\ldots + \\log{n} <= n \\cdot \\log{n}
                $$`),
                frag(
                    "This is an upperbound, therefore:"
                ),
                mj(`$$
                    \\log{n!} = O(n\\log{n})
                $$`),
                br(),
                frag(
                    mj(`$n\\log{n}$`), " is smaller than ", mj(`$f_4(n) = n^2$`), " asymtopically."
                ),
                frag(
                    mj(`$n\\log{n}$`), " is larger than ", mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`), " asymtopically."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_{15}(n) = 2^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [ul(
                        mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`),
                        mj(`$f_{17}(n) = (\\log{n})^{\\log{n}}$`)
                    )],
                    [ul(
                        mj(`$f_4(n) = n^2$`),
                        mj(`$f_{18}(n) = 4^{\\log{n}}$`)
                    )],
                    [mj(`$f_{21}(n) = \\log{n!}$`)],
                    [ul(
                        mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`),
                        mj(`$f_{16}(n) = 2^{\\log{n}} = n$`)
                    )],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`),
                        mj(`$f_{14}(n) = \\log{n^2}$`),
                        mj(`$f_{19}(n) = log_{(\\log_{5}{25})}{n}$`)
                    )],
                    [mj(`$f_{20}(n) = \\sqrt{\\log{n}}$`)],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),

            h(1, "f22", mj(`$f_{22}(n) = 2^{\\sqrt{2\\log{n}}}$`)),
            br(),
            div(
                frag(
                    "Let's first reconsider ", mj("$2^{\\sqrt{2\\log{n}}}$", " in a different form:")
                ),
                
                br(),
                frag(
                    mj(`$n\\log{n}$`), " is smaller than ", mj(`$f_4(n) = n^2$`), " asymtopically."
                ),
                frag(
                    mj(`$n\\log{n}$`), " is larger than ", mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`), " asymtopically."
                ),
                br(), br(),
                center(t(undefined, 
                    [mj(`$f_9(n) = 2^{2^n}$`)],
                    [mj(`$f_5(n) = n^n$`)],
                    [mj(`$f_{12}(n) = n \\cdot 2^{n}$`)],
                    [mj(`$f_{15}(n) = 2^n$`)],
                    [mj(`$f_1(n) = (3/2)^n$`)],
                    [ul(
                        mj(`$f_{13}(n) = n^{\\log{\\log{n}}}$`),
                        mj(`$f_{17}(n) = (\\log{n})^{\\log{n}}$`)
                    )],
                    [ul(
                        mj(`$f_4(n) = n^2$`),
                        mj(`$f_{18}(n) = 4^{\\log{n}}$`)
                    )],
                    [mj(`$f_{21}(n) = \\log{n!}$`)],
                    [ul(
                        mj(`$f_8(n) = n^{\\log_{3}{3}} = n$`),
                        mj(`$f_{16}(n) = 2^{\\log{n}} = n$`)
                    )],
                    [mj(`$f_2(n) = (\\sqrt{2})^{\\log{n}} = \\sqrt{n}$`)],
                    [mj(`$f_7(n) = \\log^2{n}$`)],
                    [ul(
                        mj(`$f_3(n) = \\log{n}$`),
                        mj(`$f_6(n) = \\ln{n}$`),
                        mj(`$f_{14}(n) = \\log{n^2}$`),
                        mj(`$f_{19}(n) = log_{(\\log_{5}{25})}{n}$`)
                    )],
                    [mj(`$f_{20}(n) = \\sqrt{\\log{n}}$`)],
                    [mj(`$f_{11}(n) = \\log{\\log{n}}$`)],
                    [mj(`$f_{10}(n) = n^{\\frac{1}{\\log{n}}} = 2$`)],
                ))
            ),
        );
    }, rhuDocuscript);
});