# operator[]
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
T operator[](std::size_t n) const;                                      // (1) C++03 まで
const T& operator[](std::size_t n) const;                               // (1) C++11 から

T& operator[](std::size_t n);                                           // (2)

ValOrProxy<T> operator[](slice ar) const;                               // (3)
slice_array<T> operator[](slice ar);                                    // (4)

ValOrProxy<T> operator[](const gslice& ar) const;                       // (5)
gslice_array<T> operator[](const gslice& ar);                           // (6)

ValOrProxy<T> operator[](const ValOrProxy<bool>& mask) const;           // (7)
mask_array<T> operator[](const ValOrProxy<bool>& mask);                 // (8)

ValOrProxy<T> operator[](const ValOrProxy<std::size_t>& mask) const;    // (9)
indirect_array<T> operator[](const ValOrProxy<std::size_t>& mask);      // (10)
```
* ValOrProxy[italic]
* slice_array[link /reference/valarray/slice_array.md]
* slice[link /reference/valarray/slice.md]
* gslice_array[link /reference/valarray/gslice_array.md]
* gslice[link /reference/valarray/gslice.md]
* mask_array[link /reference/valarray/mask_array.md]
* indirect_array[link /reference/valarray/indirect_array.md]

## 概要
一部の要素を抽出する。

- (1), (2) : `*this`に含まれる`n`番目の要素への参照を取得する。
- (3), (4) : `*this`に含まれる要素を、[`slice`](/reference/valarray/slice.md)の条件に基いてスライスする。
- (5), (6) : `*this`に含まれる要素を、[`gslice`](/reference/valarray/gslice.md)の条件に基いてスライスする。
- (7), (8) : `*this`に含まれる、`mask`の`true`となっている要素のみを抽出する。
- (9), (10) : `*this`に含まれる、`mask`に含まれるインデックス値の要素のみを抽出する。


## 戻り値
- (1), (2) :

`*this`に含まれる`n`番目の要素への参照を返す。

`n >=` [`size()`](size.md)の場合、その挙動は未定義。

- (3) : `*this`に含まれる要素を、[`slice`](/reference/valarray/slice.md)の条件に基いてスライスする。このオーバー�ードでは、条件一致した要素をコピー抽出した`valarray`オブジェクトを返す。
- (4) : `*this`に含まれる要素を、[`slice`](/reference/valarray/slice.md)の条件に基いてスライスする。このオーバー�ードでは、条件一致した要素への参照を管理する[`slice_array`](/reference/valarray/slice_array.md)オブジェクトを返す。
- (5) : `*this`に含まれる要素を、[`gslice`](/reference/valarray/gslice.md)の条件に基いてスライスする。このオーバー�ードでは、条件一致した要素をコピー抽出した`valarray`オブジェクトを返す。
- (6) : `*this`に含まれる要素を、[`gslice`](/reference/valarray/gslice.md)の条件に基いてスライスする。このオーバー�ードでは、条件一致した要素への参照を管理する[`gslice_array`](/reference/valarray/gslice_array.md)オブジェクトを返す。
- (7) : `*this`に含まれる、`mask`の`true`となっている要素のみを抽出する。このオーバー�ードでは、条件一致した要素をコピー抽出した`valarray`オブジェクトを返す。
- (8) : `*this`に含まれる、`mask`の`true`となっている要素のみを抽出する。このオーバー�ードでは、条件一致した要素への参照を管理する[`mask_array`](/reference/valarray/mask_array.md)オブジェクトを返す。
- (9) : `*this`に含まれる、`mask`に含まれるインデックス値の要素のみを抽出する。このオーバー�ードでは、条件一致した要素をコピー抽出した`valarray`オブジェクトを返す。
- (10) : `*this`に含まれる、`mask`に含まれるインデックス値の要素のみを抽出する。このオーバー�ードでは、条件一致した要素への参照を管理する[`indirect_array`](/reference/valarray/indirect_array.md)オブジェクトを返す。


## 備考
- 引数、および、戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。
- (3), (5), (7), (9) : `valarray<T>`型のオブジェクトを返すこの関数を含むあらゆる関数は、`valarray`クラスと同じ`const`メンバ関数をもつほかの型を返すことが実装に許可される。例として複数の`valarray`操作をつなげて記述したときに最適化できるよう、式テンプレートを返す実装もある
- (7), (8) : [`size()`](size.md) `!= mask.`[`size()`](size.md)の場合、その挙動は未定義。


## 例
```cpp example
#include <cassert>
#include <numeric>
#include <valarray>

int main()
{
  // (1)
  // n番目の要素へのconst左辺値参照を取得
  {
    const std::valarray<int> va = {1, 2, 3};
    const int& x = va[1];
    assert(x == 2);
  }

  // (2)
  // n番目の要素への非const左辺値参照を取得
  {
    std::valarray<int> va = {1, 2, 3};
    int& x = va[1];
    assert(x == 2);
  }

  // (3)
  // 開始位置、要素数、何個置きに処理するかを指定して、
  // 条件一致した要素をコピー抽出
  {
    const std::valarray<int> va = {1, 2, 3, 4, 5, 6};

    const std::size_t start = 1u;  // 開始位置
    const std::size_t length = 3u; // 要素数
    const std::size_t stride = 2u; // 何個置きに処理するか

    std::valarray<int> result = va[std::slice(start, length, stride)];

    assert(result.size() == 3);
    assert(result[0] == 2);
    assert(result[1] == 4);
    assert(result[2] == 6);
  }

  // (4)
  // 開始位置、要素数、何個置きに処理するかを指定して、
  // 条件一致した要素への参照を抽出
  {
    std::valarray<int> va = {1, 2, 3, 4, 5, 6};

    const std::size_t start = 1u;  // 開始位置
    const std::size_t length = 3u; // 要素数
    const std::size_t stride = 2u; // 何個置きに処理するか

    std::slice_array<int> result = va[std::slice(start, length, stride)];

    result *= std::valarray<int>(2, length); // 抽出した要素を書き換える

    // 参照元が書き換わっていることを確認
    assert(va[0] == 1);
    assert(va[1] == 4); // result[0]
    assert(va[2] == 3);
    assert(va[3] == 8); // result[1]
    assert(va[4] == 5);
    assert(va[5] == 12); // result[2]
  }

  // (5)
  // 開始位置、要素数のシーケンス、何個置きに処理するかのシーケンスを指定して、
  // 条件一致した要素をコピー抽出
  {
    std::valarray<int> va_org(15);
    std::iota(std::begin(va_org), std::end(va_org), 0);
    std::valarray<int> va = va_org;

    const std::size_t start = 1u;
    const std::valarray<std::size_t> lengths = {3u, 2u};
    const std::valarray<std::size_t> strides = {5u, 3u};

    std::valarray<int> result = va[std::gslice(start, lengths, strides)];

    assert(result[0] == 1);
    assert(result[1] == 4);
    assert(result[2] == 6);
    assert(result[3] == 9);
    assert(result[4] == 11);
    assert(result[5] == 14);
  }

  // (6)
  // 開始位置、要素数のシーケンス、何個置きに処理するかのシーケンスを指定して、
  // 条件一致した要素への参照を抽出
  {
    std::valarray<int> va(15);
    std::iota(std::begin(va), std::end(va), 0); // 0からの連番にする

    const std::size_t start = 1u;
    const std::valarray<std::size_t> lengths = {3u, 2u};
    const std::valarray<std::size_t> strides = {5u, 1u};

    std::gslice_array<int> result = va[std::gslice(start, lengths, strides)];

    // 抽出した要素を99で埋める
    result = 99;

    // 参照元が書き換わっていることを確認する
    assert(va[0] == 0);
    assert(va[1] == 99);
    assert(va[2] == 99);
    assert(va[3] == 3);
    assert(va[4] == 4);
    assert(va[5] == 5);
    assert(va[6] == 99);
    assert(va[7] == 99);
    assert(va[8] == 8);
    assert(va[9] == 9);
    assert(va[10] == 10);
    assert(va[11] == 99);
    assert(va[12] == 99);
    assert(va[13] == 13);
    assert(va[14] == 14);
  }

  // (7)
  // 同じ要素数のbool配列を指定して、
  // bool配列のうち、trueの要素に対応する位置の要素をコピー抽出
  {
    const std::valarray<int> va = {1, 2, 3, 4, 5};
    const std::valarray<bool> mask = {true, false, true, false, true};

    std::valarray<int> result = va[mask];

    assert(result.size() == 3);
    assert(result[0] == 1);
    assert(result[1] == 3);
    assert(result[2] == 5);
  }

  // (8)
  // 同じ要素数のbool配列を指定して、
  // bool配列のうち、trueの要素に対応する位置の要素への参照を抽出
  {
    std::valarray<int> va = {1, 2, 3, 4, 5};
    const std::valarray<bool> mask = {true, false, true, false, true};

    std::mask_array<int> result = va[mask];

    // 抽出した要素を99で埋める
    result = 99;

    // 参照元が書き換わっていることを確認する
    assert(va[0] == 99);
    assert(va[1] == 2);
    assert(va[2] == 99);
    assert(va[3] == 4);
    assert(va[0] == 99);
  }

  // (9)
  // 抽出する要素のインデックス値からなる配列を指定して、
  // 対応する位置の要素をコピー抽出
  {
    const std::valarray<int> va = {1, 2, 3, 4, 5};
    const std::valarray<std::size_t> mask = {0, 2, 4};

    std::valarray<int> result = va[mask];

    assert(result.size() == 3);
    assert(result[0] == 1);
    assert(result[1] == 3);
    assert(result[2] == 5);
  }

  // (10)
  // 抽出する要素のインデックス値からなる配列を指定して、
  // 対応する位置の要素をコピー抽出
  {
    std::valarray<int> va = {1, 2, 3, 4, 5};
    const std::valarray<std::size_t> mask = {0, 2, 4};

    std::indirect_array<int> result = va[mask];

    // 抽出した要素を99で埋める
    result = 99;

    // 参照元が書き換わっていることを確認する
    assert(va[0] == 99);
    assert(va[1] == 2);
    assert(va[2] == 99);
    assert(va[3] == 4);
    assert(va[0] == 99);
  }
}
```
* std::slice[link /reference/valarray/slice.md]
* std::slice_array[link /reference/valarray/slice_array.md]
* std::gslice[link /reference/valarray/gslice.md]
* std::gslice_array[link /reference/valarray/gslice_array.md]
* std::iota[link /reference/numeric/iota.md]
* std::begin[link begin_free.md]
* std::end[link end_free.md]
* std::mask_array[link /reference/valarray/mask_array.md]
* std::indirect_array[link /reference/valarray/indirect_array.md]

### 出力
```
```

### 備考
- GCC 4.8.2時点のlibstdc++において、(8)と(10)のオーバー�ードにおいて、一時オブジェクトのマスク配列を渡すと、ぶら下がり参照が発生する問題がある([#Bug 63314](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=63314), [mask_array behavior in libstdc++](http://stackoverflow.com/questions/25918764/mask-array-behavior-in-libstdc))


## 参照
- [LWG Issue 389. Const overload of `valarray::operator[]` returns by value](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#389)
    - (1)の戻り値の型が、C++03の`T`から、C++11の`const T&`に変更された経緯のレポート

