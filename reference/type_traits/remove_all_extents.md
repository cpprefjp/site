#remove_all_extents
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  struct remove_all_extents {
    typedef … type;
  };

  template <class T>
  using remove_all_extents_t = typename remove_all_extents<T>::type; // C++14
}
```

##概要
配列型`T`から全ての次元を除去する。


##効果
`remove_all_extents`は、型`T`が、何らかの型`U`の多次元配列型である場合は`U`型を、そうでなければ型`T`をメンバ型`type`として定義する。


##例
```cpp
#include <type_traits>

static_assert(std::is_same<
        std::remove_all_extents<int>::type,
        int
    >::value,
    "transform int to int");

static_assert(std::is_same<
        std::remove_all_extents<const int[2]>::type,
        const int
    >::value,
    "transform const int[2] to const int");

static_assert(std::is_same<
        std::remove_all_extents<int[2][4]>::type,
        int
    >::value,
    "transform int[2][4] to int");

static_assert(std::is_same<
        std::remove_all_extents<int[][2]>::type,
        int
    >::value,
    "transform int[][2] to int");

int main() {}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)

