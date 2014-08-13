#operator[]
```cpp
const T& operator[](size_t n) const;                        // (1)
T& operator[](size_t n);                                    // (2)

valarray<T> operator[](slice ar) const;                     // (3)
slice_array<T> operator[](slice ar);                        // (4)

valarray<T> operator[](const gslice& ar) const;             // (5)
gslice_array<T> operator[](const gslice& ar);               // (6)

valarray<T> operator[](const valarray<bool>& mask) const;   // (7)
mask_array<T> operator[](const valarray<bool>& mask);       // (8)

valarray<T> operator[](const valarray<size_t>& mask) const; // (9)
indirect_array<T> operator[](const valarray<size_t>& mask); // (10)
```
* size_t[link /reference/cstddef/size_t.md]
* slice_array[link /reference/valarray/slice_array.md]
* slice[link /reference/valarray/slice.md]
* gslice_array[link /reference/valarray/gslice_array.md]
* gslice[link /reference/valarray/gslice.md]
* mask_array[link /reference/valarray/mask_array.md]
* indirect_array[link /reference/valarray/indirect_array.md]

##概要
一部の要素を抽出する。

- (1), (2) : `*this`に含まれる`n`番目の要素への参照を取得する。
- (3), (4) : `*this`に含まれる要素を、[`slice`](/reference/valarray/slice.md)の条件に基いてスライスする。
- (5), (6) : `*this`に含まれる要素を、[`gslice`](/reference/valarray/gslice.md)の条件に基いてスライスする。
- (7), (8) : `*this`に含まれる、`mask`の`true`となっている要素のみを抽出する。
- (9), (10) : `*this`に含まれる、`mask`に含まれるインデックス値の要素のみを抽出する。


##戻り値
- (1), (2) :

`*this`に含まれる`n`番目の要素への参照を返す。

`n >=` [`size()`](./size.md)の場合、その挙動は未定義。

- (3) : `*this`に含まれる要素を、[`slice`](/reference/valarray/slice.md)の条件に基いてスライスする。このオーバーロードでは、条件一致した要素をコピー抽出した`valarray`オブジェクトを返す。
- (4) : `*this`に含まれる要素を、[`slice`](/reference/valarray/slice.md)の条件に基いてスライスする。このオーバーロードでは、条件一致した要素への参照を管理する[`slice_array`](/reference/valarray/slice_array.md)オブジェクトを返す。
- (5) : `*this`に含まれる要素を、[`gslice`](/reference/valarray/gslice.md)の条件に基いてスライスする。このオーバーロードでは、条件一致した要素をコピー抽出した`valarray`オブジェクトを返す。
- (6) : `*this`に含まれる要素を、[`gslice`](/reference/valarray/gslice.md)の条件に基いてスライスする。このオーバーロードでは、条件一致した要素への参照を管理する[`gslice_array`](/reference/valarray/gslice_array.md)オブジェクトを返す。
- (7) : `*this`に含まれる、`mask`の`true`となっている要素のみを抽出する。このオーバーロードでは、条件一致した要素をコピー抽出した`valarray`オブジェクトを返す。
- (8) : `*this`に含まれる、`mask`の`true`となっている要素のみを抽出する。このオーバーロードでは、条件一致した要素への参照を管理する[`mask_array`](/reference/valarray/mask_array.md)オブジェクトを返す。
- (9) : `*this`に含まれる、`mask`に含まれるインデックス値の要素のみを抽出する。このオーバーロードでは、条件一致した要素をコピー抽出した`valarray`オブジェクトを返す。
- (10) : `*this`に含まれる、`mask`に含まれるインデックス値の要素のみを抽出する。このオーバーロードでは、条件一致した要素への参照を管理する[`indirect_array`](/reference/valarray/indirect_array.md)オブジェクトを返す。


##備考
- (7), (8) : [`size()`](./size.md) `!= mask.`[`size()`](./size.md)の場合、その挙動は未定義。

##例
```cpp
#include <cassert>
#include <numeric>
#include <valarray>

int main()
{
  // (1)
  // n番目の要素へのconst左辺値参照を取得
  {
    const std::valarray<int> v = {1, 2, 3};
    const int& x = v[1];
    assert(x == 2);
  }

  // (2)
  // n番目の要素への非const左辺値参照を取得
  {
    std::valarray<int> v = {1, 2, 3};
    int& x = v[1];
    assert(x == 2);
  }

  // (3)
  // 開始位置、要素数、何個置きに処理するかを指定して、
  // 条件一致した要素をコピー抽出
  {
    const std::valarray<int> v = {1, 2, 3, 4, 5, 6};

    const std::size_t start = 1u;  // 開始位置
    const std::size_t length = 3u; // 要素数
    const std::size_t stride = 2u; // 何個置きに処理するか

    std::valarray<int> result = v[std::slice(start, length, stride)];

    assert(result.size() == 3);
    assert(result[0] == 2);
    assert(result[1] == 4);
    assert(result[2] == 6);
  }

  // (4)
  // 開始位置、要素数、何個置きに処理するかを指定して、
  // 条件一致した要素への参照を抽出
  {
    std::valarray<int> v = {1, 2, 3, 4, 5, 6};

    const std::size_t start = 1u;  // 開始位置
    const std::size_t length = 3u; // 要素数
    const std::size_t stride = 2u; // 何個置きに処理するか

    std::slice_array<int> result = v[std::slice(start, length, stride)];

    result *= std::valarray<int>(2, length); // 抽出した要素を書き換える

    // 参照元が書き換わっていることを確認
    assert(v[0] == 1);
    assert(v[1] == 4); // result[0]
    assert(v[2] == 3);
    assert(v[3] == 8); // result[1]
    assert(v[4] == 5);
    assert(v[5] == 12); // result[2]
  }

  // (5)
  // 開始位置、要素数のシーケンス、何個置きに処理するかのシーケンスを指定して、
  // 条件一致した要素をコピー抽出
  {
    std::valarray<int> v_org(15);
    std::iota(std::begin(v_org), std::end(v_org), 0);
    std::valarray<int> v = v_org;

    const std::size_t start = 1u;
    const std::valarray<std::size_t> lengths = {3u, 2u};
    const std::valarray<std::size_t> strides = {5u, 3u};

    std::valarray<int> result = v[std::gslice(start, lengths, strides)];

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
    std::valarray<int> v(15);
    std::iota(std::begin(v), std::end(v), 0); // 0からの連番にする
   
    const std::size_t start = 1u;
    const std::valarray<std::size_t> lengths = {3u, 2u};
    const std::valarray<std::size_t> strides = {5u, 1u};
   
    std::gslice_array<int> result = v[std::gslice(start, lengths, strides)];
   
    // 抽出した要素を99で埋める
    result = 99;

    // 参照元が書き換わっていることを確認する
    assert(v[0] == 0);
    assert(v[1] == 99);
    assert(v[2] == 99);
    assert(v[3] == 3);
    assert(v[4] == 4);
    assert(v[5] == 5);
    assert(v[6] == 99);
    assert(v[7] == 99);
    assert(v[8] == 8);
    assert(v[9] == 9);
    assert(v[10] == 10);
    assert(v[11] == 99);
    assert(v[12] == 99);
    assert(v[13] == 13);
    assert(v[14] == 14);
  }

  // (7)
  // 同じ要素数のbool配列を指定して、
  // bool配列のうち、trueの要素に対応する位置の要素をコピー抽出
  {
    const std::valarray<int> v = {1, 2, 3, 4, 5};
    const std::valarray<bool> mask = {true, false, true, false, true};

    std::valarray<int> result = v[mask];

    assert(result.size() == 3);
    assert(result[0] == 1);
    assert(result[1] == 3);
    assert(result[2] == 5);
  }

  // (8)
  // 同じ要素数のbool配列を指定して、
  // bool配列のうち、trueの要素に対応する位置の要素への参照を抽出
  {
    std::valarray<int> v = {1, 2, 3, 4, 5};
    const std::valarray<bool> mask = {true, false, true, false, true};

    std::mask_array<int> result = v[mask];

    // 抽出した要素を99で埋める
    result = 99;

    // 参照元が書き換わっていることを確認する
    assert(v[0] == 99);
    assert(v[1] == 2);
    assert(v[2] == 99);
    assert(v[3] == 4);
    assert(v[0] == 99);
  }

  // (9)
  // 抽出する要素のインデックス値からなる配列を指定して、
  // 対応する位置の要素をコピー抽出
  {
    const std::valarray<int> v = {1, 2, 3, 4, 5};
    const std::valarray<std::size_t> mask = {0, 2, 4};

    std::valarray<int> result = v[mask];

    assert(result.size() == 3);
    assert(result[0] == 1);
    assert(result[1] == 3);
    assert(result[2] == 5);
  }

  // (10)
  // 抽出する要素のインデックス値からなる配列を指定して、
  // 対応する位置の要素をコピー抽出
  {
    std::valarray<int> v = {1, 2, 3, 4, 5};
    const std::valarray<std::size_t> mask = {0, 2, 4};

    std::indirect_array<int> result = v[mask];

    // 抽出した要素を99で埋める
    result = 99;

    // 参照元が書き換わっていることを確認する
    assert(v[0] == 99);
    assert(v[1] == 2);
    assert(v[2] == 99);
    assert(v[3] == 4);
    assert(v[0] == 99);
  }
}
```

###出力
```
```


