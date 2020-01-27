# shared_ptr
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  class shared_ptr;
}
```

## 概要
`shared_ptr`は、指定されたリソースへの所有権(ownership)を共有(share)するスマートポインタである。

複数の`shared_ptr`オブジェクトが同じリソースを共有し、所有者が0人、つまりどの`shared_ptr`オブジェクトからもリソースが参照されなくなると、リソースが自動的に解放される。

### 参照カウント
`shared_ptr`は「参照カウント(reference count)」によって実装される。

`shared_ptr`オブジェクトのコピー構築、コピー代入が行われるとカウントが1増える。デストラクタが実行されるとカウントが1減る。そしてカウントが0になると、自動的に「`delete p;`」が実行され、リソースが解放される。


### スレッド安全性
`shared_ptr`の参照カウンタはスレッドセーフである。つまり、スレッドを跨いで`shared_ptr`をコピーし、リソースを共有することが安全にできる。

非スレッドセーフに参照カウントを増減させる方法はない。シングルスレッドでのパフォーマンスが重要で、スレッドセーフであることによるオーバーヘッドが問題になる場合、ムーブを活用すればパフォーマンスを改善できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|--------------------------------------------------|-------|
| [`(constructor)`](shared_ptr/op_constructor.md) | コンストラクタ                                | C++11 |
| [`(destructor)`](shared_ptr/op_destructor.md) | デストラクタ                                    | C++11 |
| [`operator=`](shared_ptr/op_assign.md)       | 代入演算�                                       | C++11 |
| [`reset`](shared_ptr/reset.md)               | 所有権を放棄し、新たな所有権を�定する           | C++11 |
| [`swap`](shared_ptr/swap.md)                 | 他の`shared_ptr`オブジェクトとデータを入れ替える | C++11 |
| [`get`](shared_ptr/get.md)                   | リソースを取得する                               | C++11 |
| [`operator*`](shared_ptr/op_deref.md)        | 間接参照                                         | C++11 |
| [`operator->`](shared_ptr/op_arrow.md)       | メンバアクセス                                   | C++11 |
| [`operator[]`](shared_ptr/op_at.md)          | 添�による要素アクセス                           | C++17 |
| [`use_count`](shared_ptr/use_count.md)       | 所有権を持つユーザー数を取得する                 | C++11 |
| [`unique`](shared_ptr/unique.md)             | 所有権を持つユーザーが一人だけかを判定する       | C++11<br/> C++17から非推奨<br/> C++20で削除 |
| [`operator bool`](shared_ptr/op_bool.md)     | 有効なリソースを所有しているかを判定する         | C++11 |
| [`owner_before`](shared_ptr/owner_before.md) | 所有権ベースでの小なり比較を行う                 | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------|-----------------------------|-------|
| `element_type` | 管理するインスタンスの型<br/> C++11 : `T`<br/> C++17 : [`remove_extent_t`](/reference/type_traits/remove_extent.md)`<T>` | C++11 |
| `weak_type`    | 弱参照ポインタの型[`weak_ptr`](weak_ptr.md)`<T>` | C++17 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------------|-------------------------------------------|-------|
| [`operator==`](shared_ptr/op_equal.md)                       | �値比較                                  | C++11 |
| [`operator!=`](shared_ptr/op_not_equal.md)                   | 非�値比較                                | C++11 |
| [`operator<`](shared_ptr/op_less.md)                         | 左辺が右辺より小さいかを判定する          | C++11 |
| [`operator<=`](shared_ptr/op_less_equal.md)                  | 左辺が右辺以下かを判定する                | C++11 |
| [`operator>`](shared_ptr/op_greater.md)                      | 左辺が右辺より大きいかを判定する          | C++11 |
| [`operator>=`](shared_ptr/op_greater_equal.md)               | 左辺が右辺以上かを判定する                | C++11 |
| [`swap`](shared_ptr/swap_free.md)                            | 2つの`shared_ptr`オブジェクトを入れ替える | C++11 |
| [`get_deleter`](shared_ptr/get_deleter.md)                   | デリータを取得する                        | C++11 |
| [`operator<<`](shared_ptr/op_ostream.md)                     | ストリームへの出力                        | C++11 |
| [`static_pointer_cast`](shared_ptr/static_pointer_cast.md)   | `shared_ptr`の静的�ャスト                | C++11 |
| [`dynamic_pointer_cast`](shared_ptr/dynamic_pointer_cast.md) | `shared_ptr`の動的�ャスト                | C++11 |
| [`const_pointer_cast`](shared_ptr/const_pointer_cast.md)     | `shared_ptr`の`const`修飾�ャスト         | C++11 |
| [`reinterpret_pointer_cast`](shared_ptr/reinterpret_pointer_cast.md) | `shared_ptr`の再解釈�ャスト      | C++17 |
| [`make_shared`](make_shared.md)                              | `shared_ptr`を構築するヘルパ関数          | C++11 |
| [`allocate_shared`](allocate_shared.md)                      | ア�ケータを指定して`shared_ptr`を構築するヘルパ関数 | C++11 |


## アトミックアクセス(非メンバ関数)

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|--------------------------------------------------|-------|
| [`atomic_is_lock_free`][is_lock_free]     | 指定されたオブジェクトが�ックフリーに振る舞えるかを調べる | C++11 |
| [`atomic_store`][store]                   | 値を書き込む | C++11 |
| [`atomic_store_explicit`][store_ex]       | メモリオーダーを指定して値を書き込む | C++11 |
| [`atomic_load`][load]                     | 値を�み込む | C++11 |
| [`atomic_load_explicit`][load_ex]         | メモリオーダーを指定して値を�み込む | C++11 |
| [`atomic_exchange`][exchange]             | 値を入れ替える | C++11 |
| [`atomic_exchange_explicit`][exchange_ex] | メモリオーダーを指定して値を入れ替える | C++11 |
| [`atomic_compare_exchange_weak`][exchange_weak] | 弱い比較で値の入れ替えを行う | C++11 |
| [`atomic_compare_exchange_strong`][exchange_strong] | 強い比較で値の入れ替えを行う | C++11 |
| [`atomic_compare_exchange_weak_explicit`][exchange_weak_ex] | 弱い比較でメモリオーダーを指定して値の入れ替えを行う | C++11 |
| [`atomic_compare_exchange_strong_explicit`][exchange_strong_ex] | 強い比較でメモリオーダーを指定して値の入れ替えを行う | C++11 |

[is_lock_free]: shared_ptr/atomic_is_lock_free.md
[store]: shared_ptr/atomic_store.md
[store_ex]: shared_ptr/atomic_store_explicit.md
[load]: shared_ptr/atomic_load.md
[load_ex]: shared_ptr/atomic_load_explicit.md
[exchange]: shared_ptr/atomic_exchange.md
[exchange_ex]: shared_ptr/atomic_exchange_explicit.md
[exchange_weak]: shared_ptr/atomic_compare_exchange_weak.md
[exchange_strong]: shared_ptr/atomic_compare_exchange_strong.md
[exchange_weak_ex]: shared_ptr/atomic_compare_exchange_weak_explicit.md
[exchange_strong_ex]: shared_ptr/atomic_compare_exchange_strong_explicit.md


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|------------------------------------------|-------|
| `template <class T> struct hash;`                | `hash`クラスの先行宣言                   | C++11 |
| `template <class T> struct hash<shared_ptr<T>>;` | `hash`クラスの`shared_ptr`に対する特殊化 | C++11 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](shared_ptr/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
### shared_ptrの基本的な使い方
```cpp example
#include <iostream>
#include <memory>

int main()
{
  // newしたポインタをshared_ptrオブジェクトに管理させる
  // 所有者は1人。
  std::shared_ptr<int> p1(new int(3));

  {
    // shared_ptrオブジェクトをコピーすることで、
    // 複数のオブジェクトが一つのリソースを共有できる。
    // 所有者が2人になる。
    std::shared_ptr<int> p2 = p1;

    // 共有しているリソースにアクセスする
    std::cout << *p2 << std::endl;
  } // p2のデストラクタが実行される。
    // リソースの所有者が1人になる。
    // ここではまだ、リソースは解放されない。

  std::cout << *p1 << std::endl;
} // p1のデストラクタが実行される。
  // リソースの所有者が0人になる。
  // 誰もリソースを参照しなくなったので、リソースが解放される。
```
* std::shared_ptr[color ff0000]

#### 出力
```
3
3
```


### shared_ptr<void>に、あらゆる型のポインタを格納する
`void`をテンプレート引数とする`shared_ptr`に対してどんな型のポインタを代入したとしても、代入した型のデストラクタは、�しく実行される。通常、`void*`に型変換して代入されたポインタは、`delete`演算�を呼んだとしても元の型のデストラクタは呼び出されない。しかし`shared_ptr`の場合は、代入されたポインタの型が持つデストラクタが�しく実行されることが保証される。保証の文面は[デストラクタ](shared_ptr/op_destructor.md)のページを参照。

```cpp example
#include <iostream>
#include <memory>

struct X {
  ~X()
  {
    std::cout << "X dtor" << std::endl;
  }
};

struct Y {
  ~Y()
  {
    std::cout << "Y dtor" << std::endl;
  }
};

int main()
{
  std::shared_ptr<void> p(new X());

  std::cout << 0 << std::endl;

  p.reset(new Y()); // Xが破棄される

  std::cout << 1 << std::endl;
} // Yが破棄される
```
* std::shared_ptr[color ff0000]

### 出力
```
0
X dtor
1
Y dtor
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013


## 関連項目
- [`std::enable_shared_from_this`](enable_shared_from_this.md)
    - `this`ポインタを`shared_ptr`として使用する場合は、この機能を使用する
- [`std::unique_ptr`](unique_ptr.md)
    - 所有権を共有する必要がない場合は、この機能を使用する


## 参照
- [動的削除� (dynamic deleter) - 意外と知られていない？ `boost::shared_ptr` の側面](http://d.hatena.ne.jp/Cryolite/20060108#p1)
- [P0163R0 `shared_ptr::weak_type`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0163r0.html)
- [P0414R1 Merging `shared_ptr` changes from Library Fundamentals to C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0414r1.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
