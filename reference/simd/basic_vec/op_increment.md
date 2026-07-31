# operator++
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr basic_vec& operator++() noexcept;   // (1)
constexpr basic_vec operator++(int) noexcept; // (2)
```

## 概要
各要素をインクリメントする。

- (1) : 前置インクリメント。各要素を1増やす。
- (2) : 後置インクリメント。各要素を1増やす。


## テンプレートパラメータ制約
- (1) : `value_type`の値`a`に対して式`++a`が有効であること
- (2) : `value_type`の値`a`に対して式`a++`が有効であること


## 効果
全ての要素を1増やす。


## 戻り値
- (1) : `*this`
- (2) : インクリメントする前の`*this`のコピー


## 例外
投げない


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return i; }; // {0, 1, 2, 3}

  // 各要素をインクリメントする
  ++a;                                           // {1, 2, 3, 4}

  for (int i = 0; i < a.size(); ++i) {
    std::print("{} ", a[i]);
  }
  std::println("");
}
```
* ++a;[color ff0000]
* simd::vec[link ../basic_vec.md]
* a.size()[link size.md]
* a[i][link op_at.md]

### 出力
```
1 2 3 4 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec::operator--`](op_decrement.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
