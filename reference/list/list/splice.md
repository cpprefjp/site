# splice
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void splice(iterator position, list& x);                // (1) C++03
void splice(const_iterator position, list& x);          // (1) C++11

void splice(const_iterator position, list&& x);         // (2) C++11

void splice(iterator position, list& x,
            iterator i);                                // (3) C++03
void splice(const_iterator position, list& x,
            const_iterator i);                          // (3) C++11

void splice(const_iterator position, list&& x,
            const_iterator i);                          // (4) C++11

void splice(iterator position, list& x,
            iterator first, iterator last);             // (5) C++03
void splice(const_iterator position, list& x,
            const_iterator first, const_iterator last); // (5) C++11

void splice(const_iterator position, list&& x,
            const_iterator first, const_iterator last); // (6) C++11
```

## 概要
他の`list`オブジェクトから、要素を移動する。

- (1), (2) : `position`の次の要素の前に、`x`の全ての要素を移動する。  
- (3), (4) : `position`の次の要素の前に、`x`の要素のうち`i`の指す要素を移動する。  
- (5), (6) : `position`の次の要素の前に、`x`の要素のうち`[first, last)`の範囲を移動する。  


## 要件
- 第1パラメータ`position`が、`[`[`begin()`](begin.md)`,` [`end()`](end.md)`)`の範囲の間接参照可能なイテレータであること。
- `i`, `first`, `last`が、`x`のイテレータであること。

- (1), (2) : `&x != this`であること
- (5), (6) : `position`が`[first, last)`に含まれる場合、未定義動作。


## 戻り値
なし


## 計算量
- C++03まで
    - (1), (2) : `x`の要素数に対して線形時間
    - (3), (4) : 定数時間
    - (5), (6) : `[first, last)`の要素数に対して線形時間
- C++11から
    - (1), (2) : 定数時間
    - (3), (4) : 定数時間
    - (5), (6) : `&x == this`の場合、定数時間。そうでない場合、`[first, last)`の要素数に対して線形時間


## 例外
- 投げない


## 備考
- (1), (2) : C++03の場合、移動元の`list`オブジェクト`x`は、全てのイテレータと参照が無効になる。C++11以降は、無効にならない。
- (3), (4) : C++03の場合、移動元の要素を指すイテレータ`i`は、そのイテレータおよび参照が無効になる。C++11以降は、無効にならない。
- (5), (6) : C++03の場合、移動元のイテレータ範囲`[first, last)`は、その範囲のイテレータおよび参照が無効になる。C++11以降は、無効にならない。
- 移動先と移動元のア�ケータが�値でない場合(`get_allocator() != x.get_allocator()`の場合)、この関数呼び出しの効果は未定義である。


## 例
```cpp example
#include <iostream>
#include <list>
#include <utility> // move

template <class T>
void print(const std::list<T>& ls)
{
  for (const T& x : ls) { std::cout << x << ' '; }
  std::cout << std::endl;
}

int main()
{
  // ysの全ての要素をxsに移動する
  {
    std::list<int> xs = {4, 5, 6};
    std::list<int> ys = {1, 2, 3};

    xs.splice(xs.begin(), std::move(ys));

    print(xs);
  }
  // ysのうち、1だけを移動する
  {
    std::list<int> xs = {4, 5, 6};
    std::list<int> ys = {1, 2, 3};

    xs.splice(xs.begin(), std::move(ys), ys.begin());

    print(xs);
  }
  // ysのうち、1と2だけを移動する
  {
    std::list<int> xs = {4, 5, 6};
    std::list<int> ys = {1, 2, 3};

    xs.splice(xs.begin(), std::move(ys), ys.begin(), std::next(ys.begin(), 2));

    print(xs);
  }
}
```
* splice[color ff0000]
* begin()[link begin.md]
* std::move[link /reference/utility/move.md]

### 出力
```
1 2 3 4 5 6 
1 4 5 6 
1 2 4 5 6 
```

## 参照
- [LWG Issue 250. splicing invalidates iterators](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#250)
- [LWG Issue 1133. Does N2844 break current specification of `list::splice`?](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#250)
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
