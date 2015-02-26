#make_tuple (C++11)
* tuple[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class... Types>
  tuple<VTypes ...> make_tuple(Types&&...);           // C++11

  template <class... Types>
  constexpr tuple<VTypes ...> make_tuple(Types&&...); // C++14
}
```

##概要
渡された可変個パラメータのコピーから`tuple`型のオブジェクトを構築する。


##戻り値
パラメータパックの値からなる`tuple`オブジェクト。


##例
```cpp
#include <tuple>
#include <string>
#include <functional> // ref, cref

int main()
{
  // 渡した値からtupleを構築
  std::tuple<int, char, const char*> t1 = std::make_tuple(1, 'a', "Hello");

  // tupleのコンストラクタによってconst char*をstd::stringに型変換
  std::tuple<int, char, std::string> t2 = std::make_tuple(1, 'a', "Hello");

  int a = 1;
  char b = 'b';
  std::string c = "hello";

  // 変数のコピーからtupleを構築
  std::tuple<int, char, std::string> t3 = std::make_tuple(a, b, c);

  // 変数の一部を参照と見なしてtupleを構築
  std::tuple<int, char&, const std::string&> t4 = std::make_tuple(a, std::ref(b), std::cref(c));
}
```
* make_tuple[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp) 9.0, 10.0


##参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)

