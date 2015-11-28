#reserve
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
void reserve(size_type n);
```

##概要
capacityを変更する


##要件
- 型`T`が`*this`に対してムーブ挿入可能であること (C++14)


##効果
`vector`のサイズが変更されようとしていることを通知し、それによって適宜保持領域の確保を行なわれるようにする。`reserve()`呼び出しの後、再確保が行われた場合には、[`capacity()`](capacity.md)は`reserve()`の引数より大きいか等しくなる。それ以外の場合には、[`capacity()`](capacity.md)は以前の値と等しくなる。再確保は、現在の容量が`reserve()`の引数よりも小さいときに生じ、それ以外の場合には生じない。例外が発生した場合は、非CopyInsertable型のムーブコンストラクタで発生した場合を除き、何も影響を与えない。


##戻り値
なし


##計算量
シーケンスのサイズは変更されず、最大シーケンスのサイズに対して線形時間の時間がかかる。


##例外
`n > max_size()` の場合には、`length_error`が発生する。また、`reserve()`は`Allocator::allocate()`を内部的に使用し、これにより何らかの例外が発生することがある。


##備考
再確保された場合にはシーケンス中の要素を指す全ての参照、ポインタ、イテレータが無効になる。`reserve()`が呼ばれた後は、挿入によって`vector`の要素数が`capacity()`の値よりも大きくなるまでは、挿入によって再確保が行われないことが保証されている。


##例
```cpp
#include <iostream>
#include <cassert>
#include <vector>

int main()
{
  std::vector<int> v;

  v.reserve(5); // 5要素(以上)の領域を事前に確保しておく
  assert(v.capacity() >= 5);

  // 5要素を超えない限り、要素の追加時にメモリ確保が行われない
  v.push_back(1);
  v.push_back(2);
  v.push_back(3);

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```
* capacity()[link capacity.md]
* assert[link /reference/cassert/assert.md.nolink]
* push_back[link push_back.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

##出力
```
1
2
3
```

##参照
- [LWG Issue 2033. Preconditions of `reserve`, `shrink_to_fit`, and `resize` functions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2033)

