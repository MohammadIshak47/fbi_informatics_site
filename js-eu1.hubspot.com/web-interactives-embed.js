! function(e) {
    var t = {};

    function i(s) {
        if (t[s]) return t[s].exports;
        var n = t[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        e[s].call(n.exports, n, n.exports, i);
        n.l = !0;
        return n.exports
    }
    i.m = e;
    i.c = t;
    i.d = function(e, t, s) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: s
        })
    };
    i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        });
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    };
    i.t = function(e, t) {
        1 & t && (e = i(e));
        if (8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var s = Object.create(null);
        i.r(s);
        Object.defineProperty(s, "default", {
            enumerable: !0,
            value: e
        });
        if (2 & t && "string" != typeof e)
            for (var n in e) i.d(s, n, function(t) {
                return e[t]
            }.bind(null, n));
        return s
    };
    i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        i.d(t, "a", t);
        return t
    };
    i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    };
    i.p = "//static.hsappstatic.net/web-interactives-embed/static-2.1137/";
    i(i.s = 3)
}({
    3: function(e, t, i) {
        "use strict";
        i.r(t);
        var s = {
            RECEIVED_ANALYTICS: "HS_CTA_PARENT_RECEIVED_ANALYTICS",
            DEVICE_TYPE: "HS_CTA_PARENT_DEVICE_TYPE",
            PROXY_ANALYTICS_FN_CALLBACK: "HS_CTA_PARENT_PROXY_ANALYTICS_FN",
            INIT: "HS_CTA_PARENT_INIT",
            SHOWING_CTA: "HS_CTA_SHOWING_CTA",
            STARTED: "HS_CTA_STARTED",
            NAVIGATE_PAGE: "HS_CTA_NAVIGATE_PAGE",
            CLICK_EVENT: "HS_CTA_CLICK_EVENT",
            CLOSE_INTERACTIVE: "HS_CTA_CLOSE_INTERACTIVE",
            HAS_CLOSED: "HS_CTA_HAS_CLOSED",
            NEW_HEIGHT: "HS_CTA_NEW_HEIGHT",
            DISPLAY_CALL_TO_ACTION: "HS_DISPLAY_CALL_TO_ACTION",
            PROXY_ANALYTICS: "HS_CTA_PROXY_ANALYTICS",
            PROXY_ANALYTICS_FN: "HS_CTA_PROXY_ANALYTICS_FN",
            SEND_FORM_DEFINITION: "HS_SEND_FORM_DEFINITION",
            SEND_CTA_CONFIG: "HS_SEND_CTA_CONFIG",
            SEND_EMBED_CONTEXT: "HS_SEND_EMBED_CONTEXT",
            RECEIVE_FILTERED_STYLESHEETS: "RECEIVE_FILTERED_STYLESHEETS",
            SEND_STYLESHEETS: "SEND_STYLESHEETS",
            RENDER_RECAPTCHA: "RENDER_RECAPTCHA",
            EXECUTE_RECAPTCHA: "EXECUTE_RECAPTCHA",
            RESET_RECAPTCHA: "RESET_RECAPTCHA",
            RECAPTCHA_SUCCESS: "RECAPTCHA_SUCCESS",
            RECAPTCHA_EXPIRED: "RECAPTCHA_EXPIRED",
            TRIGGER_CTA: "HS_CTA_TRIGGER_CTA",
            CTA_FORM_SUBMITTED: "HS_CTA_FORM_SUBMITTED"
        };

        function n(e, t = {}) {
            for (const i in t) Object.hasOwnProperty.call(t, i) && (e.style[i] = t[i])
        }

        function o(...e) {
            if (window.location.search.indexOf("hs_debug_interactive") > -1 || window.location.host.includes("local.hsappstatic")) {
                console.log("[web-interactives-embed]", ...e);
                window.location.search.indexOf("hs_is_selenium") > -1 && console.log(...[...e].map(e => JSON.stringify(e)))
            }
        }
        class r {
            constructor() {
                this.listeners = new Map
            }
            on(e, t) {
                if (!this.listeners.has(e)) {
                    this.listeners.set(e, [t]);
                    return
                }
                const i = this.listeners.get(e);
                this.listeners.set(e, [...i, t])
            }
            off(e) {
                this.listeners.delete(e)
            }
            emit(e, t) {
                const i = this.listeners.get(e);
                i && i.length && i.forEach(e => e(t))
            }
            reset() {
                this.listeners = new Map
            }
        }

        function a() {
            return new r
        }
        const c = (...e) => {
            o("[GlobalIframeCommunication]", ...e)
        };
        class l {
            constructor() {
                this.iframeCommunicators = new Map;
                this.eventEmitter = a();
                this.reset = () => {
                    this.eventEmitter.reset();
                    this.iframeCommunicators = new Map
                }
            }
            registerHandler(e, t) {
                this.eventEmitter.on(e, t)
            }
            registerHandlers(e) {
                c("Registering handlers", e);
                Object.keys(e).forEach(t => {
                    const i = t,
                        s = e[i];
                    s && this.registerHandler(i, s)
                })
            }
            registerCommunicator(e, t) {
                c("Registering communicator", t);
                const i = this.iframeCommunicators.get(t) || [];
                this.iframeCommunicators.set(t, [...i, e])
            }
            removeCommunicator(e) {
                c("Removing Iframe Communicator from GlobalCommunication: ", e);
                this.iframeCommunicators.delete(e)
            }
            emit(e, t) {
                c("Emitting event", {
                    event: e,
                    messagePayload: t
                });
                this.eventEmitter.emit(e, t)
            }
            broadcast(e, t) {
                const i = this.iframeCommunicators.get(e);
                if (i) {
                    c("Broadcasting", i);
                    i.forEach(e => {
                        e.sendMessage(t)
                    })
                } else c("Cannot find communcators array, not broadcasting", e, t)
            }
            broadcastAll(e) {
                c("Broadcasting", e, "to all", this.iframeCommunicators);
                for (const [t, i] of this.iframeCommunicators) this.broadcast(t, e)
            }
        }
        var h = new l;

        function d() {
            return new MessageChannel
        }
        const u = (...e) => {
            o("[iframeCommunication]", ...e)
        };
        class m {
            constructor(e, t) {
                this.queue = [];
                this.initialised = !1;
                this.events = new Map;
                this.eventEmitter = a();
                this.handleMessage = e => {
                    if (!e.data || !e.data.type) return;
                    const {
                        type: t,
                        payload: i
                    } = e.data;
                    u("Handling message", {
                        type: t,
                        payload: i
                    });
                    this.eventEmitter.emit(t, i);
                    h.emit(t, Object.assign({}, i, {
                        id: this.id
                    }))
                };
                this.handleFrameLoaded = () => {
                    if (this.iframe.contentWindow) {
                        u("Iframe loaded", this.iframe);
                        this.iframe.contentWindow.postMessage({
                            type: s.INIT
                        }, "*", [this.channel.port2]);
                        this.initialised = !0;
                        this.flushQueue()
                    } else u("Content window not there, not loading")
                };
                this.iframe = e;
                this.id = t;
                this.channel = d();
                this.channel.port1.onmessage = this.handleMessage;
                this.iframe.addEventListener("load", this.handleFrameLoaded);
                u("Iframe communication set up", t, e)
            }
            sendMessage({
                type: e,
                payload: t
            }) {
                if (this.initialised) {
                    u("Posting message", {
                        type: e,
                        payload: t
                    });
                    this.channel.port1.postMessage({
                        type: e,
                        payload: t
                    })
                } else {
                    u("Queueing message", {
                        type: e,
                        payload: t
                    });
                    this.queue.push({
                        type: e,
                        payload: t
                    })
                }
            }
            registerHandler(e, t) {
                this.eventEmitter.off(e);
                this.eventEmitter.on(e, t)
            }
            registerHandlers(e) {
                u("Registering handlers in IframeCommunication", e);
                Object.keys(e).forEach(t => {
                    const i = t,
                        s = e[i];
                    s && this.registerHandler(i, s)
                })
            }
            removeHandler(e) {
                u("Removing handler", e);
                this.eventEmitter.off(e)
            }
            remove() {
                u("Removing frame communicator:", this.id);
                this.channel.port1.close();
                h.removeCommunicator(this.id)
            }
            flushQueue() {
                if (this.initialised) {
                    u("Flushing queue", this.queue);
                    this.queue.forEach(e => {
                        this.sendMessage(e)
                    })
                } else u("Not flushing queue, not initialised")
            }
        }

        function g(e, t) {
            u("Creating iframe communication");
            const i = new m(e, t);
            h.registerCommunicator(i, t);
            return i
        }

        function p(e) {
            const t = window.location.origin.startsWith("http:") ? "http://" : "https://";
            return e.startsWith(t) ? e : `${t}${e.replace(/http(s)?:\/\//,"")}`
        }

        function f(e) {
            e.style.border = "none";
            e.style.height = "100%";
            e.style.width = "100%";
            e.style.visibility = "hidden"
        }

        function v(e, t) {
            const i = document.createElement("iframe");
            i.src = p(e);
            Object.keys(t).forEach(e => {
                i.setAttribute(e, t[e])
            });
            f(i);
            return i
        }

        function C(e, t, i) {
            e.startsWith("http") || (e = "https://" + e);
            const s = new URL(e);
            s.searchParams.set(t, i);
            return s.href
        }

        function T(e, t) {
            e.startsWith("http") || (e = "https://" + e);
            if (0 === Object.keys(t).length) return e;
            const i = new URL(e);
            Object.keys(t).forEach(e => i.searchParams.set(e, t[e]));
            return i.href
        }

        function b(e, t) {
            return e.replace(/#.*$/, "") === t.replace(/#.*$/, "")
        }
        const y = (...e) => {
                o("[FrameComponent]", ...e)
            },
            w = () => {};
        class E {
            constructor({
                id: e,
                container: t,
                iframeSrc: i,
                resizeHeight: s,
                onFrameReady: n,
                useResponsiveStyling: o,
                extraAttributes: r = {}
            }) {
                this.onFrameReady = w;
                this.resizeHeight = !0;
                this.handleHeightChange = ({
                    height: e
                }) => {
                    if (!this.resizeHeight) return;
                    const t = e + 2 * parseInt(getComputedStyle(this.iframe).borderTopWidth, 10);
                    y("Handle height change", this.id, {
                        adjustedHeight: t,
                        height: e
                    });
                    this.setContainerStyle({
                        height: t + "px"
                    })
                };
                this.id = e || 1;
                this.resizeHeight = s;
                if (o) {
                    y("Responsive styling is enabled", e);
                    i = C(i, "enableResponsiveStyles", "true")
                }
                this.iframe = v(i, r);
                this.container = t;
                this.iframeCommunicator = g(this.iframe, e || 1);
                n && (this.onFrameReady = n);
                t.appendChild(this.iframe);
                this.registerHandlers()
            }
            registerHandlers() {
                this.iframeCommunicator.registerHandlers({
                    [s.STARTED]: this.onFrameReady,
                    [s.NEW_HEIGHT]: this.handleHeightChange
                })
            }
            setStyle(e) {
                y("Set style", this.id, e);
                n(this.iframe, e)
            }
            setShouldResize(e) {
                this.resizeHeight = e
            }
            setContainerStyle(e) {
                n(this.container, e)
            }
        }

        function S(e) {
            return new E(e)
        }
        class A {
            constructor(e, t) {
                this.listeners = new Set;
                this.batching = !1;
                this.queue = [];
                this.subscribe = e => {
                    this.listeners.add(e);
                    let t = () => {};
                    this.options && this.options.onSubscribe && (t = this.options.onSubscribe(e, this));
                    return () => {
                        this.listeners.delete(e);
                        t()
                    }
                };
                this.setState = e => {
                    const t = this.state;
                    this.options && this.options.updateFn ? this.state = this.options.updateFn(t)(e) : this.state = e(t);
                    if (this.state !== t) {
                        this.queue.push(() => {
                            this.listeners.forEach(e => e(this.state, t));
                            this.options && this.options.onUpdate && this.options.onUpdate(this.state, t)
                        });
                        this._flush()
                    }
                };
                this._flush = () => {
                    if (!this.batching) {
                        this.queue.forEach(e => e());
                        this.queue = []
                    }
                };
                this.batch = e => {
                    this.batching = !0;
                    e();
                    this.batching = !1;
                    this._flush()
                };
                this.state = e;
                this.options = t
            }
        }
        class I {
            constructor() {
                this.storage = []
            }
            enqueue(e) {
                this.storage.push(e)
            }
            dequeue() {
                return this.storage.shift()
            }
            peek() {
                return this.storage[0]
            }
            size() {
                return this.storage.length
            }
        }

        function M() {
            return new I
        }
        const O = "hubspotutk",
            P = "__hstc",
            _ = "__hssc",
            L = e => {
                const t = document.cookie.match(`(^|[^;]+)\\s*${e}\\s*=\\s*([^;]+)`);
                return t ? t.pop() : ""
            },
            F = () => L(O),
            R = () => L(P),
            N = () => L(_),
            k = (...e) => {
                o("[models/Analytics]", ...e)
            };
        class H {
            constructor() {
                this._handleFetchSucceded = e => {
                    this.store.setState(t => {
                        const i = {};
                        i.path = e.path;
                        i.referrerPath = e.referrerPath;
                        i.referrer = "";
                        i.analyticsPageId = e.pageId;
                        i.hsfp = e._getFingerprint();
                        i.canonicalUrl = e.canonicalUrl;
                        i.contentType = e.contentType;
                        i.pageId = H.getPageId() || e.pageId;
                        e.session && (i.hssc = e.session.get());
                        if (e.utk) {
                            i.hstc = e.utk.get();
                            i.hutk = e.utk.visitor
                        }
                        return Object.assign({}, t, i, {
                            isLoaded: !0
                        })
                    })
                };
                window._hsq = window._hsq || [];
                const e = {
                    isLoaded: !1,
                    pageUrl: window.location.href,
                    pageTitle: window.document.title,
                    referrer: window.document.referrer,
                    userAgent: window.navigator.userAgent,
                    hutk: F(),
                    hssc: N(),
                    hstc: R(),
                    pageId: H.getPageId()
                };
                this.store = new A(e);
                this.fetchAnalytics()
            }
            fetchAnalytics() {
                this._analyticsQueue.push(this._handleFetchSucceded)
            }
            subscribe(e) {
                return this.store.subscribe(e)
            }
            get analytics() {
                return this.store.state
            }
            track(e) {
                k("Tracking analytics", e);
                this._analyticsQueue.push(e)
            }
            get _analyticsQueue() {
                return window._hsq
            }
            static getPageId() {
                const e = window.hsVars;
                return e && e.analytics_page_id ? e.analytics_page_id : e && e.page_id ? e.page_id : null
            }
            static getLanguage() {
                const e = window.hsVars;
                return e && e.language ? e.language : null
            }
        }
        var D = new H;
        const B = (...e) => {
                o("[AnalyticsProxyController]", ...e)
            },
            V = ["trackFormView", "trackFormVisible", "trackFormInteraction"];
        class x {
            constructor({
                applicationController: e,
                analyticsStore: t
            }) {
                this.viewQueue = new Map;
                this.applicationController = e;
                this.analyticsStore = t;
                this.listenForAnalyticsUpdate();
                this.listenForProxyMessage()
            }
            listenForAnalyticsUpdate() {
                this.analyticsStore.subscribe((e, t) => {
                    !t.isLoaded && e.isLoaded && h.broadcastAll({
                        type: s.RECEIVED_ANALYTICS,
                        payload: e
                    })
                })
            }
            flushViewQueue(e) {
                const t = this.viewQueue.get(e) || [];
                for (const e of t) this.analyticsStore.track(e);
                this.viewQueue.delete(e)
            }
            handleFormView(e, t) {
                const i = this.applicationController.viewedStore;
                if (i && i.hasBeenViewed(e)) {
                    this.analyticsStore.track(t);
                    return
                }
                const s = this.viewQueue.get(e) || [];
                B("Adding form view to analytics queue", {
                    id: e,
                    analytics: t
                });
                this.viewQueue.set(e, [...s, t])
            }
            listenForProxyMessage() {
                h.registerHandlers({
                    [s.PROXY_ANALYTICS]: ({
                        analytics: e,
                        id: t
                    }) => {
                        x.isFormView(e) ? this.handleFormView(t, e) : this.analyticsStore.track(e)
                    }
                })
            }
            static isFormView(e) {
                const [t] = e;
                return V.includes(t)
            }
        }

        function $(e, t = !1) {
            if (t) {
                const t = window.open(e, "_blank");
                t ? t.focus() : window.location.assign(e)
            } else window.location.assign(e)
        }
        class U {
            constructor({
                applicationController: e
            }) {
                this.applicationController = e;
                this.listenForNavigation()
            }
            listenForNavigation() {
                h.registerHandlers({
                    [s.NAVIGATE_PAGE]: ({
                        url: e,
                        openNewTab: t,
                        id: i
                    }) => {
                        $(this.applicationController.getNavigationUrl({
                            url: e,
                            openNewTab: t
                        }, i), this.applicationController.getShouldOpenNewTab({
                            url: e,
                            openNewTab: t
                        }, i))
                    }
                })
            }
        }
        class G {
            constructor() {
                this.analyticsStore = D;
                this.analyticsProxyController = new x({
                    analyticsStore: this.analyticsStore,
                    applicationController: this
                });
                this.navigationProxyController = new U({
                    applicationController: this
                })
            }
            getNavigationUrl(e, t) {
                return e.url
            }
            getShouldOpenNewTab(e, t) {
                return e.openNewTab
            }
        }
        class j {
            constructor() {
                this.handleIntersection = e => {
                    e.forEach(e => {
                        if (e.isIntersecting) {
                            const t = e.target;
                            this.onElementAppear(t);
                            this.observedElements.delete(t);
                            this.observer.unobserve(t)
                        }
                    })
                };
                this.observer = new IntersectionObserver(this.handleIntersection, {
                    threshold: .5
                });
                this.observedElements = new Map
            }
            onElementAppear(e) {
                const t = this.observedElements.get(e);
                t && t(e)
            }
            observe(e, t) {
                if ((() => {
                        const t = e.getBoundingClientRect(),
                            i = window.innerHeight;
                        return t.bottom >= 0 && t.top < i
                    })()) t(e);
                else if (!this.observedElements.has(e)) {
                    this.observedElements.set(e, t);
                    this.observer.observe(e)
                }
            }
            unobserve(e) {
                if (this.observedElements.has(e)) {
                    this.observedElements.delete(e);
                    this.observer.unobserve(e)
                }
            }
        }

        function q() {
            return new j
        }

        function W(e, t) {
            const i = [...e].filter(([e, i]) => t(i, e));
            return new Map(i)
        }

        function z(e, t) {
            const i = [...e].sort(([e, i], [s, n]) => t(i, n));
            return new Map(i)
        }

        function Y(e, t) {
            const i = new Map(e);
            for (const [e, s] of t) i.set(e, s);
            return i
        }

        function Q(e) {
            const t = t => {
                "Escape" === t.key && e()
            };
            document.addEventListener("keydown", t);
            return () => {
                document.removeEventListener("keydown", t)
            }
        }

        function X(e, t) {
            let i, s = 0;
            return function() {
                const n = this,
                    o = arguments,
                    r = Date.now();
                if (r - s >= t) {
                    i && window.clearTimeout(i);
                    e.apply(n, o);
                    s = r
                } else i || (i = window.setTimeout(() => {
                    e.apply(n, o);
                    s = Date.now();
                    i = void 0
                }, t))
            }
        }
        const K = {
                BANNER: "BANNER",
                MODAL: "MODAL",
                SLIDE_IN: "SLIDE_IN",
                EMBEDDED: "EMBEDDED"
            },
            J = ["previewInteractiveId", "preview_web_interactive", "preview_key", "_preview", "portalId", "hs_preview"];

        function Z() {
            const e = new URLSearchParams(window.location.search),
                t = {};
            e.forEach((e, i) => {
                J.includes(i) || (t[i] = e)
            });
            return t
        }

        function ee({
            contentId: e,
            portalId: t,
            env: i,
            hublet: s,
            useSameOrigin: n = !1
        }) {
            const o = "qa" === i ? "qa" : "",
                r = "na1" === s ? "" : "-" + s,
                a = document.location.protocol;
            return n ? `${window.location.origin}/hs-web-interactive-${t}-${e}` : `${a}//${t}.hs-sites${o}${r}.com/hs-web-interactive-${t}-${e}`
        }

        function te(e, t, i) {
            let s = {};
            t.contactPreviewEmail && (s.email = t.contactPreviewEmail);
            const n = i.analytics && i.analytics.hutk;
            n && (s.utk = n);
            window.location.search.includes("hs_debug_interactive") && (s.hs_debug_interactive = "true");
            if (t.isUngatedFor("WebInteractives:FormsPassThroughParams")) {
                const e = Z();
                s = Object.assign({}, e, s)
            }
            return T(e, s)
        }

        function ie(e, t) {
            if (null == e) return {};
            var i, s, n = {},
                o = Object.keys(e);
            for (s = 0; s < o.length; s++) {
                i = o[s];
                t.indexOf(i) >= 0 || (n[i] = e[i])
            }
            return n
        }

        function se(e, t) {
            t.hutk && e.searchParams.set("utk", "" + t.hutk);
            t.hstc && e.searchParams.set("__hstc", "" + t.hstc);
            t.hssc && e.searchParams.set("__hssc", "" + t.hssc);
            t.referrer && e.searchParams.set("referrer", "" + t.referrer);
            t.pageId && e.searchParams.set("contentId", t.pageId)
        }

        function ne({
            contentIds: e,
            currentUrl: t,
            isPreview: i,
            portalId: s,
            env: n,
            hublet: o = "na1",
            versionId: r,
            analytics: a,
            extraParams: c,
            path: l
        }) {
            const h = "qa" === n ? "qa" : "";
            let d = "";
            d = window.location.search.includes("useLocalPublicService") ? "https://local.hubspotqa.com/web-interactives/public/v1/" + l : "na1" === o ? `https://cta-service-cms2.hubspot${h}.com/web-interactives/public/v1/${l}` : `https://cta-${o}.hubspot${h}.com/web-interactives/public/v1/${l}`;
            const u = new URL(d);
            i && u.searchParams.set("isPreview", "true");
            e && e.length && e.forEach(e => u.searchParams.append("contentIds", "" + e));
            s && u.searchParams.set("portalId", "" + s);
            t && !i && u.searchParams.set("currentUrl", t);
            r && u.searchParams.set("versionId", "" + r);
            a && !i && se(u, a);
            c && Object.keys(c).forEach(e => u.searchParams.set(e, "" + c[e]));
            return u.href
        }
        const oe = ["previewScheduled", "templatePath", "isMobile"],
            re = "embed/combinedConfigs",
            ae = "embed/templateConfig";

        function ce(e) {
            let {
                previewScheduled: t,
                templatePath: i,
                isMobile: s
            } = e, n = ie(e, oe), o = "";
            o = i ? ae : re;
            const r = {};
            t && (r.previewScheduled = "true");
            i && (r.templatePath = i);
            s && (r.isMobile = "true");
            return ne(Object.assign({}, n, {
                extraParams: r,
                path: o
            }))
        }
        const le = {
                TOP: "TOP",
                BOTTOM: "BOTTOM",
                TOP_LEFT: "TOP_LEFT",
                TOP_RIGHT: "TOP_RIGHT",
                BOTTOM_LEFT: "BOTTOM_LEFT",
                BOTTOM_RIGHT: "BOTTOM_RIGHT"
            },
            he = (e, t = 1) => {
                if (!e) return {
                    r: null,
                    g: null,
                    b: null,
                    a: t
                };
                if (3 === (e = e.replace("#", "")).length) {
                    const t = e.split("").reduce((e, t) => e + t + t, "");
                    e = t
                }
                return {
                    r: parseInt(e.substring(0, 2), 16),
                    g: parseInt(e.substring(2, 4), 16),
                    b: parseInt(e.substring(4, 6), 16),
                    a: t
                }
            },
            de = (e, t = 1) => {
                const i = he(e, t);
                return `rgba(${i.r}, ${i.g}, ${i.b}, ${i.a})`
            };
        class ue {
            constructor() {
                this.fetchConfigs = () => {
                    const e = this.store.state.configRequest;
                    if (!e) return Promise.resolve(null);
                    const t = ce(e);
                    return this.fetch(t)
                };
                this.handleFetchFailed = () => {
                    this.store.setState(e => Object.assign({}, e, {
                        requestError: !0
                    }))
                };
                this.handleFetchSucceded = ({
                    sortedAudienceConfigs: e,
                    requestedConfigs: t
                }) => {
                    const i = structuredClone(this.configs);
                    e && e.length && e.forEach(e => i.set(e.contentModelId, e));
                    t && t.length && t.forEach(e => {
                        i.has(e.contentModelId) || i.set(e.contentModelId, e)
                    });
                    this.store.setState(e => Object.assign({}, e, {
                        configs: i,
                        isLoaded: !0
                    }))
                };
                this.handleTemplateSucceded = e => {
                    this.store.setState(t => Object.assign({}, t, {
                        templateConfig: e,
                        isLoaded: !0
                    }))
                };
                const e = {
                    configs: new Map,
                    configRequest: null,
                    requestError: !1,
                    isLoaded: !1
                };
                this.store = new A(e)
            }
            init(e) {
                this.store.setState(t => Object.assign({}, t, {
                    configRequest: e
                }));
                return this.fetchConfigs()
            }
            subscribe(e) {
                return this.store.subscribe(e)
            }
            get configs() {
                return this.store.state.configs
            }
            get isLoaded() {
                return this.store.state.isLoaded
            }
            get sortedConfigsWithSpecificty() {
                return z(this.configsWithAudience, (e, t) => t.specificity - e.specificity)
            }
            get configsWithAudience() {
                return W(this.configs, e => e.specificity > 0)
            }
            get overlayedConfigsWithNoAudience() {
                return W(this.overlayedConfigs, e => !e.specificity)
            }
            get overlayedConfigs() {
                return W(this.configs, e => e.containerType !== K.EMBEDDED)
            }
            get embeddedConfigs() {
                const e = W(this.configs, e => e.containerType === K.EMBEDDED);
                this.templateConfig && this.templateConfig.containerType === K.EMBEDDED && e.set(1, this.templateConfig);
                return e
            }
            get templateConfig() {
                return this.store.state.templateConfig
            }
            get previewConfig() {
                const [e] = this.store.state.configs.values();
                return e
            }
            fetch(e) {
                return fetch(e).then(e => {
                    if (!e.ok) {
                        this.handleFetchFailed();
                        return Promise.resolve(null)
                    }
                    return e.json().then(e => {
                        e.templatePath ? this.handleTemplateSucceded(e) : this.handleFetchSucceded(e);
                        return e
                    }).catch(this.handleFetchFailed)
                }).catch(this.handleFetchFailed)
            }
            fetchConfigsWithIds(e) {
                const t = this.store.state.configRequest;
                if (!t) return;
                const i = ce(Object.assign({}, t, {
                    contentIds: e
                }));
                this.fetch(i)
            }
            static getStylesFromContainerStyles(e) {
                let t = e.width.value || 5,
                    i = e.height.value || 5;
                "px" === e.width.units && (t = Math.max(t, 5));
                "px" === e.height.units && (i = Math.max(i, 5));
                return {
                    width: `${t}${e.width.units}`,
                    height: `${i}${e.height.units}`
                }
            }
            static getStylesForIframe(e) {
                const t = {},
                    {
                        border: i,
                        borderRadius: s,
                        boxShadow: n
                    } = e;
                i && (t.border = `${i.width.value}${i.width.units} ${i.style} ${de(i.color,i.opacity/100)}`);
                n && n.css && (t.boxShadow = n.css.split(":")[1]);
                s && (t.borderRadius = `${s.value}${s.units}`);
                return t
            }
            static isFloatingButtonLike(e) {
                return "isDismissable" in e && (e.containerType === K.SLIDE_IN && !e.isDismissable)
            }
            static isTopBannerLike(e) {
                return e.containerType === K.BANNER && e.containerStyles.position === le.TOP
            }
            static buildConfigRequest(e, t = [], i) {
                const {
                    isPreview: s,
                    currentUrl: n,
                    portalId: o,
                    env: r,
                    hublet: a,
                    isMobile: c,
                    templatePath: l,
                    versionId: h
                } = e;
                return {
                    contentIds: t,
                    currentUrl: n,
                    portalId: o,
                    env: r,
                    hublet: a,
                    analytics: Object.assign({}, i),
                    isMobile: c,
                    isPreview: s,
                    templatePath: l,
                    versionId: h
                }
            }
        }
        var me = new ue;
        const ge = () => document.getElementById("hubspot-web-interactives-loader"),
            pe = (e, t) => {
                if (!t) return null;
                const i = t.getAttribute(e);
                return i || null
            },
            fe = e => {
                const t = pe("data-hsjs-portal", e);
                return t ? parseInt(t, 10) : null
            },
            ve = e => {
                const t = pe("data-hsjs-env", e);
                return t || "prod"
            },
            Ce = e => {
                const t = pe("data-hsjs-hublet", e);
                return t || "na1"
            },
            Te = e => {
                const t = pe("data-hsjs-local", e);
                return !!t && "true" === t
            },
            be = e => pe("src", e),
            ye = () => {
                const e = ge();
                return e ? {
                    portalId: fe(e),
                    env: ve(e),
                    hublet: Ce(e),
                    isLocal: Te(e),
                    src: be(e)
                } : null
            },
            we = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            Ee = ["hs_preview", "preview_key"];
        class Se {
            constructor() {
                this.portalId = 0;
                this.env = "";
                this.hublet = "na1";
                this.isLocal = !1;
                this.isMobile = !1;
                this.isLiveHSPage = !1;
                this.pageId = null;
                this.language = null;
                this.isPreview = !1;
                this.isScreenshot = !1;
                this.isTemplate = !1;
                this.previewScheduled = !1;
                this.currentUrl = window.location.href;
                this.enableResponsiveStyles = !1;
                this.isPreviewPage = !1;
                this.gates = []
            }
            init() {
                this._setEnvProps();
                this._setUrlProps()
            }
            static getPageId() {
                return window.hsVars && window.hsVars.analytics_page_id ? window.hsVars.analytics_page_id : window.hsVars && window.hsVars.page_id ? window.hsVars.page_id : null
            }
            static getLanguage() {
                const e = window.hsVars;
                return e && e.language ? e.language : null
            }
            _setEnvProps() {
                const e = ye();
                this.portalId = e.portalId;
                this.hublet = e.hublet;
                this.env = e.env;
                this.isLocal = e.isLocal;
                this.isMobile = we();
                this.isPreviewPage = Ee.some(e => window.location.search.includes(e));
                this.pageId = Se.getPageId();
                this.isLiveHSPage = Boolean(this.pageId);
                this.language = Se.getLanguage()
            }
            isCosPreviewPage() {
                const e = window.location.toString();
                return /preview(-[^.]+)?\.hs-sites(qa)?(-[^.]+)?\.com/g.test(e) || /hubspotpreview(qa)?(-[^.]+)?/.test(e) || window.location.search.includes("hs_preview") || window.location.search.includes("preview_key")
            }
            isCos() {
                if (window.hsVars && window.hsVars.portal_id) return !0;
                return [...document.getElementsByTagName("meta")].some(e => "generator" === e.getAttribute("name") && "HubSpot" === e.getAttribute("content"))
            }
            _setUrlProps() {
                const e = new URLSearchParams(window.location.search);
                if (e.has("templatePath")) {
                    this.templatePath = e.get("templatePath");
                    this.isTemplate = !0
                }
                e.has("previewScheduled") && (this.previewScheduled = "true" === e.get("previewScheduled"));
                e.has("enableResponsiveStyles") && (this.enableResponsiveStyles = "true" === e.get("enableResponsiveStyles"));
                e.has("versionId") && (this.versionId = parseInt(e.get("versionId"), 10));
                if (e.has("screenshotBodyHeight")) {
                    this.screenshotBodyHeight = parseInt(e.get("screenshotBodyHeight"), 10);
                    this.isScreenshot = !0
                }
                if (e.has("publishedPreview")) {
                    this.isPreview = !0;
                    this.previewScheduled = !0;
                    this.versionId = -1
                }
                if (e.has("previewInteractiveId")) {
                    this.previewId = parseInt(e.get("previewInteractiveId"), 10);
                    this.isPreview = !0
                }
                this.isPreview && e.has("email") && (this.contactPreviewEmail = e.get("email"));
                this.currentUrl = window.location.href
            }
            setGates(e) {
                this.gates = e
            }
            isUngatedFor(e) {
                return this.gates.includes(e)
            }
            refresh() {
                this._setUrlProps()
            }
        }
        var Ae = new Se;
        class Ie {
            constructor() {
                this.markAsViewed = e => {
                    this.store.setState(t => Object.assign({}, t, {
                        viewed: new Set([...t.viewed, e])
                    }))
                };
                const e = {
                    viewed: new Set
                };
                this.store = new A(e)
            }
            subscribe(e) {
                this.store.subscribe(e)
            }
            hasBeenViewed(e) {
                return this.store.state.viewed.has(e)
            }
            get viewed() {
                return this.store.state.viewed
            }
        }

        function Me() {
            return new Ie
        }
        const Oe = "hs-cta-trigger-button",
            Pe = "hs-cta-embed",
            _e = "web-interactives-preview-wrapper";
        var Le = () => Array.from(document.getElementsByClassName(Oe));
        var Fe = () => Array.from(document.getElementsByClassName(Pe));
        const Re = () => {
                try {
                    return Array.from(document.querySelectorAll("a[href*='HS_DISPLAY_CALL_TO_ACTION'"))
                } catch (e) {
                    return []
                }
            },
            Ne = e => {
                const t = e.getAttribute("href");
                if (!t) return null;
                const i = /\(([^)]+)\)/.exec(t);
                if (!i) return null;
                const s = i[1];
                return s ? JSON.parse(s.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ').replaceAll("'", '"')).id : null
            };
        var ke = e => {
            const t = Array.from(e.classList).filter(e => e.startsWith(Oe) && e !== Oe || e.startsWith(Pe) && e !== Pe).map(e => e.split("-").pop());
            let i = Number(t);
            if (Number.isNaN(i)) {
                const t = e.dataset.hubspotWrapperCtaId;
                i = Number(t)
            }
            return i
        };

        function He(e) {
            return Number(e.dataset.hubspotWrapperCtaId)
        }

        function De() {
            return Array.from(document.querySelectorAll(".hs-web-interactive-inline[data-hubspot-wrapper-cta-id]"))
        }
        const Be = () => {
                const e = new Map,
                    t = new Map,
                    i = new Map,
                    s = new Set,
                    n = new Set,
                    o = new Set;
                Le().forEach(t => {
                    const i = ke(t);
                    s.add(i);
                    const n = e.get(i);
                    n ? e.set(i, [...n, t]) : e.set(i, [t])
                });
                Fe().forEach(e => {
                    const i = ke(e);
                    n.add(i);
                    const s = t.get(i);
                    s ? t.set(i, [...s, e]) : t.set(i, [e])
                });
                Re().forEach(t => {
                    const i = Ne(t);
                    if (!i) return;
                    s.add(i);
                    const n = e.get(i);
                    n ? e.set(i, [...n, t]) : e.set(i, [t])
                });
                De().forEach((e, t) => {
                    const s = He(e);
                    if (!s) return;
                    e.id = `hs-interactive-container-${s}-${t}`;
                    o.add(s);
                    const n = i.get(s);
                    n ? i.set(s, [...n, e]) : i.set(s, [e])
                });
                const r = [...new Set([...s, ...n, ...o])];
                return {
                    clickTriggerButtons: e,
                    embedContainers: t,
                    nonFramedCTAContainers: i,
                    clickTriggerIds: s,
                    embedIds: n,
                    nonFramedIds: o,
                    uniqueIds: r
                }
            },
            Ve = (e, t) => {
                const i = document.createElement("div");
                i.innerHTML = t;
                return i.firstElementChild
            };
        let xe = {
                data: ""
            },
            $e = e => {
                try {
                    let t = e ? e.querySelector("#_goober") : self._goober;
                    return t || (t = (e || document.head).appendChild(document.createElement("style")), t.innerHTML = " ", t.id = "_goober"), t.firstChild
                } catch (e) {}
                return xe
            },
            Ue = /(?:([a-z0-9-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/gi,
            Ge = /\/\*.*?\*\/|\s{2,}|\n/gm,
            je = (e, t, i) => {
                let s = "",
                    n = "",
                    o = "";
                for (let r in e) {
                    let a = e[r];
                    if ("object" == typeof a) {
                        let e = t + " " + r;
                        /&/g.test(r) && (e = r.replace(/&/g, t)), "@" == r[0] && (e = t, "f" == r[1] && (e = r)), /@k/.test(r) ? n += r + "{" + je(a, "", "") + "}" : n += je(a, e, e == t ? r : i || "")
                    } else /^@i/.test(r) ? s = r + " " + a + ";" : o += je.p ? je.p(r.replace(/[A-Z]/g, "-$&").toLowerCase(), a) : r.replace(/[A-Z]/g, "-$&").toLowerCase() + ":" + a + ";"
                }
                if (o[0]) {
                    let e = t + "{" + o + "}";
                    return i ? n + i + "{" + e + "}" : s + e + n
                }
                return s + n
            },
            qe = {},
            We = (e, t, i, s) => {
                let n = e.toLowerCase ? e : function e(t) {
                        let i = "";
                        for (let s in t) "object" == typeof val ? i += s + e(t[s]) : i += s + t[s];
                        return i
                    }(e),
                    o = qe[n] || (qe[n] = ".go" + n.split("").reduce((e, t) => 101 * e + t.charCodeAt(0) >>> 0, 11));
                return ((e, t, i) => {
                    t.data.indexOf(e) < 0 && (t.data = i ? e + t.data : t.data + e)
                })(qe[o] || (qe[o] = je(e[0] ? (e => {
                    let t, i = [{}];
                    for (; t = Ue.exec(e.replace(Ge, ""));) t[4] && i.shift(), t[3] ? i.unshift(i[0][t[3]] = i[0][t[3]] || {}) : t[4] || (i[0][t[1]] = t[2]);
                    return i[0]
                })(e) : e, i ? "" : o)), t, s), o.slice(1)
            },
            ze = (e, t, i) => e.reduce((e, s, n) => {
                let o = t[n];
                if (o && o.call) {
                    let e = o(i),
                        t = e && e.props && e.props.className || /^go/.test(e) && e;
                    o = t ? "." + t : e && e.props ? "" : e
                }
                return e + s + (null == o ? "" : o)
            }, "");

        function Ye(e) {
            let t = this || {},
                i = e.call ? e(t.p) : e;
            return We(i.map ? ze(i, [].slice.call(arguments, 1), t.p) : i, $e(t.target), t.g, t.o)
        }
        Ye.bind({
            g: 1
        });
        const Qe = Ye(["position:fixed;display:block;width:100%;height:0px;margin:0px;padding:0px;overflow:visible;transform-style:preserve-3d;background:transparent;backface-visibility:hidden;pointer-events:none;left:0px;z-index:9998;"]),
            Xe = Ye(["top:0px;z-index:9999;height:100%;width:100%;"]),
            Ke = Ye(["bottom:0px;"]),
            Je = Ye(["position:fixed;z-index:9989;"]),
            Ze = Ye(["left:0;bottom:0;"]),
            et = Ye(["right:0;bottom:0;"]),
            tt = Ye(["left:0;top:0;"]),
            it = Ye(["right:0;top:0;"]),
            st = Ye(["position:relative;overflow:hidden;display:none;"]),
            nt = Ye(["display:block;"]),
            ot = "hs-web-interactives-banner-style-element",
            rt = "hs-web-interactives-top-banner-open",
            at = "hs-web-interactives-top-anchor",
            ct = "hs-web-interactives-top-push-anchor",
            lt = "hs-web-interactives-bottom-anchor",
            ht = "hs-web-interactives-floating-container",
            dt = "hs-web-interactives-floating-top-left-anchor",
            ut = "hs-web-interactives-floating-top-right-anchor",
            mt = "hs-web-interactives-floating-bottom-left-anchor",
            gt = "hs-web-interactives-floating-bottom-right-anchor",
            pt = e => `\n  .${rt} .hs-is-fixed-element {\n    translate: 0px ${e}px!important;\n  }\n`,
            ft = () => `\n<div class="${Qe} ${Xe}" id="${at}"></div>\n<div class="${Qe} ${Ke}" id="${lt}"></div>\n<div id="${ht}">\n  <div id="${dt}" class="${Je} ${tt}" >\n  </div>\n  <div id="${ut}" class="${Je} ${it}">\n  </div>\n  <div id="${mt}" class="${Je} ${Ze}">\n  </div>\n  <div id="${gt}" class="${Je} ${et}">\n  </div>\n</div>\n`;
        class vt {
            constructor() {
                this.render();
                this.topPushAnchor = document.getElementById(ct);
                this.topAnchor = document.getElementById(at);
                this.bottomAnchor = document.getElementById(lt);
                this.floatingAnchors = {
                    [le.TOP_LEFT]: document.getElementById(dt),
                    [le.TOP_RIGHT]: document.getElementById(ut),
                    [le.BOTTOM_LEFT]: document.getElementById(mt),
                    [le.BOTTOM_RIGHT]: document.getElementById(gt)
                };
                this.bottomRightFloatingButtonAnchor = this.floatingAnchors.BOTTOM_RIGHT
            }
            attachInteractiveOverlayToAnchor(e) {
                e.containerType !== K.MODAL ? e.isFloatingButtonLike ? this.attachFloatingButton(e) : e.containerType !== K.BANNER && e.containerType !== K.SLIDE_IN || this.attachBanner(e) : this.attachModal(e)
            }
            attachModal(e) {
                this.topAnchor.appendChild(e.container)
            }
            attachBanner(e) {
                e.position === le.BOTTOM || e.position === le.BOTTOM_LEFT || e.position === le.BOTTOM_RIGHT ? this.bottomAnchor.appendChild(e.container) : e.position !== le.TOP && e.position !== le.TOP_RIGHT && e.position !== le.TOP_LEFT || this.topAnchor.appendChild(e.container)
            }
            attachFloatingButton(e) {
                const t = this.floatingAnchors[e.position];
                t && t.appendChild(e.container)
            }
            addMarginForConversations(e) {
                this.bottomRightFloatingButtonAnchor.style.marginBottom = e + "px"
            }
            removeMarginForConversations() {
                this.bottomRightFloatingButtonAnchor.style.marginBottom = ""
            }
            insertPushBanner() {
                const e = document.createElement("div");
                e.id = ct;
                e.classList.add(st);
                document.body.prepend(e)
            }
            showPushBanner(e) {
                this.topPushAnchor.style.height = e + "px";
                this.topPushAnchor.classList.add(nt);
                document.body.classList.add(rt);
                const t = document.createElement("style");
                t.id = ot;
                t.innerHTML = pt(e);
                document.head.appendChild(t)
            }
            hidePushBanner() {
                this.topPushAnchor.style.height = "";
                this.topPushAnchor.classList.remove(nt);
                document.body.classList.remove(rt);
                const e = document.getElementById(ot);
                e && document.head.removeChild(e)
            }
            render() {
                this.insertPushBanner();
                document.body.insertAdjacentHTML("beforeend", ft())
            }
        }
        const Ct = Ye(["position:absolute;pointer-events:none;width:101vw;height:101vh;background:rgba(0,0,0,0.7);opacity:0;z-index:-1;"]),
            Tt = Ye(["z-index:99998;opacity:0.8;visibility:visible;pointer-events:all;cursor:pointer;"]),
            bt = Ye(["overflow:hidden;"]);
        class yt {
            constructor({
                parent: e,
                handleClick: t = (() => {})
            }) {
                this.disableBodyScroll = !1;
                this.overlay = document.createElement("div");
                this.overlay.id = "hs-interactives-modal-overlay";
                this.overlay.classList.add(Ct);
                this.handleClick = t;
                this.render(e);
                this.listenForClick()
            }
            listenForClick() {
                this.overlay.addEventListener("click", this.handleClick)
            }
            enableDisableBodyScroll() {
                this.disableBodyScroll = !0
            }
            show() {
                this.overlay.classList.add(Tt);
                this.disableBodyScroll && document.body.classList.add(bt)
            }
            hide() {
                this.overlay.classList.remove(Tt);
                document.body.classList.remove(bt)
            }
            render(e) {
                e.appendChild(this.overlay)
            }
        }
        const wt = {
                modalPosition: null,
                bannerPositions: {
                    TOP_LEFT: null,
                    TOP_RIGHT: null,
                    BOTTOM_LEFT: null,
                    BOTTOM_RIGHT: null,
                    BOTTOM: null,
                    TOP: null
                },
                floatingPositions: {
                    TOP_LEFT: null,
                    TOP_RIGHT: null,
                    BOTTOM_LEFT: null,
                    BOTTOM_RIGHT: null
                }
            },
            Et = [le.TOP, le.TOP_LEFT, le.TOP_RIGHT],
            St = [le.BOTTOM, le.BOTTOM_LEFT, le.BOTTOM_RIGHT];
        class At {
            constructor({
                isMobile: e = !1
            }) {
                this.isMobile = !1;
                this.store = new A(wt);
                this.isMobile = e
            }
            setPosistionFromConfig(e) {
                const {
                    contentModelId: t,
                    containerType: i,
                    containerStyles: {
                        position: s
                    }
                } = e, n = ue.isFloatingButtonLike(e);
                i === K.MODAL ? this.setModalPosition(t) : i !== K.BANNER && !K.SLIDE_IN || n ? n && this.setFloatingPosition(s, t) : this.setBannerPosition(s, t)
            }
            get modalPosition() {
                return this.store.state.modalPosition
            }
            get bannerPositions() {
                return this.store.state.bannerPositions
            }
            get floatingPositions() {
                return this.store.state.floatingPositions
            }
            canBeInsertedIntoPosition(e) {
                return this.isMobile ? this.canBeInsertedIntoPositionMobile(e) : this.canBeInsertedIntoPositionDesktop(e)
            }
            canBeInsertedIntoPositionMobile(e) {
                const t = ue.isFloatingButtonLike(e);
                return e.containerType === K.MODAL ? !this.modalPosition : e.containerType === K.BANNER || e.containerType === K.SLIDE_IN && !t ? Object.keys(this.bannerPositions).reduce((e, t) => e && !this.bannerPositions[t], !0) : !!t && Object.keys(this.floatingPositions).reduce((e, t) => e && !this.floatingPositions[t], !0)
            }
            canBeInsertedIntoPositionDesktop(e) {
                const t = ue.isFloatingButtonLike(e);
                return e.containerType === K.MODAL ? !this.modalPosition : e.containerType === K.BANNER || e.containerType === K.SLIDE_IN && !t ? St.includes(e.containerStyles.position) ? !this.bannerPositions[le.BOTTOM] && !this.bannerPositions[le.BOTTOM_LEFT] && !this.bannerPositions[le.BOTTOM_RIGHT] : !!Et.includes(e.containerStyles.position) && (!this.bannerPositions[le.TOP] && !this.bannerPositions[le.TOP_LEFT] && !this.bannerPositions[le.TOP_RIGHT]) : !!t && !this.floatingPositions[e.containerStyles.position]
            }
            setModalPosition(e) {
                this.store.setState(t => Object.assign({}, t, {
                    modalPosition: e
                }))
            }
            setBannerPosition(e, t) {
                this.store.setState(i => {
                    const s = i.bannerPositions;
                    return Object.assign({}, i, {
                        bannerPositions: Object.assign({}, s, {
                            [e]: t
                        })
                    })
                })
            }
            setFloatingPosition(e, t) {
                this.store.setState(i => {
                    const s = i.floatingPositions;
                    return Object.assign({}, i, {
                        floatingPositions: Object.assign({}, s, {
                            [e]: t
                        })
                    })
                })
            }
            getAllIds() {
                const e = [];
                "number" == typeof this.modalPosition && null !== this.modalPosition && e.push(this.modalPosition);
                for (const [t, i] of Object.entries(this.bannerPositions)) i && Number.isInteger(i) && e.push(i);
                for (const [t, i] of Object.entries(this.floatingPositions)) i && Number.isInteger(i) && e.push(i);
                return e
            }
            removeCTA(e) {
                this.modalPosition === e && this.store.setState(e => Object.assign({}, e, {
                    modalPosition: null
                }));
                for (const [t, i] of Object.entries(this.bannerPositions)) i === e && this.store.setState(e => Object.assign({}, e, {
                    bannerPositions: Object.assign({}, e.bannerPositions, {
                        [t]: null
                    })
                }));
                for (const [t, i] of Object.entries(this.floatingPositions)) i === e && this.store.setState(e => Object.assign({}, e, {
                    floatingPositions: Object.assign({}, e.floatingPositions, {
                        [t]: null
                    })
                }))
            }
        }

        function It(e) {
            return new At({
                isMobile: e
            })
        }
        const Mt = 6e4,
            Ot = 1440 * Mt,
            Pt = 7 * Ot,
            _t = 4 * Pt,
            Lt = {
                REPEAT_ONCE: "REPEAT_ONCE",
                REPEAT_FOREVER: "REPEAT_FOREVER",
                ONCE_OFF: "ONCE_OFF"
            },
            Ft = {
                DAYS: "DAYS",
                MONTHS: "MONTHS",
                WEEKS: "WEEKS",
                MINUTES: "MINUTES"
            },
            Rt = Object.freeze({
                DAYS: Ot,
                MONTHS: _t,
                WEEKS: Pt,
                MINUTES: Mt
            }),
            Nt = "WI_IGNORED",
            kt = "WI_FREQUENCY",
            Ht = {
                frequency: Lt.REPEAT_ONCE,
                backoff: {
                    backoffTimeDuration: 2,
                    backoffTimeUnit: Ft.WEEKS
                }
            },
            Dt = e => {
                try {
                    if (!localStorage.getItem(`${kt}_${e}`)) {
                        const t = localStorage.getItem(`${Nt}_${e}`);
                        if (!t) return !1;
                        return parseInt(t, 10) > Date.now() - 2 * Rt.WEEKS
                    }
                    const t = JSON.parse(localStorage.getItem(`${kt}_${e}`));
                    switch (t.frequency) {
                        case Lt.ONCE_OFF:
                            return !0;
                        case Lt.REPEAT_FOREVER:
                            return !1;
                        case Lt.REPEAT_ONCE:
                            {
                                const {
                                    timeSaved: e,
                                    backoffTimeDuration: i,
                                    backoffTimeUnit: s
                                } = t,
                                n = i * Rt[s];
                                return e > Date.now() - n
                            }
                        default:
                            return !1
                    }
                } catch (e) {
                    return !1
                }
            },
            Bt = (e, t) => {
                let i = t;
                i && i.frequency || (i = Ht);
                const {
                    frequency: s,
                    backoff: n
                } = i;
                try {
                    let t = {
                        frequency: s
                    };
                    n && (t = Object.assign({}, t, n, {
                        timeSaved: Date.now()
                    }));
                    localStorage.setItem(`${kt}_${e}`, JSON.stringify(t))
                } catch (e) {
                    return
                }
            },
            Vt = (e, {
                frequency: t,
                backoff: i
            }) => {
                try {
                    if (!t) return;
                    const s = `${kt}_${e}`,
                        n = JSON.parse(localStorage.getItem(s));
                    if (!n) return;
                    if (n.frequency !== t) {
                        localStorage.removeItem(s);
                        return
                    }
                    if (!i || !n.backoffTimeDuration) return;
                    i.backoffTimeDuration === n.backoffTimeDuration && i.backoffTimeUnit === n.backoffTimeUnit || localStorage.removeItem(s)
                } catch (e) {
                    return
                }
            },
            xt = Ye(["display:block !important;position:static !important;box-sizing:border-box !important;background:transparent !important;border:none;min-height:0px !important;max-height:none !important;margin:0px;padding:0px !important;height:100% !important;width:1px !important;max-width:100% !important;min-width:100% !important;"]);

        function $t(e, t = {}) {
            o("Setting style on element", t, e);
            for (const i in t) Object.hasOwnProperty.call(t, i) && (e.style[i] = t[i])
        }
        const Ut = "hs-cta-embed__loaded",
            Gt = () => {};
        class jt {
            constructor({
                src: e,
                contentId: t,
                containerStyle: i,
                configStyle: s,
                iframeStyle: n,
                containerType: o,
                isFloatingButtonLike: r,
                isTopBanner: a
            }) {
                this.onClose = Gt;
                this.setDeferredPromise();
                this.container = document.createElement("div");
                this.contentId = t;
                this.container.id = "hs-overlay-cta-" + t;
                this.frameComponent = S({
                    container: this.container,
                    id: t,
                    iframeSrc: e,
                    onFrameReady: this.resolveFrameload,
                    resizeHeight: s.scaleHeightToFitContent || Boolean(s.isSingleModuleOnly),
                    useResponsiveStyling: s.useResponsiveStyling,
                    extraAttributes: {
                        "aria-label": "Popup CTA",
                        title: "Popup CTA",
                        allow: "autoplay; fullscreen;"
                    }
                });
                this.frameComponent.iframe.setAttribute("data-test-id", "interactive-frame");
                this.frameComponent.iframe.classList.add(xt);
                this.containerStyle = i;
                this.iframeStyle = n;
                this.configStyle = s;
                this.containerType = o;
                this.position = s.position || null;
                this.isFloatingButtonLike = r;
                this.isTopBanner = a;
                this.applyStyleElements();
                this.render()
            }
            applyStyleElements() {
                this.frameComponent.setStyle(this.iframeStyle);
                $t(this.container, this.containerStyle)
            }
            setDeferredPromise() {
                this.frameLoadPromise = new Promise(e => {
                    this.resolveFrameload = e
                })
            }
            open() {
                return this.frameLoadPromise.then(() => {
                    this.frameComponent.setStyle({
                        visibility: ""
                    });
                    this.container.classList.add(Ut);
                    this.internalOpen()
                }).catch(() => {})
            }
            close() {}
            render() {}
            skipAnimation() {}
            setAnimationForClickTrigger() {}
            registerCloseHandler(e) {
                this.frameComponent.iframeCommunicator.registerHandlers({
                    [s.CLOSE_INTERACTIVE]: e
                })
            }
            internalOpen() {}
            remove() {
                this.frameComponent.iframeCommunicator.remove();
                this.container.remove()
            }
        }
        const qt = (...e) => {
                o("[overlays/Modal]", ...e)
            },
            Wt = Ye(["z-index:99999;visibility:hidden;position:absolute;inset:50vh auto auto 50%;transform:translate(-50%,-50%);left:50%;top:50%;opacity:0;pointer-events:none;max-height:95%;max-width:95%;"]),
            zt = Ye(["pointer-events:auto !important;visibility:visible;opacity:1;transition:opacity 1s ease-in;"]),
            Yt = Ye(["transition:opacity 0.3s ease-in;"]);
        class Qt extends jt {
            internalOpen() {
                this.container.classList.add(zt);
                this.focusElement()
            }
            focusElement() {
                try {
                    this.frameComponent.iframe.focus()
                } catch (e) {
                    qt("Frame not defined", e)
                }
            }
            setAnimationForClickTrigger() {
                this.container.classList.add(Yt)
            }
            close() {
                this.container.classList.remove(zt)
            }
            render() {
                this.frameComponent.iframe.setAttribute("role", "dialog");
                this.container.classList.add(Wt)
            }
        }
        const Xt = Ye(["pointer-events:auto !important;visibility:visible !important;max-height:95vh !important;transition:max-height 1s ease-in;"]),
            Kt = Ye(["z-index:9999;width:100%;max-height:0px;position:fixed;max-height:95%;visibility:hidden;"]),
            Jt = Ye(["z-index:9999;width:100%;max-height:0px;position:fixed;max-height:95%;visibility:hidden;bottom:0px;"]),
            Zt = {
                [le.TOP]: Kt,
                [le.BOTTOM]: Jt
            };
        class ei extends jt {
            internalOpen() {
                this.container.classList.add(Xt)
            }
            close() {
                this.container.classList.remove(Xt)
            }
            addPositionClass() {
                const {
                    position: e
                } = this.configStyle;
                this.container.classList.add(Zt[e])
            }
            render() {
                this.addPositionClass();
                this.container.classList.add(Kt)
            }
        }
        const ti = Ye(["visibility:hidden;"]),
            ii = Ye(["visibility:visible !important;"]);
        class si extends jt {
            internalOpen() {
                this.container.classList.add(ii)
            }
            close() {
                this.container.classList.remove(ii)
            }
            render() {
                this.container.classList.add(ti)
            }
        }
        const ni = Ye(["pointer-events:auto !important;visibility:visible !important;max-height:95vh !important;transform:none !important;"]),
            oi = Ye(["z-index:9999;width:100%;max-height:0px;position:fixed;max-height:95%;visibility:hidden;transition:transform 0.5s cubic-bezier(0.31,-0.2,0.04,1.47);"]),
            ri = Ye(["z-index:9999;position:fixed;left:10px;top:10px;max-height:95vh !important;max-width:95%;visibility:hidden;"]),
            ai = Ye(["z-index:9999;position:fixed;right:10px;top:10px;max-height:95vh !important;max-width:95%;visibility:hidden;"]),
            ci = Ye(["z-index:9999;position:fixed;left:10px;bottom:10px;max-height:95vh !important;max-width:95%;visibility:hidden;"]),
            li = Ye(["z-index:9999;position:fixed;right:10px;bottom:10px;max-height:95vh !important;max-width:95%;visibility:hidden;"]),
            hi = Ye(["transition:none !important;"]),
            di = {
                [le.BOTTOM_RIGHT]: li,
                [le.BOTTOM_LEFT]: ci,
                [le.TOP_RIGHT]: ai,
                [le.TOP_LEFT]: ri
            };
        class ui extends jt {
            internalOpen() {
                this.container.classList.add(ni)
            }
            close() {
                this.container.classList.remove(ni)
            }
            skipAnimation() {
                this.container.classList.add(hi)
            }
            addPositionClass() {
                const {
                    position: e
                } = this.configStyle;
                this.container.classList.add(di[e])
            }
            addOffset() {
                const e = this.containerStyle.width;
                if (!e) return;
                switch (this.configStyle.position) {
                    case le.BOTTOM_LEFT:
                    case le.TOP_LEFT:
                        this.container.style.transform = `translateX(-${e})`;
                        return;
                    case le.BOTTOM_RIGHT:
                    case le.TOP_RIGHT:
                        this.container.style.transform = `translateX(calc(100% + ${e}))`;
                        return
                }
            }
            render() {
                this.addPositionClass();
                this.addOffset();
                this.frameComponent.iframe.setAttribute("role", "dialog");
                this.container.classList.add(oi)
            }
        }

        function mi(e, t) {
            const i = ue.isFloatingButtonLike(e),
                s = ue.isTopBannerLike(e),
                n = {
                    src: t,
                    configStyle: e.containerStyles,
                    contentId: e.contentModelId,
                    containerType: e.containerType,
                    containerStyle: ue.getStylesFromContainerStyles(e.containerStyles),
                    iframeStyle: ue.getStylesForIframe(e.containerStyles),
                    isFloatingButtonLike: i,
                    isTopBanner: s
                };
            if (i) return new si(n);
            switch (e.containerType) {
                case K.MODAL:
                    return new Qt(n);
                case K.BANNER:
                    return new ei(n);
                case K.SLIDE_IN:
                    return new ui(n);
                default:
                    return null
            }
        }

        function gi(e) {
            if ("buttons" in (e = e || window.event)) return e.buttons < 2;
            return (e.which || e.button) < 2
        }
        const pi = (...e) => {
                o("[ClickTrigger", ...e)
            },
            fi = Ye(["cursor:pointer;"]);
        class vi {
            constructor(e, t) {
                this.button = e;
                this.onClick = t;
                this.init();
                this.addA11yAttributes()
            }
            addA11yAttributes() {
                this.button.setAttribute("aria-haspopup", "dialog");
                this.button.setAttribute("tabindex", "0")
            }
            init() {
                pi("Setting up click trigger");
                this.button.removeAttribute("href");
                this.button.removeAttribute("target");
                this.button.classList.add(fi);
                this.button.removeAttribute("href");
                this.button.removeAttribute("target");
                this.button.addEventListener("mouseup", e => {
                    pi("Mouse up on click trigger", e);
                    gi(e) && this.onClick()
                });
                this.button.addEventListener("keypress", e => {
                    if ("Enter" === e.key) {
                        pi("Enter on click trigger", e);
                        this.onClick()
                    }
                })
            }
        }
        class Ci {
            constructor({
                onTrigger: e
            }) {
                this.isExitIntent = e => {
                    if (!e) return !1;
                    return !e.relatedTarget && e.clientY < 100
                };
                this.handleMouseOut = e => {
                    this.isExitIntent(e) && this.onTrigger(this)
                };
                this.onTrigger = e;
                this.setup()
            }
            setup() {
                document.addEventListener("mouseout", this.handleMouseOut)
            }
            remove() {
                document.removeEventListener("mouseout", this.handleMouseOut)
            }
        }
        const Ti = 1e3,
            bi = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
        class yi {
            constructor({
                onTrigger: e,
                value: t
            }) {
                this.resetTimer = () => {
                    this.timeout && clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => this.onTrigger(this), this.seconds)
                };
                this.onTrigger = e;
                this.seconds = t * Ti;
                this.timeout = null;
                this.setup()
            }
            setup() {
                this.timeout = setTimeout(() => this.onTrigger(this), this.seconds);
                bi.forEach(e => {
                    document.addEventListener(e, this.resetTimer)
                })
            }
            remove() {
                bi.forEach(e => {
                    document.removeEventListener(e, this.resetTimer)
                });
                this.timeout && clearTimeout(this.timeout)
            }
        }

        function wi() {
            let e = !1;
            try {
                const t = {
                    get passive() {
                        e = !0
                    }
                };
                window.addEventListener("test", t, t);
                window.removeEventListener("test", t, t)
            } catch (t) {
                e = !1
            }
            return e
        }

        function Ei() {
            return Math.max(document.body.offsetHeight, document.body.scrollHeight)
        }

        function Si(e) {
            return Math.max(e.offsetHeight, e.scrollHeight)
        }

        function Ai() {
            return Math.max(window.innerHeight || 0, document.documentElement.clientHeight)
        }

        function Ii() {
            return document.body.scrollTop || document.documentElement.scrollTop
        }

        function Mi(e) {
            const t = e.getBoundingClientRect(),
                i = window.innerHeight,
                s = (Math.min(t.bottom, i) - t.top) / i * 100;
            return Math.max(0, Math.min(100, s))
        }
        const Oi = 80;
        class Pi {
            constructor({
                onTrigger: e,
                value: t
            }) {
                this.ungatedForMainElementScroll = !1;
                this.handleScroll = e => {
                    if (this.ungatedForMainElementScroll && e.target !== document.body) {
                        this.checkIfElementShouldTriggerScroll(e.target);
                        return
                    }
                    const t = Ei() - Ai();
                    100 * Ii() / t >= this.scrollPercent && this.onTrigger(this)
                };
                this.checkIfElementShouldTriggerScroll = e => {
                    if (Mi(e) < Oi) return;
                    const t = Si(e) - Ai();
                    100 * e.scrollTop / t >= this.scrollPercent && this.onTrigger(this)
                };
                this.onTrigger = e;
                this.scrollPercent = t;
                this.supportsPassiveScrolling = wi();
                this.setup()
            }
            setup() {
                this.supportsPassiveScrolling ? window.addEventListener("scroll", this.handleScroll, {
                    capture: !0,
                    passive: !0
                }) : window.addEventListener("scroll", this.handleScroll, !0)
            }
            remove() {
                this.supportsPassiveScrolling ? window.removeEventListener("scroll", this.handleScroll, {
                    capture: !0
                }) : window.removeEventListener("scroll", this.handleScroll, !0)
            }
        }
        const _i = 1e3;

        function Li() {
            return document.timeline && document.timeline.currentTime ? document.timeline.currentTime : performance ? performance.now() : 0
        }
        class Fi {
            constructor({
                onTrigger: e,
                value: t
            }) {
                this.onTrigger = e;
                const i = Li();
                this.ms = Math.max(t * _i - i, 0);
                this.timeout = null;
                this.setup()
            }
            setup() {
                this.timeout = setTimeout(() => {
                    this.onTrigger(this)
                }, this.ms)
            }
            remove() {
                this.timeout && clearTimeout(this.timeout)
            }
        }

        function Ri(e, t) {
            const {
                showOnPageScroll: i,
                showOnExitIntent: s,
                showAfterDelay: n,
                showAfterInactivity: o,
                pageScrollPercentageTrigger: r,
                delayInSeconds: a,
                inactivityInSeconds: c
            } = e, l = [];
            i && l.push(new Pi({
                onTrigger: t,
                value: r || 0
            }));
            s && l.push(new Ci({
                onTrigger: t
            }));
            n && l.push(new Fi({
                onTrigger: t,
                value: a || 0
            }));
            o && l.push(new yi({
                onTrigger: t,
                value: c || 0
            }));
            return l
        }

        function Ni(e, t) {
            const i = new ResizeObserver(i => {
                for (const s of i) s.target === e && s.contentRect && t(s.contentRect.height, s.contentRect.height)
            });
            i.observe(e);
            return () => i.disconnect()
        }
        const ki = "hubspot-messages-iframe-container",
            Hi = () => {},
            Di = 220,
            Bi = 400,
            Vi = "userInteractedWithWidget";
        class xi {
            constructor(e) {
                this.disconnectResizeObserver = Hi;
                this.conversationsFrameContainer = null;
                this.handleConversationsReady = () => {
                    this.addConversationsEventListeners();
                    this.pollForConversationsRendered().then(() => {
                        this.conversationsFrameContainer = document.getElementById(ki);
                        this.addConversationsStyleSheet();
                        this.listenForConversationsHeightChange();
                        this.setFloatingButtonOffset()
                    }).catch(() => {})
                };
                this.overlayContainer = e;
                this.listenForConversationsReady()
            }
            listenForConversationsReady() {
                window.HubSpotConversations ? this.handleConversationsReady() : window.hsConversationsOnReady && window.hsConversationsOnReady.length ? window.hsConversationsOnReady = [...window.hsConversationsOnReady, this.handleConversationsReady] : window.hsConversationsOnReady = [this.handleConversationsReady]
            }
            listenForConversationsHeightChange() {
                if (!this.conversationsFrameContainer) return;
                const e = Ni(this.conversationsFrameContainer, e => {
                    this.conversationsFrameContainer && e < Di && this.setFloatingButtonOffset()
                });
                this.disconnectResizeObserver = e
            }
            addConversationsEventListeners() {
                window.HubSpotConversations && window.HubSpotConversations.on(Vi, () => {
                    we() && this.removeConversationsStyleSheet()
                })
            }
            pollForConversationsRendered() {
                return new Promise(e => {
                    const t = setInterval(() => {
                        if (document.getElementById(ki)) {
                            e();
                            clearInterval(t)
                        }
                    }, Bi)
                })
            }
            setFloatingButtonOffset() {
                if (!this.overlayContainer || !this.conversationsFrameContainer) return;
                const e = this.conversationsFrameContainer.clientHeight;
                this.overlayContainer.addMarginForConversations(e)
            }
            addConversationsStyleSheet() {
                const e = document.createElement("style");
                e.id = "web-interactives-conversations-override";
                e.innerHTML = "#hubspot-messages-iframe-container { z-index: 9990!important; }";
                document.head.appendChild(e)
            }
            removeConversationsStyleSheet() {
                const e = document.getElementById("web-interactives-conversations-override");
                e && e.remove()
            }
        }

        function $i(e) {
            return new xi(e)
        }
        class Ui {
            constructor() {
                this.eventEmitter = a()
            }
            static getInstance() {
                Ui.instance || (Ui.instance = new Ui);
                return Ui.instance
            }
            emit(e, t) {
                this.eventEmitter.emit(e, t)
            }
            on(e, t) {
                this.eventEmitter.on(e, t)
            }
            off(e) {
                this.eventEmitter.off(e)
            }
        }
        const Gi = {
                REFRESH: "REFRESH",
                CLOSE: "CLOSE",
                CLOSE_ALL: "CLOSE_ALL",
                TRIGGER_OPEN: "TRIGGER_OPEN",
                REPLACED_INLINE_HTML: "REPLACED_INLINE_HTML"
            },
            ji = -1;
        class qi {
            constructor({
                configModel: e,
                environmentModel: t,
                analyticsModel: i,
                scheduledCTAsModel: n,
                handleView: o,
                scheduleCTA: r
            }) {
                this.triggerMap = new Map;
                this.shownModal = null;
                this.triggeredCTAFromCallback = null;
                this.clickTriggerComponentMap = new Map;
                this.interactiveComponentMap = new Map;
                this.conversationsController = null;
                this.eventManager = Ui.getInstance();
                this.listenForKeypress = () => {
                    Q(() => {
                        this.shownModal && this.closeOverlay(this.shownModal)
                    })
                };
                this.sendAnalyticsToCTA = e => {
                    h.broadcast(e, {
                        type: s.RECEIVED_ANALYTICS,
                        payload: this.analyticsModel.analytics
                    })
                };
                this.handleTrigger = e => {
                    if (!Dt(e)) {
                        this.openOverlay(e);
                        for (const [t, i] of this.triggerMap) t === e && i.forEach(e => e.remove());
                        this.triggerMap.delete(e)
                    }
                };
                this.handleTriggerFromCTA = ({
                    triggerCTA: e,
                    id: t
                }) => {
                    this.interactiveComponentMap.has(t) && (this.interactiveComponentMap.has(e) ? this.shouldCloseCalloutCTA(t) && this.closeOverlay(t) : this.triggeredCTAFromCallback = [e, t]);
                    this.interactiveComponentMap.has(e) ? this.handleClickOpen(e) : this.scheduledCTAsModel.scheduledCTAs.has(e) || this.scheduleCTA(e)
                };
                this.handleClickOpen = e => {
                    this.openOverlay(e, !0)
                };
                this.handleOverlayClick = () => {
                    if (!Number.isInteger(this.shownModal)) return;
                    const e = this.configModel.configs.get(this.shownModal);
                    e && e.containerStyles.closeOnOverlayClick && this.closeOverlay(this.shownModal)
                };
                this.handlePageNavigation = ({
                    id: e,
                    openNewTab: t,
                    url: i
                }) => {
                    t || b(window.location.href, i) || this.shouldCloseCalloutCTA(e) && this.environmentModel.isUngatedFor("WebInteractives:CloseCTAOnNavigation") && this.shouldCloseCalloutCTA(e) && this.closeOverlay(e)
                };
                this.handleFormSubmission = ({
                    id: e
                }) => {
                    const t = this.configModel.configs.get(e);
                    t && t.shouldCloseOnFormSubmission && t.isDismissable && this.closeOverlay(e)
                };
                this.closeOverlay = e => {
                    let t;
                    t = this.configModel.templateConfig ? this.interactiveComponentMap.get(ji) : this.interactiveComponentMap.get(e);
                    if (t) {
                        t.isTopBanner && this.overlayedInteractivesContainer.hidePushBanner();
                        t.containerType === K.MODAL && this.overlay.hide();
                        t.close();
                        e === this.shownModal && (this.shownModal = null);
                        document.activeElement instanceof HTMLElement && document.activeElement.blur();
                        this.messageCTAClosed(e)
                    }
                };
                this.configModel = e;
                this.environmentModel = t;
                this.analyticsModel = i;
                this.scheduledCTAsModel = n;
                this.overlayedInteractivesContainer = null;
                this.overlay = null;
                this.handleView = o;
                this.scheduleCTA = r;
                this.listenToConfigUpdates();
                this.listenForOpenCTAMessage();
                this.listenForKeypress();
                this.registerMessageHandlers();
                this.triggerOpen = this.handleClickOpen
            }
            init({
                clickTriggerButtons: e
            }) {
                this.posistionsOccupied = It(this.environmentModel.isMobile);
                this.overlayedInteractivesContainer = new vt;
                this.overlay = new yt({
                    parent: this.overlayedInteractivesContainer.topAnchor,
                    handleClick: this.handleOverlayClick
                });
                this.conversationsController = $i(this.overlayedInteractivesContainer);
                this.createClickTriggerComponents(e)
            }
            registerMessageHandlers() {
                h.registerHandlers({
                    [s.TRIGGER_CTA]: this.handleTriggerFromCTA,
                    [s.NAVIGATE_PAGE]: this.handlePageNavigation,
                    [s.CTA_FORM_SUBMITTED]: this.handleFormSubmission
                });
                this.eventManager.on(Gi.TRIGGER_OPEN, ({
                    id: e
                }) => this.handleClickOpen(e))
            }
            createClickTriggerComponents(e) {
                for (const [t, i] of e) i.forEach(e => {
                    const i = new vi(e, () => this.handleClickOpen(t)),
                        s = this.clickTriggerComponentMap.get(t) || [];
                    this.clickTriggerComponentMap.set(t, [...s, i])
                })
            }
            createOverlayInteractiveFromAudience(e) {
                if (!this.shouldCreateInteractiveOverlay(e)) return !1;
                if (!this.createOverlayComponentAndSetOnMap(e)) return !1;
                this.posistionsOccupied.setPosistionFromConfig(e);
                const t = Ri(e.triggers, () => this.handleTrigger(e.contentModelId));
                this.triggerMap.set(e.contentModelId, t);
                return !0
            }
            createOverlayInteractivesWithAudience() {
                for (const [e, t] of this.configModel.sortedConfigsWithSpecificty) this.createOverlayInteractiveFromAudience(t)
            }
            createOverlayInteractivesWithNoAudience() {
                for (const [e, t] of this.configModel.overlayedConfigsWithNoAudience) {
                    if (this.interactiveComponentMap.has(e)) continue;
                    if (!this.createOverlayComponentAndSetOnMap(t)) return;
                    if (this.scheduledCTAsModel.scheduledCTAs.has(e)) {
                        this.openOverlay(e, !0);
                        this.scheduledCTAsModel.removeCTA(e)
                    }
                    this.sendAnalyticsToCTA(e)
                }
            }
            createTemplateOverlayInteractive() {
                this.createOverlayComponentAndSetOnMap(this.configModel.templateConfig)
            }
            createPreviewOverlayInteractive() {
                this.createOverlayComponentAndSetOnMap(this.configModel.previewConfig)
            }
            createOverlayComponentAndSetOnMap(e) {
                const t = mi(e, te(e.iframeSrc, this.environmentModel, this.analyticsModel));
                if (!t) return null;
                let i;
                i = "contentModelId" in e ? e.contentModelId : ji;
                if (this.triggeredCTAFromCallback) {
                    const [e] = this.triggeredCTAFromCallback;
                    i === e && t.skipAnimation()
                }
                this.interactiveComponentMap.set(i, t);
                this.overlayedInteractivesContainer.attachInteractiveOverlayToAnchor(t);
                t.registerCloseHandler(() => this.closeOverlay(e.contentModelId));
                return t
            }
            shouldCreateInteractiveOverlay(e) {
                return !(Dt(e.contentModelId) && !this.clickTriggerComponentMap.has(e.contentModelId)) && !!this.posistionsOccupied.canBeInsertedIntoPosition(e)
            }
            listenToConfigUpdates() {
                this.configModel.store.subscribe((e, t) => {
                    if (this.environmentModel.isPreview && 1 === e.configs.size) {
                        this.createPreviewOverlayInteractive();
                        requestAnimationFrame(() => {
                            this.configModel.previewConfig && this.openOverlay(this.configModel.previewConfig.contentModelId)
                        })
                    } else if (0 === t.configs.size && e.configs.size > 0) setTimeout(() => {
                        this.createOverlayInteractivesWithAudience();
                        this.createOverlayInteractivesWithNoAudience();
                        this.overlay && this.overlay.enableDisableBodyScroll()
                    });
                    else if (e.templateConfig) {
                        this.createTemplateOverlayInteractive();
                        requestAnimationFrame(() => {
                            this.openOverlay(ji)
                        })
                    } else {
                        e.configs.size > t.configs.size && this.createOverlayInteractivesWithNoAudience();
                        if (this.triggeredCTAFromCallback) {
                            const [t, i] = this.triggeredCTAFromCallback;
                            if (e.configs.has(t)) {
                                this.triggeredCTAFromCallback = null;
                                this.shouldCloseCalloutCTA(i) && this.closeOverlay(i)
                            }
                        }
                    }
                })
            }
            listenForOpenCTAMessage() {
                window.addEventListener("message", e => {
                    e && e.data && e.data.type === s.DISPLAY_CALL_TO_ACTION && this.openOverlay(e.data.id)
                })
            }
            openOverlay(e, t = !1) {
                const i = this.interactiveComponentMap.get(e);
                if (i) {
                    i.isTopBanner && this.overlayedInteractivesContainer.showPushBanner(i.container.clientHeight);
                    t && i.setAnimationForClickTrigger();
                    i.open().then(() => {
                        i.isTopBanner && this.overlayedInteractivesContainer.showPushBanner(i.container.clientHeight);
                        if (i.containerType === K.MODAL) {
                            this.shownModal = e;
                            this.overlay.show()
                        }
                        this.handleView(e);
                        h.broadcast(e, {
                            type: s.SHOWING_CTA,
                            payload: {}
                        })
                    }).catch(() => {})
                }
            }
            messageCTAClosed(e) {
                h.broadcast(e, {
                    type: s.HAS_CLOSED,
                    payload: {}
                })
            }
            shouldCloseCalloutCTA(e) {
                const t = this.configModel.configs.get(e);
                return !!t && t.isDismissable
            }
        }

        function Wi(e) {
            return class extends e {
                constructor(e) {
                    super(e);
                    this.processConfigResponse = e => {
                        if (!e) return;
                        const t = e.sortedAudienceConfigs.map(e => e.contentModelId),
                            i = this.getShowingCTAIds(),
                            s = [];
                        for (const e of i) t.includes(e) || s.push(e);
                        this.handleRemovingCTAs(s);
                        const n = e.sortedAudienceConfigs.sort((e, t) => t.specificity - e.specificity);
                        this.createCTAsFromConfigs(n)
                    };
                    this.registerEventManagerEventHandlers()
                }
                registerEventManagerEventHandlers() {
                    this.eventManager.on(Gi.REFRESH, () => {
                        this.handleRefresh()
                    });
                    this.eventManager.on(Gi.CLOSE, ({
                        id: e
                    }) => this.closeOverlay(e));
                    this.eventManager.on(Gi.CLOSE_ALL, () => this.handleCloseAll())
                }
                handleCloseAll() {
                    this.getShowingCTAIds().forEach(e => this.closeOverlay(e))
                }
                handleRefresh() {
                    this.environmentModel.refresh();
                    return this.configModel.init(ue.buildConfigRequest(this.environmentModel, [], this.analyticsModel.store.state)).then(this.processConfigResponse).catch(e => {})
                }
                getShowingCTAIds() {
                    return this.posistionsOccupied ? this.posistionsOccupied.getAllIds() : []
                }
                handleRemovingCTAs(e) {
                    for (const t of e) {
                        this.closeOverlay(t);
                        const e = this.interactiveComponentMap.get(t);
                        e && e.remove();
                        this.interactiveComponentMap.delete(t);
                        this.posistionsOccupied && this.posistionsOccupied.removeCTA(t);
                        for (const [e, i] of this.triggerMap) {
                            e === t && i.forEach(e => e.remove());
                            this.triggerMap.delete(t)
                        }
                    }
                }
                createCTAsFromConfigs(e) {
                    for (const t of e) this.createOverlayInteractiveFromAudience(t)
                }
            }
        }
        var zi = Wi(qi);
        const Yi = "hs-cta-embed__loaded";
        class Qi {
            constructor({
                contentId: e,
                embedContainer: t,
                iframeSrc: i,
                useResponsiveStyling: s
            }) {
                this.listenForLoad();
                this.frameComponent = S({
                    id: e,
                    container: t,
                    iframeSrc: i,
                    resizeHeight: !0,
                    onFrameReady: this.resolveFrameload,
                    useResponsiveStyling: s,
                    extraAttributes: {
                        "aria-label": "Embedded CTA",
                        title: "Embedded CTA",
                        allow: "autoplay; fullscreen;"
                    }
                });
                this.frameComponent.iframe.setAttribute("data-test-id", "interactive-frame");
                this.frameComponent.iframe.classList.add(xt);
                this.contentId = e;
                this.embedContainer = t
            }
            setStyles(e, t, i) {
                this.frameComponent.setShouldResize(i);
                n(this.embedContainer, e);
                this.frameComponent.setStyle(Object.assign({}, t));
                this.resolveConfig && this.resolveConfig()
            }
            showFrame() {
                this.frameComponent.setStyle({
                    visibility: ""
                })
            }
            listenForLoad() {
                const e = new Promise(e => {
                        this.resolveFrameload = e
                    }),
                    t = new Promise(e => {
                        this.resolveConfig = e
                    });
                Promise.all([e, t]).then(() => {
                    Array.from(this.embedContainer.children).forEach(e => {
                        e !== this.frameComponent.iframe && this.embedContainer.removeChild(e)
                    });
                    this.embedContainer.classList.add(Yi);
                    this.showFrame()
                }).catch(() => {})
            }
        }
        class Xi {
            constructor({
                environmentModel: e,
                configStore: t,
                handleView: i,
                analyticsModel: s,
                scheduledCTAsModel: n
            }) {
                this.embeddedInteractives = new Map;
                this.elementObserver = q();
                this.styledComponentSet = new Set;
                this.flushScheduledCTAs = () => {
                    for (const e of this.scheduledCTAsModel.scheduledCTAs) {
                        const t = this.configStore.embeddedConfigs.get(e);
                        if (!t || t.isHTMLVersionOnly) continue;
                        if (!this.scheduledCTAsModel.elementsForEmbeddedCTAs.has(e)) continue;
                        this.scheduledCTAsModel.elementsForEmbeddedCTAs.get(e).forEach(t => {
                            this.createView(e, t)
                        });
                        this.handleView(e);
                        this.scheduledCTAsModel.removeCTA(e)
                    }
                };
                this.environmentModel = e;
                this.configStore = t;
                this.scheduledCTAsModel = n;
                this.handleView = i;
                this.analyticsModel = s
            }
            init({
                embedContainers: e
            }) {
                this.embedContainers = e;
                this.environmentModel.isPreview || this.environmentModel.isTemplate || this.createViews();
                this.listenForConfigs();
                this.listenForElementViews();
                this.listenForScheduledCTAs()
            }
            listenForScheduledCTAs() {
                this.scheduledCTAsModel.subscribe(this.flushScheduledCTAs)
            }
            listenForElementViews() {
                if (this.embedContainers)
                    for (const [e, t] of this.embedContainers)
                        for (const i of t) this.elementObserver.observe(i, () => this.handleView(e))
            }
            listenForConfigs() {
                this.configStore.configs.size > 0 ? this.setStylesOnContainer() : this.configStore.subscribe(() => {
                    this.scheduledCTAsModel.scheduledCTAs.size > 0 && this.flushScheduledCTAs();
                    if (this.configStore.embeddedConfigs.size > 0) {
                        (this.environmentModel.isPreview || this.environmentModel.isTemplate) && this.configStore.embeddedConfigs.size > 0 && this.createViews();
                        this.setStylesOnContainer()
                    }
                })
            }
            setStylesOnContainer() {
                for (const [e, t] of this.configStore.embeddedConfigs) {
                    const i = this.embeddedInteractives.get(e);
                    i && i.length && i.forEach(e => {
                        if (!this.styledComponentSet.has(e)) {
                            this.styledComponentSet.add(e);
                            e.setStyles(ue.getStylesFromContainerStyles(t.containerStyles), ue.getStylesForIframe(t.containerStyles), t.containerStyles.scaleHeightToFitContent || Boolean(t.containerStyles.isSingleModuleOnly))
                        }
                    })
                }
            }
            createViews() {
                for (const [e, t] of this.embedContainers) {
                    let i = "";
                    const s = this.configStore.embeddedConfigs.get(e);
                    i = s ? s.iframeSrc : ee({
                        contentId: e,
                        portalId: this.environmentModel.portalId,
                        env: this.environmentModel.env,
                        hublet: this.environmentModel.hublet
                    });
                    i = te(i, this.environmentModel, this.analyticsModel);
                    const n = [];
                    t.forEach(t => {
                        const o = new Qi({
                            contentId: e,
                            embedContainer: t,
                            iframeSrc: i,
                            useResponsiveStyling: !!s && s.containerStyles.useResponsiveStyling
                        });
                        n.push(o)
                    });
                    this.embeddedInteractives.set(e, n)
                }
            }
            createView(e, t) {
                const i = this.configStore.embeddedConfigs.get(e);
                if (!i) return;
                const s = te(i.iframeSrc, this.environmentModel, this.analyticsModel),
                    n = new Qi({
                        contentId: e,
                        embedContainer: t,
                        iframeSrc: s,
                        useResponsiveStyling: i.containerStyles.useResponsiveStyling
                    }),
                    o = this.embeddedInteractives.get(e) || [];
                this.embeddedInteractives.set(e, [...o, n]);
                this.setStylesOnContainer()
            }
        }
        const Ki = "POP_OVER",
            Ji = "hsCta";
        class Zi {
            constructor({
                configStore: e,
                environmentModel: t
            }) {
                this.eventManager = Ui.getInstance();
                this.ignoreCta = ({
                    id: e
                }) => {
                    if (this.environmentModel.isPreview) return;
                    const t = this.configStore.configs.get(e);
                    t && t.containerType !== K.EMBEDDED && Bt(e, t.displayFrequency)
                };
                this.registerPopupPolice = ({
                    id: e
                }) => {
                    const t = this.configStore.configs.get(e);
                    t && t.containerType === K.MODAL && window._registerAvailablePopup && window._registerAvailablePopup(Ji, Ki)
                };
                this.configStore = e;
                this.environmentModel = t;
                this.registerHandlers();
                this.listenForConfigs()
            }
            registerHandlers() {
                h.registerHandlers({
                    [s.NAVIGATE_PAGE]: this.ignoreCta,
                    [s.CLOSE_INTERACTIVE]: this.ignoreCta,
                    [s.STARTED]: this.registerPopupPolice
                });
                this.eventManager.on(Gi.CLOSE, this.ignoreCta)
            }
            listenForConfigs() {
                this.configStore.subscribe((e, t) => {
                    if (e.configs.size !== t.configs.size)
                        for (const [t, i] of e.configs) i.displayFrequency && Vt(t, i.displayFrequency)
                })
            }
        }

        function es(e) {
            return new Zi(e)
        }
        const ts = Ye(["display:flex;justify-content:center;align-items:center;"]),
            is = "interactive-ready";
        class ss {
            constructor({
                environmentModel: e
            }) {
                this.environmentModel = e
            }
            init() {
                if (this.environmentModel.isPreview || this.environmentModel.isScreenshot || this.environmentModel.templatePath) {
                    this.bodyWrapper = document.getElementsByClassName(_e)[0];
                    if (this.bodyWrapper) {
                        this.setupEmbedContainer();
                        this.setHeightForPreview();
                        this.listenForInteractiveLoaded()
                    }
                }
            }
            setupEmbedContainer() {
                this.bodyWrapper.classList.add(ts);
                const e = this.environmentModel.previewId || 1;
                this.bodyWrapper.innerHTML = `\n      <div class="${Pe} ${Pe}-${e}">\n    `
            }
            setHeightForPreview() {
                this.bodyWrapper.style.height = "100vh"
            }
            listenForInteractiveLoaded() {
                h.registerHandlers({
                    [s.STARTED]: () => document.body.classList.add(is)
                })
            }
        }

        function ns({
            environmentModel: e
        }) {
            return new ss({
                environmentModel: e
            })
        }
        const os = e => {
                let t = 1,
                    i = 0;
                for (; t > 0 && i !== e.length;) {
                    const s = e[i];
                    "{" === s ? t++ : "}" === s && t--;
                    i++;
                    if (i > e.length) return e.length
                }
                return i
            },
            rs = e => window.matchMedia(e).matches,
            as = e => e.includes("width") ? "@media (min-width: 0px)" : e,
            cs = (e, t = rs) => {
                let i = "",
                    s = e,
                    n = s.indexOf("@media");
                if (-1 === n) return !1;
                for (; n > 0;) {
                    i = `${i}${s.substring(0,n-1)}`;
                    s = s.substring(n);
                    const e = s.indexOf("{"),
                        o = s.substring(0, e);
                    s = s.substring(e + 1);
                    const r = os(s);
                    if (t(o.replace("@media ", ""))) {
                        const e = s.substring(0, r - 1);
                        i = `${i}${as(o)} { ${e} }`
                    }
                    s = s.substring(r + 1);
                    n = s.indexOf("@media")
                }
                return `${i}${s}`.trim()
            },
            ls = e => Object.keys(e).reduce((t, i) => {
                const s = cs(e[i]);
                return s ? Object.assign({}, t, {
                    [i]: s
                }) : t
            }, {});
        var hs = (e, t) => {
            let i = 0;
            return (...s) => {
                i && clearTimeout(i);
                i = setTimeout(() => {
                    e(...s);
                    i = 0
                }, t)
            }
        };
        const ds = (...e) => {
            o("[ResponsiveController]", ...e)
        };
        class us {
            constructor() {
                this.initialStylesheets = {}
            }
            init() {
                this.listenForStylesheetsHtml();
                const e = hs(() => Object.keys(this.initialStylesheets).forEach(e => this.handleProcessStylesheets(Number(e))), 100);
                window.addEventListener("resize", () => {
                    ds("Resizing, reprocessing stylesheets");
                    e()
                })
            }
            listenForStylesheetsHtml() {
                h.registerHandlers({
                    [s.SEND_STYLESHEETS]: e => {
                        this.initialStylesheets[e.id] = e.stylesheetsHtml;
                        this.handleProcessStylesheets(e.id)
                    }
                })
            }
            handleProcessStylesheets(e) {
                if (!this.initialStylesheets[e]) return;
                const t = ls(this.initialStylesheets[e]);
                h.broadcast(e || 1, {
                    type: s.RECEIVE_FILTERED_STYLESHEETS,
                    payload: {
                        stylesheets: t
                    }
                })
            }
        }

        function ms() {
            return new us
        }

        function gs(e, t) {
            return "https://perf{region}.hsforms{env}.com/embed/v3/counters.gif".replace("{region}", "-" + e).replace("{env}", "qa" === t ? "qa" : "")
        }
        const ps = {
            CONFIG_LOADED_SUCCESS: "config-loaded-success",
            CONFIG_LOADED_FAILURE: "config-loaded-failure",
            INTERACTIVE_SHOWN: "interactive-shown",
            INTERACTIVE_CLOSED: "interactive-closed",
            INTERACTIVE_NAVIGATED: "interactive-navigated",
            INLINE_INTERACTIVE_RENDER_SUCCESS: "inline-interactive-render-success",
            INLINE_INTERACTIVE_RENDER_FAIL: "inline-interactive-render-fail"
        };
        class fs {
            constructor({
                environmentModel: e,
                configStore: t
            }) {
                this.perfUrl = "";
                this.environmentModel = e;
                this.configStore = t;
                this.registerHandlers();
                this.listenToConfigStore()
            }
            init() {
                this.perfUrl = gs(this.environmentModel.hublet, this.environmentModel.env)
            }
            trackRender(e) {
                this.trackMetric(e ? ps.INLINE_INTERACTIVE_RENDER_SUCCESS : ps.INLINE_INTERACTIVE_RENDER_FAIL)
            }
            registerHandlers() {
                h.registerHandlers({
                    [s.STARTED]: () => this.trackMetric(ps.INTERACTIVE_SHOWN),
                    [s.CLOSE_INTERACTIVE]: () => this.trackMetric(ps.INTERACTIVE_CLOSED),
                    [s.NAVIGATE_PAGE]: () => this.trackMetric(ps.INTERACTIVE_NAVIGATED)
                })
            }
            listenToConfigStore() {
                this.configStore.subscribe(e => {
                    e.requestError ? this.trackMetric(ps.CONFIG_LOADED_FAILURE) : e.isLoaded && this.trackMetric(ps.CONFIG_LOADED_SUCCESS)
                })
            }
            trackMetric(e) {
                if (!this.perfUrl.length) return;
                const t = `${this.perfUrl}?key=${e}&value=1`;
                (new Image).src = t
            }
        }

        function vs(e) {
            return new fs(e)
        }
        const Cs = (...e) => {
            o("[CTAAnalyticsController]", ...e)
        };

        function Ts({
            env: e,
            hublet: t
        }) {
            const i = "prod" === e ? "" : e;
            let s = "";
            s = "na1" !== t && t ? `https://cta-${t}.hubspot${i}.com/web-interactives/public/v1/track` : `https://cta-service-cms2.hubspot${i}.com/web-interactives/public/v1/track`;
            return s
        }
        class bs {
            constructor({
                analyticsStore: e,
                configsStore: t,
                environmentModel: i,
                ctaViewedStore: s
            }) {
                this.timingMap = new Map;
                this.viewQueue = M();
                this.hasViewed = new Set;
                this.eventManager = Ui.getInstance();
                this.baseUrl = "";
                this.trackView = ({
                    id: e
                }) => {
                    if (this.configStore.isLoaded) {
                        this.trackWithImage(e, "view");
                        this.timingMap.set(e, Date.now())
                    } else this.viewQueue.enqueue(e)
                };
                this.trackClose = ({
                    id: e
                }) => {
                    this.trackWithImage(e, "close")
                };
                this.trackTriggerClick = ({
                    id: e
                }) => {
                    this.trackNavigation({
                        id: e
                    }, !0)
                };
                this.trackNavigation = ({
                    id: e
                }, t = !1) => {
                    const i = this.configStore.configs.get(e);
                    if (!i) return;
                    const s = new URL(this.attachTrackingParamsToUrl(this.baseUrl + "/click", e));
                    t && s.searchParams.set("beaconTrack", "true");
                    this.environmentModel.isUngatedFor("WebInteractives:JSTracking") && i.shouldUseJsTracking && s.searchParams.set("beaconTrack", "true");
                    s.searchParams.has("beaconTrack") && ("sendBeacon" in navigator ? navigator.sendBeacon(s) : fetch(s, {
                        method: "POST",
                        keepalive: !0
                    }))
                };
                this.analyticsStore = e;
                this.configStore = t;
                this.environmentModel = i;
                this.ctaViewedStore = s
            }
            init() {
                this.baseUrl = Ts({
                    env: this.environmentModel.env,
                    hublet: this.environmentModel.hublet
                });
                if (!this.environmentModel.isPreview && !this.environmentModel.isTemplate) {
                    this.registerHandlers();
                    this.listenForStoreLoad();
                    this.listenForViewChange();
                    this.handleViews()
                }
            }
            registerHandlers() {
                h.registerHandlers({
                    [s.CLOSE_INTERACTIVE]: this.trackClose,
                    [s.NAVIGATE_PAGE]: this.trackNavigation,
                    [s.TRIGGER_CTA]: this.trackTriggerClick
                });
                this.eventManager.on(Gi.TRIGGER_OPEN, this.trackTriggerClick)
            }
            listenForStoreLoad() {
                this.configStore.subscribe((e, t) => {
                    e.isLoaded && !t.isLoaded && this.flushViewQueue()
                })
            }
            listenForViewChange() {
                this.ctaViewedStore.subscribe(() => {
                    this.handleViews()
                })
            }
            handleViews() {
                for (const e of this.ctaViewedStore.viewed)
                    if (!this.hasViewed.has(e)) {
                        this.trackView({
                            id: e
                        });
                        this.hasViewed.add(e)
                    }
            }
            flushViewQueue() {
                do {
                    const e = this.viewQueue.dequeue();
                    e && this.trackView({
                        id: e
                    })
                } while (this.viewQueue.peek())
            }
            trackWithImage(e, t) {
                Cs("Tracking:", t, e);
                let i = `${this.baseUrl}/${t}`;
                i = this.attachTrackingParamsToUrl(i, e);
                (new Image).src = i
            }
            logTooLargeAnalytics() {
                Cs("Logging url that will be truncated");
                const e = this.analyticsStore.analytics;
                if (!e) return;
                const t = JSON.stringify(Object.assign({}, e, {
                    portalId: this.environmentModel.portalId
                }));
                fetch(this.baseUrl + "/log", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: t
                })
            }
            attachTrackingParamsToUrl(e, t) {
                const i = new URL(e),
                    s = this.configStore.configs.get(t);
                if (!s) return i.href;
                i.searchParams.set("webInteractiveId", String(s.webInteractiveId));
                i.searchParams.set("containerType", s.containerType);
                i.searchParams.set("portalId", String(this.environmentModel.portalId));
                i.searchParams.set("audienceId", String(s.audienceId));
                s.campaignGuid && i.searchParams.set("campaignId", s.campaignGuid);
                const n = this.analyticsStore.analytics;
                n && Object.entries(n).forEach(([e, t]) => {
                    t && i.searchParams.set(e, String(t))
                });
                const o = this.timingMap.get(t);
                if (o) {
                    i.searchParams.set("timeStarted", String(o));
                    i.searchParams.set("timeFinished", String(Date.now()))
                }
                i.href.length;
                return i.href
            }
        }

        function ys(e) {
            return new bs(e)
        }
        const ws = ["elementToEmbed"];
        class Es {
            constructor({
                configModel: e,
                customerCtaOptions: t,
                scheduleCTA: i
            }) {
                this.defferedPromiseMap = new Map;
                this.handleCtaLoad = ({
                    id: e
                }) => {
                    if (!this.defferedPromiseMap.has(e)) return;
                    this.defferedPromiseMap.get(e)(null);
                    this.defferedPromiseMap.delete(e)
                };
                this.handleNavigate = ({
                    id: e
                }) => {
                    const t = this.customerCtaOptions.options.get(e);
                    t && "function" == typeof t.onNavigate && t.onNavigate()
                };
                this.loadCta = e => new Promise((t, i) => {
                    e || i(new Error("Invalid options"));
                    const {
                        contentId: s,
                        options: n
                    } = e, {
                        elementToEmbed: o
                    } = n, r = ie(n, ws);
                    s || i(new Error("Invalid options"));
                    this.scheduleCTA(s, Array.isArray(o) ? o : [o]);
                    Object.keys(r).length && this.customerCtaOptions.setOption(s, r);
                    this.defferedPromiseMap.set(s, t)
                });
                this.configModel = e;
                this.customerCtaOptions = t;
                this.scheduleCTA = i;
                window.hsCtasOnReady = window.hsCtasOnReady || [];
                this.attachToWindow();
                this.registerHandlers()
            }
            init() {
                this.flushOnReadyQueue()
            }
            registerHandlers() {
                h.registerHandlers({
                    [s.STARTED]: this.handleCtaLoad,
                    [s.NAVIGATE_PAGE]: this.handleNavigate
                })
            }
            attachToWindow() {
                window.__PRIVATE__HubspotCtaClient = {
                    loadCta: this.loadCta
                }
            }
            flushOnReadyQueue() {
                const e = window.hsCtasOnReady;
                for (; e.length;) {
                    const t = e.shift();
                    "function" == typeof t && t()
                }
                Object.defineProperty(window.hsCtasOnReady, "push", {
                    value: e => {
                        "function" == typeof e && e()
                    },
                    writable: !0
                })
            }
        }

        function Ss(e) {
            return new Es(e)
        }
        const As = (...e) => {
            o("[NonFramedCTA]", ...e)
        };
        class Is {
            constructor({
                cta: e,
                onNavigate: t,
                onView: i
            }) {
                this.removeEventListenerCallbacks = [];
                this.elementObserver = q();
                this.hasView = !1;
                this.id = "";
                this.cta = e;
                this.id = this.cta.id;
                this.onNavigate = t;
                this.onView = i;
                this.listenForAnchorClicks();
                this.listenForView()
            }
            getCtaInstance() {
                this.cta && this.cta.parentNode || (this.cta = document.getElementById(this.id));
                return this.cta
            }
            replaceCtaInstance(e) {
                As("Replacing html", e, this.id);
                const t = this.getCtaInstance();
                if (!t) return;
                const i = Ve(t, e);
                this.removeExistingEventListeners();
                t.innerHTML = i.innerHTML;
                t.dataset.rendered = "true";
                this.reapplyEventListeners(t)
            }
            removeExistingEventListeners() {
                this.hasView || this.elementObserver.unobserve(this.cta);
                this.removeEventListenerCallbacks.forEach(e => e());
                this.removeEventListenerCallbacks = []
            }
            reapplyEventListeners(e) {
                this.id = e.id;
                this.cta = e;
                this.listenForAnchorClicks();
                this.hasView || this.listenForView()
            }
            listenForAnchorClicks() {
                const e = [...this.cta.querySelectorAll("a")];
                "A" === this.cta.tagName && e.push(this.cta);
                for (const t of e) {
                    const e = "_blank" === t.target,
                        i = e => {
                            e.preventDefault()
                        };
                    let s;
                    t.classList.contains("hs-cta-trigger-button") && (s = ke(t));
                    const n = i => {
                            i.preventDefault();
                            gi(i) && this.onNavigate(t.href, e, s)
                        },
                        o = i => {
                            if ("Enter" === i.key) {
                                i.preventDefault();
                                this.onNavigate(t.href, e, s)
                            }
                        };
                    t.addEventListener("click", i);
                    t.addEventListener("mouseup", n);
                    t.addEventListener("keypress", o);
                    this.removeEventListenerCallbacks.push(() => {
                        t.removeEventListener("click", i);
                        t.removeEventListener("mouseup", n);
                        t.removeEventListener("keypress", o)
                    })
                }
            }
            listenForView() {
                this.elementObserver.observe(this.cta, () => {
                    this.onView();
                    this.hasView = !0;
                    this.elementObserver.unobserve(this.cta)
                })
            }
        }

        function Ms(e) {
            return new Is(e)
        }
        const Os = (...e) => {
                o("[populateLinksWithTrackingParams]", ...e)
            },
            Ps = ["currentUrl", "referrer", "canon", "canonicalUrl", "pageUrl", "contentType", "encryptedPayload", "pageId", "analyticsPageId", "hutk", "hstc", "hssc", "hsfp", "utk", "containerType", "webInteractiveId", "webInteractiveContentId", "audienceId", "campaignGuid", "userAgent", "timeStarted", "timeFinished", "redirectUrl", "skip", "includeInitial", "pageTitle", "contentGroupId", "portalId"],
            _s = `https://${(new Date).getTime()}-dummy.com`,
            Ls = (e, t) => {
                let i, s = !1;
                try {
                    i = new URL(e)
                } catch (t) {
                    Os("[populateLinksWithTrackingParams]", "Checking for relative URL", e);
                    s = !0
                }
                if (s) try {
                    i = new URL(`${_s}${e.startsWith("/"),""}${e}`)
                } catch (t) {
                    Os("Could not parse url for link", t);
                    return e
                }
                Object.entries(t).forEach(([e, t]) => {
                    Ps.includes(e) ? null != t && i.searchParams.set(e, String(t)) : Os("Invalid analytics parameter passed", e)
                });
                const n = i.href;
                return s ? n.replace(_s, "") : n
            };
        var Fs = (e, t = [...document.querySelectorAll(".hs-web-interactive a")]) => {
            t.length && t.forEach(t => {
                const i = t.getAttribute("href");
                i && !i.startsWith("javascript") && t.setAttribute("href", Ls(i, e))
            })
        };
        const Rs = ["isHubspotPage"],
            Ns = "render/html";

        function ks(e) {
            let {
                isHubspotPage: t
            } = e, i = ie(e, Rs);
            const s = {};
            t && (s.isHubspotPage = "true");
            return ne(Object.assign({}, i, {
                extraParams: s,
                path: Ns
            }))
        }
        class Hs {
            constructor() {
                this.handleFetchFailed = () => {
                    this.store.setState(e => Object.assign({}, e, {
                        requestError: !0
                    }))
                };
                this.handleFetchSucceded = e => {
                    this.store.setState(t => Object.assign({}, t, {
                        renderedHtmlMap: Object.assign({}, t.renderedHtmlMap, {
                            htmlMap: e
                        }),
                        isLoaded: !0
                    }))
                };
                const e = {
                    renderedHtmlMap: {},
                    request: null,
                    requestError: !1,
                    isLoaded: !1
                };
                this.store = new A(e)
            }
            init(e) {
                this.store.setState(t => Object.assign({}, t, {
                    request: e
                }));
                return this.fetchEmbeddedHtml()
            }
            subscribe(e) {
                this.store.subscribe(e)
            }
            get renderedHtmlMap() {
                return this.store.state.renderedHtmlMap
            }
            get isLoaded() {
                return this.store.state.isLoaded
            }
            fetch(e) {
                return fetch(e).then(e => {
                    if (!e.ok) {
                        this.handleFetchFailed();
                        return Promise.resolve(null)
                    }
                    return e.json().then(e => {
                        this.handleFetchSucceded(e);
                        return e
                    }).catch(this.handleFetchFailed)
                }).catch(this.handleFetchFailed)
            }
            fetchEmbeddedHtml() {
                const e = this.store.state.request;
                if (!e) return Promise.resolve(null);
                const t = ks(e);
                return this.fetch(t)
            }
        }
        var Ds = new Hs;
        const Bs = (...e) => {
            o("[NonFramedCTAController", ...e)
        };
        class Vs {
            constructor({
                handleView: e,
                configStore: t,
                handleNavigation: i,
                analyticsStore: s,
                environmentModel: n,
                metricsController: o,
                scheduledCTAsModel: r
            }) {
                this.componentMap = new Map;
                this.eventManager = Ui.getInstance();
                this.cleanupFuncs = [];
                this.flushScheduledCTAs = () => {
                    for (const e of this.scheduledCTAsModel.scheduledCTAs) {
                        const t = this.configStore.embeddedConfigs.get(e);
                        if (!t || !t.isHTMLVersionOnly) return;
                        if (!this.scheduledCTAsModel.elementsForEmbeddedCTAs.has(e)) return;
                        const i = this.scheduledCTAsModel.elementsForEmbeddedCTAs.get(e);
                        let s = this.nonFramedCTAContainers.get(e);
                        s || (s = []);
                        this.nonFramedCTAContainers.set(e, [...s, ...i]);
                        this.createViewsForElements(e, i);
                        this.requestHTML();
                        this.scheduledCTAsModel.removeCTA(e)
                    }
                };
                this.getAnchorsFromElements = e => {
                    let t = [];
                    e.forEach(e => {
                        "A" === e.tagName && (t = [...t, e]);
                        t = [...t, ...e.querySelectorAll("a")]
                    });
                    return t
                };
                this.handleView = e;
                this.handleNavigation = i;
                this.configStore = t;
                this.analyticsStore = s;
                this.environmentModel = n;
                this.renderedHtmlStore = Ds;
                this.metricsController = o;
                this.scheduledCTAsModel = r
            }
            init({
                nonFramedCTAContainers: e
            }) {
                this.nonFramedCTAContainers = e;
                e.size && this.requestHTML();
                this.listenForConfigs();
                this.listenForScheduledCTAs();
                this.environmentModel.isPreview || this.environmentModel.isPreviewPage || this.listenForAnalyticsUpdate()
            }
            listenForScheduledCTAs() {
                this.scheduledCTAsModel.subscribe(this.flushScheduledCTAs)
            }
            cleanup() {
                this.cleanupFuncs.forEach(e => e())
            }
            requestHTML() {
                const e = e => {
                        if (!e) return;
                        this.metricsController.trackRender(!0);
                        Object.keys(e).forEach(t => {
                            const i = Number(t),
                                s = e[i],
                                n = this.componentMap.get(i);
                            if (n) n.forEach(e => {
                                e.replaceCtaInstance(s)
                            });
                            else {
                                Bs("Views not created yet, just replacing existing elements");
                                const e = this.nonFramedCTAContainers.get(i);
                                e && e.length && e.forEach(e => {
                                    const t = Ve(e, s);
                                    e.innerHTML = t.innerHTML;
                                    e.dataset.rendered = "true"
                                })
                            }
                            this.hydrateLinksWithAllData(i)
                        });
                        const t = Object.keys(e).map(Number);
                        this.eventManager.emit(Gi.REPLACED_INLINE_HTML, {
                            ids: t
                        })
                    },
                    {
                        isPreview: t,
                        currentUrl: i,
                        portalId: s,
                        env: n,
                        hublet: o,
                        versionId: r
                    } = this.environmentModel,
                    a = [...this.nonFramedCTAContainers.keys()].filter(e => !this.renderedHtmlStore.renderedHtmlMap[e]);
                if (!a.length) return;
                const c = {
                    contentIds: a,
                    currentUrl: i,
                    portalId: s,
                    env: n,
                    hublet: o,
                    analytics: this.analyticsStore.analytics,
                    isPreview: t,
                    versionId: r,
                    isHubspotPage: this.environmentModel.isCos()
                };
                Bs("Requesting HTML", c);
                this.renderedHtmlStore.init(c).then(e).catch(e => {
                    Bs("Failed getting HTML", e);
                    this.metricsController.trackRender(!1)
                })
            }
            createViewsForElements(e, t) {
                const i = [];
                let s = 0;
                for (const n of t) {
                    n.id = `hs-cta-${e}-${s++}`;
                    const o = Ms({
                        cta: n,
                        onNavigate: (t, i, s) => {
                            s ? this.eventManager.emit(Gi.TRIGGER_OPEN, {
                                id: s
                            }) : this.handleNavigation(t, e, i)
                        },
                        onView: () => {
                            this.handleView(e)
                        }
                    });
                    i.push(o);
                    const r = this.configStore.configs.get(e);
                    if (r) {
                        const e = this.getAnchorsFromElements(t);
                        Fs({
                            webInteractiveId: r.webInteractiveId,
                            audienceId: r.audienceId,
                            containerType: r.containerType,
                            campaignId: r.campaignGuid,
                            pageUrl: this.environmentModel.currentUrl,
                            portalId: this.environmentModel.portalId
                        }, e)
                    }
                }
                const n = this.componentMap.get(e) || [];
                this.componentMap.set(e, [...n, ...i])
            }
            createViews() {
                for (const [e, t] of this.nonFramedCTAContainers) this.createViewsForElements(e, t)
            }
            hydrateLinksWithAllData(e) {
                let t = {};
                const i = this.configStore.configs.get(e);
                i && (t = {
                    webInteractiveId: i.webInteractiveId,
                    audienceId: i.audienceId,
                    containerType: i.containerType,
                    campaignId: i.campaignGuid,
                    pageUrl: this.environmentModel.currentUrl,
                    portalId: this.environmentModel.portalId
                });
                const s = this.analyticsStore.analytics;
                t = Object.assign({}, t, s);
                let n = [];
                for (const [, e] of this.nonFramedCTAContainers) n = [...n, ...this.getAnchorsFromElements(e)];
                Fs(t, n)
            }
            listenForConfigs() {
                this.cleanupFuncs.push(this.configStore.subscribe(() => {
                    this.scheduledCTAsModel.scheduledCTAs.size > 0 && this.flushScheduledCTAs();
                    this.createViews()
                }))
            }
            listenForAnalyticsUpdate() {
                const e = () => {
                    let e = [];
                    for (const [, t] of this.nonFramedCTAContainers) e = [...e, ...this.getAnchorsFromElements(t)];
                    Fs(this.analyticsStore.analytics, e)
                };
                this.analyticsStore.analytics.isLoaded ? e() : this.cleanupFuncs.push(this.analyticsStore.subscribe((t, i) => {
                    !i.isLoaded && t.isLoaded && e()
                }))
            }
        }

        function xs(e) {
            return new Vs(e)
        }
        const $s = ["openInNewTab", "onNavigate"];
        class Us {
            constructor() {
                const e = {
                    options: new Map
                };
                this.store = new A(e)
            }
            subscribe(e) {
                this.store.subscribe(e)
            }
            setOption(e, t) {
                const {
                    openInNewTab: i,
                    onNavigate: s
                } = t;
                ie(t, $s);
                this.store.setState(t => {
                    const n = structuredClone(t.options);
                    n.set(e, {
                        openInNewTab: i,
                        onNavigate: s
                    });
                    return Object.assign({}, t, {
                        options: n
                    })
                })
            }
            get options() {
                return this.store.state.options
            }
        }

        function Gs() {
            return new Us
        }
        class js {
            constructor() {
                const e = {
                    scheduledCTAs: new Set,
                    elementsForEmbeddedCTAs: new Map
                };
                this.store = new A(e)
            }
            subscribe(e) {
                this.store.subscribe(e)
            }
            scheduleCTA(e) {
                this.store.setState(t => Object.assign({}, t, {
                    scheduledCTAs: new Set([...t.scheduledCTAs, e])
                }))
            }
            scheduleEmbeddedCTA(e, t) {
                this.store.setState(i => Object.assign({}, i, {
                    scheduledCTAs: new Set([...i.scheduledCTAs, e]),
                    elementsForEmbeddedCTAs: Y(i.elementsForEmbeddedCTAs, new Map([
                        [e, t]
                    ]))
                }))
            }
            removeCTA(e) {
                this.store.setState(t => {
                    const i = structuredClone(t.scheduledCTAs);
                    i.delete(e);
                    return Object.assign({}, t, {
                        scheduledCTAs: i,
                        elementsForEmbeddedCTAs: W(t.elementsForEmbeddedCTAs, (t, i) => i !== e)
                    })
                })
            }
            get scheduledCTAs() {
                return this.store.state.scheduledCTAs
            }
            get elementsForEmbeddedCTAs() {
                return this.store.state.elementsForEmbeddedCTAs
            }
        }

        function qs() {
            return new js
        }
        const Ws = {
                onCallToActionReady: "onCallToActionReady",
                onCallToActionViewed: "onCallToActionViewed",
                onCallToActionNavigated: "onCallToActionNavigated",
                onCallToActionFormSubmitted: "onCallToActionFormSubmitted",
                onCallToActionReplacedInlineHTML: "onCallToActionReplacedInlineHTML"
            },
            zs = "hsCallsToActionCallback",
            Ys = 1e3;
        class Qs {
            constructor({
                configModel: e
            }) {
                this.eventEmitter = a();
                this.eventManager = Ui.getInstance();
                this.refresh = X(() => {
                    this.eventManager.emit(Gi.REFRESH, {})
                }, Ys);
                this.configModel = e;
                window.hsCallsToActionsReady = window.hsCallsToActionsReady || [];
                this.registerHandlers()
            }
            init() {
                this.attachToWindow();
                this.flushOnReadyQueue()
            }
            handleView(e) {
                this.handleEventCall({
                    id: e
                }, Ws.onCallToActionViewed)
            }
            closeAll() {
                this.eventManager.emit(Gi.CLOSE_ALL, {})
            }
            close(e) {
                this.eventManager.emit(Gi.CLOSE, {
                    id: e
                })
            }
            attachToWindow() {
                window.HubSpotCallsToActions = {
                    on: this.eventEmitter.on.bind(this.eventEmitter),
                    off: this.eventEmitter.off.bind(this.eventEmitter),
                    refresh: this.refresh,
                    closeAll: this.closeAll.bind(this),
                    close: this.close.bind(this)
                }
            }
            flushOnReadyQueue() {
                const e = window.hsCallsToActionsReady;
                for (; e.length;) {
                    const t = e.shift();
                    "function" == typeof t && t()
                }
                Object.defineProperty(window.hsCallsToActionsReady, "push", {
                    value: e => {
                        "function" == typeof e && e()
                    },
                    writable: !0
                })
            }
            handleEventCall(e, t) {
                this.eventEmitter.emit(t, e);
                window.postMessage({
                    type: zs,
                    id: e.id,
                    eventName: t,
                    data: e
                })
            }
            registerHandlers() {
                h.registerHandlers({
                    [s.STARTED]: e => this.handleEventCall(e, Ws.onCallToActionReady),
                    [s.NAVIGATE_PAGE]: e => this.handleEventCall(e, Ws.onCallToActionNavigated),
                    [s.CTA_FORM_SUBMITTED]: e => this.handleEventCall(e, Ws.onCallToActionFormSubmitted)
                });
                this.eventManager.on(Gi.REPLACED_INLINE_HTML, e => this.handleEventCall(e, Ws.onCallToActionReplacedInlineHTML))
            }
        }

        function Xs(e) {
            return new Qs(e)
        }
        class Ks {
            constructor(e) {
                this.environmentModel = e.environmentModel;
                this.configStore = e.configsStore
            }
            init() {
                window.addEventListener("pageshow", e => {
                    e.persisted && this.shouldReloadPage() && window.location.reload()
                })
            }
            shouldReloadPage() {
                return this.environmentModel.isUngatedFor("WebInteractives:BFCacheReload") && this.configStore.configs.size > 0
            }
        }

        function Js(e) {
            return new Ks(e)
        }
        const Zs = (...e) => {
            o("[WebInteractiveApplicationContainer]", ...e)
        };

        function en(e) {
            const [t, i] = e.split("?");
            if (!i) return {
                location: t,
                queryParams: {}
            };
            return i.split("&").reduce((e, t) => {
                const [i, s] = t.split("=");
                return Object.assign({
                    [i]: s
                }, e)
            }, {})
        }
        class tn extends G {
            constructor({
                configStore: e,
                environmentModel: t
            }) {
                super();
                this.scheduleCTA = (e, t) => {
                    t ? this.scheduledCTAs.scheduleEmbeddedCTA(e, t) : this.scheduledCTAs.scheduleCTA(e);
                    this.configStore.fetchConfigsWithIds([e])
                };
                this.handleView = e => {
                    this.viewedStore.markAsViewed(e);
                    this.analyticsProxyController.flushViewQueue(e);
                    this.thirdPartyApiController.handleView(e)
                };
                this.handleNavigation = (e, t, i = !1) => {
                    $(this.getNavigationUrl({
                        url: e,
                        openNewTab: i
                    }, t), i)
                };
                this.configStore = e;
                this.environmentModel = t;
                this.viewedStore = Me();
                this.customerCTAOptions = Gs();
                this.scheduledCTAs = qs();
                this.overlayedInteractivesController = new zi({
                    configModel: this.configStore,
                    environmentModel: t,
                    analyticsModel: this.analyticsStore,
                    scheduledCTAsModel: this.scheduledCTAs,
                    handleView: this.handleView,
                    scheduleCTA: this.scheduleCTA
                });
                this.embeddedInteractivesController = new Xi({
                    environmentModel: t,
                    configStore: e,
                    scheduledCTAsModel: this.scheduledCTAs,
                    analyticsModel: this.analyticsStore,
                    handleView: this.handleView
                });
                this.ignorerController = es({
                    configStore: e,
                    environmentModel: t
                });
                this.previewController = ns({
                    environmentModel: this.environmentModel
                });
                this.responsiveController = ms();
                this.metricsController = vs({
                    environmentModel: this.environmentModel,
                    configStore: e
                });
                this.ctaAnalyticsController = ys({
                    configsStore: this.configStore,
                    analyticsStore: this.analyticsStore,
                    environmentModel: this.environmentModel,
                    ctaViewedStore: this.viewedStore
                });
                this.apiClientController = Ss({
                    configModel: this.configStore,
                    customerCtaOptions: this.customerCTAOptions,
                    scheduleCTA: this.scheduleCTA
                });
                this.thirdPartyApiController = Xs({
                    configModel: this.configStore
                });
                this.nonFramedCTAController = xs({
                    configStore: this.configStore,
                    handleView: this.handleView,
                    analyticsStore: this.analyticsStore,
                    handleNavigation: this.handleNavigation,
                    environmentModel: this.environmentModel,
                    metricsController: this.metricsController,
                    scheduledCTAsModel: this.scheduledCTAs
                });
                this.bfCacheController = Js({
                    environmentModel: this.environmentModel,
                    configsStore: this.configStore
                });
                this.listenForConfigs()
            }
            init() {
                this.environmentModel.init();
                this.metricsController.init();
                this.previewController.init();
                this.responsiveController.init();
                this.parsedDomResults = Be();
                this.configStore.init(this._buildConfigRequest()).then(e => {
                    this.processConfigResponse(e)
                }).catch(e => {
                    Zs("Error fetching configs", e)
                });
                this.embeddedInteractivesController.init({
                    embedContainers: this.parsedDomResults.embedContainers
                });
                this.nonFramedCTAController.init({
                    nonFramedCTAContainers: this.parsedDomResults.nonFramedCTAContainers
                });
                this.overlayedInteractivesController.init({
                    clickTriggerButtons: this.parsedDomResults.clickTriggerButtons
                });
                this.ctaAnalyticsController.init();
                this.apiClientController.init();
                this.thirdPartyApiController.init();
                this.bfCacheController.init()
            }
            _buildConfigRequest() {
                let e = [];
                const {
                    isPreview: t,
                    previewId: i
                } = this.environmentModel;
                e = t && i ? [i] : [...this.parsedDomResults.uniqueIds];
                return ue.buildConfigRequest(this.environmentModel, e, this.analyticsStore.store.state)
            }
            getNavigationUrl({
                url: e
            }, t) {
                const i = new URL(e);
                if (!i.searchParams.has("encryptedPayload")) return e;
                const s = en(e),
                    n = this.configStore.configs.get(t);
                if (!n) return e;
                i.searchParams.set("webInteractiveId", String(n.webInteractiveId));
                i.searchParams.set("containerType", n.containerType);
                n.campaignGuid && i.searchParams.set("campaignId", n.campaignGuid);
                n.contentModelId && i.searchParams.set("webInteractiveContentId", String(n.contentModelId));
                n.audienceId && i.searchParams.set("audienceId", String(n.audienceId));
                this.analyticsStore.analytics.hutk && i.searchParams.set("hutk", this.analyticsStore.analytics.hutk);
                this.environmentModel.language && i.searchParams.set("hsLang", this.environmentModel.language);
                i.searchParams.delete("encryptedPayload");
                return decodeURIComponent(s.encryptedPayload) === s.encryptedPayload ? `${i.href}&encryptedPayload=${encodeURIComponent(s.encryptedPayload)}` : `${i.href}&encryptedPayload=${s.encryptedPayload}`
            }
            getShouldOpenNewTab(e, t) {
                if (!this.customerCTAOptions.options.has(t)) return e.openNewTab;
                return this.customerCTAOptions.options.get(t).openInNewTab || !1
            }
            listenForConfigs() {
                this.configStore.subscribe((e, t) => {
                    setTimeout(() => {
                        if (e.configs.size !== t.configs.size)
                            for (const [e, t] of this.configStore.configs) h.broadcast(e, {
                                type: s.SEND_CTA_CONFIG,
                                payload: Object.assign({
                                    portalId: this.environmentModel.portalId,
                                    pageUrl: this.environmentModel.currentUrl,
                                    pageTitle: document.title,
                                    gates: this.environmentModel.gates,
                                    pageId: this.environmentModel.pageId
                                }, t)
                            })
                    })
                })
            }
            processConfigResponse(e) {
                if (e && Array.isArray(e.gates)) {
                    Zs("Retrieved Gates from config response", e.gates);
                    this.environmentModel.setGates(e.gates)
                }
            }
        }
        const sn = new tn({
            configStore: me,
            environmentModel: Ae
        });
        window.__hsWebInteractiveInstance = sn;
        var nn = sn;
        const on = () => !(!window.disabledHsPopups || !(window.disabledHsPopups.indexOf("LEADFLOW") > -1 || window.disabledHsPopups.indexOf("CTAS") > -1)) || !!window.hsInEditor;

        function rn() {
            document.querySelectorAll(".hs-cta-embed").forEach(e => {
                e.classList.add("hs-cta-embed__loaded");
                const t = e.querySelector(".hs-cta-loading-dot__container");
                t && t.remove();
                const i = e.querySelector(".hs-cta-embed__skeleton");
                i && i.remove()
            })
        }

        function an() {
            rn();
            new MutationObserver(e => {
                for (const t of e) "childList" === t.type && t.addedNodes.forEach(e => {
                    1 === e.nodeType && e instanceof HTMLElement && e.querySelector(".hs-cta-embed") && rn()
                })
            }).observe(document.body, {
                childList: !0,
                subtree: !0
            })
        }
        const cn = () => {
                if (on()) {
                    if (window.hsInEditor) try {
                        an()
                    } catch (e) {
                        console.error("Error marking cta embed preview as loaded", e)
                    }
                } else if (window.hubspot_web_interactives_running) console.error("duplicate instance of web interactives app exists");
                else {
                    nn.init();
                    window.hubspot_web_interactives_running = !0
                }
            },
            ln = () => {
                cn();
                document.removeEventListener("DOMContentLoaded", ln)
            };
        "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", ln) : cn()
    }
});