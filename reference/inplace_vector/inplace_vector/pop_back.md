# pop_back
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr void pop_back(); // (1) C++26
```

## 概要
末尾要素を削除する。


## 事前条件
[`empty()`](empty.md) `== false`


## 効果
末尾の要素を削除する。


## 例外
投げない


## 戻り値
なし


## 計算量
定数時間


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv = {1, 2, 3};

  iv.pop_back();

  for (int x : iv) std::print("{} ", x);
  std::println("");

  std::println("size: {}", iv.size());
}
```
* pop_back()[color ff0000]
* iv.size()[link size.md]

### 出力
```
1 2 
size: 2
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
