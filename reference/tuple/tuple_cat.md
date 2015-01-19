#tuple_cat (C++11)
```cpp
namespace std {
  template <class... Tuples>
  tuple<Ctypes ...> tuple_cat(Tuples&&...);           // C++11

  template <class... Tuples>
  constexpr tuple<Ctypes ...> tuple_cat(Tuples&&...); // C++14
}
```

##概要
複数の[`tuple`](../tuple.md)を繋ぎ合わせ、1つの[`tuple`](../tuple.md)にする。


##要件
- `Tuples...`の全ての型が`std::tuple<Args...>`であること。
- `Args...`の各型が左辺値参照であればコピー構築可能、そうでなければムーブ構築可能であること。


##戻り値
`Tuples...`の全ての`tuple`型の要素型全てを取り出し、`std::`[`forward`](/reference/utility/forward.md)`<T>(x)`して構築される1つの`tuple`オブジェクト。


##備考
実装によっては、`Tuples...` パラメータパックに含めることのできる型として、他のタプルライクな型（[`pair`](/reference/utility/pair.md)や[`array`](/reference/array.md)のような）を追加的にサポートする可能性がある。


##例
```cpp
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, std::string> t1(1, "Hello");
  std::tuple<char, double> t2('a', 3.14);
  std::tuple<std::string> t3("World");

  // 3つのtupleを繋ぎ合わせる
  std::tuple<int, std::string, char, double, std::string> result =
      std::tuple_cat(t1, t2, t3);

  std::cout << std::get<0>(result) << std::endl;
  std::cout << std::get<1>(result) << std::endl;
  std::cout << std::get<2>(result) << std::endl;
  std::cout << std::get<3>(result) << std::endl;
  std::cout << std::get<4>(result) << std::endl;
}
```
* tuple_cat[color ff0000]

###出力
```
1
Hello
a
3.14
World
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

