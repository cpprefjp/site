# max
* random[meta header]
* std[meta namespace]
* student_t_distribution[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
result_type max() const;
```

## 概要
生成し得る値の上限を取得する。


## 戻り値
値の範囲の上限を返す。


## 例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::student_t_distribution<> dist(1.0);

  double max_val = dist.max();
  std::cout << max_val << std::endl;
}
```
* max()[color ff0000]

### 出力例
```
1.79769e+308
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


