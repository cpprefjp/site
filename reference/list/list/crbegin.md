# crbegin
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_reverse_iterator crbegin() const noexcept;
```

## 概要
末尾要素を指す�み取り専用逆イテレータを取得する。


## 戻り値
末尾要素を指す�み取り専用逆イテレータ


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <list>
#include <algorithm>

int main()
{
  std::list<int> ls = { 1, 2, 3 };

  // このアルゴリズム内ではlsの書き換えを決して行わない
  std::for_each(ls.crbegin(), ls.crend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* crbegin()[color ff0000]
* ls.crend()[link crend.md]

### 出力
```
3
2
1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


## 参照


