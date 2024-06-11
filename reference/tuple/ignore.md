# ignore
* tuple[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  const unspecified ignore;            // C++11
  inline constexpr unspecified ignore; // C++17
}
```
* unspecified[italic]

## 概要
`ignore`は、[`tie()`](tie.md)を使用してタプルから値を抽出する際に、「不要な値」をマーキングするためのプレースホルダーである。

使用例は[`tie()`](tie.md)を参照。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 2008 [mark verified], 2010 [mark verified]


## 関連項目
- [`std::make_tuple`](make_tuple.md)
- [`std::forward_as_tuple`](forward_as_tuple.md)
- [`std::tie`](tie.md)

