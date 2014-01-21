#common_type(C++11)
```cpp
namespace std {
  template <class... Types>
  struct common_type {
    typedef … type;
  };
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

##実装例
```cpp
template <class ...T>
struct common_type;

template <class T>
struct common_type<T> {
  typedef T type;
};

template <class T, class U>
struct common_type<T, U> {
private:
  static T&& t();
  static U&& u();
public:
  typedef decltype(true ? t() : u()) type;
};

template <class T, class U, class ...V>
struct common_type<T, U, V...> {
  typedef typename common_type<typename common_type<T, U>::type, V...>::type type;
};
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 3.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.4.7
- [Visual C++](/implementation#visual_cpp.md): ??


