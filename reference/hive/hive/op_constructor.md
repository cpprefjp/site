# コンストラクタ
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr hive() noexcept(noexcept(Allocator()));   // (1) C++26
constexpr explicit hive(const Allocator&) noexcept; // (2) C++26

constexpr explicit hive(hive_limits block_limits);  // (3) C++26
constexpr hive(hive_limits block_limits,
               const Allocator&);                   // (4) C++26

explicit hive(size_type n,
              const Allocator& = Allocator());      // (5) C++26
hive(size_type n, hive_limits block_limits,
     const Allocator& = Allocator());               // (6) C++26

hive(size_type n, const T& value,
     const Allocator& = Allocator());               // (7) C++26
hive(size_type n, const T& value, hive_limits block_limits,
     const Allocator& = Allocator());               // (8) C++26

template <class InputIterator>
hive(InputIterator first, InputIterator last,
     const Allocator& = Allocator());               // (9) C++26
template <class InputIterator>
hive(InputIterator first, InputIterator last, hive_limits block_limits,
     const Allocator& = Allocator());               // (10) C++26

template <container-compatible-range<T> R>
hive(from_range_t, R&& rg,
     const Allocator& = Allocator());               // (11) C++26
template <container-compatible-range<T> R>
hive(from_range_t, R&& rg, hive_limits block_limits,
     const Allocator& = Allocator());               // (12) C++26

hive(const hive& x); // (13) C++26
hive(hive&&) noexcept; // (14) C++26

hive(const hive& x,
     const type_identity_t<Allocator>& alloc); // (15) C++26
hive(hive&&,
     const type_identity_t<Allocator>& alloc); // (16) C++26

hive(initializer_list<T> il,
     const Allocator& = Allocator());               // (17) C++26
hive(initializer_list<T> il, hive_limits block_limits,
     const Allocator& = Allocator());               // (18) C++26
```
* type_identity_t[link /reference/type_traits/type_identity.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]
* from_range_t[link /reference/ranges/from_range_t.md]
* hive_limits[link ../hive_limits.md]


## 概要
`hive`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。アロケータをデフォルト構築して、空の`hive`を構築する。
- (2) : アロケータを指定して、空の`hive`を構築する。
- (3) : 要素ブロックの容量制限を指定して、空の`hive`を構築する。
- (4) : 要素ブロックの容量制限とアロケータを指定して、空の`hive`を構築する。
- (5) : `n`個のデフォルト挿入された要素を保持する`hive`を構築する。
- (6) : (5)に加えて、要素ブロックの容量制限を指定する。
- (7) : `value`のコピーを`n`個要素として保持する`hive`を構築する。
- (8) : (7)に加えて、要素ブロックの容量制限を指定する。
- (9) : イテレータ範囲`[first, last)`を要素としてコピーした`hive`を構築する。
- (10) : (9)に加えて、要素ブロックの容量制限を指定する。
- (11) : Range`rg`の要素で`hive`を構築する。
- (12) : (11)に加えて、要素ブロックの容量制限を指定する。
- (13) : コピーコンストラクタ。`x`と同じ要素を保持する`hive`を構築する。
- (14) : ムーブコンストラクタ。`x`の指す先を自分の領域として`hive`を構築する。
- (15) : アロケータを指定したコピーコンストラクタ。
- (16) : アロケータを指定したムーブコンストラクタ。
- (17) : 初期化子リストを受け取るコンストラクタ。`il`の要素で`hive`を構築する。
- (18) : (17)に加えて、要素ブロックの容量制限を指定する。

[`hive_limits`](../hive_limits.md)を受け取るオーバーロード ((3), (4), (6), (8), (10), (12), (18)) は、指定した容量制限で説明専用メンバ*current-limits*を初期化する。`block_limits`がハード制限 ([`block_capacity_hard_limits`](block_capacity_hard_limits.md)) の範囲外であるか、`block_limits.min > block_limits.max`である場合、その動作はエラー性動作 (erroneous behavior) であり、効果は処理系定義である。


## 事前条件
- (5), (6) : 型`T`が`hive`に対して`DefaultInsertable`であること。
- (7), (8), (13), (15), (17), (18) : 型`T`が`hive`に対して`CopyInsertable`であること。
- (16) : `allocator_traits<Allocator>::is_always_equal::value`が`false`である場合、型`T`が`hive`に対して`MoveInsertable`であること。


## 効果
- (14), (16) (`alloc == x.get_allocator()`が`true`の場合) : `x`の各要素ブロックを`*this`へ移動する。`x`の要素を指すポインタ・参照は、`*this`のメンバとなった同じ要素を指し続ける。`x`の要素を指すイテレータは、それらの要素を指し続けるが、`*this`のイテレータとして振る舞う。
- (16) (`alloc == x.get_allocator()`が`false`の場合) : `x`の各要素を`*this`へ移動する。`x`の要素を指す参照・ポインタ・イテレータ、および`x`の終端イテレータは無効になる。


## 事後条件
- (14), (16) : `x.empty() == true`となる。`*this`の要素の相対順序は、呼び出し前の`x`の要素の相対順序と同じである。


## 計算量
- (1), (2), (3), (4) : 定数時間
- (5), (6), (7), (8) : `n`に対して線形時間
- (9), (10) : [`distance`](/reference/iterator/distance.md)`(first, last)`に対して線形時間
- (11), (12) : [`ranges::distance`](/reference/iterator/ranges_distance.md)`(rg)`に対して線形時間
- (13), (15) : `x.`[`size`](size.md)`()`に対して線形時間
- (14) : 定数時間
- (16) : `alloc == x.get_allocator()`が`false`であれば`x.`[`size`](size.md)`()`に対して線形時間。そうでなければ定数時間
- (17), (18) : `il.`[`size`](/reference/initializer_list/initializer_list/size.md)`()`に対して線形時間


## 備考
- (13), (15) : `x`の*current-limits*で`*this`の*current-limits*を初期化する。
- (14), (16) : `x`の各要素ブロックを移動する場合、*current-limits*は`x`のものに設定される。


## 例
```cpp example
#include <hive>
#include <iterator>
#include <print>

int main()
{
  // デフォルト構築
  std::hive<int> h1;

  // n個の値を保持する
  std::hive<int> h2(3, 1);

  // イテレータ範囲から構築
  int a[] = {1, 2, 3};
  std::hive<int> h3(std::begin(a), std::end(a));

  // 初期化子リストから構築
  std::hive<int> h4 = {1, 2, 3};

  // コピー構築
  std::hive<int> h5 = h4;

  std::println("h1.size() = {}", h1.size());
  std::println("h2.size() = {}", h2.size());
  std::println("h3.size() = {}", h3.size());
  std::println("h4.size() = {}", h4.size());
  std::println("h5.size() = {}", h5.size());
}
```
* std::hive[color ff0000]
* h1.size()[link size.md]
* h2.size()[link size.md]
* h3.size()[link size.md]
* h4.size()[link size.md]
* h5.size()[link size.md]

### 出力
```
h1.size() = 0
h2.size() = 3
h3.size() = 3
h4.size() = 3
h5.size() = 3
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`assign`](assign.md)
- [`assign_range`](assign_range.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
