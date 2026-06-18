# operator value_type
* utility[meta header]
* std[meta namespace]
* constant_wrapper[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  constexpr operator value_type() const noexcept;
}
```

## 概要
保持する値`value`への暗黙の変換をおこなう。これにより、`constant_wrapper`を通常の値として扱える。

## 戻り値
`value`を返す。

## 例
```cpp example
#include <utility>

int main()
{
  // 変換演算子により、constant_wrapperを通常の値として使用できる
  int n = std::cw<42>;
  static_assert(std::cw<42> == 42);
}
```

### 出力
```

```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::constant_wrapper`](../constant_wrapper.md)


## 参照
- [P2781R9 `std::constant_wrapper`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2781r9.html)
- [P3978R3 `constant_wrapper` should unwrap on call and subscript](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3978r3.pdf)
