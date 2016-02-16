#clear
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void clear() noexcept;
```

##概要
全ての要素を削除する


##効果
`forward_list`オブジェクトが管理しているすべての要素を破棄する。

また、要素を指す全ての参照、ポインタ、イテレータが無効になる。past-the-end イテレータは無効にならない。


##戻り値
なし


##例外
投げない


##計算量
線形時間。全ての要素に対してデストラクタを呼び出す。


##例
```cpp
#include <iostream>
#include <cassert>
#include <forward_list>
#include <algorithm>

int main()
{
  std::forward_list<int> ls = {1, 2, 3};

  ls.clear();

  assert(ls.empty());

  std::for_each(ls.begin(), ls.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* assert[link /reference/cassert/assert.md]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照
- [LWG Issue 2231. DR 704 removes complexity guarantee for `clear()`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2231)
    - C++03までこの関数の効果は`erase(begin(), end())`だったため、それによって線形時間の計算量が保証されていたが、C++11で効果の表記が変わったために、保証がなくなってしまっていた。C++14であらためて保証を追加。


