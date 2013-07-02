#get(C++11)
```cpp
namespace std {
  template <size_t I, class... Types>
  typename tuple_element<I, tuple<Types...> >::type& get(tuple<Types...>& t) noexcept;

  template <size_t I, class... types>
  typename tuple_element<I, tuple<Types...> >::type&& get(tuple<Types...>&& t) noexcept;

  template <size_t I, class... Types>
  typename tuple_element<I, tuple<Types...> >::type const& get(const tuple<Types...>& t) noexcept;
}
```
* tuple_element[link ../tuple_element.md]
* tuple[link ../tuple.md]

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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
