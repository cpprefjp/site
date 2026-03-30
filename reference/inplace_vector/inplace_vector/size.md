# size
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr size_type size() const noexcept; // (1) C++26
```

## 概要
コンテナの要素数を取得する。


## 戻り値
現在`inplace_vector`オブジェクトに含まれている要素数を返す。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv = {3, 1, 4, 5, 2};
  std::println("{}", iv.size());
}
```
* size()[color ff0000]

### 出力
```
5
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
