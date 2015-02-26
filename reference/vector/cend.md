#cend (C++11)
* vector[meta header]

```cpp
const_iterator end() const noexcept;
```

##概要
末尾要素の次を指す読み取り専用イテレータを取得する。

[`end`](./end.md)`()`は非`const`な`vector`オブジェクトに対して`iterator`を返し、`const`な`vector`オブジェクトに対しては`const_iterator`を返すが、`cend()`は`const_iterator`を返すバージョンのみが提供されている。

アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。


##戻り値
末尾要素の次を指す読み取り専用イテレータ


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3};

  // このアルゴリズム内ではvの書き換えを決して行わない
  std::for_each(v.cbegin(), v.cend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* cend[color ff0000]

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
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0

