# operator-=
* valarray[meta header]
* std[meta namespace]
* gslice_array[meta class]
* function[meta id-type]

```cpp
void operator-=(const valarray<T>& xs) const;
```
* valarray[link /reference/valarray/valarray.md]

## 概要
減算の複合演算を行う。


## 効果
元となる`valarray`オブジェクトから参照によって抽出した各要素から、`xs`の各要素を減算する。


## 戻り値
なし


## 備考
`valarray`から抽出した要素数と`xs`の要素数が異なる場合、その挙動は未定義。



## 例
```cpp example
#include <iostream>
#include <valarray>
#include <numeric>
#include <functional>

std::size_t product(const std::valarray<std::size_t>& va)
{
  return std::accumulate(
           std::begin(va),
           std::end(va),
           1u,
           std::multiplies<std::size_t>());
}

int main()
{
  std::valarray<int> va = {1, 2, 3, 4, 5, 6};

  const std::size_t start = 1u;  // 開始位置
  const std::valarray<std::size_t> lengths = {3u}; // 要素数
  const std::valarray<std::size_t> strides = {2u}; // 何個置きに処理するか

  // 抽出した要素から2を減算する
  // lengthを掛け合わせたものがgsliceで抽出した配列の長さ
  va[std::gslice(start, lengths, strides)] -= std::valarray<int>(2, product(lengths));

  for (int x : va) {
    std::cout << x << std::endl;
  }
}
```
* std::valarray[link /reference/valarray/valarray.md]
* std::gslice[link /reference/valarray/gslice.md]
* std::accumulate[link /reference/numeric/accumulate.md]
* std::begin[link /reference/valarray/valarray/begin_free.md]
* std::end[link /reference/valarray/valarray/end_free.md]
* std::multiplies[link /reference/functional/multiplies.md]

### 出力
```
1
0
3
2
5
4
```


