# fetch_add
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T fetch_add(difference_type operand,
            memory_order order = memory_order_seq_cst
            ) volatile noexcept;                       // (1) C++11
T fetch_add(difference_type operand,
            memory_order order = memory_order_seq_cst
            ) noexcept;                                // (2) C++11
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
加算を行う


## テンプレートパラメータ制約
- (1), (2) : `std::atomic<T*>`の場合、型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない
- (1) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
`order`で指定されたメモリオーダーにしたがって、現在の値に`operand`を加算した値でアトミックに置き換える


## 戻り値
変更前の値が返される


## 例外
投げない


## 備考
- この関数は、`atomic`クラスの整数型、浮動小数点数型 (C++20)、ポインタに対する特殊化で定義される
- 整数型
    - 符号付き整数型に対しては、符号なし整数型に変換されたかのようにしたあと演算が行われ、結果は符号付き整数型になる。未定義動作はない
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

  int before = x.fetch_add(2);

  std::cout << before << std::endl;
  std::cout << x.load() << std::endl;
}
```
* fetch_add[color ff0000]
* x.load()[link load.md]


#### 出力
```
3
5
```

### 浮動小数点数の例 (C++20)
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<float> x{3.14f};

  float before = x.fetch_add(1.25f);

  std::cout << before << std::endl;
  std::cout << x.load() << std::endl;
}
```
* fetch_add[color ff0000]
* x.load()[link load.md]

#### 出力
```
3.14
4.39
```

### 複数スレッドから加算する例 (C++11)
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  std::atomic<int> x{0};

  // 複数スレッドで加算を呼んでも、
  // 最終的に全てのスレッドでの加算が処理された値になる
  std::thread t1 {[&x] {
    x.fetch_add(1);
  }};
  std::thread t2 {[&x] {
    x.fetch_add(2);
  }};

  t1.join();
  t2.join();

  std::cout << x.load() << std::endl;
}
```
* fetch_add[color ff0000]
* x.load()[link load.md]

#### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
    - C++17での、オブジェクト型であることの制約追加
- [P0020R6 Floating Point Atomic](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0020r6.html)
    - C++20での、浮動小数点数版の追加
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
