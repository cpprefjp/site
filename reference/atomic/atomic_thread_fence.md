# atomic_thread_fence
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  extern "C"
  void
    atomic_thread_fence(memory_order order) noexcept; // (1) C++11
  extern "C"
  constexpr void
    atomic_thread_fence(memory_order order) noexcept; // (1) C++26
}
```
* memory_order[link memory_order.md]

## 概要
アトミック操作に対する、補完的なメモリフェンスを提供する。


## 効果
この関数は、弱い[`memory_order`](memory_order.md)が指定されたアトミック操作の前後に指定することで、より強い`memory_order`を指定した場合と似たような振る舞いをさせる効果を持つ。
たとえば、`a`を[`atomic`](atomic.md)`<int>`型の変数とするとき、下記2種類の処理はほぼ等価の振る舞いをする。

```cpp
// relaxed操作 + releaseフェンス
std::atomic_thread_fence(std::memory_order_release);
a.store(42, std::memory_order_relaxed);

// release操作
a.store(42, std::memory_order_release);
```
* std::atomic_thread_fence[color ff0000]
* a.store[link atomic/store.md]

ただし、後者のほうがより効率的な機械語命令へとコンパイルされる可能性が高い。より詳しい議論については[N2176](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2176.html#integrated)などを参照のこと。
同様に、下記2種類の処理はほぼ等価の振る舞いをする。

```cpp
// relaxed操作 + acquireフェンス
int i = a.load(std::memory_order_relaxed);
std::atomic_thread_fence(std::memory_order_acquire);

// acquireフェンス
int i = a.load(std::memory_order_acquire);
```
* std::atomic_thread_fence[color ff0000]
* a.load[link atomic/load.md]

またメモリフェンスの`memory_order`として `memory_order_seq_cst` が指定された場合は、異なる`atomic`変数への操作間に順序一貫性を与える。
以下に例を挙げる。

```cpp
// 初期値
std::atomic<int> a(0), b(0);

// Thread 1:
a.store(1, std::memory_order_relaxed);
std::atomic_thread_fence(std::memory_order_seq_cst);
b.store(1, std::memory_order_relaxed);
int i = b.load(std::memory_order_relaxed);

// Thread 2:
b.store(0, std::memory_order_relaxed);
std::atomic_thread_fence(std::memory_order_seq_cst);
int j = a.load(std::memory_order_relaxed);

// 結果
assert(i == 1 || j == 1); // すなわち、i と j が共に0となることはない。
```
* std::atomic_thread_fence[color ff0000]
* store[link atomic/store.md]
* load[link atomic/load.md]

この例では、Thread 1, 2 にある`seq_cst`フェンスのいずれか一方でも欠けると (`i == 0 && j == 0`) という結果が起こりうる。そして、`acquire`, `release`や`acq_rel`フェンスでは`seq_cst`フェンスの代用にはならない。

それぞれのメモリオーダーは以下に示すフェンスとして機能する：

| メモリオーダー | フェンス |
|---------------------------------------------|------------------------------------------------------------------|
| [`memory_order_relaxed`](memory_order.md) | 何も行わない |
| [`memory_order_acquire`](memory_order.md) | acquireフェンス |
| [`memory_order_consume`](memory_order.md) | acquireフェンス(C++26で非推奨) |
| [`memory_order_release`](memory_order.md) | releaseフェンス |
| [`memory_order_acq_rel`](memory_order.md) | acquireフェンスとreleaseフェンスの両方 |
| [`memory_order_seq_cst`](memory_order.md) | acquireフェンスとreleaseフェンスの両方に加え、順序一貫性も与える |


## 戻り値
なし


## 例外
投げない


## 備考
- アトミックオブジェクト`M`に対するアトミック変更`A`・`B`について、以下のいずれかが成り立つ場合、`B`は`M`の変更順序において`A`よりも後に発生する。ここで`S`は[`memory_order_seq_cst`](memory_order.md)操作の全順序である。
    - `A`が[`memory_order_seq_cst`](memory_order.md)フェンス`X`よりも前に順序付けられており、かつ`X`が`S`において`B`に先行する
    - [`memory_order_seq_cst`](memory_order.md)フェンス`Y`が`B`よりも前に順序付けられており、かつ`A`が`S`において`Y`に先行する
    - [`memory_order_seq_cst`](memory_order.md)フェンス`X`・`Y`が存在し、`A`が`X`よりも前に、`Y`が`B`よりも前に順序付けられており、かつ`X`が`S`において`Y`に先行する


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>
int data;
std::atomic<bool> ready(false);

void f()
{
  while (!ready.load(std::memory_order_relaxed)) {
  }
  std::atomic_thread_fence(std::memory_order_acquire);

  // atomic変数readyへのstore/load操作とatomic_thread_fenceの効果により、
  // mainスレッドでの "data = 3" の結果が、ここで可視となることが保証される。
  std::cout << data << std::endl;
}

int main()
{
  std::thread t(f);

  data = 3;
  std::atomic_thread_fence(std::memory_order_release);
  ready.store(true, std::memory_order_relaxed);

  t.join();
}
```
* std::atomic_thread_fence[color ff0000]
* load[link atomic/load.md]
* store[link atomic/store.md]

### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 参照
- [Implementing Dekker's algorithm with Fences](https://www.justsoftwaresolutions.co.uk/threading/implementing_dekkers_algorithm_with_fences.html)
- [LWG Issue 2130. Missing ordering constraints](https://cplusplus.github.io/LWG/issue2130)
    - C++14で、[`memory_order_seq_cst`](memory_order.md)フェンスによる変更順序の制約が整理され、フェンスが片側にのみ存在する場合についても順序が規定された
    - この修正は欠陥報告(DR)であり、C++11以降に遡及して適用される。元の規定は両側にフェンスがある場合しか扱っておらず、フェンスと[`memory_order_seq_cst`](memory_order.md)操作を混在させたときの順序が規定から抜けていた記載漏れの補完であるため
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
- [P3475R2 Defang and deprecate memory_order::consume](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3475r2.pdf)
