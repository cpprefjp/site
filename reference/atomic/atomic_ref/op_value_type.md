# operator value_type
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr operator value_type() const noexcept; // (1) C++26
```

## 概要
型`value_type`への暗黙の型変換


## 戻り値
[`load()`](load.md)


## 例外
投げない


## 備考
- C++26で、CV修飾された型を受け取れるようにするため、型`T`への変換演算子から、型`value_type`への変換演算子に変更された


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
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3323R1 cv-qualified types in `atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3323r1.html)
    - C++26でCV修飾されたテンプレート引数を受け取れるようになった
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
