#reverse (C++11)
* forward_list[meta header]
* std[meta namespace]

```cpp
void reverse() noexcept;
```

##概要
要素の並びを逆にする


##戻り値
なし


##例外
投げない


##計算量
線形時間


##備考
この操作はイテレータと参照の有効性に影響しない


##例
```cpp
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls = {1, 2, 3};

  ls.reverse();

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```
* reverse[color ff0000]

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


