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
| `round_to_nearest`          | 最も近い表現可能な値に丸められる |
| `round_toward_infinity`     | �の無限表現に向かって丸められる |
| `round_toward_neg_infinity` | 負の無限表現に向かって丸められる |


