# 推論補助
* utility[meta header]
* std[meta namespace]
* pair[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T1, class T2>
  pair(T1, T2) -> pair<T1, T2>;
}
```

## 概要
`std::pair`クラステンプレートの型推論補助。


## 備考
- パラメータの型が`const T1&...`や`T1&&...`ではなくコピーで受け取るようにしているため、[配列からポインタへの変換、関数から関数ポインタへの変換](/reference/type_traits/decay.md)が起こる
- [`std::make_pair()`](/reference/utility/make_pair.md)関数と違って、[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)`<T>`を`T&`に展開はしない


## 例
```cpp
#include <utility>
#include <type_traits>

int main()
{
  std::pair p {3, "Hello"};
  static_assert(std::is_same_v<
    decltype(p),
    std::pair<int, const char*>
  >);
}
```

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 7.1.0
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)
