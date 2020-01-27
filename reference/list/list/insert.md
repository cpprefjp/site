# insert
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
// C++03
iterator insert(iterator position, const T& x);       // (1) C++03
iterator insert(const_iterator position, const T& x); // (1) C++11
iterator insert(const_iterator position, T&& x);      // (2) C++11

void     insert(iterator position,
                size_type n, const T& x);             // (3) C++03
iterator insert(const_iterator position,
                size_type n, const T& x);             // (3) C++11

template <class InputIterator>
void     insert(iterator position,
                InputIterator first,
                InputIterator last);                  // (4) C++03
template <class InputIterator>
iterator insert(const_iterator position,
                InputIterator first,
                InputIterator last);                  // (4) C++11

iterator insert(const_iterator position,
                initializer_list<T> il);              // (5) C++11
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
任意の位置に新たな要素を挿入する。

この関数は、指定されたイテレータが指す要素の前に、新たな要素を挿入する。  

- (1), (2) : 新たな要素をひとつ挿入する
- (3) : 新たな要素`x`のコピーを`n`個挿入する
- (4) : `[first, last)`の範囲の要素を挿入する
- (5) : `initializer_list`の全て要素を挿入する


## 要件
第1パラメータ`position`が、`[`[`begin()`](begin.md)`,` [`end()`](end.md)`]`の範囲の間接参照可能なイテレータであること。


## 戻り値
- (1), (2) : 挿入された要素を指すイテレータ
- (3), (4) :
	- C++03 : なし
	- C++11 : 挿入された要素の先�を指すイテレータ
- (5) : 挿入された要素の先�を指すイテレータ


## 計算量
- (1), (2) : 定数時間
- (3), (4), (5) : 追加する要素数に比例して線形時間


## 例
```cpp example
#include <iostream>
#include <list>
#include <string>
#include <iterator>
#include <vector>

template <class T>
void print(const std::string& name, const std::list<T>& ls)
{
  std::cout << name << " : ";
  for (const T& x : ls) {
    std::cout << x << ' ';
  };
  std::cout << std::endl;
}

int main()
{
  // ひとつの要素を挿入する
  {
    std::list<int> ls = {1, 2, 4};

    // 先�に0を挿入
    ls.insert(ls.begin(), 0);

    // 4の前に3を挿入
    decltype(ls)::iterator it = std::next(ls.begin(), 3);
    ls.insert(it, 3);

    print("insert one element", ls);
  }
  // n個の要素を挿入する
  {
    std::list<int> ls = {1, 2, 5};

    // 5の前に3を2個挿入する
    ls.insert(std::next(ls.begin(), 2), 2, 3);

    print("insert n elements", ls);
  }
  // 指定範囲の要素を挿入する
  {
    std::list<int> ls = {1, 2, 6};

    // vの全ての要素をlsに挿入する
    const std::vector<int> v = {3, 4, 5};
    ls.insert(std::next(ls.begin(), 2), v.begin(), v.end());

    print("insert range", ls);
  }
  // 初期化�リストで要素を挿入する
  {
    std::list<int> ls = {1, 2, 6};

    ls.insert(std::next(ls.begin(), 2), {3, 4, 5});

    print("insert initializer_list", ls);
  }
}
```
* insert[color ff0000]
* ls.begin()[link begin.md]
* std::next[link /reference/iterator/next.md]

### 出力
```
insert one element : 0 1 2 3 4 
insert n elements : 1 2 3 3 5 
insert range : 1 2 3 4 5 6 
insert initializer_list : 1 2 3 4 5 6 
```


## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (5)の経緯となる提案文書

