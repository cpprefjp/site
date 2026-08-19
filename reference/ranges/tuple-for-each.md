# tuple-for-each
* [meta exposition-only]
* ranges[meta header]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class F, class Tuple>
  constexpr void tuple-for-each(F&& f, Tuple&& t) {
    apply([&]<class... Ts>(Ts&&... elements) {
      (static_cast<void>(invoke(f, std::forward<Ts>(elements))), ...);
    }, std::forward<Tuple>(t));
  }
}
```

## 概要

`tuple-for-each` は、[`tuple`](/reference/tuple/tuple.md)の各要素に対して関数を適用する説明専用の関数テンプレートである。

## バージョン
### 言語
- C++23

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
- [LWG Issue 3755. *tuple-for-each* can call user-defined `operator,`](https://cplusplus.github.io/LWG/issue3755)
    - C++23で、`invoke`の呼び出しを`static_cast<void>(...)`で包み、ユーザー定義の`operator,`が呼ばれないよう修正された
