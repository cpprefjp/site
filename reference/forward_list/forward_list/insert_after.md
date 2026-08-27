# insert_after
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator
  insert_after(const_iterator position,
               const T& x); // (1) C++11
constexpr iterator
  insert_after(const_iterator position,
               const T& x); // (1) C++26

iterator
  insert_after(const_iterator position,
               T&& x); // (2) C++11
constexpr iterator
  insert_after(const_iterator position,
               T&& x); // (2) C++26

iterator
  insert_after(const_iterator position,
               size_type n,
               const T& x); // (3) C++11
constexpr iterator
  insert_after(const_iterator position,
               size_type n,
               const T& x); // (3) C++26

template <class InputIterator>
iterator
  insert_after(const_iterator position,
               InputIterator first,
               InputIterator last); // (4) C++11
template <class InputIterator>
constexpr iterator
  insert_after(const_iterator position,
               InputIterator first,
               InputIterator last); // (4) C++26

iterator
  insert_after(const_iterator position,
               initializer_list<T> il); // (5) C++11
constexpr iterator
  insert_after(const_iterator position,
               initializer_list<T> il); // (5) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
任意の位置に新たな要素を挿入する。

[`list`](/reference/list/list.md)の`insert()`は指定された要素の前に挿入するが、`forward_list`は指定された要素の後に挿入する。

- (1), (2) : 新たな要素をひとつ挿入する
- (3) : 新たな要素`x`のコピーを`n`個挿入する
- (4) : イテレータ範囲`[first, last)`の要素を挿入する
- (5) : `initializer_list`の全て要素を挿入する


## テンプレートパラメータ制約
- (1), (3) : 型`T`が`forward_list`に対してコピー挿入可能 (`CopyInsertable`) であること。
- (2) : 型`T`が`forward_list`に対してムーブ挿入可能 (`MoveInsertable`) であること。
- (4) : 型`T`が`*first`から`forward_list`に対して直接構築可能 (`EmplaceConstructible`) であること。


## 事前条件
- 第1パラメータ`position`が、[`before_begin()`](/reference/forward_list/forward_list/before_begin.md)もしくはイテレータ範囲`[`[`begin()`](begin.md)`,` [`end()`](/reference/forward_list/forward_list/end.md)`)`の間接参照可能なイテレータであること。
- `first`、`last`は`*this`のイテレータではないこと。


## 戻り値

- (1), (2) : 挿入された要素を指すイテレータ
- (3), (4), (5) : 最後に挿入された要素を指すイテレータ、挿入されなかった時は`position`

## 計算量

- (1), (2) : 定数時間
- (3) : `n`に対して線形時間
- (4) : `std::distance(first, last)`に対して線形時間
- (5) : `il.size()`に対して線形時間

## 例
```cpp example
#include <iostream>
#include <forward_list>
#include <string>
#include <iterator>
#include <algorithm>
#include <vector>

template <class T>
void print(const std::string& name, const std::forward_list<T>& ls)
{
  std::cout << name << " : ";
  std::for_each(ls.begin(), ls.end(), [](int x) {
    std::cout << x << ' ';
  });
  std::cout << std::endl;
}

int main()
{
  // ひとつの要素を挿入する
  {
    std::forward_list<int> ls = {1, 2, 4};

    // 先頭に0を挿入
    ls.insert_after(ls.before_begin(), 0);

    // 2の後ろに3を挿入
    decltype(ls)::iterator it = std::next(ls.begin(), 2);
    ls.insert_after(it, 3);

    ::print("insert one element", ls);
  }
  // n個の要素を挿入する
  {
    std::forward_list<int> ls = {1, 2, 5};

    // 2の後ろに3を2個挿入する
    ls.insert_after(std::next(ls.begin(), 1), 2, 3);

    ::print("insert n elements", ls);
  }
  // 指定範囲の要素を挿入する
  {
    std::forward_list<int> ls = {1, 2, 6};

    // vの全ての要素をlsに挿入する
    const std::vector<int> v = {3, 4, 5};
    ls.insert_after(std::next(ls.begin(), 1), v.begin(), v.end());

    ::print("insert range", ls);
  }
  // 初期化子リストで要素を挿入する
  {
    std::forward_list<int> ls = {1, 2, 6};

    ls.insert_after(std::next(ls.begin(), 1), {3, 4, 5});

    ::print("insert initializer_list", ls);
  }
}
```
* insert_after[color ff0000]
* ls.begin()[link begin.md]
* ls.end()[link end.md]
* ls.before_begin()[link before_begin.md]

### 出力
```
insert one element : 0 1 2 3 4 
insert n elements : 1 2 3 3 5 
insert range : 1 2 3 4 5 6 
insert initializer_list : 1 2 3 4 5 6 
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]
	- (5) `initializer_list<T>`を仮引数に持つものは、2013から。


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (5)の経緯となる提案文書
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
- [LWG Issue 878. `forward_list` preconditions](https://cplusplus.github.io/LWG/issue878)
    - C++11で、`position`の事前条件が「デリファレンス可能、もしくは`before_begin()`と等しい」から「`before_begin()`であるか、範囲`[begin(), end())`のデリファレンス可能なイテレータ」へ改められた。他の`forward_list`オブジェクトのイテレータを渡す誤用を排除するため
- [LWG Issue 1278. Inconsistent return values for `forward_list::insert_after`](https://cplusplus.github.io/LWG/issue1278)
    - C++11で、複数要素を挿入するオーバーロードの戻り値が`position`から「最後に挿入された要素を指すイテレータ」へ変更された。挿入した範囲の末尾を知る手段がなく、続けて挿入する用途で使いづらかったため
- [LWG Issue 3817. Missing preconditions on `forward_list` modifiers](https://cplusplus.github.io/LWG/issue3817)
    - C++23で、各オーバーロードに要素型`T`の挿入可能性（`CopyInsertable`／`MoveInsertable`／`EmplaceConstructible`）に関する事前条件が追加された
- [LWG Issue 4164. Missing guarantees for `forward_list` modifiers](https://cplusplus.github.io/LWG/issue4164)
    - C++26で、`insert_after`各オーバーロードの計算量の保証が明文化された
