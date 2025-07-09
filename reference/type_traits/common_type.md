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
`Types...`の全ての型は完全型であるか、`const/volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型でなければならない。


## 効果
`common_type`は、`Types...`に含まれる全ての型が暗黙変換可能な型を、メンバ型`type`として定義する。

より詳細には、次のように決定される。ただし、C++11では[`decay`](/reference/type_traits/decay.md)を適用するプロセスが、C++14では下記`N == 2`の時のプロセスが、C++17では`N == 2`のとき`COND-RES`を適用するプロセスが、それぞれ行われない。

`N = sizeof...(Types)`として

- `N == 0` : メンバ型`type`は定義されない。

- `N == 1` : `Types...`内の唯一の型を`T`とすると、`type = common_type_t<T, T>;`のように`type`を定義。
- `N == 2` : `Types...`の1, 2番目の型を`T1, T2`、`D1 = decay_t<T1>, D2 = decay_t<T2>`として
	- `T1,T2`に対する`decay`適用が少なくとも片方が恒等写像とならない（`is_same_v<T1, D1> == false || is_same_v<T2, D2> == false`となる）場合、`type = common_type_t<D1, D2>;`
	- `common_type<T1, T2>`に対するユーザ定義の特殊化が行われていれば、同特殊化を利用する。
	- `C = decay_t<decltype(false ? declval<D1>() : declval<D2>())>`が有効な型ならば、`type = C;`
	- `COND-RES(CREF(D1), CREF(D2))`が有効な型ならば、`type = decay_t<COND-RES(CREF(D1), CREF(D2))>;`
	- そうでなければ、メンバ型`type`は定義されない。
- `N >= 3` : `Types...`の１、2番目の型を`T1, T2`、残りのパラメータパックを`P...`とすると、`type = common_type_t<common_type_t<T1, T2>, P...>;`のように`type`を定義。
	- 先頭2つの型の共通型を求めて、その型と3番目の型の共通型を求めて、その型と4番目の...というように再帰的に`common_type`を適用していく。


2つの型`T1, T2`に対する[`decay`](/reference/type_traits/decay.md)の適用がともに恒等写像となるのは以下の場合である。

- `T1, T2`はともに配列型ではなく
- `T1, T2`はともに関数型でもなく
- `T1, T2`はともに参照型でもなく
- `T1, T2`はともにCV修飾もされていない


`COND-RES`や`CREF`はそれぞれ次のように定義される型を表す説明専用のものである。

- `CREF(X)`
    - `add_lvalue_reference_t<const remove_reference_t<A>>`
- `COND-REF(X, Y)`
    - `decltype(false ? declval<X(&)()>()() : declval<Y(&)()>()())`


## 特殊化
`common_type`は以下の条件を満たす場合に、2引数のもの（`common_type<T1, T2>`）に限ってユーザー定義の特殊化が許可されている。

- `T1, T2`の少なくとも片方はプログラム定義型に依存している
    - プログラム定義型とは、標準ライブラリの型を除いた、ユーザーによって定義された型のこと
        - 「プログラム定義型に依存している」とは例えば、プログラム定義型に対する`vector`等の特殊化のこと
- `T1, T2`に対する[`decay`](/reference/type_traits/decay.md)の適用はともに恒等写像となる（上記参照）

そして、そのような特殊化は必ずしもメンバ型`type`を持たなくても構わない。  
もし`type`を定義する場合は`public`にただ一つだけ定義し、その型は`T1, T2`から明示的に変換可能であり、かつCV修飾されておらず参照型でもない型である必要がある。  
そして、その特殊化は`T1,T2`の引数順を入れ替えても同じ結果を返す（対称性を持つ）必要がある。  
これらの規則に違反した特殊化を定義したとしてもコンパイルエラーにはならず、未定義動作を引き起こす。

このように定義されたユーザー定義の特殊化は、`common_type_t<T1, T2>`のように使用された時`T1, T2`がともにCV修飾もなく参照でもない場合は直接利用される。  
`T1, T2`のどちらかがCV修飾されているか参照である場合は、プライマリの`common_type`によって`decay`された上で利用される。

なお、`common_type, basic_common_reference`以外の[`<type_traits>`](/reference/type_traits.md)内テンプレートに対するユーザー定義の特殊化は許可されていない。

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

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- 2012までは、可変引数テンプレートに対応していないため、不完全な実装である。
	- `common_type_t`は、2013から。


## 参照
- [N2661 A Foundation to Sleep On](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2661.htm)
- [N3546 TransformationTraits Redux](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3546.pdf)
- [N3655 TransformationTraits Redux, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3655.pdf)
- [LWG Issue 2141. `common_type` trait produces reference types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2141)
    - C++11では、`common_type`の結果が参照型になる場合があった。C++14で`decay_t`を通すことにしたことにより、参照型が返されることがなくなった。
- [P0435R1 Resolving LWG Issues re common_type](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0435r1.pdf)
- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
    - C++20で`COND-RES`, `CREF`操作を利用するステップが追加された。
