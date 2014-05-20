#forward_as_tuple (C++11)
```cpp
namespace {
  template <class... Types>
  tuple<Types&&...> forward_as_tuple(Types&&...) noexcept;           // C++11

  template <class... Types>
  constexpr tuple<Types&&...> forward_as_tuple(Types&&...) noexcept; // C++14
}
```

##概要
パラメータの元の型からなる`tuple`を生成する。左辺値参照型は左辺値参照型として、右辺値は右辺値参照として転送される。


##戻り値

パラメータの元の型からなる`tuple`オブジェクト


##例外
投げない


##例
```cpp
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  // 一時オブジェクトからは右辺値参照のtupleが作られる
  std::tuple<int&&, char&&, std::string&&> t1 = std::forward_as_tuple(1, 'a', std::string("Hello"));

  // 左辺値からは左辺値参照のtupleが作られる
  int a = 1;
  char b = 'a';
  std::string c = "Hello";
  std::tuple<int&, char&, std::string&> t2 = std::forward_as_tuple(a, b, c);
}
```
* forward_as_tuple[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 


##注意事項
`forward_as_tuple`は、ドラフト仕様の段階で`pack_arguments`という名前で一時期表記されていた。 
コンパイラのバージョンによっては、この名前での実装もありえる。

##参照
- [LWG2275 - Why is forward_as_tuple not constexpr?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2275)
