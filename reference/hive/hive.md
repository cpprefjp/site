# hive
* hive[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator = allocator<T>>
  class hive;

  namespace pmr {
    template <class T>
    using hive = std::hive<T, polymorphic_allocator<T>>;
  }
}
```
* allocator[link /reference/memory/allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]

## 概要
`std::hive`クラスは、要素のメモリ位置が安定したシーケンスコンテナである。要素の挿入と削除を定数時間で行いつつ、削除されなかった要素へのポインタ・参照・イテレータを無効化しない。

要素は複数のメモリブロック（要素ブロック、element block）に格納される。削除された要素の位置は、後続の要素を移動させる代わりに、定数時間の手法によってイテレーション時にスキップされる。削除によって空になった要素ブロックは、解放されるか、再利用のために予約ブロックとして保持される。

挿入位置はコンテナが決定し、削除された要素のメモリ位置が再利用されることがある。このため、`std::hive`クラスは要素の順序を指定した挿入をサポートしない（順序は未規定である）。この性質により、`std::hive`クラスは[`std::list`](/reference/list/list.md)クラスよりもキャッシュ効率のよいメモリレイアウトと高速なイテレーションを実現しつつ、[`std::vector`](/reference/vector/vector.md)クラスとは異なり要素の挿入・削除でポインタ・参照が無効化されない。

テンプレートパラメータは、以下を意味する：

- `T`: 格納される要素の型
- `Allocator`: メモリ確保に使用されるアロケータの型。デフォルトでは標準の[`std::allocator`](/reference/memory/allocator.md)クラスが使用される。


## この機能が必要になった背景・経緯
ゲーム開発やシミュレーション、GUIなどの分野では、多数のオブジェクトを頻繁に生成・破棄しながら、それらのオブジェクトを互いにポインタや参照で参照し合うことが多い。このような用途では、次の性質を同時に満たすコンテナが求められる。

- 要素の挿入・削除が高速（定数時間）であること
- 既存の要素へのポインタ・参照・イテレータが、他の要素の挿入・削除によって無効化されないこと
- イテレーションがキャッシュ効率よく行えること

[`std::vector`](/reference/vector/vector.md)は連続したメモリにより高速なイテレーションが可能だが、再確保や要素の削除によってポインタ・参照が無効化される。[`std::list`](/reference/list/list.md)や[`std::forward_list`](/reference/forward_list/forward_list.md)は挿入・削除でポインタ・参照が無効化されないが、要素ごとにノードを個別確保するためイテレーションのキャッシュ効率が悪い。

`std::hive`クラスは、複数の要素ブロックに要素をまとめて格納し、削除された位置をスキップすることで、これらの要求を同時に満たす。この設計は、以前は「colony」という名称でBoost C++ Libraries等で提供されていたデータ構造をC++標準ライブラリに導入したものである。


## メンバ関数
### 構築／コピー／破棄

| 名前                                      | 説明                        | 対応バージョン |
|-------------------------------------------|-----------------------------|----------------|
| [`(constructor)`](hive/op_constructor.md) | コンストラクタ              | C++26          |
| [`(destructor)`](hive/op_destructor.md)   | デストラクタ                | C++26          |
| [`operator=`](hive/op_assign.md)          | 代入演算子                  | C++26          |
| [`assign`](hive/assign.md)                | コンテナに値を代入する    | C++26          |
| [`assign_range`](hive/assign_range.md)    | コンテナにRangeを代入する | C++26          |
| [`get_allocator`](hive/get_allocator.md)  | アロケータを取得する        | C++26          |

### イテレータ

| 名前                         | 説明                                             | 対応バージョン |
|------------------------------|--------------------------------------------------|----------------|
| [`begin`](hive/begin.md)     | 先頭要素を指すイテレータを取得する               | C++26          |
| [`end`](hive/end.md)         | 末尾の次を指すイテレータを取得する               | C++26          |
| [`cbegin`](hive/cbegin.md)   | 先頭要素を指す読み取り専用イテレータを取得する   | C++26          |
| [`cend`](hive/cend.md)       | 末尾の次を指す読み取り専用イテレータを取得する   | C++26          |
| [`rbegin`](hive/rbegin.md)   | 末尾要素を指す逆イテレータを取得する             | C++26          |
| [`rend`](hive/rend.md)       | 先頭の前を指す逆イテレータを取得する             | C++26          |
| [`crbegin`](hive/crbegin.md) | 末尾要素を指す読み取り専用逆イテレータを取得する | C++26          |
| [`crend`](hive/crend.md)     | 先頭の前を指す読み取り専用逆イテレータを取得する | C++26          |

### 領域

| 名前                                                     | 説明                                                   | 対応バージョン |
|----------------------------------------------------------|--------------------------------------------------------|----------------|
| [`empty`](hive/empty.md)                                 | コンテナが空かどうかを判定する                         | C++26          |
| [`size`](hive/size.md)                                   | 要素数を取得する                                       | C++26          |
| [`max_size`](hive/max_size.md)                           | 格納可能な最大の要素数を取得する                       | C++26          |
| [`capacity`](hive/capacity.md)                           | 要素ブロックを追加確保せずに保持できる要素数を取得する | C++26          |
| [`reserve`](hive/reserve.md)                             | 指定した要素数を格納できるよう容量を確保する           | C++26          |
| [`shrink_to_fit`](hive/shrink_to_fit.md)                 | 容量を要素数に近づける                                 | C++26          |
| [`trim_capacity`](hive/trim_capacity.md)                 | 予約ブロックを解放して容量を削減する                   | C++26          |
| [`block_capacity_limits`](hive/block_capacity_limits.md) | 要素ブロックの容量制限を取得する                       | C++26          |
| [`reshape`](hive/reshape.md)                             | 要素ブロックの容量制限を変更する                       | C++26          |

### 変更

| 名前                                   | 説明                                     | 対応バージョン |
|----------------------------------------|------------------------------------------|----------------|
| [`emplace`](hive/emplace.md)           | 要素を直接構築で挿入する                 | C++26          |
| [`emplace_hint`](hive/emplace_hint.md) | ヒント付きで要素を直接構築で挿入する     | C++26          |
| [`insert`](hive/insert.md)             | 要素を挿入する                           | C++26          |
| [`insert_range`](hive/insert_range.md) | Rangeの要素を挿入する                    | C++26          |
| [`erase`](hive/erase.md)               | 要素を削除する                           | C++26          |
| [`swap`](hive/swap.md)                 | 他の`hive`オブジェクトと内容を入れ替える | C++26          |
| [`clear`](hive/clear.md)               | 全要素を削除する                         | C++26          |

### `hive`操作

| 名前                                   | 説明                                     | 対応バージョン |
|----------------------------------------|------------------------------------------|----------------|
| [`splice`](hive/splice.md)             | 他の`hive`の全要素を移動して連結する     | C++26          |
| [`unique`](hive/unique.md)             | 連続した重複要素を削除する               | C++26          |
| [`sort`](hive/sort.md)                 | 要素を並べ替える                         | C++26          |
| [`get_iterator`](hive/get_iterator.md) | 要素へのポインタからイテレータを取得する | C++26          |

## 静的メンバ関数

| 名前                                                                    | 説明                                             | 対応バージョン |
|-------------------------------------------------------------------------|--------------------------------------------------|----------------|
| [`block_capacity_default_limits`](hive/block_capacity_default_limits.md) | 処理系のデフォルトの容量制限を取得する         | C++26          |
| [`block_capacity_hard_limits`](hive/block_capacity_hard_limits.md)       | 処理系のハード制限を取得する                   | C++26          |
| [`is_within_hard_limits`](hive/is_within_hard_limits.md)                 | 指定した容量制限がハード制限の範囲内か判定する | C++26          |

## メンバ型

| 名前                     | 説明                                                              | 対応バージョン |
|--------------------------|-------------------------------------------------------------------|----------------|
| `value_type`             | 要素の型`T`                                                       | C++26          |
| `allocator_type`         | アロケータの型`Allocator`                                         | C++26          |
| `pointer`                | 要素へのポインタ型 `allocator_traits<Allocator>::pointer`         | C++26          |
| `const_pointer`          | 要素への`const`ポインタ型 `allocator_traits<Allocator>::const_pointer` | C++26     |
| `reference`              | 要素への参照型 `value_type&`                                      | C++26          |
| `const_reference`        | 要素への`const`参照型 `const value_type&`                         | C++26          |
| `size_type`              | 要素数を表す符号なし整数型 (処理系定義)                           | C++26          |
| `difference_type`        | 要素間の距離を表す符号付き整数型 (処理系定義)                     | C++26          |
| `iterator`               | 双方向イテレータ (処理系定義)                                     | C++26          |
| `const_iterator`         | 読み取り専用双方向イテレータ (処理系定義)                         | C++26          |
| `reverse_iterator`       | 逆順双方向イテレータ [`reverse_iterator<iterator>`](/reference/iterator/reverse_iterator.md) | C++26 |
| `const_reverse_iterator` | 読み取り専用逆順双方向イテレータ [`reverse_iterator<const_iterator>`](/reference/iterator/reverse_iterator.md) | C++26 |

## 非メンバ関数

| 名前                                | 説明                                | 対応バージョン |
|-------------------------------------|-------------------------------------|----------------|
| [`swap`](hive/swap_free.md)         | 2つの`hive`オブジェクトを入れ替える | C++26          |
| [`erase`](hive/erase_free.md)       | 指定した値の要素を削除する          | C++26          |
| [`erase_if`](hive/erase_if_free.md) | 条件を満たす要素を削除する          | C++26          |

## 推論補助

| 名前                                        | 説明                                 | 対応バージョン |
|---------------------------------------------|--------------------------------------|----------------|
| [`(deduction_guide)`](hive/op_deduction_guide.md) | クラステンプレートの推論補助 | C++26          |


## 例
### 基本的な使い方
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h;

  // 要素を挿入する。挿入位置はコンテナが決定する
  h.insert(1);
  h.insert(2);
  h.insert(3);

  // 要素を順番に出力する
  for (int x : h) {
    std::print("{} ", x);
  }
  std::println("");

  std::println("size = {}", h.size());
}
```
* std::hive[color ff0000]
* h.insert[link hive/insert.md]
* h.size()[link hive/size.md]

#### 出力例
```
1 2 3 
size = 3
```

### 要素のポインタ・参照が安定していることを利用する
`std::hive`の最大の特徴は、要素の挿入・削除によって、削除されなかった要素へのポインタ・参照・イテレータが無効化されないことである。多数のオブジェクトを動的に生成・破棄しつつ、それらを互いにポインタで参照し合うような状況で有用となる。

```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h;

  // 要素を挿入し、そのポインタを保持しておく
  int* p = &*h.insert(42);

  // 別の要素のイテレータも保持しておく
  auto other = h.insert(99);

  // 大量の要素を追加しても、既存要素へのポインタは無効化されない
  // (std::vectorでは再確保によってpが無効化されうる)
  for (int i = 0; i < 10000; ++i) {
    h.insert(i);
  }
  std::println("{}", *p); // 42

  // 任意の要素を定数時間で削除でき、他の要素のポインタ・イテレータは無効化されない
  // (std::vectorのeraseは後続要素を移動させ、ポインタを無効化する)
  h.erase(other);
  std::println("{}", *p); // 42（削除したのは別の要素なので有効なまま）
}
```
* std::hive[color ff0000]
* h.insert[link hive/insert.md]
* h.erase[link hive/erase.md]

#### 出力
```
42
42
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::list`](/reference/list/list.md)
- [`std::forward_list`](/reference/forward_list/forward_list.md)
- [`std::deque`](/reference/deque/deque.md)
- [`std::vector`](/reference/vector/vector.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
