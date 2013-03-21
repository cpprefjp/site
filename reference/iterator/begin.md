```cpp
namespace std {
  template <class C> auto begin(C& c) -> decltype(c.begin());
  template <class C> auto begin(const C& c) -> decltype(c.begin());
  template <class T, size_t N> T* begin(T (&array)[N]);
}
```

##概要

<b>範囲から先頭要素へのイテレータを取得する。</b>


##戻り値

コンテナの場合：
`return c.begin();`
組み込み配列の場合：
`return array;`

##備考
この関数は、範囲for文の実装に使用される。

##例

```cpp
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm> // for_each

void print(int x)
{
  std::cout << x << " ";
}

int main()
{
  // コンテナ
  {
    std::vector<int> v = {1, 2, 3};

    decltype(v)::iterator first = std::begin(v);
    decltype(v)::iterator last = std::end(v);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 組み込み配列
  {
    int ar[] = {4, 5, 6};

    int* first = std::begin(ar);
    int* last = std::end(ar);

    std::for_each(first, last, print);
  }
}
```
* begin[color ff0000]
* begin[color ff0000]

###出力

```cpp
1 2 3 
4 5 6 
```

##バージョン


###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照

[boost::begin() - Boost Range Library](http://www.boost.org/doc/libs/release/libs/range/doc/html/range/reference/concept_implementation/semantics/functions.html)


