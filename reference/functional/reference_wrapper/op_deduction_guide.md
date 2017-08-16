# 推論補助
* functional[meta header]
* std[meta namespace]
* reference_wrapper[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  reference_wrapper(reference_wrapper<T>) -> reference_wrapper<T>;
}
```

## 概要
`std::reference_wrapper`クラステンプレートの型推論補助。


## 備考
- この推論補助は、`T&`を受け取るコンストラクタが、コピーコンストラクタと曖昧になってしまわないためにある


## 例
```cpp
#include <functional>
#include <type_traits>

int main()
{
  int x = 3;
  std::reference_wrapper<int> r {x};

  std::reference_wrapper r2 {r};
  static_assert(std::is_same_v<
    decltype(r2),
    std::reference_wrapper<int>
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
- [Clang, C++17 mode](/implementation.md#clang): 5.0
- [GCC, C++17 mode](/implementation.md#gcc): 7.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

