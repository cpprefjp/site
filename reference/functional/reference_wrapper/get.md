# get
* functional[meta header]
* std[meta namespace]
* reference_wrapper[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T& get() const noexcept;
```

## 概要
生参照を取得する


## 戻り値
保持している参照を返す


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <functional>

int main()
{
  int x = 3;

  std::reference_wrapper<int> r(x);
  int& rx = r.get(); // 参照を取得する
  rx += 1;

  std::cout << x << std::endl;
}
```
* get()[color ff0000]

### 出力
```
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照


