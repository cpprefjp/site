# variant_npos
* variant[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  inline constexpr std::size_t variant_npos = -1;
}
```

## 概要
`variant_npos`は、候補型の無効なインデックス値を表す定数である。

[`std::variant`](variant.md)クラスは、0番目の候補型でデフォルト構築するため、通常の操作ではどの型も代入されない状態にはならない。ただし、[`valueless_by_exception()`](variant/valueless_by_exception.md)メンバ関数が`true`を返す例外的な状況ではどの型も代入されていない状態になる。

そのような状況で、[`index()`](variant/index.md)メンバ関数がこの値を返すようになる。


## 例
```cpp example
#include <iostream>
#include <variant>

struct S { operator int() { throw 42; }};

int main()
{
  std::variant<float, int> v = 12.f;
  try {
    v.emplace<1>(S());
  }
  catch (...) {}

  if (v.index() == std::variant_npos) {
    std::cout << "empty" << std::endl;
  }
  else {
    std::cout << "not empty" << std::endl;
  }
}
```
* std::variant_npos[color ff0000]
* v.emplace[link variant/emplace.md]
* v.index()[link variant/index.md]

### 出力
```
empty
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
