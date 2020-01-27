# compare_exchange_strong
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool compare_exchange_strong(T& expected,
                             T desired,
                             memory_order success,
                             memory_order failure
                             ) volatile noexcept;  // (1)
bool compare_exchange_strong(T& expected,
                             T desired,
                             memory_order success,
                             memory_order failure
                             ) noexcept;           // (2)

bool compare_exchange_strong(T& expected,
                             T desired,
                             memory_order order = memory_order_seq_cst
                             ) volatile noexcept;  // (3)
bool compare_exchange_strong(T& expected,
                             T desired,
                             memory_order order = memory_order_seq_cst
                             ) noexcept;           // (4)
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
強い比較で値を入れ替える。

- (1), (2) : 現在の値と`expected`が�値である場合に、`success`メモリオーダーで現在の値を`desired`で置き換え、そうでなければ`failure`メモリオーダーで`expected`を現在の値で置き換える
- (3), (4) : 現在の値と`expected`が�値である場合に、現在の値を`desired`で置き換え、そうでなければ`expected`を現在の値で置き換える。どちらの値置き換えの場合でも`order`メモリオーダーが使用される


## 要件
- `failure`が[`memory_order_release`](/reference/atomic/memory_order.md), [`memory_order_acq_rel`](/reference/atomic/memory_order.md)ではないこと


## 効果
現在の値と`expected`をバイトレベルで�値比較を行い、`true`である場合は現在の値を`desired`で置き換え、`false`である場合は`expected`を現在の値で置き換える。

- (1), (2) : バイト�値比較が`true`の場合は`success`メモリオーダー、`false`の場合は`failure`メモリオーダーに従って、アトミックに値の置き換えが行われる
- (3), (4) : アトミックな値置き換えでは`order`メモリオーダーが使用される


## 戻り値
この関数を呼び出す前の`*this`が保持する値と`expected`の�値比較の結果が返される。�値であれば`true`、そうでなければ`false`が返る。


## 例外
投げない


## 備考
この関数は、値が交換可能な場合はCAS (compare-and-swap) 操作が常に成功する。

[`compare_exchange_weak()`](compare_exchange_weak.md)はより弱い命令であり、交換可能な場合でもCAS操作が失敗する可能性がある。

通常、CAS操作は、CASが成功するまでループさせる。

しかし、もしCAS操作でSpurious Failureが発生しなければループさせる必要が無くなるといった状況であれば、`compare_exchange_strong()`を使うことで効率良くCASを行うことができる。

逆に言えば、そのような状況でないなら常にループで[`compare_exchange_weak()`](compare_exchange_weak.md)を利用すれば良い。


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
    bool result = x.compare_exchange_strong(expected, 2);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
  {
    std::atomic<int> x(3);

    // x != expectedなので、expectedがxの値で置き換えられる
    int expected = 1;
    bool result = x.compare_exchange_strong(expected, 2);

    std::cout << std::boolalpha << result << " " << x.load() << " " << expected << std::endl;
  }
}
```
* compare_exchange_strong[color ff0000]
* x.load()[link load.md]

#### 出力
```
true 2 3
false 3 3
```

### フラグのオン・オフをする例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

class my_atomic_flag {
  std::atomic<bool> value_{false};
public:
  void set() {
    // 値がfalseだったらtrueにする。
    // falseでなかったら (true) 、そのまま
    bool expected = false;
    value_.compare_exchange_strong(expected, true);
  }

  bool load() const {
    return value_.load();
  }
};

int main()
{
  my_atomic_flag x;

  // いずれかのスレッドの処理がおわったら (成功したら) フラグをオンにする
  std::thread t1 {[&x] {
    x.set();
  }};
  std::thread t2 {[&x] {
    x.set();
  }};

  t1.join();
  t2.join();

  std::cout << std::boolalpha << x.load() << std::endl;
}
```
* value_.compare_exchange_strong[color ff0000]
* value_.load()[link load.md]

#### 出力
```
true
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [atomic compare_exchange_weak/strong関数 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120725/p1)
- [N2748 Strong Compare and Exchange](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2748.html)
- [cbloom rants: 07-14-11 - compare_exchange_strong vs compare_exchange_weak](http://cbloomrants.blogspot.jp/2011/07/07-14-11-compareexchangestrong-vs.html)
- [What does 'spurious failure' on a CAS mean? - StackOverflow](http://stackoverflow.com/q/355365/463412)
- [“Strong” and “weak” hardware memory models - Sutter’s Mill](https://herbsutter.com/2012/08/02/strong-and-weak-hardware-memory-models/)
- [Understand `std::atomic::compare_exchange_weak()` in C++11 - Eric Z's blog](https://tonywearme.wordpress.com/2014/08/15/understand-stdatomiccompare_exchange_weak-in-c11/)
