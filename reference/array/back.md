#back (C++11)
* array[meta header]
* std[meta namespace]
* array[meta class]

```cpp
reference back();                       // (1)
const_reference back() const;           // (2) C++11
constexpr const_reference back() const; // (2) C++14
```

##概要
最後尾要素を参照する。


##戻り値
`a.back()`は末尾の要素への参照を返す。もし、`a`が`const`だった場合には、末尾の要素への`const`参照を返す。`a.back()` は`{ auto tmp = a.end(); --tmp; return *tmp; }` と同じ結果になる。

##備考
要素数が0の場合(`N == 0`の場合)、この関数呼び出しの効果は未定義である。


##例
```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {3, 1, 4};
  const std::array<int, 3>& car = ar;

  int& a = ar.back();
  const int& b = car.back();

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```
* back[color ff0000]


###出力
```
4
4
```

##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0


##参照
- [N3470 Constexpr Library Additions: containers, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3470.html)

