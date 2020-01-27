# get
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <size_t I, class... Types>
  typename tuple_element<I, tuple<Types...> >::type&
    get(tuple<Types...>& t) noexcept;                        // (1) C++11

  template <size_t I, class... Types>
  constexpr tuple_element_t<I, tuple<Types...>>&
    get(tuple<Types...>&) noexcept;                          // (1) C++14

  template <size_t I, class... types>
  typename tuple_element<I, tuple<Types...> >::type&&
    get(tuple<Types...>&& t) noexcept;                       // (2) C++11

  template <size_t I, class... Types>
  constexpr tuple_element_t<I, tuple<Types...>>&&
    get(tuple<Types...>&&) noexcept;                         // (2) C++14

  template <size_t I, class... Types>
  typename tuple_element<I, tuple<Types...> >::type const&
    get(const tuple<Types...>& t) noexcept;                  // (3) C++11

  template <size_t I, class... Types>
  constexpr const tuple_element_t<I, tuple<Types...>>&
    get(const tuple<Types...>& t) noexcept;                  // (3) C++14

  template <size_t I, class... Types>
  constexpr const tuple_element_t<I, tuple<Types...> >&&
    get(const tuple<Types...>&& t) noexcept;                 // (4) C++17

  template <class T, class... Types>
  constexpr T& get(tuple<Types...>& t) noexcept;             // (5) C++14

  template <class T, class... Types>
  constexpr T&& get(tuple<Types...>&& t) noexcept;           // (6) C++14

  template <class T, class... Types>
  constexpr const T& get(const tuple<Types...>& t) noexcept; // (7) C++14
}
```
* tuple_element[link ../tuple_element.md]
* tuple_element_t[link ../tuple_element.md]
* tuple[link ../tuple.md]
* size_t[link /reference/cstddef/size_t.md]

## 概要
`tuple`オブジェクトから指定した位置の要素を取得する。


## 要件
- (1), (2), (3), (4) : テンプレートパラメータ`I`が`tuple`の要素数よりも小さいこと。この要件を満たさない場合は、コンパイルエラーとなる。
- (5), (6), (7) : 型`T`が`Types...`の�にひとつだけ含まれること。この要件を満たさない場合は、コンパイルエラーとなる。


## 戻り値
- (1), (2), (3), (4) : `tuple`オブジェクト`t`の`I`番目の要素への参照
- (5), (6), (7) : `tuple`オブジェクト`t`に含まれる`T`型の要素への参照


## 例外
投げない


## 備考
- この関数がメンバ関数ではなく非メンバ関数として定義されているのは、ユーザーにtemplate限定�を指定させるのを避けるためである。メンバ関数にした場合、テンプレート内でその関数を使用すると、`t.template get<I>()`のようにtemplate�ーワードをユーザーが指定しなければならない


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, char, std::string> t(1, 'a', "hello");

  // 位置を指定して取得する方法。(1)〜(4)
  {
    int& i = std::get<0>(t);
    char& c = std::get<1>(t);
    std::string& s = std::get<2>(t);

    std::cout << i << std::endl;
    std::cout << c << std::endl;
    std::cout << s << std::endl;
  }
  std::cout << std::endl;

  // 型を指定して取得する方法。(5)〜(7)
  {
    int& i = std::get<int>(t);
    char& c = std::get<char>(t);
    std::string& s = std::get<std::string>(t);

    std::cout << i << std::endl;
    std::cout << c << std::endl;
    std::cout << s << std::endl;
  }
}
```
* std::get[color ff0000]

#### 出力
```
1
a
hello

1
a
hello
```

### const右辺値参照版が必要な状況 (4)
```cpp example
#include <iostream>
#include <tuple>
#include <string>

const std::tuple<int, std::string, double> f()
{
  return {1, "Hello", 3.14};
}

int main()
{
  // f()の戻り値型がconst tuple&&となるので、
  // tuple&&をとるオーバー�ードでは受け取れない
  std::string s = std::get<1>(f());

  std::cout << s << std::endl;
}
```
* std::get[color ff0000]

#### 出力
```
Hello
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`get - std::pair`](/reference/utility/pair/get.md)
- [`get - std::array`](/reference/array/array/get.md)


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [N3887 Consistent Metafunction Aliases](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3887.pdf)
- [N3670 Wording for Addressing Tuples by Type: Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3670.html)
- [LWG Issue 2485. `get()` should be overloaded for `const tuple&&`](https://wg21.cmeerw.net/lwg/issue2485)
    - C++17で`const tuple&&`をとるオーバー�ードが追加された。このようなオーバー�ードはほかでは用意していないが、`tuple`は基本的(fundamental)な型であるために用意された
