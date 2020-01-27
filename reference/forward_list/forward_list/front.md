# front
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
reference front();
const_reference front() const;
```

## 概要
先�要素への参照を取得する。


## 戻り値
`*`[`begin()`](begin.md)

## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls = {3, 1, 4};

  int& x = ls.front();
  std::cout << x << std::endl;
}
```
* front()[color ff0000]


### 出力
```
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


