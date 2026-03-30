# inplace_vector
* inplace_vector[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, std::size_t N>
  class inplace_vector;
}
```

## 概要
`inplace_vector`はシーケンスコンテナの一種で、各要素は線形に、順序を保ったまま格納される。

`inplace_vector`は容量をコンパイル時定数`N`で固定する可変長配列として実装される。[`std::vector`](/reference/vector/vector.md)と異なり、要素はオブジェクト自身の内部ストレージ（スタック領域）に直接格納され、動的メモリ確保を一切行わない。容量は最大`N`要素であり、実行時にこれを超えて拡張することはできない。

`inplace_vector`は連続コンテナ (contiguous container) であり、要素は隣接するメモリ上に配置される。添字による要素のランダムアクセスもできる。

[`std::array`](/reference/array/array.md)との主な違いは、`inplace_vector`は要素数が可変であること、つまりデフォルト構築時に空であり、要素の追加・削除ができる点である。[`std::vector`](/reference/vector/vector.md)との主な違いは、ヒープではなくスタック配列であり、容量がコンパイル時に固定される点と、ムーブ・[`swap`](inplace_vector/swap.md)操作の計算量が[`std::array`](/reference/array/array.md)と同様に要素数に対して線形時間であり全イテレータが無効化される点である。

`is_trivially_copyable_v<T>`が`true`であるか、`N == 0`である場合、`inplace_vector<T, N>`自身もトリビアルにコピー可能である。

容量`N`が`0`の場合、`inplace_vector<T, 0>`は空の型 ([`is_empty_v`](/reference/type_traits/is_empty.md)が`true`) となる。

サイズが`N`を超える操作（[`push_back()`](inplace_vector/push_back.md)や[`insert()`](inplace_vector/insert.md)など）は[`std::bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。容量超過時に例外ではなく戻り値で失敗を通知する失敗許容API (fallible API)（[`try_push_back()`](inplace_vector/try_push_back.md)、[`try_emplace_back()`](inplace_vector/try_emplace_back.md)、[`try_append_range()`](inplace_vector/try_append_range.md)）や、事前条件として容量超過しないことを要求する事前条件チェックなしAPI (unchecked API)（[`unchecked_push_back()`](inplace_vector/unchecked_push_back.md)、[`unchecked_emplace_back()`](inplace_vector/unchecked_emplace_back.md)）も提供される。

`inplace_vector`はアロケータを使用しない。

`inplace_vector`の全メンバ関数は`constexpr`指定されており、定数式の中で使用できる。


### コンテナとしての特性

- 各要素への添字アクセス（定数時間）
- 双方向への走査（線形時間）
- 末尾への要素の追加・削除（定数時間。ただし容量超過時は例外送出）


### テンプレートパラメータ

- `T`: 格納される要素の型
- `N`: コンパイル時に決定される最大容量。[`std::size_t`](/reference/cstddef/size_t.md)型


### 推論補助はない
`inplace_vector`にはクラステンプレートの推論補助が定義されていない。これは、初期化子リストやイテレータ範囲から要素型`T`を推論できたとしても、コンパイル定数である容量`N`を推論する方法がないためである。容量はコンパイル時定数として明示的に指定する必要がある。

```cpp
// std::vector では推論補助が使える
std::vector v = {1, 2, 3}; // OK: vector<int>

// std::inplace_vector では推論補助が使えない
// std::inplace_vector iv = {1, 2, 3};      // エラー: Nを推論できない
std::inplace_vector<int, 3> iv = {1, 2, 3}; // OK: 明示的に型と容量を指定
```


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|----------------|-------|
| [`(constructor)`](inplace_vector/op_constructor.md) | コンストラクタ | C++26 |
| [`(destructor)`](inplace_vector/op_destructor.md) | デストラクタ   | C++26 |
| [`operator=`](inplace_vector/op_assign.md)  | 代入演算子     | C++26 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------|---------------------------------------|-------|
| [`begin`](inplace_vector/begin.md)     | 先頭の要素を指すイテレータを取得する | C++26 |
| [`end`](inplace_vector/end.md)         | 末尾の次を指すイテレータを取得する | C++26 |
| [`cbegin`](inplace_vector/cbegin.md)   | 先頭の要素を指す読み取り専用イテレータを取得する | C++26 |
| [`cend`](inplace_vector/cend.md)       | 末尾の次を指す読み取り専用イテレータを取得する | C++26 |
| [`rbegin`](inplace_vector/rbegin.md)   | 末尾を指す逆イテレータを取得する | C++26 |
| [`rend`](inplace_vector/rend.md)       | 先頭の前を指す逆イテレータを取得する | C++26 |
| [`crbegin`](inplace_vector/crbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する | C++26 |
| [`crend`](inplace_vector/crend.md)     | 先頭の前を指す読み取り専用逆イテレータを取得する | C++26 |


### 領域

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|------------------|-------|
| [`size`](inplace_vector/size.md)     | 要素数を取得する | C++26 |
| [`max_size`](inplace_vector/max_size.md) | 格納可能な最大の要素数を取得する（`N`を返す） | C++26 |
| [`capacity`](inplace_vector/capacity.md) | 格納可能な最大の要素数を取得する（`N`を返す） | C++26 |
| [`resize`](inplace_vector/resize.md) | 要素数を変更する | C++26 |
| [`empty`](inplace_vector/empty.md)   | コンテナが空かどうかを判定する | C++26 |
| [`reserve`](inplace_vector/reserve.md) | 容量を確認する（`n > N`の場合に例外を送出） | C++26 |
| [`shrink_to_fit`](inplace_vector/shrink_to_fit.md) | 何もしない | C++26 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|---------------|-------|
| [`operator[]`](inplace_vector/op_at.md) | 要素アクセス | C++26 |
| [`at`](inplace_vector/at.md)            | 要素アクセス | C++26 |
| [`front`](inplace_vector/front.md)      | 先頭要素への参照を取得する | C++26 |
| [`back`](inplace_vector/back.md)        | 末尾要素への参照を取得する | C++26 |
| [`data`](inplace_vector/data.md)        | 配列の先頭へのポインタを取得する | C++26 |


### コンテナの変更

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|------------------|-------|
| [`assign`](inplace_vector/assign.md)             | コンテナの再代入 | C++26 |
| [`assign_range`](inplace_vector/assign_range.md) | Rangeの要素を再代入 | C++26 |
| [`push_back`](inplace_vector/push_back.md)       | 末尾へ要素追加 | C++26 |
| [`emplace_back`](inplace_vector/emplace_back.md) | 末尾へ直接構築 | C++26 |
| [`append_range`](inplace_vector/append_range.md) | Rangeの要素を末尾へ追加 | C++26 |
| [`pop_back`](inplace_vector/pop_back.md)         | 末尾から要素削除 | C++26 |
| [`insert`](inplace_vector/insert.md)             | 要素の挿入 | C++26 |
| [`emplace`](inplace_vector/emplace.md)           | 要素の直接構築による挿入 | C++26 |
| [`insert_range`](inplace_vector/insert_range.md) | Rangeの要素を挿入 | C++26 |
| [`erase`](inplace_vector/erase.md)               | 要素の削除 | C++26 |
| [`swap`](inplace_vector/swap.md)                 | コンテナの交換 | C++26 |
| [`clear`](inplace_vector/clear.md)               | 全要素削除 | C++26 |


### 失敗許容の追加操作 (fallible API)

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|------------------|-------|
| [`try_push_back`](inplace_vector/try_push_back.md)       | 末尾へ要素追加を試みる。容量超過時は`nullptr`を返す | C++26 |
| [`try_emplace_back`](inplace_vector/try_emplace_back.md) | 末尾へ直接構築を試みる。容量超過時は`nullptr`を返す | C++26 |
| [`try_append_range`](inplace_vector/try_append_range.md) | Rangeの要素を末尾へ追加を試みる。容量超過時は挿入されなかった最初の要素を指すイテレータを返す | C++26 |


### 事前条件チェックなしの追加操作 (unchecked API)

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|------------------|-------|
| [`unchecked_push_back`](inplace_vector/unchecked_push_back.md)       | 容量チェックなしで末尾へ要素追加 | C++26 |
| [`unchecked_emplace_back`](inplace_vector/unchecked_emplace_back.md) | 容量チェックなしで末尾へ直接構築 | C++26 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------|-----------------------------------------------------------------------|-------|
| `value_type`             | 要素型 `T` | C++26 |
| `pointer`                | `T*` | C++26 |
| `const_pointer`          | `const T*` | C++26 |
| `reference`              | `T&` | C++26 |
| `const_reference`        | `const T&` | C++26 |
| `size_type`              | 符号なし整数型 (通常は[`size_t`](/reference/cstddef/size_t.md)) | C++26 |
| `difference_type`        | 符号付き整数型 (通常は[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) | C++26 |
| `iterator`               | 実装定義のランダムアクセスイテレータかつ[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md) | C++26 |
| `const_iterator`         | 実装定義の読み取り専用ランダムアクセスイテレータかつ[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md) | C++26 |
| `reverse_iterator`       | [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | C++26 |
| `const_reverse_iterator` | [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | C++26 |


## 非メンバ関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|------------------------------------|-------|
| [`operator==`](inplace_vector/op_equal.md)         | 等値比較 | C++26 |
| `bool operator!=(const inplace_vector& x, const inplace_vector& y);` | 非等値比較 (`==`により使用可能) | C++26 |
| [`operator<=>`](inplace_vector/op_compare_3way.md) | 三方比較 | C++26 |
| `bool operator<(const inplace_vector& x, const inplace_vector& y);`  | 左辺が右辺より小さいかの判定を行う (`<=>`により使用可能) | C++26 |
| `bool operator<=(const inplace_vector& x, const inplace_vector& y);` | 左辺が右辺以下かの判定を行う (`<=>`により使用可能) | C++26 |
| `bool operator>(const inplace_vector& x, const inplace_vector& y);`  | 左辺が右辺より大きいかの判定を行う (`<=>`により使用可能) | C++26 |
| `bool operator>=(const inplace_vector& x, const inplace_vector& y);` | 左辺が右辺以上かの判定を行う (`<=>`により使用可能) | C++26 |

### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](inplace_vector/swap_free.md) | 2つの`inplace_vector`オブジェクトを入れ替える | C++26 |

### 要素削除

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase`](inplace_vector/erase_free.md) | 指定した値をもつ要素とその分の領域を、コンテナから削除する | C++26 |
| [`erase_if`](inplace_vector/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++26 |



## 例
### 基本的な使い方
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  // int型を要素とし、最大容量5の固定容量可変長配列
  std::inplace_vector<int, 5> iv = {1, 99, 4};

  iv[1] = 3;                      // 1番目の要素を参照し、書き換える
  iv.push_back(5);                // 末尾に値5を追加
  iv.insert(iv.begin() + 1, 2);  // 1番目に値2を挿入

  int* p = iv.data();           // 内部表現のポインタを取得
  std::size_t size = iv.size(); // 要素数を取得

  // 各要素に対して操作を行う
  for (int x : iv) {
    std::println("{}", x);
  }
}
```
* iv[1][link inplace_vector/op_at.md]
* iv.push_back[link inplace_vector/push_back.md]
* iv.insert[link inplace_vector/insert.md]
* iv.data()[link inplace_vector/data.md]
* iv.size()[link inplace_vector/size.md]

#### 出力
```
1
2
3
4
5
```

### 失敗許容API (fallible API) の使用例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 3> iv = {1, 2, 3};

  // 容量が満杯なので、try_push_backはnullptrを返す
  int* result = iv.try_push_back(4);
  if (result == nullptr) {
    std::println("容量超過: 要素を追加できません");
  }

  // unchecked_push_backは容量チェックを行わない（容量超過は未定義動作）
  // iv.unchecked_push_back(4); // 未定義動作！

  std::println("size: {}", iv.size());
}
```
* iv.try_push_back[link inplace_vector/try_push_back.md]
* iv.size()[link inplace_vector/size.md]

#### 出力
```
容量超過: 要素を追加できません
size: 3
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
- [P3074R7 Trivial Unions (was `std::uninitialized<T>`)](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3074r7.html)
    - C++26で非トリビアルな型に対する`constexpr`制限が撤廃された
