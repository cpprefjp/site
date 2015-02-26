#crend (C++14)
* iterator[meta header]

```cpp
namespace std {
  template <class C>
  auto crend(const C& c) -> decltype(std::rend(c));
}
```
* std::rend[link ./rend.md]

##概要
範囲の先頭の前を指す、読み取り専用逆イテレータを取得する。


##戻り値
```cpp
std::rend(c);
```
* std::rend[link ./rend.md]


##例
```cpp
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>

void print(int x)
{
  std::cout << x << " ";
}

int main()
{
  // コンテナ
  {
    std::vector<int> v = {1, 2, 3};

    decltype(v)::const_reverse_iterator first = std::crbegin(v);
    decltype(v)::const_reverse_iterator last = std::crend(v);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 組み込み配列
  {
    int ar[] = {4, 5, 6};

    std::reverse_iterator<const int*> first = std::crbegin(ar);
    std::reverse_iterator<const int*> last = std::crend(ar);

    std::for_each(first, last, print);
  }
  std::cout << std::endl;

  // 初期化子リスト
  {
    std::initializer_list<int> init = {7, 8, 9};

    std::reverse_iterator<const int*> first = std::crbegin(init);
    std::reverse_iterator<const int*> last = std::crend(init);

    std::for_each(first, last, print);
  }
}
```
* crend[color ff0000]
* crbegin[link ./crbegin.md]
* std::reverse_iterator[link ./reverse_iterator.md]
* std::vector[link /reference/vector.md]
* std::for_each[link /reference/algorithm/for_each.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
3 2 1 
6 5 4 
9 8 7 
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.4
- [GCC, C++14 mode](/implementation.md#gcc): 5.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [LWG Issue 2128. Absence of global functions `cbegin`/`cend`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2128)

