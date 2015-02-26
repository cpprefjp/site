#fill (C++11)
* array[meta header]

```cpp
void fill(const T& u);
```

##概要
コンテナを指定された値で埋める


##効果
[`fill_n`](/reference/algorithm/fill_n.md)`(`[`begin`](/reference/array/begin.md)`(), N, u)`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <array>
#include <algorithm> // std::for_each

int main()
{
  std::array<int, 3> ar;

  ar.fill(3);

  std::for_each(ar.begin(), ar.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* fill[color ff0000]


###出力
```
3
3
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

