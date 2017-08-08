# 推論補助
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template<class T>
  weak_ptr(shared_ptr<T>) -> weak_ptr<T>;
}
```
* shared_ptr[link /reference/memory/shared_ptr.md]

## 概要
[`std::shared_ptr`](/reference/memory/shared_ptr.md)から`std::weak_ptr`に変換する際の、クラステンプレートの型推論補助。


## 例
```cpp
#include <memory>
#include <type_traits>

int main()
{
  std::shared_ptr<int> sp {new int(3)};
  std::weak_ptr wp = sp;
  static_assert(std::is_same_v<
    decltype(wp),
    std::weak_ptr<int>
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

