# float_denorm_style
* limits[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp23deprecated[meta cpp]

```cpp
namespace std {
  enum float_denorm_style {
    denorm_indeterminate = -1,
    denorm_absent = 0,
    denorm_present = 1
  };
}
```

この型を返すメンバ変数がC++23にて非推奨化されるため、列挙型も非推奨とされる。非推奨の詳細は[`std::numeric_limits::has_denorm`](numeric_limits/has_denorm.md)を参照。


## 概要
`std::float_denorm_style`列挙型は、非正規化数(Denormal Number)のサポートに関する情報のための列挙値を提供する。

| 列挙値                 | 説明                                       |
|------------------------|--------------------------------------------|
| `denorm_indeterminate` | 値型が非正規化数を許可するかを判定できない |
| `denorm_absent`        | 値型が非正規化数を許可しない               |
| `denorm_present`       | 値型が非正規化数を許可する                 |


## 参照
- [P2614R2 Deprecate `numeric_limits::has_denorm`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2614r2.pdf)
