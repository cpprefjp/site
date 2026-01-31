# empty
* initializer_list[meta header]
* std[meta namespace]
* initializer_list[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr bool empty() const noexcept; // (1) C++26
```

## 概要
配列が空かどうかを判定する。


## 戻り値
```cpp
size() == 0
```
* size()[link size.md]


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <initializer_list>

int main()
{
  std::initializer_list<int> init = {1, 2, 3};
  std::initializer_list<int> empty_init = {};

  std::cout << std::boolalpha;
  std::cout << init.empty() << std::endl;
  std::cout << empty_init.empty() << std::endl;
}
```
* empty()[color ff0000]

### 出力
```
false
true
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3016R6 Resolve inconsistencies in `begin`/`end` for `valarray` and `braced-initializer-list`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3016r6.html)
