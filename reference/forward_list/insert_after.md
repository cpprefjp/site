#insert_after
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator insert_after(const_iterator position, const T& x); // (1)
iterator insert_after(const_iterator position, T&& x);      // (2)
iterator insert_after(const_iterator position, size_type n,
                      const T& x);                          // (3)

template <class InputIterator>
iterator insert_after(const_iterator position,
                      InputIterator first,
                      InputIterator last);                  // (4)

iterator insert_after(const_iterator position,
                      initializer_list<T> il);              // (5)
```
* initializer_list[link /reference/initializer_list.md]

##概要
任意の位置に新たな要素を挿入する。

[`list`](/reference/list.md)の`insert()`は指定された要素の前に挿入するが、`forward_list`は指定された要素の後に挿入する。

- (1), (2) : 新たな要素をひとつ挿入する
- (3) : 新たな要素`x`のコピーを`n`個挿入する
- (4) : `[first, last)`の範囲の要素を挿入する
- (5) : `initializer_list`の全て要素を挿入する


##要件
第1パラメータ`position`が、[`before_begin()`](/reference/forward_list/before_begin.md)もしくは`[`[`begin()`](./begin.md)`, `[`end()`](/reference/forward_list/end.md)`]`の範囲の間接参照可能なイテレータであること。

`first`、`last`は`*this`のイテレータではないこと。


##戻り値
挿入された要素を指すイテレータ


##計算量
定数時間


##例
```cpp
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

    print("insert one element", ls);
  }
  // n個の要素を挿入する
  {
    std::forward_list<int> ls = {1, 2, 5};

    // 2の後ろに3を2個挿入する
    ls.insert_after(std::next(ls.begin(), 1), 2, 3);

    print("insert n elements", ls);
  }
  // 指定範囲の要素を挿入する
  {
    std::forward_list<int> ls = {1, 2, 6};

    // vの全ての要素をlsに挿入する
    const std::vector<int> v = {3, 4, 5};
    ls.insert_after(std::next(ls.begin(), 1), v.begin(), v.end());

    print("insert range", ls);
  }
  // 初期化子リストで要素を挿入する
  {
    std::forward_list<int> ls = {1, 2, 6};

    ls.insert_after(std::next(ls.begin(), 1), {3, 4, 5});

    print("insert initializer_list", ls);
  }
}
```
* insert_after[color ff0000]

###出力
```
insert one element : 0 1 2 3 4 
insert n elements : 1 2 3 3 5 
insert range : 1 2 3 4 5 6 
insert initializer_list : 1 2 3 4 5 6 
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (5)の経緯となる提案文書


