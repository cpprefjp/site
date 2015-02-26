#operator*=
* valarray[meta header]

```cpp
void operator*=(const valarray<T>& xs) const;
```

##概要
乗算の複合代入を行う。


##効果
元となる`valarray`オブジェクトから参照によって抽出した各要素に、`xs`の各要素を乗算する。


##戻り値
なし


##備考
`valarray`から抽出した要素数と`xs`の要素数が異なる場合、その挙動は未定義。


##例
```cpp
#include <iostream>
#include <valarray>
#include <numeric> // accumulate
#include <functional> // multiplies

std::size_t product(const std::valarray<std::size_t>& v)
{
  return std::accumulate(
           std::begin(v),
           std::end(v),
           1u,
           std::multiplies<std::size_t>());
}

int main()
{
  std::valarray<int> v = {1, 2, 3, 4, 5, 6};

  const std::size_t start = 1u;  // 開始位置
  const std::valarray<std::size_t> lengths = {3u}; // 要素数
  const std::valarray<std::size_t> strides = {2u}; // 何個置きに処理するか

  // 抽出した要素に2を乗算する
  // lengthを掛け合わせたものがgsliceで抽出した配列の長さ
  v[std::gslice(start, lengths, strides)] *= std::valarray<int>(2, product(lengths));

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```

###出力
```
1
4
3
8
5
12
```


