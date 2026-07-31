# insert
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
iterator insert(const T& x);                    // (1) C++26
iterator insert(T&& x);                         // (2) C++26

iterator insert(const_iterator hint,
                const T& x);                    // (3) C++26
iterator insert(const_iterator hint,
                T&& x);                         // (4) C++26

void insert(initializer_list<T> il);           // (5) C++26

void insert(size_type n, const T& x);          // (6) C++26

template <class InputIterator>
void insert(InputIterator first,
            InputIterator last);                // (7) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
新たな要素を挿入する。

挿入位置はコンテナが決定するため、挿入する位置を指定することはできない（順序は未規定である）。

- (1), (2) : 新たな要素をひとつ挿入する
- (3), (4) : `hint`を無視して、新たな要素をひとつ挿入する
- (5) : `initializer_list`の全ての要素を挿入する
- (6) : 新たな要素`x`のコピーを`n`個挿入する
- (7) : イテレータ範囲`[first, last)`の要素を挿入する


## テンプレートパラメータ制約
- (5), (7) : 型`T`が、`*ranges::begin(rg)`から`hive`コンテナへの`EmplaceInsertable`であること。ここで`rg`は挿入する要素のRangeである
- (6) : 型`T`が、`hive`コンテナへの`CopyInsertable`であること


## 効果
- (1), (2) : `return emplace(std::forward<decltype(x)>(x));`と等価である
- (3), (4) : `hint`引数を無視し、(1), (2)と等価な処理を行う
- (5) : `initializer_list`の各要素のコピーを挿入する。各イテレータはちょうど1回だけ間接参照される
- (6) : `x`のコピーを`n`個挿入する
- (7) : `insert_range(ranges::subrange(first, last))`と等価である


## 戻り値
- (1), (2), (3), (4) : 新たに挿入された要素を指すイテレータ
- (5), (6), (7) : なし


## 計算量
- (1), (2), (3), (4) : 定数時間。型`T`のオブジェクトがちょうど1個構築される
- (5), (7) : 挿入する要素数に比例して線形時間。挿入する各要素に対して、型`T`のオブジェクトがちょうど1個構築される
- (6) : `n`に比例して線形時間。挿入する各要素に対して、型`T`のオブジェクトがちょうど1個構築される


## 備考
要素が挿入された場合、終端イテレータ（past-the-end iterator）は無効になる。削除されなかった既存要素へのポインタ・参照・イテレータは無効にならない。


## 例
```cpp example
#include <hive>
#include <print>
#include <vector>

int main()
{
  std::hive<int> h;

  // ひとつの要素を挿入する
  h.insert(1);

  // 初期化子リストの要素を挿入する
  h.insert({2, 3});

  // 値のコピーを複数個挿入する
  h.insert(2u, 4);

  // イテレータ範囲の要素を挿入する
  const std::vector<int> v = {5, 6};
  h.insert(v.begin(), v.end());

  for (int x : h) {
    std::print("{} ", x);
  }
  std::println("");
  std::println("size = {}", h.size());
}
```
* insert[color ff0000]
* h.size()[link size.md]

### 出力例
```
1 2 3 4 4 5 6 
size = 7
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目

| 名前                              | 説明                     |
|-----------------------------------|--------------------------|
| [`emplace`](emplace.md)           | 要素を直接構築で挿入する |
| [`insert_range`](insert_range.md) | Rangeの要素を挿入する    |


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
