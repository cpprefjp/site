#get
```cpp
namespace std {
  template<size_t I, class T1, class T2>
  typename tuple_element<I, pair<T1, T2>>::type&
      get(pair<T1, T2>& x) noexcept;

  template<size_t I, class T1, class T2>
  typename tuple_element<I, pair<T1, T2>>::type&&
      get(pair<T1, T2>&& x) noexcept;

  template<size_t I, class T1, class T2>
  const typename tuple_element<I, pair<T1, T2>>::type&
      get(const pair<T1, T2>& x) noexcept;
}
```
* tuple_element[link /reference/utility/tuple_element.md]
* pair[link /reference/utility/pair.md]

##概要
タプルと見なせる型から指定した位置の要素を取得する。

`<utility>`ヘッダでは、[`pair`](/reference/utility/pair.md)に関するオーバーロードを提供する。


##要件
テンプレートパラメータIが、[`pair`](/reference/utility/pair.md)の要素数よりも小さいこと。

この要件を満たさない場合はコンパイルエラーとなる。


##戻り値
[`pair`](/reference/utility/pair.md)の`I`番目の要素


##例外
投げない


##例
```cpp
#include <iostream>
#include <utility>

int main()
{
  std::pair<int, char> p(1, 'a');

  int& i = std::get<0>(p);
  char& c = std::get<1>(p);

  std::cout << i << std::endl;
  std::cout << c << std::endl;
}
```
* get[color ff0000]

###出力
```
1
a
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
- [`get - <tuple>`](/reference/tuple/tuple/get.md)


