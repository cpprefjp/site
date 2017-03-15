# float_denorm_style
* limits[meta header]
* std[meta namespace]
* enum[meta id-type]

```cpp
namespace std {
  enum float_denorm_style {
    denorm_indeterminate = -1,
    denorm_absent = 0,
    denorm_present = 1
  };
}
```

`std::float_denorm_style`列挙型は、非正規化数(Denormal Number)のサポートに関する情報のための列挙値を提供する。

| 列挙値                 | 説明                                       |
|------------------------|--------------------------------------------|
| `denorm_indeterminate` | 値型が非正規化数を許可するかを判定できない |
| `denorm_absent`        | 値型が非正規化数を許可しない               |
| `denorm_present`       | 値型が非正規化数を許可する                 |


