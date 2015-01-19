#splice
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

##概要
2つの`list`オブジェクトを併合する。

- (1), (2) : `position`の次の要素の前に、`x`の全ての要素を移動する。  
- (3), (4) : `position`の次の要素の前に、`x`の要素のうち`i`の次の要素を移動する。  
- (5), (6) : `position`の次の要素の前に、`x`の要素のうち`(first, last)`の範囲を移動する。  


##要件
- 第1パラメータ`position`が、[`[`begin()`](./begin.md)`, `[`end()`](./end.md)]の範囲の間接参照可能なイテレータであること。
- `i`, `first`, `last`が、`x`のイテレータであること。


##戻り値
なし


##計算量
- (1), (2) : `x`の要素数に対して線形時間
- (3), (4) : 計算量： 定数時間
- (5), (6) : `(first, last)`の要素数に対して線形時間


##例外
- (1), (2) : 投げない
- (3), (4) : 投げない


##例
```cpp
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

###出力
```
1 2 3 4 5 6 
1 4 5 6 
1 2 4 5 6 
```


