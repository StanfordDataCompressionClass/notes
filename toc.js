// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="contents.html">EE274: Data Compression, course notes</a></li><li class="chapter-item expanded "><a href="lossless_iid/coverpage.html"><strong aria-hidden="true">1.</strong> Lossless data compression: basics</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="lossless_iid/intro.html"><strong aria-hidden="true">1.1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="lossless_iid/prefix_free_codes.html"><strong aria-hidden="true">1.2.</strong> Prefix Free Codes</a></li><li class="chapter-item expanded "><a href="lossless_iid/kraft_ineq_and_optimality.html"><strong aria-hidden="true">1.3.</strong> Kraft Inequality</a></li><li class="chapter-item expanded "><a href="lossless_iid/entropy.html"><strong aria-hidden="true">1.4.</strong> Entropy and Neg-log likelihood thumb rule</a></li><li class="chapter-item expanded "><a href="lossless_iid/huffman.html"><strong aria-hidden="true">1.5.</strong> Huffman coding</a></li><li class="chapter-item expanded "><a href="lossless_iid/aep.html"><strong aria-hidden="true">1.6.</strong> Asymptotic Equipartition Property</a></li><li class="chapter-item expanded "><a href="lossless_iid/arithmetic_coding.html"><strong aria-hidden="true">1.7.</strong> Arithmetic coding</a></li><li class="chapter-item expanded "><a href="lossless_iid/ans.html"><strong aria-hidden="true">1.8.</strong> Asymmetric Numeral Systems</a></li><li class="chapter-item expanded "><a href="lossless_iid/non_iid_sources.html"><strong aria-hidden="true">1.9.</strong> Non IID Sources and Entropy Rate</a></li><li class="chapter-item expanded "><a href="lossless_iid/context_based_coding.html"><strong aria-hidden="true">1.10.</strong> Context-based coding</a></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded "><a href="lossy/coverpage.html"><strong aria-hidden="true">2.</strong> Lossy data Compression</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="lossy/quant.html"><strong aria-hidden="true">2.1.</strong> Basics and Quantization</a></li><li class="chapter-item expanded "><a href="lossy/rd.html"><strong aria-hidden="true">2.2.</strong> Rate-Distortion Theory</a></li><li class="chapter-item expanded "><a href="lossy/transform_coding_theory.html"><strong aria-hidden="true">2.3.</strong> Transform Coding Theory</a></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded "><a href="resources.html"><strong aria-hidden="true">3.</strong> Resources</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="homeworks/coverpage.html"><strong aria-hidden="true">4.</strong> Homeworks</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="projects.html"><strong aria-hidden="true">5.</strong> Project</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="scl_tutorial/SCL_tutorial.html"><strong aria-hidden="true">6.</strong> SCL Tutorial</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="scl_tutorial/basics.html"><strong aria-hidden="true">6.1.</strong> SCL Basics</a></li><li class="chapter-item expanded "><a href="scl_tutorial/exercise.html"><strong aria-hidden="true">6.2.</strong> SCL Exercise</a></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded "><a href="quiz_problems_2023.html"><strong aria-hidden="true">7.</strong> Quiz Problems (2023)</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
