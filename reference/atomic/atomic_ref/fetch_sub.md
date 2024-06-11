# fetch_sub
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
T fetch_sub(difference_type operand, memory_order order = memory_order_seq_cst) const noexcept;
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
減算を行う


## 要件
- `std::atomic_ref<T*>`の場合、型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない (C++17)


## 効果
`order`で指定されたメモリオーダーにしたがって、現在の値に`operand`を減算した値でアトミックに置き換える


## 戻り値
変更前の値が返される


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

  int before = x.fetch_sub(2);

  std::cout << before << std::endl;
  std::cout << value << std::endl;
}
```
* fetch_sub[color ff0000]

#### 出力
```
3
1
```

#### 浮動小数点数の例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  float value = 3.14f;
  std::atomic_ref<float> x{value};

  float before = x.fetch_sub(1.25f);

  std::cout << before << std::endl;
  std::cout << value << std::endl;
}
```
* fetch_sub[color ff0000]

#### 出力
```
3.14
1.89
```

### 複数スレッドから減算する例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  int value = 10;

  // 複数スレッドで減算を呼んでも、
  // 最終的に全てのスレッドでの減算が処理された値になる
  std::thread t1 {[&value] {
    std::atomic_ref{value}.fetch_sub(1);
  }};
  std::thread t2 {[&value] {
    std::atomic_ref{value}.fetch_sub(2);
  }};

  t1.join();
  t2.join();

  std::cout << value << std::endl;
}
```
* fetch_sub[color ff0000]

#### 出力
```
7
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

