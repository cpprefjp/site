# 推論補助
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
template <class T>
optional(T) -> optional<T>;
```

## 概要
`std::optional`クラステンプレートの型推論補助。有効値から推論する。


## 例
```cpp
#include <cassert>
#include <optional>
#include <type_traits>

int main()
{
  std::optional p1 = 3;
  assert(p1.value() == 3);
  static_assert(std::is_same_v<decltype(p1)::value_type, int>);

  // 配列の場合、配列からポインタへの変換が行われる
  std::optional p2 = "Hello";
  static_assert(std::is_same_v<decltype(p2)::value_type, const char*>);
}
```
* value()[link value.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
