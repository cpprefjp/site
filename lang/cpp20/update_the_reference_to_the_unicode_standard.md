# Unicode標準への参照を更新
* cpp20[meta cpp]

<-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<-- last lang caution -->

## 概要
Unicode標準 (ISO/IEC 10646) としてこれまで、「ISO/IEC 10646-1:1993, Information technology — Universal Multiple-Octet Coded Character Set (UCS) — Part 1: Architecture and Basic Multilingual Plane」が参照されていた。

従来の古い仕様への参照は、非推奨化された古い機能のものであるとして残し、Unicode標準の最新仕様「ISO/IEC 10646, Information technology — Universal Coded Character Set (UCS)」を参照するよう追加する。

Unicode標準で非推奨化された用語UCS2とUCS4の扱いは、以下のようになる：

- UTC-32はUCS4と見なせるため、文字エンコーディングの説明ではUCS4の代わりにUTF-32を使用する
- ただしUTF-16はUCS2と見なすことができないため、古い機能のために古い仕様を参照するとして一部そのまま残す

実装が常に最新のUnicode標準を参照していることから、この変更によるユーザーへの直接的な影響はない。


## この機能が必要になった背景・経緯
C++規格上ではISO/IEC 10646-1:1993を参照していても、実装は最新仕様に更新し続けていた。たとえば1996の仕様ではハングル文字のセットが削除されて別な位置に追加され、チベット文字が再追加された。実装はそれに対応している。

また、C++標準が参照しているECMAScript標準でUnicode標準の参照が競合してしまう。

Unicode標準での用語定義が変更されたことにも影響がある。UCS2とUCS4という用語が非推奨化されたために、その用語をC++標準が使用し続けることは望ましくない。


## 参照
- [P1025R1 Update The Reference To The Unicode Standard](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1025r1.html)