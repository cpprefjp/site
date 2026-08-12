# float_round_style
* limits[meta header]
* std[meta namespace]
* enum[meta id-type]

```cpp
namespace std {
  enum float_round_style {
    round_indeterminate = -1,
    round_toward_zero = 0,
    round_to_nearest = 1,
    round_toward_infinity = 2,
    round_toward_neg_infinity = 3
  };
}
```

`std::float_round_style`列挙型は、浮動小数点数の丸めのスタイルに関する列挙値を提供する。

| 列挙値                      | 説明                             |
|-----------------------------|----------------------------------|
| `round_indeterminate`       | 丸めスタイルが確定しない         |
| `round_toward_zero`         | 0に向かって丸められる            |
| `round_to_nearest`          | 最も近い表現可能な値に丸められる。同じ距離の表現可能な値が2つある場合は、最下位桁が偶数である方が選ばれる（最近接偶数への丸め） |
| `round_toward_infinity`     | 正の無限表現に向かって丸められる |
| `round_toward_neg_infinity` | 負の無限表現に向かって丸められる |


## 参照
- [LWG Issue 4474. `round_to_nearest` rounding mode is unclear](https://cplusplus.github.io/LWG/issue4474)
    - C++26で、`round_to_nearest`について同距離の値が2つある場合は最下位桁が偶数の方を選ぶ（最近接偶数への丸め、ties to even）ことが明確化された。C23の`FLT_ROUNDS`の値`1`（最近接偶数への丸め）の定義と整合させるもの
