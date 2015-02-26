#get (C++11)
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]

```cpp
namespace std {
  template <size_t I, class... Types>
  typename tuple_element<I, tuple<Types...> >::type&
    get(tuple<Types...>& t) noexcept;                      // (1) C++11

  template <size_t I, class... Types>
  constexpr tuple_element_t<I, tuple<Types...>>&
    get(tuple<Types...>&) noexcept;                        // (1) C++14

  template <size_t I, class... types>
  typename tuple_element<I, tuple<Types...> >::type&&
    get(tuple<Types...>&& t) noexcept;                     // (2) C++11

  template <size_t I, class... Types>
  constexpr tuple_element_t<I, tuple<Types...>>&&
    get(tuple<Types...>&&) noexcept;                       // (2) C++14

  template <size_t I, class... Types>
  typename tuple_element<I, tuple<Types...> >::type const&
    get(const tuple<Types...>& t) noexcept;                // (3) C++11

  template <size_t I, class... Types>
  constexpr const tuple_element_t<I, tuple<Types...>>&
    get(const tuple<Types...>&) noexcept;                  // (3) C++14
}
```
* tuple_element[link ../tuple_element.md]
* tuple_element_t[link ../tuple_element.md]
* tuple[link ../tuple.md]
* size_t[link /reference/cstddef/size_t.md]

##概要
`tuple`オブジェクトから指定した位置の要素を取得する。


##要件
テンプレートパラメータ`I`が`tuple`の要素数よりも小さいこと。
この要件を満たさない場合はコンパイルエラーとなる。


##戻り値
`tuple`オブジェクトの`I`番目の要素への参照


##例外
投げない


##例
```cpp
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, char, std::string> t(1, 'a', "hello");

  int& i = std::get<0>(t);
  char& c = std::get<1>(t);
  std::string& s = std::get<2>(t);

  std::cout << i << std::endl;
  std::cout << c << std::endl;
  std::cout << s << std::endl;
}
```
* get[color ff0000]

###出力
```
1
a
hello
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [N3887 Consistent Metafunction Aliases](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3887.pdf)

