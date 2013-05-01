#cend
```cpp
const_iterator cend() const noexcept;
```

##概要

最後尾の要素の次を指す読み取り専用イテレータを取得する。

[`end()`](/reference/array/end.md)は非`const`な`array`オブジェクトに対して`iterator`を返し、`const`な`array`オブジェクトに対しては`const_iterator`を返すが、`cend()`は`const_iterator`を返すバージョンのみが提供されている。
アルゴリズムにイテレータの組を渡す際、アルゴリズム内でデータの書き換えが起こらないというユーザーの意図を示す場合などに有用である。


##戻り値

最後尾要素の次を指す読み取り専用イテレータ



##例外

投げない


##計算量

定数時間


##備考



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
* cend[color ff0000]

###出力

```cpp
1
2
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
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```