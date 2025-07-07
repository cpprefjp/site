# atomic_compare_exchange_weak
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]
* cpp20deprecated[meta cpp]
* cpp26removed[meta cpp]

```cpp
namespace std {
  template<class T>
  bool atomic_compare_exchange_weak(
         shared_ptr<T>* p, shared_ptr<T>* expected, shared_ptr<T> desired);
}
```

この関数は、C++20から非推奨となり、C++26で削除された。アトミックアクセスの対象としている`shared_ptr`を[`shared_ptr`に対する`atomic`特殊化](/reference/memory/atomic.md)で置き換えることで同等の機能を使用できる。

## 概要
弱い比較で、アトミックに`shared_ptr`オブジェクトを入れ替える。


## 要件
- `p != nullptr`であること。
- `expected != nullptr`であること。


## 戻り値
```cpp
atomic_compare_exchange_weak_explicit(
  p,
  expected,
  desired,
  memory_order_seq_cst,
  memory_order_seq_cst)
```
* atomic_compare_exchange_weak_explicit[link atomic_compare_exchange_weak_explicit.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]


## 例外
投げない

## 非推奨・削除の詳細

この関数はフリー関数であるため、この関数によってアトミックにアクセスする対象となる`shared_ptr`オブジェクトそのものはどこかに配置されている非アトミックオブジェクトである。そのため、アトミックアクセスしたい文脈の外側から通常のアクセスが可能であり、もし別のスレッドからそのようなアクセスが行われているとこの関数を用いていてもデータ競合を引き起こし未定義動作を引き起こす。

すなわち、アトミックにアクセスしたい`shared_ptr`オブジェクトに対する全てのアクセスをプログラマがきちんと管理しなければこの関数の使用は安全ではなく、それはかなり困難であったためこの関数は危険な利用がデフォルトとなっていた。

そのため、この関数（とそのファミリ）は非推奨とされ、代わりに[`shared_ptr`に対する`atomic`特殊化](/reference/memory/atomic.md)が追加された。`shared_ptr`に対する`atomic`特殊化を利用すれば、アトミックにアクセスする対象となる`shared_ptr`オブジェクトそのものをアトミックオブジェクトとすることができるため、どこからアクセスしたとしても全てのアクセスは自動的にアトミックアクセスとなり、前述の問題は回避できる。

この関数から`shared_ptr`に対する`atomic`特殊化に移行する場合は、元のコードでアトミックアクセス対象となっていた`shared_ptr`オブジェクトの型を`std::atomic<std::shared_ptr>`に変更することで移行でき、その場合は`atomic`のために用意されているフリー関数が代わりに使用される（宣言されているヘッダが異なるため、`<atomic>`ヘッダのインクルードが必要となるかもしれない）。

## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(1));

  std::shared_ptr<int> ps = p;
  std::shared_ptr<int> q(new int(3));
  while (!std::atomic_compare_exchange_weak(&p, &ps, q)) {}

  std::shared_ptr<int> result = std::atomic_load(&p);
  std::cout << *result << std::endl;
}
```
* std::atomic_compare_exchange_weak[color ff0000]

### 出力
```
3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.3 [mark verified]
- [GCC](/implementation.md#gcc): 5.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 参照
- [`atomic_compare_exchange_weak() - <atomic>`](/reference/atomic/atomic_compare_exchange_weak.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)
- [LWG Issue 2172. Does `atomic_compare_exchange_*` accept `v == nullptr` arguments?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2172)
- [P0718R2 Revising `atomic_shared_ptr` for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0718r2.html)
- [P2869R4 Remove Deprecated `shared_ptr` Atomic Access APIs from C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2869r4.pdf)
