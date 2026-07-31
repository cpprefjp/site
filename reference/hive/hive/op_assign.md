# operator=
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
hive& operator=(const hive& x); // (1) C++26

hive& operator=(hive&& x)
  noexcept(allocator_traits<Allocator>::propagate_on_container_move_assignment::value ||
           allocator_traits<Allocator>::is_always_equal::value); // (2) C++26

hive& operator=(initializer_list<T> il); // (3) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : コピー代入。
- (2) : ムーブ代入。
- (3) : 初期化子リストを代入。


## 事前条件
- (1) : 型`T`が`hive`に対して`CopyInsertable`かつ`CopyAssignable`であること。
- (2) : `allocator_traits<Allocator>::propagate_on_container_move_assignment::value || allocator_traits<Allocator>::is_always_equal::value`が`false`である場合、型`T`が`hive`に対して`MoveInsertable`かつ`MoveAssignable`であること。


## 効果
- (1) : `*this`の全ての要素は、コピー代入されるか破棄される。`x`の全ての要素は、相対順序を保ったまま`*this`にコピーされる。
- (2) : `*this`の全ての要素は、ムーブ代入されるか破棄される。
    - `allocator_traits<Allocator>::propagate_on_container_move_assignment::value || get_allocator() == x.get_allocator()`が`true`の場合、`x`の各要素ブロックを`*this`へ移動する。`x`の要素を指すポインタ・参照は、`*this`のメンバとなった同じ要素を指し続ける。`x`の要素を指すイテレータは、それらの要素を指し続けるが、`*this`のイテレータとして振る舞う。
    - 上記が`false`の場合、`x`の各要素を`*this`へ移動する。`x`の要素を指す参照・ポインタ・イテレータ、および`x`の終端イテレータは無効になる。
- (3) : `il`の全ての要素を`*this`にコピー代入する。


## 事後条件
- (2) : `x.empty() == true`となる。`*this`の要素の相対順序は、呼び出し前の`x`の要素の相対順序と同じである。


## 戻り値
`*this`


## 計算量
- (1) : `size() + x.size()`に対して線形時間
- (2) : `size()`に対して線形時間。さらに`allocator_traits<Allocator>::propagate_on_container_move_assignment::value || get_allocator() == x.get_allocator()`が`false`である場合、`x.size()`に対しても線形時間
- (3) : `size() + il.size()`に対して線形時間


## 備考
- (1) : 要素ブロックの容量制限を表す説明専用メンバ*current-limits*は変更されない。
- (2) : `x`の各要素ブロックを移動する場合、*current-limits*は`x`のものに設定される。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h1 = {1, 2, 3};
  std::hive<int> h2;

  // コピー代入
  h2 = h1;
  std::println("h2.size() = {}", h2.size());

  // ムーブ代入
  std::hive<int> h3;
  h3 = std::move(h1);
  std::println("h3.size() = {}", h3.size());

  // 初期化子リストの代入
  std::hive<int> h4;
  h4 = {1, 2, 3, 4};
  std::println("h4.size() = {}", h4.size());
}
```
* std::move[link /reference/utility/move.md]
* h2.size()[link size.md]
* h3.size()[link size.md]
* h4.size()[link size.md]

### 出力
```
h2.size() = 3
h3.size() = 3
h4.size() = 4
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
