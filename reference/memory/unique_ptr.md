#unique_ptr(C++11)
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
`unique_ptr`は指定されたリソースへのポインタの所有権(ownership)を唯一(unique)持っているように振舞うスマートポインタである。`unique_ptr`はコピー不可能なクラスである。代わりにムーブによって所有権を他の`unique_ptr` へ譲渡することができる。また、[`shared_ptr`](/reference/memory/shared_ptr.md)は`unique_ptr`を受け取るムーブコンストラクタとムーブ代入演算子を持つ。`auto_ptr`では配列を渡すことができなかったが、（正確にはデストラクタで`delete[]`ではなく`delete`が呼び出されるため上手く動作しない）`unique_ptr`では`T[]`時に`delete[]`を呼び出すように[`default_delete`](/reference/memory/default_delete.md)を特殊化することで対応した。`unique_ptr`自体も`T[]`時には特殊化され、`operator[]`によるアクセスを提供している。

##メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------|-------------------------------------------|-------|
| [`(constructor)`](./unique_ptr/unique_ptr.md) | コンストラクタ | C++11 |
| [`(destructor)`](./unique_ptr/-unique_ptr.md) | デストラクタ | C++11 |
| `operator=` | 代入演算子 | C++11 |
| [`release`](./unique_ptr/release.md)         | リソースの所有権を放棄する | C++11 |
| [`reset`](./unique_ptr/reset.md)             | リソースを再初期化する。 | C++11 |
| [`swap`](./unique_ptr/swap.md)               | 他の`unique_ptr`オブジェクトとデータを入れ替える | C++11 |
| [`get`](./unique_ptr/get.md)                 | リソースを取得する | C++11 |
| [`get_deleter`](./unique_ptr/get_deleter.md) | デリータを取得する | C++11 |
| [`operator bool`](./unique_ptr/op_bool.md)   | 有効なリソースを所有しているかを判定する | C++11 |


###単一オブジェクト版(unique_ptr<T>)固有のメンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------|-----------------------|-------|
| `operator*` | 間接参照 | C++11 |
| `operator->` | メンバアクセス | C++11 |


###配列版(unique_ptr<T[ ]>)固有のメンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------|---------------------------------|-------|
| `operator[]` | 任意の位置の要素にアクセス | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|----------------|---------------------------------|-------|
| `pointer`      | 所有するリソースのポインタ型`T*` 。ただし、`deleter_type::pointer` 型が存在する場合はその型になる。 | C++11 |
| `element_type` | 要素型`T` | C++11 |
| `deleter_type` | デリータの型`D` | C++11 |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------|----------------------------------------------|-------|
| `operator==` | 等値比較 | C++11 |
| `operator!=` | 非等値比較 | C++11 |
| `operator<` | 左辺が右辺より小さいかを判定する | C++11 |
| `operator<=` | 左辺が右辺以下かを判定する | C++11 |
| `operator>` | 左辺が右辺より大きいかを判定する | C++11 |
| `operator>=` | 左辺が右辺以上かを判定する | C++11 |
| `swap` | 2つの`unique_ptr`オブジェクトを入れ替える | C++11 |


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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.4, 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0


###参照

