#cbegin (C++11)
* array[meta header]
* std[meta namespace]

```cpp
const_iterator cbegin() const noexcept;
```

##概要
先頭の要素を指す読み取り専用イテレータを取得する。

[`begin()`](./begin.md)は非`const`な`array`オブジェクトに対して`iterator`を返し、`const`な`array`オブジェクトに対しては`const_iterator`を返すが、`cbegin()`は`const_iterator`を返すバージョンのみが提供されている。
アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。


##戻り値
先頭の要素を指す読み取り専用イテレータ


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
  std::for_each(ar.cbegin(), ar.cend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* cbegin[color ff0000]


###出力
```
1
2
3
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0


##参照


