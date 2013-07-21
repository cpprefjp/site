#crend(C++11)
```cpp
const_reverse_iterator crend() const noexcept;
```

##概要

先頭要素の前を指す読み取り専用逆イテレータを取得する。

[`rend()`](./rend.md)は非`const`な`array`オブジェクトに対して`reverse_iterator`を返し、`const`な`array`オブジェクトに対しては`const_reverse_iterator`を返すが、`cend()`は`const_reverse_iterator`を返すバージョンのみが提供されている。
アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。


##戻り値
先頭要素の前を指す読み取り専用逆イテレータ


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <array>
#include <algorithm>

int main()
{
  std::array<int, 3> ar = {1, 2, 3};

  // このアルゴリズム内ではarの書き換えを決して行わない
  std::for_each(ar.crbegin(), ar.crend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* crend[color ff0000]


###出力
```
3
2
1
```

##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 10.0, 11.0


##参照

