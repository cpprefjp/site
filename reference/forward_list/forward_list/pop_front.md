# pop_front
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void pop_front();
```

## 概要
先�要素を削除する


## 要件
[`empty()`](empty.md) `== false`であること。


## 戻り値
なし

## 例外

投げない

## 例
```cpp example
#include <iostream>
#include <forward_list>
#include <algorithm>

int main()
{
  std::forward_list<int> ls = {1, 2, 3};

  ls.pop_front();

  std::for_each(ls.begin(), ls.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* pop_front()[color ff0000]
* ls.begin()[link begin.md]
* ls.end()[link end.md]


### 出力
```
2
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


