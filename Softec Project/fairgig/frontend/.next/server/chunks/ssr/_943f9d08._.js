module.exports = [
"[project]/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API",
    ()=>API,
    "ApiError",
    ()=>ApiError,
    "apiGet",
    ()=>apiGet,
    "apiGetBlob",
    ()=>apiGetBlob,
    "apiPatch",
    ()=>apiPatch,
    "apiPost",
    ()=>apiPost,
    "apiPostForm",
    ()=>apiPostForm
]);
const API = {
    auth: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:8001',
    earnings: process.env.NEXT_PUBLIC_EARNINGS_URL || 'http://localhost:8002',
    anomaly: process.env.NEXT_PUBLIC_ANOMALY_URL || 'http://localhost:8003',
    analytics: process.env.NEXT_PUBLIC_ANALYTICS_URL || 'http://localhost:8004',
    certificate: process.env.NEXT_PUBLIC_CERTIFICATE_URL || 'http://localhost:8005',
    grievance: process.env.NEXT_PUBLIC_GRIEVANCE_URL || 'http://localhost:8006'
};
class ApiError extends Error {
    status;
    detail;
    constructor(message, status, detail){
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.detail = detail;
    }
}
async function parseErrorResponse(res, fallbackPrefix) {
    let detail;
    try {
        const payload = await res.json();
        if (typeof payload?.detail === 'string') {
            detail = payload.detail;
        } else if (Array.isArray(payload?.detail) && payload.detail.length > 0) {
            detail = payload.detail.map((d)=>d?.msg).filter(Boolean).join(', ');
        }
    } catch  {
    // Ignore JSON parse failures and use fallback message.
    }
    return new ApiError(detail || `${fallbackPrefix}: ${res.status}`, res.status, detail);
}
async function apiGet(url, token) {
    const res = await fetch(url, {
        headers: token ? {
            Authorization: `Bearer ${token}`
        } : undefined,
        cache: 'no-store'
    });
    if (!res.ok) {
        throw await parseErrorResponse(res, 'GET failed');
    }
    return res.json();
}
async function apiGetBlob(url, token) {
    const res = await fetch(url, {
        headers: token ? {
            Authorization: `Bearer ${token}`
        } : undefined,
        cache: 'no-store'
    });
    if (!res.ok) {
        throw await parseErrorResponse(res, 'GET blob failed');
    }
    return {
        blob: await res.blob(),
        contentDisposition: res.headers.get('content-disposition') || ''
    };
}
async function apiPost(url, body, token) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {}
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        throw await parseErrorResponse(res, 'POST failed');
    }
    return res.json();
}
async function apiPatch(url, body, token) {
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {}
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        throw await parseErrorResponse(res, 'PATCH failed');
    }
    return res.json();
}
async function apiPostForm(url, form, token) {
    const res = await fetch(url, {
        method: 'POST',
        headers: token ? {
            Authorization: `Bearer ${token}`
        } : undefined,
        body: form
    });
    if (!res.ok) {
        throw await parseErrorResponse(res, 'POST form failed');
    }
    return res.json();
}
}),
"[project]/app/signup/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SignupPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function SignupPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        email: '',
        password: '',
        full_name: '',
        city: 'Lahore',
        role: 'worker',
        invite_code: ''
    });
    const requiresInviteCode = form.role === 'verifier' || form.role === 'advocate';
    async function handleSignup(event) {
        event.preventDefault();
        const payload = {
            ...form,
            email: form.email.trim().toLowerCase(),
            invite_code: form.invite_code.trim()
        };
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiPost"])(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API"].auth}/auth/signup`, payload);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Signup complete. Please login.');
            router.push('/login');
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] && error.detail) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Signup failed: ${error.detail}`);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Signup failed. Please check your details and try again.');
            }
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto max-w-xl px-4 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "glass rounded-2xl p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold",
                    children: "Signup"
                }, void 0, false, {
                    fileName: "[project]/app/signup/page.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-sm text-slate-300",
                    children: "Create your FairGig account."
                }, void 0, false, {
                    fileName: "[project]/app/signup/page.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSignup,
                    className: "mt-5 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "w-full rounded-xl border border-white/15 bg-slate-900/70 p-3 text-sm",
                            placeholder: "Full Name",
                            value: form.full_name,
                            onChange: (e)=>setForm((p)=>({
                                        ...p,
                                        full_name: e.target.value
                                    }))
                        }, void 0, false, {
                            fileName: "[project]/app/signup/page.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "w-full rounded-xl border border-white/15 bg-slate-900/70 p-3 text-sm",
                            type: "email",
                            placeholder: "Email",
                            value: form.email,
                            onChange: (e)=>setForm((p)=>({
                                        ...p,
                                        email: e.target.value
                                    }))
                        }, void 0, false, {
                            fileName: "[project]/app/signup/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "w-full rounded-xl border border-white/15 bg-slate-900/70 p-3 text-sm",
                            type: "password",
                            placeholder: "Password",
                            value: form.password,
                            onChange: (e)=>setForm((p)=>({
                                        ...p,
                                        password: e.target.value
                                    }))
                        }, void 0, false, {
                            fileName: "[project]/app/signup/page.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "w-full rounded-xl border border-white/15 bg-slate-900/70 p-3 text-sm",
                            placeholder: "City",
                            value: form.city,
                            onChange: (e)=>setForm((p)=>({
                                        ...p,
                                        city: e.target.value
                                    }))
                        }, void 0, false, {
                            fileName: "[project]/app/signup/page.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: "w-full rounded-xl border border-white/15 bg-slate-900/70 p-3 text-sm",
                            value: form.role,
                            onChange: (e)=>setForm((p)=>({
                                        ...p,
                                        role: e.target.value
                                    })),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "worker",
                                    children: "Worker"
                                }, void 0, false, {
                                    fileName: "[project]/app/signup/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "verifier",
                                    children: "Verifier"
                                }, void 0, false, {
                                    fileName: "[project]/app/signup/page.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "advocate",
                                    children: "Advocate"
                                }, void 0, false, {
                                    fileName: "[project]/app/signup/page.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/signup/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        requiresInviteCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "w-full rounded-xl border border-white/15 bg-slate-900/70 p-3 text-sm",
                                    placeholder: form.role === 'verifier' ? 'Visitor code' : 'Advocate code',
                                    value: form.invite_code,
                                    onChange: (e)=>setForm((p)=>({
                                                ...p,
                                                invite_code: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/app/signup/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-400",
                                    children: form.role === 'verifier' ? 'Verifier accounts need the visitor code.' : 'Advocate accounts need the Softec code.'
                                }, void 0, false, {
                                    fileName: "[project]/app/signup/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/signup/page.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "w-full rounded-xl bg-violet px-4 py-3 font-semibold text-slate-950",
                            children: "Create account"
                        }, void 0, false, {
                            fileName: "[project]/app/signup/page.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/signup/page.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-sm text-slate-300",
                    children: [
                        "Already have an account? ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/login",
                            className: "text-teal",
                            children: "Go to Login"
                        }, void 0, false, {
                            fileName: "[project]/app/signup/page.tsx",
                            lineNumber: 75,
                            columnNumber: 36
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/signup/page.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/signup/page.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/signup/page.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_943f9d08._.js.map