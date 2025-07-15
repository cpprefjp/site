# placeholders
* functional[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace placeholders {
  unspecified _1;
  unspecified _2;
  …
  unspecified _N;
}}
```
* unspecified[italic]

## 概要
`_1`、`_2`、…、`_N`は、[`bind()`](bind.md)で使用するプレースホルダーオブジェクトである。

それぞれ、[`bind()`](bind.md)によって返された関数オブジェクトに指定する「第1引数」「第2引数」…「第N引数」であることを意味する。

各プレースホルダーオブジェクトの宣言は、可能ならば以下のように行われる。

`inline constexpr unspecified _1;`

そうできない場合、もしくはC++14までは次のように宣言される。

`extern unspecified _1;`

## 要件
各`placeholder`の型は、デフォルト構築とコピー構築が可能であり、デフォルト・コピー・ムーブコンストラクタは例外を投げない。
また、それらの型がコピー代入可能であるかは処理系定義であるが、コピー代入可能な場合はその代入演算子も同様に例外を投げない。

C++20以降、それらのコンストラクタ及び代入演算子（定義されている場合）は`constexpr`関数である。

## 備考
プレースホルダーの数(`N`の値)は、10以上実装することが推奨される。


## バージョン
### 言語
- C++11

## 参照
- [LWG Issue 2488. Placeholders should be allowed and encouraged to be constexpr](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2488)
- [P0607R0 Inline Variables for the Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0607r0.html)
