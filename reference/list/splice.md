#splice
```cpp
// C++03
void splice(iterator position, list& x);
void splice(iterator position, list& x, iterator i);
void splice(iterator position, list& x,
            iterator first, iterator last);

// C++11
void splice(const_iterator position, list& x);
void splice(const_iterator position, list&& x);
void splice(const_iterator position, list& x, const_iterator i);
void splice(const_iterator position, list&& x, const_iterator i);
void splice(const_iterator position, list& x,
            const_iterator first, const_iterator last);
void splice(const_iterator position, list&& x,
            const_iterator first, const_iterator last);
```

##概要
2つの`list`オブジェクトを併合する。

- `void splice(const_iterator position, list& x);`
- `void splice(const_iterator position, list&& x);`

`position`の次の要素の前に`x`の全ての要素を移動する。  
例外： 投げない  
計算量： `x`の要素数に対して線形時間  


- `void splice(const_iterator position, list& x, const_iterator i);`
- `void splice(const_iterator position, list&& x, const_iterator i);`

`position`の次の要素の前に、`x`の要素のうち`i`の次の要素を移動する。  
例外： 投げない  
計算量： 定数時間  


- `void splice(const_iterator position, list& x, const_iterator first, const_iterator last);`
- `void splice(const_iterator position, list&& x, const_iterator first, const_iterator last);`

`position`の次の要素の前に、`x`の要素のうち`(first, last)`の範囲を移動する。  
計算量： `(first, last)`の要素数に対して線形時間  


##要件
第1パラメータ`position`が、[`[`begin()`](./begin.md)`, `[`end()`](./end.md)]の範囲の間接参照可能なイテレータであること。
`i`, `first`, `last`が、`x`のイテレータであること。


##戻り値
なし


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


