```cpp
namespace std {

  extern "C" void atomic_thread_fence(memory_order order) noexcept;
}
```
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]

##概要

<b>atomic操作に対する、補完的なメモリフェンスを提供する。</b>


##効果

この関数は、弱いmemory_orderが指定されたatomic操作の前後に指定することで、より強いmemory_orderを指定した場合と似たような振る舞いをさせる効果を持つ。
たとえば、aをstd::atomic<int>型の変数とするとき、
```cpp
std::atomic_thread_fence(std::memory_order_release);a.store(42, std::memory_order_relaxed);

は、
```cpp
a.store(42, std::memory_order_release);

とほぼ同等の振る舞いをする。ただし、後者のほうがより効率的な機械語命令へとコンパイルされる可能性が高い。より詳しい議論についてはN2176などを参照のこと。
同様に、
```cpp
int i = a.load(std::memory_order_relaxed);std::atomic_thread_fence(std::memory_order_acquire);
```
* N2176[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2176.html#integrated]

は、
```cpp
int i = a.load(std::memory_order_acquire);
```

とほぼ同等の振る舞いをする。

memory_orderとして memory_order_seq_cst が指定された場合は、異なるatomic変数への操作間に順序一貫性を与える。
以下に例を挙げる。
```cpp
// 初期値std::atomic<int> a(0), b(0);

| | |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
|// Thread 1:a.store(1, std::memory_order_relaxed);std::atomic_thread_fence(std::memory_order_seq_cst);b.store(1, std::memory_order_relaxed);int i = b.load(std::memory_order_relaxed); | // Thread 2:b.store(0, std::memory_order_relaxed);std::atomic_thread_fence(std::memory_order_seq_cst);int j = a.load(std::memory_order_relaxed); |
assert(i == 1 || j == 1); // すなわち、i と j が共に0となることはない。
```

この例では、Thread 1, 2 にあるseq_cstフェンスのいずれか一方でも欠けると (i == 0 && j == 0) という結果が起こりうる。そして、acquire, releaseやacq_relフェンスでは代用にはならない。

それぞれのメモリオーダーは以下に示すフェンスとして機能する：

| | |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| メモリオーダー | フェンス |
| [`memory_order_relaxed`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order) | 何も行わない |
| [`memory_order_acquire`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order) [`memory_order_consume`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order) | acquireフェンス |
| [`memory_order_release`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order) | releaseフェンス |
| [`memory_order_acq_rel`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order) | acquireフェンスとreleaseフェンスの両方 |
| [`memory_order_seq_cst`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order) | acquireフェンスとreleaseフェンスの両方に加え、順序一貫性も与える |



##戻り値

なし


##例外

投げない


##備考



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
* atomic_thread_fence[color ff0000]

###出力

```cpp
3
```

##バージョン


###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照

[C++0x で Dekker のアルゴリズムを実装する](http://gameenginejp.blogspot.jp/2010/08/c0x-dekker.html)

