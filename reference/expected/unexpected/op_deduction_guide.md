# 推論補助
* expected[meta header]
* std[meta namespace]
* unexpected[meta class]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class E>
  unexpected(E) -> unexpected<E>;
}
```

## 概要
`std::unexpected`クラステンプレートの型推論補助。


## 例
```cpp example
#include <cassert>
#include <concepts>
#include <expected>

int main()
{
  std::unexpected x{1};
  assert(x.error() == 1);
  static_assert(std::same_as<decltype(x), std::unexpected<int>>);
}
```
* error()[link error.md]
* std::unexpected[link ../unexpected.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
