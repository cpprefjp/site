# atomic_load_explicit
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]
* cpp20deprecated[meta cpp]
* cpp26removed[meta cpp]

```cpp
namespace std {
  template <class T>
  shared_ptr<T> atomic_load_explicit(const shared_ptr<T>* p, memory_order order);
}
```
* memory_order[link /reference/atomic/memory_order.md]

この関数は、C++20から非推奨となり、C++26で削除された。アトミックアクセスの対象としている`shared_ptr`を[`shared_ptr`に対する`atomic`特殊化](/reference/memory/atomic.md)で置き換えることで同等の機能を使用できる。

## 概要
メモリオーダーを指定して、`shared_ptr`オブジェクトを、アトミックに読み込む。


## 要件
`p != nullptr`であること。

`order`が以下のメモリオーダーではないこと：

- [`memory_order_release`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)


## 戻り値
[`*p`](op_deref.md)相当のことをアトミックに実行して返す。


## 例外
投げない

## 非推奨・削除の詳細

この関数はフリー関数であるため、この関数によってアトミックにアクセスする対象となる`shared_ptr`オブジェクトそのものはどこかに配置されている非アトミックオブジェクトである。そのため、アトミックアクセスしたい文脈の外側から通常のアクセスが可能であり、もし別のスレッドからそのようなアクセスが行われているとこの関数を用いていてもデータ競合を引き起こし未定義動作となる。

すなわち、アトミックにアクセスしたい`shared_ptr`オブジェクトに対する全てのアクセスをプログラマがきちんと管理しなければこの関数の使用は安全ではなく、それはかなり困難であったためこの関数は危険な利用がデフォルトとなっていた。

そのため、この関数（とそのファミリ）は非推奨とされ、代わりに[`shared_ptr`に対する`atomic`特殊化](/reference/memory/atomic.md)が追加された。`shared_ptr`に対する`atomic`特殊化を利用すれば、アトミックにアクセスする対象となる`shared_ptr`オブジェクトそのものをアトミックオブジェクトとすることができるため、どこからアクセスしたとしても全てのアクセスは自動的にアトミックアクセスとなり、前述の問題は回避できる。

この関数から`shared_ptr`に対する`atomic`特殊化に移行する場合は、元のコードでアトミックアクセス対象となっていた`shared_ptr`オブジェクトの型を`std::atomic<std::shared_ptr>`に変更することで移行でき、その場合は`atomic`のために用意されているフリー関数が代わりに使用される（宣言されているヘッダが異なるため、`<atomic>`ヘッダのインクルードが必要となるかもしれない）。

## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p;

  // pにxをアトミックに書き込む
  std::shared_ptr<int> x(new int(3));
  std::atomic_store_explicit(&p, x, std::memory_order_release);

  // pが指すshared_ptrオブジェクトを、アトミックに読み込む
  std::shared_ptr<int> result = std::atomic_load_explicit(
                                    &p, std::memory_order_acquire);
  std::cout << *result << std::endl;
}
```
* std::atomic_load_explicit[color ff0000]
* std::atomic_store_explicit[link atomic_store_explicit.md]

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
- [`atomic_load() - shared_ptr`](atomic_load.md)
- [`atomic_load_explicit() - <atomic>`](/reference/atomic/atomic_load.md)
- [N2674 Shared_ptr atomic access, revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2674.htm)
- [C++0x Shared_ptr atomic access - Faith and Brave - C++で遊ぼう](http://faithandbrave.hateblo.jp/entry/20081015/1224066366)
- [P0718R2 Revising `atomic_shared_ptr` for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0718r2.html)
- [P2869R4 Remove Deprecated `shared_ptr` Atomic Access APIs from C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2869r4.pdf)
