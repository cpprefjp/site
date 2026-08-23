# disable_sized_sentinel_for
* iterator[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class S, class I>
  inline constexpr bool disable_sized_sentinel_for = false;

  // reverse_iteratorに対する特殊化
  template<class Iterator1, class Iterator2>
    requires (!sized_sentinel_for<Iterator1, Iterator2>)
  inline constexpr bool disable_sized_sentinel_for<reverse_iterator<Iterator1>,
                                                   reverse_iterator<Iterator2>> = true;

  // move_iteratorに対する特殊化 (C++23)
  template<class Iterator1, class Iterator2>
    requires (!sized_sentinel_for<Iterator1, Iterator2>)
  inline constexpr bool disable_sized_sentinel_for<move_iterator<Iterator1>,
                                                   move_iterator<Iterator2>> = true;
}
```
* move_iterator[link move_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* reverse_iterator[link /reference/iterator/reverse_iterator.md]

## 概要

`disable_sized_sentinel_for`は、任意のイテレータ型`I`とその番兵型`S`について[`sized_sentinel_for`](sized_sentinel_for.md)を無効化するカスタマイゼーションポイントである。

イテレータ型`I, S`が`sized_sentinel_for`を満たすがそのモデルとならない（意味論的な要件まで満足することができない）ようなイテレータをライブラリで使用するためのopt-outメカニズムとして提供されている。

## 要件

`I, S`がプログラム定義型である場合に、非配列型かつオブジェクト型である`I, S`に対して特殊化が許可される。  
そのような特殊化は定数式で使用可能であり、`const bool`型を持つ必要がある。

## 例

[`sized_sentinel_for`](sized_sentinel_for.md)のサンプルコードを参照。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P1871R0 Should concepts be enabled or disabled?](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1871r0.html)
- [P1871R1 Concept traits should be named after concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1871r1.html)
- [microsoft/STL P1871R1 disable_sized_sentinel_for #607 - Github](https://github.com/microsoft/STL/pull/607/files#r392700693)
- [LWG Issue 3736. `move_iterator` missing `disable_sized_sentinel_for` specialization](https://cplusplus.github.io/LWG/issue3736)
    - C++23で、`move_iterator`に対する`disable_sized_sentinel_for`の特殊化が追加され、`move_iterator`が意味論的に`sized_sentinel_for`を満たさない場合に誤ってそれを満たすと判定される問題が解消された
- [LWG Issue 3183. Normative permission to specialize Ranges variable templates](https://cplusplus.github.io/LWG/issue3183)
    - C++20で、プログラム定義型に対してこの変数テンプレートを特殊化してよいという規範的な許可が明記された
