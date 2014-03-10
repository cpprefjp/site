#shared_ptr(C++11)
```cpp
namespace std {
  template <class T>
  class shared_ptr;
}
```

##概要
`shared_ptr`はオブジェクトのライフタイムを管理するスマートポインタである。 
`shared_ptr`はコピーに対応しており、`shared_ptr`自身が一体いくつの変数から自身が管理するインスタンスを参照しているのかをカウントしている。 
このカウントが 0 になる、つまりどの変数からも参照されなくなった瞬間、`shared_ptr`は自身が管理していたインスタンスをデリータによって削除する。 
`shared_ptr`は非常に有用だが、循環参照が発生した場合、正しくインスタンスを削除することができなくなってしまう。 
これは `weak_ptr`クラスと併用することで解決できることがある。


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|--------------------------------------------------|-------|
| [`(constructor)`](./shared_ptr/shared_ptr.md)  | コンストラクタ                                   | C++11 |
| [`(destructor)`](./shared_ptr/-shared_ptr.md)  | デストラクタ                                     | C++11 |
| [`operator=`](./shared_ptr/op_assign.md)       | 代入演算子                                       | C++11 |
| [`reset`](./shared_ptr/reset.md)               | 所有権を放棄し、新たな所有権を設定する           | C++11 |
| [`swap`](./shared_ptr/swap.md)                 | 他の`shared_ptr`オブジェクトとデータを入れ替える | C++11 |
| [`get`](./shared_ptr/get.md)                   | リソースを取得する                               | C++11 |
| [`operator*`](./shared_ptr/op_deref.md)        | 間接参照                                         | C++11 |
| [`operator->`](./shared_ptr/op_arrow.md)       | メンバアクセス                                   | C++11 |
| [`use_count`](./shared_ptr/use_count.md)       | 所有権を持つユーザー数を取得する                 | C++11 |
| [`unique`](./shared_ptr/unique.md)             | 所有権を持つユーザーが一人だけかを判定する       | C++11 |
| [`operator bool`](./shared_ptr/op_bool.md)     | 有効なリソースを所有しているかを判定する         | C++11 |
| [`owner_before`](./shared_ptr/owner_before.md) | 所有権ベースでの小なり比較を行う                 | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------|-----------------------------|-------|
| `element_type` | 管理するインスタンスの型`T` | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------------|-------------------------------------------|-------|
| [`operator==`](./shared_ptr/op_equal.md)                       | 等値比較                                  | C++11 |
| [`operator!=`](./shared_ptr/op_not_equal.md)                   | 非等値比較                                | C++11 |
| [`operator<`](./shared_ptr/op_less.md)                         | 左辺が右辺より小さいかを判定する          | C++11 |
| [`operator<=`](./shared_ptr/op_less_equal.md)                  | 左辺が右辺以下かを判定する                | C++11 |
| [`operator>`](./shared_ptr/op_greater.md)                      | 左辺が右辺より大きいかを判定する          | C++11 |
| [`operator>=`](./shared_ptr/op_greater_equal.md)               | 左辺が右辺以上かを判定する                | C++11 |
| [`swap`](./shared_ptr/swap_free.md)                            | 2つの`shared_ptr`オブジェクトを入れ替える | C++11 |
| `get_deleter`                                                  | デリータを取得する                        | C++11 |
| `operator<<`                                                   | ストリームへの出力                        | C++11 |
| [`static_pointer_cast`](./shared_ptr/static_pointer_cast.md)   | `shared_ptr`の静的キャスト                | C++11 |
| [`dynamic_pointer_cast`](./shared_ptr/dynamic_pointer_cast.md) | `shared_ptr`の動的キャスト                | C++11 |
| [`const_pointer_cast`](./shared_ptr/const_pointer_cast.md)     | `shared_ptr`の`const`修飾キャスト         | C++11 |
| [`make_shared`](./shared_ptr/make_shared.md)                   | `shared_ptr`を構築するヘルパ関数          | C++11 |
| [`allocate_shared`](./shared_ptr/allocate_shared.md)           | アロケータを指定して`shared_ptr`を構築するヘルパ関数 | C++11 |


##アトミックアクセス(非メンバ関数)

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|--------------------------------------------------|-------|
| [`atomic_is_lock_free`](./shared_ptr/atomic_is_lock_free.md) | 指定されたオブジェクトがロックフリーに振る舞うことができるかを調べる | C++11 |
| [`atomic_store`](./shared_ptr/atomic_store.md)               | 値を書き込む | C++11 |
| `atomic_store_explicit`                   | メモリオーダーを指定して値を書き込む | C++11 |
| `atomic_load`                             | 値を読み込む | C++11 |
| `atomic_load_explicit`                    | メモリオーダーを指定して値を読み込む | C++11 |
| `atomic_exchange`                         | 値を入れ替える | C++11 |
| `atomic_exchange_explicit`                | メモリオーダーを指定して値を入れ替える | C++11 |
| `atomic_compare_exchange_weak`            | 弱い比較で値の入れ替えを行う | C++11 |
| `atomic_compare_exchange_strong`          | 強い比較で値の入れ替えを行う | C++11 |
| `atomic_compare_exchange_weak_explicit`   | 弱い比較でメモリオーダーを指定して値の入れ替えを行う | C++11 |
| `atomic_compare_exchange_strong_explicit` | 強い比較でメモリオーダーを指定して値の入れ替えを行う | C++11 |


##ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|------------------------------------------|-------|
| `template <class T> struct hash;`                | `hash`クラスの先行宣言                   | C++11 |
| `template <class T> struct hash<shared_ptr<N>>;` | `hash`クラスの`shared_ptr`に対する特殊化 | C++11 |


##例
```cpp
#include <memory>
#include <iostream>
 
std::unique_ptr<int> make_instance()
{
  return std::unique_ptr<int>(new int(42));
}
 
int main()
{
  auto dp = make_instance();
 
  // unique_ptrから構築
  std::shared_ptr<int> sp1(std::move(dp));
 
  if(sp1) {
    std::cout << "sp1 address : " << sp1 << std::endl;
  }
 
  std::shared_ptr<int> sp2(sp1);
  if(sp2 && !sp2.unique()) {
    std::cout << "sp2 address : " << sp2 << std::endl;
  }
 
  sp1.reset();
  if(sp2) {
    std::cout << "value = " << *sp2 << std::endl;
  }
}
```

###出力例
```
sp1 address : 0x8b85008
sp2 address : 0x8b85008
value = 42
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.4(used boost::shared_ptr code)
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 10.0

