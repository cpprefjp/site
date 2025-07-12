# swappable
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept swappable = requires(T& a, T& b) { ranges::swap(a, b); };

  template<class T, class U>
  concept swappable_with =
    common_reference_with<T, U> &&
    requires(T&& t, U&& u) {
      ranges::swap(std::forward<T>(t), std::forward<T>(t));
      ranges::swap(std::forward<U>(u), std::forward<U>(u));
      ranges::swap(std::forward<T>(t), std::forward<U>(u));
      ranges::swap(std::forward<U>(u), std::forward<T>(t));
    };
}
```
* swap[link /reference/concepts/swap.md]

## 概要

`swappable`及び`swappable_with`は、指定された型`T`もしくは`T, U`のオブジェクト間で、その値の交換操作（`swap`操作）が可能であることを表すコンセプトである。

## 例

### swappable

```cpp example
#include <iostream>
#include <concepts>

template<typename T>
requires std::swappable<T>
void f(const char* name) {
  std::cout << name << " is swappable" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not swappable" << std::endl;
}

namespace NS {
  struct swappable1 {
    int n = 0;
    
    swappable1(int m) : n(m) {}
    
    swappable1(swappable1&&) = delete;
  };
  
  // 非メンバ関数として定義
  void swap(swappable1& lhs, swappable1& rhs) {
    std::swap(lhs.n, rhs.n);
  }


  struct swappable2 {
    double d = 0.0;

    swappable2(double v) : d(v) {}

    swappable2(swappable2&&) = delete;

    // Hidden friendsな関数として定義
    friend void swap(swappable2& lhs, swappable2& rhs) {
      std::swap(lhs.d, rhs.d);
    }
  };
}

struct not_swappable {
  not_swappable(not_swappable&&) = delete;
  not_swappable& operator==(not_swappable&&) = delete;
};

int main() {
  f<int>("int");
  f<int&&>("int&&");
  f<NS::swappable1>("NS::swappable1");
  f<NS::swappable2>("NS::swappable2");
  f<int[5]>("int[5]");

  std::cout << "\n";

  f<const int>("const int");
  f<not_swappable>("not_swappable");
}
```
* std::swappable[color ff0000]

#### 出力
```
int is swappable
int&& is swappable
NS::swappable1 is swappable
NS::swappable2 is swappable
int[5] is swappable

const int is not swappable
not_swappable is not swappable
```

### swappable_with

```cpp
#include <iostream>
#include <concepts>

template<typename T, typename U>
requires std::swappable_with<T, U>
void f(const char* name, const char* name2) {
  std::cout << name << " is swappable with " << name2 << std::endl;
}

template<typename T, typename U>
void f(const char* name, const char* name2) {
  std::cout << name << " is not swappable with " << name2 << std::endl;
}

namespace NS {

  struct S1 {
    std::size_t n = 0;

    operator std::size_t() const {
      return this->n;
    }

    //swappable_withであるためには、自身がswappableである必要がある
    friend void swap(S1& a, S1& b) {
      std::swap(a.n, b.n);
    }
  };

  struct S2 {
    std::size_t s = 0;

    operator std::size_t() const {
      return this->s;
    }
 
    //swappable_withであるためには、自身がswappableである必要がある
    friend void swap(S2& a, S2& b) {
      std::swap(a.s, b.s);
    }
  };

  void swap(S1& s1, S2& s2) {
    std::swap(s1.n, s2.s);
  }

  //引数順を逆にしたものも必要
  void swap(S2& s2, S1& s1) {
    swap(s1, s2);
  }
}

//std::common_referenceおよびstd::common_reference_withにアダプトする
namespace std {
  template<template<class> class TQual, template<class> class UQual>
  struct basic_common_reference<NS::S1, NS::S2, TQual, UQual> {
    using type = const std::size_t&;
  };

  //対称性のために引数順を逆にしたものも定義する
  template<template<class> class TQual, template<class> class UQual>
  struct basic_common_reference<NS::S2, NS::S1, TQual, UQual> {
    using type = const std::size_t&;
  };
}

int main() {
  f<NS::S1&, NS::S2&>("NS::S1&", "NS::S2&");
  f<NS::S2&, NS::S1&>("NS::S2&", "NS::S1&");

  //右辺値参照バージョンを用意してないので、参照修飾なしだとswappable_withとならない
  f<NS::S1, NS::S2>("NS::S1", "NS::S2");
  f<NS::S2, NS::S1>("NS::S2", "NS::S1");
}
```
* std::swappable_with[color ff0000]
* basic_common_reference[link /reference/type_traits/basic_common_reference.md]

#### 出力
```
NS::S1& is swappable with NS::S2&
NS::S2& is swappable with NS::S1&
NS::S1 is not swappable with NS::S2
NS::S2 is not swappable with NS::S1
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [`std::ranges::swap()`](/reference/concepts/swap.md)
- [`std::swap()`](/reference/utility/swap.md)


## 参照
- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [LWG Issue 3175. The `CommonReference` requirement of concept `SwappableWith` is not satisfied in the example](https://wg21.cmeerw.net/lwg/issue3175)
