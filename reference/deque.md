# deque
* deque[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator = allocator<T>>
  class deque;
}
```
* allocator[link /reference/memory/allocator.md]

## 概要
`deque`（通常、"デック"のように発音する）は<b>d</b>ouble-<b>e</b>nded <b>q</b>ueue （二重終端キュー）の頭文字をとったものである。double-ended queue はシーケンスコンテナの一種である。要素は厳密な線形シーケンスに従って並べられる。

`deque` はライブラリによってさまざまな方法で実装されるかもしれないが、全ての場合においてランダムアクセスイテレータを介して個々の要素へアクセス可能であり、ストレージは（必要に応じて拡大または縮小して）自動的に処理される。

`deque` シーケンスは以下の特性を持つ。

- 個々の要素はその位置インデックスによってアクセスすることができる。
- 要素のイテレーションは任意の順序で実行することができる。
- 要素はいずれの端（シーケンスの先頭または最後）からも効率よく追加・削除される。

従ってこれは [`vector`](/reference/vector.md) と同様の機能を提供するが、シーケンスの終端だけでなく先頭への効率的な挿入・削除を共に提供する。[`vector`](/reference/vector.md) とは異なる欠点として `deque` は連続した位置のストレージに全ての要素を持つことを保証していないため、ポインタ演算を介しての安全なアクセスの可能性を排除する。

[`vector`](/reference/vector.md) と `deque` は共に類似したインターフェイスを提供するため、類似した目的に利用することができるが、内部的にはかなり異なった方法で動作する。[`vector`](/reference/vector.md) は通常の配列と非常によく似ており、容量が使い果たされるときにはブロック内の全ての要素を再配置することによって拡張する。`deque` は全ての情報を保持しつつ要素への均一なアクセスを提供することで、要素をストレージのいくつかのチャンクに分割することができる。従って `deque` の内部は少し複雑であるが、これは特に大規模なシーケンスにおいて大規模な再配置が回避されることを許すため、一般に容量増加の自動管理を [`vector`](/reference/vector.md) より効率的に行うことを可能にする。


テンプレートパラメータは、以下を意味する：

- `T` : 要素の型。
- `Allocator` : ストレージの割り当てモデルを定義するために使用されるアロケータオブジェクトの型。デフォルトでは、値に依存しない単純なメモリ割り当てモデルを定義する、型 `T` の [`allocator`](/reference/memory/allocator.md) クラステンプレートが使われる。 


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------|-------|
| [`(constructor)`](deque/op_constructor.md)         | コンストラクタ | |
| [`(destructor)`](deque/op_destructor.md)         | デストラクタ   | |
| [`operator=`](deque/op_assign.md)         | 代入演算子     | |
| [`assign`](deque/assign.md)               | コンテナに値を代入する | |
| [`get_allocator`](deque/get_allocator.md) | アロケータオブジェクトを取得する | |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|----------------------------------|----------------------------------|-------|
| [`at`](deque/at.md)            | 任意位置の要素への参照を取得する | |
| [`operator[]`](deque/op_at.md) | 任意位置の要素への参照を取得する | |
| [`front`](deque/front.md)      | 先頭要素への参照を取得する | |
| [`back`](deque/back.md)        | 末尾要素への参照を取得する | |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|---------------------------------|------------------------------------------------------|-------|
| [`begin`](deque/begin.md)     | 先頭要素を指すイテレータの取得する                   | |
| [`end`](deque/end.md)         | 末尾要素の次を指すイテレータを取得する               | |
| [`cbegin`](deque/cbegin.md)   | 先頭要素を指す読み取り専用イテレータを取得する       | C++11 |
| [`cend`](deque/cend.md)       | 末尾要素の次を指す読み取り専用イテレータを取得する   | C++11 |
| [`rbegin`](deque/rbegin.md)   | 末尾要素を指す逆イテレータを取得する                 | |
| [`rend`](deque/rend.md)       | 先頭要素の前を指す逆イテレータを取得する             | |
| [`crbegin`](deque/crbegin.md) | 末尾要素を指す読み取り専用逆イテレータを取得する     | C++11 |
| [`crend`](deque/crend.md)     | 先頭要素の前を指す読み取り専用逆イテレータを取得する | C++11 |


### 領域

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------------------|-------|
| [`empty`](deque/empty.md)                 | コンテナが空であるかどうかを調べる                 | |
| [`size`](deque/size.md)                   | 要素数を取得する                                   | |
| [`max_size`](deque/max_size.md)           | 格納可能な最大の要素数を取得する                   | |
| [`shrink_to_fit`](deque/shrink_to_fit.md) | 利用していないメモリを解放してメモリ使用量を減らす | C++11 |


### コンテナの変更

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|----------------------------------------------------|-------|
| [`clear`](deque/clear.md)                 | 全ての要素を削除する | |
| [`insert`](deque/insert.md)               | 任意の位置に要素を挿入する | |
| [`emplace`](deque/emplace.md)             | 任意の位置に要素を直接構築で挿入する | C++11 |
| [`push_back`](deque/push_back.md)         | 末尾に要素を追加する | |
| [`emplace_back`](deque/emplace_back.md)   | 末尾に要素を直接構築で追加する | C++11 |
| [`pop_back`](deque/pop_back.md)           | 末尾要素を削除する | |
| [`push_front`](deque/push_front.md)       | 先頭に要素を追加する | |
| [`emplace_front`](deque/emplace_front.md) | 先頭に要素を直接構築で追加する | C++11 |
| [`pop_front`](deque/pop_front.md)         | 先頭要素を削除する | |
| [`resize`](deque/resize.md)               | 要素数を変更する | |
| [`erase`](deque/erase.md)                 | 指定した要素を削除する | |
| [`swap`](deque/swap.md)                   | 他の`deque`オブジェクトとデータを入れ替える | |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|-------------|----------------------------------------------------|-------|
| `reference` | `T&` | |
| `const_reference` | `const T&` | |
| `iterator` | イテレータ型。ランダムアクセスイテレータ | |
| `const_iterator` | 読み取り専用イテレータ型ランダムアクセスイテレータ | |
| `size_type` | 符号なし整数型(通常は [`size_t`](/reference/cstddef/size_t.md)) | |
| `difference_type` | 符号付き整数型(通常は [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) | |
| `value_type` | `T` | |
| `allocator_type` | `Allocator` | |
| `pointer` | [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer` | |
| `const_iterator` | [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer` | |
| `reverse_iterator` | 逆イテレータ型 [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | |
| `const_reverse_iterator` | 読み取り専用逆イテレータ型 [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`operator==`](deque/op_equal.md)         | 等値比較 | |
| [`operator!=`](deque/op_not_equal.md)     | 非等値比較 | |
| [`operator<`](deque/op_less.md)           | 左辺が右辺より小さいかの判定を行う | |
| [`operator<=`](deque/op_less_equal.md)    | 左辺が右辺以下かの判定を行う | |
| [`operator>`](deque/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | |
| [`operator>=`](deque/op_greater_equal.md) | 左辺が右辺以上かの判定を行う | |
| [`swap`](deque/swap_free.md)              | 2つの`deque`オブジェクトを入れ替える | |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](deque/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
```cpp example
#include <iostream>
#include <deque>
#include <algorithm>

int main()
{
  std::deque<int> deq;

  deq.push_front(3);  // 先頭に要素を追加
  deq.push_back(1);   // 末尾に要素を追加

  // イテレータを介して全要素に対して操作を行う
  std::for_each(deq.begin(), deq.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::deque[color ff0000]
* deq.push_front[link deque/push_front.md]
* deq.push_back[link deque/push_back.md]
* deq.begin()[link deque/begin.md]
* deq.end()[link deque/end.md]

### 出力
```
3
1
```

## 参照
- [N2669 Thread-Safety in the Standard Library (Rev 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2669.htm)

