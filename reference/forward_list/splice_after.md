#splice_after
```cpp
void splice_after(const_iterator position, forward_list& x);

void splice_after(const_iterator position, forward_list&& x);
```

void splice_after(const_iterator position, forward_list& x,

                  const_iterator i);

void splice_after(const_iterator position, forward_list&& x,

                  const_iterator i);


void splice_after(const_iterator position, forward_list& x,

                  const_iterator first, const_iterator last);

void splice_after(const_iterator position, forward_list&& x,

                  const_iterator first, const_iterator last);





##概要

2つの`forward_list`オブジェクトを併合する。



<li>
`void splice_after(const_iterator position, forward_list& x);`

</li>
<li>
`void splice_after(const_iterator position, forward_list&& x);`
`position`の次の要素の後ろに`x`の全ての要素を移動する。
例外： 投げない
計算量： xの要素数に対して線形時間


</li>

- `void splice_after(const_iterator position, forward_list& x, const_iterator i);`
<li>`void splice_after(const_iterator position, forward_list&& x, const_iterator i);`
`position`の次の要素の後ろに、`x`の要素のうち`i`の次の要素を移動する
例外： 投げない
計算量： 定数時間</li>

- `void splice_after(const_iterator position, forward_list& x, const_iterator first, const_iterator last);`
<li>`void splice_after(const_iterator position, forward_list&& x, const_iterator first, const_iterator last);`
`position`の次の要素の後ろに、`x`の要素のうち`(first, last)`の範囲を移動する
計算量： `(first, last)`の要素数に対して線形時間</li>



##要件

第1パラメータ`position`が、[`before_begin()`](/reference/forward_list/before_begin.md)もしくは`[[begin()](/reference/forward_list/begin.md), [end()](/reference/forward_list/end.md)]`の範囲の間接参照可能なイテレータであること。


`i`, `first`, `last`が、`x`のイテレータであること。


##戻り値

なし


##例

```cpp
#include <iostream>

#include <forward_list>

#include <utility> // move
```

template <class T>

void print(const std::forward_list<T>& ls)

{

  for (const T& x : ls) { std::cout << x << ' '; }

  std::cout << std::endl;

}


int main()

{

  // ysの全ての要素をxsに移動する

  {

    std::forward_list<int> xs = {1, 5, 6};

    std::forward_list<int> ys = {2, 3, 4};


    xs.<color=ff0000>splice_after(xs.begin(), std::move(ys));</color>


    print(xs);

  }

  // ysのうち、3だけを移動する

  {

    std::forward_list<int> xs = {1, 5, 6};

    std::forward_list<int> ys = {2, 3, 4};


    xs.<color=ff0000>splice_after</color>(xs.begin(), std::move(ys), ys.begin());


    print(xs);

  }

  // ysのうち、2と3だけを移動する

  {

    std::forward_list<int> xs = {1, 5, 6};

    std::forward_list<int> ys = {2, 3, 4};


    xs.<color=ff0000>splice_after</color>(xs.begin(), std::move(ys), ys.before_begin(), std::next(ys.begin(), 1));


    print(xs);

  }

}




###出力

```cpp
1 2 3 4 5 6 

1 3 5 6 

1 2 3 5 6 
```

##バージョン


###言語


- C++11



###処理系


- [Clang](/implementation#clang.md): ??

- [GCC](/implementation#gcc.md): 

- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0(右辺値参照バージョンのみ実装されている)

- [ICC](/implementation#icc.md): ??

- [Visual C++](/implementation#visual_cpp.md) ??



##参照


