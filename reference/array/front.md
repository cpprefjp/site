#front (C++11)
```cpp
reference front();
const_reference front() const;
```

##概要
先頭要素を参照する。


##戻り値
`a.front()`は先頭の要素への参照を返す。もし、`a`が`const`だった場合には、先頭の要素への`const`参照を返す。


##備考
`a.front()` と `*a.begin()` は同じ結果になる。
要素数が0の場合(`N == 0`の場合)、この関数呼び出しの効果は未定義である。


##例
```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {3, 1, 4};
  const std::array<int, 3>& car = ar;

  int& a = ar.front();
  const int& b = car.front();

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```
* front[color ff0000]


###出力
```
3
3
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 9.0 (std::tr1), 10.0, 11.0


##参照

