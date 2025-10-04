var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, a as reactDomExports, R as React, b as React$1 } from "./vendor-7752ec68.js";
(/* @__PURE__ */ __name(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  __name(getFetchOpts, "getFetchOpts");
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
  __name(processPreload, "processPreload");
}, "polyfill"))();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a)
    m$1.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
__name(q, "q");
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
__name(_extends$2, "_extends$2");
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  __name(createBrowserLocation, "createBrowserLocation");
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  __name(createBrowserHref, "createBrowserHref");
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
__name(createBrowserHistory, "createBrowserHistory");
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
__name(invariant, "invariant");
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
__name(warning, "warning");
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
__name(createKey, "createKey");
function getHistoryState(location, index2) {
  return {
    usr: location.state,
    key: location.key,
    idx: index2
  };
}
__name(getHistoryState, "getHistoryState");
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends$2({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
__name(createLocation, "createLocation");
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
__name(createPath, "createPath");
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
__name(parsePath, "parsePath");
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index2 = getIndex();
  if (index2 == null) {
    index2 = 0;
    globalHistory.replaceState(_extends$2({}, globalHistory.state, {
      idx: index2
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  __name(getIndex, "getIndex");
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index2;
    index2 = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  __name(handlePop, "handlePop");
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex() + 1;
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  __name(push, "push");
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex();
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  __name(replace, "replace");
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  __name(createURL, "createURL");
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
__name(getUrlBasedHistory, "getUrlBasedHistory");
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename, false);
}
__name(matchRoutes, "matchRoutes");
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i], decoded, allowPartial);
  }
  return matches;
}
__name(matchRoutesImpl, "matchRoutesImpl");
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = /* @__PURE__ */ __name((route, index2, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index2,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  }, "flattenRoute");
  routes.forEach((route, index2) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index2);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index2, exploded);
      }
    }
  });
  return branches;
}
__name(flattenRoutes, "flattenRoutes");
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
__name(explodeOptionalSegments, "explodeOptionalSegments");
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
__name(rankRouteBranches, "rankRouteBranches");
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = /* @__PURE__ */ __name((s) => s === "*", "isSplat");
function computeScore(path, index2) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index2) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
__name(computeScore, "computeScore");
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n2, i) => n2 === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
__name(compareIndexes, "compareIndexes");
function matchRouteBranch(branch, pathname, allowPartial) {
  if (allowPartial === void 0) {
    allowPartial = false;
  }
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
__name(matchRouteBranch, "matchRouteBranch");
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index2) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index2] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index2];
    if (isOptional && !value) {
      memo[paramName] = void 0;
    } else {
      memo[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
__name(matchPath, "matchPath");
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else
    ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
__name(compilePath, "compilePath");
function decodePath(value) {
  try {
    return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
__name(decodePath, "decodePath");
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
__name(stripBasename, "stripBasename");
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
__name(resolvePath, "resolvePath");
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
__name(resolvePathname, "resolvePathname");
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
__name(getInvalidPathError, "getInvalidPathError");
function getPathContributingMatches(matches) {
  return matches.filter((match, index2) => index2 === 0 || match.route.path && match.route.path.length > 0);
}
__name(getPathContributingMatches, "getPathContributingMatches");
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
__name(getResolveToMatches, "getResolveToMatches");
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$2({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
__name(resolveTo, "resolveTo");
const joinPaths = /* @__PURE__ */ __name((paths) => paths.join("/").replace(/\/\/+/g, "/"), "joinPaths");
const normalizePathname = /* @__PURE__ */ __name((pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/"), "normalizePathname");
const normalizeSearch = /* @__PURE__ */ __name((search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search, "normalizeSearch");
const normalizeHash = /* @__PURE__ */ __name((hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash, "normalizeHash");
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
__name(isRouteErrorResponse, "isRouteErrorResponse");
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
__name(_extends$1, "_extends$1");
const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
const DataRouterStateContext = /* @__PURE__ */ reactExports.createContext(null);
const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
const RouteContext = /* @__PURE__ */ reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
const RouteErrorContext = /* @__PURE__ */ reactExports.createContext(null);
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
__name(useHref, "useHref");
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
__name(useInRouterContext, "useInRouterContext");
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
__name(useLocation, "useLocation");
function useIsomorphicLayoutEffect(cb) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb);
  }
}
__name(useIsomorphicLayoutEffect, "useIsomorphicLayoutEffect");
function useNavigate() {
  let {
    isDataRoute
  } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
__name(useNavigate, "useNavigate");
function useNavigateUnstable() {
  !useInRouterContext() ? invariant(false) : void 0;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
__name(useNavigateUnstable, "useNavigateUnstable");
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    future
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  return reactExports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
__name(useResolvedPath, "useResolvedPath");
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
__name(useRoutes, "useRoutes");
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState, future);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
      value: {
        location: _extends$1({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
__name(useRoutesImpl, "useRoutesImpl");
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
__name(DefaultErrorComponent, "DefaultErrorComponent");
const defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
const _RenderErrorBoundary = class _RenderErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
};
__name(_RenderErrorBoundary, "RenderErrorBoundary");
let RenderErrorBoundary = _RenderErrorBoundary;
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
__name(RenderedRoute, "RenderedRoute");
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _future;
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
    !(errorIndex >= 0) ? invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors: errors2
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index2) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index2 === 0) {
          warningOnce("route-fallback", false);
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index2) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index2 + 1));
    let getChildren = /* @__PURE__ */ __name(() => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    }, "getChildren");
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index2 === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
__name(_renderMatches, "_renderMatches");
var DataRouterHook$1 = /* @__PURE__ */ function(DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
  DataRouterHook2["UseNavigateStable"] = "useNavigate";
  return DataRouterHook2;
}(DataRouterHook$1 || {});
var DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
  return DataRouterStateHook2;
}(DataRouterStateHook$1 || {});
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  !ctx ? invariant(false) : void 0;
  return ctx;
}
__name(useDataRouterContext, "useDataRouterContext");
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant(false) : void 0;
  return state;
}
__name(useDataRouterState, "useDataRouterState");
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant(false) : void 0;
  return route;
}
__name(useRouteContext, "useRouteContext");
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant(false) : void 0;
  return thisRoute.route.id;
}
__name(useCurrentRouteId, "useCurrentRouteId");
function useRouteError() {
  var _state$errors;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
  if (error !== void 0) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
__name(useRouteError, "useRouteError");
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends$1({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}
__name(useNavigateStable, "useNavigateStable");
const alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned$1[key]) {
    alreadyWarned$1[key] = true;
  }
}
__name(warningOnce, "warningOnce");
function logV6DeprecationWarnings(renderFuture, routerFuture) {
  if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0)
    ;
  if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && (!routerFuture || routerFuture.v7_relativeSplatPath === void 0))
    ;
  if (routerFuture) {
    if (routerFuture.v7_fetcherPersist === void 0)
      ;
    if (routerFuture.v7_normalizeFormMethod === void 0)
      ;
    if (routerFuture.v7_partialHydration === void 0)
      ;
    if (routerFuture.v7_skipActionErrorRevalidation === void 0)
      ;
  }
}
__name(logV6DeprecationWarnings, "logV6DeprecationWarnings");
function Route(_props) {
  invariant(false);
}
__name(Route, "Route");
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(() => ({
    basename,
    navigator,
    static: staticProp,
    future: _extends$1({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
__name(Router, "Router");
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
__name(Routes, "Routes");
new Promise(() => {
});
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  reactExports.Children.forEach(children, (element, index2) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index2];
    if (element.type === reactExports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ? invariant(false) : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
__name(createRoutesFromChildren, "createRoutesFromChildren");
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
__name(_extends, "_extends");
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
__name(_objectWithoutPropertiesLoose, "_objectWithoutPropertiesLoose");
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
__name(isModifiedEvent, "isModifiedEvent");
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
__name(shouldProcessLinkClick, "shouldProcessLinkClick");
const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"];
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
}
const START_TRANSITION = "startTransition";
const startTransitionImpl = React[START_TRANSITION];
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref4;
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = reactExports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  reactExports.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ reactExports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
__name(BrowserRouter, "BrowserRouter");
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const Link = /* @__PURE__ */ reactExports.forwardRef(/* @__PURE__ */ __name(function LinkWithRef(_ref7, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition
  } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename
  } = reactExports.useContext(NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  __name(handleClick, "handleClick");
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ reactExports.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
}, "LinkWithRef"));
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return reactExports.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, viewTransition]);
}
__name(useLinkClickHandler, "useLinkClickHandler");
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const toKebabCase = /* @__PURE__ */ __name((string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), "toKebabCase");
const createLucideIcon = /* @__PURE__ */ __name((iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }, ref) => reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]) || []
      ]
    )
  );
  Component.displayName = `${iconName}`;
  return Component;
}, "createLucideIcon");
var createLucideIcon$1 = createLucideIcon;
const AlertTriangle = createLucideIcon$1("AlertTriangle", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
      key: "c3ski4"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
const BookOpen = createLucideIcon$1("BookOpen", [
  ["path", { d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z", key: "vv98re" }],
  ["path", { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", key: "1cyq3y" }]
]);
const Bot = createLucideIcon$1("Bot", [
  [
    "rect",
    { width: "18", height: "10", x: "3", y: "11", rx: "2", key: "1ofdy3" }
  ],
  ["circle", { cx: "12", cy: "5", r: "2", key: "f1ur92" }],
  ["path", { d: "M12 7v4", key: "xawao1" }],
  ["line", { x1: "8", x2: "8", y1: "16", y2: "16", key: "h6x27f" }],
  ["line", { x1: "16", x2: "16", y1: "16", y2: "16", key: "5lty7f" }]
]);
const Brain = createLucideIcon$1("Brain", [
  [
    "path",
    {
      d: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z",
      key: "1mhkh5"
    }
  ],
  [
    "path",
    {
      d: "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z",
      key: "1d6s00"
    }
  ]
]);
const Calendar = createLucideIcon$1("Calendar", [
  [
    "rect",
    {
      width: "18",
      height: "18",
      x: "3",
      y: "4",
      rx: "2",
      ry: "2",
      key: "eu3xkr"
    }
  ],
  ["line", { x1: "16", x2: "16", y1: "2", y2: "6", key: "m3sa8f" }],
  ["line", { x1: "8", x2: "8", y1: "2", y2: "6", key: "18kwsl" }],
  ["line", { x1: "3", x2: "21", y1: "10", y2: "10", key: "xt86sb" }]
]);
const CheckCircle = createLucideIcon$1("CheckCircle", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["polyline", { points: "22 4 12 14.01 9 11.01", key: "6xbx8j" }]
]);
const Clock = createLucideIcon$1("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
const DollarSign = createLucideIcon$1("DollarSign", [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  [
    "path",
    { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }
  ]
]);
const Download = createLucideIcon$1("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
const ExternalLink = createLucideIcon$1("ExternalLink", [
  [
    "path",
    {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
      key: "a6xqqp"
    }
  ],
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["line", { x1: "10", x2: "21", y1: "14", y2: "3", key: "18c3s4" }]
]);
const FileText = createLucideIcon$1("FileText", [
  [
    "path",
    {
      d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",
      key: "1nnpy2"
    }
  ],
  ["polyline", { points: "14 2 14 8 20 8", key: "1ew0cm" }],
  ["line", { x1: "16", x2: "8", y1: "13", y2: "13", key: "14keom" }],
  ["line", { x1: "16", x2: "8", y1: "17", y2: "17", key: "17nazh" }],
  ["line", { x1: "10", x2: "8", y1: "9", y2: "9", key: "1a5vjj" }]
]);
const Filter = createLucideIcon$1("Filter", [
  [
    "polygon",
    { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3", key: "1yg77f" }
  ]
]);
const Flame = createLucideIcon$1("Flame", [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
]);
const Globe = createLucideIcon$1("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "2", x2: "22", y1: "12", y2: "12", key: "1dnqot" }],
  [
    "path",
    {
      d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
      key: "nb9nel"
    }
  ]
]);
const Heart = createLucideIcon$1("Heart", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
]);
const Home$1 = createLucideIcon$1("Home", [
  [
    "path",
    { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "y5dka4" }
  ],
  ["polyline", { points: "9 22 9 12 15 12 15 22", key: "e2us08" }]
]);
const Info = createLucideIcon$1("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
const Loader = createLucideIcon$1("Loader", [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "6", key: "gza1u7" }],
  ["line", { x1: "12", x2: "12", y1: "18", y2: "22", key: "1qhbu9" }],
  ["line", { x1: "4.93", x2: "7.76", y1: "4.93", y2: "7.76", key: "xae44r" }],
  [
    "line",
    { x1: "16.24", x2: "19.07", y1: "16.24", y2: "19.07", key: "bxnmvf" }
  ],
  ["line", { x1: "2", x2: "6", y1: "12", y2: "12", key: "89khin" }],
  ["line", { x1: "18", x2: "22", y1: "12", y2: "12", key: "pb8tfm" }],
  ["line", { x1: "4.93", x2: "7.76", y1: "19.07", y2: "16.24", key: "1uxjnu" }],
  ["line", { x1: "16.24", x2: "19.07", y1: "7.76", y2: "4.93", key: "6duxfx" }]
]);
const Mail = createLucideIcon$1("Mail", [
  [
    "rect",
    { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }
  ],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
const MapPin = createLucideIcon$1("MapPin", [
  [
    "path",
    { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", key: "2oe9fu" }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);
const Menu = createLucideIcon$1("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
]);
const MessageCircle = createLucideIcon$1("MessageCircle", [
  ["path", { d: "m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z", key: "v2veuj" }]
]);
const MessageSquare = createLucideIcon$1("MessageSquare", [
  [
    "path",
    {
      d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
      key: "1lielz"
    }
  ]
]);
const Moon = createLucideIcon$1("Moon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
]);
const Mountain = createLucideIcon$1("Mountain", [
  ["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z", key: "otkl63" }]
]);
const Package = createLucideIcon$1("Package", [
  ["path", { d: "M16.5 9.4 7.55 4.24", key: "10qotr" }],
  [
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      key: "yt0hxn"
    }
  ],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
]);
const Phone = createLucideIcon$1("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
]);
const Plus = createLucideIcon$1("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
const Radio = createLucideIcon$1("Radio", [
  ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9", key: "1vaf9d" }],
  ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5", key: "u1ii0m" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5", key: "1j5fej" }],
  ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19", key: "10b0cb" }]
]);
const RefreshCw = createLucideIcon$1("RefreshCw", [
  [
    "path",
    { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }
  ],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  [
    "path",
    { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }
  ],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
const Search = createLucideIcon$1("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const Send = createLucideIcon$1("Send", [
  ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
  ["path", { d: "M22 2 11 13", key: "nzbqef" }]
]);
const Shield = createLucideIcon$1("Shield", [
  ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", key: "3xmgem" }]
]);
const Snowflake = createLucideIcon$1("Snowflake", [
  ["line", { x1: "2", x2: "22", y1: "12", y2: "12", key: "1dnqot" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "m20 16-4-4 4-4", key: "rquw4f" }],
  ["path", { d: "m4 8 4 4-4 4", key: "12s3z9" }],
  ["path", { d: "m16 4-4 4-4-4", key: "1tumq1" }],
  ["path", { d: "m8 20 4-4 4 4", key: "9p200w" }]
]);
const Star = createLucideIcon$1("Star", [
  [
    "polygon",
    {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
      key: "8f66p6"
    }
  ]
]);
const Sun = createLucideIcon$1("Sun", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);
const Upload = createLucideIcon$1("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
]);
const User = createLucideIcon$1("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
const Users = createLucideIcon$1("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
const Waves = createLucideIcon$1("Waves", [
  [
    "path",
    {
      d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "knzxuh"
    }
  ],
  [
    "path",
    {
      d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "2jd2cc"
    }
  ],
  [
    "path",
    {
      d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
      key: "rd2r6e"
    }
  ]
]);
const Wind = createLucideIcon$1("Wind", [
  ["path", { d: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2", key: "1k4u03" }],
  ["path", { d: "M9.6 4.6A2 2 0 1 1 11 8H2", key: "b7d0fd" }],
  ["path", { d: "M12.6 19.4A2 2 0 1 0 14 16H2", key: "1p5cb3" }]
]);
const X = createLucideIcon$1("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const Zap = createLucideIcon$1("Zap", [
  [
    "polygon",
    { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2", key: "45s27k" }
  ]
]);
const ThemeContext = reactExports.createContext();
const useTheme = /* @__PURE__ */ __name(() => {
  const context = reactExports.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}, "useTheme");
const ThemeProvider = /* @__PURE__ */ __name(({ children }) => {
  const [isDark, setIsDark] = reactExports.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  reactExports.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  const toggleTheme = /* @__PURE__ */ __name(() => setIsDark(!isDark), "toggleTheme");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: { isDark, toggleTheme }, children });
}, "ThemeProvider");
const AuthContext = reactExports.createContext();
const useAuth = /* @__PURE__ */ __name(() => {
  const context = reactExports.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}, "useAuth");
const AuthProvider = /* @__PURE__ */ __name(({ children }) => {
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  const login = /* @__PURE__ */ __name(async (email, password) => {
    const mockUser = {
      id: 1,
      email,
      name: email.split("@")[0],
      role: "volunteer"
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return mockUser;
  }, "login");
  const logout = /* @__PURE__ */ __name(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, "logout");
  const register = /* @__PURE__ */ __name(async (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      role: "volunteer"
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  }, "register");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { user, login, logout, register, loading }, children });
}, "AuthProvider");
const Header = /* @__PURE__ */ __name(({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center h-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onMenuClick,
          className: "lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
          "aria-label": "Open menu",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center ml-4 lg:ml-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-8 w-8 text-primary-600 mr-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Disaster Response Hub" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 hidden sm:block", children: "Emergency Support & Community Aid" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: toggleTheme,
          className: "p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
          "aria-label": "Toggle theme",
          children: isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-5 w-5" })
        }
      ),
      user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: [
          "Welcome, ",
          user.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: logout,
            className: "text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400",
            children: "Logout"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary text-sm", children: "Sign In" })
    ] })
  ] }) }) });
}, "Header");
const Sidebar = /* @__PURE__ */ __name(({ isOpen, onClose }) => {
  const location = useLocation();
  const navigation = [
    { name: "Home", href: "/", icon: Home$1 },
    { name: "Lost & Found", href: "/lost-found", icon: Search },
    { name: "Instructions & Safety", href: "/instructions", icon: Shield },
    { name: "Donation & Volunteers", href: "/donations", icon: Heart },
    { name: "AI Assistant", href: "/ai-assistant", icon: MessageCircle },
    { name: "Feedback", href: "/feedback", icon: MessageSquare },
    { name: "About / Contact", href: "/about", icon: Info },
    { name: "Live Updates", href: "/live-updates", icon: Radio },
    { name: "Research Center", href: "/research", icon: BookOpen }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `
        fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Menu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mt-8 lg:mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-2", children: navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.href,
            onClick: onClose,
            className: `
                    flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}
                  `,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "mr-3 h-5 w-5" }),
              item.name
            ]
          },
          item.name
        );
      }) }) })
    ] })
  ] });
}, "Sidebar");
const EmergencyButton = /* @__PURE__ */ __name(() => {
  const [showModal, setShowModal] = reactExports.useState(false);
  const emergencyContacts = [
    { name: "Emergency Services", number: "911", description: "Police, Fire, Medical" },
    { name: "Disaster Hotline", number: "1-800-DISASTER", description: "24/7 Disaster Support" },
    { name: "Red Cross", number: "1-800-RED-CROSS", description: "Emergency Assistance" },
    { name: "FEMA", number: "1-800-621-3362", description: "Federal Emergency Management" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setShowModal(true),
        className: "fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg emergency-pulse z-50 focus:outline-none focus:ring-4 focus:ring-red-300",
        "aria-label": "Emergency SOS",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-6 w-6" })
      }
    ),
    showModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-red-600 dark:text-red-400", children: "Emergency Contacts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowModal(false),
            className: "p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: emergencyContacts.map((contact, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border border-gray-200 dark:border-gray-600 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: contact.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: contact.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `tel:${contact.number}`,
            className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors",
            children: contact.number
          }
        )
      ] }) }, index2)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-yellow-800 dark:text-yellow-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Important:" }),
        " In life-threatening emergencies, call 911 immediately. This app provides support resources but is not a substitute for emergency services."
      ] }) })
    ] }) })
  ] });
}, "EmergencyButton");
const Home = /* @__PURE__ */ __name(() => {
  const quickActions = [
    {
      title: "Report Missing Person",
      description: "Help find missing individuals",
      icon: Search,
      href: "/lost-found",
      color: "bg-blue-500"
    },
    {
      title: "Safety Instructions",
      description: "Get emergency guidelines",
      icon: Shield,
      href: "/instructions",
      color: "bg-green-500"
    },
    {
      title: "Volunteer & Donate",
      description: "Support relief efforts",
      icon: Heart,
      href: "/donations",
      color: "bg-red-500"
    },
    {
      title: "AI Emergency Help",
      description: "Get instant assistance",
      icon: MessageCircle,
      href: "/ai-assistant",
      color: "bg-purple-500"
    }
  ];
  const stats = [
    { label: "People Helped", value: "12,847", icon: Users },
    { label: "Active Volunteers", value: "2,341", icon: Heart },
    { label: "Countries Served", value: "45", icon: Globe },
    { label: "Response Time", value: "<2min", icon: Clock }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6", children: [
        "Emergency Response",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-primary-600 dark:text-primary-400", children: "When Every Second Counts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8", children: "Connect with emergency resources, report incidents, find missing persons, and get AI-powered assistance during disasters and emergencies." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/ai-assistant", className: "btn-primary text-lg px-8 py-3", children: "Get Emergency Help Now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "bg-red-600 hover:bg-red-700 text-white font-medium text-lg px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "mr-2 h-5 w-5" }),
          "Report Incident"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-yellow-800 dark:text-yellow-200", children: "Active Weather Alert" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-yellow-700 dark:text-yellow-300", children: "Severe thunderstorm warning in effect for the region. Stay indoors and avoid travel." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: quickActions.map((action, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: action.href,
        className: "card hover:shadow-lg transition-shadow duration-200 group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { className: "h-6 w-6 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2", children: action.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: action.description })
        ]
      },
      index2
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-1", children: stat.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: stat.label })
    ] }, index2)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-6", children: "Recent Updates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [
        {
          time: "2 hours ago",
          title: "Emergency shelter opened in downtown area",
          description: "New facility can accommodate 200 people with full amenities."
        },
        {
          time: "4 hours ago",
          title: "Missing person found safe",
          description: "John Smith, 45, reported missing yesterday has been located."
        },
        {
          time: "6 hours ago",
          title: "Volunteer training session scheduled",
          description: "Join us this weekend for emergency response training."
        }
      ].map((update, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400 mb-1", children: update.time }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 dark:text-white mb-1", children: update.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: update.description })
        ] })
      ] }, index2)) })
    ] })
  ] });
}, "Home");
const LostAndFound = /* @__PURE__ */ __name(() => {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [showReportForm, setShowReportForm] = reactExports.useState(false);
  const [selectedImage, setSelectedImage] = reactExports.useState(null);
  const [extractedInfo, setExtractedInfo] = reactExports.useState(null);
  const [isAnalyzing, setIsAnalyzing] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const [filters, setFilters] = reactExports.useState({
    status: "all",
    ageRange: "all",
    location: ""
  });
  const missingPersons = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 28,
      gender: "Female",
      lastSeen: "2024-01-15",
      location: "Downtown Mall",
      description: "Brown hair, blue eyes, wearing red jacket",
      image: "/api/placeholder/150/150",
      status: "missing",
      reportedBy: "Family Member"
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 45,
      gender: "Male",
      lastSeen: "2024-01-14",
      location: "Central Park",
      description: "Black hair, brown eyes, wearing blue shirt",
      image: "/api/placeholder/150/150",
      status: "found",
      reportedBy: "Friend"
    }
  ];
  const handleImageUpload = /* @__PURE__ */ __name(async (event) => {
    const file = event.target.files[0];
    if (!file)
      return;
    setSelectedImage(file);
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("prompt", "Describe this person in detail including physical characteristics, clothing, and any distinguishing features that would help identify them.");
      const imageResponse = await fetch("https://builder.empromptu.ai/api_tools/analyze_image", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 5254d3137bc61704d35e86e9e22c6bc6",
          "X-Generated-App-ID": "7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb",
          "X-Usage-Key": "cbdf28b6a6e122cf39846203916f8199"
        },
        body: formData
      });
      const imageData = await imageResponse.json();
      if (imageData.value) {
        const extractResponse = await fetch("https://builder.empromptu.ai/api_tools/apply_prompt_to_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 5254d3137bc61704d35e86e9e22c6bc6",
            "X-Generated-App-ID": "7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb",
            "X-Usage-Key": "cbdf28b6a6e122cf39846203916f8199"
          },
          body: JSON.stringify({
            prompt_name: "extract_person_info",
            input_data: {
              image_description: imageData.value
            },
            return_type: "structured"
          })
        });
        const extractData = await extractResponse.json();
        setExtractedInfo(extractData.value);
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }, "handleImageUpload");
  const filteredPersons = missingPersons.filter((person) => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) || person.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === "all" || person.status === filters.status;
    const matchesLocation = !filters.location || person.location.toLowerCase().includes(filters.location.toLowerCase());
    return matchesSearch && matchesStatus && matchesLocation;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: "Lost & Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 mt-2", children: "Help reunite families and find missing persons" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowReportForm(true),
          className: "btn-primary flex items-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
            "Report Missing Person"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search by name or location...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "input-field pl-10"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filters.status,
          onChange: (e) => setFilters({ ...filters, status: e.target.value }),
          className: "input-field",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "missing", children: "Missing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "found", children: "Found" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filters.ageRange,
          onChange: (e) => setFilters({ ...filters, ageRange: e.target.value }),
          className: "input-field",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Ages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "child", children: "Child (0-17)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "adult", children: "Adult (18-64)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "senior", children: "Senior (65+)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Filter by location...",
          value: filters.location,
          onChange: (e) => setFilters({ ...filters, location: e.target.value }),
          className: "input-field"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredPersons.map((person) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8 text-gray-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 dark:text-white", children: person.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 text-xs rounded-full ${person.status === "missing" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`, children: person.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm text-gray-600 dark:text-gray-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3 mr-1" }),
            person.gender,
            ", ",
            person.age,
            " years old"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 mr-1" }),
            person.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 mr-1" }),
            person.lastSeen
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mt-2", children: person.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium", children: "View Details" })
      ] })
    ] }) }, person.id)) }),
    showReportForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-6", children: "Report Missing Person" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Photo (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              className: "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 text-gray-400 mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Click to upload photo or drag and drop" }),
                selectedImage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-600 mt-2", children: selectedImage.name })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              onChange: handleImageUpload,
              className: "hidden"
            }
          )
        ] }),
        isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-800 dark:text-blue-200", children: "Analyzing image and extracting information..." })
        ] }) }),
        extractedInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-green-800 dark:text-green-200 mb-2", children: "Extracted Information:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-sm text-green-700 dark:text-green-300 whitespace-pre-wrap", children: JSON.stringify(extractedInfo, null, 2) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Full Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, className: "input-field" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Age *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", required: true, className: "input-field" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Gender" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "input-field", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select gender" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "male", children: "Male" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "female", children: "Female" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Last Seen Date *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", required: true, className: "input-field" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Last Seen Location *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, className: "input-field", placeholder: "Be as specific as possible" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Physical Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              rows: 4,
              className: "input-field",
              placeholder: "Height, weight, hair color, eye color, clothing, distinguishing features..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Your Contact Information *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, className: "input-field", placeholder: "Your email address" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowReportForm(false),
              className: "btn-secondary",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn-primary", children: "Submit Report" })
        ] })
      ] })
    ] }) }) })
  ] });
}, "LostAndFound");
const Instructions = /* @__PURE__ */ __name(() => {
  var _a, _b;
  const [selectedDisaster, setSelectedDisaster] = reactExports.useState("earthquake");
  const [selectedPhase, setSelectedPhase] = reactExports.useState("before");
  const [safetyGuide, setSafetyGuide] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const disasters = [
    { id: "earthquake", name: "Earthquake", icon: Mountain, color: "bg-orange-500" },
    { id: "flood", name: "Flood", icon: Waves, color: "bg-blue-500" },
    { id: "hurricane", name: "Hurricane", icon: Wind, color: "bg-purple-500" },
    { id: "wildfire", name: "Wildfire", icon: Flame, color: "bg-red-500" },
    { id: "tornado", name: "Tornado", icon: Wind, color: "bg-gray-500" },
    { id: "blizzard", name: "Blizzard", icon: Snowflake, color: "bg-cyan-500" },
    { id: "thunderstorm", name: "Thunderstorm", icon: Zap, color: "bg-yellow-500" },
    { id: "heatwave", name: "Heat Wave", icon: Flame, color: "bg-orange-600" }
  ];
  const phases = [
    { id: "before", name: "Before", icon: Clock, description: "Preparation and planning" },
    { id: "during", name: "During", icon: AlertTriangle, description: "Immediate response" },
    { id: "after", name: "After", icon: CheckCircle, description: "Recovery and cleanup" }
  ];
  const fetchSafetyGuide = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://builder.empromptu.ai/api_tools/apply_prompt_to_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 5254d3137bc61704d35e86e9e22c6bc6",
          "X-Generated-App-ID": "7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb",
          "X-Usage-Key": "cbdf28b6a6e122cf39846203916f8199"
        },
        body: JSON.stringify({
          prompt_name: "disaster_safety_guide",
          input_data: {
            disaster_type: selectedDisaster,
            phase: selectedPhase
          },
          return_type: "pretty_text"
        })
      });
      const data = await response.json();
      setSafetyGuide(data.value || "Safety guide not available.");
    } catch (error) {
      console.error("Error fetching safety guide:", error);
      setSafetyGuide("Error loading safety guide. Please try again.");
    } finally {
      setLoading(false);
    }
  }, "fetchSafetyGuide");
  React$1.useEffect(() => {
    fetchSafetyGuide();
  }, [selectedDisaster, selectedPhase]);
  const quickTips = {
    earthquake: [
      "Drop, Cover, and Hold On",
      "Stay away from windows and heavy objects",
      "If outdoors, move away from buildings",
      "Do not run outside during shaking"
    ],
    flood: [
      "Move to higher ground immediately",
      "Never drive through flooded roads",
      "Avoid walking in moving water",
      "Listen for evacuation orders"
    ],
    hurricane: [
      "Board up windows and secure outdoor items",
      "Stock up on water and non-perishable food",
      "Charge all electronic devices",
      "Know your evacuation route"
    ],
    wildfire: [
      "Create defensible space around your home",
      "Have an evacuation plan ready",
      "Keep important documents accessible",
      "Monitor air quality and stay indoors if needed"
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: "Instructions & Safety" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 mt-2", children: "Get comprehensive safety guidelines for various disaster scenarios" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4", children: "Select Disaster Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: disasters.map((disaster) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setSelectedDisaster(disaster.id),
          className: `p-4 rounded-lg border-2 transition-all duration-200 ${selectedDisaster === disaster.id ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${disaster.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(disaster.icon, { className: "h-6 w-6 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: disaster.name })
          ]
        },
        disaster.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4", children: "Select Phase" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: phases.map((phase) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setSelectedPhase(phase.id),
          className: `p-4 rounded-lg border-2 text-left transition-all duration-200 ${selectedPhase === phase.id ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(phase.icon, { className: "h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900 dark:text-white", children: phase.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: phase.description })
          ]
        },
        phase.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4", children: [
          "Safety Guidelines: ",
          (_a = disasters.find((d) => d.id === selectedDisaster)) == null ? void 0 : _a.name,
          " - ",
          (_b = phases.find((p2) => p2.id === selectedPhase)) == null ? void 0 : _b.name
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-gray-600 dark:text-gray-300", children: "Loading safety guidelines..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose dark:prose-invert max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "whitespace-pre-wrap text-gray-700 dark:text-gray-300", children: safetyGuide }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Quick Tips" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (quickTips[selectedDisaster] || []).map((tip, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: tip })
          ] }, index2)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Emergency Kit Essentials" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
            "Water (1 gallon per person per day)",
            "Non-perishable food (3-day supply)",
            "Battery-powered radio",
            "Flashlight and extra batteries",
            "First aid kit",
            "Medications",
            "Important documents",
            "Cash and credit cards",
            "Emergency contact information",
            "Blankets and clothing"
          ].map((item, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: item })
          ] }, index2)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Emergency Contacts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Emergency Services:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "911" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Poison Control:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "1-800-222-1222" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Red Cross:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "1-800-RED-CROSS" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "FEMA:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "1-800-621-3362" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}, "Instructions");
const Donations = /* @__PURE__ */ __name(() => {
  const [activeTab, setActiveTab] = reactExports.useState("donate");
  const [donationType, setDonationType] = reactExports.useState("money");
  const [volunteerForm, setVolunteerForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
    availability: "",
    location: ""
  });
  const campaigns = [
    {
      id: 1,
      title: "Hurricane Relief Fund",
      description: "Supporting families affected by recent hurricane damage",
      raised: 75e3,
      goal: 1e5,
      donors: 1250,
      urgent: true
    },
    {
      id: 2,
      title: "Emergency Shelter Supplies",
      description: "Providing essential supplies for temporary shelters",
      raised: 45e3,
      goal: 6e4,
      donors: 890,
      urgent: false
    },
    {
      id: 3,
      title: "Medical Equipment Fund",
      description: "Purchasing medical supplies for disaster response",
      raised: 32e3,
      goal: 5e4,
      donors: 567,
      urgent: true
    }
  ];
  const volunteerOpportunities = [
    {
      id: 1,
      title: "Emergency Response Team",
      description: "First responders for disaster situations",
      location: "Various locations",
      timeCommitment: "On-call basis",
      skills: ["First Aid", "CPR", "Emergency Response"],
      urgent: true
    },
    {
      id: 2,
      title: "Shelter Coordinator",
      description: "Help manage emergency shelters and assist evacuees",
      location: "Downtown Community Center",
      timeCommitment: "4-8 hours/week",
      skills: ["Organization", "Communication", "Leadership"],
      urgent: false
    },
    {
      id: 3,
      title: "Supply Distribution",
      description: "Sort and distribute emergency supplies to affected areas",
      location: "Warehouse District",
      timeCommitment: "Flexible shifts",
      skills: ["Physical work", "Teamwork", "Attention to detail"],
      urgent: false
    }
  ];
  const skillOptions = [
    "First Aid/CPR",
    "Medical Training",
    "Construction/Repair",
    "Transportation",
    "Translation",
    "IT/Communications",
    "Counseling/Mental Health",
    "Logistics/Organization",
    "Cooking/Food Service",
    "Childcare"
  ];
  const handleSkillToggle = /* @__PURE__ */ __name((skill) => {
    setVolunteerForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill]
    }));
  }, "handleSkillToggle");
  const handleVolunteerSubmit = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    console.log("Volunteer registration:", volunteerForm);
    alert("Thank you for volunteering! We will contact you soon.");
  }, "handleVolunteerSubmit");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: "Donation & Volunteers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 mt-2", children: "Support disaster relief efforts through donations and volunteering" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveTab("donate"),
          className: `flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "donate" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "inline h-4 w-4 mr-2" }),
            "Donate"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveTab("volunteer"),
          className: `flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "volunteer" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "inline h-4 w-4 mr-2" }),
            "Volunteer"
          ]
        }
      )
    ] }),
    activeTab === "donate" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4", children: "How would you like to help?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setDonationType("money"),
              className: `p-4 rounded-lg border-2 transition-all duration-200 ${donationType === "money" ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-600 hover:border-gray-300"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-gray-900 dark:text-white", children: "Monetary Donation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mt-1", children: "Flexible funding for immediate needs" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setDonationType("supplies"),
              className: `p-4 rounded-lg border-2 transition-all duration-200 ${donationType === "supplies" ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-600 hover:border-gray-300"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-gray-900 dark:text-white", children: "Supply Donation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mt-1", children: "Physical items and supplies" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setDonationType("food"),
              className: `p-4 rounded-lg border-2 transition-all duration-200 ${donationType === "food" ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-600 hover:border-gray-300"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-gray-900 dark:text-white", children: "Food Donation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mt-1", children: "Meals and non-perishable food" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-6", children: "Active Campaigns" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: campaigns.map((campaign) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-gray-200 dark:border-gray-600 rounded-lg p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: campaign.title }),
                campaign.urgent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full", children: "Urgent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300", children: campaign.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary", children: "Donate Now" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-600 dark:text-gray-300", children: [
                "$",
                campaign.raised.toLocaleString(),
                " raised"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-600 dark:text-gray-300", children: [
                "$",
                campaign.goal.toLocaleString(),
                " goal"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-primary-600 h-2 rounded-full transition-all duration-300",
                style: { width: `${campaign.raised / campaign.goal * 100}%` }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-gray-600 dark:text-gray-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 mr-1" }),
            campaign.donors,
            " donors"
          ] })
        ] }, campaign.id)) })
      ] }),
      donationType === "money" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4", children: "Make a Donation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Donation Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-3", children: [25, 50, 100, 250].map((amount) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors",
                children: [
                  "$",
                  amount
                ]
              },
              amount
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                placeholder: "Custom amount",
                className: "input-field"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", className: "input-field" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", className: "input-field" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: "Make this a monthly recurring donation" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn-primary w-full", children: "Complete Donation" })
        ] })
      ] })
    ] }),
    activeTab === "volunteer" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-6", children: "Volunteer Opportunities" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: volunteerOpportunities.map((opportunity) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-gray-200 dark:border-gray-600 rounded-lg p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: opportunity.title }),
              opportunity.urgent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full", children: "Urgent Need" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-3", children: opportunity.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-gray-600 dark:text-gray-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 mr-1" }),
                opportunity.location
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-gray-600 dark:text-gray-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 mr-1" }),
                opportunity.timeCommitment
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-gray-600 dark:text-gray-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 mr-1" }),
                opportunity.skills.join(", ")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary", children: "Apply Now" })
        ] }) }, opportunity.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4", children: "Volunteer Registration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleVolunteerSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Full Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  required: true,
                  value: volunteerForm.name,
                  onChange: (e) => setVolunteerForm({ ...volunteerForm, name: e.target.value }),
                  className: "input-field"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email Address *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  required: true,
                  value: volunteerForm.email,
                  onChange: (e) => setVolunteerForm({ ...volunteerForm, email: e.target.value }),
                  className: "input-field"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "tel",
                  value: volunteerForm.phone,
                  onChange: (e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value }),
                  className: "input-field"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Location/City" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: volunteerForm.location,
                  onChange: (e) => setVolunteerForm({ ...volunteerForm, location: e.target.value }),
                  className: "input-field"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Skills & Expertise (select all that apply)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2", children: skillOptions.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: volunteerForm.skills.includes(skill),
                  onChange: () => handleSkillToggle(skill),
                  className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: skill })
            ] }, skill)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Availability" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: volunteerForm.availability,
                onChange: (e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value }),
                className: "input-field",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select availability" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "weekdays", children: "Weekdays" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "weekends", children: "Weekends" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "evenings", children: "Evenings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "flexible", children: "Flexible" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "emergency-only", children: "Emergency situations only" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn-primary w-full", children: "Register as Volunteer" })
        ] })
      ] })
    ] })
  ] });
}, "Donations");
const AIAssistant = /* @__PURE__ */ __name(() => {
  const [messages, setMessages] = reactExports.useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your emergency response AI assistant. I can help you with safety guidelines, emergency procedures, and connect you with appropriate resources. How can I assist you today?",
      timestamp: /* @__PURE__ */ new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [agentId, setAgentId] = reactExports.useState(null);
  const messagesEndRef = reactExports.useRef(null);
  const scrollToBottom = /* @__PURE__ */ __name(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, "scrollToBottom");
  reactExports.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  reactExports.useEffect(() => {
    const createAgent = /* @__PURE__ */ __name(async () => {
      try {
        const response = await fetch("https://builder.empromptu.ai/api_tools/create-agent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 5254d3137bc61704d35e86e9e22c6bc6",
            "X-Generated-App-ID": "7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb",
            "X-Usage-Key": "cbdf28b6a6e122cf39846203916f8199"
          },
          body: JSON.stringify({
            instructions: `You are an emergency response AI assistant for a disaster response platform. Your role is to:
            1. Provide immediate emergency guidance and safety instructions
            2. Help users navigate emergency situations with calm, clear directions
            3. Offer disaster preparedness advice and safety protocols
            4. Connect users with appropriate emergency resources and contacts
            5. Provide emotional support during crisis situations
            6. Answer questions about missing persons, evacuation procedures, and emergency supplies
            
            Always prioritize user safety, provide actionable advice, and maintain a calm, reassuring tone. If a situation requires immediate emergency services, direct users to call 911 immediately.`,
            agent_name: "Emergency Response Assistant"
          })
        });
        const data = await response.json();
        if (data.agent_id) {
          setAgentId(data.agent_id);
        }
      } catch (error) {
        console.error("Error creating agent:", error);
      }
    }, "createAgent");
    createAgent();
  }, []);
  const handleSendMessage = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || !agentId)
      return;
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    try {
      const response = await fetch("https://builder.empromptu.ai/api_tools/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 5254d3137bc61704d35e86e9e22c6bc6",
          "X-Generated-App-ID": "7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb",
          "X-Usage-Key": "cbdf28b6a6e122cf39846203916f8199"
        },
        body: JSON.stringify({
          agent_id: agentId,
          message: inputMessage
        })
      });
      const data = await response.json();
      if (data.response) {
        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: data.response,
          timestamp: /* @__PURE__ */ new Date()
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: "I apologize, but I'm having trouble connecting right now. Please try again or contact emergency services directly if this is urgent.",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, "handleSendMessage");
  const quickQuestions = [
    "What should I do during an earthquake?",
    "How do I prepare an emergency kit?",
    "What are the evacuation procedures?",
    "How can I report a missing person?",
    "What should I do in a flood?",
    "How do I find emergency shelters?"
  ];
  const handleQuickQuestion = /* @__PURE__ */ __name((question) => {
    setInputMessage(question);
  }, "handleQuickQuestion");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[calc(100vh-12rem)] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: "AI Emergency Assistant" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-300 mt-2", children: "Get instant help and guidance for emergency situations" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [
        messages.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-start space-x-3 ${message.type === "user" ? "justify-end" : "justify-start"}`,
            children: [
              message.type === "bot" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === "user" ? "bg-primary-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm whitespace-pre-wrap", children: message.content }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70 mt-1", children: message.timestamp.toLocaleTimeString() })
                  ]
                }
              ),
              message.type === "user" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-white" }) })
            ]
          },
          message.id
        )),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "h-4 w-4 animate-spin text-gray-600 dark:text-gray-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Thinking..." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }),
      messages.length === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-gray-200 dark:border-gray-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-3", children: "Quick questions to get started:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2", children: quickQuestions.map((question, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleQuickQuestion(question),
            className: "text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors",
            children: question
          },
          index2
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-gray-200 dark:border-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendMessage, className: "flex space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: inputMessage,
            onChange: (e) => setInputMessage(e.target.value),
            placeholder: "Ask me anything about emergency response...",
            className: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
            disabled: isLoading || !agentId
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: isLoading || !inputMessage.trim() || !agentId,
            className: "px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
          }
        )
      ] }) })
    ] })
  ] });
}, "AIAssistant");
const DatabaseContext = reactExports.createContext();
const useDatabase = /* @__PURE__ */ __name(() => {
  const context = reactExports.useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
}, "useDatabase");
const Feedback = /* @__PURE__ */ __name(() => {
  const [loading, setLoading] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const { executeQuery } = useDatabase();
  const { user } = useAuth();
  const [feedbackForm, setFeedbackForm] = reactExports.useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
    category: "general"
  });
  const categories = [
    { value: "general", label: "General Feedback" },
    { value: "bug", label: "Bug Report" },
    { value: "feature", label: "Feature Request" },
    { value: "support", label: "Support Request" },
    { value: "emergency", label: "Emergency Response" }
  ];
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await executeQuery(`
        INSERT INTO newschema_7f6707a347ec40c3ad3f1eb7f4da4ffb.feedback 
        (name, email, message, rating, category, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `, [
        feedbackForm.name,
        feedbackForm.email,
        feedbackForm.message,
        feedbackForm.rating || null,
        feedbackForm.category,
        (user == null ? void 0 : user.id) || null
      ]);
      if (result.success) {
        setSubmitted(true);
        setFeedbackForm({
          name: "",
          email: "",
          message: "",
          rating: 0,
          category: "general"
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  }, "handleSubmit");
  const handleRatingClick = /* @__PURE__ */ __name((rating) => {
    setFeedbackForm({ ...feedbackForm, rating });
  }, "handleRatingClick");
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-8 w-8 text-green-600 dark:text-green-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-neutral-900 dark:text-white mb-2", children: "Thank You!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-600 dark:text-neutral-400 mb-6", children: "Your feedback has been submitted successfully. We appreciate your input and will use it to improve our services." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setSubmitted(false),
          className: "btn-primary",
          children: "Submit Another Feedback"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-neutral-900 dark:text-white", children: "Feedback" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-600 dark:text-neutral-400 mt-1", children: "Help us improve our disaster response platform" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1", children: "Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: feedbackForm.name,
              onChange: (e) => setFeedbackForm({ ...feedbackForm, name: e.target.value }),
              className: "input-field",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1", children: "Email *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              value: feedbackForm.email,
              onChange: (e) => setFeedbackForm({ ...feedbackForm, email: e.target.value }),
              className: "input-field",
              required: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: feedbackForm.category,
            onChange: (e) => setFeedbackForm({ ...feedbackForm, category: e.target.value }),
            className: "input-field",
            children: categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: category.value, children: category.label }, category.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2", children: "Rating (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleRatingClick(star),
            className: `p-1 rounded transition-colors duration-200 ${star <= feedbackForm.rating ? "text-yellow-400" : "text-neutral-300 dark:text-neutral-600 hover:text-yellow-300"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-6 w-6 fill-current" })
          },
          star
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1", children: "Message *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: feedbackForm.message,
            onChange: (e) => setFeedbackForm({ ...feedbackForm, message: e.target.value }),
            className: "input-field h-32",
            placeholder: "Please share your feedback, suggestions, or report any issues...",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full btn-primary disabled:opacity-50 flex items-center justify-center",
          children: [
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 mr-2" }),
            loading ? "Submitting..." : "Submit Feedback"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2", children: "Your Voice Matters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-700 dark:text-blue-300 text-sm", children: "Your feedback helps us improve our disaster response capabilities and better serve communities in need. Every suggestion is carefully reviewed and considered for implementation." })
    ] })
  ] });
}, "Feedback");
const About = /* @__PURE__ */ __name(() => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Emergency Response Director",
      bio: "Former FEMA coordinator with 15+ years in disaster management",
      image: "👩‍⚕️"
    },
    {
      name: "Michael Chen",
      role: "Technology Lead",
      bio: "AI specialist focused on humanitarian applications",
      image: "👨‍💻"
    },
    {
      name: "Maria Rodriguez",
      role: "Community Outreach Manager",
      bio: "Multilingual coordinator connecting diverse communities",
      image: "👩‍🤝‍👩"
    },
    {
      name: "David Thompson",
      role: "Operations Manager",
      bio: "Logistics expert ensuring efficient resource distribution",
      image: "👨‍💼"
    }
  ];
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every situation with empathy and understanding for those affected by disasters."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "The safety and well-being of individuals and communities is our top priority."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in the power of communities working together to overcome challenges."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Our mission extends worldwide, helping communities regardless of location or circumstance."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-neutral-900 dark:text-white mb-4", children: "About HumanitarianAid" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto", children: "We are dedicated to providing comprehensive disaster response solutions that connect communities, volunteers, and resources to save lives and support recovery efforts worldwide." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-neutral-900 dark:text-white mb-4", children: "Our Mission" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-neutral-700 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed", children: "To leverage technology and human compassion to create a world where no community faces disaster alone. We provide the tools, resources, and connections needed to prepare for, respond to, and recover from humanitarian crises with dignity and hope." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-neutral-900 dark:text-white text-center mb-8", children: "Our Values" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: values.map((value, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary-100 dark:bg-primary-900 p-3 rounded-full w-fit mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(value.icon, { className: "h-6 w-6 text-primary-600 dark:text-primary-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-2", children: value.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: value.description })
      ] }, index2)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-neutral-900 dark:text-white text-center mb-8", children: "Our Team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: team.map((member, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: member.image }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-1", children: member.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-600 dark:text-primary-400 font-medium mb-2", children: member.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: member.bio })
      ] }, index2)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-neutral-900 dark:text-white text-center mb-8", children: "Our Impact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1", children: "50+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Countries Served" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1", children: "1M+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "People Helped" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1", children: "10K+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Active Volunteers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1", children: "24/7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Support Available" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-4", children: "Contact Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-neutral-900 dark:text-white", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "contact@humanitarianaid.org" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-neutral-900 dark:text-white", children: "Emergency Hotline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "1-800-HELP-NOW" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary-600 dark:text-primary-400 mr-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-neutral-900 dark:text-white", children: "Headquarters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: [
                "123 Relief Avenue",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Emergency City, EC 12345"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-4", children: "Get Involved" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: "Join our mission to help communities in crisis. There are many ways to get involved:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-neutral-600 dark:text-neutral-400 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Volunteer your time and skills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Make a donation to support our work" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Spread awareness in your community" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Partner with us as an organization" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Provide feedback to improve our services" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary w-full", children: "Start Helping Today" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card bg-neutral-50 dark:bg-neutral-800/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-4", children: "Legal Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600 dark:text-neutral-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-neutral-900 dark:text-white mb-1", children: "Registration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "501(c)(3) Non-Profit Organization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "EIN: 12-3456789" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-neutral-900 dark:text-white mb-1", children: "Certifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "GuideStar Gold Seal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Charity Navigator 4-Star" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-neutral-900 dark:text-white mb-1", children: "Compliance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "GDPR Compliant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "SOC 2 Type II Certified" })
        ] })
      ] })
    ] }) })
  ] });
}, "About");
const LiveUpdates = /* @__PURE__ */ __name(() => {
  const [alerts, setAlerts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("all");
  const [lastUpdated, setLastUpdated] = reactExports.useState(/* @__PURE__ */ new Date());
  const { executeQuery } = useDatabase();
  const severityColors = {
    critical: "bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200",
    high: "bg-orange-100 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-200",
    medium: "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200",
    low: "bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200"
  };
  const severityIcons = {
    critical: "🚨",
    high: "⚠️",
    medium: "⚡",
    low: "ℹ️"
  };
  reactExports.useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 3e4);
    return () => clearInterval(interval);
  }, []);
  const loadAlerts = /* @__PURE__ */ __name(async () => {
    try {
      await createSampleAlerts();
      const result = await executeQuery(`
        SELECT * FROM newschema_7f6707a347ec40c3ad3f1eb7f4da4ffb.disaster_alerts 
        WHERE active = true 
        ORDER BY 
          CASE severity 
            WHEN 'critical' THEN 1 
            WHEN 'high' THEN 2 
            WHEN 'medium' THEN 3 
            WHEN 'low' THEN 4 
          END,
          created_at DESC
      `);
      if (result.success) {
        setAlerts(result.data);
        setLastUpdated(/* @__PURE__ */ new Date());
      }
    } catch (error) {
      console.error("Error loading alerts:", error);
    } finally {
      setLoading(false);
    }
  }, "loadAlerts");
  const createSampleAlerts = /* @__PURE__ */ __name(async () => {
    try {
      const existingAlerts = await executeQuery(`
        SELECT COUNT(*) as count FROM newschema_7f6707a347ec40c3ad3f1eb7f4da4ffb.disaster_alerts
      `);
      if (existingAlerts.success && existingAlerts.data[0].count > 0) {
        return;
      }
      const sampleAlerts = [
        {
          title: "Severe Thunderstorm Warning",
          description: "Severe thunderstorms with damaging winds and large hail expected across the region. Seek shelter immediately.",
          severity: "high",
          location: "Central Valley Region",
          alert_type: "weather",
          source: "National Weather Service"
        },
        {
          title: "Flash Flood Watch",
          description: "Heavy rainfall may cause flash flooding in low-lying areas. Avoid driving through flooded roads.",
          severity: "medium",
          location: "Riverside County",
          alert_type: "flood",
          source: "Emergency Management"
        },
        {
          title: "Evacuation Advisory",
          description: "Voluntary evacuation recommended for residents in fire-prone areas due to extreme fire weather conditions.",
          severity: "critical",
          location: "Mountain Communities",
          alert_type: "wildfire",
          source: "Fire Department"
        },
        {
          title: "Power Outage Update",
          description: "Widespread power outages affecting approximately 15,000 customers. Restoration efforts underway.",
          severity: "low",
          location: "Downtown District",
          alert_type: "infrastructure",
          source: "Utility Company"
        }
      ];
      for (const alert2 of sampleAlerts) {
        await executeQuery(`
          INSERT INTO newschema_7f6707a347ec40c3ad3f1eb7f4da4ffb.disaster_alerts 
          (title, description, severity, location, alert_type, source)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [alert2.title, alert2.description, alert2.severity, alert2.location, alert2.alert_type, alert2.source]);
      }
    } catch (error) {
      console.error("Error creating sample alerts:", error);
    }
  }, "createSampleAlerts");
  const filteredAlerts = filter === "all" ? alerts : alerts.filter((alert2) => alert2.severity === filter);
  const handleRefresh = /* @__PURE__ */ __name(() => {
    setLoading(true);
    loadAlerts();
  }, "handleRefresh");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold text-neutral-900 dark:text-white flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-8 w-8 mr-3 text-red-500" }),
          "Live Updates"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-600 dark:text-neutral-400 mt-1", children: "Real-time disaster alerts and emergency information" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-neutral-500 dark:text-neutral-400", children: [
          "Last updated: ",
          lastUpdated.toLocaleTimeString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleRefresh,
            disabled: loading,
            className: "btn-outline flex items-center disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}` }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "h-4 w-4 text-neutral-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-neutral-700 dark:text-neutral-300", children: "Filter by severity:" }),
      ["all", "critical", "high", "medium", "low"].map((severity) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setFilter(severity),
          className: `px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${filter === severity ? "bg-primary-600 text-white" : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600"}`,
          children: severity.charAt(0).toUpperCase() + severity.slice(1)
        },
        severity
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: ["critical", "high", "medium", "low"].map((severity) => {
      const count = alerts.filter((alert2) => alert2.severity === severity).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: severityIcons[severity] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-neutral-900 dark:text-white", children: count }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-neutral-500 dark:text-neutral-400 capitalize", children: [
          severity,
          " Alerts"
        ] })
      ] }, severity);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: loading && alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mr-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-neutral-600 dark:text-neutral-400", children: "Loading alerts..." })
    ] }) : filteredAlerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "h-12 w-12 text-neutral-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-neutral-900 dark:text-white mb-2", children: "No alerts found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-600 dark:text-neutral-400", children: filter === "all" ? "There are currently no active alerts in your area." : `No ${filter} severity alerts at this time.` })
    ] }) : filteredAlerts.map((alert2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `card border-l-4 ${severityColors[alert2.severity]}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl mr-3", children: severityIcons[alert2.severity] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-white", children: alert2.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-neutral-600 dark:text-neutral-400 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium mr-3 ${alert2.severity === "critical" ? "bg-red-600 text-white" : alert2.severity === "high" ? "bg-orange-600 text-white" : alert2.severity === "medium" ? "bg-yellow-600 text-white" : "bg-blue-600 text-white"}`, children: alert2.severity.toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: alert2.alert_type })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-700 dark:text-neutral-300 mb-4", children: alert2.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 mr-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: alert2.location })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 mr-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(alert2.created_at).toLocaleString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4 mr-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Source: ",
                alert2.source
              ] })
            ] })
          ] })
        ]
      },
      alert2.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "h-6 w-6 text-red-600 dark:text-red-400 mr-3 mt-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-red-800 dark:text-red-200 mb-2", children: "Emergency Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-red-700 dark:text-red-300 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• For life-threatening emergencies, call 911 immediately" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Follow official evacuation orders without delay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Stay tuned to local emergency broadcasts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Keep emergency supplies ready and accessible" })
        ] })
      ] })
    ] }) })
  ] });
}, "LiveUpdates");
const ResearchCenter = /* @__PURE__ */ __name(() => {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("search");
  const researchCategories = [
    {
      title: "Disaster Preparedness",
      description: "Research on emergency planning and community readiness",
      topics: ["Emergency Kits", "Evacuation Planning", "Community Resilience", "Risk Assessment"]
    },
    {
      title: "Response Strategies",
      description: "Effective disaster response methodologies and best practices",
      topics: ["First Aid", "Search & Rescue", "Emergency Communication", "Resource Allocation"]
    },
    {
      title: "Recovery & Rebuilding",
      description: "Long-term recovery strategies and community rebuilding",
      topics: ["Infrastructure Repair", "Economic Recovery", "Mental Health Support", "Community Healing"]
    },
    {
      title: "Technology Solutions",
      description: "Innovative technologies for disaster management",
      topics: ["AI Applications", "Early Warning Systems", "Mobile Apps", "Data Analytics"]
    }
  ];
  const featuredResearch = [
    {
      title: "AI-Powered Early Warning Systems for Natural Disasters",
      authors: "Dr. Sarah Chen, Prof. Michael Rodriguez",
      journal: "Journal of Emergency Management",
      year: "2024",
      abstract: "This study explores the implementation of machine learning algorithms for predicting natural disasters...",
      downloadUrl: "#"
    },
    {
      title: "Community Resilience Building in Post-Disaster Recovery",
      authors: "Dr. Emily Johnson, Dr. David Park",
      journal: "Disaster Recovery Quarterly",
      year: "2024",
      abstract: "An analysis of successful community-led recovery initiatives following major disasters...",
      downloadUrl: "#"
    },
    {
      title: "Mobile Technology Adoption in Emergency Response",
      authors: "Prof. Lisa Wang, Dr. James Miller",
      journal: "Emergency Technology Review",
      year: "2023",
      abstract: "Examining the role of mobile applications in coordinating emergency response efforts...",
      downloadUrl: "#"
    }
  ];
  const handleResearch = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    if (!searchQuery.trim())
      return;
    setLoading(true);
    try {
      const response = await fetch("https://builder.empromptu.ai/api_tools/rapid_research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 5254d3137bc61704d35e86e9e22c6bc6",
          "X-Generated-App-ID": "7f6707a3-47ec-40c3-ad3f-1eb7f4da4ffb",
          "X-Usage-Key": "cbdf28b6a6e122cf39846203916f8199"
        },
        body: JSON.stringify({
          goal: `Research and provide comprehensive information about: ${searchQuery}. Include recent studies, best practices, statistics, and actionable insights related to disaster response and humanitarian aid.`
        })
      });
      const result = await response.json();
      if (result.value) {
        setSearchResults(result.value);
      }
    } catch (error) {
      console.error("Error conducting research:", error);
      setSearchResults("Error conducting research. Please try again.");
    } finally {
      setLoading(false);
    }
  }, "handleResearch");
  const quickSearchTopics = [
    "Earthquake preparedness strategies",
    "Flood response best practices",
    "Hurricane evacuation procedures",
    "Wildfire prevention methods",
    "Emergency communication systems",
    "Post-disaster mental health support"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold text-neutral-900 dark:text-white flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 mr-3 text-primary-600" }),
        "Research Center"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-600 dark:text-neutral-400 mt-1", children: "AI-powered research hub for disaster response and humanitarian aid" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveTab("search"),
          className: `flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === "search" ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 inline mr-2" }),
            "AI Research"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveTab("library"),
          className: `flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === "library" ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 inline mr-2" }),
            "Research Library"
          ]
        }
      )
    ] }),
    activeTab === "search" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-white mb-4", children: "AI-Powered Research Assistant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleResearch, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                placeholder: "Enter your research question or topic...",
                className: "input-field pl-10"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              disabled: loading || !searchQuery.trim(),
              className: "btn-primary disabled:opacity-50 flex items-center",
              children: [
                loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 mr-2" }),
                loading ? "Researching..." : "Start Research"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400 mb-3", children: "Quick research topics:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: quickSearchTopics.map((topic, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSearchQuery(topic),
              className: "text-xs bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 px-3 py-1 rounded-full transition-colors duration-200",
              children: topic
            },
            index2
          )) })
        ] })
      ] }),
      searchResults && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-4", children: "Research Results" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose dark:prose-invert max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap", children: searchResults }) })
      ] })
    ] }),
    activeTab === "library" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: researchCategories.map((category, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-neutral-900 dark:text-white mb-2", children: category.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400 mb-4", children: category.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: category.topics.map((topic, topicIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full",
            children: topic
          },
          topicIndex
        )) })
      ] }, index2)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-neutral-900 dark:text-white mb-6", children: "Featured Research Papers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: featuredResearch.map((paper, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-neutral-200 dark:border-neutral-700 pb-6 last:border-b-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-neutral-900 dark:text-white mb-2", children: paper.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-neutral-600 dark:text-neutral-400 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: paper.authors }),
            " • ",
            paper.journal,
            " • ",
            paper.year
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-700 dark:text-neutral-300 mb-4", children: paper.abstract }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn-outline text-sm flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3 mr-1" }),
              "Download PDF"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn-outline text-sm flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 mr-1" }),
              "View Online"
            ] })
          ] })
        ] }, index2)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4", children: "Research Guidelines" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-blue-700 dark:text-blue-300 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• All research is peer-reviewed and from credible sources" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Information is regularly updated to reflect current best practices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• Research findings should be adapted to local conditions and regulations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "• For emergency situations, always follow official guidance from local authorities" })
        ] })
      ] })
    ] })
  ] });
}, "ResearchCenter");
function App() {
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { onMenuClick: () => setSidebarOpen(!sidebarOpen) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, { isOpen: sidebarOpen, onClose: () => setSidebarOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 lg:ml-64 transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 lg:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Home, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/lost-found", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LostAndFound, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/instructions", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Instructions, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/donations", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Donations, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/ai-assistant", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AIAssistant, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/feedback", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Feedback, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/about", element: /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/live-updates", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveUpdates, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/research", element: /* @__PURE__ */ jsxRuntimeExports.jsx(ResearchCenter, {}) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmergencyButton, {})
  ] }) }) }) });
}
__name(App, "App");
const index = "";
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React$1.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
