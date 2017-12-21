# remove_cvref
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  struct remove_cvref {
    using type = remove_cv_t<remove_reference_t<T>>;
  };

  template <class T>
  using remove_cvref_t = typename remove_cvref<T>::type;
}
```
* remove_cv_t[link remove_cv.md]
* remove_reference_t[link remove_reference.md]

## 概要
型の`const-volatile`修飾と参照を除去する。


## 効果
`remove_cvref`は、型`T`に含まれる最上位の`const-volatile`修飾と、左辺値参照、右辺値参照を除去した型を、メンバ型`type`として定義する。


## 例
```cpp example
#include <type_traits>

static_assert(std::is_same<
  std::remove_cvref<const int&>::type,
  int
>{});

static_assert(std::is_same<
  std::remove_cvref_t<volatile int&&>,
  int
>{});

int main() {}
```
* std::remove_cvref[color ff0000]
* std::remove_cvref_t[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang, C++20 mode](/implementation.md#clang): 6.0
- [GCC, C++20 mode](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0550R2 Transformation Trait `remove_cvref`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0550r2.pdf)
