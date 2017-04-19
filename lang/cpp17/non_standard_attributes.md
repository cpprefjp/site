# 不明な属性を無視する
* cpp17[meta cpp]

## 概要

コンパイラにとって不明な属性は無視する。

あるコンパイラAで使えるが、別のコンパイラBでは使えない属性を指定したい場合がある。従来はコンパイラが不明な属性を発見したときの振る舞いが明確ではなく、コンパイルエラーが起こる可能性があった。このためコンパイラごとに不明な属性かどうか考慮し、`#ifdef`などのマクロで属性を隠す必要があった。

しかしC++17では不明な属性を無視するように規定されたため、コンパイラごとに不明な属性かどうか考慮する必要はなくなった。

## 仕様

C++標準が定義していない属性かつコンパイラにとって不明な属性は無視する。

## 例
```cpp
[[deprecated]] void f() {}
  //C++標準に規定されている属性

[[gnu::deprecated]] void g() {}
  //C++標準に規定されていないが、コンパイラにとって既知の属性

[[UNKNOWN::unknown_attribute]] void h() {}
  //C++標準に規定されておらず、コンパイラにとって未知の属性
```

### 出力

```
```

### 備考

Clang++ 5.0.0 にて例に挙げたコードをコンパイルしたとき、未知の属性は無視されるが、同時に下記のように警告も出力される。

```
non_standard_attributes.cpp:7:3: warning: unknown attribute 'unknown_attribute' ignored [-Wunknown-attributes]
[[UNKNOWN::unknown_attribute]] int h() { return 0; }
  ^
1 warning generated.
```

プログラマが意図的に未知の属性を指定していて、警告が不要な場合はコンパイラオプションで警告を抑制できる。Clang++の場合は`-Wno-unknown-attributes`オプション、GCCの場合は`-Wno-attributes`オプションを指定する。

## 関連項目
- [C++11 属性構文](/lang/cpp11/attributes.md)

## 参照
- [P0283R2 Standard and non-standard attributes.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0283r2.html)
