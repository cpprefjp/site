# compare_exchange_weak
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool
  compare_exchange_weak(T& expected,
                        T desired,
                        memory_order success,
                        memory_order failure
                        ) volatile noexcept;  // (1) C++11

bool
  compare_exchange_weak(T& expected,
                        T desired,
                        memory_order success,
                        memory_order failure
                        ) noexcept;           // (2) C++11
constexpr bool
  compare_exchange_weak(T& expected,
                        T desired,
                        memory_order success,
                        memory_order failure
                        ) noexcept;           // (2) C++26

bool
  compare_exchange_weak(T& expected,
                        T desired,
                        memory_order order = memory_order_seq_cst
                        ) volatile noexcept;  // (3) C++11

bool
  compare_exchange_weak(T& expected,
                        T desired,
                        memory_order order = memory_order_seq_cst
                        ) noexcept;           // (4) C++11
constexpr bool
  compare_exchange_weak(T& expected,
                        T desired,
                        memory_order order = memory_order_seq_cst
                        ) noexcept;           // (4) C++26
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
弱い比較で値を入れ替える。

- (1), (2) : 現在の値と`expected`が等値である場合に、`success`メモリオーダーで現在の値を`desired`で置き換え、そうでなければ`failure`メモリオーダーで`expected`を現在の値で置き換える
- (3), (4) : 現在の値と`expected`が等値である場合に、現在の値を`desired`で置き換え、そうでなければ`expected`を現在の値で置き換える。どちらの値置き換えの場合でも`order`メモリオーダーが使用される


## テンプレートパラメータ制約
- (1), (3) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 事前条件
- `failure`が[`memory_order_release`](/reference/atomic/memory_order.md), [`memory_order_acq_rel`](/reference/atomic/memory_order.md)ではないこと


## 効果
現在の値と`expected`をバイトレベルで等値比較を行い、`true`である場合は現在の値を`desired`で置き換え、`false`である場合は`expected`を現在の値で置き換える。

- (1), (2) : バイト等値比較が`true`の場合は`success`メモリオーダー、`false`の場合は`failure`メモリオーダーに従って、アトミックに値の置き換えが行われる
- (3), (4) : アトミックな値置き換えでは`order`メモリオーダーが使用される


## 戻り値
この関数を呼び出す前の`*this`が保持する値と`expected`の等値比較の結果が返される。等値であれば`true`、そうでなければ`false`が返る。


## 例外
投げない


## 備考
この関数は、値が交換可能な場合でもCAS (compare-and-swap) 操作が失敗する可能性がある (Spurious Failure)。

[`compare_exchange_strong()`](compare_exchange_strong.md)はより強い命令であり、交換可能な場合はCAS操作が常に成功する。

アーキテクチャによっては、この関数は[`compare_exchange_strong()`](compare_exchange_strong.md)と等価だが、PowerPCやARMなどLL/SC命令を提供するアーキテクチャの場合、この関数はハードウェアの“弱いLL/SC命令”にて実装されうる。[wikipedia:en:Load-link/store-conditional](https://en.wikipedia.org/wiki/Load-link%2Fstore-conditional), [wikipedia:Load-Link/Store-Conditional](https://ja.wikipedia.org/wiki/Load-Link%2FStore-Conditional) などを参照のこと。

通常、CAS操作は、CASが成功するまでループさせる。

しかし、もしCAS操作でSpurious Failureが発生しなければループさせる必要が無くなるといった状況であれば、[`compare_exchange_strong()`](compare_exchange_strong.md)を使うことで効率良くCASを行うことができる。

逆に言えば、そのような状況でないなら常にループで`compare_exchange_weak()`を利用すれば良い。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  {
    std::atomic<int> x(3);

    // x == expectedなので、xは2に置き換えられる
    int expected = 3;
    bool result = x.compare_exchange_weak(expected, 2);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
  {
    std::atomic<int> x(3);

    // x != expectedなので、expectedがxの値で置き換えられる
    int expected = 1;
    bool result = x.compare_exchange_weak(expected, 2);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
}
```
* compare_exchange_weak[color ff0000]
* x.load()[link load.md]

#### 出力
```
true 2 3
false 3 3
```


### 競合を回避しながら値を更新する例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

class my_atomic_integer {
  std::atomic<int> value_{0};
public:
  // std::atomic<int>::fetch_add(1)相当
  void increment() {
    int expected = value_.load();
    int desired;
    do {
      desired = expected + 1;
    }
    // 他のスレッドによってvalue_の値が書き換わっている可能性があるため、
    // value_ != expectedだったらexpected = value_に更新する。
    // value_ == expectedだったらその値に+1して値更新する。
    // 変更前の値に依存して変更後の値が必要な場合に、このようなdo/whileループが必要となる
    while (!value_.compare_exchange_weak(expected, desired));

    // 変更前の値に依存した値更新のパターンは、以下のようになる：
    // expected = current.load();
    // do {
    //   desired = function(expected); // expectedに何らかの変換を行う
    // }
    // while (!current.compare_exchange_weak(expected, desired));
  }

  // 値の上書き
  void store(int new_value) {
    // 変更前の値に依存しない場合は、Spurious Failureを回避するためのwhile文のみ必要となる
    int expected = value_.load();
    while (!value_.compare_exchange_weak(expected, new_value)) {}
  }

  int load() const {
    return value_.load();
  }
};

int main()
{
  my_atomic_integer x;

  // 複数スレッドでインクリメントを呼んでも、
  // 最終的に全てのインクリメントが処理された値になる
  std::thread t1 {[&x] {
    x.increment();
  }};
  std::thread t2 {[&x] {
    x.increment();
  }};

  t1.join();
  t2.join();

  std::cout << x.load() << std::endl;
}
```
* value_.compare_exchange_weak[color ff0000]
* value_.load()[link load.md]
* fetch_add[link fetch_add.md]

#### 出力
```
2
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
- [atomic compare_exchange_weak/strong関数 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120725/p1)
- [N2748 Strong Compare and Exchange](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2748.html)
- [cbloom rants: 07-14-11 - compare_exchange_strong vs compare_exchange_weak](http://cbloomrants.blogspot.jp/2011/07/07-14-11-compareexchangestrong-vs.html)
- [What does 'spurious failure' on a CAS mean? - StackOverflow](http://stackoverflow.com/q/355365/463412)
- [“Strong” and “weak” hardware memory models - Sutter’s Mill](https://herbsutter.com/2012/08/02/strong-and-weak-hardware-memory-models/)
- [Understand `std::atomic::compare_exchange_weak()` in C++11 - Eric Z's blog](https://tonywearme.wordpress.com/2014/08/15/understand-stdatomiccompare_exchange_weak-in-c11/)
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
