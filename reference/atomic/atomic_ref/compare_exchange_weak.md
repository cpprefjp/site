# compare_exchange_weak
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool compare_exchange_weak(T& expected,
                           T desired,
                           memory_order success,
                           memory_order failure
                           ) const noexcept;     // (1) C++20

bool compare_exchange_weak(T& expected,
                           T desired,
                           memory_order order = memory_order_seq_cst
                           ) const noexcept;     // (2) C++20
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
弱い比較で値を入れ替える。

- (1) : 現在の値と`expected`が等値である場合に、`success`メモリオーダーで現在の値を`desired`で置き換え、そうでなければ`failure`メモリオーダーで`expected`を現在の値で置き換える
- (2) : 現在の値と`expected`が等値である場合に、現在の値を`desired`で置き換え、そうでなければ`expected`を現在の値で置き換える。どちらの値置き換えの場合でも`order`メモリオーダーが使用される


## 要件
- (1) : `failure`が[`memory_order_release`](/reference/atomic/memory_order.md), [`memory_order_acq_rel`](/reference/atomic/memory_order.md)ではないこと


## 効果
`*this`が参照する値を現在の値であるとして。

現在の値と`expected`をバイトレベルで等値比較を行い、`true`である場合は現在の値を`desired`で置き換え、`false`である場合は`expected`を現在の値で置き換える。

- (1) : バイト等値比較が`true`の場合は`success`メモリオーダー、`false`の場合は`failure`メモリオーダーに従って、アトミックに値の置き換えが行われる
- (2) : アトミックな値置き換えでは`order`メモリオーダーが使用される


## 戻り値
この関数を呼び出す前の`*this`が参照する値と`expected`の等値比較の結果が返される。等値であれば`true`、そうでなければ`false`が返る。


## 例外
投げない


## 備考
この関数は、値が交換可能な場合でもCAS (compare-and-swap) 操作が失敗する可能性がある(Spurious Failure)。

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
    int value = 3;
    std::atomic_ref<int> x{value};

    // x == expectedなので、xは2に置き換えられる
    int expected = 3;
    bool result = x.compare_exchange_weak(expected, 2);

    std::cout << std::boolalpha << result << " " << value << " " << expected << std::endl;
  }
  {
    int value = 3;
    std::atomic_ref<int> x{value};

    // x != expectedなので、expectedがxの値で置き換えられる
    int expected = 1;
    bool result = x.compare_exchange_weak(expected, 2);

    std::cout << std::boolalpha << result << " " << value << " " << expected << std::endl;
  }
}
```
* compare_exchange_weak[color ff0000]

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

class my_integer {
  int value_ = 0;
public:
  // std::atomic_ref<int>::fetch_add(1)相当
  void atomic_increment() {
    std::atomic_ref<int> r{value_};
    int expected = r.load();
    int desired;
    do {
      desired = expected + 1;
    }
    // 他のスレッドによってrの値が書き換わっている可能性があるため、
    // r != expectedだったらexpected = rに更新する。
    // r == expectedだったらその値に+1して値更新する。
    // 変更前の値に依存して変更後の値が必要な場合に、このようなdo/whileループが必要となる
    while (!r.compare_exchange_weak(expected, desired));

    // 変更前の値に依存した値更新のパターンは、以下のようになる：
    // expected = current.load();
    // do {
    //   desired = function(expected); // expectedに何らかの変換を行う
    // }
    // while (!current.compare_exchange_weak(expected, desired));
  }

  // アトミックな値の上書き
  void atomic_store(int new_value) {
    std::atomic_ref<int> r{value_};
    // 変更前の値に依存しない場合は、Spurious Failureを回避するためのwhile文のみ必要となる
    int expected = r.load();
    while (!r.compare_exchange_weak(expected, new_value)) {}
  }

  // 非アトミックな値の取得
  int get() const {
    return value_;
  }
};

int main()
{
  my_integer x;

  // 複数スレッドでインクリメントを呼んでも、
  // 最終的に全てのインクリメントが処理された値になる
  std::thread t1 {[&x] {
    x.atomic_increment();
  }};
  std::thread t2 {[&x] {
    x.atomic_increment();
  }};

  t1.join();
  t2.join();

  std::cout << x.get() << std::endl;
}
```
* r.compare_exchange_weak[color ff0000]
* r.load()[link load.md]
* fetch_add[link fetch_add.md]

#### 出力
```
2
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

