# operator T
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
operator T() const noexcept;
```

## 概要
型`T`への暗黙の型変換


## 戻り値
[`load()`](load.md)


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  int value = 1;
  std::atomic_ref<int> x{value};

  int n = x;
  std::cout << n << std::endl;
}
```
* int n = x;[color ff0000]

### 出力
```
1
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

