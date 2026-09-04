# アトミック操作とvolatileアクセスでの無効なポインタ値の扱いを規定 [P2414R12]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
記憶域の生存期間が終了すると、その記憶域を指していたすべてのポインタ値は無効なポインタ値になる。無効なポインタ値の間接参照は未定義動作であり、読み込み・コピー・比較などそれ以外の使用も処理系定義の動作である。このような無効化は「lifetime-end pointer zap（生存期間終了によるポインタの無効化）」と呼ばれ、記憶域の解放と並行してポインタ値の読み込み・比較を行う、古くから使われてきたロックフリーアルゴリズムと相容れなかった。

C++29では、アトミック操作とvolatileアクセスがこの無効化の影響を受けないことが規定される。アトミックポインタの操作の結果が無効なポインタ値`p`となる場合、その結果は代わりに`reinterpret_cast<T*>(reinterpret_cast<uintptr_t>(p))`となる。この整数への往復変換の結果は、[整数からポインタへの変換の規定](/lang/cpp29/nondeterministic_pointer_provenance.md)によって「プログラムの動作が定義されるポインタ値」が選択されるため、同じアドレスに記憶域が確保し直されていれば、新しいオブジェクトを指す有効なポインタとして扱える。

対象となる典型的なロックフリーアルゴリズムは、次のようなLIFOスタックへの追加操作（LIFO push。1973年以前から使われている）である。

```cpp
template <typename Node>  // Nodeはset_next()メンバ関数を持つ
class LIFOList {
  std::atomic<Node*> top_{nullptr};
public:
  void push(Node* newnode) {
    while (true) {
      Node* oldtop = top_.load();                              // (1)
      newnode->set_next(oldtop);                               // (2)
      if (top_.compare_exchange_weak(oldtop, newnode)) return; // (3)
    }
  }

  Node* pop_all() {
    return top_.exchange(nullptr);
  }
};
```

このコードでは、(1)で先頭ノードへのポインタを読み込んでから(3)で交換を試みるまでの間に、別スレッドが`pop_all()`で全ノードを取り出して`delete`できる。このとき`oldtop`は無効なポインタ値となり、C++26までは、それを(3)の[`compare_exchange_weak()`](/reference/atomic/atomic/compare_exchange_weak.md)の比較に使用する動作を規格が保証していなかった（zapの影響を受けるとアルゴリズムが壊れうる）。

C++29では、アトミック操作を経由するポインタ値は値表現にもとづいて扱われ、無効になっていても比較・交換に使用できる。交換が成功して無効なポインタ値がリストに残った場合でも、それが間接参照されるのは同じアドレスに新しいノードが確保し直された後であり、往復変換の規定によって新しいノードを指す有効なポインタとして扱われるため、このアルゴリズムはコードを変更することなく定義された動作となる。


## 仕様
- アトミックポインタ（[`std::atomic`](/reference/atomic/atomic.md)`<T*>`および[`std::atomic_ref`](/reference/atomic/atomic_ref.md)`<T*>`）に対する操作の結果が、評価の文脈で有効ではないポインタ値`p`となる場合、その結果は代わりに`reinterpret_cast<T*>(reinterpret_cast<uintptr_t>(p))`となる（定数評価中を除く）
    - 比較交換操作で期待値（expected）として参照されたポインタ値にも、この規則が適用される
- volatile修飾されたポインタ型に対する、glvalueからの読み込み（lvalueからrvalueへの変換）および単純代入においても、値が評価の文脈で有効ではないポインタ値である場合、結果は同様に`reinterpret_cast<T*>(reinterpret_cast<std::uintptr_t>(V))`となる
    - デバイスドライバとファームウェアが仮想アドレスをメモリ経由で受け渡すような、volatileの既存の用途を規格上もサポートするためである
- ここで「評価の文脈で有効」とは、そのポインタ値が関数へのポインタもしくはヌルポインタ値であるか、指している記憶域の生存期間内に評価が行われることをいう


## 例
```cpp example
#include <atomic>
#include <iostream>
#include <thread>

struct Node {
  int value;
  Node* next = nullptr;
  void set_next(Node* n) { next = n; }
};

// ロックフリーなLIFOスタック
class LIFOList {
  std::atomic<Node*> top_{nullptr};
public:
  void push(Node* newnode) {
    while (true) {
      Node* oldtop = top_.load();
      newnode->set_next(oldtop);
      if (top_.compare_exchange_weak(oldtop, newnode)) return;
    }
  }

  Node* pop_all() {
    return top_.exchange(nullptr);
  }
};

int main()
{
  LIFOList list;

  // 2つのスレッドが並行してノードを追加する。
  // pop_all()によるノードの解放がpush()と並行して行われても、
  // C++29ではアトミック操作の規定により定義された動作となる
  {
    std::jthread t1{[&] { for (int i = 0; i < 100; i++) list.push(new Node{i}); }};
    std::jthread t2{[&] { for (int i = 0; i < 100; i++) list.push(new Node{i}); }};
  }

  // 追加された全ノードを取り出して破棄する
  int count = 0;
  Node* p = list.pop_all();
  while (p) {
    Node* next = p->next;
    delete p;
    p = next;
    count++;
  }
  std::cout << count << std::endl;
}
```
* top_.load()[link /reference/atomic/atomic/load.md]
* top_.exchange[link /reference/atomic/atomic/exchange.md]
* compare_exchange_weak[link /reference/atomic/atomic/compare_exchange_weak.md]

### 出力
```
200
```


## この機能が必要になった背景・経緯
LIFO pushをはじめとするロックフリーアルゴリズムは、C言語では1980年代初頭から、C++では言語の誕生当初から実装されてきた。一方で、言語としての並行性の導入はC11/C++11と遅く、両者が独立に発展した結果、「解放されたかもしれないオブジェクトへのポインタを読み込み・比較する」という、これらのアルゴリズムが依存する動作の扱いが見落とされていた。

このようなアルゴリズムは膨大な既存コードで数十年にわたって使われており、自動的に検出することも難しいため、既存のソースコードを変更せずに定義された動作とする解決策が必要だった。C++29では、[整数からポインタへの変換の規定](/lang/cpp29/nondeterministic_pointer_provenance.md) (P2434R5) を土台として、アトミック操作とvolatileアクセスに限定して無効なポインタ値を許容する本提案が採用された。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++29 整数からポインタへの変換とポインタの由来の扱いを規定](/lang/cpp29/nondeterministic_pointer_provenance.md)
- [`std::atomic`](/reference/atomic/atomic.md)
- [`std::atomic_ref`](/reference/atomic/atomic_ref.md)
- [`std::uintptr_t`](/reference/cstdint/uintptr_t.md)


## 参照
- [P2414R12 Pointer lifetime-end zap proposed solutions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p2414r12.pdf)
