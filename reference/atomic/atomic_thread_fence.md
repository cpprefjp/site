#atomic_thread_fence (C++11)
```cpp
namespace std {
  extern "C" void atomic_thread_fence(memory_order order) noexcept;
}
```
* memory_order[link ./memory_order.md]

##概要
アトミック操作に対する、補完的なメモリフェンスを提供する。


##効果
この関数は、弱い[`memory_order`](./memory_order.md)が指定されたアトミック操作の前後に指定することで、より強い`memory_order`を指定した場合と似たような振る舞いをさせる効果を持つ。
たとえば、`a`を[`atomic`](./atomic.md)`<int>`型の変数とするとき、下記2種類の処理はほぼ同等の振る舞いをする。

```cpp
// relaxed操作 + releaseフェンス
std::atomic_thread_fence(std::memory_order_release);
a.store(42, std::memory_order_relaxed);

// release操作
a.store(42, std::memory_order_release);
```
* atomic_thread_fence[color ff0000]

ただし、後者のほうがより効率的な機械語命令へとコンパイルされる可能性が高い。より詳しい議論については[N2176](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2176.html#integrated)などを参照のこと。
同様に、下記2種類の処理はほぼ同等の振る舞いをする。

```cpp
// relaxed操作 + acquireフェンス
int i = a.load(std::memory_order_relaxed);
std::atomic_thread_fence(std::memory_order_acquire);

// acquireフェンス
int i = a.load(std::memory_order_acquire);
```
* atomic_thread_fence[color ff0000]

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
* atomic_thread_fence[color ff0000]

この例では、Thread 1, 2 にある`seq_cst`フェンスのいずれか一方でも欠けると (`i == 0 && j == 0`) という結果が起こりうる。そして、`acquire`, `release`や`acq_rel`フェンスでは`seq_cst`フェンスの代用にはならない。

それぞれのメモリオーダーは以下に示すフェンスとして機能する：

| メモリオーダー | フェンス |
|---------------------------------------------|------------------------------------------------------------------|
| [`memory_order_relaxed`](./memory_order.md) | 何も行わない |
| [`memory_order_acquire`](./memory_order.md)<br/>[`memory_order_consume`](/reference/atomic/memory_order.md) | acquireフェンス |
| [`memory_order_release`](./memory_order.md) | releaseフェンス |
| [`memory_order_acq_rel`](./memory_order.md) | acquireフェンスとreleaseフェンスの両方 |
| [`memory_order_seq_cst`](./memory_order.md) | acquireフェンスとreleaseフェンスの両方に加え、順序一貫性も与える |


##戻り値
なし


##例外
投げない


##例
```cpp
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
* atomic_thread_fence[color ff0000]

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照
- [Implementing Dekker's algorithm with Fences](http://www.justsoftwaresolutions.co.uk/threading/implementing_dekkers_algorithm_with_fences.html)

