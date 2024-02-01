# 異なる文字エンコーディングをもつ文字列リテラルの連結を不適格とする
* cpp23[meta cpp]

## 概要
C++20までは、実装定義の動作として`L""`、`u8""`、`u""`、`U""`のようなエンコーディングが混在する文字列リテラルの連結を条件付きで許可していたが、これを禁止とする。

```cpp
// C++20 : 実装定義として条件付きでOK
//         (ただし主要コンパイラはサポートしていない)
// C++23 : NG
void f() {
  { auto a = L"" u""; }
  { auto a = L"" u8""; }
  { auto a = L"" U""; }

  { auto a = u8"" L""; }
  { auto a = u8"" u""; }
  { auto a = u8"" U""; }

  { auto a = u"" L""; }
  { auto a = u"" u8""; }
  { auto a = u"" U""; }

  { auto a = U"" L""; }
  { auto a = U"" u""; }
  { auto a = U"" u8""; }
}
```

異なるエンコーディングを混在させた文字列リテラルの連結は、ICC、GCC、Clang、MSVCのいずれもしておらず、それが有用なケースは知られていなかったため禁止する。


## 参照
- [P2201R1: Mixed string literal concatenation](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2201r1.html)
