#common_type
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class... Types>
  struct common_type {
    typedef … type;
  };

  template <class... T>
  using common_type_t = typename common_type<T...>::type; // C++14
}
```

##概要
変換可能な共通の型を取得する。


##要件
`Types...`の全ての型は完全型であるか、`const/volatile`修飾された(あるいはされていない)`void`でなければならない。


##効果
`common_type`は、`Types...`に含まれる全ての型が暗黙変換可能な型を、メンバ型`type`として定義する。  


##例
```cpp
#include <iostream>
#include <type_traits>

// 2つの値どちらが小さいかを返すアルゴリズム
// 型Tと型Uの共通の型を戻り値型にする
template <class T, class U>
typename std::common_type<T, U>::type
  generic_min(T t, U u)
{
  return t < u ? t : u;
}

int main()
{
  auto x = generic_min(3L, 2);

  static_assert(
    std::is_same<decltype(x), long>::value == true,
    "type of x is long");

  std::cout << x << std::endl;
}
```

###出力
```
2
```

##定義(C++11)
```cpp
template <class ...T>
struct common_type;

template <class T>
struct common_type<T> {
  typedef T type;
};

template <class T, class U>
struct common_type<T, U> {
  typedef decltype(true ? declval<T>() : declval<U>()) type;
};

template <class T, class U, class... V>
struct common_type<T, U, V...> {
  typedef typename common_type<typename common_type<T, U>::type, V...>::type type;
};
```
* declval[link /reference/utility/declval.md]


##定義(C++14)
```cpp
template <class ...T>
struct common_type;

template <class... T>
using common_type_t = typename common_type<T...>::type;

template <class T>
struct common_type<T> {
  typedef decay_t<T> type;
};

template <class T, class U>
struct common_type<T, U> {
  typedef decay_t<decltype(true ? declval<T>() : declval<U>())> type;
};

template <class T, class U, class... V>
struct common_type<T, U, V...> {
  typedef common_type_t<common_type_t<T, U>, V...> type;
};
```
* decay_t[link ./decay.md]
* declval[link /reference/utility/declval.md]

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [N2661 A Foundation to Sleep On](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2661.htm)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
- [LWG Issue 2141. `common_type` trait produces reference types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2141)
    - C++11では、`common_type`の結果が参照型になる場合があった。C++14で`decay_t`を通すことにしたことにより、参照型が返されることがなくなった。

