# kill_dependency
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T kill_dependency(T y) noexcept;
}
```

## 概要
データ依�性を切る。


## 効果
引数の依�性を戻り値に持ち運ばない


## 戻り値
`y`


## 例外
投げない


## 備考
この関数は、�み込んだ値に依�する式に対する順序を保証する[`memory_order_consume`](memory_order.md)メモリーオーダーにおいて、値の依�性を�ち切り、最適化を許可するために用意されている。

この関数とは逆に、依�性を持ち運ぶことをコンパイラに指示するための[`[[carries_dependency]]`](/lang/cpp11/attributes.md#carries_dependency)属性も用意されている。

## 注意
この関数は、並行性およびコンパイラの最適化に関する深い理解をもつ専門家ですら�しく利用することが非常に難しい。

安易に利用すると、この関数がアトミックウェポンと化してしまうので控えること。


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

std::atomic<int> a(-1);
int table[10];

void f()
{
  table[3] = 5;
  table[5] = -1;
  a.store(3, std::memory_order_release);
}

int main()
{
  std::thread t1(f);

  int r0;
  do {
    r0 = a.load(std::memory_order_consume);
  } while (r0 < 0);
  std::cout << r0 << std::endl; // �しく同期化されており、必ず"3"が出力される。

  int r1 = table[r0];
  std::cout << r1 << std::endl; // �しく同期化されており、必ず"5"が出力される。

  int r2 = table[r1];
  std::cout << r2 << std::endl; // �しく同期化されており、必ず"-1"が出力される。

  int r3 = table[std::kill_dependency(r1)];  // data race. 未定義動作。
  std::cout << r3 << std::endl; // 最適化などの結果、"-1"以外が出力される可能性がある。


  t1.join();
}
```
* std::kill_dependency[color ff0000]
* a.store[link atomic/store.md]
* a.load[link atomic/load.md]


### 出力例
```
3
5
-1
0
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 実装例
```cpp
template <class T>
T kill_dependency(T y) noexcept
{
  // この実装では単に引数をそのまま返しているだけであり、データ依�性は切れていない。
  // よって、仕様を�確に実装しているわけではない。
  // 仕様通りにデータ依�性の切�を行うためには、コンパイラの最適化のコードに手を加えて
  // この関数を特別扱いしなければならない。
  return y;
}
```

## 参照
- [N2492 C++ Data-Dependency Ordering: Atomics and Memory Model](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2492.html)
- [N2664 C++ Data-Dependency Ordering: Atomics and Memory Model](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2664.htm)
- [N2643 C++ Data-Dependency Ordering: Function Annotation](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2643.html)
- [What does `std::kill_dependency` do, and why would I want to use it? - StackOverflow](http://stackoverflow.com/q/7150395/463412)
- [C++0xのメモリバリアをより深く解説してみる - yamasaのネタ帳](http://d.hatena.ne.jp/bsdhouse/20090929/1254237835)
- [（抄訳）N4215 `memory_order_consume`の利用と実装に向けて［§5-6のみ］](http://d.hatena.ne.jp/yohhoy/20141115/p1)

