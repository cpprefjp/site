#shared_ptr
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


###メンバ関数

| | |
|---------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `(constructor)` | 受け取ったポインタ ptr を参照カウンタを使用し管理する。<br/> 削除するためのデリータを引数に指定可能である。<br/> また、`weak_ptr`、`unique_ptr`、`auto_ptr` から構築可能。 |
| `(destructor)` | この時点で他のどこからも参照されていなかった場合、デストラクタはデリータに管理しているインスタンスを渡して削除する |
| `operator=` | 代入された`shared_ptr`、`unique_ptr`、`auto_ptr`の管理するインスタンスを新しく管理する |
| `reset` | 管理していたインスタンスを除外する。<br/> 新しいインスタンスが渡されていればそちらの管理を行う。 |
| `swap` | 他の`shared_ptr`オブジェクトとデータを入れ替える  |
| `get` | 管理しているインスタンスへのポインタを取得する |
| `operator*` | 管理しているインスタンスへの参照を取得する |
| `operator->` | 管理しているインスタンスのメンバにアクセスする |
| `use_count` | 同じインスタンスを所有している`shared_ptr`オブジェクトの数を取得する |
| `unique` | 同じインスタンスを所有している`shared_ptr`が自身だけなら`true`、複数であれば`false`を返す。<br/> `use_count() == 1` |
| `explicit ``operator bool` | インスタンスを所有しているかを判定する |
| `owner_before` | `shared_ptr`で管理しているオブジェクトを連想コンテナで並べ替えるときに使用する |


###メンバ型

| | |
|---------------------------|----------------------------------------------------|
| `element_type` | 管理するインスタンスの型`T` |


###非メンバ関数

| | |
|----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| `operator==` | 等値比較 |
| `operator!=` | 非等値比較 |
| `operator<` | 左辺が右辺より小さいかを判定する |
| `operator<=` | 左辺が右辺以下かを判定する |
| `operator>` | 左辺が右辺より大きいかを判定する |
| `operator>=` | 左辺が右辺以上かを判定する |
| `swap` | 2つの`shared_ptr`オブジェクトを入れ替える |
| [`static_pointer_cast`](/reference/memory/static_pointer_cast.md) | `shared_ptr`の静的キャスト |
| `dynamic_pointer_cast` | `shared_ptr`の動的キャスト |
| `const_pointer_cast` | `shared_ptr`の`const`修飾キャスト |
| [`make_shared`](/reference/memory/make_shared.md) | `shared_ptr`を構築するヘルパ関数 |
| `allocate_shared` | アロケータを指定して`shared_ptr`を構築するヘルパ関数 |


###アトミックアクセス(非メンバ関数)

| | |
|-------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `atomic_is_lock_free` | 指定されたオブジェクトがロックフリーに振る舞うことができるかを調べる |
| `atomic_store` | 値を書き込む |
| `atomic_store_explicit` | メモリオーダーを指定して値を書き込む |
| `atomic_load` | 値を読み込む |
| `atomic_load_explicit` | メモリオーダーを指定して値を読み込む |
| `atomic_exchange` | 値を入れ替える |
| `atomic_exchange_explicit` | メモリオーダーを指定して値を入れ替える |
| `atomic_compare_exchange_weak` | 弱い比較で値の入れ替えを行う |
| `atomic_compare_exchange_strong` | 強い比較で値の入れ替えを行う |
| `atomic_compare_exchange_weak_explicit` | 弱い比較でメモリオーダーを指定して値の入れ替えを行う |
| `atomic_compare_exchange_strong_explicit` | 強い比較でメモリオーダーを指定して値の入れ替えを行う |


###例
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

