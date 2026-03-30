# clear
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr void clear() noexcept; // (1) C++26
```

## 概要
全ての要素を削除する。


## 事後条件
[`empty()`](empty.md) `== true`


## 例外
投げない


## 計算量
線形時間


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv = {1, 2, 3};
  std::println("size before clear: {}", iv.size());

  iv.clear();
  std::println("size after clear: {}", iv.size());
}
```
* clear()[color ff0000]
* iv.size()[link size.md]

### 出力
```
size before clear: 3
size after clear: 0
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
