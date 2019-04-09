# fetch_sub
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T fetch_sub(difference_type operand, memory_order order = memory_order_seq_cst) volatile noexcept;
T fetch_sub(difference_type operand, memory_order order = memory_order_seq_cst) noexcept;
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
減算を行う


## 要件
- C++17 : 型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない


## 効果
`order`で指定されたメモリオーダーにしたがって、現在の値に`operand`を減算した値でアトミックに置き換える


## 戻り値
変更前の値が返される


## 備考
- この関数は、`atomic`クラスの整数型、浮動小数点数型 (C++20)、ポインタに対する特殊化で定義される
- 整数型
    - 符号付き整数型に対しては、2の補数表現による演算が行われ、未定義動作はない
- 浮動小数点数型 (C++20)
    - 演算結果が、その型で表現できない値であった場合、結果は未規定値になる。ただしその操作によって未定義動作は起こらない
    - 浮動小数点数型に対する操作は[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<floating-point>`トレイトに準拠する
    - 浮動小数点数型に対するアトミック操作の浮動小数点環境は、呼び出しスレッドの浮動小数点環境とは異なる可能性がある
- ポインタ型
    - 結果として未定義アドレスになる場合があるが、それ以外の未定義動作はない


## 例
### 整数の例 (C++11)
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  int before = x.fetch_sub(2);

  std::cout << before << std::endl;
  std::cout << x.load() << std::endl;
}
```
* fetch_sub[color ff0000]
* x.load()[link load.md]

#### 出力
```
3
1
```

#### 浮動小数点数の例 (C++20)
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<float> x{3.14f};

  float before = x.fetch_sub(1.25f);

  std::cout << before << std::endl;
  std::cout << x.load() << std::endl;
}
```
* fetch_sub[color ff0000]
* x.load()[link load.md]

#### 出力
```
3.14
1.89
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
- [P0020R6 Floating Point Atomic](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0020r6.html)
