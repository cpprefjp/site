# operator+=
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
T
  operator+=(T operand) const noexcept;          // (1) C++20
constexpr value_type
  operator+=(value_type operand) const noexcept; // (1) C++26
```

## 概要
加算を行う


## テンプレートパラメータ制約
- C++26 : [`is_const_v`](/reference/type_traits/is_const.md)`<T>`が`false`であること


## 戻り値
以下と等価の式により、演算結果の値が返る：

```cpp
return fetch_add(operand) + operand;
```
* fetch_add[link fetch_add.md]


## 例外
投げない


## 備考
- この関数は、`atomic_ref`クラスの整数型、浮動小数点数型、ポインタに対する特殊化で定義される
- 整数型
    - 符号付き整数型に対しては、符号なし整数型に変換されたかのようにしたあと演算が行われ、結果は符号付き整数型になる。未定義動作はない
- 浮動小数点数型
    - 演算結果が、その型で表現できない値であった場合、結果は未規定値になる。ただしその操作によって未定義動作は起こらない
    - 浮動小数点数型に対する操作は[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<floating-point>`トレイトに準拠する
    - 浮動小数点数型に対するアトミック操作の浮動小数点環境は、呼び出しスレッドの浮動小数点環境とは異なる可能性がある
- ポインタ型
    - 結果として未定義アドレスになる場合があるが、それ以外の未定義動作はない


## 例
### 整数の例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  int value = 3;
  std::atomic_ref<int> x{value};

  x += 2;

  std::cout << value << std::endl;
}
```
* x += 2;[color ff0000]

#### 出力
```
5
```

### 浮動小数点数の例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  float value = 3.14f;
  std::atomic_ref<float> x{value};

  x += 1.25f;

  std::cout << value << std::endl;
}
```
* x += 1.25f;[color ff0000]

#### 出力
```
4.39
```

### 複数スレッドから加算する例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  int value = 0;

  // 複数スレッドで加算を呼んでも、
  // 最終的に全てのスレッドでの加算が処理された値になる
  std::thread t1 {[&value] {
    std::atomic_ref{value} += 1;
  }};
  std::thread t2 {[&value] {
    std::atomic_ref{value} += 2;
  }};

  t1.join();
  t2.join();

  std::cout << value << std::endl;
}
```

#### 出力
```
3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3323R1 cv-qualified types in `atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3323r1.html)
    - C++26でCV修飾されたテンプレート引数を受け取れるようになった
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
