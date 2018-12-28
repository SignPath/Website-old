call markdown-it %1 -o %1.raw.html
cat %~p0head.html %1.raw.html %~p0foot.html >%1.html
del %1.raw.html
@echo off
rem   md.use(require('markdown-it-imsize'), { autofill: true })
rem   md.use(require("markdown-it-anchor")); 
rem   md.use(require("markdown-it-table-of-contents"), { includeLevel: "[2,3]" });
rem   md.use(require("markdown-it-admonition"));