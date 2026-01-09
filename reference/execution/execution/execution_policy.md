# 実行ポリシー
* execution[meta header]
* std::execution[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]
* sequenced_policy,parallel_policy,parallel_unsequenced_policy,unsequenced_policy,seq,par,par_unseq,unseq[meta alias]

```cpp
namespace std::execution {
  class sequenced_policy { unspecified };
  class parallel_policy { unspecified };
  class parallel_unsequenced_policy { unspecified };
  class unsequenced_policy { unspecified };                 // C++20

  inline constexpr sequenced_policy seq{ unspecified };
  inline constexpr parallel_policy par{ unspecified };
  inline constexpr parallel_unsequenced_policy par_unseq{ unspecified };
  inline constexpr unsequenced_policy unseq{ unspecified }; // C++20
}
```
* unspecified[italic]

## 概要
アルゴリズムの並列実行を許可するための実行ポリシーとして、ここでは以下を定義する。

| 実行ポリシー名 | 説明 | 対応バージョン |
|----------------|------|----------------|
| `seq`          | 逐次処理を実行し、並列化を行わない | C++17 |
| `par`          | マルチスレッド化を許可する | C++17 |
| `par_unseq`    | マルチスレッド化および・もしくはベクトル化を許可する | C++17 |
| `unseq`        | ベクトル化を許可する | C++20 |

いずれの実行ポリシーでも、実行中に例外が送出され、それが捕捉されなかった場合は、[`std::terminate()`](/reference/exception/terminate.md)関数が呼び出され、プログラムが異常終了する。


### sequenced_policy / seq
この逐次実行の実行ポリシーは、実行ポリシーを指定せずにアルゴリズムを実行することと等価である。


### parallel_policy / par
この実行ポリシーは、マルチスレッド化による並列実行を許可する。ただし、リソースが足りていない状況では、シングルスレッドで実行される可能性がある。

この実行ポリシーでは、アルゴリズムに指定した関数オブジェクト内で副作用をともなう処理を実行した場合にデータ競合が発生する可能性があるため、ミューテックスによる排他処理やアトミック操作などをユーザーが管理して、データ競合を回避する必要がある。

シーケンスの要素はコピーが作られる可能性がある。


### parallel_unsequenced_policy / par_unseq
この実行ポリシーは、マルチスレッド化および・もしくはベクトル化を許可する。

この実行ポリシーでも`parallel_policy`と同様に、副作用をともなう処理でデータ競合が発生する可能性がある。ただし、マルチスレッド化だけでなくベクトル化も組み合わさるために、ミューテックスによる排他処理をした場合には、複数回ロックが取得されてデッドロックが発生する可能性がある。そのため、この実行ポリシーではLock-freeアトミック操作によってデータ競合を回避する必要がある。

シーケンスの要素はコピーが作られる可能性がある。


### unsequenced_policy / unseq (C++20)
この実行ポリシーは、ベクトル化を許可する。

ベクトル化は、ソフトウェアパイプライン化やSIMD命令などによる、シングルスレッドでのデータ並列のことを指す。

この実行ポリシーで呼び出した並列アルゴリズムでは、呼び出し側の実行スレッド内で、順序付けされずに処理を実行する。

この実行ポリシーで、ミューテックスによる排他処理を行った場合、デッドロックが発生する可能性がある。この実行ポリシーはシングルスレッドで並行に複数データを処理するため、同じスレッド内でロック取得操作を複数回呼び出すとデッドロックする。

そのため、この実行ポリシーで並列アルゴリズムを実行する際の同期の方針としては、ベクトル化安全でない標準ライブラリ関数を並列アルゴリズムから呼び出すべきではない、というものになる。もしくは、進行保証のあるLock-freeアトミック操作によってデータ競合を回避する必要がある。


## 備考
- これらの実行ポリシーで並列アルゴリズムを実行する際、要素アクセスの関数が例外を送出した場合は、[`std::terminate()`](/reference/exception/terminate.md)関数が呼び出され、プログラムが異常終了する


## 計算量
実行ポリシーをとらないアルゴリズムは「最大N回だけ関数`f()`を呼び出す」や「正確にN回だけ関数`f()`を呼び出す」のように計算量を規定する。実行ポリシーはそれを緩和し、ビッグオー記法を使用して「O(N)回だけ関数`f()`を呼び出す」のように表記する。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <algorithm>
#include <execution>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4, 5, 2, 6};

  // これまで通りの逐次実行
  std::sort(v.begin(), v.end());
  std::sort(std::execution::seq, v.begin(), v.end());

  // 並列実行
  std::sort(std::execution::par, v.begin(), v.end());

  // 並列化・ベクトル化
  std::sort(std::execution::par_unseq, v.begin(), v.end());

  // ベクトル化
  std::sort(std::execution::unseq, v.begin(), v.end());

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```
* std::execution::seq[color ff0000]
* std::execution::par[color ff0000]
* std::execution::par_unseq[color ff0000]
* std::execution::unseq[color ff0000]

#### 出力
```
1
2
3
4
5
6
```

### データ競合を回避する例
```cpp example
#include <iostream>
#include <algorithm>
#include <execution>
#include <vector>
#include <mutex>

int main()
{
  {
    std::vector<int> a = {3, 1, 4, 5, 2, 6};
    std::vector<int> b;

    // マルチスレッド化の場合は、ミューテックスかアトミック操作でデータ競合を回避する
    std::mutex m;
    std::for_each(std::execution::par, a.begin(), a.end(), [&](int x) {
      std::lock_guard lk{m};
      b.push_back(x);
    });

    for (int x : b) {
      std::cout << x << ' ';
    }
    std::cout << std::endl;
  }

  // (マルチスレッド化 +) ベクトル化の場合は、Lock-freeアトミック操作でデータ競合を回避する
  {
    static_assert(std::atomic<int>::is_always_lock_free);  // Lock-free保証を確認
    std::vector<int> v = {3, 1, 4, 5, 2};
    std::atomic<int> count {0}; // タスクが終了した数

    std::for_each(std::execution::par_unseq, v.begin(), v.end(), [&count](int) {
      // ...時間のかかる処理...
      ++count;
    });

    std::cout << count.load() << std::endl;
  }
}
```
* std::execution::par[color ff0000]
* std::execution::par_unseq[color ff0000]
* count.load[link /reference/atomic/atomic/load.md]
* is_always_lock_free[link /reference/atomic/atomic.md]

#### 出力例
```
3 4 1 2 5 6 
5
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0394R4: Hotel Parallelifornia: `terminate()` for Parallel Algorithms Exception Handling](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0394r4.html)
- [P0336R1 Better Names for Parallel Execution Policies in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0336r1.pdf)
- [P0502R0 Throwing out of a parallel algorithm terminates—but how?](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0502r0.html)
- [P0518R1 Allowing copies as arguments to function objects given to parallel algorithms in response to CH11](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0518r1.html)
- [P0523R1: Wording for CH 10: Complexity of parallel algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0523r1.html)
- [P1001R2 Target Vectorization Policies from Parallelism V2 TS to C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1001r2.html)
