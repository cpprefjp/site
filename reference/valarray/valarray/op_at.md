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


##例
```cpp
```

###出力
```
```


