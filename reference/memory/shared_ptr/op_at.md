# operator[]
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
// 配列版のみ
element_type&
  operator[](ptrdiff_t i) const; // (1) C++17
constexpr element_type&
  operator[](ptrdiff_t i) const; // (1) C++26
```
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

## 概要
配列に対して、添字を使用して任意の位置の要素を参照する。


## 要件
- [`get()`](get.md) `!= nullptr && i >= 0`
- 型`T`が`U[N]`の形式となっており、要素数が判明している場合、`i < N`であること


## 戻り値
[`get()`](get.md)`[i]`


## 備考
型`T`が配列ではない場合、この関数が宣言されるかは未規定。定義される場合、その戻り値は未規定


## 例外
投げない


## 例
```cpp example
#include <memory>

int main()
{
  // 要素数がコンパイル時に判明している場合の型指定
  std::shared_ptr<double[1024]> p1 {new double[1024]};
  p1[1] = 3.14;

  // 要素数がコンパイル時に判明していない場合の型指定
  std::shared_ptr<double[]> p2 {new double[3]};
  p2[2] = 2.56;
}
```
* p1[1][color ff0000]
* p2[2][color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [Clang](/implementation.md#clang):
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)