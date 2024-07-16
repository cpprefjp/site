# fetch_and
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T fetch_and(T operand,
            memory_order order = memory_order_seq_cst
            ) volatile noexcept;                       // (1) C++11
T fetch_and(T operand,
            memory_order order = memory_order_seq_cst
            ) noexcept;                                // (2) C++11
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
AND演算を行う


## テンプレートパラメータ制約
- (1), (2) :
    - C++17 : `std::atomic<T*>`の場合、型`T`がオブジェクト型であること。型`T`が`void*`や関数ポインタであってはならない
- (1) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
`order`で指定されたメモリオーダーにしたがって、現在の値に`operand`をANDした値でアトミックに置き換える


## 戻り値
変更前の値が返される


## 例外
投げない


## 備考
- この関数は、`atomic`クラスの整数型に対する特殊化で定義される
- 符号付き整数型に対しては、符号なし整数型に変換されたかのようにしたあと演算が行われ、結果は符号付き整数型になる。未定義動作はない


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <atomic>
#include <bitset>

int main()
{
  int a = 0x0b;
  int b = 0x0e;

  std::atomic<int> x(a);

  x.fetch_and(b);

  std::cout << std::bitset<4>(a).to_string() << std::endl;
  std::cout << std::bitset<4>(b).to_string() << std::endl;
  std::cout << std::bitset<4>(x.load()).to_string() << std::endl;
}
```
* fetch_and[color ff0000]
* x.load()[link load.md]
* to_string()[link /reference/bitset/bitset/to_string.md]

#### 出力
```
1011
1110
1010
```

### 複数スレッドからビット複合演算を行う例 (C++14)
```cpp example
#include <iostream>
#include <atomic>
#include <thread>
#include <bitset>

int main()
{
  std::atomic<int> x{0b1111};

  // 複数スレッドでビット複合演算を呼んでも、
  // 最終的に全てのスレッドでのビット複合演算が処理された値になる
  std::thread t1 {[&x] {
    x.fetch_and(0b0111);
  }};
  std::thread t2 {[&x] {
    x.fetch_and(0b0101);
  }};

  t1.join();
  t2.join();

  int value = x.load();
  std::cout << std::bitset<4>(value).to_string() << std::endl;
}
```
* fetch_and[color ff0000]
* x.load()[link load.md]
* to_string()[link /reference/bitset/bitset/to_string.md]

#### 出力
```
0101
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
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
