# memory_order
* atomic[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // C++11
  enum memory_order {
    memory_order_relaxed, memory_order_consume, memory_order_acquire,
    memory_order_release, memory_order_acq_rel, memory_order_seq_cst
  };

  // C++20
  enum class memory_order {
    relaxed, consume, acquire, release, acq_rel, seq_cst
  };
  inline constexpr memory_order memory_order_relaxed = memory_order::relaxed;
  inline constexpr memory_order memory_order_consume = memory_order::consume;
  inline constexpr memory_order memory_order_acquire = memory_order::acquire;
  inline constexpr memory_order memory_order_release = memory_order::release;
  inline constexpr memory_order memory_order_acq_rel = memory_order::acq_rel;
  inline constexpr memory_order memory_order_seq_cst = memory_order::seq_cst;
}
```

## 概要
コンパイラに許可されている最適化の一つに、「プ�グラムの意味を変えない限りにおいて、メモリアクセスの順番を変えたり、省略したりしてもよい」というものがある。また、マルチコアCPUにおいては、あるCPUコアによるメモリアクセスの順序が他のコアからも同じように見えるとは限らない。このような挙動はマルチスレッドプ�グラミングにおいて問題になることがある。
この問題への対処として、C++11では各スレッドの実行に順序付けをするための"happens before"(先行発生)という関係を定義し、それによってあるスレッドでの操作が他スレッドから可視になるか否かを定めている。
atomic変数においては、"release"操作によって書き込まれた値を"acquire"操作によって別のスレッドが�み出した場合に、そのrelease操作とacquire操作の間に順序付けが行われる。以下に例を挙げる。

```cpp example
#include <iostream>
#include <atomic>
#include <thread>
int data;
std::atomic<bool> ready(false);

void f()
{
  while (!ready.load(std::memory_order_acquire)) {
  }

  std::cout << data << std::endl;   // (2)
}

int main()
{
  std::thread t(f);

  data = 3;   // (1)
  ready.store(true, std::memory_order_release);

  t.join();
}
```
* std::memory_order_acquire[color ff0000]
* std::memory_order_release[color ff0000]
* load[link atomic/load.md]
* store[link atomic/store.md]

### 出力
```
3
```

[`atomic<bool>`](atomic.md)型の変数`ready`への�み書きに注目すると、`main()`では変数`ready`に `true` を"release"操作として書き込み、`f()`では"acquire"操作としての�み込みを `true` が返されるまで繰り返している。よって、`f()`の`while`ループを抜けた時点で、`main()`の`ready.store()`と`f()`の`ready.load()`の間に順序付け(happens before関係)が成立している。
ここでさらに変数`data`への�み書き(1), (2)に注目すると、(1)は`ready.store()`より前、(2)は`ready.load()`より後にあるので、以下のようなスレッド間の順序付け(happens before関係)が成立することになる。
   (1) → `ready.store()` → `ready.load()` → (2)
よって、(1)における書き込みが(2)の時点で可視であることが保証される。
このようにしてC++のマルチスレッドプ�グラムにおける実行順序および可視性を理解することができる。

以下の列挙値はatomic変数への操作に指定可能な順序付けの種類を表す。

| 列挙値 | 説明 |
|--------|------|
| `relaxed` | スレッド間の順序付けの効果は一切持たない。 |
| `consume` | acquire操作と似ているが、それより弱い順序付けでの�み込みを行うことを指示する。acquire操作は後続の全ての操作に対して順序付けを行うのに対し、consume操作は�み込まれた値に依�(ただし条件分岐による依�は除く)する操作のみに順序付けを保証する点が異なる。[store()](atomic/store.md)など、書き込みのみを行う操作に対しては指定できない。(仕様検討�のため、一時的に非推奨) |
| `acquire` | acquire操作としての�み込みを行うことを指示する。[store()](atomic/store.md)など、書き込みのみを行う操作に対しては指定できない。 |
| `release` | release操作としての書き込みを行うことを指示する。[load()](atomic/load.md)など、�み込みのみを行う操作に対しては指定できない。 |
| `acq_rel` | �み込みと書き込みを同時に行う操作(Read-Modify-Write操作)に対してのみ指定することができ、acquireとreleaseを合わせた効果を持つ。 |
| `seq_cst` | acquire(�み込み操作の場合)、release(書き込み操作の場合)、acq_rel(Read-Modify-Write操作の場合)としての効果を持つ。さらに、同じseq_cstが指定されている他のatomic操作との間での順序一貫性も保証する。これは最も強い保証であり、標準のatomic操作におけるデフォルトのメモリオーダーとして使用される。「seq_cst」は「sequential consistency(順序一貫性)」を意味する。 |


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [そろそろvolatileについて一言いっておくか - yamasaのネタ帳](http://d.hatena.ne.jp/bsdhouse/20090720/1248085754)
- [次期C++に導入されるメモリバリアについて解説してみる - yamasaのネタ帳](http://d.hatena.ne.jp/bsdhouse/20090816/1250446250)
- [C++0xのメモリバリアをより深く解説してみる - yamasaのネタ帳](http://d.hatena.ne.jp/bsdhouse/20090929/1254237835)
- [C/C++11 mappings to processors](http://www.cl.cam.ac.uk/~pes20/cpp/cpp0xmappings.html)
- [N1525: Memory-Order Rationale](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1525.htm)
- [The Purpose of memory_order_consume in C++11](http://preshing.com/20140709/the-purpose-of-memory_order_consume-in-cpp11/)
- [（抄訳）N4215 `memory_order_consume`の利用と実装に向けて［§5-6のみ］](http://d.hatena.ne.jp/yohhoy/20141115/p1)
- [P0371R1 Temporarily discourage `memory_order_consume`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0371r1.html)
- [P0439R0 Make `std::memory_order` a scoped enumeration](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0439r0.html)
