# empty
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool empty() const noexcept;
```

## 概要
コンテナが空かどうかを判定する


## 戻り値
コンテナが空であれば`true`、そうでなければ`false`を返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp
#include <iostream>
#include <forward_list>

int main()
{
  // 空
  {
    std::forward_list<int> ls;
    bool b = ls.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
  // 空じゃない
  {
    std::forward_list<int> ls = {1, 2, 3};
    bool b = ls.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
}
```
* empty()[color ff0000]

### 出力
```
true
false
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照


