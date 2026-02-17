# clear
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
void clear() noexcept;           // (1) C++23
constexpr void clear() noexcept; // (1) C++26
```

## 概要
コンテナ内の全ての要素を削除する。各要素のデストラクタが呼ばれ、コンテナから削除される。[`size()`](size.md) は 0 になる。


## 計算量
線形時間。


## 例外
投げない。


## 例
```cpp example
#include <flat_set>
#include <iostream>

int main ()
{
  std::flat_multiset<int> fs = {3, 1, 4, 1};

  std::cout << fs.size() << std::endl;

  fs.clear();

  std::cout << fs.size() << std::endl;
}
```
* clear()[color ff0000]
* fs.size()[link size.md]

### 出力
```
4
0
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
