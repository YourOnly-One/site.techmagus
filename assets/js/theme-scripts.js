import * as params from '@params';

"use strict";

// ========================== poiyfill ==========================
// forEach
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// includes
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict';

    if (search instanceof RegExp) {
      throw TypeError('first argument must not be a RegExp');
    }
    if (start === undefined) { start = 0; }
    return this.indexOf(search, start) !== -1;
  };
}

// append
Document.prototype.append = Element.prototype.append = function append() {
  this.appendChild(_mutation(arguments));
};
function _mutation(nodes) {
  if (!nodes.length) {
    throw new Error('DOM Exception 8');
  } else if (nodes.length === 1) {
    return typeof nodes[0] === 'string' ? document.createTextNode(nodes[0]) : nodes[0];
  } else {
    var
    fragment = document.createDocumentFragment(),
    length = nodes.length,
    index = -1,
    node;

    while (++index < length) {
      node = nodes[index];

      fragment.appendChild(typeof node === 'string' ? document.createTextNode(node) : node);
    }

    return fragment;
  }
}

// startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}
// ===============================================================


document.addEventListener('DOMContentLoaded', function () {
  // ===================== navbar collapse ======================
  var navCollapseBtn = document.querySelector('.navbar__burger');
  navCollapseBtn ? navCollapseBtn.addEventListener('click', function (e) {
    var navCollapse = document.querySelector('.navbarm__collapse');

    if (navCollapse) {
      var dataOpen = navCollapse.getAttribute('data-open');

      if (dataOpen === 'true') {
        navCollapse.setAttribute('data-open', 'false');
        navCollapse.style.maxHeight = 0;
        navCollapseBtn.classList.remove('is-active');
      } else {
        navCollapse.setAttribute('data-open', 'true');
        navCollapse.style.maxHeight = navCollapse.scrollHeight + "px";
        navCollapseBtn.classList.add('is-active');
      }
    }
  }) : null;
  // ============================================================


  // ======================== markdown table ====================
  var tables = document.querySelectorAll('.single__contents > table');
  for (let i = 0; i < tables.length; i++) {
    var table = tables[i];
    var wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.parentElement.replaceChild(wrapper, table);
    wrapper.appendChild(table);
  }
  // ============================================================


  // ========================== foot notes ======================
  var footNoteRefs = document.querySelectorAll('.footnote-ref');
  var footNoteBackRefs = document.querySelectorAll('.footnote-backref');

  footNoteRefs ?
  footNoteRefs.forEach(function(elem, idx) {
    elem.onmouseenter = function () {
      if (navbar.classList.contains('scrolling')) {
        navbar.classList.remove('scrolling');
      }
    }

    elem.onmouseleave = function () {
      if (!navbar.classList.contains('scrolling')) {
        setTimeout(function () {
          navbar.classList.add('scrolling');
        }, 100);
      }
    }

    elem.onclick = function () {
      if (!navbar.classList.contains('scrolling')) {
        navbar.classList.remove('navbar--show');
        navbar.classList.remove('navbar--hide');
        navbar.classList.add('navbar--hide');
      }
    }
  }) : null;

  footNoteBackRefs ?
  footNoteBackRefs.forEach(function(elem, idx) {
    elem.onmouseenter = function () {
      if (navbar.classList.contains('scrolling')) {
        navbar.classList.remove('scrolling');
      }
    }

    elem.onmouseleave = function () {
      if (!navbar.classList.contains('scrolling')) {
        setTimeout(function() {
          navbar.classList.add('scrolling');
        }, 100);
      }
    }

    elem.onclick = function () {
      if (!navbar.classList.contains('scrolling')) {
        navbar.classList.remove('navbar--show');
        navbar.classList.remove('navbar--hide');
        navbar.classList.add('navbar--hide');
      }
    }
  }) : null;
  // ============================================================


  // =================== search-result desktop ==================
  var summaryContainer = document.querySelector('.summary__container');
  var searchResult = document.querySelector('.search-result');
  var searchResultCloseBtn = document.querySelector('.search-result__close');
  searchResultCloseBtn ? searchResultCloseBtn.addEventListener('click', function (e) {
    searchResult.setAttribute('data-display', 'none');
    summaryContainer.setAttribute('data-display', 'block');
  }) : null;
  // =============================================================


  // ============================ tab ============================
  document.querySelectorAll('.tab') ?
  document.querySelectorAll('.tab').forEach(function(elem, idx) {
    var containerId = elem.getAttribute('id');
    var containerElem = elem;
    var tabLinks = elem.querySelectorAll('.tab__link');
    var tabContents = elem.querySelectorAll('.tab__content');
    var ids = [];

    tabLinks && tabLinks.length > 0 ?
    tabLinks.forEach(function(link, index, self) {
      link.onclick = function(e) {
        for (var i = 0; i < self.length; i++) {
          if (index === parseInt(i, 10)) {
            if (!self[i].classList.contains('active')) {
              self[i].classList.add('active');
              tabContents[i].style.display = 'block';
            }
          } else {
            self[i].classList.remove('active');
            tabContents[i].style.display = 'none';
          }
        }
      }
    }) : null;
  }) : null;
  // =============================================================


  // ========================== codetab ==========================
  document.querySelectorAll('.codetab') ?
  document.querySelectorAll('.codetab').forEach(function(elem, idx) {
    var containerId = elem.getAttribute('id');
    var containerElem = elem;
    var codetabLinks = elem.querySelectorAll('.codetab__link');
    var codetabContents = elem.querySelectorAll('.codetab__content');
    var ids = [];

    codetabLinks && codetabLinks.length > 0 ?
    codetabLinks.forEach(function(link, index, self) {
      link.onclick = function(e) {
        for (var i = 0; i < self.length; i++) {
          if (index === parseInt(i, 10)) {
            if (!self[i].classList.contains('active')) {
              self[i].classList.add('active');
              codetabContents[i].style.display = 'block';
            }
          } else {
            self[i].classList.remove('active');
            codetabContents[i].style.display = 'none';
          }
        }
      }
    }) : null;
  }) : null;
  // =============================================================


  // ========================= go to top =========================
  var gttBtn = document.getElementById("gtt");
  gttBtn.style.display = "none";
  gttBtn.addEventListener('click', function () {
    if (window.document.documentMode) {
      document.documentElement.scrollTop = 0;
    } else {
      scrollToTop(250);
    }
  });

  function scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15);
    var scrollInterval = setInterval(function () {
      if (window.scrollY != 0) {
        window.scrollBy(0, scrollStep);
      }
      else clearInterval(scrollInterval);
    }, 15);
  }

  var scrollFunction = function () {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
      gttBtn.style.display = "block";
    } else {
      gttBtn.style.display = "none";
    }
  }
  // ============================================================


  // ========================== expand ==========================
  var expandBtn = document.querySelectorAll('.expand__button');

  for (let i = 0; i < expandBtn.length; i++) {
    expandBtn[i].addEventListener("click", function () {
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        this.querySelector('svg').classList.add('expand-icon__right');
        this.querySelector('svg').classList.remove('expand-icon__down');
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        this.querySelector('svg').classList.remove('expand-icon__right');
        this.querySelector('svg').classList.add('expand-icon__down');
      }
    });
  }
  // ============================================================


  // ========================== scroll ==========================
  var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var tocElem = document.querySelector('.toc');
  var tableOfContentsElem = tocElem ? tocElem.querySelector('#TableOfContents') : null;
  var toggleTocElem = document.getElementById('toggle-toc');
  var singleContentsElem = document.querySelector('.single__contents');
  var navbar = document.querySelector('.navbar');
  var tocFlexbox = document.querySelector('.toc__flexbox');
  var tocFlexboxOuter = document.querySelector('.toc__flexbox--outer');
  var expandContents = document.querySelectorAll('.expand__content');
  var boxContents = document.querySelectorAll('.box');
  var notAllowedTitleIds = null;

  var tocFolding = JSON.parse( params.tocFolding );
  var tocLevels = JSON.parse( params.tocLevels );

  if (tocLevels) {
    tocLevels = tocLevels.toString();
  } else {
    tocLevels = "h1, h2, h3, h4, h5, h6";
  }

  // tab
  singleContentsElem && singleContentsElem.querySelectorAll(".tab") ?
  singleContentsElem.querySelectorAll(".tab").forEach(function (elem) {
    elem.querySelectorAll(tocLevels).forEach(function (element) {
      notAllowedTitleIds = Array.isArray(notAllowedTitleIds) ?
        notAllowedTitleIds.concat(element.getAttribute('id')) :
        [element.getAttribute('id')];
    });
  }) : null;

  // expand
  expandContents ? expandContents.forEach(function(elem) {
    elem.querySelectorAll(tocLevels).forEach(function (element) {
      notAllowedTitleIds = Array.isArray(notAllowedTitleIds) ?
        notAllowedTitleIds.concat(element.getAttribute('id')) :
        [element.getAttribute('id')];
    });
  }) : null;

  // box
  boxContents ? boxContents.forEach(function(elem) {
    elem.querySelectorAll(tocLevels).forEach(function (element) {
      notAllowedTitleIds = Array.isArray(notAllowedTitleIds) ?
        notAllowedTitleIds.concat(element.getAttribute('id')) :
        [element.getAttribute('id')];
    });
  }) : null;


  window.onscroll = function () {
    scrollFunction();

    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) { // scroll down
      if (st < 250) {
        gttBtn.style.display = "none";
      } else {
        gttBtn.style.display = "block";
      }

      if (st < 45) {
        return null;
      }

      if (navbar.classList.contains('scrolling')) {
        if (!navbar.classList.contains('navbar--hide')) {
          navbar.classList.add('navbar--hide');
        } else if (navbar.classList.contains('navbar--show')) {
          navbar.classList.remove('navbar--show');
        }
      }

      if (singleContentsElem) {
        if (singleContentsElem.querySelectorAll(tocLevels).length > 0) {
          singleContentsElem.querySelectorAll(tocLevels).forEach(function (elem) {
            if (toggleTocElem && !toggleTocElem.checked) {
              return null;
            }

            if (notAllowedTitleIds && notAllowedTitleIds.includes(elem.getAttribute('id'))) {
              return null;
            }

            if (document.documentElement.scrollTop >= elem.offsetTop) {
              if (tableOfContentsElem) {
                var id = elem.getAttribute('id');
                tocElem.querySelectorAll('a').forEach(function (elem) {
                  elem.classList.remove('active');
                });
                tocElem.querySelector('a[href="#' + id + '"]') ?
                  tocElem.querySelector('a[href="#' + id + '"]').classList.add('active') : null;

                if (false === tocFolding) {

                } else {
                  tableOfContentsElem.querySelectorAll('ul') ?
                    tableOfContentsElem.querySelectorAll('ul').forEach(function (rootUl) {
                      rootUl.querySelectorAll('li').forEach(function (liElem) {
                        liElem.querySelectorAll('ul').forEach(function (ulElem) {
                          ulElem.style.display = 'none';
                        });
                      });
                    }) : null;
                }

                var curElem = tableOfContentsElem.querySelector("[href='#" + id + "']");
                if (curElem && curElem.nextElementSibling) {
                  curElem.nextElementSibling.style.display = 'block';
                }
                getParents(curElem, 'ul') ?
                  getParents(curElem, 'ul').forEach(function (elem) {
                    elem.style.display = 'block';
                  }) : null;
              }
            }
          });
        } else {
          if (tocFlexbox) {
            tocFlexbox.setAttribute('data-position', '');
            if (!tocFlexbox.classList.contains('hide')) {
              tocFlexbox.classList.add('hide');
            }
          }
          if (tocFlexboxOuter) {
            tocFlexboxOuter.setAttribute('data-position', '');
            if (!tocFlexboxOuter.classList.contains('hide')) {
              tocFlexboxOuter.classList.add('hide');
            }
          }
        }
      }
    } else { // scroll up
      if (st < 250) {
        gttBtn.style.display = "none";
      }

      if (navbar.classList.contains('scrolling')) {
        if (navbar.classList.contains('navbar--hide')) {
          navbar.classList.remove('navbar--hide');
        } else if (!navbar.classList.contains('navbar--show')) {
          navbar.classList.add('navbar--show');
        }
      }

      if (singleContentsElem) {
        if (singleContentsElem.querySelectorAll(tocLevels).length > 0) {
          singleContentsElem.querySelectorAll(tocLevels).forEach(function (elem) {
            if (toggleTocElem && !toggleTocElem.checked) {
              return null;
            }

            if (notAllowedTitleIds && notAllowedTitleIds.includes(elem.getAttribute('id'))) {
              return null;
            }

            if (document.documentElement.scrollTop >= elem.offsetTop) {
              if (tableOfContentsElem) {
                var id = elem.getAttribute('id');
                tocElem.querySelectorAll('a').forEach(function (elem) {
                  elem.classList.remove('active');
                });
                tocElem.querySelector('a[href="#' + id + '"]') ?
                  tocElem.querySelector('a[href="#' + id + '"]').classList.add('active') : null;

                if (false === tocFolding) {

                } else {
                  tableOfContentsElem.querySelectorAll('ul') ?
                    tableOfContentsElem.querySelectorAll('ul').forEach(function (rootUl) {
                      rootUl.querySelectorAll('li').forEach(function (liElem) {
                        liElem.querySelectorAll('ul').forEach(function (ulElem) {
                          ulElem.style.display = 'none';
                        });
                      });
                    }) : null;
                }

                var curElem = tableOfContentsElem.querySelector("[href='#" + id + "']");
                if (curElem && curElem.nextElementSibling) {
                  curElem.nextElementSibling.style.display = 'block';
                }
                getParents(curElem, 'ul') ?
                  getParents(curElem, 'ul').forEach(function (elem) {
                    elem.style.display = 'block';
                  }) : null;
              }
            }
          });
        } else {
          if (tocFlexbox && !tocFlexbox.classList.contains('hide')) {
            tocFlexbox.classList.add('hide');
          }
          if (tocFlexboxOuter && !tocFlexboxOuter.classList.contains('hide')) {
            tocFlexboxOuter.classList.add('hide');
          }
        }

      }

      if (tableOfContentsElem && document.documentElement.scrollTop < 250) {
        if (false === tocFolding) {

        } else {
          tableOfContentsElem.querySelector('ul') ?
            tableOfContentsElem.querySelector('ul').querySelectorAll('li').forEach(function (liElem) {
              liElem.querySelectorAll('ul').forEach(function (ulElem) {
                ulElem.style.display = 'none';
              });
            }) : null;
        }
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };
// ============================================================


// ======================= theme change =======================
  var localTheme = localStorage.getItem('theme');
  var rootEleme = document.getElementById('root');
  var selectThemeElem = document.querySelectorAll('.select-theme');
  var selectThemeItemElem = document.querySelectorAll('.select-theme__item');

  var skinDarkCode = JSON.parse( params.skinDarkCode );
  var skinLightCode = JSON.parse( params.skinLightCode );
  var skinHackerCode = JSON.parse( params.skinHackerCode );
  var skinSolarizedCode = JSON.parse( params.skinSolarizedCode );
  var skinKimbieCode = JSON.parse( params.skinKimbieCode );

  var setMetaColor = function(themeColor) {
    var metaMsapplicationTileColor = document.getElementsByName('msapplication-TileColor')[0];
    var metaThemeColor = document.getElementsByName('theme-color')[0];
    var metaMsapplicationNavbuttonColor = document.getElementsByName('msapplication-navbutton-color')[0];
    var metaAppleMobileWebAappStatusBarStyle = document.getElementsByName('apple-mobile-web-app-status-bar-style')[0];

    if (themeColor.includes('dark')) {
      metaMsapplicationTileColor.setAttribute('content', '#fcfcfa');
      metaThemeColor.setAttribute('content', '#403E41');
      metaMsapplicationNavbuttonColor.setAttribute('content', '#403E41');
      metaAppleMobileWebAappStatusBarStyle.setAttribute('content', '#403E41');
    } else if (themeColor.includes('light')) {
      metaMsapplicationTileColor.setAttribute('content', '#555');
      metaThemeColor.setAttribute('content', '#eee');
      metaMsapplicationNavbuttonColor.setAttribute('content', '#eee');
      metaAppleMobileWebAappStatusBarStyle.setAttribute('content', '#eee');
    } else if (themeColor.includes('hacker')) {
      metaMsapplicationTileColor.setAttribute('content', '#e3cd26');
      metaThemeColor.setAttribute('content', '#252526');
      metaMsapplicationNavbuttonColor.setAttribute('content', '#252526');
      metaAppleMobileWebAappStatusBarStyle.setAttribute('content', '#252526');
    } else if (themeColor.includes('solarized')) {
      metaMsapplicationTileColor.setAttribute('content', '#d3af86');
      metaThemeColor.setAttribute('content', '#51412c');
      metaMsapplicationNavbuttonColor.setAttribute('content', '#51412c');
      metaAppleMobileWebAappStatusBarStyle.setAttribute('content', '#51412c');
    } else if (themeColor.includes('kimbie')) {
      metaMsapplicationTileColor.setAttribute('content', '#586e75');
      metaThemeColor.setAttribute('content', '#eee8d5');
      metaMsapplicationNavbuttonColor.setAttribute('content', '#eee8d5');
      metaAppleMobileWebAappStatusBarStyle.setAttribute('content', '#eee8d5');
    }
  }

  var parseSkinCode = function(themeText) {
    if (themeText === skinDarkCode) {
      return 'dark';
    } else if (themeText === skinLightCode) {
      return 'light';
    } else if (themeText === skinHackerCode) {
      return 'hacker';
    } else if (themeText === skinSolarizedCode) {
      return 'solarized';
    } else if (themeText === skinKimbieCode) {
      return 'kimbie';
    }
  }

  if (localTheme) {
    selectThemeItemElem ?
    selectThemeItemElem.forEach(function (elem) {
      if (elem.text.trim() === localTheme) {
        elem.classList.add('is-active');
      } else {
        elem.classList.remove('is-active');
      }
    }) : null;

    setMetaColor(localTheme);
  } else {
    setMetaColor(rootEleme.className);
  }

  selectThemeItemElem ?
  selectThemeItemElem.forEach(function (v, i) {
    v.addEventListener('click', function (e) {
      var selectedThemeVariant = parseSkinCode(e.target.text.trim());
      localStorage.setItem('theme', selectedThemeVariant);
      setMetaColor(selectedThemeVariant);

      rootEleme.removeAttribute('class');
      rootEleme.classList.add('theme__' + selectedThemeVariant);
      selectThemeElem.forEach(function(rootElem) {
        rootElem.querySelectorAll('a').forEach(function (elem) {
          if (elem.classList) {
            if (elem.text.trim() === selectedThemeVariant) {
              if (!elem.classList.contains('is-active')) {
                elem.classList.add('is-active');
              }
            } else {
              if (elem.classList.contains('is-active')) {
                elem.classList.remove('is-active');
              }
            }
          }
        });
      });

      if (window.mermaid) {
        if (selectedThemeVariant === "dark" || selectedThemeVariant === "hacker") {
          mermaid.initialize({ theme: 'dark' });
          location.reload();
        } else {
          mermaid.initialize({ theme: 'default' });
          location.reload();
        }
      }

      var utterances = document.getElementById('utterances');
      if (utterances) {
        utterances.querySelector('iframe').contentWindow.postMessage({
          type: 'set-theme',
          theme: selectedThemeVariant === "dark" || selectedThemeVariant === "hacker" ? 'photon-dark' : selectedThemeVariant === 'kimbie' ? 'github-dark-orange' : 'github-light',
        }, 'https://utteranc.es');
      }

      var twitterCards = document.querySelectorAll('.twitter-timeline');
      if (twitterCards) {
        window.postMessage({
          type: 'set-twitter-theme',
          theme: selectedThemeVariant === 'light' || selectedThemeVariant === 'solarized' ? 'light' : 'dark',
        });
      }
    });
  }) : null;
// ============================================================


// ========================== search ==========================
  var baseurl = JSON.parse( params.baseurl );
  var permalink = JSON.parse( params.permalink );
  var langprefix = JSON.parse( params.langprefix );
  var searchResults = null;
  var searchMenu = null;
  var searchText = null;

  var enableSearch = JSON.parse( params.enableSearch );
  var searchDistance = JSON.parse( params.searchDistance );
  var searchThreshold = JSON.parse( params.searchThreshold );
  var searchContent = JSON.parse( params.searchContent );
  var enableSearchHighlight = JSON.parse( params.enableSearchHighlight );
  var searchResultPosition = JSON.parse( params.searchResultPosition );
  var sectionType = JSON.parse( params.sectionType );
  var kind = JSON.parse( params.kind );

  var fuse = null;

  if (enableSearch) {
    (function initFuse() {
      var xhr = new XMLHttpRequest();
      if (sectionType === "publication" && kind !== "page") {
        xhr.open('GET', permalink + "index.json");
      } else {
        xhr.open('GET', baseurl + langprefix + "/index.json");
      }

      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      xhr.onload = function () {
        if (xhr.status === 200) {
          fuse = new Fuse(JSON.parse(xhr.response.toString('utf-8')), {
            keys: sectionType.includes('publication') ? ['title', 'abstract'] :
              searchContent ? ['title', 'description', 'content'] : ['title', 'description'],
            includeMatches: enableSearchHighlight,
            shouldSort: true, // default: true
            threshold: searchThreshold ? searchThreshold : 0.4, // default: 0.6 (0.0 requires a perfect match)
            location: 0, // default: 0
            distance: searchDistance ? searchDistance : 100, // default: 100
            maxPatternLength: 32,
            minMatchCharLength: 1,
            isCaseSensitive: false, // defualt: false
            findAllMatches: false, // default: false
            useExtendedSearch: false, // default: false
          });
          window.fuse = fuse;
        }
        else {
          console.error('[' + xhr.status + ']Error:', xhr.statusText);
        }
      };
      xhr.send();
    })();
  }

  function makeLi(ulElem, obj) {
    var li = document.createElement('li');
    li.className = 'search-result__item';

    var a = document.createElement('a');
    a.innerHTML = obj.item.title;
    a.setAttribute('class', 'search-result__item--title');
    a.setAttribute('href', obj.item.uri);

    var descDiv = document.createElement('div');
    descDiv.setAttribute('class', 'search-result__item--desc');
    if (obj.item.description) {
      descDiv.innerHTML = obj.item.description;
    } else if (obj.item.content) {
      descDiv.innerHTML = obj.item.content.substring(0, 225);
    }

    li.appendChild(a);
    li.appendChild(descDiv);
    ulElem.appendChild(li);
  }

  function makeHighlightLi(ulElem, obj) {
    var li = document.createElement('li');
    li.className = 'search-result__item';
    var descDiv = null;

    var a = document.createElement('a');
    a.innerHTML = obj.item.title;
    a.setAttribute('class', 'search-result__item--title');
    a.setAttribute('href', obj.item.uri);

    if (obj.matches && obj.matches.length) {
      for (var i = 0; i < obj.matches.length; i++) {
        if ('title' === obj.matches[i].key) {
          a = document.createElement('a');
          a.innerHTML = generateHighlightedText(obj.matches[i].value, obj.matches[i].indices);
          a.setAttribute('class', 'search-result__item--title');
          a.setAttribute('href', obj.item.uri);
        }

        if ('description' === obj.matches[i].key) {
          descDiv = document.createElement('div');
          descDiv.setAttribute('class', 'search-result__item--desc');
          descDiv.innerHTML = generateHighlightedText(obj.item.description, obj.matches[i].indices);
        } else if ('content' === obj.matches[i].key) {
          if (!descDiv) {
            descDiv = document.createElement('div');
            descDiv.setAttribute('class', 'search-result__item--desc');
            descDiv.innerHTML = generateHighlightedText(obj.item.content.substring(0, 150), obj.matches[i].indices);
          }
        } else {
          if (obj.item.description) {
            descDiv = document.createElement('div');
            descDiv.setAttribute('class', 'search-result__item--desc');
            descDiv.innerHTML = obj.item.description;
          } else {
            descDiv = document.createElement('div');
            descDiv.setAttribute('class', 'search-result__item--desc');
            descDiv.innerHTML = obj.item.content.substring(0, 150);
          }
        }
      }

      li.appendChild(a);
      if (descDiv) {
        li.appendChild(descDiv);
      }
      if (li) {
        ulElem.appendChild(li);
      }
    }
  }

  function renderSearchResultsSide(searchText, results) {
    searchResults = document.getElementById('search-results');
    searchMenu = document.getElementById('search-menu');
    searchResults.setAttribute('class', 'dropdown is-active');

    var ul = document.createElement('ul');
    ul.setAttribute('class', 'dropdown-content search-content');

    if (results.length) {
      results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.setAttribute('href', result.uri);
        a.setAttribute('class', 'dropdown-item');
        a.appendChild(li);

        var titleDiv = document.createElement('div');
        titleDiv.innerHTML = result.title;
        titleDiv.setAttribute('class', 'menu-item__title');

        var descDiv = document.createElement('div');
        descDiv.setAttribute('class', 'menu-item__desc');
        if (result.description) {
          descDiv.innerHTML = result.description;
        } else if (result.content) {
          descDiv.innerHTML = result.content.substring(0, 150);
        }

        li.appendChild(titleDiv);
        li.appendChild(descDiv);
        ul.appendChild(a);
      });
    } else {
      var li = document.createElement('li');
      li.setAttribute('class', 'dropdown-item');
      li.innerText = 'No results found';
      ul.appendChild(li);
    }

    while (searchMenu.hasChildNodes()) {
      searchMenu.removeChild(
        searchMenu.lastChild
      );
    }

    searchMenu.appendChild(ul);
  }

  function renderSearchHighlightResultsSide(searchText, results) {
    searchResults = document.getElementById('search-results');
    searchMenu = document.getElementById('search-menu');
    searchResults.setAttribute('class', 'dropdown is-active');

    var ul = document.createElement('ul');
    ul.setAttribute('class', 'dropdown-content search-content');

    if (results.length) {
      results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        var descDiv = null;

        a.setAttribute('href', result.item.uri);
        a.setAttribute('class', 'dropdown-item');
        a.appendChild(li);

        var titleDiv = document.createElement('div');
        titleDiv.innerHTML = result.item.title;
        titleDiv.setAttribute('class', 'menu-item__title');

        if (result.matches && result.matches.length) {
          for (var i = 0; i < result.matches.length; i++) {
            if ('title' === result.matches[i].key) {
              titleDiv.innerHTML = generateHighlightedText(result.matches[i].value, result.matches[i].indices);
            }

            if ('description' === result.matches[i].key) {
              descDiv = document.createElement('div');
              descDiv.setAttribute('class', 'menu-item__desc');
              descDiv.innerHTML = generateHighlightedText(result.item.description, result.matches[i].indices);
            } else if ('content' === result.matches[i].key) {
              if (!descDiv) {
                descDiv = document.createElement('div');
                descDiv.setAttribute('class', 'menu-item__desc');
                descDiv.innerHTML = generateHighlightedText(result.item.content.substring(0, 150), result.matches[i].indices);
              }
            } else {
              if (result.item.description) {
                descDiv = document.createElement('div');
                descDiv.setAttribute('class', 'menu-item__desc');
                descDiv.innerHTML = result.item.description;
              } else {
                descDiv = document.createElement('div');
                descDiv.setAttribute('class', 'menu-item__desc');
                descDiv.innerHTML = result.item.content.substring(0, 150);
              }
            }
          }

          li.appendChild(titleDiv);
          if (descDiv) {
            li.appendChild(descDiv);
          }
          ul.appendChild(a);
        }
      });
    } else {
      var li = document.createElement('li');
      li.setAttribute('class', 'dropdown-item');
      li.innerText = 'No results found';
      ul.appendChild(li);
    }

    while (searchMenu.hasChildNodes()) {
      searchMenu.removeChild(
        searchMenu.lastChild
      );
    }
    searchMenu.appendChild(ul);
  }

  function renderSearchResultsMobile(searchText, results) {
    searchResults = document.getElementById('search-mobile-results');

    var content = document.createElement('div');
    content.setAttribute('class', 'mobile-search__content');

    if (results.length > 0) {
      results.forEach(function (result) {
        var item = document.createElement('a');
        item.setAttribute('href', result.uri);
        item.innerHTML = '<div class="mobile-search__item"><div class="mobile-search__item--title">📄 ' + result.title + '</div><div class="mobile-search__item--desc">' + (result.description ? result.description : result.content) + '</div></div>';
        content.appendChild(item);
      });
    } else {
      var item = document.createElement('span');
      content.appendChild(item);
    }

    let wrap = document.getElementById('search-mobile-results');
    while (wrap.firstChild) {
      wrap.removeChild(wrap.firstChild)
    }
    searchResults.appendChild(content);
  }

  function renderSearchHighlightResultsMobile(searchText, results) {
    searchResults = document.getElementById('search-mobile-results');

    var ul = document.createElement('div');
    ul.setAttribute('class', 'mobile-search__content');

    if (results.length) {
      results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        var descDiv = null;

        a.setAttribute('href', result.item.uri);
        a.appendChild(li);
        li.setAttribute('class', 'mobile-search__item');

        var titleDiv = document.createElement('div');
        titleDiv.innerHTML = result.item.title;
        titleDiv.setAttribute('class', 'mobile-search__item--title');

        if (result.matches && result.matches.length) {
          for (var i = 0; i < result.matches.length; i++) {
            if ('title' === result.matches[i].key) {
              titleDiv.innerHTML = generateHighlightedText(result.matches[i].value, result.matches[i].indices);
            }

            if ('description' === result.matches[i].key) {
              descDiv = document.createElement('div');
              descDiv.setAttribute('class', 'mobile-search__item--desc');
              descDiv.innerHTML = generateHighlightedText(result.item.description, result.matches[i].indices);
            } else if ('content' === result.matches[i].key) {
              if (!descDiv) {
                descDiv = document.createElement('div');
                descDiv.setAttribute('class', 'mobile-search__item--desc');
                descDiv.innerHTML = generateHighlightedText(result.item.content.substring(0, 150), result.matches[i].indices);
              }
            } else {
              if (result.item.description) {
                descDiv = document.createElement('div');
                descDiv.setAttribute('class', 'mobile-search__item--desc');
                descDiv.innerHTML = result.item.description;
              } else {
                descDiv = document.createElement('div');
                descDiv.setAttribute('class', 'mobile-search__item--desc');
                descDiv.innerHTML = result.item.content.substring(0, 150);
              }
            }
          }

          li.appendChild(titleDiv);
          if (descDiv) {
            li.appendChild(descDiv);
          }
          ul.appendChild(a);
        }
      });
    } else {
      var item = document.createElement('span');
      ul.appendChild(item);
    }

    let wrap = document.getElementById('search-mobile-results');
    while (wrap.firstChild) {
      wrap.removeChild(wrap.firstChild)
    }
    searchResults.appendChild(ul);
  }

  function generateHighlightedText(text, regions) {
    if (!regions) {
      return text;
    }

    var content = '', nextUnhighlightedRegionStartingIndex = 0;

    regions.forEach(function(region) {
      if (region[0] === region[1]) {
        return null;
      }

      content += '' +
        text.substring(nextUnhighlightedRegionStartingIndex, region[0]) +
        '<span class="search__highlight">' +
          text.substring(region[0], region[1] + 1) +
        '</span>' +
      '';
      nextUnhighlightedRegionStartingIndex = region[1] + 1;
    });

    content += text.substring(nextUnhighlightedRegionStartingIndex);

    return content;
  };

  var searchElem = document.getElementById('search');
  var searchMobile = document.getElementById('search-mobile');
  var searchResultsContainer = document.getElementById('search-results');

  searchElem ?
  searchElem.addEventListener('input', function(e) {
    if (!e.target.value | window.innerWidth < 770) {
      searchResultsContainer ? searchResultsContainer.setAttribute('class', 'dropdown') : null;
      searchResult ? searchResult.setAttribute('data-display', 'none') : null;
      summaryContainer ? summaryContainer.setAttribute('data-display', 'block') : null;
      return null;
    }

    searchText = e.target.value;
    var results = fuse.search(e.target.value);

    if (searchResultPosition === "main") {
      if (enableSearchHighlight) {
        renderSearchHighlightResultsMain(searchText, results);
      } else {
        renderSearchResultsMain(searchText, results);
      }
    } else {
      if (enableSearchHighlight) {
        renderSearchHighlightResultsSide(searchText, results);
      } else {
        renderSearchResultsSide(searchText, results);
      }

      var dropdownItems = searchResultsContainer.querySelectorAll('.dropdown-item');
      dropdownItems ? dropdownItems.forEach(function(item) {
        item.addEventListener('mousedown', function(e) {
          e.target.click();
        });
      }) : null;
    }
  }) : null;

  searchElem ?
  searchElem.addEventListener('blur', function() {
    if (window.innerWidth < 770) {
      return null;
    }
    searchResultsContainer ? searchResultsContainer.setAttribute('class', 'dropdown') : null;
  }) : null;

  searchElem ?
  searchElem.addEventListener('click', function(e) {
    if (window.innerWidth < 770) {
      return null;
    }
    if (!e.target.value) {
      searchResultsContainer ? searchResultsContainer.setAttribute('class', 'dropdown') : null;
      return null;
    }

    searchText = e.target.value;
    var results = fuse.search(e.target.value);

    if (searchResultPosition === "main") {
      if (enableSearchHighlight) {
        renderSearchHighlightResultsMain(searchText, results);
      } else {
        renderSearchResultsMain(searchText, results);
      }
    } else{
      if (enableSearchHighlight) {
        renderSearchHighlightResultsSide(searchText, results);
      } else {
        renderSearchResultsSide(searchText, results);
      }

      var dropdownItems = searchResultsContainer.querySelectorAll('.dropdown-item');
      dropdownItems ? dropdownItems.forEach(function (item) {
        item.addEventListener('mousedown', function (e) {
          e.target.click();
        });
      }) : null;
    }
  }) : null;

  var searchMenuElem = document.getElementById("search-menu");
  var activeItem = document.querySelector('#search-menu .dropdown-item.is-active');
  var activeIndex = null;
  var items = null;
  var searchContainerMaxHeight = 350;

  searchElem ?
  searchElem.addEventListener('keydown', function(e) {
    if (window.innerWidth < 770) {
      return null;
    }

    if (e.key === 'Escape') {
      searchResult ? searchResult.setAttribute('data-display', 'none') : null;
      summaryContainer ? summaryContainer.setAttribute('data-display', 'block') : null;
    }

    var items = document.querySelectorAll('#search-menu .dropdown-item');
    var keyCode = e.which || e.keyCode;

    if (!items || !items.length) {
      return null;
    }

    if (e.key === 'ArrowDown' || keyCode === 40) {
      if (activeIndex === null) {
        activeIndex = 0;
        items[activeIndex].classList.remove('is-active');
      } else {
        items[activeIndex].classList.remove('is-active');
        activeIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      }
      items[activeIndex].classList.add('is-active');

      let overflowedPixel = items[activeIndex].offsetTop + items[activeIndex].clientHeight - searchContainerMaxHeight;
      if (overflowedPixel > 0) {
        document.querySelector(".search-content").scrollTop += items[activeIndex].getBoundingClientRect().height;
      } else if (activeIndex === 0) {
        document.querySelector(".search-content").scrollTop = 0;
      }
    } else if (e.key === 'ArrowUp' || keyCode === 38) {
      if (activeIndex === null) {
        activeIndex = items.length - 1;
        items[activeIndex].classList.remove('is-active');
      } else {
        items[activeIndex].classList.remove('is-active');
        activeIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      }
      items[activeIndex].classList.add('is-active');

      let overflowedPixel = items[activeIndex].offsetTop + items[activeIndex].clientHeight - searchContainerMaxHeight;
      if (overflowedPixel < 0) {
        document.querySelector(".search-content").scrollTop -= items[activeIndex].getBoundingClientRect().height;
      } else {
        document.querySelector(".search-content").scrollTop = overflowedPixel + items[activeIndex].getBoundingClientRect().height;
      }
    } else if (e.key === 'Enter' || keyCode === 13) {
      if (items[activeIndex] && items[activeIndex].getAttribute('href')) {
        location.href = items[activeIndex].getAttribute('href');
      }
    } else if (e.key === 'Escape' || keyCode === 27) {
      e.target.value = null;
      if (searchResults) {
        searchResults.classList.remove('is-active');
      }
    }
  }) : null;

  searchMobile ?
  searchMobile.addEventListener('input', function(e) {
    if (!e.target.value) {
      let wrap = document.getElementById('search-mobile-results');
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild);
      }
      return null;
    }

    searchText = e.target.value;
    var results = fuse.search(e.target.value);
    renderSearchResultsMobile(searchText, results);
    if (enableSearchHighlight) {
      renderSearchHighlightResultsMobile(searchText, results);
    } else {
      renderSearchResultsMobile(searchText, results);
    }
  }) : null;
// ============================================================


// ====================== mobile search =======================
  var mobileSearchInputElem = document.querySelector('#search-mobile');
  var mobileSearchClassElem = document.querySelector('.mobile-search');
  var mobileSearchBtnElems = document.querySelectorAll('.navbar-search');
  var mobileSearchCloseBtnElem = document.querySelector('#search-mobile-close');
  var mobileSearchContainer = document.querySelector('#search-mobile-container');
  var mobileSearchResultsElem = document.querySelector('#search-mobile-results');
  var htmlElem = document.querySelector('html');

  if (mobileSearchClassElem) {
    mobileSearchClassElem.style.display = 'none';
  }

  mobileSearchBtnElems ?
  mobileSearchBtnElems.forEach(function (elem, idx) {
    elem.addEventListener('click', function () {
      if (mobileSearchContainer) {
        mobileSearchContainer.style.display = 'block';
      }

      if (mobileSearchInputElem) {
        mobileSearchInputElem.focus();
      }

      if (htmlElem) {
        htmlElem.style.overflowY = 'hidden';
      }
    });
  }) : null;

  mobileSearchCloseBtnElem ?
  mobileSearchCloseBtnElem.addEventListener('click', function() {
    if (mobileSearchContainer) {
      mobileSearchContainer.style.display = 'none';
    }

    if (mobileSearchInputElem) {
      mobileSearchInputElem.value = '';
    }

    if (mobileSearchResultsElem) {
      while (mobileSearchResultsElem.firstChild) {
        mobileSearchResultsElem.removeChild(mobileSearchResultsElem.firstChild);
      }
    }

    if (htmlElem) {
      htmlElem.style.overflowY = 'visible';
    }
  }) : null;

  mobileSearchInputElem ?
  mobileSearchInputElem.addEventListener('keydown', function(e) {
    var keyCode = e.which || e.keyCode;
    if (e.key === 'Escape' || keyCode === 27) {
      if (mobileSearchContainer) {
        mobileSearchContainer.style.display = 'none';
      }

      if (mobileSearchInputElem) {
        mobileSearchInputElem.value = '';
      }

      if (mobileSearchResultsElem) {
        while (mobileSearchResultsElem.firstChild) {
          mobileSearchResultsElem.removeChild(mobileSearchResultsElem.firstChild);
        }
      }
      if (htmlElem) {
        htmlElem.style.overflowY = 'visible';
      }
    }
  }) : null;
// ============================================================


// =================== search-result desktop ==================
  function renderSearchResultsMain(searchText, results) {
    var searchBody = document.querySelector('.search-result__body');
    var originUl = searchBody.querySelector('ul');
    var ul = document.createElement('ul');

    if (!searchText) {
      searchResult ? searchResult.setAttribute('data-display', 'none') : null;
      summaryContainer ? summaryContainer.setAttribute('data-display', 'block') : null;
    } else if (results) {
      if (results && results.length) {
        results.forEach(function (result) {
          makeLi(ul, result);
        });

        searchResult ? searchResult.setAttribute('data-display', 'block') : null;
        summaryContainer ? summaryContainer.setAttribute('data-display', 'none') : null;
      }
    }

    originUl.parentNode.replaceChild(ul, originUl);
  }

  function renderSearchHighlightResultsMain(searchText, results) {
    var searchBody = document.querySelector('.search-result__body');
    var originUl = searchBody.querySelector('ul');
    var ul = document.createElement('ul');

    if (!searchText) {
      searchResult ? searchResult.setAttribute('data-display', 'none') : null;
      summaryContainer ? summaryContainer.setAttribute('data-display', 'block') : null;
    } else if (results) {
      if (results && results.length) {
        results.forEach(function (result) {
          makeHighlightLi(ul, result);
        });

        searchResult ? searchResult.setAttribute('data-display', 'block') : null;
        summaryContainer ? summaryContainer.setAttribute('data-display', 'none') : null;
      }
    }

    originUl.parentNode.replaceChild(ul, originUl);
  }
// ============================================================
});
