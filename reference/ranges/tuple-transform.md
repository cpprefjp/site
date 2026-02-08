# tuple-transform
* [meta exposition-only]
* ranges[meta header]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class F, class Tuple>
  constexpr auto tuple-transform(F&& f, Tuple&& t) {
    return apply([&]<class... Ts>(Ts&&... elements) {
      return tuple<invoke_result_t<F&, Ts>...>(invoke(f, std::forward<Ts>(elements))...);
    }, std::forward<Tuple>(t));
  }
}
```

## 概要

`tuple-transform` は、[`tuple`](/reference/tuple/tuple.md)の各要素に対して関数を適用し、それらの結果を要素とする[`tuple`](/reference/tuple/tuple.md)を生成する説明専用の関数テンプレートである。

## バージョン
### 言語
- C++23

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
