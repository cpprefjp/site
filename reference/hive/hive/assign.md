# assign
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void assign(size_type n, const T& t); // (1) C++26

template <class InputIterator>
void assign(InputIterator first, InputIterator last); // (2) C++26

void assign(initializer_list<T> il); // (3) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
コンテナに値を代入する。

- (1) : `n`個の値`t`のコピーを代入する。
- (2) : イテレータ範囲`[first, last)`を代入する。
- (3) : 初期化子リストを代入する。


## 効果
現在保持している要素を全て破棄し、指定された要素を代入する。それぞれ以下と等価である。

- (1) :
```cpp
clear();
insert(n, t);
```
* clear[link clear.md]
* insert[link insert.md]

- (2) :
```cpp
clear();
insert(first, last);
```
* clear[link clear.md]
* insert[link insert.md]

- (3) :
```cpp
clear();
insert(il);
```
* clear[link clear.md]
* insert[link insert.md]


## 戻り値
なし


## 例
```cpp example
#include <hive>
#include <iterator>
#include <print>

int main()
{
  std::hive<int> h;

  // n個の値を代入する
  h.assign(3, 1);
  std::println("size = {}", h.size());

  // イテレータ範囲を代入する
  int a[] = {1, 2, 3, 4};
  h.assign(std::begin(a), std::end(a));
  std::println("size = {}", h.size());

  // 初期化子リストを代入する
  h.assign({1, 2});
  std::println("size = {}", h.size());
}
```
* h.assign[color ff0000]
* h.size()[link size.md]

### 出力
```
size = 3
size = 4
size = 2
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`assign_range`](assign_range.md)
- [`operator=`](op_assign.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
