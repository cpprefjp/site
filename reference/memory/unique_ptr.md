#unique_ptr
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // 単一オブジェクト版
  template <class T, class D = std::default_delete<T>>
  class unique_ptr;

  // 配列版
  template <class T, class D>
  class unique_ptr<T[], D>;
}
```
* default_delete[link /reference/memory/default_delete.md]

##概要
`unique_ptr`は指定されたリソースへのポインタの所有権(ownership)を唯一(unique)持っているように振舞うスマートポインタである。`auto_ptr`を置き換えるものとしてC++に追加された。

`unique_ptr`はコピー不可能なクラスである。代わりにムーブによって所有権を他の`unique_ptr` へ譲渡することができる。また、[`shared_ptr`](/reference/memory/shared_ptr.md)は`unique_ptr`を受け取るムーブコンストラクタとムーブ代入演算子を持つ。

`new[]`演算子で作成された配列へのポインタにも対応している。

- `T[]`時に`delete[]`を呼び出すように[`default_delete`](/reference/memory/default_delete.md)を特殊化している。`auto_ptr`では配列を渡すことができなかった（正確にはデストラクタで`delete[]`ではなく`delete`が呼び出されるため上手く動作しない）。
- `unique_ptr`自体も`T[]`時には部分特殊化され、`operator[]`によるアクセスを提供している。


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|--------------------------------------------------|-------|
| [`(constructor)`](unique_ptr/op_constructor.md) | コンストラクタ                               | C++11 |
| [`(destructor)`](unique_ptr/op_destructor.md) | デストラクタ                                   | C++11 |
| [`operator=`](unique_ptr/op_assign.md)      | 代入演算子                                       | C++11 |
| [`release`](unique_ptr/release.md)          | リソースの所有権を放棄する                       | C++11 |
| [`reset`](unique_ptr/reset.md)              | リソースの所有権を放棄し、新たなリソースの所有権を設定する | C++11 |
| [`swap`](unique_ptr/swap.md)                | 他の`unique_ptr`オブジェクトとデータを入れ替える | C++11 |
| [`get`](unique_ptr/get.md)                  | リソースを取得する                               | C++11 |
| [`get_deleter`](unique_ptr/get_deleter.md)  | デリータを取得する                               | C++11 |
| [`operator bool`](unique_ptr/op_bool.md)    | 有効なリソースを所有しているかを判定する         | C++11 |


###単一オブジェクト版(unique_ptr<T>)固有のメンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|----------------|-------|
| [`operator*`](unique_ptr/op_deref.md)  | 間接参照       | C++11 |
| [`operator->`](unique_ptr/op_arrow.md) | メンバアクセス | C++11 |


###配列版(unique_ptr<T[ ]>)固有のメンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|----------------------------|-------|
| [`operator[]`](unique_ptr/op_at.md) | 任意の位置の要素にアクセス | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------|---------------------------------|-------|
| `pointer`      | 所有するリソースのポインタ型`T*` 。ただし、`deleter_type::pointer` 型が存在する場合はその型になる。 | C++11 |
| `element_type` | 要素型`T` | C++11 |
| `deleter_type` | デリータの型`D` | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|-------------------------------------------|-------|
| [`operator==`](unique_ptr/op_equal.md)         | 等値比較                                  | C++11 |
| [`operator!=`](unique_ptr/op_not_equal.md)     | 非等値比較                                | C++11 |
| [`operator<`](unique_ptr/op_less.md)           | 左辺が右辺より小さいかを判定する          | C++11 |
| [`operator<=`](unique_ptr/op_less_equal.md)    | 左辺が右辺以下かを判定する                | C++11 |
| [`operator>`](unique_ptr/op_greater.md)        | 左辺が右辺より大きいかを判定する          | C++11 |
| [`operator>=`](unique_ptr/op_greater_equal.md) | 左辺が右辺以上かを判定する                | C++11 |
| [`swap`](unique_ptr/swap_free.md)              | 2つの`unique_ptr`オブジェクトを入れ替える | C++11 |
| [`make_unique`](make_unique.md)                | `unique_ptr`を構築するヘルパ関数          | C++14 |

##ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------------|------------------------------------------|-------|
| `template <class T> struct hash;`                         | `hash`クラスの先行宣言                   | C++11 |
| `template <class T, class D> struct hash<unique_ptr<N>>;` | `hash`クラスの`unique_ptr`に対する特殊化 | C++11 |


##例
```cpp
#include <memory>
#include <iostream>

struct hoge {
  hoge() { std::cout << "hoge::hoge()" << std::endl; };
  ~hoge() { std::cout << "hoge::~hoge()" << std::endl; };
};

int main() {
  std::unique_ptr<hoge> p0(new hoge());

  // hogeオブジェクトの所有権をp0からp1に移動
  // p0は何も所有していない状態になる
  std::unique_ptr<hoge> p1(std::move(p0));

  if (p0) {
    abort();
  }

  // p1が所有しているリソースが解放される
}
```

###出力
```
hoge::hoge()
hoge::~hoge()
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.4, 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照
- [Rvalue Reference Recommendations for Chapter 20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1856.html)
    - `unique_ptr`の追加と`auto_ptr`の非推奨が提案された文書。
- [LWG Issue 673. `unique_ptr` update](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#672)
    - `unique_ptr<void, Deleter>`を許可するために、インタフェースを改良した経緯
- [LWG Issue 762. `std::unique_ptr` requires complete type?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#762)

