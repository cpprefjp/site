# alignment_of
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct alignment_of {
    static constexpr std::size_t value = …;
  };

  template <class T>
  constexpr std::size_t alignment_of_v = alignment_of<T>::value; // C++17
}
```

## 概要
型`T`のアライメントを取得する。


## 要件
型`T`に対して`alignof(T)`が有効であること。


## 効果
`alignof(T)`で得られた[`std::size_t`](/reference/cstddef/size_t.md)型の値を、メンバ定数`value`として定義する。


## 例
```cpp example
#include <type_traits>
#include <iostream>

int main()
{
  constexpr std::size_t n = std::alignment_of<int>::value;
  std::cout << n << std::endl;
}
```
* std::alignment_of[color ff0000]

### 出力例
```
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.4
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0, 12.0, 14.0


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
