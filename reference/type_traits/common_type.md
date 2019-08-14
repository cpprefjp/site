# common_type
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class... Types>
  struct common_type {
    using type = …;
  };

  template <class... T>
  using common_type_t = typename common_type<T...>::type; // C++14
}
```

## 概要
変換可能な共通の型を取得する。


## 要件
`Types...`の全ての型は完全型であるか、`const/volatile`修飾された(あるいはされていない)`void`でなければならない。


## 効果
`common_type`は、`Types...`に含まれる全ての型が暗黙変換可能な型を、メンバ型`type`として定義する。

## 特殊化
`common_type`は以下の条件を満たす場合に、2引数のもの（`common_type<T1, T2>`）に限ってユーザー定義の特殊化が許可されている。

- `T1, T2`に対する[`std::decay`](/reference/type_traits/decay.md)の適用はともに恒等写像となる、すなわち
	- `T1, T2`はともに配列型ではなく
	- `T1, T2`はともに関数型でもなく
	- `T1, T2`はともに参照型でもなく
	- `T1, T2`はともにCV修飾もされていない

そして、そのような特殊化は必ずしもメンバ型`::type`を持たなくても構わない。  
もし`::type`を定義する場合は`public`にただ一つだけ定義し、その型は`T1, T2`から明示的に変換可能であり、かつCV修飾されておらず参照型でもない型である必要がある。

これらの規則に違反した特殊化を定義したとしてもコンパイルエラーにはならず、未定義動作となる。

なお、`common_type`以外の[`<type_traits>`](/reference/type_traits.md)内テンプレートに対するユーザー定義の特殊化は許可されていない。

## 例
```cpp example
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
* std::common_type[color ff0000]

### 出力
```
2
```

## 定義(C++11)
```cpp
template <class ...T>
struct common_type;

template <class T>
struct common_type<T> {
  using type = T;
};

template <class T, class U>
struct common_type<T, U> {
  using type = decltype(true ? declval<T>() : declval<U>());
};

template <class T, class U, class... V>
struct common_type<T, U, V...> {
  using type = typename common_type<typename common_type<T, U>::type, V...>::type;
};
```
* declval[link /reference/utility/declval.md]


## 定義(C++14)
```cpp
template <class ...T>
struct common_type;

template <class... T>
using common_type_t = typename common_type<T...>::type;

template <class T>
struct common_type<T> {
  using type = decay_t<T>;
};

template <class T, class U>
struct common_type<T, U> {
  using type = decay_t<decltype(true ? declval<T>() : declval<U>())>;
};

template <class T, class U, class... V>
struct common_type<T, U, V...> {
  using type = common_type_t<common_type_t<T, U>, V...>;
};
```
* decay_t[link decay.md]
* declval[link /reference/utility/declval.md]

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015
	- 2012までは、可変引数テンプレートに対応していないため、不完全な実装である。
	- `common_type_t`は、2013から。


## 参照
- [N2661 A Foundation to Sleep On](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2661.htm)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
- [LWG Issue 2141. `common_type` trait produces reference types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2141)
    - C++11では、`common_type`の結果が参照型になる場合があった。C++14で`decay_t`を通すことにしたことにより、参照型が返されることがなくなった。

