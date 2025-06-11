# vector
* vector[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T, class Allocator = allocator<T>>
  class vector;

  namespace pmr {
    template <class T>
      using vector = std::vector<T, polymorphic_allocator<T>>;  // C++17から
  }
}
```
* allocator[link /reference/memory/allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]

`vector`はシーケンスコンテナの一種で、各要素は線形に、順序を保ったまま格納される。

`vector`コンテナは可変長配列として実装される。通常の(`new []`で確保した)配列と同じように、`vector`の各要素は連続して配置されるため、イテレータだけでなく添字による要素のランダムアクセスも高速である。

配列と違い、ストレージは`vector`自体が管理するため、自動的に領域の拡張が行われる。


`vector`は次の点で優れている。

- 各要素への添字アクセス(定数時間)
- 全要素の両方向の走査(線形時間)
- 末尾への要素の追加・削除(償却定数時間)

これらの挙動は配列と同じパフォーマンス特性を示し、加えてストレージサイズの変更が非常に簡単である。ただし、`vector`は実際の要素数より少し余分にメモリを確保する(これは拡張に備え、パフォーマンス特性を満足するための仕様である)。

他の標準シーケンスコンテナと比べ、`vector`は要素アクセスと(末尾に対する)追加・削除において一般的に最高の性能を誇る。末尾以外に対する挿入・削除は[`deque`](/reference/deque/deque.md)や[`list`](/reference/list/list.md)に劣り、イテレータや要素への参照の安定性(無効になる操作の数)では[`list`](/reference/list/list.md)に劣る。

内部的には、`vector`は(他のすべてのコンテナと同じように)サイズ用のメンバ変数を持ち、格納されている要素数を管理している。しかし`vector`の場合は、さらに確保済みのメモリサイズを管理するキャパシティ用のメンバ変数を持ち、これは常に[`size()`](vector/size.md)と同じか大きい値となる。確保済みの領域の余計な部分は、要素数の増加に備えて確保しているものである。この動作のおかげで、要素を追加するたびにメモリを再確保する必要が無くなり、単に確保済みの領域を初期化するだけでよくなる(再確保は要素数の対数の頻度で発生する)。

領域の再確保が発生すると、全ての要素が新しい領域にコピーされるため非常にコストがかかる。このため、最終的な要素数が大きくなると解っている場合はあらかじめ[`reserve()`](vector/reserve.md)メンバ関数でキャパシティを増加させておくことが望ましい。


各テンプレートパラメータの意味は次の通りである。

- `T`: 格納される要素の型、C++17以降は不完全型をサポートしている
- `Allocator`: メモリ確保に使用されるアロケータの型。デフォルトでは標準の[`allocator`](/reference/memory/allocator.md)クラスが使用される。

リファレンス中では、これらの名前をテンプレートパラメータとして扱う。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|----------------|-------|
| [`(constructor)`](vector/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](vector/op_destructor.md) | デストラクタ   | |
| [`operator=`](vector/op_assign.md)  | 代入演算子     | |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------|---------------------------------------|-------|
| [`begin`](vector/begin.md)     | 先頭の要素を指すイテレータを取得する | |
| [`end`](vector/end.md)         | 末尾の次を指すイテレータを取得する | |
| [`cbegin`](vector/cbegin.md)   | 先頭の要素を指す読み取り専用イテレータを取得する | C++11 |
| [`cend`](vector/cend.md)       | 末尾の次を指す読み取り専用イテレータを取得する | C++11 |
| [`rbegin`](vector/rbegin.md)   | 末尾を指す逆イテレータを取得する | |
| [`rend`](vector/rend.md)       | 先頭の前を指す逆イテレータを取得する | |
| [`crbegin`](vector/crbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する | C++11 |
| [`crend`](vector/crend.md)     | 先頭の前を指す読み取り専用逆イテレータを取得する | C++11 |


### 領域

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|------------------|-------|
| [`size`](vector/size.md)                   | 要素数を取得する | |
| [`max_size`](vector/max_size.md)           | 格納可能な最大の要素数を取得する | |
| [`resize`](vector/resize.md)               | 要素数を変更する | |
| [`capacity`](vector/capacity.md)           | メモリを再確保せずに格納できる最大の要素数を取得する | |
| [`empty`](vector/empty.md)                 | コンテナが空かどうかを判定する | |
| [`reserve`](vector/reserve.md)             | capacityを変更する | |
| [`shrink_to_fit`](vector/shrink_to_fit.md) | capacityをsizeまで縮小する | C++11 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|---------------|-------|
| [`operator[]`](vector/op_at.md) | 要素アクセス | |
| [`at`](vector/at.md)            | 要素アクセス | |
| [`data`](vector/data.md)        | 配列の先頭へのポインタを取得する | |
| [`front`](vector/front.md)      | 先頭要素への参照を取得する | |
| [`back`](vector/back.md)        | 末尾要素への参照を取得する | |


### コンテナの変更

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|------------------|-------|
| [`assign`](vector/assign.md)             | コンテナの再代入 | |
| [`assign_range`](vector/assign_range.md) | Rangeの要素を再代入 | C++23 |
| [`push_back`](vector/push_back.md)       | 末尾へ要素追加 | |
| [`emplace_back`](vector/emplace_back.md) | 末尾へ直接構築 | C++11 |
| [`append_range`](vector/append_range.md) | Rangeの要素を末尾へ追加 | C++23 |
| [`pop_back`](vector/pop_back.md)         | 末尾から要素削除 | |
| [`insert`](vector/insert.md)             | 要素の挿入 | |
| [`emplace`](vector/emplace.md)           | 要素の直接構築による挿入 | C++11 |
| [`insert_range`](vector/insert_range.md) | Rangeの要素を挿入 | C++23 |
| [`erase`](vector/erase.md)               | 要素の削除 | |
| [`swap`](vector/swap.md)                 | コンテナの交換 | |
| [`clear`](vector/clear.md)               | 全要素削除 | |


### アロケータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|------------------------------|-------|
| [`get_allocator`](vector/get_allocator.md) | アロケータオブジェクトの取得 | |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------|-----------------------------------------------------------------------|-------|
| `reference`              | `T&` | |
| `const_reference`        | `const T&` | |
| `iterator`               | ランダムアクセスイテレータ | |
| `const_iterator`         | 読み取り専用ランダムアクセスイテレータ | |
| `size_type`              | 符号なし整数型 (通常は[`size_t`](/reference/cstddef/size_t.md)) | |
| `difference_type`        | 符号付き整数型 (通常は[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)) | |
| `value_type`             | 要素型 `T` | |
| `allocator_type`         | アロケータの型 `Allocator` | |
| `pointer`                | `Allocator::pointer` | |
| `const_pointer`          | `Allocator::const_pointer` | |
| `reverse_iterator`       | [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | |
| `const_reverse_iterator` | [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | |


## 非メンバ関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|------------------------------------|-------|
| [`operator==`](vector/op_equal.md)         | 等値比較 | |
| [`operator!=`](vector/op_not_equal.md)     | 非等値比較 | |
| [`operator<=>`](vector/op_compare_3way.md) | 三方比較 | C++20 |
| [`operator<`](vector/op_less.md)           | 左辺が右辺より小さいかの判定を行う | |
| [`operator<=`](vector/op_less_equal.md)    | 左辺が右辺以下かの判定を行う | |
| [`operator>`](vector/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | |
| [`operator>=`](vector/op_greater_equal.md) | 左辺が右辺以上かの判定を行う | |

### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](vector/swap_free.md) | 2つの`vector`オブジェクトを入れ替える | |

### 要素削除

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase`](vector/erase_free.md) | 指定した値をもつ要素とその分の領域を、コンテナから削除する | C++20 |
| [`erase_if`](vector/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++20 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](vector/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## `vector<bool>`特殊化
`vector`は`bool`型に対して特殊化されている。

この特殊化はメモリ領域を最小化するために提供されていて、各要素は1bitの領域のみを必要とする。

`vector<bool>::reference`は`bool`への参照ではなく、領域内の1bitを指す型であり、以下のようなインタフェースである (`noexcept`はC++11から、`constexpr`はC++20から付加される)。

C++23には`vector<bool>::iterator`が出力イテレータとなるために、`vector<bool>::reference`が`const`修飾を持つ`bool`からの代入演算子が追加され、[`indirectly_writable<vector<bool>::iterator,` `bool>`](/reference/iterator/indirectly_writable.md)がモデルを満たすようになった。

```cpp
class vector<bool>::reference {
  friend class vector;
  constexpr reference();                                       // コンストラクタは非公開
public:
  constexpr reference(const reference&) = default;             // コピーコンストラクタ（C++17）
  constexpr ~reference();
  constexpr operator bool() const noexcept;                    // boolへの暗黙変換
  constexpr reference& operator=(const bool x) noexcept;       // boolからの代入
  constexpr reference& operator=(const reference& x) noexcept; // vector<bool>のビットからの代入
  constexpr const reference& operator=(bool x) const noexcept; // *thisがconst時のboolからの代入（C++23）
  constexpr void flip() noexcept;                              // ビットの反転
};
```

### ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------------|------------------------------------------|-------|
| `template <class T> struct hash;`                                  | `hash`クラスの先行宣言                   | C++11 |
| `template <class Allocator> struct hash<vector<bool, Allocator>>;` | `hash`クラスの`vector<bool>`に対する特殊化 | C++11 |


### 文字列フォーマットサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `template <class T, class charT> requires is-vector-bool-reference<T>`<br/> `struct formatter<T, charT>;` | `vector<bool>::reference`を`bool`として出力するための[`formatter`](/reference/format/formatter.md)の特殊化 | C++23 |


## 例
### 基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <cassert>
#include <vector>

int main()
{
  // int型を要素とする可変長配列の変数を定義し、
  // 初期状態の要素を設定
  std::vector<int> v = {1, 99, 4};

  v[1] = 3;                    // 1番目の要素を参照し、書き換える
  v.push_back(5);              // 末尾に値5を追加
  v.insert(v.begin() + 1, 2);  // 1番目に値2を挿入

  int* p = v.data();           // 内部表現のポインタを取得
  std::size_t size = v.size(); // 要素数を取得
  assert(p[0] == 1);
  assert(size == 5u);

  // 各要素に対して操作を行う
  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```
* v[1][link vector/op_at.md]
* v.push_back[link vector/push_back.md]
* v.insert[link vector/insert.md]
* v.data()[link vector/data.md]
* for[link /lang/cpp11/range_based_for.md]

#### 出力
```
1
2
3
4
5
```

### 不完全型を要素にする例 (C++17)

不完全型を要素型に出来るようになった事で、階層構造や多分木などの再帰的データ構造を実装することが容易になる。  
他にも、[`list`](/reference/list/list.md)と[`forward_list`](/reference/forward_list/forward_list.md)が不完全型をサポートしている。

```cpp example
#include <iostream>
#include <vector>
#include <string>

//簡易なディレクトリ構造表現クラス
class directory {

  //不完全型（クラス定義内ではそのクラス自身は不完全）を要素型に指定
  std::vector<directory> m_subdir{};
  std::string m_name{};

public:

  directory(const char* name) : m_name{name}
  {}

  //サブディレクトリ追加
  template<typename Dir>
  void add(Dir&& dir) {
    m_subdir.emplace_back(std::forward<Dir>(dir));
  }

  //ディレクトリ名取得
  auto get() const -> const std::string& {
    return m_name;
  }

  auto begin() const {
    return m_subdir.begin();
  }

  auto end() const {
    return m_subdir.end();
  }
};

//ルートより下のディレクトリについて整形して出力
void recursive_out(const directory& dir, unsigned int depth) {

  if (1 < depth) std::cout << "| ";
  for (auto i = depth; 2 < i; --i) {
    std::cout << " ";
  }
  if (2 < depth) std::cout << " ";

  std::cout << "|-" << dir.get() << std::endl;

  for (auto& subdir : dir) {
    recursive_out(subdir, depth + 1);
  }
}

//ディレクトリ構造を出力する
void out_directorytree(const directory& dir) {
  std::cout << dir.get() << std::endl;

  for (auto& subdir : dir) {
    recursive_out(subdir, 1);
  }
}

int main() {
  directory dir{"root"};
  dir.add("sub1");

  directory sub2{"sub2"};
  sub2.add("sub2.1");

  directory sub22{"sub2.2"};
  sub22.add("sub2.2.1");

  sub2.add(std::move(sub22));

  dir.add(std::move(sub2));
  dir.add("sub3");

  out_directorytree(dir);
}
```
* std::vector[color ff0000]
* emplace_back[link vector/emplace_back.md]
* begin[link vector/begin.md]
* end[link vector/end.md]
* for[link /lang/cpp11/range_based_for.md]
* std::move[link /reference/utility/move.md]

#### 出力
```
root
|-sub1
|-sub2
| |-sub2.1
| |-sub2.2
|   |-sub2.2.1
|-sub3
```

### `vector<bool>`の基本操作
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<bool> v(8, false);
  v[5] = true; // ビットを立てる
  v[7].flip(); // ビット反転(1だったら0、0だったら1にする)

//bool& x = v[3]; // エラー！プロキシオブジェクトのため、bool&には変換できない
  bool x = v[3]; // OK : コピーはできる
  std::cout << "v[3] : " << x << std::endl;

  // イテレータ操作は可能
  std::for_each(v.begin(), v.end(), [](bool x) {
    std::cout << x << std::endl;
  });
}
```
* v[5][link vector/op_at.md]
* v[7][link vector/op_at.md]
* v[3][link vector/op_at.md]

### 出力
```
v[3] : 0
0
0
0
0
0
1
0
1
```

`vector<bool>`の要素は参照するとプロキシオブジェクトのコピーが返ってくるため、RandomAccessIteratorの要件を満たさない。
ただし、C++20以降のランダムアクセスイテレータの定義である[`random_access_iterator`](/reference/iterator/random_access_iterator.md)のモデルは満たす。


### 定数式内でvectorを使用する (C++20)
```cpp
#include <cassert>
#include <vector>

constexpr bool f()
{
  std::vector<int> v = {1, 2, 3};
  v.push_back(4);

  auto* p = v.data();
  assert(p);

  int sum = 0;
  for (auto x : v) {
    sum += x;
  }
  return sum != 0;
}

int main()
{
  static_assert(f());
}
```
* v.push_back[link vector/push_back.md]
* v.data[link vector/data.md]


#### 出力
```
```


## 参照
- `vector`のメモリ効率について
    - [２倍だけじゃない - Derive Your Dreams](http://www.kmonos.net/wlog/111.html#_2334100705)
    - [それでも２倍だ - Derive Your Dreams](http://www.kmonos.net/wlog/111.html#_1001100720)
- [LWG Issue 69. Must elements of a `vector` be contiguous?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#69)
    - C++03から、`vector`の要素のメモリが連続していることが保証された。
- [N1211 - `vector<bool>`: More Problems, Better Solutions](http://www.gotw.ca/publications/N1211.pdf)
- ビット配列に関しては、[`bitset`](/reference/bitset/bitset.md)(ビットを格納する固定長コンテナ)も参照。
- 可変長のビット配列の実装としては、Boost C++ Librariesの[`dynamic_bitset`](http://www.boost.org/doc/libs/release/libs/dynamic_bitset/dynamic_bitset.html)がある。
- [N2669 Thread-Safety in the Standard Library (Rev 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2669.htm)
- [N4510 Minimal incomplete type support for standard containers, revision 4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4510.html)
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
    - C++23から、Range・コンテナ、`pair`、`tuple`のフォーマット出力、および文字・文字列のデバッグ指定 (`"?"`) が追加された
