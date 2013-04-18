#forward_as_tuple
```cpp
namespace {

  template <class... Types>
  tuple<Types&&...> forward_as_tuple(Types&&...) noexcept;
}
```
* tuple[link /reference/tuple/tuple.md]

##概要

<b>パラメータの元の型からなる`tuple`を生成する。左辺値参照型は左辺値参照型として、右辺値は右辺値参照として転送される。</b>


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
* forward_as_tuple[color ff0000]

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 



##注意事項

forward_as_tupleは、ドラフト段階でpack_argumentsという名前で一時期表記されていた。

コンパイラのバージョンによっては、この名前での実装もありえる。

