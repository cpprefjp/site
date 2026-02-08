# is-layout-right-padded-mapping-of
* [meta exposition-only]
* mdspan[meta header]
* variable[meta id-type]
* cpp26[meta cpp]

```cpp
template<class Mapping>
constexpr bool is-layout-right-padded-mapping-of = see below;  // exposition only
```


## 概要
`is-layout-right-padded-mapping-of`は、[`layout_right_padded<S>::mapping`](layout_right_padded/mapping.md)を判定する説明専用変数テンプレートである。

`size_t`型の任意の値`S`として`Mapping`が[`layout_right_padded<S>::mapping`](layout_right_padded/mapping.md)の特殊化であるときに限り、`is-layout-right-padded-mapping-of<Mapping>`は`true`となる。


## バージョン
### 言語
- C++26


## 参照
- [P2642R6 Padded mdspan layouts](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2642r6.pdf)
