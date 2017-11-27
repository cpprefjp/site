# extent
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, unsigned int I = 0>
  struct extent {
    static constexpr std::size_t value = …;
  };

  template <class T, unsigned I = 0>
  constexpr std::size_t extent_v = extent<T, I>::value; // C++17
}
```

## 概要
配列型の`I`番目の次元の要素数を取得する。


## 効果
- 型`T`が配列型であり、配列の次元数が`I`より大きい場合、`I`次元目の要素数をメンバ定数`value`として定義する。
- 型`T`が配列型ではない、もしくは配列の次元数が`I`以下の場合、値`0`をメンバ定数`value`として定義する。


## 例
```cpp example
#include <type_traits>

static_assert(std::extent<int[3][2], 0>::value == 3, "0th element count is 3");
static_assert(std::extent<int[3][2], 1>::value == 2, "1th element count is 2");

static_assert(std::extent<int[3][2], 2>::value == 0, "out of range");
static_assert(std::extent<int>::value == 0, "int isn't array type");

int main() {}
```
* std::extent[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
